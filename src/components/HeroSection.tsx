import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Flame,
  Calculator,
  CheckCircle2
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-slate-950 via-[#0a1124] to-slate-900 text-white font-['Cairo',sans-serif] pt-8 sm:pt-12 md:pt-16 pb-16 sm:pb-20 lg:pb-24" dir="rtl">
      {/* Ambient Radial Lights (Global High-End Tech Aesthetic) */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-brand-green-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.7) 1px, transparent 0)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Text Content Column (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6 text-right">
            {/* Eyebrow Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-sky-200 text-xs sm:text-sm font-bold shadow-lg shadow-black/10">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-green-400 animate-pulse shrink-0" />
              <span>المنصة الرياضية والغذائية الأولى في المكلا • ساحل حضرموت</span>
            </div>

            {/* Master Headline (World-Class Clean Typography) */}
            <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold text-white leading-[1.25] tracking-tight">
              وجهتك الرياضية الأولى
              <span className="block mt-1.5 text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-blue-100 to-white">
                للياقة البدنية والتغذية الصحية
              </span>
              <span className="block mt-1 text-lg sm:text-2xl lg:text-3xl font-bold text-sky-400">
                في المكلا وساحل حضرموت
              </span>
            </h1>

            {/* Lead Description */}
            <p className="text-slate-300 text-xs sm:text-sm lg:text-[15px] leading-relaxed max-w-xl font-normal">
              كل ما تحتاجه لتحقيق هدفك البدني في منصة واحدة: استكشف الصالات الرياضية المعتمدة في الشرج وفوة والديس، احسب احتياجك الفعلي من السعرات والماء وفق مناخ الساحل، وتناول وجبات رياضية غنية بالبروتين تعتمد على صيد بحر المكلا الطازج.
            </p>

            {/* Dual CTAs (Inspired by Top Global Platforms) */}
            <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                to="/gyms"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-brand-blue-600 hover:bg-brand-blue-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-brand-blue-600/30 hover:shadow-brand-blue-600/40 hover:-translate-y-0.5 active:scale-95 transition-all group min-h-[46px]"
              >
                <span>استكشف الصالات المعتمدة</span>
                <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              </Link>

              <Link
                to="/calculator"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 backdrop-blur-md hover:-translate-y-0.5 active:scale-95 transition-all min-h-[46px]"
              >
                <Calculator className="w-4 h-4 text-amber-400 shrink-0" />
                <span>احسب سعراتك الآن مجاناً</span>
              </Link>
            </div>

            {/* Trust Proof Checklist */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300 font-semibold">
              <span className="flex items-center gap-1.5 text-brand-green-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>5 صالات حقيقية معتمدة بالمكلا</span>
              </span>
              <span className="flex items-center gap-1.5 text-sky-300">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>معادلة Mifflin-St Jeor العالمية</span>
              </span>
              <span className="flex items-center gap-1.5 text-amber-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>اشتراكات فورية بالريال اليمني</span>
              </span>
            </div>
          </div>

          {/* Single High-Impact Visual Column (5 cols on lg) */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            {/* Outer Decorative Gradient Ring */}
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-brand-blue-500 via-sky-400 to-brand-green-500 rounded-[32px] blur-lg opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse" />

              {/* Main Visual Frame (ONE Inspiring Hero Image Representing the Project) */}
              <div className="relative rounded-[28px] overflow-hidden bg-slate-900 border border-white/15 shadow-2xl aspect-[4/5] sm:aspect-[4/4.5] lg:aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=85"
                  alt="منصة عزم للياقة والتغذية الرياضية في المكلا"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />
                {/* Gradient Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

                {/* Floating Glassmorphic Pill: Smart Calorie Metric (Bottom Edge) */}
                <div className="absolute bottom-4 right-4 left-4 bg-slate-950/90 backdrop-blur-xl border border-white/20 p-3.5 rounded-2xl shadow-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                      <Flame className="w-5 h-5 fill-amber-500/20" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-amber-400 block">حاسبة السعرات الذكية</span>
                      <span className="text-xs font-bold text-white">معادلة ميفلين لمناخ الساحل</span>
                    </div>
                  </div>
                  <div className="text-left font-mono">
                    <span className="text-base font-black text-white">2,450</span>
                    <span className="text-[10px] text-amber-400 font-bold block">سعرة يومية</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

