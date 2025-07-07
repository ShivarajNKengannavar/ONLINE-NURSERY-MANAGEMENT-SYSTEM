
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="text-center">
              <CardHeader className="pb-4">
                <div className="text-6xl md:text-8xl font-bold text-primary mb-4">404</div>
                <CardTitle className="text-2xl md:text-3xl mb-2">
                  Oops! Page not found
                </CardTitle>
                <CardDescription className="text-base md:text-lg">
                  The page you're looking for doesn't exist or has been moved.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                  <strong>Requested URL:</strong> {location.pathname}
                </div>
                
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Don't worry! Here are some helpful links:
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button asChild className="w-full">
                      <Link to="/">
                        <Home className="w-4 h-4 mr-2" />
                        Go Home
                      </Link>
                    </Button>
                    
                    <Button variant="outline" asChild className="w-full">
                      <Link to="/plants">
                        <Search className="w-4 h-4 mr-2" />
                        Browse Plants
                      </Link>
                    </Button>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    onClick={() => window.history.back()}
                    className="w-full sm:w-auto"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Go Back
                  </Button>
                </div>

                <div className="mt-8 p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">
                    Looking for something specific?
                  </h3>
                  <div className="text-sm text-green-700 space-y-1">
                    <div>• Check out our <Link to="/plants" className="underline">Plants Collection</Link></div>
                    <div>• Browse <Link to="/seeds" className="underline">Seeds & Bulbs</Link></div>
                    <div>• Explore <Link to="/tools" className="underline">Garden Tools</Link></div>
                    <div>• Learn about <Link to="/garden-care" className="underline">Garden Care</Link></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
