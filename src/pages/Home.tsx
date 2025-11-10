import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, BookOpen } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container max-w-4xl mx-auto px-4 py-8 md:py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            English Practice 🌟
          </h1>
          <p className="text-lg text-muted-foreground">
            Practice speaking English with confidence!
          </p>
        </div>

        {/* Module Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Roleplay Module */}
          <Link to="/categories">
            <Card className="h-full hover:shadow-strong transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-primary/50 bg-gradient-card">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl">Roleplay Practice 🎭</CardTitle>
                <CardDescription className="text-base">
                  Practice real conversations with character roleplay
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="text-success">✓</span>
                    7 different conversations
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-success">✓</span>
                    Choose your character
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-success">✓</span>
                    Get pronunciation feedback
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-success">✓</span>
                    Learn with English & Kannada
                  </li>
                </ul>
              </CardContent>
            </Card>
          </Link>

          {/* AI Conversation Module */}
          <Link to="/ai-conversation">
            <Card className="h-full hover:shadow-strong transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-secondary/50 bg-gradient-card">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-gradient-success flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-2xl">AI Conversation 🤖</CardTitle>
                <CardDescription className="text-base">
                  Have open conversations with AI on any topic
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="text-success">✓</span>
                    Talk about any topic
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-success">✓</span>
                    Natural conversations
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-success">✓</span>
                    Real-time pronunciation feedback
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-success">✓</span>
                    Practice at your own pace
                  </li>
                </ul>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Features Section */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-muted px-4 py-2 rounded-full text-sm text-muted-foreground">
            <span>🎤</span>
            <span>Voice recognition</span>
            <span>•</span>
            <span>🔊</span>
            <span>AI speech</span>
            <span>•</span>
            <span>📊</span>
            <span>Instant feedback</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
