import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MUKALLA_GYMS } from '../data/mukallaGymsData';
import { EmptyState } from '../components/common/EmptyState';
import {
  MapPin,
  Phone,
  Clock,
  CheckCircle,
  Dumbbell,
  ArrowRight,
  ShieldCheck,
  CalendarCheck,
  Building,
  Share2
} from 'lucide-react';

export const GymDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const gym = MUKALLA_GYMS.find((g) => g.slug === id || g.id === id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!gym) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <EmptyState
          icon={Building}
          title="الصالة غير متوفرة"
          description="لم نتمكن من العثور على الصالة المطلوبة، ربما تم تغيير الرابط أو غير مسجلة في المكلا."
          actionText="العودة لدليل صالات المكلا"
          actionLink="/gyms"
        />
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${gym.nameAr} - عزم المكلا`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('تم نسخ رابط الصالة إلى الحافظة!');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between text-xs text-slate-500 gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 flex-wrap min-w-0">
          <Link to="/" className="hover:text-brand-blue-600 shrink-0">الرئيسية</Link>
          <span>/</span>
          <Link to="/gyms" className="hover:text-brand-blue-600 shrink-0">صالات المكلا</Link>
          <span>/</span>
          <span className="text-slate-900 font-bold truncate max-w-[140px] sm:max-w-none">{gym.nameAr}</span>
        </div>

        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold shrink-0"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">مشاركة الصالة</span>
          <span className="sm:hidden">مشاركة</span>
        </button>
      </div>

      {/* Main Gym Showcase & Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Gallery Section */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-slate-900 shadow-lg border border-slate-200/90">
            <img
              src={gym.galleryImages[activeImageIndex] || gym.coverImage}
              alt={gym.nameAr}
              className="w-full h-full object-cover transition-all duration-300"
            />
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold">
                المكلا - {gym.neighborhood}
              </span>
              <span className="px-3 py-1 rounded-full bg-brand-green-500/90 text-white text-xs font-bold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                صالة معتمدة
              </span>
            </div>
          </div>

          {/* Thumbnails */}
          {gym.galleryImages.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
              {gym.galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-16 h-12 sm:w-24 sm:h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                    activeImageIndex === idx
                      ? 'border-brand-blue-600 ring-2 ring-brand-blue-500/30'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${gym.nameAr} ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Details & Booking Card */}
        <div className="lg:col-span-5 bg-white p-7 rounded-3xl border border-slate-200/90 shadow-xl space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-1">
              {gym.nameAr}
            </h1>
            <p className="text-sm font-mono text-slate-400">{gym.nameEn}</p>
            <div className="flex items-center gap-2 mt-3 text-xs text-slate-600">
              <MapPin className="w-4 h-4 text-brand-blue-600 shrink-0" />
              <span>{gym.addressText}</span>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3 text-xs text-slate-700">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-500">رقم الهاتف / الاستفسار:</span>
              <span className="font-bold font-mono text-brand-blue-700" dir="ltr">
                {gym.phone}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-500">المدينة:</span>
              <span className="font-bold text-slate-900">المكلا - حضرموت</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-500">الحالة:</span>
              <span className="font-bold text-brand-green-600 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                مفتوحة ومستقبلة للمشتركين
              </span>
            </div>
          </div>

          {/* Quick CTA to Subscribe */}
          <div className="space-y-3">
            <Link
              to={`/gyms/${gym.slug}/subscribe`}
              className="w-full py-3.5 px-6 rounded-2xl bg-brand-blue-600 hover:bg-brand-blue-700 text-white font-bold text-sm shadow-lg shadow-brand-blue-600/25 active:scale-95 transition-all flex items-center justify-center gap-2 text-center"
            >
              <CalendarCheck className="w-5 h-5" />
              <span>طلب اشتراك فوري في هذه الصالة</span>
            </Link>

            <a
              href={`tel:${gym.phone.replace(/\s+/g, '')}`}
              className="w-full py-3 px-6 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-2 text-center"
            >
              <Phone className="w-4 h-4 text-brand-green-600" />
              <span>اتصال هاتفي مباشر بالصالة</span>
            </a>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-2 border-t border-slate-100">
            <ShieldCheck className="w-4 h-4 text-brand-green-500 shrink-0" />
            <span>يمكنك الدفع نقداً عند زيارة الصالة أو عبر التحويل المحلي.</span>
          </div>
        </div>
      </div>

      {/* Full Description & Amenities */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {/* About */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-brand-blue-600" />
              عن {gym.nameAr}
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
              {gym.fullDescription}
            </p>
            {gym.notes && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
                <strong>ملاحظة هامة للمشتركين: </strong>
                {gym.notes}
              </div>
            )}
          </div>

          {/* Features List */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900">المميزات والتجهيزات المتاحة</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {gym.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-800 text-xs font-semibold"
                >
                  <div className="w-5 h-5 rounded-full bg-brand-green-100 text-brand-green-600 flex items-center justify-center shrink-0">
                    ✓
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Working Hours */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-brand-blue-600" />
              مواعيد العمل والفترات التدريبية
            </h2>
            {/* Desktop Table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400">
                    <th className="py-2.5">الفترة</th>
                    <th className="py-2.5">الأيام</th>
                    <th className="py-2.5">التوقيت</th>
                    <th className="py-2.5">الفئة المخصصة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {gym.workingHours.map((wh, idx) => (
                    <tr key={idx} className="text-slate-700">
                      <td className="py-3 font-bold text-slate-900">{wh.period}</td>
                      <td className="py-3">{wh.days}</td>
                      <td className="py-3 font-mono font-semibold text-brand-blue-700">{wh.hours}</td>
                      <td className="py-3">
                        <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold text-[11px]">
                          {wh.targetGroup}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile Cards */}
            <div className="sm:hidden space-y-3">
              {gym.workingHours.map((wh, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-900">{wh.period}</span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-semibold text-[10px]">{wh.targetGroup}</span>
                  </div>
                  <div className="text-slate-600">{wh.days}</div>
                  <div className="font-mono font-bold text-brand-blue-700">{wh.hours}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing Plans Sidebar (Inspired by Coach Sheikha's pkg-card design) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-5">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-brand-blue-600 mb-1">
                <span>الاشتراكات المعتمدة</span>
              </div>
              <h3 className="text-xl font-black text-slate-900">باقات الاشتراك المتاحة</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                الأسعار بالريال اليمني ومحددة رسمياً من إدارة الصالة مباشرة دون أي عمولات.
              </p>
            </div>

            <div className="space-y-5">
              {gym.pricingPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`pkg-card ${
                    plan.isPopular
                      ? 'border-brand-blue-500 bg-gradient-to-b from-blue-50/40 to-white ring-2 ring-brand-blue-500/20 shadow-md'
                      : 'border-slate-200 bg-white hover:border-brand-blue-300'
                  }`}
                >
                  {plan.isPopular && (
                    <span className="pkg-card-badge">
                      الأكثر طلباً
                    </span>
                  )}

                  <div className="text-center pt-1 mb-3">
                    <h4 className="font-extrabold text-slate-900 text-base">{plan.name}</h4>
                    <span className="text-xs font-semibold text-slate-500">مدة الاشتراك: {plan.period}</span>
                  </div>

                  <div className="text-center my-2 py-2 border-y border-slate-100">
                    <span className="text-3xl font-black text-brand-blue-700 tracking-tight">
                      {plan.priceYer.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-500 mr-1.5 font-bold">ريال يمني</span>
                  </div>

                  <ul className="space-y-2 text-xs text-slate-600 my-4 flex-1">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-brand-green-100 text-brand-green-600 flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
                          ✓
                        </span>
                        <span className="leading-snug">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={`/gyms/${gym.slug}/subscribe?plan=${plan.id}`}
                    className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all text-center min-h-[44px] ${
                      plan.isPopular
                        ? 'bg-brand-blue-600 hover:bg-brand-blue-700 text-white shadow-md shadow-brand-blue-600/30 active:scale-95'
                        : 'bg-slate-100 hover:bg-brand-blue-50 text-slate-800 hover:text-brand-blue-700 border border-slate-200/80 active:scale-95'
                    }`}
                  >
                    <span>طلب اشتراك في هذه الباقة</span>
                    <ArrowRight className="w-4 h-4 rotate-180" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

