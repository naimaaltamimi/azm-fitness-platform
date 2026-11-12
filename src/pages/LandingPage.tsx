import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MUKALLA_GYMS } from '../data/mukallaGymsData';
import { MEALS_DATA } from '../data/mealsData';
import { INITIAL_TRAINERS } from '../data/trainersData';
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
  Clock,
  Check,
  Award,
  Zap
} from 'lucide-react';

/* ─── Category Data (Flavoria Circular Style) ─── */
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

/* ─── Standard Membership Pricing Packages (Flavoria Comparison Style) ─── */
const PRICING_PACKAGES = [
  {
    id: 'monthly-fitness',
    name: 'اشتراك اللياقة الشهري',
    tagline: 'الخيار الأنسب للبدء وتجربة أجهزة الصالة',
    priceYer: 16000,
    period: 'شهر واحد',
    isPopular: false,
    features: [
      'دخول مفتوح لكافة أجهزة المقاومة والكارديو',
      'تقييم بدني مبدئي مع جدول تمارين مخصص',
      'استخدام غرف التبديل والخزانات الآمنة',
      'فترات صباحية ومسائية مرنة',
    ],
    buttonText: 'اشترك الآن',
    buttonLink: '/gyms',
  },
  {
    id: 'challenge-3months',
    name: 'باقة التحدي والتحول',
    tagline: 'الباقة الأكثر طلباً لتحقيق نتائج حقيقية واضحة',
    priceYer: 42000,
    period: '3 أشهر',
    isPopular: true,
    badge: 'الأكثر طلباً ⭐',
    features: [
      'دخول غير محدود لجميع مرافق الصالة لمدة 90 يوماً',
      'متابعة دورية لقياسات نسبة الدهون والكتلة العضلية',
      'خطة تغذية ساحلية مخصصة لمناخ المكلا',
      'إشراف وتوجيه أسبوعي من كابتن معتمد',
      'توفير 6,000 ريال مقارنة بالاشتراك الشهري',
    ],
    buttonText: 'ابدأ التحدي الآن',
    buttonLink: '/gyms',
  },
  {
    id: 'annual-golden',
    name: 'العضوية الذهبية السنوية',
    tagline: 'التزام كامل لنمط حياة صحي دائم بأفضل سعر',
    priceYer: 150000,
    period: 'سنة كاملة (12 شهراً)',
    isPopular: false,
    features: [
      'وصول شامل طوال العام بدون أي قيود',
      'استشارات تغذية وتدريب مستمرة',
      'أولوية الحجز في الفترات المزدحمة',
      'إمكانية تجميد الاشتراك حتى 30 يوماً',
      'أعلى نسبة توفير سنوي في نوادي المكلا',
    ],
    buttonText: 'احصل على العضوية',
    buttonLink: '/gyms',
  },
];

export const LandingPage: React.FC = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('all');

  // Filter gyms by neighborhood
  const filteredGyms = useMemo(() => {
    if (selectedNeighborhood === 'all') {
      return MUKALLA_GYMS.slice(0, 4);
    }
    const matching = MUKALLA_GYMS.filter((g) => g.neighborhood.includes(selectedNeighborhood));
    return matching.length > 0 ? matching.slice(0, 4) : MUKALLA_GYMS.slice(0, 4);
  }, [selectedNeighborhood]);

  const recommendedMeals = MEALS_DATA.slice(0, 3);
  const featuredTrainers = INITIAL_TRAINERS.slice(0, 2);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-white text-[#1F2722] font-['Cairo',sans-serif] relative" dir="rtl">

      {/* ═══════════════════════════════════════════
          1. HERO SECTION (Flavoria Light & Balanced Style)
      ═══════════════════════════════════════════ */}
      <HeroSection />

      {/* ═══════════════════════════════════════════
          2. STATS STRIP — أرقام المنصة
      ═══════════════════════════════════════════ */}
      <section className="bg-white border-b border-[#F0EBE3] py-10 sm:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-x-reverse divide-[#F0EBE3]">

            <div className="flex flex-col items-center text-center md:px-8 gap-1">
              <span className="text-4xl sm:text-5xl font-black text-[#D97241] leading-none">+15</span>
              <span className="mt-2 text-sm font-bold text-[#1F2722]">صالة رياضية موثقة</span>
              <span className="text-xs text-[#7D9683]">فوة • الشرج • خلف • الديس</span>
            </div>

            <div className="flex flex-col items-center text-center md:px-8 gap-1">
              <span className="text-4xl sm:text-5xl font-black text-[#1F2722] leading-none">100%</span>
              <span className="mt-2 text-sm font-bold text-[#1F2722]">أسعار رسمية محدّثة</span>
              <span className="text-xs text-[#7D9683]">بالريال اليمني بلا وسطاء</span>
            </div>

            <div className="flex flex-col items-center text-center md:px-8 gap-1">
              <span className="text-4xl sm:text-5xl font-black text-[#D97241] leading-none">+2500</span>
              <span className="mt-2 text-sm font-bold text-[#1F2722]">حساب سعرات علمي</span>
              <span className="text-xs text-[#7D9683]">معادلة ميفلين-سانت جور</span>
            </div>

            <div className="flex flex-col items-center text-center md:px-8 gap-1">
              <div className="flex items-center gap-1.5">
                <span className="text-4xl sm:text-5xl font-black text-[#1F2722] leading-none">4.9</span>
                <Star className="w-6 h-6 text-amber-400 fill-amber-400 mt-1" />
              </div>
              <span className="mt-2 text-sm font-bold text-[#1F2722]">تقييم الكباتن</span>
              <span className="text-xs text-[#7D9683]">إشراف مهني معتمد</span>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          3. TRUST BADGES STRIP — لماذا عزم؟
      ═══════════════════════════════════════════ */}
      <section className="bg-[#FAF8F5] border-b border-[#F0EBE3] py-10 sm:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-8 sm:mb-10">
            <span className="inline-block text-xs font-black tracking-[0.2em] uppercase text-[#D97241] mb-2">لماذا منصة عزم؟</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1F2722]">كل ما تحتاجه في مكان واحد</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="bg-white rounded-2xl border border-[#EAE5DA] p-6 flex flex-col items-center text-center gap-4 hover:border-[#D97241] hover:shadow-lg transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-[#FDF4EF] text-[#D97241] flex items-center justify-center group-hover:bg-[#D97241] group-hover:text-white transition-all duration-300">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <p className="text-base font-black text-[#1F2722] mb-1">صالات معتمدة</p>
                <p className="text-xs text-[#7D9683] leading-relaxed">فحص وتوثيق ميداني لكل صالة قبل إدراجها في المنصة</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#EAE5DA] p-6 flex flex-col items-center text-center gap-4 hover:border-[#D97241] hover:shadow-lg transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-[#FDF4EF] text-[#D97241] flex items-center justify-center group-hover:bg-[#D97241] group-hover:text-white transition-all duration-300">
                <Beaker className="w-7 h-7" />
              </div>
              <div>
                <p className="text-base font-black text-[#1F2722] mb-1">تغذية علمية</p>
                <p className="text-xs text-[#7D9683] leading-relaxed">خطط غذائية مبنية على معادلات معتمدة دولياً وتناسب المناخ الساحلي</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#EAE5DA] p-6 flex flex-col items-center text-center gap-4 hover:border-[#D97241] hover:shadow-lg transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-[#FDF4EF] text-[#D97241] flex items-center justify-center group-hover:bg-[#D97241] group-hover:text-white transition-all duration-300">
                <Leaf className="w-7 h-7" />
              </div>
              <div>
                <p className="text-base font-black text-[#1F2722] mb-1">مكونات طبيعية</p>
                <p className="text-xs text-[#7D9683] leading-relaxed">وجبات من صيد المكلا الطازج وأفضل المكونات الساحلية الصحية</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#EAE5DA] p-6 flex flex-col items-center text-center gap-4 hover:border-[#D97241] hover:shadow-lg transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-[#FDF4EF] text-[#D97241] flex items-center justify-center group-hover:bg-[#D97241] group-hover:text-white transition-all duration-300">
                <Users2 className="w-7 h-7" />
              </div>
              <div>
                <p className="text-base font-black text-[#1F2722] mb-1">كباتن مؤهلون</p>
                <p className="text-xs text-[#7D9683] leading-relaxed">مدربون معتمدون بشهادات رسمية وخبرة ميدانية موثقة بالمكلا</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          4. CATEGORY STRIP — تصنيفات المنصة (Flavoria Style)
      ═══════════════════════════════════════════ */}
      <section className="bg-white py-12 sm:py-16 border-b border-[#F0EBE3]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-10 sm:mb-12">
            <span className="inline-block text-xs font-black tracking-[0.2em] uppercase text-[#D97241] mb-2">تصنيفات المنصة</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1F2722]">استكشف خدماتنا</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
            {CATEGORIES.map((cat) => {
              const IconComp = cat.icon;
              return (
                <Link
                  key={cat.label}
                  to={cat.path}
                  className="group flex flex-col items-center text-center w-24 sm:w-28 gap-3"
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-[#EAE5DA] group-hover:border-[#D97241] bg-[#FAF8F5] group-hover:bg-[#FDF4EF] flex items-center justify-center transition-all duration-300 shadow-sm group-hover:shadow-[0_8px_24px_rgba(217,114,65,0.18)] group-hover:-translate-y-1.5">
                    <IconComp className="w-8 h-8 sm:w-9 sm:h-9 text-[#1F2722] group-hover:text-[#D97241] transition-colors duration-300" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-[#1F2722] group-hover:text-[#D97241] transition-colors leading-tight">
                    {cat.label}
                  </span>
                  <span className="text-[10px] text-[#7D9683] leading-snug -mt-1">
                    {cat.sublabel}
                  </span>
                </Link>
              );
            })}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════
          5. FEATURED GYMS (Flavoria Recommendation Grid with Neighborhood Tabs)
      ═══════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-8 sm:mb-10">
          <span className="inline-block text-xs font-black tracking-[0.2em] uppercase text-[#D97241]">
            صالات معتمدة بالمكلا
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1F2722] tracking-tight">
            الأندية الرياضية الأكثر طلباً
          </h2>
          <p className="text-xs sm:text-sm text-[#7D9683] max-w-xl mx-auto font-medium">
            تجهيزات متطورة، أجهزة أصلية، وإشراف مهني مباشر بأسعار معلنة ورسمية بالريال اليمني
          </p>
        </div>

        {/* Neighborhood Filter Tabs (Flavoria Category Tab Style) */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {[
            { id: 'all', label: 'جميع الصالات' },
            { id: 'خلف', label: 'منطقة خلف' },
            { id: 'فوة', label: 'فوة المتضررين' },
            { id: 'الشرج', label: 'الشرج' },
            { id: 'الديس', label: 'ديس المكلا' },
          ].map((tab) => {
            const isActive = selectedNeighborhood === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedNeighborhood(tab.id)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-[#1F2722] text-white shadow-md'
                    : 'bg-[#FAF8F5] text-[#536559] hover:bg-[#F0EBE3] hover:text-[#1F2722] border border-[#EAE5DA]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Gym Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredGyms.map((gym) => {
            const isFav = favorites.includes(gym.id);
            const badge = GYM_BADGES[gym.id] || { label: 'معتمدة ✓', bg: 'bg-[#7D9683]', text: 'text-white' };

            return (
              <div
                key={gym.id}
                className="group bg-white rounded-3xl border border-[#EAE5DA] hover:border-[#D97241] shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_16px_36px_-10px_rgba(217,114,65,0.18)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Image */}
                <Link to={`/gyms/${gym.slug}`} className="block relative aspect-[4/3] bg-[#FAF8F5] overflow-hidden">
                  <img
                    src={gym.coverImage}
                    alt={gym.nameAr}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    loading="lazy"
                  />
                  <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-black shadow-md ${badge.bg} ${badge.text}`}>
                    {badge.label}
                  </span>
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

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <p className="text-xs text-[#7D9683] font-medium flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#D97241]" />
                        <span>{gym.neighborhood} • المكلا</span>
                      </p>
                      <span className="text-xs font-bold text-amber-500 flex items-center gap-0.5">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>4.9</span>
                      </span>
                    </div>

                    <Link to={`/gyms/${gym.slug}`}>
                      <h4 className="font-black text-base text-[#1F2722] group-hover:text-[#D97241] transition-colors truncate">
                        {gym.nameAr}
                      </h4>
                    </Link>

                    <p className="text-xs text-[#536559] line-clamp-2 mt-1.5 leading-relaxed">
                      {gym.shortDescription}
                    </p>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-3 border-t border-[#F0EBE3] flex items-center justify-between">
                    <div>
                      <span className="text-lg sm:text-xl font-black text-[#D97241] font-mono">
                        {gym.pricingPlans[0]?.priceYer.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-[#7D9683] font-bold mr-1">ر.ي / شهر</span>
                    </div>

                    <Link
                      to={`/gyms/${gym.slug}`}
                      className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-[#FAF8F5] hover:bg-[#D97241] text-[#1F2722] hover:text-white text-xs font-bold border border-[#EAE5DA] hover:border-[#D97241] transition-all shadow-sm"
                    >
                      <span>التفاصيل</span>
                      <ArrowLeft className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Directory Button */}
        <div className="text-center mt-10 sm:mt-12">
          <Link
            to="/gyms"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#1F2722] hover:bg-[#D97241] text-white font-black text-xs sm:text-sm shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 group"
          >
            <span>استكشف كافة الصالات المعتمدة</span>
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
          </Link>
        </div>

      </section>

      {/* ═══════════════════════════════════════════
          6. CERTIFIED TRAINERS SECTION — نخبة الكباتن المعتمدين (NEW)
      ═══════════════════════════════════════════ */}
      <section className="bg-[#FAF8F5] border-y border-[#F0EBE3] py-14 sm:py-18">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-10 sm:mb-12">
            <span className="inline-block text-xs font-black tracking-[0.2em] uppercase text-[#D97241]">
              كفاءات تدريبية مؤهلة
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1F2722] tracking-tight">
              نخبة المدربين المعتمدين بالمكلا
            </h2>
            <p className="text-xs sm:text-sm text-[#7D9683] max-w-xl mx-auto font-medium">
              إشراف رياضي معتمد وخطط تدريب بدني فردية تضمن تحقيق هدفك بأمان واحترافية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredTrainers.map((trainer) => (
              <div
                key={trainer.id}
                className="bg-white rounded-3xl border border-[#EAE5DA] p-6 sm:p-7 shadow-[0_6px_24px_rgb(0,0,0,0.03)] hover:border-[#D97241] transition-all duration-300 flex flex-col sm:flex-row gap-5 items-center sm:items-start"
              >
                <div className="relative shrink-0">
                  <img
                    src={trainer.avatarUrl}
                    alt={trainer.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-[#EAE5DA]"
                  />
                  {trainer.isVerified && (
                    <span className="absolute -bottom-2 -right-2 bg-emerald-600 text-white p-1 rounded-full shadow-md" title="مدرب موثق ومعتمد">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                  )}
                </div>

                <div className="flex-1 text-center sm:text-right space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="text-lg font-black text-[#1F2722]">
                      {trainer.name}
                    </h3>
                    <span className="inline-flex items-center justify-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full w-fit mx-auto sm:mx-0">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{trainer.rating} تقييم</span>
                    </span>
                  </div>

                  <p className="text-xs font-bold text-[#D97241]">
                    {trainer.specialty}
                  </p>

                  <p className="text-xs text-[#536559] leading-relaxed line-clamp-2">
                    {trainer.bio}
                  </p>

                  <div className="pt-3 border-t border-[#F0EBE3] flex items-center justify-between text-xs">
                    <span className="text-[#7D9683] font-medium flex items-center gap-1">
                      <Award className="w-4 h-4 text-[#D97241]" />
                      <span>{trainer.experienceYears} سنوات خبرة</span>
                    </span>

                    <Link
                      to="/trainers"
                      className="text-xs font-black text-[#D97241] hover:underline inline-flex items-center gap-1"
                    >
                      <span>عرض الملف</span>
                      <ArrowLeft className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/trainers"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white hover:bg-[#FAF8F5] text-[#1F2722] font-bold text-xs sm:text-sm border border-[#EAE5DA] shadow-sm transition-all"
            >
              <span>تصفح دليل الكباتن الكامل في ساحل حضرموت</span>
              <ArrowLeft className="w-4 h-4 text-[#D97241]" />
            </Link>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════
          7. PRICING & SUBSCRIPTION PACKAGES (NEW — Flavoria Comparison Cards)
      ═══════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        
        <div className="text-center space-y-3 mb-12 sm:mb-14">
          <span className="inline-block text-xs font-black tracking-[0.2em] uppercase text-[#D97241]">
            باقات مرنة ومباشرة
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1F2722] tracking-tight">
            باقات واشتراكات الصالات الرياضية
          </h2>
          <p className="text-xs sm:text-sm text-[#7D9683] max-w-xl mx-auto font-medium">
            خيارات اشتراك رسمية معتمدة بالريال اليمني، مصممة لتناسب جدولك وأهدافك البدنية
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PRICING_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                pkg.isPopular
                  ? 'bg-[#1F2722] text-white shadow-2xl scale-100 md:-translate-y-2 border-2 border-[#D97241]'
                  : 'bg-white text-[#1F2722] border border-[#EAE5DA] shadow-sm hover:border-[#D97241]'
              }`}
            >
              {pkg.isPopular && pkg.badge && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#D97241] text-white text-[11px] font-black px-4 py-1 rounded-full shadow-md">
                  {pkg.badge}
                </span>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className={`text-xl font-black ${pkg.isPopular ? 'text-white' : 'text-[#1F2722]'}`}>
                    {pkg.name}
                  </h3>
                  <p className={`text-xs mt-1 leading-relaxed ${pkg.isPopular ? 'text-white/70' : 'text-[#7D9683]'}`}>
                    {pkg.tagline}
                  </p>
                </div>

                <div className="py-4 border-y border-dashed border-[#EAE5DA]/30">
                  <div className="flex items-baseline gap-1.5">
                    <span className={`text-3xl sm:text-4xl font-black font-mono ${pkg.isPopular ? 'text-[#D97241]' : 'text-[#D97241]'}`}>
                      {pkg.priceYer.toLocaleString()}
                    </span>
                    <span className={`text-xs font-bold ${pkg.isPopular ? 'text-white/80' : 'text-[#7D9683]'}`}>
                      ر.ي / {pkg.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 pt-2">
                  {pkg.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs font-medium leading-relaxed">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${pkg.isPopular ? 'text-[#D97241]' : 'text-emerald-600'}`} />
                      <span className={pkg.isPopular ? 'text-white/90' : 'text-[#536559]'}>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  to={pkg.buttonLink}
                  className={`w-full py-3.5 rounded-2xl font-black text-xs sm:text-sm text-center block transition-all shadow-md ${
                    pkg.isPopular
                      ? 'bg-[#D97241] hover:bg-[#C75F2F] text-white hover:scale-[1.02] shadow-[#D97241]/25'
                      : 'bg-[#FAF8F5] hover:bg-[#1F2722] text-[#1F2722] hover:text-white border border-[#EAE5DA]'
                  }`}
                >
                  {pkg.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ═══════════════════════════════════════════
          8. COASTAL NUTRITION SECTION — وجبات ساحلية نوصي بها
      ═══════════════════════════════════════════ */}
      <section className="bg-[#FAF8F5] border-y border-[#F0EBE3] py-14 sm:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center space-y-3">
            <span className="inline-block text-xs font-black tracking-[0.2em] uppercase text-[#D97241]">
              تغذية رياضية متوازنة
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1F2722] tracking-tight">
              وجبات ساحلية نوصي بتجربتها
            </h2>
            <p className="text-xs sm:text-sm text-[#7D9683] max-w-xl mx-auto font-medium">
              أطباق محسوبة السعرات والماكروز تعتمد على صيد بحر المكلا الطازج والمكونات الصحية الطبيعية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedMeals.map((meal) => (
              <div
                key={meal.id}
                className="group bg-white rounded-3xl border border-[#EAE5DA] hover:border-[#D97241] shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_16px_36px_-10px_rgba(217,114,65,0.18)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                <Link to={`/meals/${meal.id}`} className="block relative aspect-video bg-[#EDE8DF] overflow-hidden">
                  <img
                    src={meal.imageUrl}
                    alt={meal.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-[#D97241]" />
                    <span className="text-xs font-black text-[#D97241] font-mono">{meal.calories}</span>
                    <span className="text-[10px] text-[#7D9683] font-bold">سعرة</span>
                  </div>
                </Link>

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

                  <div className="pt-3 border-t border-[#F0EBE3] flex items-center justify-between">
                    <span className="text-xs font-bold text-[#7D9683]">وصفة متوازنة</span>
                    <Link
                      to={`/meals/${meal.id}`}
                      className="w-8 h-8 rounded-full bg-[#FAF8F5] hover:bg-[#D97241] text-[#1F2722] hover:text-white flex items-center justify-center border border-[#EAE5DA] hover:border-[#D97241] transition-all shadow-sm"
                      title="تفاصيل الوجبة"
                    >
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <Link
              to="/meals"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#1F2722] hover:bg-[#D97241] text-white font-black text-xs sm:text-sm shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 group"
            >
              <span>تصفح كافة الوجبات الصحية</span>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
            </Link>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════
          9. PROMOTIONAL CTA BANNER (Flavoria Special Offer Style)
      ═══════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="rounded-3xl overflow-hidden shadow-[0_20px_50px_-15px_rgba(217,114,65,0.2)] bg-gradient-to-r from-[#D97241] via-[#E07C4C] to-[#C75F2F] text-white p-7 sm:p-12 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">

            <div className="lg:col-span-5 flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0">
                <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-white animate-pulse" />
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-white/80 block">
                  انضم إلى مجتمع عزم • JOIN AZM COMMUNITY
                </span>
                <h3 className="text-2xl sm:text-3xl font-black leading-tight">
                  ابدأ رحلتك الرياضية<br />
                  <span className="text-[#1F2722]">واحسب سعراتك بدقة اليوم!</span>
                </h3>
              </div>
            </div>

            <div className="lg:col-span-4 border-y lg:border-y-0 lg:border-x border-white/20 py-4 lg:py-0 lg:px-6 flex flex-col justify-center">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black font-mono text-white">20%</span>
                <span className="text-sm sm:text-base font-bold text-white/90">خصم ترويجي على أول اشتراك</span>
              </div>
              <div className="mt-2 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#1F2722] text-white text-xs font-mono font-bold w-fit shadow-inner">
                <span className="text-[#D97241]">كود عزم:</span>
                <span className="tracking-widest">AZM2026</span>
              </div>
            </div>

            <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Link
                to="/calculator"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#1F2722] hover:bg-black text-white font-black text-sm shadow-xl hover:scale-105 active:scale-95 transition-all text-center"
              >
                <Calculator className="w-4 h-4 text-[#D97241]" />
                <span>احسب سعراتك الآن</span>
              </Link>
              <Link
                to="/gyms"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-white/20 hover:bg-white/30 text-white font-bold text-sm backdrop-blur-md transition-all text-center border border-white/30"
              >
                <span>استكشف الصالات المعتمدة</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          10. SERVICE GUARANTEES STRIP
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
