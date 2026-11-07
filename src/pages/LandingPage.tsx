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
  MessageCircle,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

/* ─── Category Data (Shop by Category equivalent) ─── */
const CATEGORIES = [
  {
    label: 'صالات رياضية',
    path: '/gyms',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'تغذية صحية',
    path: '/meals',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'المدربون',
    path: '/trainers',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'حاسبة السعرات',
    path: '/calculator',
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'الخطة الغذائية',
    path: '/nutrition-plan',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'الاشتراكات',
    path: '/gyms',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80',
  },
];

/* ─── Gym Ribbon Badges ─── */
const GYM_BADGES: Record<string, { label: string; bg: string; text: string }> = {
  'smart-gym-mukalla': { label: 'الأكثر إقبالاً 🔥', bg: 'bg-[#D97241]', text: 'text-white' },
  'mukalla-gym': { label: 'الأعلى تقييماً ★', bg: 'bg-[#1F2722]', text: 'text-amber-300' },
  'golden-gym-mukalla': { label: 'توثيق معتمد ✓', bg: 'bg-[#7D9683]', text: 'text-white' },
  'hilal-fowah-gym': { label: 'باقة مميزة ⚡', bg: 'bg-[#536559]', text: 'text-white' },
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
          3. SHOP BY CATEGORY → "تصفح حسب الفئة"
      ═══════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-black text-[#D97241] uppercase tracking-normal">
            ✦ دليلك الرياضي والتغذوي في المكلا ✦
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1F2722] leading-[1.3] tracking-normal">
            تصفح خدمات عزم حسب الفئة
          </h2>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 sm:gap-8">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.label}
              to={cat.path}
              className="group flex flex-col items-center gap-3 text-center"
            >
              {/* Circular Image */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden ring-2 ring-[#F0EBE3] group-hover:ring-[#D97241] transition-all shadow-[0_8px_25px_-8px_rgba(0,0,0,0.1)] group-hover:shadow-[0_12px_30px_-5px_rgba(217,114,65,0.3)] group-hover:-translate-y-1.5 duration-300">
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              {/* Label */}
              <span className="text-xs sm:text-sm font-bold text-[#1F2722] group-hover:text-[#D97241] transition-colors">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          4. PROMOTIONAL BANNER (Split Layout)
      ═══════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        <div className="rounded-3xl overflow-hidden shadow-[0_15px_40px_-15px_rgba(31,39,34,0.15)] border border-[#EAE5DA]">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Content Column */}
            <div className="bg-[#1F2722] text-white p-8 sm:p-10 lg:p-14 flex flex-col justify-center space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#E49C7A] text-xs font-bold w-fit">
                <Sparkles className="w-3.5 h-3.5" />
                <span>حسابات علمية مخصصة لطقس ورطوبة الساحل</span>
              </div>
              <h3 className="text-3xl sm:text-4xl lg:text-[42px] font-black leading-tight">
                احسب احتياجك الفعلي<br />
                <span className="text-[#D97241]">من السعرات والبروتين مجاناً</span>
              </h3>
              <p className="text-sm text-white/70 leading-relaxed max-w-md font-medium">
                معادلة ميفلين-سانت جور لحساب معدل الأيض (BMR)، مع تحديد كمية الماء المناسبة للتعويض في بيئة المكلا، وجدول ماكروز دقيق بالجرام.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/calculator"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#D97241] hover:bg-[#C75F2F] text-white font-bold text-sm shadow-lg shadow-[#D97241]/25 hover:-translate-y-0.5 active:scale-95 transition-all"
                >
                  <Calculator className="w-4 h-4" />
                  <span>ابدأ الحساب الآن فوراً</span>
                </Link>
                <Link
                  to="/nutrition-plan"
                  className="inline-flex items-center px-6 py-3.5 rounded-xl border border-white/20 text-white font-bold text-sm hover:bg-white/10 transition-colors"
                >
                  <span>استكشف الخطة الساحلية</span>
                </Link>
              </div>
            </div>

            {/* Image Column */}
            <div className="relative bg-[#EDE8DF] min-h-[300px] lg:min-h-0">
              <img
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80"
                alt="التدريب والتغذية الصحية في المكلا"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:hidden" />
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          5. BEST SELLERS → "صالات المكلا الأكثر إقبالاً"
      ═══════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-black text-[#7D9683] block">صالات حقيقية معتمدة</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1F2722] leading-[1.3] tracking-normal">
              الصالات الأكثر إقبالاً في المكلا
            </h2>
          </div>
          <Link
            to="/gyms"
            className="text-xs sm:text-sm font-bold text-[#D97241] hover:text-[#C75F2F] transition-colors flex items-center gap-1.5"
          >
            <span>عرض كل الصالات</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        {/* Cards Grid with Badges and Diffuse Shadows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {popularGyms.map((gym) => {
            const isFav = favorites.includes(gym.id);
            const badge = GYM_BADGES[gym.id] || { label: 'معتمدة ✓', bg: 'bg-[#7D9683]', text: 'text-white' };

            return (
              <Link
                key={gym.id}
                to={`/gyms/${gym.slug}`}
                className="group bg-white rounded-3xl border border-[#F0EBE3] hover:border-[#D97241]/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_16px_40px_-10px_rgba(217,114,65,0.15)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Card Image */}
                <div className="relative aspect-[4/3] bg-[#FAF8F5] overflow-hidden">
                  <img
                    src={gym.coverImage}
                    alt={gym.nameAr}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
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
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    {/* Gym Name */}
                    <h4 className="font-black text-base text-[#1F2722] leading-snug group-hover:text-[#D97241] transition-colors truncate">
                      {gym.nameAr}
                    </h4>

                    {/* Location */}
                    <p className="text-xs text-[#7D9683] font-medium flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>{gym.neighborhood} • المكلا</span>
                    </p>
                  </div>

                  {/* Price & Rating Row */}
                  <div className="pt-2 border-t border-[#F0EBE3] flex items-center justify-between">
                    <div>
                      <span className="text-lg font-black text-[#D97241] font-mono">
                        {gym.pricingPlans[0]?.priceYer.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-[#7D9683] font-bold mr-1">ر.ي / شهر</span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="text-xs font-black text-[#1F2722]">4.9</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-1">
                    <span className="block w-full text-center py-2.5 rounded-xl border border-[#D97241] text-[#D97241] text-xs font-bold group-hover:bg-[#D97241] group-hover:text-white transition-all shadow-sm">
                      عرض التفاصيل والاشتراك
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          6. RECOMMENDED MEALS SECTION
      ═══════════════════════════════════════════ */}
      <section className="bg-[#FAF8F5] border-y border-[#F0EBE3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-black text-[#7D9683] block">صيد بحر المكلا الطازج</span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1F2722] leading-[1.3] tracking-normal">
                وجبات ساحلية نوصي بتجربتها
              </h2>
            </div>
            <Link
              to="/meals"
              className="text-xs sm:text-sm font-bold text-[#D97241] hover:text-[#C75F2F] transition-colors flex items-center gap-1"
            >
              <span>مكتبة الوجبات الكاملة</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

          {/* Meal Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedMeals.map((meal) => (
              <Link
                key={meal.id}
                to={`/meals/${meal.id}`}
                className="group bg-white rounded-3xl border border-[#F0EBE3] hover:border-[#D97241]/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
              >
                {/* Meal Image */}
                <div className="relative aspect-video bg-[#EDE8DF] overflow-hidden">
                  <img
                    src={meal.imageUrl}
                    alt={meal.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Calorie Badge */}
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-[#D97241]" />
                    <span className="text-xs font-black text-[#D97241] font-mono">{meal.calories}</span>
                    <span className="text-[10px] text-[#7D9683] font-bold">سعرة</span>
                  </div>
                </div>

                {/* Meal Body */}
                <div className="p-5 space-y-3">
                  <h4 className="font-black text-sm text-[#1F2722] leading-snug line-clamp-2 group-hover:text-[#D97241] transition-colors">
                    {meal.title}
                  </h4>
                  <p className="text-xs text-[#536559] line-clamp-2 leading-relaxed">
                    {meal.description}
                  </p>
                  {/* Macros Row */}
                  <div className="flex items-center gap-2 pt-1 flex-wrap">
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
                </div>
              </Link>
            ))}
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

      {/* ═══════════════════════════════════════════
          8. FLOATING SMART WHATSAPP ACTION BUTTON
      ═══════════════════════════════════════════ */}
      <div className="fixed bottom-6 left-6 z-50">
        <a
          href="https://wa.me/967770000000?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D9%85%D9%86%D8%B5%D8%A9%20%D8%B9%D8%B2%D9%85%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%A3%D9%81%D8%B6%D9%84%20%D8%B5%D8%A7%D9%84%D8%A9%20%D8%B1%D9%8A%D8%A7%D8%B6%D9%8A%D8%A9%20%D9%82%D8%B1%D9%8A%D8%A8%D8%A9%20%D9%85%D9%86%D9%8A%20%D9%81%D9%8A%20%D8%A7%D9%84%D9%85%D9%83%D9%84%D8%A7"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#1F2722] hover:bg-[#D97241] text-white shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20"
          title="تواصل مباشر عبر واتساب"
        >
          <div className="relative">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 block animate-ping absolute inset-0" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 block relative" />
          </div>
          <span className="text-xs font-black tracking-normal">
            استفسار فوري • صالات المكلا
          </span>
        </a>
      </div>

    </div>
  );
};

export default LandingPage;
