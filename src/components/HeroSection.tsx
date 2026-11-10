import React, { useState, useEffect, useCallback, useRef } from 'react';
import "./HeroSection.styles.css";
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Leaf,
  Dumbbell,
  Flame,
  Salad,
  Sparkles,
} from 'lucide-react';

/* ─── Hero Slide Data (Kitchen Yuma Frameless Style + AZM Brand) ─── */
interface SlideItem {
  id: number;
  tag: string;
  badgeType: 'nutrition' | 'gym' | 'calorie';
  headlineHighlight: string;
  headlineRest: string;
  subtitle: string;
  primaryLabel: string;
  primaryLink: string;
  secondaryLabel: string;
  secondaryLink: string;
  image: string;
  floatingBadge: string;
  alt: string;
}

const heroSlides: SlideItem[] = [
  {
    id: 1,
    tag: 'تغذية ساحلية حضرمية',
    badgeType: 'nutrition',
    headlineHighlight: 'وجبات صحية',
    headlineRest: 'من بحر المكلا.',
    subtitle:
      'وصفات غنية بالبروتين مبنية على صيد المكلا الطازج من سمك الثمد والباغة ومنتجات البيئة الحضرمية لدعم أهدافك في البناء العضلي والتنشيف.',
    primaryLabel: 'تصفح الوجبات',
    primaryLink: '/meals',
    secondaryLabel: 'احسب سعراتك',
    secondaryLink: '/calculator',
    image:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=85',
    floatingBadge: 'صيد بحر المكلا الطازج • بروتين عالي',
    alt: 'طبق تغذية صحية من صيد بحر المكلا',
  },
  {
    id: 2,
    tag: 'منصة عزم الرياضية • ساحل حضرموت',
    badgeType: 'gym',
    headlineHighlight: 'لياقتك تبدأ',
    headlineRest: 'من هنا.',
    subtitle:
      'اكتشف أفضل الصالات الرياضية المعتمدة في المكلا (الشرج، فوة، الديس) بأسعار رسمية بالريال اليمني دون وسطاء مع جداول الفترات المحدثة.',
    primaryLabel: 'استكشف الصالات',
    primaryLink: '/gyms',
    secondaryLabel: 'دليل الكباتن',
    secondaryLink: '/trainers',
    image:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=85',
    floatingBadge: 'صالات موثقة ميدانياً 2026 • أسعار رسمية',
    alt: 'تدريب كمال أجسام وأجهزة رياضية متطورة بالمكلا',
  },
  {
    id: 3,
    tag: 'حاسبة السعرات والماكروز العلمية',
    badgeType: 'calorie',
    headlineHighlight: 'غذاؤك علم',
    headlineRest: 'وليس تخميناً.',
    subtitle:
      'احسب احتياجك اليومي من السعرات والبروتين والماء وفق معادلة ميفلين-سانت جور المعتمدة عالمياً مع احتساب تعويض الرطوبة وحرارة الساحل بدقة.',
    primaryLabel: 'احسب سعراتك الآن',
    primaryLink: '/calculator',
    secondaryLabel: 'الخطة الغذائية',
    secondaryLink: '/nutrition-plan',
    image:
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=85',
    floatingBadge: 'معادلة ميفلين العالمية • تعويض المناخ',
    alt: 'حساب السعرات والماكروز بدقة علمية',
  },
];

export const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

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

  /* ─── Autoplay timer (6.5s) ─── */
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 6500);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  /* ─── Mobile Swipe Handlers ─── */
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;
    if (diff > 50) nextSlide();
    else if (diff < -50) prevSlide();
    touchStartXRef.current = null;
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
      className="relative w-full overflow-hidden bg-gradient-to-bl from-[#FAF8F5] via-[#F4F1EA] to-[#EDE8DF] font-['Cairo','Tajawal',sans-serif] min-h-[580px] sm:min-h-[640px] lg:min-h-[680px] flex items-center select-none"
      dir="rtl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="القسم الرئيسي لمنصة عزم"
    >
      {/* ─── Organic Ambient Glows & Botanical Accents (Kitchen Yuma Style) ─── */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-accent-10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary-10 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Botanical Elements Floating in Background */}
      <div className="absolute top-8 left-1/4 opacity-15 pointer-events-none hidden lg:block">
        <Leaf className="w-20 h-20 text-[#7D9683] rotate-45 transform" />
      </div>
      <div className="absolute bottom-12 left-1/3 opacity-15 pointer-events-none hidden lg:block">
        <Leaf className="w-16 h-16 text-[#D97241] -rotate-12 transform" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* ════════════════════════════════════════════════════════════════
              1. RIGHT SIDE (RTL): TYPOGRAPHY & ACTIONS (KITCHEN YUMA STYLE)
          ════════════════════════════════════════════════════════════════ */}
          <div className="space-y-6 sm:space-y-7 text-right order-2 lg:order-1">
            
            {/* Tag / Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#DED7C8] text-primary text-xs sm:text-sm font-bold shadow-sm">
              {renderBadgeIcon(slide.badgeType)}
              <span className="tracking-normal">{slide.tag}</span>
            </div>

            {/* Display Headline with Terracotta Highlight (Enjoy Healthy Life style) */}
            <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-black text-dark leading-[1.18] sm:leading-[1.2] tracking-tight">
              <span className="text-[#D97241] block sm:inline">{slide.headlineHighlight} </span>
              <span className="text-[#1F2722]">{slide.headlineRest}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#536559] leading-[1.85] font-medium max-w-xl text-balance">
              {slide.subtitle}
            </p>

            {/* Action Buttons (Pill-shaped Primary + Outlined Secondary) */}
            <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
              <Link
                to={slide.primaryLink}
                className="inline-flex items-center justify-center gap-2.5 px-8 sm:px-9 py-4 rounded-full bg-[#D97241] hover:bg-[#C75F2F] text-white font-black text-base shadow-xl shadow-[#D97241]/25 hover:shadow-2xl hover:shadow-[#D97241]/40 hover:scale-[1.02] active:scale-[0.98] transition-all group min-h-[54px]"
              >
                <span>{slide.primaryLabel}</span>
                <ArrowLeft className="w-5 h-5 text-white group-hover:-translate-x-1.5 transition-transform" />
              </Link>

              <Link
                to={slide.secondaryLink}
                className="inline-flex items-center justify-center px-7 sm:px-8 py-4 rounded-full border-2 border-[#1F2722]/20 hover:border-[#D97241] text-[#1F2722] hover:text-[#D97241] font-bold text-base transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[54px]"
              >
                <span>{slide.secondaryLabel}</span>
              </Link>
            </div>

            {/* Navigation Arrows on Bottom-Right */}
            <div className="pt-4 flex items-center gap-2.5">
              <button
                onClick={prevSlide}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#DED7C8] bg-white hover:bg-[#FAF8F5] text-[#536559] hover:text-[#1F2722] flex items-center justify-center transition-all duration-300 shadow-sm active:scale-95 group"
                aria-label="الشريحة السابقة"
                title="الشريحة السابقة"
              >
                <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#DED7C8] bg-white hover:bg-[#FAF8F5] text-[#536559] hover:text-[#1F2722] flex items-center justify-center transition-all duration-300 shadow-sm active:scale-95 group"
                aria-label="الشريحة التالية"
                title="الشريحة التالية"
              >
                <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>

              <div className="font-mono text-xs sm:text-sm font-bold text-[#536559] tracking-wider mr-2">
                <span className="text-[#1F2722]">0{currentSlide + 1}</span>
                <span className="text-[#536559]/50 mx-1">/</span>
                <span className="text-[#536559]/70">0{totalSlides}</span>
              </div>
            </div>

          </div>

          {/* ════════════════════════════════════════════════════════════════
              2. LEFT SIDE (RTL): FRAMELESS FLOATING DISH (KITCHEN YUMA STYLE)
              (طبق دائري عضوي غير مقيد بإطار مع ظلال ناعمة وزينة نباتية طافية)
          ════════════════════════════════════════════════════════════════ */}
          <div className="relative order-1 lg:order-2 flex flex-col items-center justify-center">
            
            {/* The Frameless Circular Visual */}
            <div className="relative flex items-center justify-center">
              
              {/* Outer soft ambient glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#D97241]/20 via-[#7D9683]/15 to-transparent blur-2xl transform scale-110 pointer-events-none" />

              {/* Top Floating Badge (like leaves & ingredients in Kitchen Yuma) */}
              <div className="absolute -top-3 -right-2 sm:-top-4 sm:-right-4 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-lg border border-[#EDE8DF] text-xs font-bold text-[#1F2722] flex items-center gap-1.5 z-20 animate-bounce duration-1000">
                <Sparkles className="w-3.5 h-3.5 text-[#D97241]" />
                <span>{slide.floatingBadge}</span>
              </div>

              {/* The Circular Dish Container (NO RECTANGULAR BOX!) */}
              <div className="relative w-[290px] h-[290px] sm:w-[380px] sm:h-[380px] lg:w-[440px] lg:h-[440px] rounded-full shadow-[0_28px_65px_-12px_rgba(0,0,0,0.22),0_12px_30px_-6px_rgba(217,114,65,0.18)] ring-8 sm:ring-[10px] ring-white/90 overflow-hidden bg-white transition-all duration-700">
                <img
                  key={currentSlide}
                  src={slide.image}
                  alt={slide.alt}
                  className="w-full h-full object-cover animate-[fadeIn_0.5s_ease-in-out] will-change-transform"
                  loading="eager"
                />
              </div>

            </div>

            {/* ════════════════════════════════════════════════════════════════
                تنسيق متناسب تماماً تحت الصورة الدائرية (Live Badge + Slide Dots)
            ════════════════════════════════════════════════════════════════ */}
            <div className="w-full max-w-[420px] mt-6 sm:mt-7 flex items-center justify-between px-3">
              {/* Live Instant Inquiry Pill */}
              <a
                href="https://wa.me/967770000000?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D9%85%D9%86%D8%B5%D8%A9%20%D8%B9%D8%B2%D9%85%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%A3%D9%81%D8%B6%D9%84%20%D8%B5%D8%A7%D9%84%D8%A9%20%D8%B1%D9%8A%D8%A7%D8%B6%D9%8A%D8%A9%20%D9%82%D8%B1%D9%8A%D8%A8%D8%A9%20%D9%85%D9%86%D9%8A%20%D9%81%D9%8A%20%D8%A7%D9%84%D9%85%D9%83%D9%84%D8%A7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#1F2722] hover:bg-[#D97241] text-white text-xs font-bold shadow-md transition-all duration-300 hover:scale-105 active:scale-95 border border-white/10"
                title="تواصل مباشر عبر واتساب"
              >
                <div className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                </div>
                <span className="tracking-normal">استفسار فوري • صالات المكلا</span>
              </a>

              {/* Dots Indicator */}
              <div className="flex items-center gap-2">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`rounded-full transition-all duration-300 ${
                      idx === currentSlide
                        ? 'w-7 sm:w-8 h-2.5 bg-[#D97241] shadow-sm shadow-[#D97241]/30'
                        : 'w-2.5 h-2.5 bg-[#DED7C8] hover:bg-[#C8BEAA]'
                    }`}
                    aria-label={`الشريحة ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
