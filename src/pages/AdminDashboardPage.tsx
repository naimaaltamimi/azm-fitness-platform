import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { storageService } from '../services/storageService';
import { MUKALLA_GYMS } from '../data/mukallaGymsData';
import { getSupabaseStatusMessage, supabaseConfig } from '../services/supabaseClient';
import { SubscriptionRequest, Trainer } from '../types';
import { TrainerAdminModal } from '../components/trainers/TrainerAdminModal';
import { AdminLayout } from '../components/admin/AdminLayout';
import {
  ShieldAlert,
  Building2,
  CalendarCheck,
  Users,
  CheckCircle,
  XCircle,
  Database,
  PlusCircle,
  Edit,
  Trash2,
  Sparkles
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<SubscriptionRequest[]>([]);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [activeTab, setActiveTab] = useState<'subscriptions' | 'gyms' | 'trainers' | 'database'>('subscriptions');
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [isTrainerModalOpen, setIsTrainerModalOpen] = useState(false);

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
    <AdminLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      pendingCount={pendingCount}
    >
      <div className="space-y-6">
        {/* Real Platform Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
            <span className="text-[11px] text-slate-500 block mb-1">الصالات المعتمدة بالمكلا</span>
            <span className="text-2xl font-black text-[#2878B8] font-mono">{MUKALLA_GYMS.length}</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">صالات حقيقية ميدانية</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
            <span className="text-[11px] text-slate-500 block mb-1">طلبات بانتظار المراجعة</span>
            <span className="text-2xl font-black text-[#D9AD55] font-mono">{pendingCount}</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">اشتراك يتطلب التأكيد</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
            <span className="text-[11px] text-slate-500 block mb-1">الاشتراكات المؤكدة</span>
            <span className="text-2xl font-black text-[#2878B8] font-mono">{confirmedCount}</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">نشطة بالصالات</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
            <span className="text-[11px] text-slate-500 block mb-1">الكباتن المعتمدون</span>
            <span className="text-2xl font-black text-slate-800 font-mono">{trainers.length}</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">ملفات تدريبية موثقة</span>
          </div>
        </div>

        {/* Tab 1: Subscriptions Management */}
        {activeTab === 'subscriptions' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">قائمة طلبات الاشتراكات الواردة</h3>
                <p className="text-xs text-slate-500 mt-0.5">إدارة وتأكيد حجوزات رياضيي المكلا الواردة عبر المنصة</p>
              </div>
              <span className="text-xs text-[#2878B8] font-bold bg-blue-50 px-2.5 py-1 rounded-lg">تحديث فوري</span>
            </div>

            {subscriptions.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-right text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400">
                      <th className="py-3">الطلب</th>
                      <th className="py-3">المتدرب</th>
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
                        <td className="py-3 font-mono font-bold text-[#2878B8]">{sub.id}</td>
                        <td className="py-3 font-bold text-slate-900">{sub.userName}</td>
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
                                ? 'bg-blue-50 text-[#2878B8]'
                                : sub.status === 'pending'
                                ? 'bg-amber-50 text-[#D9AD55]'
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
                                className="p-1.5 rounded-lg bg-blue-50 text-[#2878B8] hover:bg-blue-100 transition-colors"
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
              <div key={gym.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900">
                  <img src={gym.coverImage} alt={gym.nameAr} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-bold backdrop-blur-sm">
                    {gym.neighborhood}
                  </div>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">{gym.nameAr}</h4>
                <p className="text-xs text-slate-500 line-clamp-2">{gym.shortDescription}</p>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  {gym.phone ? (
                    <span className="font-mono text-slate-600" dir="ltr">{gym.phone}</span>
                  ) : (
                    <span className="text-slate-400 text-[11px]">توثيق ميداني</span>
                  )}
                  <span className="text-[#2878B8] font-bold">صالة معتمدة ✓</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Trainers List */}
        {activeTab === 'trainers' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-slate-200">
              <div>
                <h3 className="font-bold text-slate-900 text-base">إدارة الكباتن والمدربين المعتمدين بالمكلا</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  مراجعة وتوثيق الكباتن، والشهادات الرياضية قبل ظهورها للعامة.
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedTrainer(null);
                  setIsTrainerModalOpen(true);
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#2878B8] hover:bg-[#1f639a] text-white font-bold text-xs shadow-md shadow-[#2878B8]/20 active:scale-95 transition-all min-h-[42px]"
              >
                <PlusCircle className="w-4 h-4" />
                <span>إضافة كابتن جديد</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trainers.map((t) => (
                <div key={t.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img src={t.avatarUrl} alt={t.name} className="w-12 h-12 rounded-xl object-cover ring-2 ring-blue-500/20" />
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{t.name}</h4>
                          <span className="text-[11px] text-[#2878B8] font-semibold block">{t.specialty}</span>
                          <span className="text-[10px] text-slate-400">المكلا - {t.neighborhood}</span>
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${t.isVerified ? 'bg-blue-50 text-[#2878B8] border border-blue-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                        {t.isVerified ? 'موثق' : 'قيد المراجعة'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2">{t.bio}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-500">{t.experienceYears} سنوات خبرة</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setSelectedTrainer(t);
                          setIsTrainerModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg text-slate-600 hover:text-[#2878B8] hover:bg-slate-100 transition-colors"
                        title="تعديل"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`هل أنت متأكد من حذف ملف الكابتن ${t.name}؟`)) {
                            storageService.deleteTrainer(t.id);
                            loadData();
                          }
                        }}
                        className="p-1.5 rounded-lg text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="حذف"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Database & Architecture */}
        {activeTab === 'database' && (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900">حالة تكامل وتجهيز قاعدة بيانات Supabase</h3>
              <p className="text-xs text-slate-500">
                {getSupabaseStatusMessage()}
              </p>
            </div>

            <div className="p-4 bg-slate-900 text-slate-200 rounded-2xl font-mono text-xs space-y-2" dir="ltr">
              <p className="text-[#D9AD55]">// Supabase Connection Status</p>
              <p>VITE_SUPABASE_URL: {supabaseConfig.supabaseUrl || '(Not set yet - ready for phase 2)'}</p>
              <p>VITE_SUPABASE_ANON_KEY: {supabaseConfig.supabaseAnonKey ? '***' : '(Not set yet)'}</p>
              <p>STATUS: READY_FOR_ENV_KEYS</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="font-bold text-slate-900 text-xs block">جداول المنصة المصممة:</span>
                <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                  <li>`profiles` (المستخدمين والأدوار)</li>
                  <li>`gyms` (نوادي المكلا المعتمدة)</li>
                  <li>`subscriptions` (طلبات الاشتراكات)</li>
                  <li>`trainers` (دليل الكباتن)</li>
                  <li>`meals` (الوجبات الصحية)</li>
                </ul>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1 sm:col-span-2">
                <span className="font-bold text-slate-900 text-xs block">خطوات التفعيل في المرحلة التالية:</span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  بمجرد إضافة مفاتيح `VITE_SUPABASE_URL` و `VITE_SUPABASE_ANON_KEY` في ملف `.env`، سيتم نقل البيانات بسلاسة وتفعيل المصادقة الحقيقية عبر البريد والهاتف دون الحاجة لإعادة كتابة الواجهات الـ 16 المبنية حالياً.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Trainer Admin Modal */}
        <TrainerAdminModal
          isOpen={isTrainerModalOpen}
          onClose={() => setIsTrainerModalOpen(false)}
          trainer={selectedTrainer}
          onSave={(trainerData) => {
            if (selectedTrainer) {
              storageService.updateTrainer(selectedTrainer.id, trainerData);
            } else {
              storageService.applyAsTrainer(trainerData as any);
            }
            loadData();
          }}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;
