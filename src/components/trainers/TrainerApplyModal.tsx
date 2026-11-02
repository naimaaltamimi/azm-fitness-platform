import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { storageService } from '../../services/storageService';
import { CheckCircle2, UserCheck, AlertCircle } from 'lucide-react';

interface TrainerApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const TrainerApplyModal: React.FC<TrainerApplyModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [neighborhood, setNeighborhood] = useState('الشرج');
  const [phone, setPhone] = useState('');
  const [experienceYears, setExperienceYears] = useState('4');
  const [bio, setBio] = useState('');
  const [certificationsText, setCertificationsText] = useState('');
  const [gymAffiliation, setGymAffiliation] = useState('سمارت جيم (Smart Gym)');
  const [sessionPrice, setSessionPrice] = useState('15000');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !specialty.trim()) return;

    const certs = certificationsText
      .split('\n')
      .map((c) => c.trim())
      .filter(Boolean);

    storageService.applyAsTrainer({
      name: `الكابتن / ${name.replace(/^الكابتن\s*\/\s*/, '')}`,
      specialty,
      bio: bio || 'مدرب لياقة بدنية معتمد في المكلا، متخصص في توجيه التمارين ومتابعة التطور البدني.',
      experienceYears: Number(experienceYears) || 3,
      city: 'المكلا',
      neighborhood,
      phone,
      avatarUrl: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=300&q=80',
      certifications: certs.length > 0 ? certs : ['شهادة تدريب معتمدة'],
      availableForPersonalTraining: true,
      sessionPriceYer: Number(sessionPrice) || 15000,
      isVerified: true, // verified for testing demo
      activeGymAffiliation: gymAffiliation
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onSuccess();
      onClose();
    }, 1500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="تسجيل كابتن / مدرب معتمد بالمكلا" maxWidth="lg">
      {isSubmitted ? (
        <div className="text-center py-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-brand-green-100 text-brand-green-600 mx-auto flex items-center justify-center animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h4 className="text-xl font-bold text-slate-800">تم تسجيل طلبك بنجاح كابتن!</h4>
          <p className="text-sm text-slate-600 max-w-sm mx-auto">
            تم توثيق بياناتك وإدراج ملفك الرياضي في دليل مدربي المكلا بمنصة عزم.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-right">
          <div className="p-3 bg-brand-blue-50 border border-brand-blue-100 rounded-xl flex items-start gap-3">
            <UserCheck className="w-5 h-5 text-brand-blue-600 shrink-0 mt-0.5" />
            <p className="text-xs text-brand-blue-900 leading-relaxed">
              وفقاً لقواعد منصة عزم، نقبل الكباتن والمدربين الحقيقيين الممارسين في صالات وأندية المكلا لضمان تجربة حقيقية للمتدربين.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">اسم الكابتن الثلاثي *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="مثال: سالم باحيدرة"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">رقم الهاتف / واتساب *</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+967 77..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue-500 text-sm"
                dir="ltr"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">التخصص الرياضي *</label>
              <input
                type="text"
                required
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                placeholder="مثال: مدرب كمال أجسام وتغذية"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">المنطقة في المكلا</label>
              <select
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue-500 text-sm bg-white"
              >
                <option value="الشرج">الشرج</option>
                <option value="فوه">فوه</option>
                <option value="ديس المكلا">ديس المكلا</option>
                <option value="المكلا القديمة">المكلا القديمة</option>
                <option value="40 شقة">40 شقة</option>
                <option value="بويش / روكب">بويش / روكب</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">سنوات الخبرة الميدانية</label>
              <input
                type="number"
                min="1"
                max="40"
                value={experienceYears}
                onChange={(e) => setExperienceYears(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">الصالة المعتمد بها حالياً في المكلا</label>
              <select
                value={gymAffiliation}
                onChange={(e) => setGymAffiliation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue-500 text-sm bg-white"
              >
                <option value="سمارت جيم (Smart Gym)">سمارت جيم (Smart Gym) - فوة المتضررين</option>
                <option value="المكلا جيم (Mukalla Gym)">المكلا جيم (Mukalla Gym) - الشرج فوق قاعة ميرال</option>
                <option value="قولدن جيم (Golden Gym)">قولدن جيم (Golden Gym) - الشرج</option>
                <option value="وينر جيم (Winner Gym)">وينر جيم (Winner Gym) - الشرج بجانب مارينا مول</option>
                <option value="باور جيم (Power Gym)">باور جيم (Power Gym) - ديس المكلا</option>
                <option value="مدرب خاص مستقل بالمكلا">مدرب خاص مستقل بالمكلا</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">الشهادات والدورات (شهادة في كل سطر)</label>
            <textarea
              rows={2}
              value={certificationsText}
              onChange={(e) => setCertificationsText(e.target.value)}
              placeholder="مثال:&#10;دبلوم تدريب اللياقة البدنية&#10;شهادة الإسعافات الأولية الرياضية"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">نبذة تعريفية للمتدربين</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="أخبر الرياضيين عن أسلوبك التدريبي وأهدافك معهم..."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue-500 text-sm"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-semibold"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-brand-blue-600 hover:bg-brand-blue-700 text-white text-sm font-bold shadow-md shadow-brand-blue-600/20 active:scale-95 transition-all"
            >
              تقديم وتوثيق الملف
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};

