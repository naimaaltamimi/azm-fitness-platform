import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Search,
  ArrowLeft,
  Dumbbell,
  Flame,
  Salad,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

/* ─── Hero Slide Data ─── */
interface SlideItem {
  id: number;
  tag: string;
  badgeType: 'gym' | 'calorie' | 'nutrition';
  headline: string;
  subtitle: string;
  ctaLabel: string;
  ctaLink: string;
  searchPlaceholder: string;
  image: string;
  alt: string;
}

const heroSlides: SlideItem[] = [
  {
    id: 1,
    tag: 'منصة عزم الرياضية • ساحل حضرموت',
    badgeType: 'gym',
    headline: 'لياقتك تبدأ من هنا!',
    subtitle:
      'اكتشف أفضل الصالات الرياضية المعتمدة في المكلا (الشرج، فوة، الديس)، واحسب سعراتك وخطتك الغذائية بدقة علمية وفق أسعار رسمية بالريال اليمني.',
    ctaLabel: 'استكشف',
    ctaLink: '/gyms',
    searchPlaceholder: 'ابحث عن صالة رياضية، منطقة (فوة، الشرج، الديس)...',
    image:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=85',
    alt: 'تدريب كمال أجسام وأجهزة رياضية متطورة في المكلا',
  },
  {
    id: 2,
    tag: 'حاسبة السعرات والماكروز العلمية',
    badgeType: 'calorie',
    headline: 'غذاؤك.. علم وليس تخميناً!',
    subtitle:
      'احسب احتياجك اليومي من السعرات والبروتين والماء وفق معادلة ميفلين-سانت جور المعتمدة عالمياً مع احتساب تعويض الرطوبة وحرارة الساحل بدقة.',
    ctaLabel: 'احسب الآن',
    ctaLink: '/calculator',
    searchPlaceholder: 'احسب سعراتك أو ابحث عن هدفك (تنشيف / تضخيم)...',
    image:
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1920&q=85',
    alt: 'حساب السعرات والماكروز بدقة علمية',
  },
  {
    id: 3,
    tag: 'تغذية ساحلية حضرمية',
    badgeType: 'nutrition',
    headline: 'وجبات صحية من بحر المكلا!',
    subtitle:
      'وصفات غنية بالبروتين مبنية على صيد بحر المكلا الطازج من سمك الثمد والباغة ومنتجات البيئة الحضرمية لدعم أهدافك في البناء العضلي والتنشيف.',
    ctaLabel: 'استكشف',
    ctaLink: '/meals',
    searchPlaceholder: 'ابحث عن وجبة صحية (سمك ثمد، باغة، بروتين حضرمي)...',
    image:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1920&q=85',
    alt: 'وجبات صحية من صيد بحر المكلا غنية بالبروتين',
  },
];

export const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const touchStartXRef = useRef<number | null>(null);
  const navigate = useNavigate();

  const totalSlides = heroSlides.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (idx: number) => {
    setCurrentSlide(idx);
  };

  /* ─── Autoplay timer (6.5s) with pause on hover ─── */
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 6500);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  /* ─── Touch Swipe Gestures ─── */
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;

    // RTL: Swipe left (diff > 50) moves next; swipe right (diff < -50) moves prev
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    touchStartXRef.current = null;
  };

  /* ─── Integrated Search & CTA Submit ─── */
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slide = heroSlides[currentSlide];
    const query = searchQuery.trim();

    if (!query) {
      navigate(slide.ctaLink);
      return;
    }

    if (slide.badgeType === 'nutrition') {
      navigate(`/meals?search=${encodeURIComponent(query)}`);
    } else {
      navigate(`/gyms?search=${encodeURIComponent(query)}`);
    }
  };

  const slide = heroSlides[currentSlide];

  const renderBadgeIcon = (type: SlideItem['badgeType']) => {
    switch (type) {
      case 'gym':
        return <Dumbbell className="w-3.5 h-3.5 text-[#D97241]" />;
      case 'calorie':
        return <Flame className="w-3.5 h-3.5 text-[#F59E0B]" />;
      case 'nutrition':
        return <Salad className="w-3.5 h-3.5 text-[#7D9683]" />;
    }
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-[#1F2722] font-['Cairo','Tajawal',sans-serif] min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] xl:min-h-[740px] flex items-center justify-center select-none"
      dir="rtl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="القسم الرئيسي لمنصة عزم"
    >
      {/* ════════════════════════════════════════════════════════════════
          1. SYNCHRONIZED BACKGROUND IMAGES (CROSS-FADE + SLOW ZOOM)
          (اقتباس من التصميم المرفق: صورة سينمائية مع إضاءة دائرية محيطية وتلاشٍ دافئ)
      ════════════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {heroSlides.map((item, idx) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-all duration-1000 ease-out will-change-transform ${
              idx === currentSlide
                ? 'opacity-100 scale-100 z-10'
                : 'opacity-0 scale-105 z-0'
            }`}
            aria-hidden={idx !== currentSlide}
          >
            <img
              src={item.image}
              alt={item.alt}
              className="w-full h-full object-cover object-center"
              loading={idx === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}

        {/* ─── Layered Ambient Lighting & Vignette Overlay (طريقة الصورة المرفقة) ─── */}
        {/* Dark radial glow centered on the content */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(217,114,65,0.15)_0%,_rgba(31,39,34,0.7)_45%,_rgba(21,28,23,0.95)_100%)]" />

        {/* Deep top-and-bottom gradient wash for razor-sharp text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F2722] via-[#1F2722]/80 via-35% to-[#1F2722]/60" />

        {/* Ambient Subtle Warm Glows */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#D97241]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* ════════════════════════════════════════════════════════════════
          2. CENTERED FOREGROUND CONTENT (SYNCHRONIZED WITH ACTIVE SLIDE)
          (مقتبس تماماً من الصورة: العنوان المركزي العريض + شريط البحث والاستكشاف)
      ════════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-center flex flex-col items-center justify-center">
        
        {/* Keyed container for smooth text entrance animation on slide change */}
        <div key={currentSlide} className="space-y-6 sm:space-y-7 animate-hero-fade w-full flex flex-col items-center">
          
          {/* Eyebrow Badge (مثل "نسخة تجريبية" في الصورة المرفقة) */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#FAF8F5] text-xs sm:text-sm font-bold shadow-md">
            {renderBadgeIcon(slide.badgeType)}
            <span className="tracking-normal">{slide.tag}</span>
          </div>

          {/* Main Display Headline (نفس أسلوب العنوان الكبير في الصورة المرفقة) */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.22] sm:leading-[1.25] tracking-tight drop-shadow-lg">
            {slide.headline}
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-base sm:text-lg lg:text-xl text-[#EAE5DA] leading-[1.8] sm:leading-[1.85] font-normal max-w-2xl mx-auto text-balance drop-shadow-sm">
            {slide.subtitle}
          </p>

          {/* ════════════════════════════════════════════════════════════════
              3. INTEGRATED SEARCH & DISCOVERY BAR (نفس شريط "استكشف" بالصورة)
          ════════════════════════════════════════════════════════════════ */}
          <div className="w-full max-w-2xl mx-auto pt-2 sm:pt-4">
            <form
              onSubmit={handleSearchSubmit}
              className="relative flex items-center bg-[#1F2722]/80 hover:bg-[#1F2722]/90 border border-white/20 focus-within:border-[#D97241] rounded-2xl sm:rounded-full p-2 sm:p-2.5 backdrop-blur-md shadow-2xl transition-all duration-300"
            >
              {/* Search Icon */}
              <div className="pr-3 pl-2 text-white/50 shrink-0">
                <Search className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              {/* Text Input */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={slide.searchPlaceholder}
                className="w-full bg-transparent text-white placeholder-white/50 text-xs sm:text-sm md:text-base font-medium focus:outline-none px-2"
                aria-label="ابحث في منصة عزم"
              />

              {/* Action Button (زر استكشف الطيني الأنيق مثل الصورة المرفقة) */}
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl sm:rounded-full bg-[#D97241] hover:bg-[#C75F2F] text-white font-black text-xs sm:text-sm md:text-base tracking-normal shadow-lg shadow-[#D97241]/35 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all shrink-0"
              >
                <span>{slide.ctaLabel}</span>
                <ArrowLeft className="w-4 h-4 text-white" />
              </button>
            </form>

            {/* Quick-Action Topic Pills under the search bar */}
            <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-[13px] text-[#C8BEAA]">
              <span className="text-white/60 font-semibold">اقتراحات سريعة:</span>
              <Link
                to="/gyms"
                className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium border border-white/15 transition-all"
              >
                صالات المكلا المعتمدة
              </Link>
              <Link
                to="/calculator"
                className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium border border-white/15 transition-all"
              >
                حاسبة السعرات
              </Link>
              <Link
                to="/meals"
                className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium border border-white/15 transition-all"
              >
                وجبات بحر المكلا
              </Link>
            </div>
          </div>

        </div>

        {/* ════════════════════════════════════════════════════════════════
            4. CAROUSEL CONTROLS (ARROWS + PROGRESS DOTS + COUNTER)
        ════════════════════════════════════════════════════════════════ */}
        <div className="mt-10 sm:mt-12 flex items-center justify-center gap-6">
          
          {/* Previous Arrow */}
          <button
            onClick={prevSlide}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/20 bg-white/10 hover:bg-[#D97241] text-white backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-md active:scale-95 group"
            aria-label="الشريحة السابقة"
            title="الشريحة السابقة"
          >
            <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>

          {/* Interactive Slide Dots */}
          <div className="flex items-center gap-2">
            {heroSlides.map((item, idx) => {
              const isActive = idx === currentSlide;
              return (
                <button
                  key={item.id}
                  onClick={() => goToSlide(idx)}
                  className={`h-2.5 rounded-full transition-all duration-500 ${
                    isActive
                      ? 'w-8 sm:w-10 bg-[#D97241] shadow-md shadow-[#D97241]/40'
                      : 'w-2.5 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`الانتقال إلى الشريحة ${idx + 1}`}
                />
              );
            })}
          </div>

          {/* Next Arrow */}
          <button
            onClick={nextSlide}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/20 bg-white/10 hover:bg-[#D97241] text-white backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-md active:scale-95 group"
            aria-label="الشريحة التالية"
            title="الشريحة التالية"
          >
            <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>

          {/* Numerical Counter */}
          <div className="hidden sm:block font-mono text-xs sm:text-sm font-bold text-white/70 tracking-wider mr-2">
            <span className="text-white">0{currentSlide + 1}</span>
            <span className="text-white/40 mx-1">/</span>
            <span className="text-white/60">0{totalSlides}</span>
          </div>

        </div>

      </div>
    </section>
  );
};

export default HeroSection;
