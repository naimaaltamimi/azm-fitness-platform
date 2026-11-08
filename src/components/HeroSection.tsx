import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Dumbbell,
  Flame,
  Salad,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

/* ─── Hero Slide Data ─── */
interface SlideItem {
  id: number;
  tag: string;
  badgeType: 'gym' | 'calorie' | 'nutrition';
  headlinePrefix: string;
  highlightedBadge: string;
  headlineSuffix: string;
  subtitle: string;
  ctaLabel: string;
  ctaLink: string;
  secondaryLabel: string;
  secondaryLink: string;
  image: string;
  alt: string;
}

const heroSlides: SlideItem[] = [
  {
    id: 1,
    tag: 'منصة عزم الرياضية • ساحل حضرموت',
    badgeType: 'gym',
    headlinePrefix: 'لياقتك تبدأ من',
    highlightedBadge: '#1 صالات معتمدة',
    headlineSuffix: 'بالمكلا وساحل حضرموت',
    subtitle:
      'اكتشف أفضل الصالات الرياضية المعتمدة في المكلا (الشرج، فوة، الديس)، واحسب سعراتك وخطتك الغذائية بدقة علمية وفق أسعار رسمية بالريال اليمني دون وسطاء.',
    ctaLabel: 'استكشف الصالات المعتمدة',
    ctaLink: '/gyms',
    secondaryLabel: 'احسب سعراتك مجاناً',
    secondaryLink: '/calculator',
    image:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1800&q=85',
    alt: 'تدريب كمال أجسام وأجهزة رياضية متطورة في المكلا',
  },
  {
    id: 2,
    tag: 'حاسبة السعرات والماكروز العلمية',
    badgeType: 'calorie',
    headlinePrefix: 'غذاؤك وحساب سعراتك',
    highlightedBadge: '#1 علم وليس تخميناً',
    headlineSuffix: 'وفق مناخ ساحل حضرموت',
    subtitle:
      'احسب احتياجك اليومي من السعرات والبروتين والماء وفق معادلة ميفلين-سانت جور المعتمدة عالمياً مع احتساب تعويض الرطوبة وحرارة الساحل بدقة.',
    ctaLabel: 'احسب سعراتك الآن مجاناً',
    ctaLink: '/calculator',
    secondaryLabel: 'استكشف الخطة الغذائية',
    secondaryLink: '/nutrition-plan',
    image:
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1800&q=85',
    alt: 'حساب السعرات الغذائية والماكروز بدقة علمية مع طبق صحي غني',
  },
  {
    id: 3,
    tag: 'تغذية ساحلية حضرمية',
    badgeType: 'nutrition',
    headlinePrefix: 'وجبات صحية ورياضية من',
    highlightedBadge: '#1 صيد بحر المكلا',
    headlineSuffix: 'بروتين طبيعي عالي الجودة',
    subtitle:
      'وصفات غنية بالبروتين مبنية على صيد بحر المكلا الطازج من سمك الثمد والباغة ومنتجات البيئة الحضرمية لدعم أهدافك في البناء العضلي والتنشيف.',
    ctaLabel: 'تصفح مكتبة الوجبات',
    ctaLink: '/meals',
    secondaryLabel: 'دليل الكباتن والمدربين',
    secondaryLink: '/trainers',
    image:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1800&q=85',
    alt: 'وجبات صحية من صيد بحر المكلا الطازج غنية بالبروتين',
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

  /* ─── Autoplay timer (6.5s) with pause on hover ─── */
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

    // RTL: Swipe left (diff > 50) moves next; swipe right (diff < -50) moves prev
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
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
      className="relative w-full overflow-hidden bg-[#1F2722] font-['Cairo','Tajawal',sans-serif] min-h-[600px] sm:min-h-[660px] lg:min-h-[700px] xl:min-h-[740px] flex items-center select-none"
      dir="rtl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="القسم الرئيسي لمنصة عزم"
    >
      {/* ════════════════════════════════════════════════════════════════
          1. FULL-BLEED HORIZONTAL IMAGES (EXTENDING ACROSS THE LEFT SIDE TO EDGE)
          (مقتبس من تصميم MyFitnessPal: امتداد أفقي كامل مع تلاشٍ انسيابي)
      ════════════════════════════════════════════════════════════════ */}
      <div className="absolute inset-y-0 left-0 w-full lg:w-[58%] xl:w-[60%] h-full z-0 overflow-hidden pointer-events-none">
        {heroSlides.map((item, idx) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out will-change-transform ${
              idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            aria-hidden={idx !== currentSlide}
          >
            <img
              src={item.image}
              alt={item.alt}
              className="w-full h-full object-cover object-center lg:object-left"
              loading={idx === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}

        {/* ─── Seamless Horizontal Gradient Blend (MyFitnessPal Signature Pattern) ─── */}
        {/* On Desktop RTL: Left is exposed clear photo, Right blends into solid #1F2722 */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-transparent via-[#1F2722]/55 via-55% via-[#1F2722]/90 via-80% to-[#1F2722] to-100%" />

        {/* On Mobile / Tablet: Gradient washes top-to-bottom for 100% Arabic text clarity */}
        <div className="lg:hidden absolute inset-0 bg-gradient-to-b from-[#1F2722]/35 from-0% via-[#1F2722]/85 via-45% to-[#1F2722] to-85%" />

        {/* Ambient Brand Glows (Terracotta & Sage) */}
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-[#D97241]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-[#7D9683]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* ════════════════════════════════════════════════════════════════
          2. FOREGROUND CONTENT (SYNCHRONIZED WITH ACTIVE SLIDE)
      ════════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24 flex flex-col justify-between min-h-[600px] sm:min-h-[660px] lg:min-h-[700px] xl:min-h-[740px]">
        <div className="max-w-2xl text-right my-auto">
          
          {/* Keyed container for smooth entrance transition whenever currentSlide changes */}
          <div key={currentSlide} className="space-y-6 sm:space-y-7 animate-hero-fade">
            
            {/* Tag / Eyebrow Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#FAF8F5] text-xs sm:text-sm font-bold shadow-sm">
              {renderBadgeIcon(slide.badgeType)}
              <span className="tracking-normal">{slide.tag}</span>
            </div>

            {/* Main Headline with MyFitnessPal Signature Pill Badge */}
            <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-black text-white leading-[1.24] sm:leading-[1.26] tracking-normal">
              <span>{slide.headlinePrefix}</span>
              <span className="inline-block my-1.5 mx-2 px-4 sm:px-5 py-1 sm:py-1.5 rounded-2xl bg-white text-[#1F2722] shadow-2xl text-[0.88em] font-black align-middle transform hover:scale-[1.02] transition-transform">
                {slide.highlightedBadge}
              </span>
              <span className="block mt-1 sm:mt-2 text-white/95">
                {slide.headlineSuffix}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-[#EAE5DA] leading-[1.8] sm:leading-[1.85] font-normal sm:font-medium max-w-xl text-balance drop-shadow-sm">
              {slide.subtitle}
            </p>

            {/* Primary Action Buttons (Pill-shaped CTA like MyFitnessPal) */}
            <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
              <Link
                to={slide.ctaLink}
                className="inline-flex items-center justify-center gap-3 px-8 sm:px-9 py-4 rounded-full bg-white text-[#1F2722] hover:bg-[#FAF8F5] hover:text-[#D97241] font-black text-base sm:text-lg shadow-2xl shadow-black/35 hover:shadow-black/55 hover:scale-[1.02] active:scale-[0.98] transition-all group min-h-[54px]"
              >
                <span>{slide.ctaLabel}</span>
                <ArrowLeft className="w-5 h-5 text-[#D97241] group-hover:-translate-x-1.5 transition-transform" />
              </Link>

              <Link
                to={slide.secondaryLink}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 backdrop-blur-md transition-all hover:-translate-y-0.5 min-h-[54px]"
              >
                <span>{slide.secondaryLabel}</span>
              </Link>
            </div>

            {/* Micro-Trust Indicator (like HSA/FSA in MyFitnessPal) */}
            <div className="pt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-[13px] text-[#C8BEAA] font-semibold">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#7D9683]" />
                <span>صالات حقيقية موثقة ميدانياً 2026</span>
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#7D9683]" />
                <span>حسابات علمية معتمدة وفق مناخ الساحل</span>
              </span>
            </div>

          </div>

        </div>

        {/* ════════════════════════════════════════════════════════════════
            3. CAROUSEL CONTROLS (ARROWS + PROGRESS INDICATORS + COUNTER)
        ════════════════════════════════════════════════════════════════ */}
        <div className="mt-8 sm:mt-12 flex items-center justify-between gap-4 pt-4 border-t border-white/10">
          
          {/* Navigation Arrows */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={prevSlide}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-white/10 hover:bg-[#D97241] text-white backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-md active:scale-95 group"
              aria-label="الشريحة السابقة"
              title="الشريحة السابقة"
            >
              <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={nextSlide}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-white/10 hover:bg-[#D97241] text-white backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-md active:scale-95 group"
              aria-label="الشريحة التالية"
              title="الشريحة التالية"
            >
              <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* Slide Indicators & Counter */}
          <div className="flex items-center gap-4">
            {/* Interactive Progress Indicators */}
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

            {/* Numerical Slide Counter (01 / 03) */}
            <div className="font-mono text-xs sm:text-sm font-bold text-[#FAF8F5]/80 tracking-wider">
              <span className="text-white">0{currentSlide + 1}</span>
              <span className="text-white/40 mx-1">/</span>
              <span className="text-white/60">0{totalSlides}</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
