import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { dialogues } from "@/data/dialogues";

const CharacterSelect = () => {
  const { dialogueId } = useParams();
  const navigate = useNavigate();
  const dialogue = dialogues.find(d => d.id === dialogueId);

  if (!dialogue) {
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

  const handleCharacterSelect = (character: "A" | "B") => {
    navigate(`/practice/${dialogueId}/${character}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/categories">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Choose Your Character 🎭
          </h1>
          <p className="text-muted-foreground mb-4">
            {dialogue.title}
          </p>
          <p className="text-muted-foreground kannada-text">
            {dialogue.titleKannada}
          </p>
        </div>

        {/* Character Selection */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card 
            className="hover:shadow-strong transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-primary/50 bg-gradient-card"
            onClick={() => handleCharacterSelect("A")}
          >
            <CardHeader>
              <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mb-4 mx-auto">
                <span className="text-3xl text-primary-foreground font-bold">A</span>
              </div>
              <CardTitle className="text-2xl text-center">Character A</CardTitle>
              <CardDescription className="text-center">
                You'll speak as Character A
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground text-center">
                First line: "{dialogue.lines.find(l => l.character === "A")?.english}"
              </div>
            </CardContent>
          </Card>

          <Card 
            className="hover:shadow-strong transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-secondary/50 bg-gradient-card"
            onClick={() => handleCharacterSelect("B")}
          >
            <CardHeader>
              <div className="w-16 h-16 rounded-full bg-gradient-success flex items-center justify-center mb-4 mx-auto">
                <span className="text-3xl text-white font-bold">B</span>
              </div>
              <CardTitle className="text-2xl text-center">Character B</CardTitle>
              <CardDescription className="text-center">
                You'll speak as Character B
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground text-center">
                First line: "{dialogue.lines.find(l => l.character === "B")?.english}"
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info Box */}
        <div className="mt-8 p-6 bg-muted rounded-lg border border-border">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <span>ℹ️</span>
            <span>How it works:</span>
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">1.</span>
              <span>You'll see your character's lines in English and Kannada</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">2.</span>
              <span>Click the microphone to speak your line</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">3.</span>
              <span>Get instant feedback on your pronunciation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">4.</span>
              <span>The AI will speak the other character's lines</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CharacterSelect;
