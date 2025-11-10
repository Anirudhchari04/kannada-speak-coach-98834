import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Mic, MicOff, Volume2, RotateCcw, ArrowRight } from "lucide-react";
import { dialogues, DialogueLine } from "@/data/dialogues";
import { 
  isSpeechRecognitionSupported, 
  getSpeechRecognition, 
  isSpeechSynthesisSupported,
  generateFeedback,
  FeedbackResult
} from "@/utils/speechRecognition";
import { useToast } from "@/hooks/use-toast";

const Practice = () => {
  const { dialogueId, character } = useParams<{ dialogueId: string; character: "A" | "B" }>();
  const { toast } = useToast();
  const dialogue = dialogues.find(d => d.id === dialogueId);
  
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [feedback, setFeedback] = useState<FeedbackResult | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (!isSpeechRecognitionSupported()) {
      toast({
        title: "Speech recognition not supported",
        description: "Please use Chrome or Edge browser for the best experience.",
        variant: "destructive",
      });
    }

    // Speak the first AI line if it's not user's turn
    if (dialogue && currentLineIndex < dialogue.lines.length) {
      const currentLine = dialogue.lines[currentLineIndex];
      if (currentLine.character !== character) {
        speakLine(currentLine.english);
      }
    }

    return () => {
      stopListening();
      if (synthRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speakLine = (text: string) => {
    if (!isSpeechSynthesisSupported()) return;
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    synthRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    if (!isSpeechRecognitionSupported()) return;

    const recognition = getSpeechRecognition();
    if (!recognition) return;

    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript("");
      setFeedback(null);
    };

    recognition.onresult = (event: any) => {
      const current = event.resultIndex;
      const transcriptText = event.results[current][0].transcript;
      setTranscript(transcriptText);
    };

    recognition.onend = () => {
      setIsListening(false);
      if (transcript && dialogue) {
        const currentLine = dialogue.lines[currentLineIndex];
        const result = generateFeedback(transcript, currentLine.english);
        setFeedback(result);
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      toast({
        title: "Error",
        description: "Could not recognize speech. Please try again.",
        variant: "destructive",
      });
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleNextLine = () => {
    if (!dialogue) return;

    setTranscript("");
    setFeedback(null);

    if (currentLineIndex < dialogue.lines.length - 1) {
      const nextIndex = currentLineIndex + 1;
      setCurrentLineIndex(nextIndex);
      
      // If next line is AI's turn, speak it
      const nextLine = dialogue.lines[nextIndex];
      if (nextLine.character !== character) {
        setTimeout(() => speakLine(nextLine.english), 500);
      }
    } else {
      setIsCompleted(true);
    }
  };

  const handleTryAgain = () => {
    setTranscript("");
    setFeedback(null);
  };

  const handleReplay = () => {
    if (dialogue && currentLineIndex < dialogue.lines.length) {
      const currentLine = dialogue.lines[currentLineIndex];
      speakLine(currentLine.english);
    }
  };

  if (!dialogue || !character) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Dialogue not found</h1>
          <Link to="/categories">
            <Button>Back to Categories</Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentLine = dialogue.lines[currentLineIndex];
  const isUserTurn = currentLine.character === character;
  const progress = ((currentLineIndex + 1) / dialogue.lines.length) * 100;

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center">
        <Card className="max-w-md w-full mx-4 bg-gradient-card shadow-strong">
          <CardContent className="pt-6 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
            <p className="text-muted-foreground mb-6">
              You've completed the dialogue practice!
            </p>
            <div className="space-y-3">
              <Link to={`/character-select/${dialogueId}`} className="block">
                <Button className="w-full" variant="outline">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Practice Again
                </Button>
              </Link>
              <Link to="/categories" className="block">
                <Button className="w-full">
                  Choose Another Dialogue
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link to={`/character-select/${dialogueId}`}>
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold">
              You are Character {character}
            </h1>
            <span className="text-sm text-muted-foreground">
              Line {currentLineIndex + 1} of {dialogue.lines.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Current Line Card */}
        <Card className="mb-6 shadow-medium bg-gradient-card border-2">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                isUserTurn ? 'bg-gradient-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                {currentLine.character}
              </div>
              <div>
                <div className="font-semibold">
                  {isUserTurn ? 'Your Turn' : 'AI Speaking'}
                </div>
                <div className="text-xs text-muted-foreground">
                  Character {currentLine.character}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-sm text-muted-foreground mb-1">English:</div>
                <p className="text-lg font-medium">{currentLine.english}</p>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">ಕನ್ನಡ:</div>
                <p className="text-lg kannada-text">{currentLine.kannada}</p>
              </div>
            </div>

            {!isUserTurn && (
              <Button
                onClick={handleReplay}
                variant="outline"
                size="sm"
                className="mt-4"
              >
                <Volume2 className="mr-2 h-4 w-4" />
                Replay
              </Button>
            )}
          </CardContent>
        </Card>

        {/* User Turn Interface */}
        {isUserTurn && (
          <>
            {/* Microphone Button */}
            <div className="flex justify-center mb-6">
              <Button
                size="lg"
                onClick={isListening ? stopListening : startListening}
                className={`w-20 h-20 rounded-full ${
                  isListening 
                    ? 'bg-destructive hover:bg-destructive/90 animate-pulse' 
                    : 'bg-gradient-primary'
                }`}
              >
                {isListening ? (
                  <MicOff className="h-8 w-8" />
                ) : (
                  <Mic className="h-8 w-8" />
                )}
              </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground mb-6">
              {isListening ? '🎤 Listening... Speak now!' : 'Click the microphone to speak'}
            </div>

            {/* Transcript */}
            {transcript && (
              <Card className="mb-6 bg-muted/50">
                <CardContent className="pt-4">
                  <div className="text-sm text-muted-foreground mb-1">You said:</div>
                  <p className="font-medium">{transcript}</p>
                </CardContent>
              </Card>
            )}

            {/* Feedback */}
            {feedback && (
              <Card className={`mb-6 border-2 ${
                feedback.color === 'success' ? 'border-success bg-success/5' :
                feedback.color === 'info' ? 'border-info bg-info/5' :
                feedback.color === 'warning' ? 'border-warning bg-warning/5' :
                'border-destructive bg-destructive/5'
              }`}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{feedback.emoji}</div>
                    <div className="flex-1">
                      <div className="font-semibold mb-2">{feedback.message}</div>
                      <div className="text-sm text-muted-foreground mb-3">
                        Accuracy: {feedback.accuracy}%
                      </div>
                      {feedback.incorrectWords.length > 0 && (
                        <div className="text-sm">
                          <span className="text-destructive font-medium">Focus on: </span>
                          {feedback.incorrectWords.join(', ')}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={handleTryAgain}
                variant="outline"
                className="flex-1"
                disabled={!feedback}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
              <Button
                onClick={handleNextLine}
                className="flex-1"
                disabled={!feedback || feedback.accuracy < 60}
              >
                Next Line
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </>
        )}

        {/* AI Turn - Auto advance */}
        {!isUserTurn && (
          <div className="text-center">
            <Button onClick={handleNextLine} size="lg">
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Practice;
