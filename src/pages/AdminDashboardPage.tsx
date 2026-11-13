import React, { useState, useEffect, useMemo } from 'react';
import { storageService } from '../services/storageService';
import { SubscriptionRequest, Trainer, Gym } from '../types';
import { TrainerAdminModal } from '../components/trainers/TrainerAdminModal';
import { GymAdminModal } from '../components/admin/GymAdminModal';
import { AdminLayout } from '../components/admin/AdminLayout';
import {
  Building2,
  CalendarCheck,
  Users,
  CheckCircle,
  XCircle,
  PlusCircle,
  Edit,
  Trash2,
  Search,
  ExternalLink,
  MapPin,
  Phone,
  RotateCcw
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminDashboardPage: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<SubscriptionRequest[]>([]);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [activeTab, setActiveTab] = useState<'subscriptions' | 'gyms' | 'trainers'>('subscriptions');

  // Subscriptions filtering & search
  const [subSearch, setSubSearch] = useState('');
  const [subStatusFilter, setSubStatusFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');

  // Gyms state
  const [gymSearch, setGymSearch] = useState('');
  const [selectedGym, setSelectedGym] = useState<Gym | null>(null);
  const [isGymModalOpen, setIsGymModalOpen] = useState(false);

  // Trainers state
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [isTrainerModalOpen, setIsTrainerModalOpen] = useState(false);

  const loadData = () => {
    setSubscriptions(storageService.getSubscriptions());
    setTrainers(storageService.getTrainers());
    setGyms(storageService.getGyms());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('azm_storage_update', loadData);
    return () => window.removeEventListener('azm_storage_update', loadData);
  }, []);

  // Handlers for Subscriptions
  const handleUpdateSubStatus = (id: string, status: SubscriptionRequest['status']) => {
    storageService.updateSubscriptionStatus(id, status);
    loadData();
  };

  const handleDeleteSub = (id: string, userName: string) => {
    if (confirm(`هل أنت متأكد من حذف طلب الاشتراك الخاص بـ "${userName}" نهائياً؟`)) {
      storageService.deleteSubscription(id);
      loadData();
    }
  };

  // Handlers for Gyms
  const handleDeleteGym = (id: string, nameAr: string) => {
    if (confirm(`هل أنت متأكد من حذف صالة "${nameAr}" من دليل المنظومة؟`)) {
      storageService.deleteGym(id);
      loadData();
    }
  };

  const handleResetGyms = () => {
    if (confirm('هل تريد استعادة قائمة الصالات الافتراضية المعتمدة بالمكلا؟')) {
      storageService.resetGyms();
      loadData();
    }
  };

  const pendingCount = subscriptions.filter((s) => s.status === 'pending').length;
  const confirmedCount = subscriptions.filter((s) => s.status === 'confirmed').length;

  // Filtered Subscriptions
  const filteredSubscriptions = useMemo(() => {
    return subscriptions.filter((sub) => {
      const matchSearch =
        sub.userName.toLowerCase().includes(subSearch.toLowerCase()) ||
        sub.gymName.toLowerCase().includes(subSearch.toLowerCase()) ||
        sub.id.toLowerCase().includes(subSearch.toLowerCase());
      const matchStatus = subStatusFilter === 'all' || sub.status === subStatusFilter;
      return matchSearch && matchStatus;
    });
  }, [subscriptions, subSearch, subStatusFilter]);

  // Filtered Gyms
  const filteredGyms = useMemo(() => {
    return gyms.filter((g) => {
      return (
        g.nameAr.toLowerCase().includes(gymSearch.toLowerCase()) ||
        g.neighborhood.toLowerCase().includes(gymSearch.toLowerCase()) ||
        (g.shortDescription && g.shortDescription.toLowerCase().includes(gymSearch.toLowerCase()))
      );
    });
  }, [gyms, gymSearch]);

  return (
    <AdminLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      pendingCount={pendingCount}
      gymsCount={gyms.length}
      trainersCount={trainers.length}
    >
      <div className="space-y-6 font-['Cairo',sans-serif]" dir="rtl">
        {/* Real Platform Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
            <span className="text-[11px] text-slate-500 block mb-1">الصالات المعتمدة بالمكلا</span>
            <span className="text-2xl font-black text-[#2878B8] font-mono">{gyms.length}</span>
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

        {/* Tab 1: Subscriptions Management (CRUD: Read, Update Status, Delete) */}
        {activeTab === 'subscriptions' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">إدارة ومتابعة طلبات الاشتراكات</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  تأكيد، تعديل، أو حذف حجوزات واشتراكات رياضيي المكلا الواردة عبر المنصة
                </p>
              </div>

              {/* Status Filter Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
                <button
                  onClick={() => setSubStatusFilter('all')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    subStatusFilter === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  الكل ({subscriptions.length})
                </button>
                <button
                  onClick={() => setSubStatusFilter('pending')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    subStatusFilter === 'pending' ? 'bg-[#D9AD55] text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  قيد المراجعة ({pendingCount})
                </button>
                <button
                  onClick={() => setSubStatusFilter('confirmed')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    subStatusFilter === 'confirmed' ? 'bg-[#2878B8] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  مؤكد ({confirmedCount})
                </button>
                <button
                  onClick={() => setSubStatusFilter('cancelled')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    subStatusFilter === 'cancelled' ? 'bg-red-500 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  ملغي ({subscriptions.filter((s) => s.status === 'cancelled').length})
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md">
              <input
                type="text"
                value={subSearch}
                onChange={(e) => setSubSearch(e.target.value)}
                placeholder="بحث برقم الطلب، اسم المتدرب، أو اسم الصالة..."
                className="w-full pl-3 pr-9 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#2878B8] outline-none"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
            </div>

            {filteredSubscriptions.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-right text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400">
                      <th className="py-3 px-2">رقم الطلب</th>
                      <th className="py-3 px-2">المتدرب</th>
                      <th className="py-3 px-2">الهاتف</th>
                      <th className="py-3 px-2">الصالة</th>
                      <th className="py-3 px-2">الباقة</th>
                      <th className="py-3 px-2">المبلغ</th>
                      <th className="py-3 px-2">طريقة الدفع</th>
                      <th className="py-3 px-2">الحالة</th>
                      <th className="py-3 px-2 text-center">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {filteredSubscriptions.map((sub) => (
                      <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-2 font-mono font-bold text-[#2878B8]">{sub.id}</td>
                        <td className="py-3 px-2 font-bold text-slate-900">{sub.userName}</td>
                        <td className="py-3 px-2 font-mono text-slate-500" dir="ltr">
                          {sub.userPhone || '—'}
                        </td>
                        <td className="py-3 px-2 font-medium">{sub.gymName}</td>
                        <td className="py-3 px-2">{sub.planName}</td>
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
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              sub.status === 'confirmed'
                                ? 'bg-blue-50 text-[#2878B8] border border-blue-200'
                                : sub.status === 'pending'
                                ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                : 'bg-red-50 text-red-700 border border-red-200'
                            }`}
                          >
                            {sub.status === 'confirmed'
                              ? 'مؤكد ونشط'
                              : sub.status === 'pending'
                              ? 'قيد المراجعة'
                              : 'ملغي'}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-center">
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
                                className="p-1.5 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors"
                                title="إلغاء الطلب"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteSub(sub.id, sub.userName)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                              title="حذف الطلب نهائياً"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center py-8 text-xs text-slate-500">
                لا توجد طلبات اشتراك مطابقة لمعايير البحث الحالية.
              </p>
            )}
          </div>
        )}

        {/* Tab 2: Gyms Management (Full CRUD: Add, Edit, Delete, View) */}
        {activeTab === 'gyms' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <div>
                <h3 className="font-bold text-slate-900 text-base">إدارة الصالات والمرافق الرياضية بالمكلا</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  إضافة، تعديل تفاصيل، أسعار، وأوقات عمل الصالات، أو إزالتها من المنظومة.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetGyms}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition-colors"
                  title="استعادة الصالات الافتراضية الأصلية"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>استعادة الافتراضي</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedGym(null);
                    setIsGymModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2878B8] hover:bg-[#1f639a] text-white font-bold text-xs shadow-md shadow-[#2878B8]/20 active:scale-95 transition-all"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>إضافة صالة جديدة</span>
                </button>
              </div>
            </div>

            {/* Gyms Search */}
            <div className="relative max-w-md">
              <input
                type="text"
                value={gymSearch}
                onChange={(e) => setGymSearch(e.target.value)}
                placeholder="بحث باسم الصالة أو الحي بالمكلا..."
                className="w-full pl-3 pr-9 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#2878B8] outline-none"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGyms.map((gym) => (
                <div
                  key={gym.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between hover:border-[#2878B8]/50 transition-all"
                >
                  <div className="space-y-3">
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900">
                      <img src={gym.coverImage} alt={gym.nameAr} className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-black/70 text-white text-[10px] font-bold backdrop-blur-sm">
                        {gym.neighborhood}
                      </div>
                      {gym.featured && (
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#D9AD55] text-slate-900 text-[10px] font-black shadow-sm">
                          مميزة ★
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{gym.nameAr}</h4>
                      {gym.nameEn && (
                        <span className="text-[11px] text-slate-400 block font-sans" dir="ltr">
                          {gym.nameEn}
                        </span>
                      )}
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1">{gym.shortDescription}</p>
                    </div>

                    <div className="space-y-1 text-[11px] text-slate-600 pt-1">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{gym.addressText}</span>
                      </div>
                      {gym.phone && (
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="font-mono" dir="ltr">{gym.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-[#2878B8]">
                      تبدأ من {gym.pricingPlans?.[0]?.priceYer?.toLocaleString() || '15,000'} ر.ي
                    </span>

                    <div className="flex items-center gap-1.5">
                      <Link
                        to={`/gyms/${gym.slug || gym.id}`}
                        target="_blank"
                        className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                        title="معاينة في الموقع"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>

                      <button
                        onClick={() => {
                          setSelectedGym(gym);
                          setIsGymModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg text-slate-600 hover:text-[#2878B8] hover:bg-blue-50 transition-colors"
                        title="تعديل بيانات الصالة"
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDeleteGym(gym.id, gym.nameAr)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="حذف الصالة"
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

        {/* Tab 3: Trainers List (Full CRUD: Add, Edit, Delete) */}
        {activeTab === 'trainers' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <div>
                <h3 className="font-bold text-slate-900 text-base">إدارة الكباتن والمدربين المعتمدين بالمكلا</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  مراجعة وتوثيق الكباتن، وإضافة مدربين جدد وتعديل ملفاتهم الرياضية.
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
                        title="تعديل ملف الكابتن"
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
                        title="حذف الكابتن"
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

        {/* Gym Admin Modal */}
        <GymAdminModal
          isOpen={isGymModalOpen}
          onClose={() => setIsGymModalOpen(false)}
          gym={selectedGym}
          onSave={(gymData) => {
            if (selectedGym) {
              storageService.updateGym(selectedGym.id, gymData);
            } else {
              storageService.addGym(gymData as any);
            }
            loadData();
          }}
        />

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
