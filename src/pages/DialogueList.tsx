import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { dialogues, categories } from "@/data/dialogues";

const DialogueList = () => {
  const { categoryId } = useParams();
  const category = categories.find(c => c.id === categoryId);
  const categoryDialogues = dialogues.filter(d => 
    d.category === category?.name
  );

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Category not found</h1>
          <Link to="/categories">
            <Button>Back to Categories</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/categories">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Categories
            </Button>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {category.emoji} {category.name}
          </h1>
          <p className="text-muted-foreground">
            Choose a conversation to practice
          </p>
        </div>

        {/* Dialogue Cards */}
        <div className="grid gap-4">
          {categoryDialogues.map((dialogue) => (
            <Link key={dialogue.id} to={`/character-select/${dialogue.id}`}>
              <Card className="hover:shadow-medium transition-all duration-300 hover:-translate-y-0.5 cursor-pointer border-2 hover:border-primary/50 bg-gradient-card">
                <CardHeader>
                  <CardTitle className="text-xl">{dialogue.title}</CardTitle>
                  <CardDescription className="kannada-text text-base">
                    {dialogue.titleKannada}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{dialogue.lines.length} lines</span>
                    <span className="text-primary font-medium">Start Practice →</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DialogueList;
