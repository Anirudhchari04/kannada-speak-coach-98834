import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Mic, Volume2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { recognizeSpeech, speakText, calculatePronunciationAccuracy } from "@/utils/speechUtils";

const TOPICS = [
  { emoji: "🏫", title: "School Life" },
  { emoji: "🛒", title: "Shopping" },
  { emoji: "🏠", title: "Daily Life" },
  { emoji: "👨‍👩‍👧‍👦", title: "Family" },
];

interface Message {
  role: "user" | "assistant";
  content: string;
  score?: number;
  grammarFeedback?: string;
}

const AIConversation = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [conversation, setConversation] = useState<Message[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [turnCount, setTurnCount] = useState(0);
  const [sessionComplete, setSessionComplete] = useState(false);
  const { toast } = useToast();

  const MAX_TURNS = 5;

  // Start conversation when topic is selected
  useEffect(() => {
    if (selectedTopic && conversation.length === 0) {
      startConversation();
    }
  }, [selectedTopic]);

  const startConversation = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-conversation', {
        body: {
          topic: selectedTopic,
          conversation: [{ role: "user", content: "Hi, let's start practicing!" }]
        }
      });

      if (error) throw error;

      const aiMessage: Message = {
        role: "assistant",
        content: data.response,
        grammarFeedback: data.grammarFeedback
      };

      setConversation([aiMessage]);
      
      // Speak the AI's greeting
      setIsSpeaking(true);
      await speakText(data.response);
      setIsSpeaking(false);
    } catch (error: any) {
      console.error('Error starting conversation:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to start conversation",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeak = async () => {
    if (isListening || isSpeaking || isLoading) return;

    setIsListening(true);
    try {
      const spokenText = await recognizeSpeech();
      
      if (!spokenText) {
        toast({
          title: "No speech detected",
          description: "Please try again",
          variant: "destructive",
        });
        return;
      }

      // Calculate pronunciation score (comparing with last AI message for simplicity)
      const lastAiMessage = conversation.filter(m => m.role === 'assistant').pop();
      const score = lastAiMessage 
        ? calculatePronunciationAccuracy(lastAiMessage.content, spokenText)
        : 85; // Default score if no reference

      const userMessage: Message = {
        role: "user",
        content: spokenText,
        score
      };

      const updatedConversation = [...conversation, userMessage];
      setConversation(updatedConversation);
      setTurnCount(prev => prev + 1);

      // Check if session should end
      if (turnCount + 1 >= MAX_TURNS) {
        setSessionComplete(true);
        return;
      }

      // Get AI response
      setIsLoading(true);
      const { data, error } = await supabase.functions.invoke('ai-conversation', {
        body: {
          topic: selectedTopic,
          conversation: updatedConversation.map(m => ({
            role: m.role,
            content: m.content
          }))
        }
      });

      if (error) throw error;

      const aiMessage: Message = {
        role: "assistant",
        content: data.response,
        grammarFeedback: data.grammarFeedback
      };

      setConversation([...updatedConversation, aiMessage]);

      // Speak the AI's response
      setIsSpeaking(true);
      await speakText(data.response);
      setIsSpeaking(false);

    } catch (error: any) {
      console.error('Error in conversation:', error);
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsListening(false);
      setIsLoading(false);
    }
  };

  const calculateFinalFeedback = () => {
    const userMessages = conversation.filter(m => m.role === 'user' && m.score);
    const scores = userMessages.map(m => m.score!);
    const avgScore = scores.length > 0 
      ? scores.reduce((a, b) => a + b, 0) / scores.length 
      : 0;

    // Collect grammar feedback
    const grammarFeedbacks = conversation
      .filter(m => m.role === 'assistant' && m.grammarFeedback)
      .map(m => m.grammarFeedback!);

    let feedback = "## 📊 Your Performance Summary\n\n";
    
    // Pronunciation feedback
    feedback += `### 🗣️ Pronunciation\n`;
    feedback += `Average clarity score: **${avgScore.toFixed(1)}%**\n\n`;
    if (avgScore >= 90) {
      feedback += "🌟 Excellent clarity and fluency! Your pronunciation is very clear.\n\n";
    } else if (avgScore >= 75) {
      feedback += "👍 Good job! Your pronunciation is generally clear. Keep practicing for even better fluency.\n\n";
    } else {
      feedback += "💪 Keep practicing! Focus on speaking slowly and clearly to improve pronunciation.\n\n";
    }

    // Grammar feedback
    feedback += `### ✍️ Grammar\n`;
    if (grammarFeedbacks.length > 0) {
      grammarFeedbacks.forEach((gf, idx) => {
        feedback += `**Turn ${idx + 1}:** ${gf}\n\n`;
      });
    } else {
      feedback += "No grammar analysis available.\n\n";
    }

    feedback += "---\n\n";
    feedback += "🎉 Great practice session! Keep up the good work!";

    return feedback;
  };

  const resetSession = () => {
    setSelectedTopic(null);
    setConversation([]);
    setTurnCount(0);
    setSessionComplete(false);
  };

  // Topic Selection View
  if (!selectedTopic) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="container max-w-4xl mx-auto px-4 py-8">
          <div className="mb-8">
            <Link to="/">
              <Button variant="ghost" size="sm" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              AI Conversation 🤖
            </h1>
            <p className="text-muted-foreground">
              Choose a topic and practice English with AI voice conversation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {TOPICS.map((topic) => (
              <Card 
                key={topic.title}
                className="cursor-pointer hover:shadow-strong transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/50 bg-gradient-card"
                onClick={() => setSelectedTopic(topic.title)}
              >
                <CardContent className="pt-6 text-center">
                  <div className="text-4xl mb-3">{topic.emoji}</div>
                  <h3 className="text-xl font-semibold">{topic.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 bg-muted px-4 py-2 rounded-full text-sm text-muted-foreground">
              <span>🎤</span>
              <span>Voice-only practice</span>
              <span>•</span>
              <span>🤖</span>
              <span>AI conversation partner</span>
              <span>•</span>
              <span>📊</span>
              <span>Pronunciation scoring</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Conversation View
  if (sessionComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="container max-w-4xl mx-auto px-4 py-8">
          <Card className="shadow-strong bg-gradient-card">
            <CardHeader>
              <CardTitle className="text-3xl text-center">🎉 Session Complete!</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="prose prose-sm dark:prose-invert mx-auto">
                <p className="text-lg whitespace-pre-line">{calculateFinalFeedback()}</p>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold">Your Conversation:</h4>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {conversation.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`text-left p-3 rounded-lg ${
                        msg.role === 'assistant' 
                          ? 'bg-primary/10 border border-primary/20' 
                          : 'bg-muted'
                      }`}
                    >
                      <div className="font-semibold text-sm mb-1">
                        {msg.role === 'assistant' ? '🤖 AI' : '👤 You'}
                      </div>
                      <div className="text-sm">{msg.content}</div>
                    </div>
                  ))}
                </div>
              </div>

              <Button onClick={resetSession} size="lg" className="mt-6">
                🔄 Start New Conversation
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" size="sm" onClick={resetSession} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Change Topic
          </Button>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold">
              Topic: {selectedTopic}
            </h1>
            <div className="text-sm text-muted-foreground">
              Turn {turnCount + 1} / {MAX_TURNS}
            </div>
          </div>
        </div>

        {/* Conversation History */}
        <Card className="mb-6 shadow-medium bg-gradient-card">
          <CardContent className="pt-6">
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {conversation.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-lg ${
                      msg.role === 'assistant'
                        ? 'bg-primary/10 border border-primary/20'
                        : 'bg-muted'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-sm">
                        {msg.role === 'assistant' ? '🤖 AI' : '👤 You'}
                      </span>
                    </div>
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Controls */}
        <div className="flex flex-col items-center gap-4">
          <Button
            size="lg"
            onClick={handleSpeak}
            disabled={isListening || isSpeaking || isLoading}
            className="w-full md:w-auto px-8 py-6 text-lg"
          >
            {isListening ? (
              <>
                <Mic className="mr-2 h-5 w-5 animate-pulse" />
                Listening...
              </>
            ) : isSpeaking ? (
              <>
                <Volume2 className="mr-2 h-5 w-5 animate-pulse" />
                AI Speaking...
              </>
            ) : isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Mic className="mr-2 h-5 w-5" />
                🎤 Speak Your Reply
              </>
            )}
          </Button>

          <p className="text-sm text-muted-foreground text-center max-w-md">
            {isListening 
              ? "Speak clearly into your microphone..."
              : isSpeaking
              ? "Listen to the AI's response..."
              : "Click the button and speak your response when ready"
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIConversation;
