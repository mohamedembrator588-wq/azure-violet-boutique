import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";

// Mock product data
const allProducts = Array.from({ length: 50 }, (_, i) => ({
  id: `product-${i + 1}`,
  name: `منتج ${i + 1}`,
  price: Math.round((Math.random() * 200 + 20) * 100) / 100,
  originalPrice:
    Math.random() > 0.7
      ? Math.round((Math.random() * 100 + 250) * 100) / 100
      : undefined,
  image: `https://picsum.photos/600/600?random=${i + 100}`,
  category: ["رجالي", "نسائي", "إكسسوارات", "أحذية", "ملابس خارجية"][
    Math.floor(Math.random() * 5)
  ],
  isNew: Math.random() > 0.8,
  isOnSale: Math.random() > 0.7,
  rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
  colors: [
    ["#000000", "#FFFFFF", "#FF0000"],
    ["#0000FF", "#00FF00", "#FFFF00"],
    ["#800080", "#FFA500", "#FFC0CB"],
  ][Math.floor(Math.random() * 3)],
}));

const sortOptions = [
  { value: "relevance", label: "الأكثر صلة" },
  { value: "price-low", label: "السعر: من الأقل للأعلى" },
  { value: "price-high", label: "السعر: من الأعلى للأقل" },
  { value: "newest", label: "الأحدث أولاً" },
  { value: "rating", label: "الأعلى تقييماً" },
];

const SearchResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchInput, setSearchInput] = useState(query);
  const [sortBy, setSortBy] = useState("relevance");
  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  useEffect(() => {
    let filtered = [...allProducts];

    // Search filter
    if (query) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "newest":
          return b.isNew ? 1 : -1;
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [query, sortBy]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim() });
    }
  };

  const clearSearch = () => {
    setSearchInput("");
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="text"
                  placeholder="ابحث عن منتجات..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="pr-10 pl-10 h-12 text-lg"
                />
                {searchInput && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
              <Button type="submit" size="lg" className="h-12 px-8">
                بحث
              </Button>
            </div>
          </form>
        </div>

        {/* Results Header */}
        {query && (
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold mb-1">
                  نتائج البحث عن "{query}"
                </h1>
                <p className="text-muted-foreground">
                  تم العثور على {filteredProducts.length} منتج
                </p>
              </div>

              {/* Sort & Filter Controls */}
              <div className="flex items-center gap-3">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SlidersHorizontal className="ml-2 h-4 w-4" />
                    <SelectValue placeholder="ترتيب حسب" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                جميع الفئات
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                رجالي
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                نسائي
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                إكسسوارات
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                أحذية
              </Badge>
            </div>
          </div>
        )}

        {/* Search Results */}
        {!query ? (
          <Card className="p-12 text-center max-w-lg mx-auto">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">ابدأ البحث</h3>
            <p className="text-muted-foreground mb-6">
              اكتب كلمة البحث للعثور على المنتجات التي تريدها
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link to="/search?q=قميص">
                <Badge variant="secondary" className="cursor-pointer">
                  قميص
                </Badge>
              </Link>
              <Link to="/search?q=حذاء">
                <Badge variant="secondary" className="cursor-pointer">
                  حذاء
                </Badge>
              </Link>
              <Link to="/search?q=ساعة">
                <Badge variant="secondary" className="cursor-pointer">
                  ساعة
                </Badge>
              </Link>
              <Link to="/search?q=جاكيت">
                <Badge variant="secondary" className="cursor-pointer">
                  جاكيت
                </Badge>
              </Link>
            </div>
          </Card>
        ) : filteredProducts.length === 0 ? (
          <Card className="p-12 text-center max-w-lg mx-auto">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">لا توجد نتائج</h3>
            <p className="text-muted-foreground mb-6">
              لم نتمكن من العثور على منتجات تطابق "{query}"
            </p>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">جرب:</p>
              <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                <li>التحقق من الإملاء</li>
                <li>استخدام كلمات مختلفة</li>
                <li>استخدام كلمات أقل</li>
              </ul>
              <Button variant="outline" onClick={clearSearch} className="mt-4">
                مسح البحث
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        )}

        {/* Browse Categories Link */}
        {filteredProducts.length > 0 && query && (
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">لم تجد ما تبحث عنه؟</p>
            <Link to="/categories">
              <Button variant="outline" size="lg">
                تصفح جميع الفئات
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
