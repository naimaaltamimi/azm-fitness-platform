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
  headline: string;
  highlightedText?: string;
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
    headline: 'لياقتك تبدأ\nمن هنا.',
    highlightedText: 'لياقتك تبدأ',
    subtitle:
      'اكتشف أفضل الصالات الرياضية المعتمدة في المكلا (الشرج، فوة، الديس)، واحسب سعراتك وخطتك الغذائية بدقة علمية وفق أسعار رسمية بالريال اليمني دون وسطاء.',
    ctaLabel: 'استكشف الصالات المعتمدة',
    ctaLink: '/gyms',
    secondaryLabel: 'احسب سعراتك مجاناً',
    secondaryLink: '/calculator',
    image:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=85',
    alt: 'تدريب كمال أجسام وأجهزة رياضية متطورة في المكلا',
  },
  {
    id: 2,
    tag: 'حاسبة السعرات والماكروز العلمية',
    badgeType: 'calorie',
    headline: 'غذاؤك\nعلم وليس تخميناً.',
    highlightedText: 'علم وليس تخميناً',
    subtitle:
      'احسب احتياجك اليومي من السعرات والبروتين والماء وفق معادلة ميفلين-سانت جور المعتمدة عالمياً مع احتساب تعويض الرطوبة وحرارة الساحل بدقة.',
    ctaLabel: 'احسب سعراتك الآن مجاناً',
    ctaLink: '/calculator',
    secondaryLabel: 'استكشف الخطة الغذائية',
    secondaryLink: '/nutrition-plan',
    image:
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1920&q=85',
    alt: 'حساب السعرات الغذائية والماكروز بدقة علمية',
  },
  {
    id: 3,
    tag: 'تغذية ساحلية حضرمية',
    badgeType: 'nutrition',
    headline: 'وجبات صحية\nمن بحر المكلا.',
    highlightedText: 'من بحر المكلا',
    subtitle:
      'وصفات غنية بالبروتين مبنية على صيد بحر المكلا الطازج من سمك الثمد والباغة ومنتجات البيئة الحضرمية لدعم أهدافك في التنشيف وبناء العضلات.',
    ctaLabel: 'تصفح مكتبة الوجبات',
    ctaLink: '/meals',
    secondaryLabel: 'دليل الكباتن والمدربين',
    secondaryLink: '/trainers',
    image:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1920&q=85',
    alt: 'وجبات صحية من صيد بحر المكلا الطازج',
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

    // RTL: Swipe left (diff > 50) means next slide; swipe right (diff < -50) means prev slide
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
      className="relative w-full overflow-hidden bg-[#1F2722] font-['Cairo','Tajawal',sans-serif] min-h-[620px] sm:min-h-[700px] lg:min-h-[760px] xl:min-h-[82vh] flex items-center select-none"
      dir="rtl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="القسم الرئيسي لمنصة عزم"
    >
      {/* ══════════════════════════════════════════════════
          1. FULL-SCREEN BACKGROUND IMAGES (CROSS-FADE + ZOOM)
      ══════════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-0">
        {heroSlides.map((item, idx) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-all duration-1000 ease-out will-change-transform ${
              idx === currentSlide
                ? 'opacity-100 scale-100 z-0'
                : 'opacity-0 scale-105 pointer-events-none -z-10'
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

        {/* ─── Layered Cinematic Dark Overlay for 100% Arabic Text Readability ─── */}
        {/* Desktop RTL Gradient: Dark solid wash on Right fading smoothly to reveal sports action on Left */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-l from-[#1F2722]/95 from-35% via-[#1F2722]/80 via-55% via-[#1F2722]/50 via-75% to-[#1F2722]/30 to-100%" />

        {/* Mobile / Tablet Gradient: Strong top-to-bottom wash */}
        <div className="lg:hidden absolute inset-0 bg-gradient-to-b from-[#1F2722]/95 from-45% via-[#1F2722]/85 via-70% to-[#1F2722]/50 to-100%" />

        {/* Subtle Ambient Brand Glows (Terracotta & Sage) */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#D97241]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-[#7D9683]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Bottom edge soft blend into the social proof ticker */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#1F2722] via-[#1F2722]/60 to-transparent pointer-events-none" />
      </div>

      {/* ══════════════════════════════════════════════════
          2. FOREGROUND CONTENT (SYNCHRONIZED WITH SLIDE)
      ══════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28 flex flex-col justify-between">
        <div className="max-w-2xl text-right">
          
          {/* Keyed container for smooth entrance transition whenever currentSlide changes */}
          <div key={currentSlide} className="space-y-6 sm:space-y-7 animate-hero-fade">
            
            {/* Tag / Eyebrow Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#FAF8F5] text-xs sm:text-sm font-bold shadow-sm">
              {renderBadgeIcon(slide.badgeType)}
              <span className="tracking-normal">{slide.tag}</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-black text-white leading-[1.22] sm:leading-[1.25] tracking-normal whitespace-pre-line drop-shadow-sm">
              {slide.headline}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-[#EAE5DA] leading-[1.8] sm:leading-[1.85] font-normal sm:font-medium max-w-xl text-balance drop-shadow-sm">
              {slide.subtitle}
            </p>

            {/* Action Buttons (Primary CTA + Secondary Link) */}
            <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
              <Link
                to={slide.ctaLink}
                className="inline-flex items-center justify-center gap-3 px-8 sm:px-9 py-4 rounded-xl sm:rounded-2xl bg-[#D97241] hover:bg-[#C75F2F] text-white font-extrabold text-sm sm:text-base tracking-normal shadow-xl shadow-[#D97241]/35 hover:shadow-2xl hover:-translate-y-0.5 active:scale-[0.98] transition-all group min-h-[52px]"
              >
                <span>{slide.ctaLabel}</span>
                <ArrowLeft className="w-5 h-5 text-white group-hover:-translate-x-1 transition-transform" />
              </Link>

              <Link
                to={slide.secondaryLink}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-4 rounded-xl sm:rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 backdrop-blur-md transition-all hover:-translate-y-0.5 min-h-[52px]"
              >
                <span>{slide.secondaryLabel}</span>
              </Link>
            </div>

            {/* Micro-Trust Indicator */}
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

        {/* ══════════════════════════════════════════════════
            3. CAROUSEL CONTROLS (ARROWS + PROGRESS INDICATORS)
        ══════════════════════════════════════════════════ */}
        <div className="mt-12 sm:mt-16 flex items-center justify-between gap-4 pt-4 border-t border-white/10">
          
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

            {/* Numerical Slide Counter (e.g. 01 / 03) */}
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
