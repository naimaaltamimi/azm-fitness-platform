import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { storageService } from '../services/storageService';
import { SubscriptionRequest, NutritionPlan, Gym, Trainer } from '../types';
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
  ShieldCheck,
  Building2,
  Users,
  DollarSign,
  AlertCircle,
  ExternalLink,
  Award,
  ChevronLeft
} from 'lucide-react';

export const UserDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState<SubscriptionRequest[]>([]);
  const [savedPlan, setSavedPlan] = useState<NutritionPlan | null>(null);
  const [myGym, setMyGym] = useState<Gym | null>(null);
  const [gymSubs, setGymSubs] = useState<SubscriptionRequest[]>([]);

  const loadData = () => {
    if (user) {
      if (user.role === 'gym_owner') {
        const gyms = storageService.getGyms();
        // Match gym by user name or default to first gym in Mukalla (e.g. smart-gym)
        const found = gyms.find((g) => g.nameAr.includes('سمارت') || g.id === 'smart-gym-mukalla') || gyms[0];
        setMyGym(found);
        if (found) {
          setGymSubs(storageService.getGymSubscriptions(found.id));
        }
      } else {
        setSubscriptions(storageService.getUserSubscriptions(user.id));
        setSavedPlan(storageService.getSavedNutritionPlan());
      }
    }
  };

  useEffect(() => {
    loadData();
    window.addEventListener('azm_storage_update', loadData);
    return () => window.removeEventListener('azm_storage_update', loadData);
  }, [user]);

  const handleUpdateGymSubStatus = (id: string, status: SubscriptionRequest['status']) => {
    storageService.updateSubscriptionStatus(id, status);
    loadData();
  };

  // 1. Visitor state (Not logged in) - Clean standard gate without demo buttons
  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-5 font-['Cairo',sans-serif]" dir="rtl">
        <div className="w-16 h-16 rounded-3xl bg-[#FAF8F5] border border-[#EAE5DA] text-[#D97241] flex items-center justify-center mx-auto shadow-sm">
          <LayoutDashboard className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-[#1F2722]">لوحة التحكم الموحدة</h2>
          <p className="text-xs sm:text-sm text-[#7D9683] leading-relaxed">
            يرجى تسجيل الدخول إلى حسابك للوصول إلى لوحة التحكم ومتابعة اشتراكاتك والخدمات الرياضية الخاصة بك في المكلا.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
          <Link
            to="/login"
            className="px-8 py-3 rounded-2xl bg-[#D97241] hover:bg-[#C75F2F] text-white font-bold text-xs shadow-lg shadow-[#D97241]/25 transition-all"
          >
            تسجيل الدخول
          </Link>
          <Link
            to="/register"
            className="px-6 py-3 rounded-2xl bg-white border border-[#EAE5DA] text-[#1F2722] font-bold text-xs hover:bg-[#FAF8F5] transition-all"
          >
            إنشاء حساب جديد
          </Link>
        </div>
      </div>
    );
  }

  // 2. GYM OWNER DASHBOARD VIEW
  if (user.role === 'gym_owner') {
    const pendingGymSubs = gymSubs.filter((s) => s.status === 'pending');
    const confirmedGymSubs = gymSubs.filter((s) => s.status === 'confirmed');
    const totalRevenue = confirmedGymSubs.reduce((acc, curr) => acc + (curr.priceYer || 0), 0);

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-['Cairo',sans-serif]" dir="rtl">
        {/* Banner for Gym Owner */}
        <div className="bg-[#1F2722] text-white rounded-3xl p-6 sm:p-8 md:p-10 relative overflow-hidden shadow-xl border border-[#2D3831] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-[#D97241]/20 border border-[#D97241]/40 flex items-center justify-center text-[#D97241] shrink-0">
              <Building2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-[#E49C7A] text-[10px] font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>لوحة صاحب الصالة المعتمدة</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black">{myGym?.nameAr || user.name}</h1>
              <p className="text-xs text-[#FAF8F5]/80">
                إدارة المشتركين وجداول المواعيد والتحصيلات في المكلا • {myGym?.neighborhood || 'ساحل حضرموت'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 relative z-10 w-full md:w-auto">
            {myGym && (
              <Link
                to={`/gyms/${myGym.slug || myGym.id}`}
                target="_blank"
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all flex items-center gap-1.5"
              >
                <ExternalLink className="w-4 h-4" />
                <span>معاينة صفحة الصالة</span>
              </Link>
            )}
            <Link
              to="/profile"
              className="px-4 py-2.5 rounded-xl bg-[#D97241] hover:bg-[#C75F2F] text-white text-xs font-bold shadow-md shadow-[#D97241]/25 transition-all flex items-center gap-1.5"
            >
              <User className="w-4 h-4" />
              <span>بيانات الحساب</span>
            </Link>
          </div>
        </div>

        {/* Gym Owner Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-6 rounded-3xl border border-[#EAE5DA] shadow-sm flex flex-col justify-between space-y-2">
            <span className="text-xs font-bold text-[#7D9683]">إجمالي طلبات المشتركين</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-[#1F2722] font-mono">{gymSubs.length}</span>
              <span className="text-xs text-slate-400 font-bold">طلب حجز</span>
            </div>
            <span className="text-[11px] text-slate-500">مسجلين عبر منصة عزم</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#EAE5DA] shadow-sm flex flex-col justify-between space-y-2">
            <span className="text-xs font-bold text-amber-700">طلبات بانتظار التأكيد</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-[#D9AD55] font-mono">{pendingGymSubs.length}</span>
              <span className="text-xs text-amber-600 font-bold">طلب جديد</span>
            </div>
            <span className="text-[11px] text-amber-600 font-medium">يتطلب التواصل وتأكيد الدفع</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#EAE5DA] shadow-sm flex flex-col justify-between space-y-2">
            <span className="text-xs font-bold text-[#7D9683]">الاشتراكات النشطة والمؤكدة</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-[#D97241] font-mono">{confirmedGymSubs.length}</span>
              <span className="text-xs text-[#7D9683] font-bold">مشترك نشط</span>
            </div>
            <span className="text-[11px] text-slate-500">يتدربون حالياً بالصالة</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#EAE5DA] shadow-sm flex flex-col justify-between space-y-2">
            <span className="text-xs font-bold text-[#7D9683]">إجمالي الدخل المحصل</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-[#1F2722] font-mono">{totalRevenue.toLocaleString()}</span>
              <span className="text-xs text-[#D97241] font-bold">ر.ي</span>
            </div>
            <span className="text-[11px] text-slate-500">من الاشتراكات المؤكدة</span>
          </div>
        </div>

        {/* Incoming Subscribers Table for Gym */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EAE5DA] shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#F0EBE3] pb-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#1F2722]">
                قائمة المشتركين في {myGym?.nameAr || 'صالتك'}
              </h2>
              <p className="text-xs text-[#7D9683] mt-0.5">
                يمكنك تأكيد الحجز بعد استلام الرسوم أو إلغاء الطلبات المتعثرة مباشرة
              </p>
            </div>
            <span className="text-xs font-bold bg-[#FAF8F5] text-[#1F2722] px-3 py-1 rounded-xl border border-[#EAE5DA]">
              {gymSubs.length} مشترك
            </span>
          </div>

          {gymSubs.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px] text-right text-xs">
                <thead>
                  <tr className="border-b border-[#F0EBE3] text-slate-400">
                    <th className="py-3 px-2">رقم الطلب</th>
                    <th className="py-3 px-2">اسم المتدرب</th>
                    <th className="py-3 px-2">الباقة</th>
                    <th className="py-3 px-2">الفترة</th>
                    <th className="py-3 px-2">المبلغ</th>
                    <th className="py-3 px-2">طريقة الدفع</th>
                    <th className="py-3 px-2">الحالة</th>
                    <th className="py-3 px-2 text-center">إجراءات التأكيد</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0EBE3] text-slate-700">
                  {gymSubs.map((sub) => (
                    <tr key={sub.id} className="hover:bg-[#FAF8F5] transition-colors">
                      <td className="py-3 px-2 font-mono font-bold text-[#D97241]">{sub.id}</td>
                      <td className="py-3 px-2 font-bold text-[#1F2722]">{sub.userName}</td>
                      <td className="py-3 px-2">{sub.planName}</td>
                      <td className="py-3 px-2">{sub.preferredShift === 'morning' ? 'صباحي' : 'مسائي'}</td>
                      <td className="py-3 px-2 font-mono font-bold text-slate-900">
                        {sub.priceYer.toLocaleString()} ر.ي
                      </td>
                      <td className="py-3 px-2">
                        {sub.paymentMethod === 'cash_at_gym'
                          ? 'نقداً بالصالة'
                          : sub.paymentMethod === 'kuraimi_exchange'
                            ? 'الكريمي'
                            : 'العمقي'}
                      </td>
                      <td className="py-3 px-2">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${sub.status === 'confirmed'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : sub.status === 'pending'
                                ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                : 'bg-red-50 text-red-700'
                            }`}
                        >
                          {sub.status === 'confirmed' ? 'مؤكد ونشط' : sub.status === 'pending' ? 'بانتظار التأكيد' : 'ملغي'}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {sub.status !== 'confirmed' && (
                            <button
                              onClick={() => handleUpdateGymSubStatus(sub.id, 'confirmed')}
                              className="px-2.5 py-1 rounded-lg bg-[#D97241] text-white hover:bg-[#C75F2F] text-[11px] font-bold transition-all shadow-sm"
                            >
                              تأكيد الاشتراك
                            </button>
                          )}
                          {sub.status !== 'cancelled' && (
                            <button
                              onClick={() => handleUpdateGymSubStatus(sub.id, 'cancelled')}
                              className="px-2 py-1 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 text-[11px] transition-colors"
                            >
                              إلغاء
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center py-8 text-xs text-slate-500">
              لم تسجل طلبات اشتراك جديدة لصالتك بعد. ستظهر هنا فور إرسالها من المتدربين.
            </p>
          )}
        </div>
      </div>
    );
  }

  // 3. TRAINER DASHBOARD VIEW
  if (user.role === 'trainer') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-['Cairo',sans-serif]" dir="rtl">
        <div className="bg-[#1F2722] text-white rounded-3xl p-6 sm:p-8 md:p-10 relative overflow-hidden shadow-xl border border-[#2D3831] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 relative z-10">
            <img
              src={user.avatarUrl || 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=300&q=80'}
              alt={user.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#D97241]/60 shadow-md shrink-0"
            />
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-[#E49C7A] text-[10px] font-bold">
                <Award className="w-3.5 h-3.5" />
                <span>كابتن ومدرب معتمد • منصة عزم</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black">{user.name}</h1>
              <p className="text-xs text-[#FAF8F5]/80">
                تدريب شخصي، جداول تغذية، وتأهيل بدني في صالات المكلا
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 relative z-10">
            <Link
              to="/trainers"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all flex items-center gap-1.5"
            >
              <Users className="w-4 h-4" />
              <span>دليل المدربين</span>
            </Link>
            <Link
              to="/profile"
              className="px-4 py-2.5 rounded-xl bg-[#D97241] hover:bg-[#C75F2F] text-white text-xs font-bold shadow-md shadow-[#D97241]/25 transition-all flex items-center gap-1.5"
            >
              <User className="w-4 h-4" />
              <span>تعديل السيرة الذاتية</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white p-6 rounded-3xl border border-[#EAE5DA] shadow-sm">
            <span className="text-xs font-bold text-[#7D9683] block mb-1">حالة الاعتماد</span>
            <span className="text-xl font-black text-emerald-700 flex items-center gap-1.5">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <span>ملف موثق رسمياً</span>
            </span>
            <span className="text-[11px] text-slate-400 block mt-1">يظهر للزوار في دليل المكلا</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#EAE5DA] shadow-sm">
            <span className="text-xs font-bold text-[#7D9683] block mb-1">جلسات التدريب الشخصي</span>
            <span className="text-xl font-black text-[#1F2722] font-mono">متاح للحجز</span>
            <span className="text-[11px] text-slate-400 block mt-1">حسب المواعيد الشاغرة</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#EAE5DA] shadow-sm">
            <span className="text-xs font-bold text-[#7D9683] block mb-1">النطاق الجغرافي</span>
            <span className="text-xl font-black text-[#D97241]">المكلا والشرج</span>
            <span className="text-[11px] text-slate-400 block mt-1">صالات متفرقة بساحل حضرموت</span>
          </div>
        </div>
      </div>
    );
  }

  // 4. TRAINEE DASHBOARD (Standard Active Member View)
  const activeSub = subscriptions.find((s) => s.status === 'confirmed' || s.status === 'active') || subscriptions[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-['Cairo',sans-serif]" dir="rtl">
      {/* If Admin logged in, show direct access bar */}
      {user.role === 'admin' && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-[#2878B8]">
            <ShieldCheck className="w-5 h-5 shrink-0" />
            <span className="text-xs font-black">
              أنت مسجل بحساب المدير التنفيذي لمنصة عزم. تتوفر لك لوحة إدارة النظام الكاملة.
            </span>
          </div>
          <Link
            to="/admin"
            className="px-4 py-2 rounded-xl bg-[#2878B8] hover:bg-[#1f639a] text-white text-xs font-bold shadow-md shadow-[#2878B8]/20 transition-all shrink-0"
          >
            فتح لوحة الإدارة المركزية
          </Link>
        </div>
      )}

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#1F2722] via-[#26312B] to-[#1F2722] text-white rounded-3xl p-6 sm:p-8 md:p-10 relative overflow-hidden shadow-xl border border-[#2D3831] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute top-0 left-0 w-80 h-80 bg-[#D97241]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center gap-4 relative z-10">
          <img
            src={user.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
            alt={user.name}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover ring-2 ring-[#D97241]/50 shadow-md shrink-0"
          />
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black">أهلاً بك، {user.name}</h1>
            <p className="text-xs sm:text-sm text-[#FAF8F5]/80">
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
            className="flex-1 sm:flex-none justify-center px-5 py-2.5 rounded-xl bg-[#D97241] hover:bg-[#C75F2F] text-white text-xs font-bold shadow-md shadow-[#D97241]/25 transition-all flex items-center gap-1.5 min-h-[44px]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>اشتراك نادي جديد</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Active Gym */}
        <div className="bg-white p-6 rounded-3xl border border-[#EAE5DA] shadow-sm flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">الصالة الحالية</span>
            <div className="w-9 h-9 rounded-xl bg-[#FAF8F5] text-[#1F2722] flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-[#D97241]" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-black text-[#1F2722]">
              {activeSub ? activeSub.gymName : 'لا يوجد اشتراك نشط'}
            </h3>
            <span className="text-xs text-[#7D9683] font-bold block mt-0.5">
              {activeSub ? activeSub.planName : 'تصفح الصالات واشترك الآن'}
            </span>
          </div>
          <Link to="/my-orders" className="text-xs font-bold text-[#D97241] hover:underline flex items-center gap-1 pt-1">
            <span>تفاصيل الاشتراكات</span>
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
          </Link>
        </div>

        {/* Calorie Goal */}
        <div className="bg-white p-6 rounded-3xl border border-[#EAE5DA] shadow-sm flex flex-col justify-between space-y-3">
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
        <div className="bg-white p-6 rounded-3xl border border-[#EAE5DA] shadow-sm flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">الوزن المسجل</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-[#1F2722] font-mono">
              {user.weight || 74} <span className="text-sm font-sans font-normal text-slate-500">كجم</span>
            </h3>
            <span className="text-xs text-slate-500 block mt-0.5">
              الطول: {user.height || 175} سم
            </span>
          </div>
          <Link to="/profile" className="text-xs font-bold text-[#D97241] hover:underline flex items-center gap-1 pt-1">
            <span>تحديث القياسات</span>
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
          </Link>
        </div>

        {/* Orders Count */}
        <div className="bg-white p-6 rounded-3xl border border-[#EAE5DA] shadow-sm flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">سجل الطلبات</span>
            <div className="w-9 h-9 rounded-xl bg-[#FAF8F5] text-[#1F2722] flex items-center justify-center">
              <CalendarCheck className="w-5 h-5 text-[#D97241]" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-[#1F2722] font-mono">
              {subscriptions.length}
            </h3>
            <span className="text-xs text-slate-500 block mt-0.5">اشتراكات وحجوزات مسجلة</span>
          </div>
          <Link to="/my-orders" className="text-xs font-bold text-[#D97241] hover:underline flex items-center gap-1 pt-1">
            <span>سجل طلباتي</span>
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
          </Link>
        </div>
      </div>

      {/* Active Subscriptions Details Table */}
      <div className="bg-white p-5 sm:p-8 rounded-3xl border border-[#EAE5DA] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#F0EBE3] pb-4 gap-2">
          <h2 className="text-base sm:text-lg font-bold text-[#1F2722] flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-[#D97241] shrink-0" />
            <span>حجوزاتي واشتراكاتي الحالية في نوادي المكلا</span>
          </h2>
          <Link to="/my-orders" className="text-xs font-bold text-[#D97241] hover:underline">
            عرض الأرشيف الكامل
          </Link>
        </div>

        {subscriptions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-right text-xs">
              <thead>
                <tr className="border-b border-[#F0EBE3] text-slate-400">
                  <th className="py-3">رقم الطلب</th>
                  <th className="py-3">اسم الصالة</th>
                  <th className="py-3">الباقة</th>
                  <th className="py-3">المبلغ</th>
                  <th className="py-3">الفترة</th>
                  <th className="py-3">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0EBE3] text-slate-700">
                {subscriptions.slice(0, 3).map((sub) => (
                  <tr key={sub.id}>
                    <td className="py-3 font-mono font-bold text-[#1F2722]">{sub.id}</td>
                    <td className="py-3 font-bold text-[#1F2722]">{sub.gymName}</td>
                    <td className="py-3">{sub.planName}</td>
                    <td className="py-3 font-mono font-bold text-[#D97241]">{sub.priceYer.toLocaleString()} ر.ي</td>
                    <td className="py-3">{sub.preferredShift === 'morning' ? 'صباحي' : 'مسائي'}</td>
                    <td className="py-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${sub.status === 'confirmed' || sub.status === 'active'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : sub.status === 'pending'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-[#FAF8F5] text-slate-700'
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
            <Link to="/gyms" className="text-xs font-bold text-[#D97241] hover:underline inline-block">
              تصفح نوادي المكلا واختر صالتك
            </Link>
          </div>
        )}
      </div>

      {/* Saved Nutrition Plan Overview */}
      {savedPlan && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EAE5DA] shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#F0EBE3] pb-4">
            <h2 className="text-lg font-bold text-[#1F2722] flex items-center gap-2">
              <Salad className="w-5 h-5 text-[#7D9683]" />
              <span>الخطة الغذائية المحفوظة: {savedPlan.title}</span>
            </h2>
            <Link to="/nutrition-plan" className="text-xs font-bold text-[#D97241] hover:underline">
              فتح الخطة الكاملة
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
            <div className="bg-amber-50/50 p-3 rounded-2xl border border-amber-200/50">
              <span className="text-amber-800 font-bold block mb-0.5">السعرات</span>
              <span className="font-black text-amber-600 text-sm font-mono">{savedPlan.totalCalories}</span>
            </div>
            <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-200/50">
              <span className="text-emerald-800 font-bold block mb-0.5">بروتين</span>
              <span className="font-black text-emerald-700 text-sm font-mono">{savedPlan.proteinGrams}g</span>
            </div>
            <div className="bg-[#FAF8F5] p-3 rounded-2xl border border-[#EAE5DA]">
              <span className="text-[#1F2722] font-bold block mb-0.5">كارب</span>
              <span className="font-black text-slate-800 text-sm font-mono">{savedPlan.carbsGrams}g</span>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-[#EAE5DA]">
              <span className="text-slate-500 block mb-0.5">شرب الماء</span>
              <span className="font-black text-sky-600 text-sm font-mono">{savedPlan.waterLiters}L</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboardPage;
