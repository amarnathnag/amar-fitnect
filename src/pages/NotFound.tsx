
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  React.useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow flex items-center justify-center py-16">
        <div className="container-custom">
          <div className="max-w-md mx-auto text-center">
            <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/20">
              <AlertTriangle className="h-10 w-10 text-red-600 dark:text-red-400" />
            </div>
            <h1 className="text-6xl font-bold mb-4 text-health-dark dark:text-health-primary">404</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              Oops! The page you're looking for doesn't exist.
            </p>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              The page might have been moved, deleted, or never existed in the first place.
            </p>
            <Button className="btn-primary" asChild>
              <Link to="/">
                <Home className="mr-2 h-4 w-4" /> Return to Home
              </Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
