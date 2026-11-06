import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { storageService } from '../services/storageService';
import { SubscriptionRequest, NutritionPlan } from '../types';
import {
  LayoutDashboard,
  CalendarCheck,
  Flame,
  Dumbbell,
  Salad,
  User,
  ArrowRight,
  Clock,
  CheckCircle,
  PlusCircle,
  ShieldCheck
} from 'lucide-react';

export const UserDashboardPage: React.FC = () => {
  const { user, loginAsDemo } = useAuth();
  const [subscriptions, setSubscriptions] = useState<SubscriptionRequest[]>([]);
  const [savedPlan, setSavedPlan] = useState<NutritionPlan | null>(null);

  const loadData = () => {
    if (user) {
      setSubscriptions(storageService.getUserSubscriptions(user.id));
      setSavedPlan(storageService.getSavedNutritionPlan());
    }
  };

  useEffect(() => {
    loadData();
    window.addEventListener('azm_storage_update', loadData);
    return () => window.removeEventListener('azm_storage_update', loadData);
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-sand-100 text-terracotta-600 flex items-center justify-center mx-auto">
          <LayoutDashboard className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-forest-900">لوحة تحكم المستخدم</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          يرجى تسجيل الدخول للوصول إلى لوحة التحكم الخاصة بك ومتابعة اشتراكاتك وأهدافك البدنية في المكلا.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Link
            to="/login"
            className="px-6 py-2.5 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold text-xs shadow-md shadow-terracotta-500/20"
          >
            تسجيل الدخول
          </Link>
          <button
            onClick={() => loginAsDemo('trainee')}
            className="px-6 py-2.5 rounded-xl bg-sand-100 text-forest-900 font-bold text-xs hover:bg-sand-200 transition-colors"
          >
            دخول فوري كمتدرب تجريبي
          </button>
        </div>
      </div>
    );
  }

  const activeSub = subscriptions.find((s) => s.status === 'confirmed' || s.status === 'active') || subscriptions[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-forest-900 via-forest-800 to-forest-950 text-white rounded-3xl p-6 sm:p-8 md:p-10 relative overflow-hidden shadow-xl border border-forest-800/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute top-0 left-0 w-80 h-80 bg-terracotta-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center gap-4 relative z-10">
          <img
            src={user.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
            alt={user.name}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover ring-2 ring-terracotta-400/50 shadow-md shrink-0"
          />
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black">أهلاً بك، {user.name}</h1>
            <p className="text-xs sm:text-sm text-sand-300">
              عضو منصة عزم • {user.city} ({user.neighborhood})
            </p>
          </div>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 sm:gap-3 w-full sm:w-auto relative z-10">
          <Link
            to="/profile"
            className="flex-1 sm:flex-none justify-center px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all flex items-center gap-1.5 min-h-[44px]"
          >
            <User className="w-4 h-4" />
            <span>تعديل الملف</span>
          </Link>
          <Link
            to="/gyms"
            className="flex-1 sm:flex-none justify-center px-5 py-2.5 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white text-xs font-bold shadow-md shadow-terracotta-500/25 transition-all flex items-center gap-1.5 min-h-[44px]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>اشتراك نادي جديد</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Active Gym */}
        <div className="bg-white p-6 rounded-3xl border border-sand-200 shadow-sm flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">الصالة الحالية</span>
            <div className="w-9 h-9 rounded-xl bg-sand-100 text-forest-800 flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-terracotta-500" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-black text-forest-900">
              {activeSub ? activeSub.gymName : 'لا يوجد اشتراك نشط'}
            </h3>
            <span className="text-xs text-sage-700 font-bold block mt-0.5">
              {activeSub ? activeSub.planName : 'تصفح الصالات واشترك الآن'}
            </span>
          </div>
          <Link to="/my-orders" className="text-xs font-bold text-terracotta-600 hover:underline flex items-center gap-1 pt-1">
            <span>تفاصيل الاشتراكات</span>
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
          </Link>
        </div>

        {/* Calorie Goal */}
        <div className="bg-white p-6 rounded-3xl border border-sand-200 shadow-sm flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">الهدف اليومي للسعرات</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center ring-4 ring-amber-50/70">
              <Flame className="w-5 h-5 fill-amber-500/20" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-amber-600 font-mono flex items-center gap-1">
              <span>{user.targetCalories || 2450}</span>
              <span className="text-xs text-amber-700/80 font-bold font-sans">سعرة</span>
            </h3>
            <span className="text-xs text-slate-500 block mt-0.5">سعرة حرارية موصى بها يومياً</span>
          </div>
          <Link to="/calculator" className="text-xs font-bold text-amber-600 hover:text-amber-700 hover:underline flex items-center gap-1 pt-1">
            <span>إعادة الحساب</span>
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
          </Link>
        </div>

        {/* Current Body Weight */}
        <div className="bg-white p-6 rounded-3xl border border-sand-200 shadow-sm flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">الوزن المسجل</span>
            <div className="w-9 h-9 rounded-xl bg-sage-50 text-sage-600 flex items-center justify-center">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-forest-900 font-mono">
              {user.weight || 74} <span className="text-sm font-sans font-normal text-slate-500">كجم</span>
            </h3>
            <span className="text-xs text-slate-500 block mt-0.5">
              الطول: {user.height || 175} سم
            </span>
          </div>
          <Link to="/profile" className="text-xs font-bold text-terracotta-600 hover:underline flex items-center gap-1 pt-1">
            <span>تحديث القياسات</span>
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
          </Link>
        </div>

        {/* Orders Count */}
        <div className="bg-white p-6 rounded-3xl border border-sand-200 shadow-sm flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">سجل الطلبات</span>
            <div className="w-9 h-9 rounded-xl bg-sand-100 text-forest-800 flex items-center justify-center">
              <CalendarCheck className="w-5 h-5 text-terracotta-500" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-forest-900 font-mono">
              {subscriptions.length}
            </h3>
            <span className="text-xs text-slate-500 block mt-0.5">اشتراكات وحجوزات مسجلة</span>
          </div>
          <Link to="/my-orders" className="text-xs font-bold text-terracotta-600 hover:underline flex items-center gap-1 pt-1">
            <span>سجل طلباتي</span>
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
          </Link>
        </div>
      </div>

      {/* Active Subscriptions Details Table */}
      <div className="bg-white p-5 sm:p-8 rounded-3xl border border-sand-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-sand-100 pb-4 gap-2">
          <h2 className="text-base sm:text-lg font-bold text-forest-900 flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-terracotta-500 shrink-0" />
            <span>حجوزاتي واشتراكاتي الحالية في نوادي المكلا</span>
          </h2>
          <Link to="/my-orders" className="text-xs font-bold text-terracotta-600 hover:underline">
            عرض الأرشيف الكامل
          </Link>
        </div>

        {subscriptions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-right text-xs">
              <thead>
                <tr className="border-b border-sand-100 text-slate-400">
                  <th className="py-3">رقم الطلب</th>
                  <th className="py-3">اسم الصالة</th>
                  <th className="py-3">الباقة</th>
                  <th className="py-3">المبلغ</th>
                  <th className="py-3">الفترة</th>
                  <th className="py-3">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-100 text-slate-700">
                {subscriptions.slice(0, 3).map((sub) => (
                  <tr key={sub.id}>
                    <td className="py-3 font-mono font-bold text-forest-900">{sub.id}</td>
                    <td className="py-3 font-bold text-forest-900">{sub.gymName}</td>
                    <td className="py-3">{sub.planName}</td>
                    <td className="py-3 font-mono font-bold text-terracotta-600">{sub.priceYer.toLocaleString()} ر.ي</td>
                    <td className="py-3">{sub.preferredShift === 'morning' ? 'صباحي' : 'مسائي'}</td>
                    <td className="py-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        sub.status === 'confirmed' || sub.status === 'active'
                          ? 'bg-sage-50 text-sage-800 border border-sage-200'
                          : sub.status === 'pending'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-sand-100 text-slate-700'
                      }`}>
                        {sub.status === 'confirmed' ? 'مؤكد ونشط' : sub.status === 'pending' ? 'قيد المراجعة' : sub.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500 space-y-2">
            <p className="text-sm">لم تقم بالاشتراك في أي صالة بالمكلا بعد.</p>
            <Link to="/gyms" className="text-xs font-bold text-terracotta-600 hover:underline inline-block">
              تصفح نوادي المكلا واختر صالتك
            </Link>
          </div>
        )}
      </div>

      {/* Saved Nutrition Plan Overview */}
      {savedPlan && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-sand-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-sand-100 pb-4">
            <h2 className="text-lg font-bold text-forest-900 flex items-center gap-2">
              <Salad className="w-5 h-5 text-sage-600" />
              <span>الخطة الغذائية المحفوظة: {savedPlan.title}</span>
            </h2>
            <Link to="/nutrition-plan" className="text-xs font-bold text-terracotta-600 hover:underline">
              فتح الخطة الكاملة
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
            <div className="bg-amber-50/50 p-3 rounded-2xl border border-amber-200/50">
              <span className="text-amber-800 font-bold block mb-0.5">السعرات</span>
              <span className="font-black text-amber-600 text-sm font-mono">{savedPlan.totalCalories}</span>
            </div>
            <div className="bg-sage-50/70 p-3 rounded-2xl border border-sage-200/50">
              <span className="text-sage-800 font-bold block mb-0.5">بروتين</span>
              <span className="font-black text-sage-700 text-sm font-mono">{savedPlan.proteinGrams}g</span>
            </div>
            <div className="bg-sand-100/70 p-3 rounded-2xl border border-sand-200">
              <span className="text-forest-800 font-bold block mb-0.5">كارب</span>
              <span className="font-black text-forest-700 text-sm font-mono">{savedPlan.carbsGrams}g</span>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-sand-200">
              <span className="text-slate-500 block mb-0.5">شرب الماء</span>
              <span className="font-black text-sky-600 text-sm font-mono">{savedPlan.waterLiters}L</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
