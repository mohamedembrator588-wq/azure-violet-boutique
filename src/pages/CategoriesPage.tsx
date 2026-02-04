import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import { Shirt, Watch, Footprints, Sparkles, ShoppingBag } from "lucide-react";

const categories = [
  {
    id: "men",
    name: "ملابس رجالية",
    description: "تشكيلة واسعة من الملابس الرجالية العصرية",
    icon: Shirt,
    productCount: 156,
    gradient: "from-blue-500 to-blue-700",
  },
  {
    id: "women",
    name: "ملابس نسائية",
    description: "أحدث صيحات الموضة النسائية",
    icon: Sparkles,
    productCount: 234,
    gradient: "from-pink-500 to-rose-600",
  },
  {
    id: "accessories",
    name: "إكسسوارات",
    description: "إكسسوارات أنيقة لإكمال إطلالتك",
    icon: Watch,
    productCount: 89,
    gradient: "from-amber-500 to-orange-600",
  },
  {
    id: "footwear",
    name: "أحذية",
    description: "أحذية مريحة وأنيقة لجميع المناسبات",
    icon: Footprints,
    productCount: 112,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    id: "outerwear",
    name: "ملابس خارجية",
    description: "جاكيتات ومعاطف لجميع الفصول",
    icon: ShoppingBag,
    productCount: 67,
    gradient: "from-purple-500 to-indigo-600",
  },
];

const CategoriesPage = () => {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">جميع الفئات</h1>
          <p className="text-muted-foreground">
            تصفح منتجاتنا حسب الفئة واكتشف ما يناسبك
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="group"
              >
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0">
                  <CardContent className="p-0">
                    <div
                      className={`bg-gradient-to-br ${category.gradient} p-8 text-white`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                          <IconComponent className="h-8 w-8" />
                        </div>
                        <span className="text-sm bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                          {category.productCount} منتج
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
                      <p className="text-white/80 text-sm">
                        {category.description}
                      </p>
                    </div>
                    <div className="p-4 bg-card flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        تصفح المنتجات
                      </span>
                      <span className="text-primary group-hover:translate-x-[-4px] transition-transform">
                        ←
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* All Products Link */}
        <div className="mt-12 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:bg-primary/90 transition-colors"
          >
            <ShoppingBag className="h-5 w-5" />
            عرض جميع المنتجات
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
