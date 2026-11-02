import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { storageService } from '../services/storageService';
import { MUKALLA_GYMS } from '../data/mukallaGymsData';
import { getSupabaseStatusMessage, supabaseConfig } from '../services/supabaseClient';
import { SubscriptionRequest, Trainer } from '../types';
import {
  ShieldAlert,
  Building2,
  CalendarCheck,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Database,
  ExternalLink,
  Phone,
  MapPin,
  Sparkles
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { user, loginAsDemo } = useAuth();
  const [subscriptions, setSubscriptions] = useState<SubscriptionRequest[]>([]);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [activeTab, setActiveTab] = useState<'subscriptions' | 'gyms' | 'trainers' | 'database'>('subscriptions');

  const loadData = () => {
    setSubscriptions(storageService.getSubscriptions());
    setTrainers(storageService.getTrainers());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('azm_storage_update', loadData);
    return () => window.removeEventListener('azm_storage_update', loadData);
  }, []);

  const handleUpdateSubStatus = (id: string, status: SubscriptionRequest['status']) => {
    storageService.updateSubscriptionStatus(id, status);
    loadData();
  };

  const pendingCount = subscriptions.filter((s) => s.status === 'pending').length;
  const confirmedCount = subscriptions.filter((s) => s.status === 'confirmed').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Admin Notice / Demo Switcher */}
      {user?.role !== 'admin' && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
            <p className="text-xs text-amber-900 font-medium">
              أنت تتصفح حالياً بصفتك ({user ? user.name : 'زائر'}). لاختبار أدوات إدارة المنصة بالكامل يمكنك التبديل لحساب الإدارة:
            </p>
          </div>
          <button
            onClick={() => loginAsDemo('admin')}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shrink-0 transition-colors"
          >
            التبديل لحساب مدير المنصة
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-brand-dark-900 to-brand-blue-950 text-white rounded-3xl p-8 sm:p-10 relative overflow-hidden shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blue-500/20 text-brand-blue-300 text-xs font-bold border border-brand-blue-400/30">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>لوحة التحكم الإدارية المركزية • عزم المكلا</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">إدارة المنصة والعمليات الميدانية</h1>
          <p className="text-slate-300 text-xs sm:text-sm">
            متابعة طلبات الاشتراكات الواردة من رياضيي المكلا، إدارة الصالات المعتمدة، واعتماد الكباتن.
          </p>
        </div>

        {/* Database Readiness Tag */}
        <div className="flex items-center gap-2 p-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs shrink-0">
          <Database className="w-4 h-4 text-brand-green-400" />
          <div>
            <span className="text-slate-400 block text-[10px]">حالة الباك إند:</span>
            <span className="font-bold text-brand-green-400">جاهز للربط الفوري مع Supabase</span>
          </div>
        </div>
      </div>

      {/* Real Platform Counters (Strictly No Fake Stats) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm text-center">
          <span className="text-[11px] text-slate-500 block mb-1">الصالات المعتمدة بالمكلا</span>
          <span className="text-2xl font-black text-brand-blue-700 font-mono">{MUKALLA_GYMS.length}</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">صالات حقيقية ميدانية</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm text-center">
          <span className="text-[11px] text-slate-500 block mb-1">طلبات بانتظار المراجعة</span>
          <span className="text-2xl font-black text-amber-600 font-mono">{pendingCount}</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">اشتراك يتطلب التأكيد</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm text-center">
          <span className="text-[11px] text-slate-500 block mb-1">الاشتراكات المؤكدة</span>
          <span className="text-2xl font-black text-brand-green-600 font-mono">{confirmedCount}</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">نشطة بالصالات</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm text-center">
          <span className="text-[11px] text-slate-500 block mb-1">الكباتن المسجلون</span>
          <span className="text-2xl font-black text-purple-700 font-mono">{trainers.length}</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">ملفات تدريبية موثقة</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('subscriptions')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'subscriptions'
              ? 'bg-brand-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <CalendarCheck className="w-4 h-4" />
          <span>طلبات الاشتراكات ({subscriptions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('gyms')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'gyms'
              ? 'bg-brand-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>صالات المكلا ({MUKALLA_GYMS.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('trainers')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'trainers'
              ? 'bg-brand-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>المدربون ({trainers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('database')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'database'
              ? 'bg-brand-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>تكامل Supabase</span>
        </button>
      </div>

      {/* Tab 1: Subscriptions Management */}
      {activeTab === 'subscriptions' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-sm">قائمة طلبات الاشتراكات الواردة</h3>
            <span className="text-xs text-slate-500">تحديث فوري تفاعلي</span>
          </div>

          {subscriptions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400">
                    <th className="py-3">الطلب</th>
                    <th className="py-3">المتدرب</th>
                    <th className="py-3">الهاتف</th>
                    <th className="py-3">الصالة</th>
                    <th className="py-3">الباقة</th>
                    <th className="py-3">المبلغ</th>
                    <th className="py-3">طريقة الدفع</th>
                    <th className="py-3">الحالة</th>
                    <th className="py-3 text-center">إجراءات الإدارة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {subscriptions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 font-mono font-bold text-brand-blue-700">{sub.id}</td>
                      <td className="py-3 font-bold text-slate-900">{sub.userName}</td>
                      <td className="py-3 font-mono" dir="ltr">{sub.userPhone}</td>
                      <td className="py-3 font-medium">{sub.gymName}</td>
                      <td className="py-3">{sub.planName}</td>
                      <td className="py-3 font-mono font-bold">{sub.priceYer.toLocaleString()} ر.ي</td>
                      <td className="py-3">
                        {sub.paymentMethod === 'cash_at_gym'
                          ? 'نقداً بالصالة'
                          : sub.paymentMethod === 'kuraimi_exchange'
                          ? 'الكريمي'
                          : 'العمقي'}
                      </td>
                      <td className="py-3">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            sub.status === 'confirmed'
                              ? 'bg-brand-green-50 text-brand-green-700'
                              : sub.status === 'pending'
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-red-50 text-red-700'
                          }`}
                        >
                          {sub.status === 'confirmed' ? 'مؤكد' : sub.status === 'pending' ? 'قيد المراجعة' : 'ملغي'}
                        </span>
                      </td>
                      <td className="py-3 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {sub.status !== 'confirmed' && (
                            <button
                              onClick={() => handleUpdateSubStatus(sub.id, 'confirmed')}
                              className="p-1.5 rounded-lg bg-brand-green-50 text-brand-green-600 hover:bg-brand-green-100 transition-colors"
                              title="تأكيد وقبول الطلب"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                          {sub.status !== 'cancelled' && (
                            <button
                              onClick={() => handleUpdateSubStatus(sub.id, 'cancelled')}
                              className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                              title="إلغاء الطلب"
                            >
                              <XCircle className="w-4 h-4" />
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
            <p className="text-center py-8 text-xs text-slate-500">لا توجد طلبات اشتراك مسجلة حالياً.</p>
          )}
        </div>
      )}

      {/* Tab 2: Gyms List */}
      {activeTab === 'gyms' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MUKALLA_GYMS.map((gym) => (
            <div key={gym.id} className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900">
                <img src={gym.coverImage} alt={gym.nameAr} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-bold backdrop-blur-sm">
                  {gym.neighborhood}
                </div>
              </div>
              <h4 className="font-bold text-slate-900 text-sm">{gym.nameAr}</h4>
              <p className="text-xs text-slate-500 line-clamp-2">{gym.shortDescription}</p>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span className="font-mono text-slate-600" dir="ltr">{gym.phone}</span>
                <span className="text-brand-green-600 font-bold">صالة معتمدة ✓</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Trainers List */}
      {activeTab === 'trainers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainers.map((t) => (
            <div key={t.id} className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <img src={t.avatarUrl} alt={t.name} className="w-12 h-12 rounded-2xl object-cover ring-2 ring-brand-blue-500/20" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{t.name}</h4>
                  <span className="text-[11px] text-brand-blue-600 font-semibold block">{t.specialty}</span>
                  <span className="text-[10px] text-slate-400">المكلا - {t.neighborhood}</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 line-clamp-2">{t.bio}</p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-mono text-slate-500">{t.experienceYears} سنوات خبرة</span>
                <span className="px-2 py-0.5 rounded-full bg-brand-green-50 text-brand-green-700 font-bold text-[10px]">
                  ملف موثق
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Database & Architecture */}
      {activeTab === 'database' && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">حالة تكامل وتجهيز قاعدة بيانات Supabase</h3>
            <p className="text-xs text-slate-500">
              {getSupabaseStatusMessage()}
            </p>
          </div>

          <div className="p-4 bg-slate-900 text-slate-200 rounded-2xl font-mono text-xs space-y-2" dir="ltr">
            <p className="text-brand-green-400">// Supabase Connection Status</p>
            <p>VITE_SUPABASE_URL: {supabaseConfig.supabaseUrl || '(Not set yet - ready for phase 2)'}</p>
            <p>VITE_SUPABASE_ANON_KEY: {supabaseConfig.supabaseAnonKey ? '***' : '(Not set yet)'}</p>
            <p>STATUS: READY_FOR_ENV_KEYS</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
              <span className="font-bold text-slate-900 text-xs block">جداول المنصة المصممة:</span>
              <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                <li>`profiles` (المستخدمين والأدوار)</li>
                <li>`gyms` (نوادي المكلا المعتمدة)</li>
                <li>`subscriptions` (طلبات الاشتراكات)</li>
                <li>`trainers` (دليل الكباتن)</li>
                <li>`meals` (الوجبات الصحية)</li>
              </ul>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1 sm:col-span-2">
              <span className="font-bold text-slate-900 text-xs block">خطوات التفعيل في المرحلة التالية:</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                بمجرد إضافة مفاتيح `VITE_SUPABASE_URL` و `VITE_SUPABASE_ANON_KEY` في ملف `.env`، سيتم نقل البيانات بسلاسة وتفعيل المصادقة الحقيقية عبر البريد والهاتف دون الحاجة لإعادة كتابة الواجهات الـ 16 المبنية حالياً.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

