import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { MUKALLA_GYMS } from '../data/mukallaGymsData';
import { useAuth } from '../context/AuthContext';
import { storageService } from '../services/storageService';
import {
  CalendarCheck,
  Building,
  CreditCard,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  LogIn
} from 'lucide-react';

export const SubscriptionRequestPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, loginAsDemo } = useAuth();

  const planParam = searchParams.get('plan');

  // Initial gym selection
  const selectedGymObj = MUKALLA_GYMS.find((g) => g.slug === id || g.id === id) || MUKALLA_GYMS[0];
  const [gymId, setGymId] = useState(selectedGymObj.id);

  const currentGym = MUKALLA_GYMS.find((g) => g.id === gymId) || MUKALLA_GYMS[0];

  // Pricing plan selection
  const initialPlan =
    currentGym.pricingPlans.find((p) => p.id === planParam) ||
    currentGym.pricingPlans[0];
  const [planId, setPlanId] = useState(initialPlan.id);

  // Form fields
  const [preferredShift, setPreferredShift] = useState<'morning' | 'evening'>('evening');
  const [paymentMethod, setPaymentMethod] = useState<'cash_at_gym' | 'kuraimi_exchange' | 'omgy_exchange'>('cash_at_gym');
  const [paymentReference, setPaymentReference] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Sync planId when gym changes
  useEffect(() => {
    if (!currentGym.pricingPlans.some((p) => p.id === planId)) {
      setPlanId(currentGym.pricingPlans[0].id);
    }
  }, [gymId, currentGym]);

  const activePlan = currentGym.pricingPlans.find((p) => p.id === planId) || currentGym.pricingPlans[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !user) {
      return;
    }

    setIsSubmitting(true);

    try {
      storageService.addSubscription({
        userId: user.id,
        userName: user.name,
        userPhone: user.phone,
        gymId: currentGym.id,
        gymName: currentGym.nameAr,
        planId: activePlan.id,
        planName: activePlan.name,
        priceYer: activePlan.priceYer,
        preferredShift,
        paymentMethod,
        paymentReference: paymentMethod !== 'cash_at_gym' ? paymentReference : undefined,
        status: 'pending',
        startDate,
        notes
      });

      setIsSuccess(true);
      setTimeout(() => {
        navigate('/my-orders');
      }, 1500);
    } catch {
      alert('حدث خطأ أثناء إرسال طلب الاشتراك');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-terracotta-600 transition-colors">الرئيسية</Link>
        <span>/</span>
        <Link to="/gyms" className="hover:text-terracotta-600 transition-colors">صالات المكلا</Link>
        <span>/</span>
        <span className="text-forest-900 font-bold">طلب الاشتراك</span>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-forest-900 via-forest-800 to-forest-950 text-white rounded-3xl p-6 sm:p-8 md:p-10 relative overflow-hidden shadow-xl border border-forest-800/60">
        <div className="absolute top-0 left-0 w-80 h-80 bg-terracotta-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sage-500/20 text-sage-300 text-xs font-bold border border-sage-500/30">
            <CalendarCheck className="w-3.5 h-3.5 text-sage-300" />
            <span>تسجيل واشتراك فوري</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            طلب اشتراك في صالات المكلا
          </h1>
          <p className="text-sand-200 text-xs sm:text-sm leading-relaxed">
            اختر الصالة والباقة المناسبة لميزانيتك وجدولك اليومي، واحجز مقعدك بكل سهولة وأمان.
          </p>
        </div>
      </div>

      {/* Auth Gate for Interactive Subscription */}
      {!isAuthenticated && (
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-3xl p-5 sm:p-8 space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <LogIn className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-amber-900">
                تسجيل الدخول مطلوب لإتمام طلب الاشتراك
              </h3>
              <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
                تصفح المنصة متاح بالكامل للزوار، ولكن لربط اشتراكك وحفظ بيانات الحجز في سجلك برقم هاتفك بالمكلا، يلزم تسجيل الدخول أو إنشاء حساب.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/login"
              className="px-5 py-2.5 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white text-xs font-bold shadow-sm shadow-terracotta-500/20"
            >
              تسجيل الدخول
            </Link>
            <Link
              to="/register"
              className="px-5 py-2.5 rounded-xl bg-white border border-sand-300 text-forest-800 text-xs font-bold hover:bg-sand-50"
            >
              إنشاء حساب جديد
            </Link>
            <button
              onClick={() => loginAsDemo('trainee')}
              className="px-4 py-2.5 rounded-xl bg-amber-200/70 hover:bg-amber-200 text-amber-900 text-xs font-bold transition-colors"
            >
              دخول سريع كمتدرب تجريبي (نقرة واحدة)
            </button>
          </div>
        </div>
      )}

      {/* Main Form */}
      {isSuccess ? (
        <div className="bg-white p-6 sm:p-12 rounded-3xl border border-sand-200 text-center space-y-4 shadow-xl">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-sage-100 text-sage-600 flex items-center justify-center mx-auto animate-bounce">
            <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-forest-900">تم تسجيل طلب الاشتراك بنجاح!</h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            تم إرسال طلب اشتراكك إلى إدارة <strong className="text-forest-900">{currentGym.nameAr}</strong>. يمكنك مراجعة كود الطلب ومتابعة حالته من صفحة طلباتي وحجوزاتي.
          </p>
          <div className="pt-4">
            <Link
              to="/my-orders"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-terracotta-500/20"
            >
              <span>الانتقال لطلباتي واشتراكاتي</span>
              <ArrowRight className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Gym & Plan Selection */}
          <div className="bg-white p-5 sm:p-7 rounded-3xl border border-sand-200 shadow-sm space-y-6">
            <h3 className="text-base font-bold text-forest-900 flex items-center gap-2">
              <Building className="w-5 h-5 text-terracotta-500" />
              <span>اختيار الصالة والباقة الرياضية</span>
            </h3>

            {/* Gym Select */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                الصالة الرياضية المعتمدة بالمكلا *
              </label>
              <select
                value={gymId}
                onChange={(e) => setGymId(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-terracotta-500 text-sm font-bold bg-white"
              >
                {MUKALLA_GYMS.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.nameAr} - حي {g.neighborhood}
                  </option>
                ))}
              </select>
            </div>

            {/* Plans Radios */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                اختر الباقة المناسبة *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {currentGym.pricingPlans.map((p) => {
                  const isSelected = p.id === planId;
                  return (
                    <div
                      key={p.id}
                      onClick={() => setPlanId(p.id)}
                      className={`cursor-pointer p-4 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-terracotta-500 bg-terracotta-50/50 shadow-sm'
                          : 'border-sand-200 hover:border-sand-300 bg-white'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-forest-900">{p.name}</span>
                          <span className={`w-3.5 h-3.5 rounded-full border-2 ${isSelected ? 'border-terracotta-500 bg-terracotta-500' : 'border-slate-300'}`} />
                        </div>
                        <p className="text-[11px] text-slate-500 mb-2">المدة: {p.period}</p>
                      </div>
                      <div className="text-left font-black text-terracotta-600 text-base" dir="ltr">
                        {p.priceYer.toLocaleString()} YER
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Schedule & Shift */}
          <div className="bg-white p-5 sm:p-7 rounded-3xl border border-sand-200 shadow-sm space-y-6">
            <h3 className="text-base font-bold text-forest-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-sage-600" />
              <span>فترة التمرين وتاريخ البدء</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  تاريخ بداية الاشتراك *
                </label>
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-terracotta-500 text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  الفترة التدريبية المفضلة *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPreferredShift('morning')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all min-h-[44px] ${
                      preferredShift === 'morning'
                        ? 'border-terracotta-500 bg-terracotta-50 text-terracotta-700'
                        : 'border-sand-200 text-slate-600 hover:bg-sand-50'
                    }`}
                  >
                    الفترة الصباحية
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreferredShift('evening')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all min-h-[44px] ${
                      preferredShift === 'evening'
                        ? 'border-terracotta-500 bg-terracotta-50 text-terracotta-700'
                        : 'border-sand-200 text-slate-600 hover:bg-sand-50'
                    }`}
                  >
                    الفترة المسائية
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                ملاحظات أو متطلبات خاصة (اختياري)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="مثال: لدي إصابة سابقة في الركبة / أود برنامج لياقة لتخفيف الوزن..."
                className="w-full px-4 py-2.5 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-terracotta-500 text-sm"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white p-5 sm:p-7 rounded-3xl border border-sand-200 shadow-sm space-y-6">
            <h3 className="text-base font-bold text-forest-900 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-amber-600" />
              <span>طريقة السداد المعتمدة في المكلا</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div
                onClick={() => setPaymentMethod('cash_at_gym')}
                className={`cursor-pointer p-4 rounded-2xl border-2 transition-all ${
                  paymentMethod === 'cash_at_gym'
                    ? 'border-terracotta-500 bg-terracotta-50/60 shadow-sm'
                    : 'border-sand-200 hover:border-sand-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-forest-900">نقداً بالصالة</span>
                  <span className={`w-3 h-3 rounded-full ${paymentMethod === 'cash_at_gym' ? 'bg-terracotta-500' : 'bg-slate-200'}`} />
                </div>
                <p className="text-[11px] text-slate-500">الدفع كاش عند الحضور وبدء التمرين</p>
              </div>

              <div
                onClick={() => setPaymentMethod('kuraimi_exchange')}
                className={`cursor-pointer p-4 rounded-2xl border-2 transition-all ${
                  paymentMethod === 'kuraimi_exchange'
                    ? 'border-terracotta-500 bg-terracotta-50/60 shadow-sm'
                    : 'border-sand-200 hover:border-sand-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-forest-900">بنك الكريمي</span>
                  <span className={`w-3 h-3 rounded-full ${paymentMethod === 'kuraimi_exchange' ? 'bg-terracotta-500' : 'bg-slate-200'}`} />
                </div>
                <p className="text-[11px] text-slate-500">تحويل لحساب الصالة لدى الكريمي</p>
              </div>

              <div
                onClick={() => setPaymentMethod('omgy_exchange')}
                className={`cursor-pointer p-4 rounded-2xl border-2 transition-all ${
                  paymentMethod === 'omgy_exchange'
                    ? 'border-terracotta-500 bg-terracotta-50/60 shadow-sm'
                    : 'border-sand-200 hover:border-sand-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-forest-900">العمقي للصرافة</span>
                  <span className={`w-3 h-3 rounded-full ${paymentMethod === 'omgy_exchange' ? 'bg-terracotta-500' : 'bg-slate-200'}`} />
                </div>
                <p className="text-[11px] text-slate-500">حوالة باسم الصالة عبر فروع العمقي</p>
              </div>
            </div>

            {paymentMethod !== 'cash_at_gym' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  رقم الحوالة / السند المرجعي للتحويل
                </label>
                <input
                  type="text"
                  value={paymentReference}
                  onChange={(e) => setPaymentReference(e.target.value)}
                  placeholder="أدخل رقم الحوالة للتأكيد الفوري..."
                  className="w-full px-4 py-2.5 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-terracotta-500 text-sm font-mono"
                  dir="ltr"
                />
              </div>
            )}
          </div>

          {/* Total & Submit Button */}
          <div className="bg-forest-900 text-white p-5 sm:p-7 rounded-3xl shadow-xl border border-forest-800/60 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs text-sand-300 block">إجمالي قيمة الاشتراك المستحق:</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-black text-terracotta-400">
                  {activePlan.priceYer.toLocaleString()}
                </span>
                <span className="text-xs text-sand-200 font-bold">ريال يمني</span>
              </div>
              <span className="text-[11px] text-sand-300/80 block mt-1">
                تشمل باقة: {activePlan.name} ({currentGym.nameAr})
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !isAuthenticated}
              className={`w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-lg min-h-[48px] ${
                !isAuthenticated
                  ? 'bg-forest-800 text-sand-400 cursor-not-allowed'
                  : 'bg-terracotta-500 hover:bg-terracotta-600 text-white shadow-terracotta-500/30 active:scale-95'
              }`}
            >
              <ShieldCheck className="w-5 h-5 text-sage-300" />
              <span>{isSubmitting ? 'جاري الإرسال...' : 'تأكيد وإرسال طلب الاشتراك'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
