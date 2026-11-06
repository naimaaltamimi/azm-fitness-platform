import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { storageService } from '../services/storageService';
import { SubscriptionRequest } from '../types';
import { EmptyState } from '../components/common/EmptyState';
import { Modal } from '../components/common/Modal';
import {
  CalendarCheck,
  Building,
  Clock,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Eye,
  Trash2,
  Dumbbell
} from 'lucide-react';

export const MyOrdersPage: React.FC = () => {
  const { user, loginAsDemo } = useAuth();
  const [subscriptions, setSubscriptions] = useState<SubscriptionRequest[]>([]);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'confirmed'>('all');
  const [selectedSub, setSelectedSub] = useState<SubscriptionRequest | null>(null);

  const loadData = () => {
    if (user) {
      setSubscriptions(storageService.getUserSubscriptions(user.id));
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
        <EmptyState
          icon={CalendarCheck}
          title="طلباتي وحجوزاتي"
          description="يرجى تسجيل الدخول لعرض قائمة اشتراكاتك وحجوزاتك السابقة والحالية في صالات المكلا."
          actionText="دخول كمتدرب تجريبي"
          onActionClick={() => loginAsDemo('trainee')}
        />
      </div>
    );
  }

  const filtered = subscriptions.filter((s) => {
    if (statusFilter === 'all') return true;
    return s.status === statusFilter;
  });

  const handleCancelSub = (id: string) => {
    if (confirm('هل أنت متأكد من إلغاء هذا الطلب؟')) {
      storageService.updateSubscriptionStatus(id, 'cancelled');
      loadData();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-forest-900 via-forest-800 to-forest-950 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-xl border border-forest-800/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute top-0 left-0 w-80 h-80 bg-terracotta-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sage-500/20 text-sage-300 text-xs font-bold border border-sage-500/30">
            <CalendarCheck className="w-3.5 h-3.5 text-sage-300" />
            <span>سجل الاشتراكات الموثقة</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">طلباتي وحجوزاتي الرياضية</h1>
          <p className="text-sand-200 text-xs sm:text-sm">
            تابع حالة اشتراكاتك في صالات المكلا، تفاصيل السداد، وتواريخ البداية.
          </p>
        </div>

        <Link
          to="/gyms"
          className="w-full sm:w-auto text-center px-6 py-3.5 rounded-2xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold text-xs shadow-md shadow-terracotta-500/25 transition-all shrink-0 min-h-[44px] flex items-center justify-center relative z-10"
        >
          طلب اشتراك جديد
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-sand-200 pb-3 overflow-x-auto">
        {[
          { key: 'all', label: 'كافة الطلبات' },
          { key: 'confirmed', label: 'المؤكدة والنشطة' },
          { key: 'pending', label: 'قيد المراجعة' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setStatusFilter(tab.key as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 min-h-[38px] ${
              statusFilter === tab.key
                ? 'bg-forest-900 text-sand-50 shadow-sm'
                : 'text-forest-800 hover:bg-sand-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* List or Empty State */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((sub) => (
            <div
              key={sub.id}
              className="bg-white rounded-3xl border border-sand-200 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono font-bold text-slate-400">#{sub.id}</span>
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      sub.status === 'confirmed' || sub.status === 'active'
                        ? 'bg-sage-50 text-sage-800 border border-sage-200'
                        : sub.status === 'pending'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                  >
                    {sub.status === 'confirmed'
                      ? 'مؤكد ونشط'
                      : sub.status === 'pending'
                      ? 'قيد مراجعة الصالة'
                      : 'ملغي'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-forest-900 mb-1">{sub.gymName}</h3>
                <p className="text-xs font-semibold text-terracotta-600 mb-3">{sub.planName}</p>

                <div className="space-y-1.5 text-xs text-slate-600 border-t border-sand-100 pt-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">قيمة الاشتراك:</span>
                    <span className="font-bold font-mono text-terracotta-600">{sub.priceYer.toLocaleString()} ر.ي</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">الفترة:</span>
                    <span className="font-semibold text-forest-900">{sub.preferredShift === 'morning' ? 'صباحي' : 'مسائي'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">تاريخ البدء:</span>
                    <span className="font-semibold text-forest-900">{sub.startDate}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 border-t border-sand-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedSub(sub)}
                  className="flex-1 py-2.5 rounded-xl bg-sand-100 hover:bg-sand-200 text-forest-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors min-h-[40px]"
                >
                  <Eye className="w-3.5 h-3.5 text-terracotta-500" />
                  <span>عرض التفاصيل</span>
                </button>

                {sub.status === 'pending' && (
                  <button
                    onClick={() => handleCancelSub(sub.id)}
                    className="p-2.5 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                    title="إلغاء الطلب"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Dumbbell}
          title="لا توجد طلبات في هذا القسم"
          description="لم تسجل أي طلبات اشتراك تطابق الفلتر الحالي. يمكنك استعراض نوادي المكلا واختيار الصالة والباقة المناسبة لك."
          actionText="تصفح صالات المكلا"
          actionLink="/gyms"
        />
      )}

      {/* Subscription Details Modal */}
      {selectedSub && (
        <Modal
          isOpen={!!selectedSub}
          onClose={() => setSelectedSub(null)}
          title={`تفاصيل الطلب #${selectedSub.id}`}
        >
          <div className="space-y-4 text-xs text-right">
            <div className="p-4 bg-sand-50/70 rounded-2xl border border-sand-200 space-y-2.5">
              <div className="flex justify-between">
                <span className="text-slate-500 font-semibold">الصالة الرياضية:</span>
                <span className="font-bold text-forest-900">{selectedSub.gymName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-semibold">نوع الباقة:</span>
                <span className="font-bold text-terracotta-600">{selectedSub.planName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-semibold">المبلغ الإجمالي:</span>
                <span className="font-black text-terracotta-600">{selectedSub.priceYer.toLocaleString()} ريال يمني</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-semibold">تاريخ البداية:</span>
                <span className="font-bold text-forest-900">{selectedSub.startDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-semibold">فترة التمرين:</span>
                <span className="font-bold text-forest-900">{selectedSub.preferredShift === 'morning' ? 'صباحية' : 'مسائية'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-semibold">طريقة الدفع:</span>
                <span className="font-bold text-forest-900">
                  {selectedSub.paymentMethod === 'cash_at_gym'
                    ? 'نقداً عند الحضور للصالة'
                    : selectedSub.paymentMethod === 'kuraimi_exchange'
                    ? 'تحويل عبر بنك الكريمي'
                    : 'حوالة عبر العمقي للصرافة'}
                </span>
              </div>
              {selectedSub.paymentReference && (
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">رقم السند/الحوالة:</span>
                  <span className="font-mono font-bold text-forest-900">{selectedSub.paymentReference}</span>
                </div>
              )}
            </div>

            {selectedSub.notes && (
              <div className="p-3 bg-sand-50/70 rounded-xl border border-sand-200">
                <span className="font-bold text-forest-900 block mb-1">ملاحظاتك المسجلة:</span>
                <p className="text-slate-600">{selectedSub.notes}</p>
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedSub(null)}
                className="px-5 py-2.5 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold text-xs shadow-sm"
              >
                إغلاق
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
