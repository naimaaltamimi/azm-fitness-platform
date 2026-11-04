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
      <div className="bg-gradient-to-r from-brand-blue-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-green-500/20 text-brand-green-400 text-xs font-bold border border-brand-green-500/30">
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>سجل الاشتراكات الموثقة</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">طلباتي وحجوزاتي الرياضية</h1>
          <p className="text-slate-300 text-xs sm:text-sm">
            تابع حالة اشتراكاتك في صالات المكلا، تفاصيل السداد، وتواريخ البداية.
          </p>
        </div>

        <Link
          to="/gyms"
          className="w-full sm:w-auto text-center px-6 py-3 rounded-xl bg-brand-blue-600 hover:bg-brand-blue-500 text-white font-bold text-xs shadow-md transition-all shrink-0"
        >
          طلب اشتراك جديد
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
        {[
          { key: 'all', label: 'كافة الطلبات' },
          { key: 'confirmed', label: 'المؤكدة والنشطة' },
          { key: 'pending', label: 'قيد المراجعة' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setStatusFilter(tab.key as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              statusFilter === tab.key
                ? 'bg-brand-blue-600 text-white'
                : 'text-slate-600 hover:bg-slate-100'
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
              className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono font-bold text-slate-400">#{sub.id}</span>
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      sub.status === 'confirmed' || sub.status === 'active'
                        ? 'bg-brand-green-50 text-brand-green-700 border border-brand-green-200'
                        : sub.status === 'pending'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
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

                <h3 className="text-base font-bold text-slate-900 mb-1">{sub.gymName}</h3>
                <p className="text-xs font-semibold text-brand-blue-600 mb-3">{sub.planName}</p>

                <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">قيمة الاشتراك:</span>
                    <span className="font-bold font-mono text-slate-800">{sub.priceYer.toLocaleString()} ر.ي</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">الفترة:</span>
                    <span className="font-semibold text-slate-800">{sub.preferredShift === 'morning' ? 'صباحي' : 'مسائي'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">تاريخ البدء:</span>
                    <span className="font-semibold text-slate-800">{sub.startDate}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedSub(sub)}
                  className="flex-1 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>عرض التفاصيل</span>
                </button>

                {sub.status === 'pending' && (
                  <button
                    onClick={() => handleCancelSub(sub.id)}
                    className="p-2 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
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
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2.5">
              <div className="flex justify-between">
                <span className="text-slate-500 font-semibold">الصالة الرياضية:</span>
                <span className="font-bold text-slate-900">{selectedSub.gymName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-semibold">نوع الباقة:</span>
                <span className="font-bold text-brand-blue-700">{selectedSub.planName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-semibold">المبلغ الإجمالي:</span>
                <span className="font-black text-brand-green-700">{selectedSub.priceYer.toLocaleString()} ريال يمني</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-semibold">تاريخ البداية:</span>
                <span className="font-bold text-slate-800">{selectedSub.startDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-semibold">فترة التمرين:</span>
                <span className="font-bold text-slate-800">{selectedSub.preferredShift === 'morning' ? 'صباحية' : 'مسائية'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-semibold">طريقة الدفع:</span>
                <span className="font-bold text-slate-800">
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
                  <span className="font-mono font-bold text-slate-800">{selectedSub.paymentReference}</span>
                </div>
              )}
            </div>

            {selectedSub.notes && (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="font-bold text-slate-700 block mb-1">ملاحظاتك المسجلة:</span>
                <p className="text-slate-600">{selectedSub.notes}</p>
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedSub(null)}
                className="px-5 py-2 rounded-xl bg-brand-blue-600 text-white font-bold text-xs"
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

