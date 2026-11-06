import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { storageService } from '../services/storageService';
import { useAuth } from '../context/AuthContext';
import { EmptyState } from '../components/common/EmptyState';
import { Modal } from '../components/common/Modal';
import {
  UserCheck,
  MapPin,
  Award,
  Calendar,
  Phone,
  CheckCircle2,
  Clock,
  Dumbbell,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export const TrainerDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated, loginAsDemo } = useAuth();

  const trainers = storageService.getTrainers();
  const trainer = trainers.find((t) => t.id === id);

  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [sessionDate, setSessionDate] = useState(new Date().toISOString().split('T')[0]);
  const [sessionTime, setSessionTime] = useState('05:00 عصراً');
  const [sessionGoal, setSessionGoal] = useState('خسارة وزن وبناء لياقة');
  const [isBooked, setIsBooked] = useState(false);

  if (!trainer) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <EmptyState
          icon={UserCheck}
          title="المدرب غير موجود"
          description="لم يتم العثور على ملف المدرب المطلوب في دليل مدربي المكلا."
          actionText="العودة لدليل المدربين"
          actionLink="/trainers"
        />
      </div>
    );
  }

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) return;

    setIsBooked(true);
    setTimeout(() => {
      setIsBooked(false);
      setIsBookModalOpen(false);
      alert('تم إرسال طلب حجز الجلسة بنجاح! سيتواصل معك الكابتن لتأكيد التوقيت المناسب.');
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-terracotta-600 transition-colors">الرئيسية</Link>
        <span>/</span>
        <Link to="/trainers" className="hover:text-terracotta-600 transition-colors">دليل المدربين</Link>
        <span>/</span>
        <span className="text-forest-900 font-bold">{trainer.name}</span>
      </div>

      {/* Main Profile Header */}
      <div className="bg-white rounded-3xl border border-sand-200 shadow-xl overflow-hidden p-6 sm:p-8 md:p-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-8 border-b border-sand-100">
          <img
            src={trainer.avatarUrl}
            alt={trainer.name}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover ring-4 ring-sand-200 shadow-md shrink-0"
          />
          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-forest-900">{trainer.name}</h1>
              {trainer.isVerified && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sage-50 text-sage-800 border border-sage-200 text-xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sage-600" />
                  مدرب معتمد بالمكلا
                </span>
              )}
            </div>
            <p className="text-sm font-bold text-terracotta-600">{trainer.specialty}</p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-slate-400" />
                المكلا - {trainer.neighborhood}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                خبرة {trainer.experienceYears} سنوات ميدانية
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsBookModalOpen(true)}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold text-sm shadow-md shadow-terracotta-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 min-h-[44px]"
          >
            <Calendar className="w-4 h-4" />
            <span>حجز جلسة تدريبية</span>
          </button>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 pt-8">
          {/* Bio & Philosophy */}
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-3">
              <h3 className="text-base font-bold text-forest-900 flex items-center gap-2">
                <Dumbbell className="w-4 h-4 text-terracotta-500" />
                النبذة المهنية والأسلوب التدريبي
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                {trainer.bio}
              </p>
            </div>

            {/* Certifications */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-forest-900 flex items-center gap-2">
                <Award className="w-4 h-4 text-sage-600" />
                الشهادات والاعتمادات الرسمية
              </h3>
              <div className="space-y-2">
                {trainer.certifications.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-xl bg-sand-50/70 border border-sand-100 text-forest-900 text-xs font-semibold"
                  >
                    <div className="w-6 h-6 rounded-lg bg-sage-100 text-sage-700 flex items-center justify-center shrink-0">
                      ✓
                    </div>
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Info Sidebar */}
          <div className="space-y-4">
            <div className="p-6 bg-sand-50/70 rounded-2xl border border-sand-200 space-y-4 text-xs">
              <h4 className="font-bold text-forest-900 text-sm">بيانات التعاقد والتدريب</h4>

              {trainer.activeGymAffiliation && (
                <div>
                  <span className="text-slate-500 block mb-1">الصالة التي يدرب بها:</span>
                  <span className="font-bold text-forest-900">{trainer.activeGymAffiliation}</span>
                </div>
              )}

              {trainer.sessionPriceYer && (
                <div>
                  <span className="text-slate-500 block mb-1">سعر الجلسة الاستشارية / الخاصة:</span>
                  <span className="font-black text-terracotta-600 text-base">
                    {trainer.sessionPriceYer.toLocaleString()} ريال يمني
                  </span>
                </div>
              )}

              {trainer.phone && (
                <div className="pt-2 border-t border-sand-200">
                  <span className="text-slate-500 block mb-1">هاتف التواصل المباشر:</span>
                  <a
                    href={`tel:${trainer.phone}`}
                    className="font-bold font-mono text-forest-900 hover:text-terracotta-600 transition-colors flex items-center gap-1.5"
                    dir="ltr"
                  >
                    <Phone className="w-3.5 h-3.5 text-terracotta-500" />
                    {trainer.phone}
                  </a>
                </div>
              )}
            </div>

            <div className="p-4 bg-sand-100/70 rounded-2xl border border-sand-200 text-xs text-forest-900 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-sage-600 shrink-0 mt-0.5" />
              <span>
                كافة جلسات التدريب الشخصي تتم بالتنسيق داخل الصالات الرياضية المعتمدة في المكلا.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Session Modal */}
      <Modal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        title={`حجز جلسة خاصة مع ${trainer.name}`}
      >
        {!isAuthenticated ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 mx-auto flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-forest-900">سجل دخولك لحجز الجلسة</h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              يلزم تسجيل الدخول لتسجيل اسمك ورقم هاتفك لدى الكابتن للتنسيق.
            </p>
            <div className="flex justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => loginAsDemo('trainee')}
                className="px-4 py-2 bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold text-xs rounded-xl shadow-sm"
              >
                دخول سريع كمتدرب
              </button>
            </div>
          </div>
        ) : isBooked ? (
          <div className="text-center py-8 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-sage-600 mx-auto animate-bounce" />
            <h4 className="font-bold text-forest-900">تم حجز الجلسة بنجاح!</h4>
            <p className="text-xs text-slate-600">سيتم إشعار الكابتن والتواصل معك هاتفياً.</p>
          </div>
        ) : (
          <form onSubmit={handleConfirmBooking} className="space-y-4 text-right">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">تاريخ الجلسة</label>
              <input
                type="date"
                required
                value={sessionDate}
                onChange={(e) => setSessionDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-terracotta-500 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">التوقيت المفضل</label>
              <select
                value={sessionTime}
                onChange={(e) => setSessionTime(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-terracotta-500 text-xs bg-white"
              >
                <option value="09:00 صباحاً">09:00 صباحاً (فترة صباحية)</option>
                <option value="05:00 عصراً">05:00 عصراً (فترة ما بعد العصر)</option>
                <option value="08:00 مساءً">08:00 مساءً (فترة مسائية)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">الهدف من التدريب</label>
              <input
                type="text"
                required
                value={sessionGoal}
                onChange={(e) => setSessionGoal(e.target.value)}
                placeholder="مثال: تنشيف دهون، زيادة قوة، استشارة تمرين..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-terracotta-500 text-xs"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsBookModalOpen(false)}
                className="px-4 py-2 border border-sand-200 rounded-xl text-xs text-slate-600 hover:bg-sand-50"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold text-xs rounded-xl shadow-md shadow-terracotta-500/20"
              >
                تأكيد الحجز
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};
