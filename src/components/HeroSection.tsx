import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ShieldCheck, Flame, Salad } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#1F2722] font-['Cairo',sans-serif]" dir="rtl">
      {/* ─── FULL-BLEED BACKGROUND IMAGE (LEFT SIDE) ─── */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1800&q=85"
          alt="تغذية صحية ورياضية متكاملة لرواد اللياقة البدنية"
          className="w-full h-full object-cover object-center lg:object-left"
          loading="eager"
        />

        {/* ─── SEAMLESS GRADIENT BLEND OVERLAY (MYFITNESSPAL STYLE) ─── */}
        {/* Desktop Gradient: Solid #1F2722 on Right fading into photo on Left */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-l from-[#1F2722] from-35% via-[#1F2722]/95 via-50% via-[#1F2722]/60 via-75% to-transparent to-100%" />

        {/* Mobile / Tablet Gradient: Strong top fade to ensure 100% text contrast */}
        <div className="lg:hidden absolute inset-0 bg-gradient-to-b from-[#1F2722] from-45% via-[#1F2722]/90 via-70% to-[#1F2722]/40 to-100%" />

        {/* Ambient Warm Luxury Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D97241]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#7D9683]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* ─── FOREGROUND HERO CONTENT ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 min-h-[600px] sm:min-h-[660px] lg:min-h-[720px] flex items-center">
        <div className="max-w-2xl text-right space-y-6 sm:space-y-7">
          
          {/* Eyebrow Badge (Coach Sheikha / Wellness Luxury) */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#FAF8F5] text-xs sm:text-sm font-bold shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7D9683] animate-pulse shrink-0" />
            <span>المنصة الرياضية المعتمدة • المكلا، ساحل حضرموت</span>
          </div>

          {/* Main Headline with High-Contrast White Signature Pill (MyFitnessPal Signature Pattern) */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.2] tracking-tight">
            منصتك المتكاملة لـ
            <span className="inline-block my-2 sm:my-2.5 mx-1 px-4 sm:px-5 py-1 sm:py-1.5 rounded-2xl bg-white text-[#1F2722] shadow-2xl text-[0.88em] font-black align-middle transform hover:scale-[1.02] transition-transform">
              #1 لياقة وتغذية
            </span>
            بالمكلا وساحل حضرموت
          </h1>

          {/* Body Lead Paragraph */}
          <p className="text-sm sm:text-base lg:text-lg text-[#EAE5DA] leading-relaxed font-medium max-w-xl">
            انضم إلى مجتمع رياضيي المكلا لحساب سعراتك بدقة علمية وفق مناخ الساحل، وتناول وجبات ساحلية غنية بالبروتين، واستكشف أفضل الصالات المعتمدة بأسعار رسمية بالريال اليمني دون وسطاء.
          </p>

          {/* Primary Action Buttons (Pill-shaped CTA like MyFitnessPal) */}
          <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
            <Link
              to="/calculator"
              className="inline-flex items-center justify-center gap-3 px-8 sm:px-9 py-4 rounded-full bg-white text-[#1F2722] hover:bg-[#FAF8F5] hover:text-[#D97241] font-black text-base sm:text-lg shadow-2xl shadow-black/40 hover:shadow-black/60 hover:scale-[1.03] active:scale-[0.98] transition-all group min-h-[54px]"
            >
              <span>ابدأ رحلتك الرياضية مجاناً</span>
              <ArrowLeft className="w-5 h-5 text-[#D97241] group-hover:-translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/gyms"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 backdrop-blur-md transition-all min-h-[54px]"
            >
              <span>استكشف صالات المكلا</span>
            </Link>
          </div>

          {/* Micro-Trust Line (Like "HSA/FSA eligible" in MyFitnessPal) */}
          <div className="pt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-[13px] text-[#C8BEAA] font-semibold">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#7D9683]" />
              <span>مجاني 100% لحساب السعرات والماكروز</span>
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#7D9683]" />
              <span>أسعار اشتراكات حقيقية بالريال اليمني</span>
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
