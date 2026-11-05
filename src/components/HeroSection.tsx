import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calculator,
  ShieldCheck,
  Sparkles,
  MapPin,
  Star,
  Award,
  ChevronLeft,
  Building2,
  CheckCircle2
} from 'lucide-react';

interface QuickGym {
  id: string;
  slug: string;
  name: string;
  neighborhood: string;
  price: string;
  rating: string;
  tag: string;
  image: string;
}

const QUICK_GYMS: Record<string, QuickGym> = {
  fowa: {
    id: 'smart-gym',
    slug: 'smart-gym',
    name: 'سمارت جيم (Smart Gym)',
    neighborhood: 'فوة المتضررين',
    price: '15,000 ر.ي / شهر',
    rating: '4.9',
    tag: 'الأكثر إقبالاً',
    image: '/images/clubs/smart-gym/interior.png'
  },
  sharj: {
    id: 'mukalla-gym',
    slug: 'mukalla-gym',
    name: 'المكلا جيم (Mukalla Gym)',
    neighborhood: 'حي الشرج • فوق قاعة ميرال',
    price: '15,000 ر.ي / شهر',
    rating: '4.8',
    tag: 'موقع استراتيجي',
    image: '/images/clubs/mukalla-gym/hd-red-machines.jpg'
  },
  dees: {
    id: 'golds-gym',
    slug: 'golds-gym',
    name: 'قولدن جيم (Golden Gym)',
    neighborhood: 'ديس المكلا • الشارع العام',
    price: '15,000 ر.ي / شهر',
    rating: '4.9',
    tag: 'تجهيزات متطورة',
    image: '/images/clubs/smart-gym/hd-interior.jpg'
  }
};

export const HeroSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'fowa' | 'sharj' | 'dees'>('fowa');
  const activeGym = QUICK_GYMS[activeTab];

  return (
    <section className="relative w-full overflow-hidden min-h-[620px] lg:min-h-[680px] flex items-center font-['Cairo',sans-serif] pt-10 sm:pt-14 pb-16 sm:pb-20 lg:pb-24" dir="rtl">
      {/* 1. Original Mukalla Landmark Background Image */}
      <img
        src="/images/mukalla-landmark.jpg"
        alt="معلم المكلا المعماري التراثي - منصة عزم الرياضية"
        className="absolute inset-0 w-full h-full object-cover object-[center_35%] md:object-[left_35%] lg:object-[25%_35%] transition-transform duration-1000 scale-100"
        loading="eager"
      />

      {/* 2. Sophisticated Lighting & Gradient Overlay Layers */}
      {/* Base overlay for contrast */}
      <div className="absolute inset-0 bg-[#102C50]/65" />

      {/* Directional gradient: Deep Dark Blue (#102C50) over text on the right (92%), smooth falloff over monument (35%) so golden architectural lights glow */}
      <div className="absolute inset-0 bg-gradient-to-l from-[#102C50]/95 via-[#102C50]/80 to-[#102C50]/35" />

      {/* Vertical vignette for seamless header/footer integration */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#102C50] via-transparent to-[#102C50]/60 pointer-events-none" />

      {/* Warm Golden Glow centered on the landmark arches */}
      <div className="absolute top-1/4 left-1/4 w-[480px] h-[480px] bg-[radial-gradient(circle,rgba(217,173,85,0.22)_0%,transparent_65%)] blur-3xl pointer-events-none" />

      {/* Soft Blue Ambient Glow on the text side */}
      <div className="absolute -bottom-10 right-1/4 w-96 h-96 bg-[radial-gradient(circle,rgba(40,120,184,0.18)_0%,transparent_70%)] blur-2xl pointer-events-none" />

      {/* 3. Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Right Column: Hero Headline, Description, CTAs, and Trust Pills (Cols 1-7) */}
          <div className="lg:col-span-7 space-y-6 text-right">
            
            {/* Eyebrow Pill with Gold Accent */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#102C50]/85 backdrop-blur-md border border-[#D9AD55]/40 text-white text-xs sm:text-sm font-bold shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D9AD55] animate-pulse shrink-0 shadow-[0_0_8px_#D9AD55]" />
              <span>منصة اللياقة البدنية والتغذية الصحية • المكلا</span>
            </div>

            {/* Main Headline: عزم.. ابدأ رحلتك (White) | نحو حياة أفضل (Gold #D9AD55) */}
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black text-white leading-[1.25] tracking-tight drop-shadow-md">
              عزم.. ابدأ رحلتك
              <span className="block mt-2 text-[#D9AD55] drop-shadow-[0_2px_14px_rgba(217,173,85,0.35)]">
                نحو حياة أفضل
              </span>
            </h1>

            {/* Description Text */}
            <p className="text-slate-100 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl font-normal drop-shadow">
              منصتك المعتمدة في المكلا لاكتشاف أفضل الصالات والنوادي الرياضية في الشرج وفوة والديس، وحساب احتياجك الدقيق من السعرات والمغذيات، والالتزام بوجبات صحية متوازنة لنمط حياة رياضي مستدام.
            </p>

            {/* Action Buttons using Medium Blue (#2878B8) */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              {/* Primary Button: Medium Blue (#2878B8) with luminous shadow & hover lift */}
              <Link
                to="/gyms"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#2878B8] hover:bg-[#1f639a] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#2878B8]/40 hover:shadow-[#2878B8]/60 hover:-translate-y-0.5 active:scale-95 transition-all group min-h-[50px]"
              >
                <span>استكشف الصالات المعتمدة</span>
                <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
              </Link>

              {/* Secondary Button: White/Glass with Gold Calculator Icon */}
              <Link
                to="/calculator"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/25 hover:border-[#D9AD55]/60 hover:text-[#D9AD55] backdrop-blur-md hover:-translate-y-0.5 active:scale-95 transition-all min-h-[50px]"
              >
                <Calculator className="w-4 h-4 text-[#D9AD55] shrink-0" />
                <span>احسب سعراتك الآن مجاناً</span>
              </Link>
            </div>

            {/* Interactive Proof Pills with Gold Icons */}
            <div className="pt-4 flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs sm:text-sm">
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#102C50]/80 backdrop-blur-md border border-white/15 text-slate-100 hover:border-[#D9AD55]/50 transition-colors shadow-sm">
                <ShieldCheck className="w-4 h-4 text-[#D9AD55] shrink-0" />
                <span className="font-semibold text-white">صالات معتمدة وموثقة ميدانياً</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#102C50]/80 backdrop-blur-md border border-white/15 text-slate-100 hover:border-[#D9AD55]/50 transition-colors shadow-sm">
                <Sparkles className="w-4 h-4 text-[#D9AD55] shrink-0" />
                <span className="font-semibold text-white">حسابات ومغذيات علمية دقيقة</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#102C50]/80 backdrop-blur-md border border-white/15 text-slate-100 hover:border-[#D9AD55]/50 transition-colors shadow-sm">
                <Award className="w-4 h-4 text-[#D9AD55] shrink-0" />
                <span className="font-semibold text-white">اشتراكات فورية بالريال اليمني</span>
              </div>
            </div>
          </div>

          {/* Left Column: Interactive Live Showcase Card floating over the Landmark Arches (Cols 8-12) */}
          <div className="lg:col-span-5 hidden lg:flex flex-col items-center lg:items-end justify-center">
            <div className="w-full max-w-sm rounded-2xl bg-[#102C50]/85 backdrop-blur-xl border border-white/20 p-5 shadow-2xl shadow-[#102C50]/90 space-y-4 hover:border-[#D9AD55]/40 transition-all duration-300">
              
              {/* Card Header with Gold Live Dot */}
              <div className="flex items-center justify-between border-b border-white/15 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D9AD55] animate-pulse shadow-[0_0_8px_#D9AD55]" />
                  <span className="text-white font-bold text-sm">صالات المكلا المعتمدة</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-md bg-[#D9AD55]/15 border border-[#D9AD55]/30 text-[#D9AD55] text-xs font-bold">
                  توثيق ميداني
                </span>
              </div>

              {/* Neighborhood Quick Switcher */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10">
                <button
                  type="button"
                  onClick={() => setActiveTab('fowa')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'fowa'
                      ? 'bg-[#2878B8] text-white shadow'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  حي فوة
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('sharj')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'sharj'
                      ? 'bg-[#2878B8] text-white shadow'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  حي الشرج
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('dees')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'dees'
                      ? 'bg-[#2878B8] text-white shadow'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  ديس المكلا
                </button>
              </div>

              {/* Dynamic Active Gym Card Content */}
              <div className="relative rounded-xl overflow-hidden border border-white/10 bg-white/5 p-3.5 space-y-3">
                <div className="flex items-start gap-3">
                  <img
                    src={activeGym.image}
                    alt={activeGym.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-white/20 bg-slate-900"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/images/clubs/smart-gym/interior.png';
                    }}
                  />
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-white font-bold text-sm truncate">
                        {activeGym.name}
                      </h4>
                    </div>
                    <p className="flex items-center gap-1 text-slate-300 text-xs">
                      <MapPin className="w-3.5 h-3.5 text-[#2878B8] shrink-0" />
                      <span className="truncate">{activeGym.neighborhood}</span>
                    </p>
                    <div className="flex items-center gap-2 pt-0.5">
                      <span className="inline-flex items-center gap-1 text-[#D9AD55] text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-[#D9AD55] text-[#D9AD55]" />
                        <span>{activeGym.rating}</span>
                      </span>
                      <span className="text-white/40 text-xs">•</span>
                      <span className="text-xs text-slate-200 font-semibold">
                        {activeGym.price}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] text-slate-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D9AD55]" />
                    <span>اشتراك فوري متاح</span>
                  </span>
                  <Link
                    to={`/gyms/${activeGym.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-white hover:text-[#D9AD55] transition-colors"
                  >
                    <span>عرض الصالة</span>
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Bottom Quick Metric */}
              <div className="flex items-center justify-between text-xs text-slate-300 px-1">
                <span>+5 صالات فحص ميداني</span>
                <span className="text-[#D9AD55] font-bold">0% عمولة وسيط</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
