import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { storageService } from '../services/storageService';
import { MUKALLA_GYMS } from '../data/mukallaGymsData';
import { EmptyState } from '../components/common/EmptyState';
import {
  MapPin,
  Phone,
  Clock,
  CheckCircle2,
  Dumbbell,
  ArrowRight,
  ShieldCheck,
  CalendarCheck,
  Building,
  Share2,
  MessageCircle,
  Sparkles,
  Users2
} from 'lucide-react';

export const GymDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const gym = storageService.getGymById(id || '') || MUKALLA_GYMS.find((g) => g.slug === id || g.id === id);

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
        title: `${gym.nameAr} - منصة عزم المكلا`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('تم نسخ رابط الصالة إلى الحافظة!');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 font-['Cairo',sans-serif]" dir="rtl">
      
      {/* ─── Breadcrumb Navigation & Top Action ─── */}
      <div className="flex items-center justify-between text-xs text-[#536559] gap-2 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap min-w-0">
          <Link to="/" className="hover:text-[#1F2722] font-semibold transition-colors">الرئيسية</Link>
          <span className="text-[#C8BEAA]">/</span>
          <Link to="/gyms" className="hover:text-[#1F2722] font-semibold transition-colors">صالات المكلا</Link>
          <span className="text-[#C8BEAA]">/</span>
          <span className="text-[#1F2722] font-black truncate max-w-[160px] sm:max-w-none">{gym.nameAr}</span>
        </div>

        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#F0EBE3] bg-white text-[#1F2722] hover:bg-[#FAF8F5] text-xs font-bold shrink-0 shadow-sm transition-all"
        >
          <Share2 className="w-3.5 h-3.5 text-[#D97241]" />
          <span>مشاركة الصالة</span>
        </button>
      </div>

      {/* ─── Verification & Trust Header Banner ─── */}
      <div className="bg-[#FAF8F5] border border-[#F0EBE3] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#E5ECE7] text-[#617C69] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-black text-[#1F2722] flex items-center gap-2">
              <span>صالة معتمدة ومفحوصة ميدانياً 2026</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E5ECE7] text-[#617C69] font-bold">موثقة رسميـاً</span>
            </h4>
            <p className="text-xs text-[#536559] mt-0.5">
              تم التحقق الميداني من خطوط الأجهزة الرياضية ومطابقة باقات الاشتراكات بالريال اليمني.
            </p>
          </div>
        </div>
        <div className="shrink-0 flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-[#D97241] bg-[#FDF6F2] px-3 py-1.5 rounded-lg border border-[#F5DACB]">
            أسعار رسمية معتمدة 100%
          </span>
        </div>
      </div>

      {/* ─── Main Gym Showcase & Gallery ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Gallery Section */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-slate-900 shadow-xl border border-[#F0EBE3]">
            <img
              src={gym.galleryImages[activeImageIndex] || gym.coverImage}
              alt={gym.nameAr}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-full bg-[#1F2722]/85 backdrop-blur-md text-white text-xs font-bold shadow-md">
                المكلا - {gym.neighborhood}
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-[#D97241] text-white text-xs font-bold flex items-center gap-1 shadow-md">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>اشتراك فوري</span>
              </span>
            </div>
          </div>

          {/* Thumbnails */}
          {gym.galleryImages.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
              {gym.galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-14 sm:w-28 sm:h-20 rounded-2xl overflow-hidden shrink-0 border-2 transition-all duration-300 ${
                    activeImageIndex === idx
                      ? 'border-[#D97241] ring-4 ring-[#D97241]/20 scale-105'
                      : 'border-transparent opacity-65 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${gym.nameAr} ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Details & Booking Card */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-[#F0EBE3] shadow-[0_10px_35px_-10px_rgba(31,39,34,0.08)] space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#1F2722] mb-1">
              {gym.nameAr}
            </h1>
            <p className="text-xs font-mono font-bold text-[#7D9683]">{gym.nameEn}</p>
            <div className="flex items-center gap-2 mt-3 text-xs text-[#536559]">
              <MapPin className="w-4 h-4 text-[#D97241] shrink-0" />
              <span className="font-medium">{gym.addressText}</span>
            </div>
          </div>

          <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#F0EBE3] space-y-3 text-xs">
            {gym.phone ? (
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#536559]">الهاتف / الاستفسار:</span>
                <span className="font-bold font-mono text-[#D97241]" dir="ltr">
                  {gym.phone}
                </span>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#536559]">طريقة التواصل:</span>
                <span className="font-bold text-[#1F2722]">
                  الاستقبال المباشر بالصالة • اشتراك فوري
                </span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#536559]">المدينة والحي:</span>
              <span className="font-black text-[#1F2722]">المكلا - {gym.neighborhood}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#536559]">الحالة الحالية:</span>
              <span className="font-bold text-[#617C69] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>مفتوحة وتستقبل المشتركين</span>
              </span>
            </div>
          </div>

          {/* Quick CTA to Subscribe & WhatsApp */}
          <div className="space-y-3 pt-1">
            <Link
              to={`/gyms/${gym.slug}/subscribe`}
              className="w-full py-3.5 px-6 rounded-2xl bg-[#D97241] hover:bg-[#C75F2F] text-white font-bold text-sm shadow-xl shadow-[#D97241]/25 hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-2 text-center"
            >
              <CalendarCheck className="w-5 h-5" />
              <span>طلب اشتراك فوري في هذه الصالة</span>
            </Link>

            {/* Smart WhatsApp Connect */}
            <a
              href={`https://wa.me/967770000000?text=${encodeURIComponent(`مرحباً إدارة ${gym.nameAr}، أود الاستفسار والتسجيل عبر منصة عزم.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-6 rounded-2xl border border-[#D97241] text-[#D97241] hover:bg-[#FDF6F2] font-bold text-xs transition-all flex items-center justify-center gap-2 text-center"
            >
              <MessageCircle className="w-4 h-4" />
              <span>استفسار فوري عبر واتساب الصالة</span>
            </a>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[#536559] pt-3 border-t border-[#F0EBE3]">
            <ShieldCheck className="w-4 h-4 text-[#7D9683] shrink-0" />
            <span>الدفع نقداً عند زيارة الصالة أو عبر الحوالات المصرفية المحلية.</span>
          </div>
        </div>
      </div>

      {/* ─── Full Description & Amenities ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (Content & Working Hours) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* About */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#F0EBE3] shadow-sm space-y-4">
            <h2 className="text-xl font-black text-[#1F2722] flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-[#D97241]" />
              <span>عن {gym.nameAr}</span>
            </h2>
            <p className="text-[#536559] text-sm leading-relaxed whitespace-pre-line font-medium">
              {gym.fullDescription}
            </p>
            {gym.notes && (
              <div className="p-4 bg-[#FAF8F5] border border-[#EAE5DA] rounded-2xl text-xs text-[#536559]">
                <strong className="text-[#1F2722] block mb-1">تنبيه هام للمشتركين: </strong>
                {gym.notes}
              </div>
            )}
          </div>

          {/* Features List */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#F0EBE3] shadow-sm space-y-4">
            <h2 className="text-xl font-black text-[#1F2722] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#7D9683]" />
              <span>التجهيزات والمميزات المتاحة</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {gym.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#F0EBE3] text-[#1F2722] text-xs font-bold"
                >
                  <div className="w-5 h-5 rounded-full bg-[#E5ECE7] text-[#617C69] flex items-center justify-center shrink-0 text-xs">
                    ✓
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Working Hours Cards (Modern Architectural Split) */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#F0EBE3] shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-[#1F2722] flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#D97241]" />
                <span>مواعيد العمل والفترات التدريبية</span>
              </h2>
              <span className="text-xs px-3 py-1 rounded-full bg-[#E5ECE7] text-[#617C69] font-bold">
                توقيت منتظم
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {gym.workingHours.map((wh, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#F0EBE3] space-y-3 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-black text-sm text-[#1F2722]">{wh.period}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#1F2722] text-white font-bold text-[10px]">
                      {wh.targetGroup}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs text-[#536559] font-medium">{wh.days}</div>
                    <div className="text-base font-black text-[#D97241] font-mono">{wh.hours}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Pricing Plans Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#F0EBE3] shadow-sm space-y-5">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-black text-[#7D9683] mb-1">
                <span>باقات الاشتراك المؤكدة</span>
              </div>
              <h3 className="text-xl font-black text-[#1F2722]">خيارات الاشتراك</h3>
              <p className="text-xs text-[#536559] mt-1 leading-relaxed">
                الأسعار بالريال اليمني ومحددة رسمياً من إدارة الصالة بدون أي رسوم خفية.
              </p>
            </div>

            <div className="space-y-5">
              {gym.pricingPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative p-5 rounded-3xl border transition-all duration-300 ${
                    plan.isPopular
                      ? 'border-[#D97241] bg-gradient-to-b from-[#FDF6F2] to-white shadow-md ring-2 ring-[#D97241]/20'
                      : 'border-[#F0EBE3] bg-white hover:border-[#D97241]/30'
                  }`}
                >
                  {plan.isPopular && (
                    <span className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-[#D97241] text-white text-[10px] font-black shadow-md">
                      الأكثر طلباً 🔥
                    </span>
                  )}

                  <div className="text-center pt-1 mb-3">
                    <h4 className="font-black text-[#1F2722] text-base">{plan.name}</h4>
                    <span className="text-xs font-bold text-[#7D9683]">المدة: {plan.period}</span>
                  </div>

                  <div className="text-center my-3 py-2 border-y border-[#F0EBE3]">
                    <span className="text-3xl font-black text-[#D97241] font-mono tracking-tight">
                      {plan.priceYer.toLocaleString()}
                    </span>
                    <span className="text-xs text-[#536559] mr-1.5 font-bold">ريال يمني</span>
                  </div>

                  <ul className="space-y-2 text-xs text-[#536559] my-4">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-[#E5ECE7] text-[#617C69] flex items-center justify-center shrink-0 text-[10px] font-black mt-0.5">
                          ✓
                        </span>
                        <span className="leading-snug">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="space-y-2 pt-2">
                    <Link
                      to={`/gyms/${gym.slug}/subscribe?plan=${plan.id}`}
                      className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all text-center min-h-[44px] ${
                        plan.isPopular
                          ? 'bg-[#D97241] hover:bg-[#C75F2F] text-white shadow-lg shadow-[#D97241]/25 active:scale-95'
                          : 'bg-[#FAF8F5] hover:bg-[#FDF6F2] text-[#1F2722] hover:text-[#D97241] border border-[#F0EBE3] active:scale-95'
                      }`}
                    >
                      <span>طلب اشتراك في هذه الباقة</span>
                      <ArrowRight className="w-4 h-4 rotate-180" />
                    </Link>

                    {/* WhatsApp plan booking */}
                    <a
                      href={`https://wa.me/967770000000?text=${encodeURIComponent(`مرحباً إدارة ${gym.nameAr}، أود الاستفسار والتسجيل في (${plan.name} - ${plan.priceYer.toLocaleString()} ريال) عبر منصة عزم.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 rounded-lg text-center block text-[11px] font-bold text-[#536559] hover:text-[#D97241] transition-colors"
                    >
                      أو حجز عبر واتساب مباشرة
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GymDetailsPage;
