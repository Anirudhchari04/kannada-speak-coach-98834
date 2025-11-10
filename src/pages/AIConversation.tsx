import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const AIConversation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
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
            Coming soon! Open-ended conversations with AI
          </p>
        </div>

        {/* Coming Soon Card */}
        <Card className="shadow-medium bg-gradient-card">
          <CardContent className="pt-6 text-center">
            <div className="text-6xl mb-4">🚧</div>
            <h2 className="text-2xl font-bold mb-2">Under Development</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              We're working on bringing you amazing AI-powered conversations. 
              This feature will allow you to practice English on any topic with instant feedback!
            </p>
            <div className="inline-flex items-center gap-2 bg-muted px-4 py-2 rounded-full text-sm">
              <span>✨</span>
              <span>Natural conversations</span>
              <span>•</span>
              <span>🎯</span>
              <span>Topic-based practice</span>
              <span>•</span>
              <span>📊</span>
              <span>Real-time feedback</span>
            </div>
          </CardContent>
        </Card>

        {/* Suggested Topics Preview */}
        <div className="mt-8">
          <h3 className="font-semibold mb-4">Planned Topics:</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { emoji: "🏫", title: "School Life" },
              { emoji: "🏠", title: "Daily Routine" },
              { emoji: "🛒", title: "Shopping" },
              { emoji: "🎮", title: "Hobbies" },
              { emoji: "🍔", title: "Food & Dining" },
              { emoji: "✈️", title: "Travel" },
            ].map((topic) => (
              <Card key={topic.title} className="bg-muted/30 border-dashed">
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl mb-2">{topic.emoji}</div>
                  <div className="text-sm font-medium">{topic.title}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIConversation;
