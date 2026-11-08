import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Dumbbell,
  Flame,
  Salad,
  CheckCircle2,
} from 'lucide-react';

/* ─── Hero Slide Data (Harmonized with AZM Scandinavian-Sand Identity & MyFitnessPal System) ─── */
interface SlideItem {
  id: number;
  tag: string;
  badgeType: 'nutrition' | 'gym' | 'calorie';
  headlinePrefix: string;
  highlightedBadge: string;
  headlineSuffix: string;
  subtitle: string;
  ctaLabel: string;
  ctaLink: string;
  microProof: string;
  image: string;
  alt: string;
}

const heroSlides: SlideItem[] = [
  {
    id: 1,
    tag: 'تغذية ساحلية حضرمية',
    badgeType: 'nutrition',
    headlinePrefix: 'وجبات صحية من',
    highlightedBadge: '#1 صيد بحر المكلا',
    headlineSuffix: 'بروتين طبيعي طازج',
    subtitle:
      'وصفات غنية بالبروتين مبنية على صيد المكلا الطازج ومنتجات البيئة الحضرمية المحلية لدعم أهدافك في البناء العضلي والتنشيف.',
    ctaLabel: 'تصفح مكتبة الوجبات',
    ctaLink: '/meals',
    microProof: 'صيد بحر المكلا اليومي • ماكروز محسوبة علمياً • بدون اشتراكات إضافية',
    image:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1800&q=85',
    alt: 'وجبات صحية غنية بالبروتين من صيد بحر المكلا الطازج',
  },
  {
    id: 2,
    tag: 'منصة عزم الرياضية • ساحل حضرموت',
    badgeType: 'gym',
    headlinePrefix: 'لياقتك تبدأ من',
    highlightedBadge: '#1 صالات معتمدة',
    headlineSuffix: 'بالمكلا وفوة والديس',
    subtitle:
      'اكتشف أفضل الصالات الرياضية المعتمدة في المكلا، مع أسعار رسمية بالريال اليمني دون وسطاء، ومواعيد فترات الرجال والنساء المحدثة 2026.',
    ctaLabel: 'استكشف صالات المكلا',
    ctaLink: '/gyms',
    microProof: 'صالات موثقة ميدانياً • أسعار اشتراكات حقيقية بالريال اليمني',
    image:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1800&q=85',
    alt: 'تدريب كمال أجسام وأجهزة رياضية متطورة في المكلا',
  },
  {
    id: 3,
    tag: 'حاسبة السعرات والماكروز العلمية',
    badgeType: 'calorie',
    headlinePrefix: 'غذاؤك وحساب سعراتك',
    highlightedBadge: '#1 علم وليس تخميناً',
    headlineSuffix: 'وفق مناخ ساحل حضرموت',
    subtitle:
      'احسب احتياجك اليومي من السعرات والبروتين والماء وفق معادلة ميفلين-سانت جور المعتمدة عالمياً مع احتساب تعويض الرطوبة وحرارة الساحل بدقة.',
    ctaLabel: 'احسب سعراتك الآن مجاناً',
    ctaLink: '/calculator',
    microProof: 'مجاني 100% • معادلة ميفلين-سانت جور • توصيات مخصصة للساحل',
    image:
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1800&q=85',
    alt: 'حساب السعرات الغذائية والماكروز بدقة علمية',
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
      className="relative w-full overflow-hidden bg-gradient-to-bl from-[#FAF8F5] via-[#F4F1EA] to-[#E5ECE7] font-['Cairo','Tajawal',sans-serif] min-h-[580px] sm:min-h-[640px] lg:min-h-[680px] xl:min-h-[720px] flex items-center select-none"
      dir="rtl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="القسم الرئيسي لمنصة عزم"
    >
      {/* ════════════════════════════════════════════════════════════════
          1. FULL-BLEED HORIZONTAL IMAGES (MYFITNESSPAL PATTERN ON SAND PALETTE)
          (امتداد أفقي كامل على الجانب الأيسر يندمج بانسيابية مع خلفية الرمل الفخمة)
      ════════════════════════════════════════════════════════════════ */}
      <div className="absolute inset-y-0 left-0 w-full lg:w-[52%] xl:w-[55%] h-full z-0 overflow-hidden pointer-events-none">
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

        {/* ─── Seamless Horizontal Sand Gradient Blend (MyFitnessPal Signature) ─── */}
        {/* On Desktop RTL: Left edge is clear photo, Right blends into soft warm sand #F4F1EA */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-transparent via-[#F4F1EA]/60 via-45% via-[#F4F1EA]/95 via-80% to-[#F4F1EA] to-100%" />

        {/* On Mobile / Tablet: Gradient washes top-to-bottom for 100% Arabic text readability */}
        <div className="lg:hidden absolute inset-0 bg-gradient-to-b from-transparent from-0% via-[#F4F1EA]/80 via-45% to-[#F4F1EA] to-85%" />

        {/* Ambient Brand Glows (Terracotta & Sage) */}
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-[#D97241]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-[#7D9683]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* ════════════════════════════════════════════════════════════════
          2. FOREGROUND CONTENT (SYNCHRONIZED WITH ACTIVE SLIDE)
      ════════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24 flex flex-col justify-between min-h-[580px] sm:min-h-[640px] lg:min-h-[680px] xl:min-h-[720px]">
        <div className="max-w-2xl text-right my-auto">
          
          {/* Keyed container for smooth entrance transition whenever currentSlide changes */}
          <div key={currentSlide} className="space-y-5 sm:space-y-6 animate-hero-fade">
            
            {/* Tag / Eyebrow Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#DED7C8] text-[#D97241] text-xs sm:text-sm font-bold shadow-sm">
              {renderBadgeIcon(slide.badgeType)}
              <span className="tracking-normal">{slide.tag}</span>
            </div>

            {/* Main Headline with MyFitnessPal Signature Pill Badge */}
            <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-black text-[#1F2722] leading-[1.2] sm:leading-[1.22] tracking-tight">
              <span className="block text-[#1F2722]">{slide.headlinePrefix}</span>
              <span className="inline-block my-2 px-5 sm:px-6 py-1.5 sm:py-2 rounded-2xl bg-white text-[#D97241] shadow-md border border-[#EAE5DA] text-[0.88em] font-black align-middle transform hover:scale-[1.02] transition-transform">
                {slide.highlightedBadge}
              </span>
              <span className="block text-[#1F2722]">{slide.headlineSuffix}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#536559] leading-[1.8] sm:leading-[1.85] font-medium max-w-xl text-balance">
              {slide.subtitle}
            </p>

            {/* Primary Action Button (Terracotta Pill CTA like MyFitnessPal) */}
            <div className="pt-2 sm:pt-4 flex flex-col items-start gap-3.5">
              <Link
                to={slide.ctaLink}
                className="inline-flex items-center justify-center gap-3 px-9 sm:px-11 py-4 sm:py-4.5 rounded-full bg-[#D97241] hover:bg-[#C75F2F] text-white font-black text-base sm:text-lg shadow-xl shadow-[#D97241]/25 hover:shadow-2xl hover:shadow-[#D97241]/40 hover:scale-[1.02] active:scale-[0.98] transition-all group min-h-[56px]"
              >
                <span>{slide.ctaLabel}</span>
                <ArrowLeft className="w-5 h-5 text-white group-hover:-translate-x-1.5 transition-transform" />
              </Link>

              {/* Micro-Reassurance Line */}
              <div className="pt-1 flex items-center gap-2 text-xs sm:text-[13px] text-[#6E8074] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#7D9683] shrink-0" />
                <span>{slide.microProof}</span>
              </div>
            </div>

          </div>

        </div>

        {/* ════════════════════════════════════════════════════════════════
            3. CAROUSEL CONTROLS & BOTTOM STATUS (HARMONIZED WITH USER SCREENSHOT)
        ════════════════════════════════════════════════════════════════ */}
        <div className="mt-8 flex items-center justify-between gap-4 pt-4 border-t border-[#DED7C8]/60">
          
          {/* Right side (RTL): Navigation Arrows (< >) */}
          <div className="flex items-center gap-2.5">
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
          </div>

          {/* Left side (RTL): Live Status Badge & Slide Indicators */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Live Indicator Pill from User's Platform */}
            <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F2722] text-white text-xs font-bold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
              <span>استفسار فوري • صالات المكلا</span>
            </div>

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
                        ? 'w-7 sm:w-9 bg-[#D97241] shadow-md shadow-[#D97241]/30'
                        : 'w-2.5 bg-[#DED7C8] hover:bg-[#C8BEAA]'
                    }`}
                    aria-label={`الانتقال إلى الشريحة ${idx + 1}`}
                  />
                );
              })}
            </div>

            {/* Numerical Slide Counter (01 / 03) */}
            <div className="font-mono text-xs sm:text-sm font-bold text-[#536559] tracking-wider">
              <span className="text-[#1F2722]">0{currentSlide + 1}</span>
              <span className="text-[#536559]/50 mx-1">/</span>
              <span className="text-[#536559]/70">0{totalSlides}</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
