import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MUKALLA_GYMS } from '../data/mukallaGymsData';
import { MEALS_DATA } from '../data/mealsData';
import { HeroSection } from '../components/HeroSection';
import {
  ShieldCheck,
  Dumbbell,
  Calculator,
  Flame,
  ArrowLeft,
  MapPin,
  Star,
  Heart,
  Truck,
  RefreshCw,
  Shield,
  Headphones,
  Leaf,
  Beaker,
  Users2,
  UtensilsCrossed,
  Sparkles,
  CheckCircle2,
  Plus,
  Clock
} from 'lucide-react';

/* ─── Category Data (Burger Hub Floating Category Strip Style) ─── */
const CATEGORIES = [
  {
    label: 'صالات رياضية',
    sublabel: 'أجهزة حديثة وكباتن',
    path: '/gyms',
    icon: Dumbbell,
  },
  {
    label: 'تغذية صحية',
    sublabel: 'صيد المكلا الطازج',
    path: '/meals',
    icon: UtensilsCrossed,
  },
  {
    label: 'دليل المدربين',
    sublabel: 'إشراف ومتابعة مهنية',
    path: '/trainers',
    icon: Users2,
  },
  {
    label: 'حاسبة السعرات',
    sublabel: 'معادلة ميفلين العلمية',
    path: '/calculator',
    icon: Calculator,
  },
  {
    label: 'الخطة الغذائية',
    sublabel: 'جداول محسوبة للمناخ',
    path: '/nutrition-plan',
    icon: Sparkles,
  },
  {
    label: 'اشتراكات النوادي',
    sublabel: 'أسعار رسمية بلا وسطاء',
    path: '/gyms',
    icon: ShieldCheck,
  },
];

/* ─── Gym Ribbon Badges ─── */
const GYM_BADGES: Record<string, { label: string; bg: string; text: string }> = {
  'fit-x-gym-mukalla': { label: 'تجهيزات حديثة ✦', bg: 'bg-[#D97241]', text: 'text-white' },
  'smart-gym-mukalla': { label: 'الأكثر إقبالاً 🔥', bg: 'bg-[#D97241]', text: 'text-white' },
  'mukalla-gym': { label: 'الأعلى تقييماً ★', bg: 'bg-[#1F2722]', text: 'text-amber-300' },
  'golds-gym-mukalla': { label: 'توثيق معتمد ✓', bg: 'bg-[#7D9683]', text: 'text-white' },
  'winner-gym-mukalla': { label: 'باقة مميزة ⚡', bg: 'bg-[#536559]', text: 'text-white' },
};

export const LandingPage: React.FC = () => {
  const [subscribedEmail, setSubscribedEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  /* Featured data */
  const popularGyms = MUKALLA_GYMS.slice(0, 4);
  const recommendedMeals = MEALS_DATA.slice(0, 3);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscribedEmail.trim()) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setSubscribedEmail('');
      setIsSubscribed(false);
      alert('شكراً لك! تم تسجيل بريدك للاطلاع على جديد عروض نوادي المكلا.');
    }, 1500);
  };

  return (
    <div className="bg-white text-[#1F2722] font-['Cairo',sans-serif] relative" dir="rtl">

      {/* ═══════════════════════════════════════════
          1. HERO SECTION (Carousel)
      ═══════════════════════════════════════════ */}
      <HeroSection />

      {/* ═══════════════════════════════════════════
          1.5 LIVE SOCIAL PROOF TICKER (مؤشرات المصداقية الميدانية)
      ═══════════════════════════════════════════ */}
      <section className="bg-[#FAF8F5] border-y border-[#F0EBE3] py-4 sm:py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-[#F0EBE3]">
            
            <div className="flex items-center justify-center gap-3 py-2 md:py-0">
              <span className="text-2xl sm:text-3xl font-black text-[#D97241] font-mono">+15</span>
              <div className="text-right">
                <span className="block text-xs font-black text-[#1F2722]">صالة موثقة بالمكلا</span>
                <span className="block text-[10px] text-[#7D9683]">فوة والشرج والديس</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 py-2 md:py-0">
              <span className="text-2xl sm:text-3xl font-black text-[#7D9683] font-mono">100%</span>
              <div className="text-right">
                <span className="block text-xs font-black text-[#1F2722]">أسعار رسمية ومحدثة</span>
                <span className="block text-[10px] text-[#7D9683]">مؤكدة بالريال اليمني</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 py-2 md:py-0">
              <span className="text-2xl sm:text-3xl font-black text-[#1F2722] font-mono">+2,500</span>
              <div className="text-right">
                <span className="block text-xs font-black text-[#1F2722]">حساب سعرات علمي</span>
                <span className="block text-[10px] text-[#7D9683]">معادلة ميفلين-سانت جور</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 py-2 md:py-0">
              <span className="text-2xl sm:text-3xl font-black text-amber-500 font-mono">4.9 ★</span>
              <div className="text-right">
                <span className="block text-xs font-black text-[#1F2722]">تقييم الكباتن والمتدربين</span>
                <span className="block text-[10px] text-[#7D9683]">إشراف مهني معتمد</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          2. TRUST BADGES STRIP (4 items with dividers)
      ═══════════════════════════════════════════ */}
      <section className="border-b border-[#F0EBE3] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-x-reverse divide-[#F0EBE3]">

            {/* Badge 1 */}
            <div className="flex flex-col items-center text-center md:px-6 gap-2">
              <div className="w-11 h-11 rounded-full bg-[#F4F7F5] text-[#7D9683] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-black text-[#1F2722]">صالات معتمدة</p>
                <p className="text-[11px] text-[#7D9683] font-medium">فحص وتوثيق ميداني 2026</p>
              </div>
            </div>

            {/* Badge 2 */}
            <div className="flex flex-col items-center text-center md:px-6 gap-2">
              <div className="w-11 h-11 rounded-full bg-[#F4F7F5] text-[#7D9683] flex items-center justify-center">
                <Beaker className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-black text-[#1F2722]">تغذية مدروسة علمياً</p>
                <p className="text-[11px] text-[#7D9683] font-medium">معادلات معتمدة دولياً</p>
              </div>
            </div>

            {/* Badge 3 */}
            <div className="flex flex-col items-center text-center md:px-6 gap-2">
              <div className="w-11 h-11 rounded-full bg-[#F4F7F5] text-[#7D9683] flex items-center justify-center">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-black text-[#1F2722]">مكونات ساحلية طبيعية</p>
                <p className="text-[11px] text-[#7D9683] font-medium">وجبات سمك الثمد الطازجة</p>
              </div>
            </div>

            {/* Badge 4 */}
            <div className="flex flex-col items-center text-center md:px-6 gap-2">
              <div className="w-11 h-11 rounded-full bg-[#F4F7F5] text-[#7D9683] flex items-center justify-center">
                <Users2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-black text-[#1F2722]">كباتن مؤهلون</p>
                <p className="text-[11px] text-[#7D9683] font-medium">إشراف وتوجيه مهني</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          3. FLOATING CATEGORY STRIP (BURGER HUB STYLE)
      ═══════════════════════════════════════════ */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 mb-8 sm:mb-12">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_20px_50px_-15px_rgba(31,39,34,0.12)] border border-[#EAE5DA] p-3 sm:p-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse divide-[#F0EBE3]">
            {CATEGORIES.map((cat, idx) => {
              const IconComp = cat.icon;
              return (
                <Link
                  key={cat.label}
                  to={cat.path}
                  className={`group flex flex-col items-center text-center p-3 sm:p-4 rounded-2xl hover:bg-[#FAF8F5] transition-all duration-300 hover:-translate-y-1 ${
                    idx !== 0 ? 'pt-4 sm:pt-3' : ''
                  }`}
                >
                  {/* Clean Icon Badge */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#FAF8F5] group-hover:bg-[#D97241] flex items-center justify-center text-[#1F2722] group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:shadow-[#D97241]/25 mb-2.5">
                    <IconComp className="w-6 h-6 sm:w-7 sm:h-7 transition-transform group-hover:scale-110" />
                  </div>
                  {/* Category Title */}
                  <span className="text-xs sm:text-sm font-black text-[#1F2722] group-hover:text-[#D97241] transition-colors leading-tight">
                    {cat.label}
                  </span>
                  {/* Subtitle / Micro-tagline */}
                  <span className="text-[10px] sm:text-[11px] text-[#7D9683] font-medium mt-1 leading-snug">
                    {cat.sublabel}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          4. PROMOTIONAL BANNER (BURGER HUB PROMO BANNER STYLE)
      ═══════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        <div className="rounded-3xl overflow-hidden shadow-[0_20px_50px_-15px_rgba(217,114,65,0.2)] bg-gradient-to-r from-[#D97241] via-[#E07C4C] to-[#C75F2F] text-white p-6 sm:p-10 lg:p-12 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">

            {/* Left/Col 1: Clock / Punchy Headline */}
            <div className="lg:col-span-5 flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0">
                <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-white animate-pulse" />
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-white/80 block">
                  جاهز للبداية؟ • START TODAY
                </span>
                <h3 className="text-2xl sm:text-3xl font-black leading-tight">
                  احسب سعراتك<br />
                  <span className="text-[#1F2722]">وابدأ أهدافك فوراً!</span>
                </h3>
              </div>
            </div>

            {/* Center/Col 2: Discount & Code Badge */}
            <div className="lg:col-span-4 border-y lg:border-y-0 lg:border-x border-white/20 py-4 lg:py-0 lg:px-6 flex flex-col justify-center">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black font-mono text-white">20%</span>
                <span className="text-sm sm:text-base font-bold text-white/90">خصم خاص على أول اشتراك</span>
              </div>
              <div className="mt-2 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#1F2722] text-white text-xs font-mono font-bold w-fit shadow-inner">
                <span className="text-[#D97241]">كود عزم:</span>
                <span className="tracking-widest">AZM2026</span>
              </div>
            </div>

            {/* Right/Col 3: CTA Buttons */}
            <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Link
                to="/calculator"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#1F2722] hover:bg-black text-white font-black text-sm shadow-xl hover:scale-105 active:scale-95 transition-all text-center"
              >
                <Calculator className="w-4 h-4 text-[#D97241]" />
                <span>احسب سعراتك الآن</span>
              </Link>
              <Link
                to="/nutrition-plan"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-white/20 hover:bg-white/30 text-white font-bold text-sm backdrop-blur-md transition-all text-center border border-white/30"
              >
                <span>الخطة الغذائية الساحلية</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          5. BEST SELLERS → "صالات المكلا الأكثر إقبالاً" (BURGER HUB BESTSELLERS STYLE)
      ═══════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        {/* Section Header with Script Accent & Lines */}
        <div className="text-center space-y-2 mb-10 sm:mb-12">
          <div className="inline-flex items-center justify-center gap-2.5 text-xs font-black text-[#D97241]">
            <span className="w-8 sm:w-12 h-px bg-[#D97241]/40" />
            <span className="tracking-widest uppercase">الخيارات الأكثر طلباً • POPULAR PICKS</span>
            <span className="w-8 sm:w-12 h-px bg-[#D97241]/40" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1F2722] tracking-tight">
            صالات المكلا الأكثر إقبالاً
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {popularGyms.map((gym) => {
            const isFav = favorites.includes(gym.id);
            const badge = GYM_BADGES[gym.id] || { label: 'معتمدة ✓', bg: 'bg-[#7D9683]', text: 'text-white' };

            return (
              <div
                key={gym.id}
                className="group bg-white rounded-2xl sm:rounded-3xl border border-[#EAE5DA] hover:border-[#D97241] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_-10px_rgba(217,114,65,0.2)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Card Image */}
                <Link to={`/gyms/${gym.slug}`} className="block relative aspect-[4/3] bg-[#FAF8F5] overflow-hidden">
                  <img
                    src={gym.coverImage}
                    alt={gym.nameAr}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    loading="lazy"
                  />
                  {/* Ribbon Badge */}
                  <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-black shadow-md ${badge.bg} ${badge.text}`}>
                    {badge.label}
                  </span>
                  {/* Heart Icon */}
                  <button
                    onClick={(e) => toggleFavorite(gym.id, e)}
                    className={`absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-md ${
                      isFav
                        ? 'bg-red-50 text-red-500 scale-110'
                        : 'bg-white/90 text-slate-400 hover:text-red-500 hover:bg-white'
                    }`}
                    title={isFav ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500' : ''}`} />
                  </button>
                </Link>

                {/* Card Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <Link to={`/gyms/${gym.slug}`}>
                      <h4 className="font-black text-base text-[#1F2722] leading-snug group-hover:text-[#D97241] transition-colors truncate">
                        {gym.nameAr}
                      </h4>
                    </Link>
                    <p className="text-xs text-[#7D9683] font-medium flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 shrink-0 text-[#D97241]" />
                      <span>{gym.neighborhood} • المكلا</span>
                    </p>
                    <p className="text-xs text-[#536559] line-clamp-2 mt-2 leading-relaxed">
                      {gym.shortDescription}
                    </p>
                  </div>

                  {/* Price & Burger Hub "+" Action Button Row */}
                  <div className="pt-3 border-t border-[#F0EBE3] flex items-center justify-between">
                    <div>
                      <span className="text-xl font-black text-[#D97241] font-mono">
                        {gym.pricingPlans[0]?.priceYer.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-[#7D9683] font-bold mr-1">ر.ي / شهر</span>
                    </div>

                    {/* Circular Action Button (+) */}
                    <Link
                      to={`/gyms/${gym.slug}`}
                      className="w-9 h-9 rounded-full bg-[#D97241] hover:bg-[#C75F2F] text-white flex items-center justify-center shadow-md shadow-[#D97241]/30 hover:scale-110 active:scale-95 transition-all"
                      title="عرض التفاصيل والاشتراك"
                    >
                      <Plus className="w-5 h-5 stroke-[2.5]" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View Full Directory Pill Button (Burger Hub Style) */}
        <div className="text-center mt-10">
          <Link
            to="/gyms"
            className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full bg-[#1F2722] hover:bg-[#D97241] text-white font-black text-sm shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 group"
          >
            <span>استكشف كافة الصالات المعتمدة</span>
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          6. RECOMMENDED MEALS SECTION (BURGER HUB STYLE)
      ═══════════════════════════════════════════ */}
      <section className="bg-[#FAF8F5] border-y border-[#F0EBE3] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Section Header with Script Accent & Lines */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center gap-2.5 text-xs font-black text-[#7D9683]">
              <span className="w-8 sm:w-12 h-px bg-[#7D9683]/40" />
              <span className="tracking-widest uppercase">— وجبات مختارة —</span>
              <span className="w-8 sm:w-12 h-px bg-[#7D9683]/40" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1F2722] tracking-tight">
              وجبات ساحلية نوصي بتجربتها
            </h2>
          </div>

          {/* Meal Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedMeals.map((meal) => (
              <div
                key={meal.id}
                className="group bg-white rounded-2xl sm:rounded-3xl border border-[#EAE5DA] hover:border-[#D97241] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_-10px_rgba(217,114,65,0.2)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Meal Image */}
                <Link to={`/meals/${meal.id}`} className="block relative aspect-video bg-[#EDE8DF] overflow-hidden">
                  <img
                    src={meal.imageUrl}
                    alt={meal.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    loading="lazy"
                  />
                  {/* Calorie Badge */}
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-[#D97241]" />
                    <span className="text-xs font-black text-[#D97241] font-mono">{meal.calories}</span>
                    <span className="text-[10px] text-[#7D9683] font-bold">سعرة</span>
                  </div>
                </Link>

                {/* Meal Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <Link to={`/meals/${meal.id}`}>
                      <h4 className="font-black text-base text-[#1F2722] leading-snug line-clamp-2 group-hover:text-[#D97241] transition-colors">
                        {meal.title}
                      </h4>
                    </Link>
                    <p className="text-xs text-[#536559] line-clamp-2 leading-relaxed mt-1.5">
                      {meal.description}
                    </p>
                  </div>

                  {/* Macros Row */}
                  <div className="flex items-center gap-1.5 pt-1 flex-wrap">
                    <span className="text-[11px] font-bold text-[#7D9683] bg-[#F4F7F5] px-2.5 py-1 rounded-full">
                      {meal.protein}g بروتين
                    </span>
                    <span className="text-[11px] font-bold text-[#536559] bg-[#F4F7F5] px-2.5 py-1 rounded-full">
                      {meal.carbs}g كارب
                    </span>
                    <span className="text-[11px] font-bold text-[#536559] bg-[#F4F7F5] px-2.5 py-1 rounded-full">
                      {meal.fats}g دهون
                    </span>
                  </div>

                  {/* View Meal Action Row */}
                  <div className="pt-3 border-t border-[#F0EBE3] flex items-center justify-between">
                    <span className="text-xs font-bold text-[#7D9683]">وصفة متوازنة</span>
                    <Link
                      to={`/meals/${meal.id}`}
                      className="w-9 h-9 rounded-full bg-[#D97241] hover:bg-[#C75F2F] text-white flex items-center justify-center shadow-md shadow-[#D97241]/30 hover:scale-110 active:scale-95 transition-all"
                      title="تفاصيل الوجبة"
                    >
                      <Plus className="w-5 h-5 stroke-[2.5]" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View Full Meals Pill Button */}
          <div className="text-center pt-2">
            <Link
              to="/meals"
              className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full bg-[#1F2722] hover:bg-[#D97241] text-white font-black text-sm shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 group"
            >
              <span>تصفح كافة الوجبات الصحية</span>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          7. SERVICE GUARANTEES STRIP
      ═══════════════════════════════════════════ */}
      <section className="border-b border-[#F0EBE3] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-x-reverse divide-[#F0EBE3]">

            <div className="flex flex-col items-center text-center md:px-6 gap-2">
              <Truck className="w-6 h-6 text-[#1F2722]" />
              <p className="text-sm font-black text-[#1F2722]">اشتراك فوري ومؤكد</p>
              <p className="text-[11px] text-[#7D9683] font-medium">تفعيل مباشر بدون انتظار</p>
            </div>

            <div className="flex flex-col items-center text-center md:px-6 gap-2">
              <RefreshCw className="w-6 h-6 text-[#1F2722]" />
              <p className="text-sm font-black text-[#1F2722]">مرونة كاملة في الباقات</p>
              <p className="text-[11px] text-[#7D9683] font-medium">خيارات شهرية وتطويرية</p>
            </div>

            <div className="flex flex-col items-center text-center md:px-6 gap-2">
              <Shield className="w-6 h-6 text-[#1F2722]" />
              <p className="text-sm font-black text-[#1F2722]">بيانات وأسعار موثقة</p>
              <p className="text-[11px] text-[#7D9683] font-medium">مطابقة للواقع 100%</p>
            </div>

            <div className="flex flex-col items-center text-center md:px-6 gap-2">
              <Headphones className="w-6 h-6 text-[#1F2722]" />
              <p className="text-sm font-black text-[#1F2722]">دعم متواصل بالمكلا</p>
              <p className="text-[11px] text-[#7D9683] font-medium">نحن معك في كل خطوة</p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
