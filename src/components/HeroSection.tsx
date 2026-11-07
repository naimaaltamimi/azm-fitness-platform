import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/* ─── Hero Slide Data ─── */
const heroSlides = [
  {
    tag: 'منصة عزم الرياضية',
    headline: 'لياقتك تبدأ\nمن هنا.',
    subtitle: 'اكتشف أفضل الصالات الرياضية المعتمدة في المكلا، واحسب سعراتك وخطتك الغذائية بدقة علمية.',
    ctaLabel: 'استكشف الصالات',
    ctaLink: '/gyms',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
  },
  {
    tag: 'حاسبة السعرات',
    headline: 'غذاؤك\nعلم وليس تخميناً.',
    subtitle: 'احسب احتياجك اليومي من السعرات والبروتين والماء وفق معادلة ميفلين-سانت جور المعتمدة عالمياً.',
    ctaLabel: 'احسب سعراتك مجاناً',
    ctaLink: '/calculator',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80',
  },
  {
    tag: 'تغذية ساحلية',
    headline: 'وجبات صحية\nمن بحر المكلا.',
    subtitle: 'وصفات غنية بالبروتين مبنية على صيد المكلا الطازج ومنتجات البيئة الحضرمية المحلية.',
    ctaLabel: 'تصفح الوجبات',
    ctaLink: '/meals',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
  },
];

export const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  /* Auto-advance every 6 seconds */
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slide = heroSlides[currentSlide];

  return (
    <section className="relative w-full overflow-hidden font-['Cairo',sans-serif]" dir="rtl">
      {/* ─── Background Gradient (soft warm) ─── */}
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
            <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-black text-[#1F2722] leading-[1.15] tracking-tight whitespace-pre-line">
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
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-[#D97241] hover:bg-[#C75F2F] text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] transition-all uppercase"
              >
                {slide.ctaLabel}
              </Link>
            </div>
          </div>

          {/* ─── LEFT (RTL): HERO IMAGE ─── */}
          <div className="relative order-1 lg:order-2 flex items-center justify-center">
            <div className="relative w-full max-w-lg aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-slate-200">
              <img
                key={currentSlide}
                src={slide.image}
                alt={slide.tag}
                className="w-full h-full object-cover animate-[fadeIn_0.5s_ease-in-out]"
                loading="eager"
              />
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {/* ─── CAROUSEL NAVIGATION ─── */}
        <div className="flex items-center justify-between mt-8 lg:mt-10">
          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border border-[#DED7C8] bg-white hover:bg-[#F4F1EA] flex items-center justify-center text-[#536559] hover:text-[#1F2722] transition-colors shadow-sm"
              aria-label="السابق"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full border border-[#DED7C8] bg-white hover:bg-[#F4F1EA] flex items-center justify-center text-[#536559] hover:text-[#1F2722] transition-colors shadow-sm"
              aria-label="التالي"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`rounded-full transition-all ${
                  idx === currentSlide
                    ? 'w-6 h-2.5 bg-[#D97241]'
                    : 'w-2.5 h-2.5 bg-[#DED7C8] hover:bg-[#C8BEAA]'
                }`}
                aria-label={`الشريحة ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
