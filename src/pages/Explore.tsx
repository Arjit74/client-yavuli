import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { listingsAPI } from '@/lib/api';
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import SEO from "@/components/SEO";

const Explore = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const [activeCategory, setActiveCategory] = useState("all");
  const navigate = useNavigate();

  const categories = [
    { label: "All", value: "all" },
    { label: "Electronics", value: "electronics" },
    { label: "Books", value: "books" },
    { label: "Fashion", value: "fashion" },
    { label: "Furniture", value: "furniture" },
    { label: "Others", value: "others" },
  ];

  // --- Debounce search query ---
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params: any = { limit: 50 }; // Fetch up to 50 items

      if (debouncedSearch) {
        params.searchQuery = debouncedSearch;
      }

      if (activeCategory !== "all") {
        params.category = activeCategory;
      }

      const response = await listingsAPI.getAll(params);
      setProducts(Array.isArray(response) ? response : []);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [debouncedSearch, activeCategory]);

  const handleResetFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('search');
    setSearchParams(params, { replace: true });
    setActiveCategory("all");
  };

  return (
    <div className="min-h-screen bg-white selection:bg-primary/20">
      <SEO
        title="Explore Yavuli Marketplace | Buy & Sell College Essentials"
        description="Browse thousands of student-listed items. Find affordable textbooks, dorm essentials, and electronics at your campus. The best student marketplace founded by Kishlaya Mishra."
        keywords="Yavuli explore, buy used textbooks, student marketplace, Kishlaya Mishra, cheap electronics, college dorm essentials"
      />
      <Navbar />

      <main className="container mx-auto px-6 py-12 max-w-7xl">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="space-y-3">
            <h1 className="text-5xl font-black tracking-tighter text-slate-900">Explore</h1>
            <p className="text-lg text-slate-500 font-medium max-w-md">
              A curated collection of items from your trusted campus community.
            </p>
          </div>
          <div className="w-full md:w-[400px] relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
            <Input
              className="h-16 pl-14 pr-6 bg-slate-50 border-slate-100 rounded-[2rem] text-lg font-medium shadow-sm focus-visible:ring-2 focus-visible:ring-primary/20 transition-all text-slate-900 placeholder:text-slate-300"
              placeholder="Search anything..."
              value={searchQuery}
              onChange={(e) => {
                const params = new URLSearchParams(searchParams);
                if (e.target.value) {
                  params.set('search', e.target.value);
                } else {
                  params.delete('search');
                }
                setSearchParams(params, { replace: true });
              }}
            />
          </div>
        </header>

        {/* Categories */}
        <div className="flex gap-3 mb-12 overflow-x-auto pb-4 no-scrollbar">
          {categories.map((cat) => (
            <Button
              key={cat.value}
              variant={activeCategory === cat.value ? "default" : "ghost"}
              onClick={() => setActiveCategory(cat.value)}
              className={`rounded-full px-8 h-12 text-sm font-bold transition-all ${activeCategory === cat.value
                ? "shadow-lg shadow-primary/10"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
            {products.length} Results
          </p>
          {(searchQuery || activeCategory !== "all") && (
            <Button
              variant="link"
              onClick={handleResetFilters}
              className="h-auto p-0 text-primary font-bold"
            >
              Reset Filters
            </Button>
          )}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="rounded-[2rem] border border-slate-100 bg-white overflow-hidden">
                <div className="aspect-[4/3] bg-slate-200 animate-pulse relative">
                  <div className="absolute top-2 left-2 h-5 w-16 rounded-full bg-slate-300 animate-pulse" />
                </div>
                <div className="p-3 space-y-2.5">
                  <div className="h-3.5 bg-slate-200 rounded-full w-4/5 animate-pulse" />
                  <div className="h-5 bg-slate-300 rounded-full w-2/5 animate-pulse" />
                  <div className="flex items-center gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-slate-200 shrink-0 animate-pulse" />
                    <div className="h-3 bg-slate-200 rounded-full w-3/5 animate-pulse" />
                  </div>
                  <div className="h-3 bg-slate-200 rounded-full w-1/2 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <div className="space-y-10">
            {/* Ghost listing — only when user has actually typed something */}
            {searchQuery.trim() && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                <button
                  type="button"
                  onClick={() => navigate(`/sell?title=${encodeURIComponent(searchQuery.trim())}`)}
                  className="group text-left focus:outline-none"
                >
                  {/* Card shell — mirrors ProductCard exactly */}
                  <div className="overflow-hidden transition-all duration-200 hover:shadow-xl hover:-translate-y-1 border-2 border-dashed border-slate-200 hover:border-primary/40 rounded-[2rem] bg-white/70 cursor-pointer">
                    {/* Image area */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center">
                      <div className="flex flex-col items-center gap-2 opacity-30 group-hover:opacity-50 transition-opacity select-none">
                        <svg className="h-14 w-14 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      {/* badge like ProductCard's condition badge */}
                      <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-500 border border-amber-200/80 select-none">
                        Not listed yet
                      </div>
                    </div>

                    {/* Details — same padding/spacing as ProductCard */}
                    <div className="p-3 space-y-2">
                      {/* Title — updates in real time with searchQuery */}
                      <h3 className="font-semibold text-sm line-clamp-1 text-slate-400 group-hover:text-slate-700 transition-colors">
                        {searchQuery}
                      </h3>

                      {/* CTA in place of price */}
                      <p className="text-sm font-bold text-primary/50 group-hover:text-primary transition-colors">
                        Sell yours →
                      </p>

                      {/* Location row placeholder */}
                      <div className="flex items-center gap-1 text-xs text-slate-300">
                        <svg className="h-3 w-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>Your campus</span>
                      </div>

                      {/* College row placeholder */}
                      <p className="text-xs text-slate-300 line-clamp-1">
                        Be the first to list this item
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            )}

            {/* Message + show all button */}
            <div className="text-center py-8 space-y-5">
              <div className="space-y-1.5">
                <p className="text-slate-400 font-medium text-sm">
                  {searchQuery.trim()
                    ? `No listings found for "${searchQuery}"`
                    : "No matches found. Try adjusting your search or category."}
                </p>
              </div>
              <Button
                onClick={handleResetFilters}
                variant="outline"
                className="rounded-xl px-10 h-12 font-bold border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300"
              >
                Show all items
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Explore;