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
  UtensilsCrossed
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

export const LandingPage: React.FC = () => {
  const [subscribedEmail, setSubscribedEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  /* Featured data */
  const popularGyms = MUKALLA_GYMS.slice(0, 4);
  const recommendedMeals = MEALS_DATA.slice(0, 3);

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
    <div className="bg-white text-[#1F2722] font-['Cairo',sans-serif]" dir="rtl">

      {/* ═══════════════════════════════════════════
          1. HERO SECTION (Carousel)
      ═══════════════════════════════════════════ */}
      <HeroSection />


      {/* ═══════════════════════════════════════════
          2. TRUST BADGES STRIP (4 items with dividers)
          Matches: "Clean Ingredients | Clinically Proven | Cruelty Free | Sustainable Beauty"
      ═══════════════════════════════════════════ */}
      <section className="border-y border-[#F0EBE3] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-x-reverse divide-[#F0EBE3]">

            {/* Badge 1 */}
            <div className="flex flex-col items-center text-center md:px-6 gap-2">
              <div className="w-11 h-11 rounded-full bg-[#F4F7F5] text-[#7D9683] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-black text-[#1F2722]">صالات معتمدة</p>
                <p className="text-[11px] text-[#7D9683] font-medium">فحص وتوثيق ميداني</p>
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
                <p className="text-sm font-black text-[#1F2722]">مكونات طبيعية</p>
                <p className="text-[11px] text-[#7D9683] font-medium">وجبات ساحلية طازجة</p>
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
          Matches: 6 circular category images with labels
      ═══════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h2 className="text-xl sm:text-2xl font-black text-[#1F2722] text-center tracking-wide uppercase mb-10">
          تصفح حسب الفئة
        </h2>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 sm:gap-8">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.label}
              to={cat.path}
              className="group flex flex-col items-center gap-3 text-center"
            >
              {/* Circular Image */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden ring-2 ring-[#F0EBE3] group-hover:ring-[#D97241] transition-all shadow-md group-hover:shadow-lg group-hover:-translate-y-1 duration-300">
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              {/* Label */}
              <span className="text-xs sm:text-sm font-bold text-[#1F2722] group-hover:text-[#D97241] transition-colors uppercase">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </section>


      {/* ═══════════════════════════════════════════
          4. PROMOTIONAL BANNER (Split Layout)
          Matches: "LIMITED TIME OFFER - Up to 30% Off..."
      ═══════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Left (in RTL → appears on right visually): Dark content */}
            <div className="bg-[#1F2722] text-white p-8 sm:p-10 lg:p-12 flex flex-col justify-center space-y-4">
              <span className="text-[11px] font-bold text-[#D97241] tracking-widest uppercase">
                ميزة حصرية
              </span>
              <h3 className="text-3xl sm:text-4xl lg:text-[42px] font-black leading-tight">
                احسب سعراتك<br />
                <span className="text-[#D97241]">مجاناً بدقة علمية</span>
              </h3>
              <p className="text-sm text-white/70 leading-relaxed max-w-sm font-medium">
                احسب احتياجك اليومي الفعلي من السعرات، البروتين، والماء وفق معادلة ميفلين-سانت جور مع مراعاة مناخ المكلا.
              </p>
              <div className="pt-2">
                <Link
                  to="/calculator"
                  className="inline-flex items-center px-6 py-3 rounded-lg border-2 border-white text-white font-bold text-sm hover:bg-white hover:text-[#1F2722] transition-all uppercase tracking-wide"
                >
                  ابدأ الحساب الآن
                </Link>
              </div>
            </div>

            {/* Right (in RTL → appears on left visually): Image */}
            <div className="relative bg-[#EDE8DF] min-h-[280px] lg:min-h-0">
              <img
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80"
                alt="التدريب والتغذية الصحية"
                className="w-full h-full object-cover"
              />
            </div>

          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════
          5. BEST SELLERS → "الأكثر إقبالاً"
          Matches: Product cards with image, heart, name, price, rating, CTA
      ═══════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl sm:text-2xl font-black text-[#1F2722] tracking-wide uppercase">
            الأكثر إقبالاً
          </h2>
          <Link
            to="/gyms"
            className="text-xs sm:text-sm font-bold text-[#D97241] hover:text-[#C75F2F] transition-colors flex items-center gap-1 uppercase"
          >
            <span>عرض الكل</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {popularGyms.map((gym) => (
            <Link
              key={gym.id}
              to={`/gyms/${gym.slug}`}
              className="group bg-white rounded-2xl border border-[#F0EBE3] hover:border-[#D97241]/30 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Card Image */}
              <div className="relative aspect-square bg-[#FAF8F5] overflow-hidden">
                <img
                  src={gym.coverImage}
                  alt={gym.nameAr}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Heart Icon */}
                <button
                  onClick={(e) => e.preventDefault()}
                  className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-[#C8BEAA] hover:text-red-400 transition-colors shadow-sm"
                >
                  <Heart className="w-4 h-4" />
                </button>
              </div>

              {/* Card Body */}
              <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2">
                {/* Gym Name */}
                <h4 className="font-bold text-sm text-[#1F2722] leading-snug line-clamp-2 group-hover:text-[#D97241] transition-colors">
                  {gym.nameAr}
                </h4>

                {/* Location */}
                <p className="text-[11px] text-[#7D9683] font-medium flex items-center gap-1">
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span>{gym.neighborhood}</span>
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-1.5">
                  <span className="text-base font-black text-[#D97241]">
                    {gym.pricingPlans[0]?.priceYer.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-[#7D9683] font-bold">ر.ي / شهر</span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-3 h-3 ${s <= 4 ? 'text-amber-400 fill-amber-400' : 'text-[#DED7C8]'}`}
                    />
                  ))}
                  <span className="text-[10px] text-[#7D9683] font-medium mr-1">(4.0)</span>
                </div>

                {/* CTA Button */}
                <div className="pt-1">
                  <span className="block w-full text-center py-2 rounded-lg border border-[#D97241] text-[#D97241] text-xs font-bold group-hover:bg-[#D97241] group-hover:text-white transition-colors uppercase">
                    عرض التفاصيل
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>


      {/* ═══════════════════════════════════════════
          6. RECOMMENDED MEALS SECTION
          "✦ نوصي بتجربته ✦" → Horizontal Meal Cards
      ═══════════════════════════════════════════ */}
      <section className="bg-[#FAF8F5] border-y border-[#F0EBE3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-black text-[#1F2722] tracking-wide uppercase">
              وجبات نوصي بتجربتها
            </h2>
            <Link
              to="/meals"
              className="text-xs sm:text-sm font-bold text-[#D97241] hover:text-[#C75F2F] transition-colors flex items-center gap-1 uppercase"
            >
              <span>عرض الكل</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

          {/* Meal Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {recommendedMeals.map((meal) => (
              <Link
                key={meal.id}
                to={`/meals/${meal.id}`}
                className="group bg-white rounded-2xl border border-[#F0EBE3] hover:border-[#D97241]/30 hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                {/* Meal Image */}
                <div className="relative aspect-video bg-[#EDE8DF] overflow-hidden">
                  <img
                    src={meal.imageUrl}
                    alt={meal.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Heart */}
                  <button
                    onClick={(e) => e.preventDefault()}
                    className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-[#C8BEAA] hover:text-red-400 transition-colors shadow-sm"
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                  {/* Calorie Badge */}
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg shadow-sm">
                    <span className="text-xs font-black text-[#D97241]">{meal.calories}</span>
                    <span className="text-[10px] text-[#7D9683] mr-1 font-bold">سعرة</span>
                  </div>
                </div>

                {/* Meal Body */}
                <div className="p-4 space-y-2">
                  <h4 className="font-bold text-sm text-[#1F2722] leading-snug line-clamp-2 group-hover:text-[#D97241] transition-colors">
                    {meal.title}
                  </h4>
                  <p className="text-[11px] text-[#536559] line-clamp-2 leading-relaxed">
                    {meal.description}
                  </p>
                  {/* Macros Row */}
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-[10px] font-bold text-[#7D9683] bg-[#F4F7F5] px-2 py-0.5 rounded-full">
                      {meal.protein}g بروتين
                    </span>
                    <span className="text-[10px] font-bold text-[#7D9683] bg-[#F4F7F5] px-2 py-0.5 rounded-full">
                      {meal.carbs}g كربوهيدرات
                    </span>
                    <span className="text-[10px] font-bold text-[#7D9683] bg-[#F4F7F5] px-2 py-0.5 rounded-full">
                      {meal.fats}g دهون
                    </span>
                  </div>
                  {/* CTA */}
                  <div className="pt-2">
                    <span className="block w-full text-center py-2 rounded-lg border border-[#D97241] text-[#D97241] text-xs font-bold group-hover:bg-[#D97241] group-hover:text-white transition-colors uppercase">
                      عرض الوصفة
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
          Matches: "Free Shipping | Easy Returns | Secure Payment | 24/7 Support"
      ═══════════════════════════════════════════ */}
      <section className="border-b border-[#F0EBE3] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-x-reverse divide-[#F0EBE3]">

            <div className="flex flex-col items-center text-center md:px-6 gap-2">
              <Truck className="w-6 h-6 text-[#1F2722]" />
              <p className="text-sm font-black text-[#1F2722]">اشتراك فوري</p>
              <p className="text-[11px] text-[#7D9683] font-medium">تفعيل مباشر بدون انتظار</p>
            </div>

            <div className="flex flex-col items-center text-center md:px-6 gap-2">
              <RefreshCw className="w-6 h-6 text-[#1F2722]" />
              <p className="text-sm font-black text-[#1F2722]">مرونة في الباقات</p>
              <p className="text-[11px] text-[#7D9683] font-medium">خيارات شهرية وسنوية</p>
            </div>

            <div className="flex flex-col items-center text-center md:px-6 gap-2">
              <Shield className="w-6 h-6 text-[#1F2722]" />
              <p className="text-sm font-black text-[#1F2722]">بيانات آمنة</p>
              <p className="text-[11px] text-[#7D9683] font-medium">حماية كاملة لمعلوماتك</p>
            </div>

            <div className="flex flex-col items-center text-center md:px-6 gap-2">
              <Headphones className="w-6 h-6 text-[#1F2722]" />
              <p className="text-sm font-black text-[#1F2722]">دعم متواصل</p>
              <p className="text-[11px] text-[#7D9683] font-medium">نحن هنا لمساعدتك</p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
