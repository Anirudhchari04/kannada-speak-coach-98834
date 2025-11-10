import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { categories, dialogues } from "@/data/dialogues";

const Categories = () => {
  const getDialogueCountForCategory = (categoryName: string) => {
    return dialogues.filter(d => d.category === categoryName).length;
  };

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
            Choose a Category 📚
          </h1>
          <p className="text-muted-foreground">
            Select a conversation topic to practice
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category) => {
            const count = getDialogueCountForCategory(category.name);
            return (
              <Link key={category.id} to={`/dialogues/${category.id}`}>
                <Card className="h-full hover:shadow-medium transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-primary/50 bg-gradient-card">
                  <CardHeader>
                    <div className="text-4xl mb-2">{category.emoji}</div>
                    <CardTitle className="text-xl">{category.name}</CardTitle>
                    <CardDescription>
                      {count} conversation{count !== 1 ? 's' : ''}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      Practice real-world dialogues
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;
