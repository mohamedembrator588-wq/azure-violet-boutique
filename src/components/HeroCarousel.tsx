import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

interface CarouselItem {
  id: number;
  image: string;
  title: string;
  price: string;
}

const items: CarouselItem[] = [
  { id: 1, image: "https://picsum.photos/400/500?random=1", title: "فستان صيفي أنيق", price: "299 ر.س" },
  { id: 2, image: "https://picsum.photos/400/500?random=2", title: "بلوزة كاجوال", price: "149 ر.س" },
  { id: 3, image: "https://picsum.photos/400/500?random=3", title: "بنطلون جينز", price: "199 ر.س" },
  { id: 4, image: "https://picsum.photos/400/500?random=4", title: "جاكيت شتوي", price: "399 ر.س" },
  { id: 5, image: "https://picsum.photos/400/500?random=5", title: "تنورة قصيرة", price: "129 ر.س" },
  { id: 6, image: "https://picsum.photos/400/500?random=6", title: "قميص رسمي", price: "179 ر.س" },
  { id: 7, image: "https://picsum.photos/400/500?random=7", title: "فستان سهرة", price: "599 ر.س" },
  { id: 8, image: "https://picsum.photos/400/500?random=8", title: "بدلة رجالي", price: "899 ر.س" },
  { id: 9, image: "https://picsum.photos/400/500?random=9", title: "حذاء رياضي", price: "249 ر.س" },
  { id: 10, image: "https://picsum.photos/400/500?random=10", title: "حقيبة يد", price: "349 ر.س" },
  { id: 11, image: "https://picsum.photos/400/500?random=11", title: "ساعة أنيقة", price: "499 ر.س" },
  { id: 12, image: "https://picsum.photos/400/500?random=12", title: "نظارة شمسية", price: "199 ر.س" },
];

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const isMobile = useIsMobile();
  
  const visibleItems = isMobile ? 1 : 4;
  const maxIndex = items.length - visibleItems;

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <Card className="relative overflow-hidden rounded-lg bg-gradient-to-r from-primary/5 to-secondary/5">
      <div className="relative py-8 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">أحدث المنتجات</h2>
          <p className="text-muted-foreground">اكتشف تشكيلتنا المميزة</p>
        </div>

        {/* Carousel Content */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out gap-4"
            style={{ 
              transform: `translateX(calc(${currentIndex * (100 / visibleItems)}% + ${currentIndex * 16}px))` 
            }}
          >
            {items.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-lg bg-card shadow-md hover:shadow-xl transition-all duration-300 flex-shrink-0"
                style={{ width: `calc(${100 / visibleItems}% - ${(visibleItems - 1) * 16 / visibleItems}px)` }}
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                  <p className="text-primary-light font-bold">{item.price}</p>
                </div>
                {/* Always visible overlay for mobile */}
                <div className="md:hidden absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="font-semibold text-white text-sm">{item.title}</h3>
                  <p className="text-primary-light font-bold text-sm">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <Button
          variant="secondary"
          size="icon"
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/90 hover:bg-white shadow-lg"
          onClick={prevSlide}
        >
          <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/90 hover:bg-white shadow-lg"
          onClick={nextSlide}
        >
          <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
        </Button>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-primary w-8"
                  : "bg-primary/30 w-2 hover:bg-primary/50"
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>

        {/* Auto-play toggle */}
        <div className="absolute top-2 left-2 z-20">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground text-xs"
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          >
            {isAutoPlaying ? "⏸️" : "▶️"}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default HeroCarousel;