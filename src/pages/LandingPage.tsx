import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MUKALLA_GYMS } from '../data/mukallaGymsData';
import { MEALS_DATA } from '../data/mealsData';
import { GymCard } from '../components/gyms/GymCard';
import { MealCard } from '../components/nutrition/MealCard';
import {
  Dumbbell,
  Compass,
  Calculator,
  Salad,
  ShieldCheck,
  ChevronLeft,
  Flame,
  Award,
  Users2,
  CalendarCheck,
  Building2,
  Search,
  MapPin,
  Clock,
  ArrowRight,
  Phone
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  // Search & Filter State in Hero
  const [heroSearch, setHeroSearch] = useState('');
  const [heroNeighborhood, setHeroNeighborhood] = useState('all');
  const [heroCategory, setHeroCategory] = useState<'gyms' | 'trainers' | 'meals'>('gyms');

  // Interactive Gym Showcase index in Hero
  const [activeGymIndex, setActiveGymIndex] = useState(0);
  const activeShowcaseGym = MUKALLA_GYMS[activeGymIndex] || MUKALLA_GYMS[0];

  const featuredGyms = MUKALLA_GYMS.slice(0, 3);
  const featuredMeals = MEALS_DATA.slice(0, 3);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroCategory === 'trainers') {
      navigate('/trainers');
      return;
    }
    if (heroCategory === 'meals') {
      navigate('/meals');
      return;
    }
    const params = new URLSearchParams();
    if (heroSearch) params.set('q', heroSearch);
    if (heroNeighborhood !== 'all') params.set('neighborhood', heroNeighborhood);
    navigate(`/gyms?${params.toString()}`);
  };

  return (
    <div className="space-y-10 sm:space-y-16 pb-16">
      {/* Compact High-Impact Hero Section */}
      <section className="relative overflow-hidden bg-[#080d1a] text-white border-b border-slate-800/80 pt-5 pb-8 sm:pt-8 sm:pb-12">
        {/* Ambient Subtle Gradients */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[350px] bg-brand-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[400px] h-[300px] bg-brand-green-500/15 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Right Column: Punchy Headline & Direct Discovery (RTL) */}
            <div className="lg:col-span-7 space-y-4 text-right">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-500/15 border border-brand-blue-400/30 text-brand-blue-300 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-brand-green-400 animate-pulse" />
                <span>المنصة الرياضية المعتمدة في المكلا • ساحل حضرموت</span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.25] text-white">
                وجهتك الرياضية الأولى <br />
                <span className="bg-gradient-to-l from-brand-blue-400 via-sky-300 to-brand-green-400 bg-clip-text text-transparent">
                  للياقة والتغذية الصحية
                </span>{' '}
                في المكلا
              </h1>

              {/* Concise Description */}
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                استكشف نوادي المكلا المعتمدة في <strong className="text-white">الشرج، فوة المتضررين، والديس</strong>. احجز اشتراكك مباشرة، واستفد من حاسبة السعرات الدقيقة والوجبات الصحية.
              </p>

              {/* World-Class Floating Discovery Bar */}
              <div className="pt-1">
                <form
                  onSubmit={handleHeroSearch}
                  className="bg-white/95 backdrop-blur-md p-2 rounded-2xl sm:rounded-3xl shadow-xl border border-white/20 text-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
                >
                  {/* Category Selector */}
                  <select
                    value={heroCategory}
                    onChange={(e) => setHeroCategory(e.target.value as any)}
                    className="w-full sm:w-auto px-3 py-2.5 rounded-xl bg-slate-100 font-bold text-xs text-slate-700 border-0 focus:ring-2 focus:ring-brand-blue-500 outline-none cursor-pointer"
                  >
                    <option value="gyms">صالات رياضية</option>
                    <option value="trainers">كباتن ومدربون</option>
                    <option value="meals">وجبات صحية</option>
                  </select>

                  {/* Neighborhood Selector */}
                  <select
                    value={heroNeighborhood}
                    onChange={(e) => setHeroNeighborhood(e.target.value)}
                    className="w-full sm:w-auto px-3 py-2.5 rounded-xl bg-slate-100 font-bold text-xs text-slate-700 border-0 focus:ring-2 focus:ring-brand-blue-500 outline-none cursor-pointer"
                  >
                    <option value="all">جميع أحياء المكلا</option>
                    <option value="الشرج">حي الشرج</option>
                    <option value="فوة المتضررين">فوة المتضررين</option>
                    <option value="ديس المكلا">ديس المكلا</option>
                  </select>

                  {/* Search Query Input */}
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={heroSearch}
                      onChange={(e) => setHeroSearch(e.target.value)}
                      placeholder="ابحث باسم الصالة أو الميزة..."
                      className="w-full pl-3 pr-8 py-2.5 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
                    />
                    <Search className="w-4 h-4 text-slate-400 absolute right-2 top-3" />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-brand-blue-600 hover:bg-brand-blue-700 text-white font-bold text-xs shadow-md shadow-brand-blue-600/30 active:scale-95 transition-all flex items-center justify-center gap-1.5 shrink-0"
                  >
                    <span>استكشف الآن</span>
                    <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                  </button>
                </form>

                {/* Quick-Tap Verified Mukalla Chips */}
                <div className="flex flex-wrap items-center gap-1.5 pt-3">
                  <span className="text-[11px] text-slate-400 font-bold w-full sm:w-auto">الوصول السريع:</span>
                  <button
                    type="button"
                    onClick={() => {
                      setHeroNeighborhood('فوة المتضررين');
                      navigate('/gyms?neighborhood=فوة المتضررين');
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-[11px] text-slate-300 hover:text-white border border-slate-700 transition-colors"
                  >
                    📍 فوة: سمارت جيم
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setHeroNeighborhood('الشرج');
                      navigate('/gyms?neighborhood=الشرج');
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-[11px] text-slate-300 hover:text-white border border-slate-700 transition-colors"
                  >
                    📍 الشرج: قولدن جيم
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setHeroNeighborhood('الشرج');
                      navigate('/gyms/winner-gym');
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-[11px] text-slate-300 hover:text-white border border-slate-700 transition-colors"
                  >
                    📍 مارينا: وينر جيم
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setHeroNeighborhood('الشرج');
                      navigate('/gyms/mukalla-gym');
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-[11px] text-slate-300 hover:text-white border border-slate-700 transition-colors"
                  >
                    📍 ميرال: المكلا جيم
                  </button>
                </div>
              </div>

              {/* Quick Pillars Strip */}
              <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 text-slate-300">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-brand-blue-400 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-white block">5 صالات حقيقية</span>
                    <span className="text-[10px] text-slate-400">معاينة وموثقة بالمكلا</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-brand-green-400 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-white block">حاسبة السعرات</span>
                    <span className="text-[10px] text-slate-400">بدقة ميفلين-سانت جور</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Salad className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-white block">تغذية ساحلية</span>
                    <span className="text-[10px] text-slate-400">بأسماك بحر المكلا</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Left Column: Interactive Gym Hub Showcase Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl bg-slate-900/90 border border-slate-700/80 p-5 shadow-2xl backdrop-blur-md space-y-4">
                {/* Gym Selector Tabs */}
                <div className="flex items-center gap-1 overflow-x-auto pb-1 border-b border-slate-800">
                  {MUKALLA_GYMS.map((gym, idx) => (
                    <button
                      key={gym.id}
                      onClick={() => setActiveGymIndex(idx)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                        activeGymIndex === idx
                          ? 'bg-brand-blue-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                      }`}
                    >
                      {gym.nameAr.split('(')[0].trim()}
                    </button>
                  ))}
                </div>

                {/* Active Gym Preview */}
                <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-800 group">
                  <img
                    src={activeShowcaseGym.coverImage}
                    alt={activeShowcaseGym.nameAr}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-black/20 to-transparent flex flex-col justify-end p-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-brand-green-500/90 text-white text-[10px] font-bold">
                        صالة موثقة ✓
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-black/60 text-slate-200 text-[10px] font-bold backdrop-blur-sm">
                        المكلا - {activeShowcaseGym.neighborhood}
                      </span>
                    </div>
                    <h3 className="text-white font-black text-base sm:text-lg">
                      {activeShowcaseGym.nameAr}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">
                      {activeShowcaseGym.addressText}
                    </p>
                  </div>
                </div>

                {/* Mini Features & Direct Action */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <Phone className="w-3.5 h-3.5 text-brand-green-400" />
                    <span dir="ltr" className="font-mono text-[11px]">{activeShowcaseGym.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/gyms/${activeShowcaseGym.slug}`}
                      className="px-3 py-1.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-bold transition-colors"
                    >
                      التفاصيل
                    </Link>
                    <Link
                      to={`/gyms/${activeShowcaseGym.slug}/subscribe`}
                      className="px-4 py-1.5 rounded-xl bg-brand-blue-600 hover:bg-brand-blue-500 text-white text-xs font-bold shadow-md transition-all active:scale-95"
                    >
                      طلب اشتراك
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-black text-brand-blue-600 bg-brand-blue-50 px-3.5 py-1 rounded-full uppercase tracking-wider">
            منظومة عزم
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            خدمات صممت خصيصاً لمجتمع المكلا
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            الصالات، المدربين، والأدوات الغذائية في بيئة واحدة سهلة الاستخدام بدون تعقيد.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 space-y-3 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-brand-blue-50 text-brand-blue-600 flex items-center justify-center ring-8 ring-brand-blue-50/50">
              <Dumbbell className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">دليل نوادي المكلا</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              صالات الشرج، فوة المتضررين، والديس مع صور حقيقية ومواعيد العمل والباقات الرسمية.
            </p>
            <Link to="/gyms" className="inline-flex items-center gap-1 text-xs font-bold text-brand-blue-600 hover:text-brand-blue-700 pt-1">
              <span>تصفح الصالات</span>
              <ChevronLeft className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 space-y-3 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-brand-green-50 text-brand-green-600 flex items-center justify-center ring-8 ring-brand-green-50/50">
              <Calculator className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">حاسبة السعرات والمغذيات</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              احسب معدل الأيض الأساسي (BMR) واحتياجك من البروتين والماء مع مراعاة مناخ المكلا.
            </p>
            <Link to="/calculator" className="inline-flex items-center gap-1 text-xs font-bold text-brand-green-600 hover:text-brand-green-700 pt-1">
              <span>ابدأ الحساب الآن</span>
              <ChevronLeft className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 space-y-3 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center ring-8 ring-amber-50/50">
              <Salad className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">مكتبة الوجبات الصحية</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              وجبات رياضية غنية بالبروتين تعتمد على صيد المكلا الطازج من سمك الثمد والأغذية الصحية.
            </p>
            <Link to="/meals" className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-700 pt-1">
              <span>تصفح الوجبات</span>
              <ChevronLeft className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 space-y-3 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center ring-8 ring-sky-50/50">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">الاشتراكات المباشرة</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              اختر باقتك وسجل طلب اشتراكك مع خيارات الدفع نقداً بالصالة أو عبر الكريمي والعمقي.
            </p>
            <Link to="/gyms" className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 hover:text-sky-700 pt-1">
              <span>اختر صالتك</span>
              <ChevronLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Mukalla Gyms Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-brand-blue-600 mb-1">
              <Compass className="w-4 h-4" />
              <span>الصالات المعتمدة</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              أبرز صالات المكلا الرياضية
            </h2>
          </div>
          <Link
            to="/gyms"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-brand-blue-700 hover:text-brand-blue-800 transition-colors"
          >
            <span>مشاهدة كافة صالات المكلا</span>
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredGyms.map((gym) => (
            <GymCard key={gym.id} gym={gym} />
          ))}
        </div>
      </section>

      {/* Nutrition Section */}
      <section className="bg-slate-100/70 py-12 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-brand-green-600 mb-1">
                <Salad className="w-4 h-4" />
                <span>التغذية الساحلية السليمة</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                وجبات رياضية غنية بالبروتين
              </h2>
            </div>
            <Link
              to="/meals"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-brand-green-700 hover:text-brand-green-800 transition-colors"
            >
              <span>فتح مكتبة الوجبات الكاملة</span>
              <ChevronLeft className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredMeals.map((meal) => (
              <MealCard key={meal.id} meal={meal} />
            ))}
          </div>
        </div>
      </section>

      {/* Trainers & Coaches Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-brand-blue-900 via-brand-blue-800 to-brand-dark-900 text-white p-8 sm:p-10 shadow-xl border border-brand-blue-700/50 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="relative z-10 max-w-xl space-y-3 text-right">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-green-400 bg-brand-green-950/60 border border-brand-green-800/60 px-3 py-1 rounded-lg">
              شراكة مجتمعية في ساحل حضرموت
            </span>
            <h3 className="text-xl sm:text-2xl font-black leading-snug">
              هل أنت كابتن معتمد أو تدير صالة في المكلا؟
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              انضم إلى منصة عزم لتوثيق صالتك أو اعتماد ملفك التدريبي والوصول لمئات الرياضيين والمهتمين بالصحة في المكلا.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/trainers"
              className="px-6 py-3 rounded-xl bg-brand-green-500 hover:bg-brand-green-600 text-white font-bold text-xs shadow-md transition-all active:scale-95"
            >
              تسجيل كابتن معتمد
            </Link>
            <Link
              to="/register"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all"
            >
              انضمام منشأة رياضية
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
