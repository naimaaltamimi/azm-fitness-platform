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

/* ─── Hero Slide Data (Aligned with MyFitnessPal System & AZM Platform) ─── */
interface SlideItem {
  id: number;
  tag: string;
  badgeType: 'calorie' | 'gym' | 'nutrition';
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
    tag: 'حاسبة السعرات والماكروز المعتمدة',
    badgeType: 'calorie',
    headlinePrefix: 'منصتك الأولى لـ',
    highlightedBadge: '#1 لياقة وتغذية',
    headlineSuffix: 'بالمكلا وساحل حضرموت',
    subtitle:
      'انضم لآلاف الرياضيين في المكلا لحساب سعراتك بدقة علمية وفق مناخ الساحل، وتناول وجبات صحية غنية بالبروتين، واستكشف أفضل الصالات المعتمدة دون عناء.',
    ctaLabel: 'ابدأ رحلتك مجاناً',
    ctaLink: '/calculator',
    microProof: 'مجاني 100% • حسابات علمية معتمدة وفق معادلة ميفلين • صالات موثقة ميدانياً',
    image:
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1800&q=85',
    alt: 'طبق تغذية صحية متكامل بالبيض والأفوكادو والخضار الطازجة',
  },
  {
    id: 2,
    tag: 'دليل صالات المكلا المعتمدة 2026',
    badgeType: 'gym',
    headlinePrefix: 'دليلك الشامل لـ',
    highlightedBadge: '#1 صالات رياضية',
    headlineSuffix: 'في فوة والشرج والديس',
    subtitle:
      'استكشف الصالات الرياضية الموثقة في المكلا بأسعار رسمية بالريال اليمني دون وسطاء، مع جداول فترات الرجال والنساء وقوائم الأجهزة المتوفرة.',
    ctaLabel: 'استكشف صالات المكلا',
    ctaLink: '/gyms',
    microProof: 'اشتراكات مباشرة دون رسوم إضافية • توثيق ميداني معتمد 2026',
    image:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1800&q=85',
    alt: 'تدريب كمال أجسام وأجهزة رياضية متطورة في المكلا',
  },
  {
    id: 3,
    tag: 'تغذية ساحلية حضرمية',
    badgeType: 'nutrition',
    headlinePrefix: 'وجبات رياضية من',
    highlightedBadge: '#1 صيد بحر المكلا',
    headlineSuffix: 'بروتين طبيعي عالي الجودة',
    subtitle:
      'وصفات صحية غنية بالبروتين مبنية على صيد بحر المكلا اليومي الطازج من سمك الثمد والباغة لتعزيز البناء العضلي والاستشفاء الرياضي.',
    ctaLabel: 'تصفح مكتبة الوجبات',
    ctaLink: '/meals',
    microProof: 'ماكروز محسوبة بدقة • وصفات محلية متوافقة مع ميزانيتك',
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
      className="relative w-full overflow-hidden bg-gradient-to-br from-[#16291E] via-[#1B3526] to-[#122017] font-['Cairo','Tajawal',sans-serif] min-h-[580px] sm:min-h-[640px] lg:min-h-[680px] xl:min-h-[720px] flex items-center select-none"
      dir="rtl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="القسم الرئيسي لمنصة عزم"
    >
      {/* ════════════════════════════════════════════════════════════════
          1. FULL-BLEED HORIZONTAL IMAGES (MYFITNESSPAL EXACT PATTERN)
          (امتداد أفقي كامل على الجانب الأيسر مع تلاشٍ انسيابي ناعم)
      ════════════════════════════════════════════════════════════════ */}
      <div className="absolute inset-y-0 left-0 w-full lg:w-[54%] xl:w-[56%] h-full z-0 overflow-hidden pointer-events-none">
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
        {/* On Desktop RTL: Left edge is clear photo, Right blends into the rich brand background */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-transparent via-[#16291E]/50 via-55% via-[#16291E]/95 via-85% to-[#16291E] to-100%" />

        {/* On Mobile / Tablet: Gradient washes top-to-bottom for 100% Arabic text readability */}
        <div className="lg:hidden absolute inset-0 bg-gradient-to-b from-[#16291E]/25 from-0% via-[#16291E]/80 via-45% to-[#16291E] to-85%" />

        {/* Ambient Warm Luxury Glows */}
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-[#D97241]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-[#7D9683]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* ════════════════════════════════════════════════════════════════
          2. FOREGROUND CONTENT (MYFITNESSPAL HIERARCHY & AZM IDENTITY)
      ════════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24 flex flex-col justify-center min-h-[580px] sm:min-h-[640px] lg:min-h-[680px] xl:min-h-[720px]">
        <div className="max-w-2xl text-right">
          
          {/* Keyed container for smooth entrance transition whenever currentSlide changes */}
          <div key={currentSlide} className="space-y-6 sm:space-y-7 animate-hero-fade">
            
            {/* Tag / Eyebrow Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#FAF8F5] text-xs sm:text-sm font-bold shadow-sm">
              {renderBadgeIcon(slide.badgeType)}
              <span className="tracking-normal">{slide.tag}</span>
            </div>

            {/* Main Headline (Exact 3-level rhythm from MyFitnessPal) */}
            <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-black text-white leading-[1.2] sm:leading-[1.22] tracking-normal">
              <span className="block text-white/95">{slide.headlinePrefix}</span>
              <span className="inline-block my-2 px-5 sm:px-6 py-1.5 sm:py-2 rounded-2xl bg-white text-[#16291E] shadow-2xl text-[0.84em] font-black align-middle transform hover:scale-[1.02] transition-transform">
                {slide.highlightedBadge}
              </span>
              <span className="block text-white/95">{slide.headlineSuffix}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#EAE5DA] leading-[1.8] sm:leading-[1.85] font-normal sm:font-medium max-w-xl text-balance drop-shadow-sm">
              {slide.subtitle}
            </p>

            {/* Primary Action Button (MyFitnessPal Signature White Pill CTA) */}
            <div className="pt-2 sm:pt-4 flex flex-col items-start gap-3.5">
              <Link
                to={slide.ctaLink}
                className="inline-flex items-center justify-center gap-3 px-9 sm:px-11 py-4 sm:py-4.5 rounded-full bg-white text-[#16291E] hover:bg-[#FAF8F5] hover:text-[#D97241] font-black text-base sm:text-lg shadow-2xl shadow-black/35 hover:shadow-black/55 hover:scale-[1.02] active:scale-[0.98] transition-all group min-h-[56px]"
              >
                <span>{slide.ctaLabel}</span>
                <ArrowLeft className="w-5 h-5 text-[#D97241] group-hover:-translate-x-1.5 transition-transform" />
              </Link>

              {/* Micro-Reassurance Line (Like "HSA/FSA eligible" in MyFitnessPal) */}
              <div className="pt-1 flex items-center gap-2 text-xs sm:text-[13px] text-[#CBDCD0] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#7D9683] shrink-0" />
                <span>{slide.microProof}</span>
              </div>
            </div>

            {/* Minimal & Elegant Carousel Controls (Unobtrusive) */}
            <div className="pt-4 flex items-center gap-4">
              {/* Subtle navigation arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  className="w-9 h-9 rounded-full border border-white/20 bg-white/10 hover:bg-[#D97241] text-white backdrop-blur-md flex items-center justify-center transition-all duration-300 active:scale-95 group"
                  aria-label="الشريحة السابقة"
                  title="الشريحة السابقة"
                >
                  <ChevronRight className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-9 h-9 rounded-full border border-white/20 bg-white/10 hover:bg-[#D97241] text-white backdrop-blur-md flex items-center justify-center transition-all duration-300 active:scale-95 group"
                  aria-label="الشريحة التالية"
                  title="الشريحة التالية"
                >
                  <ChevronLeft className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </button>
              </div>

              {/* Interactive pill indicators */}
              <div className="flex items-center gap-2">
                {heroSlides.map((item, idx) => {
                  const isActive = idx === currentSlide;
                  return (
                    <button
                      key={item.id}
                      onClick={() => goToSlide(idx)}
                      className={`h-2 rounded-full transition-all duration-500 ${
                        isActive
                          ? 'w-8 bg-white shadow-md'
                          : 'w-2 bg-white/30 hover:bg-white/60'
                      }`}
                      aria-label={`الانتقال إلى الشريحة ${idx + 1}`}
                    />
                  );
                })}
              </div>

              {/* Counter */}
              <span className="font-mono text-xs font-semibold text-white/60">
                0{currentSlide + 1} / 0{totalSlides}
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
