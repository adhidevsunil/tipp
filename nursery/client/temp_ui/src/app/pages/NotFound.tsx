import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl text-primary mb-4">404</h1>
        <h2 className="text-4xl mb-4 text-foreground">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          Oops! The page you're looking for seems to have wandered off into the garden. Let's get
          you back on track.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link to="/">
              <Home className="mr-2 h-5 w-5" />
              Go Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/plants">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Browse Plants
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
