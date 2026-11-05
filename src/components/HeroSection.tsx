import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calculator,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden min-h-[580px] md:min-h-[640px] flex items-center font-['Cairo',sans-serif] pt-12 sm:pt-16 pb-20 sm:pb-24 lg:pb-28" dir="rtl">
      {/* 1. Original Image as Full Hero Background */}
      <img
        src="/images/mukalla-landmark.jpg"
        alt="معلم المكلا المعماري التراثي - منصة عزم الرياضية"
        className="absolute inset-0 w-full h-full object-cover object-center md:object-[center_35%]"
        loading="eager"
      />

      {/* 2. Dark Blue (#102C50) Overlay with Suitable Transparency */}
      {/* Base Dark Blue Overlay */}
      <div className="absolute inset-0 bg-[#102C50]/75" />

      {/* Directional Overlay: High contrast on text side, lighter over monument arches so golden lighting radiates */}
      <div className="absolute inset-0 bg-gradient-to-l from-[#102C50]/92 via-[#102C50]/75 to-[#102C50]/55" />

      {/* Top & Bottom Soft Vignette for seamless merge into the page */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#102C50] via-transparent to-[#102C50]/50" />

      {/* Ambient subtle golden glow accent matching architectural lighting */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-[#D9AD55]/10 rounded-full blur-3xl pointer-events-none" />

      {/* 3. Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl lg:max-w-3xl space-y-6 text-right">
          {/* Eyebrow Pill with limited Gold (#D9AD55) auxiliary accent */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#102C50]/80 backdrop-blur-md border border-[#D9AD55]/40 text-white text-xs sm:text-sm font-bold shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#D9AD55] animate-pulse shrink-0" />
            <span>منصة اللياقة البدنية والتغذية الصحية • المكلا</span>
          </div>

          {/* Master Headline: عزم.. ابدأ رحلتك نحو حياة أفضل (White text) */}
          <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black text-white leading-[1.25] tracking-tight drop-shadow-md">
            عزم.. ابدأ رحلتك
            <span className="block mt-2 text-white">
              نحو حياة أفضل
            </span>
          </h1>

          {/* Brief Description explaining sports, gym, and health services in Mukalla (White text) */}
          <p className="text-slate-100 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl font-normal drop-shadow">
            منصتك المعتمدة في المكلا لاكتشاف أفضل الصالات والنوادي الرياضية في الشرج وفوة والديس، وحساب احتياجك الدقيق من السعرات والمغذيات، والالتزام بوجبات صحية متوازنة لنمط حياة رياضي مستدام.
          </p>

          {/* Action Buttons using Medium Blue (#2878B8) */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
            {/* Primary Button: Medium Blue (#2878B8) */}
            <Link
              to="/gyms"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#2878B8] hover:bg-[#1f639a] text-white font-bold text-sm sm:text-base shadow-xl shadow-[#102C50]/50 hover:-translate-y-0.5 active:scale-95 transition-all group min-h-[48px]"
            >
              <span>استكشف الصالات المعتمدة</span>
              <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
            </Link>

            {/* Secondary Button: White Glassmorphism with subtle Gold accent */}
            <Link
              to="/calculator"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/30 backdrop-blur-md hover:-translate-y-0.5 active:scale-95 transition-all min-h-[48px]"
            >
              <Calculator className="w-4 h-4 text-[#D9AD55] shrink-0" />
              <span>احسب سعراتك الآن مجاناً</span>
            </Link>
          </div>

          {/* Trust Proof Checklist with Limited Gold (#D9AD55) icons and White text */}
          <div className="pt-4 border-t border-white/15 flex flex-wrap items-center gap-5 text-xs sm:text-sm text-slate-100 font-semibold">
            <span className="flex items-center gap-1.5 text-white">
              <CheckCircle2 className="w-4 h-4 text-[#D9AD55] shrink-0" />
              <span>صالات معتمدة بالمكلا</span>
            </span>
            <span className="flex items-center gap-1.5 text-white">
              <CheckCircle2 className="w-4 h-4 text-[#D9AD55] shrink-0" />
              <span>حسابات علمية دقيقة</span>
            </span>
            <span className="flex items-center gap-1.5 text-white">
              <CheckCircle2 className="w-4 h-4 text-[#D9AD55] shrink-0" />
              <span>اشتراكات فورية بالريال اليمني</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
