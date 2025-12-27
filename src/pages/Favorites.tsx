import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client"; 
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Heart, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Favorites = () => {
  const { user, loading: authLoading } = useAuth();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // If auth is done loading and no user, kick them out
    if (!authLoading && !user) {
      toast.error("Please log in to view favorites");
      navigate("/login");
      return;
    }

    const fetchFavorites = async () => {
      if (!user) return;

      try {
        setLoading(true);
        // MFetch favorites AND the related listing data
        const { data, error } = await (supabase as any)
          .from("favorites")
          .select(`
            id,
            listings (
              *
            )
          `)
          .eq("user_id", user.id);

        if (error) throw error;

        // The data comes back nested like: { id: 1, listings: { title: "Laptop", ... } }
        // We need to flatten it for the card
        const formattedFavorites = data
          ?.map((item: any) => item.listings) // Extract the listing object
          .filter((listing) => listing !== null); // Remove any nulls (deleted items)

        setFavorites(formattedFavorites || []);
      } catch (err) {
        console.error("Error fetching favorites:", err);
        toast.error("Failed to load favorites");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchFavorites();
    }
  }, [user, authLoading, navigate]);

  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Heart className="h-8 w-8 text-destructive fill-destructive" />
              My Favorites
            </h1>
            <p className="text-muted-foreground mt-1">
              {favorites.length} {favorites.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>
        </div>

        {/* Content */}
        {favorites.length === 0 ? (
          // Empty State
          <div className="text-center py-20 bg-muted/30 rounded-xl border-2 border-dashed">
            <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4 opacity-50" />
            <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
            <p className="text-muted-foreground mb-6">
              Start exploring and save items you want to watch!
            </p>
            <Link to="/explore">
              <Button className="bg-gradient-hero text-white">
                Explore Marketplace
              </Button>
            </Link>
          </div>
        ) : (
          // Grid of Cards
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                images={product.images || []}
                location_city={product.location_city}
                college_name={product.college_name}
                condition={product.condition}
                views={product.views || 0}
                favorites={product.favorites || 0} // This is the total count
                verified={product.verified}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;