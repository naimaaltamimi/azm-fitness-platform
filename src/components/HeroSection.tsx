import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/* ─── Hero Slide Data ─── */
interface SlideItem {
  tag: string;
  headline: string;
  subtitle: string;
  ctaLabel: string;
  ctaLink: string;
  image: string;
  alt: string;
}

const heroSlides: SlideItem[] = [
  {
    tag: 'تغذية ساحلية',
    headline: 'وجبات صحية\nمن بحر المكلا.',
    subtitle: 'وصفات غنية بالبروتين مبنية على صيد المكلا الطازج ومنتجات البيئة الحضرمية المحلية.',
    ctaLabel: 'تصفح الوجبات',
    ctaLink: '/meals',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1400&q=85',
    alt: 'وجبات صحية غنية بالبروتين من صيد بحر المكلا',
  },
  {
    tag: 'منصة عزم الرياضية',
    headline: 'لياقتك تبدأ\nمن هنا.',
    subtitle: 'اكتشف أفضل الصالات الرياضية المعتمدة في المكلا، واحسب سعراتك وخطتك الغذائية بدقة علمية.',
    ctaLabel: 'استكشف الصالات',
    ctaLink: '/gyms',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1400&q=85',
    alt: 'صالات رياضية معتمدة بالمكلا وأجهزة متطورة',
  },
  {
    tag: 'حاسبة السعرات',
    headline: 'غذاؤك\nعلم وليس تخميناً.',
    subtitle: 'احسب احتياجك اليومي من السعرات والبروتين والماء وفق معادلة ميفلين-سانت جور المعتمدة عالمياً.',
    ctaLabel: 'احسب سعراتك مجاناً',
    ctaLink: '/calculator',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1400&q=85',
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

  /* Auto-advance timer (6.5s) */
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 6500);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  /* Touch gestures for mobile */
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

  return (
    <section
      className="relative w-full overflow-hidden font-['Cairo','Tajawal',sans-serif] select-none"
      dir="rtl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="القسم الرئيسي لمنصة عزم"
    >
      {/* ─── Background Gradient (Soft Warm Sand Scandinavian) ─── */}
      <div className="absolute inset-0 bg-gradient-to-bl from-[#F4F1EA] via-[#EDE8DF] to-[#E5ECE7]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* ─── RIGHT (RTL): TEXT CONTENT ─── */}
          <div className="space-y-5 sm:space-y-6 text-right order-2 lg:order-1">
            {/* Tag / Eyebrow */}
            <span className="inline-block text-[11px] sm:text-xs font-bold text-[#D97241] tracking-wide uppercase">
              {slide.tag}
            </span>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-black text-[#1F2722] leading-[1.15] tracking-tight whitespace-pre-line animate-hero-fade key={currentSlide}">
              {slide.headline}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#536559] leading-relaxed max-w-lg font-medium">
              {slide.subtitle}
            </p>

            {/* CTA Button */}
            <div className="pt-1">
              <Link
                to={slide.ctaLink}
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-[#D97241] hover:bg-[#C75F2F] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#D97241]/20 hover:shadow-xl hover:shadow-[#D97241]/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all uppercase"
              >
                {slide.ctaLabel}
              </Link>
            </div>
          </div>

          {/* ─── LEFT (RTL): HERO IMAGE & PROPORTIONATE CONTROLS ─── */}
          <div className="relative order-1 lg:order-2 flex flex-col items-center">
            
            {/* The Image Card */}
            <div className="relative w-full max-w-lg aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-slate-200">
              <img
                key={currentSlide}
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover animate-[fadeIn_0.5s_ease-in-out]"
                loading="eager"
              />
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* ════════════════════════════════════════════════════════════════
                تنسيق متناسب تماماً تحت الصورة (Live Badge + Slide Dots)
            ════════════════════════════════════════════════════════════════ */}
            <div className="w-full max-w-lg mt-4 sm:mt-5 flex items-center justify-between px-1">
              {/* Live Instant Inquiry Pill (مربوط بالواتساب) */}
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

              {/* Dots Indicator (تحت الصورة بمسافة وتناسق دقيق) */}
              <div className="flex items-center gap-2">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
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

        {/* ─── NAVIGATION ARROWS (BOTTOM-RIGHT IN RTL) ─── */}
        <div className="flex items-center justify-start mt-6 sm:mt-8">
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border border-[#DED7C8] bg-white hover:bg-[#F4F1EA] flex items-center justify-center text-[#536559] hover:text-[#1F2722] transition-colors shadow-sm active:scale-95"
              aria-label="السابق"
              title="السابق"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full border border-[#DED7C8] bg-white hover:bg-[#F4F1EA] flex items-center justify-center text-[#536559] hover:text-[#1F2722] transition-colors shadow-sm active:scale-95"
              aria-label="التالي"
              title="التالي"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
