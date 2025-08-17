import { useLocation, Link } from "react-router";
import { useEffect } from "react";
import { Home, AlertCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-24">
      <div className="glass-card p-12 text-center max-w-md animate-scale-in">
        <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-glow">
          <AlertCircle className="w-10 h-10 text-white" />
        </div>

        <h1 className="text-6xl font-bold text-gradient-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-glass-foreground mb-4">
          Page Not Found
        </h2>
        <p className="text-muted-foreground mb-8">
          The page you're looking for seems to have taken a different route.
        </p>

        <Link
          to="/"
          className="btn-primary-glass flex items-center space-x-2 mx-auto"
        >
          <Home size={20} />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
