import React, { useState, useEffect } from 'react';
import { Trainer } from '../../types';
import { Modal } from '../common/Modal';
import { UserCheck, Instagram, MapPin, Award, CheckCircle, Shield } from 'lucide-react';

interface TrainerAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  trainer?: Trainer | null;
  onSave: (trainerData: Partial<Trainer>) => void;
}

export const TrainerAdminModal: React.FC<TrainerAdminModalProps> = ({
  isOpen,
  onClose,
  trainer,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [neighborhood, setNeighborhood] = useState('الشرج');
  const [experienceYears, setExperienceYears] = useState(3);
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [certificationsText, setCertificationsText] = useState('');
  const [instagramUsername, setInstagramUsername] = useState('');
  const [isVerified, setIsVerified] = useState(true);

  useEffect(() => {
    if (trainer) {
      setName(trainer.name || '');
      setSpecialty(trainer.specialty || '');
      setNeighborhood(trainer.neighborhood || 'الشرج');
      setExperienceYears(trainer.experienceYears || 3);
      setPhone(trainer.phone || '');
      setBio(trainer.bio || '');
      setCertificationsText((trainer.certifications || []).join('\n'));
      setInstagramUsername((trainer as any).instagramUsername || '');
      setIsVerified(trainer.isVerified !== undefined ? trainer.isVerified : true);
    } else {
      setName('');
      setSpecialty('');
      setNeighborhood('الشرج');
      setExperienceYears(3);
      setPhone('');
      setBio('');
      setCertificationsText('');
      setInstagramUsername('');
      setIsVerified(true);
    }
  }, [trainer, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const certs = certificationsText
      .split('\n')
      .map((c) => c.trim())
      .filter(Boolean);

    onSave({
      name,
      specialty,
      neighborhood,
      experienceYears: Number(experienceYears),
      phone,
      bio,
      certifications: certs.length > 0 ? certs : ['شهادة تدريب لياقة بدنية معتمدة'],
      city: 'المكلا',
      isVerified,
      avatarUrl:
        trainer?.avatarUrl ||
        'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=600&q=80',
      availableForPersonalTraining: true,
      ...(instagramUsername
        ? {
            instagramUsername,
            instagramUrl: `https://instagram.com/${instagramUsername.replace('@', '')}`,
          }
        : {}),
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={trainer ? 'تعديل بيانات الكابتن' : 'إضافة كابتن جديد للمنظومة'}
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-right">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            اسم الكابتن الثلاثي *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-blue-500 outline-none"
            placeholder="مثال: الكابتن أحمد سالم العمودي"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              التخصص التدريبي *
            </label>
            <input
              type="text"
              required
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-blue-500 outline-none"
              placeholder="مثال: كمال أجسام وتغذية رياضية"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              حي التدريب بالمكلا *
            </label>
            <select
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-blue-500 outline-none"
            >
              <option value="الشرج">الشرج</option>
              <option value="فوة المتضررين">فوة المتضررين</option>
              <option value="ديس المكلا">ديس المكلا</option>
              <option value="المكلا القديمة">المكلا القديمة</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              سنوات الخبرة الميدانية
            </label>
            <input
              type="number"
              min={1}
              max={30}
              value={experienceYears}
              onChange={(e) => setExperienceYears(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              حساب Instagram (اختياري)
            </label>
            <div className="relative">
              <input
                type="text"
                value={instagramUsername}
                onChange={(e) => setInstagramUsername(e.target.value)}
                className="w-full pl-3.5 pr-8 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-blue-500 outline-none"
                placeholder="coach_ahmed"
              />
              <Instagram className="w-4 h-4 text-slate-400 absolute right-2.5 top-3" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            النبذة التعريفية وأسلوب التدريب
          </label>
          <textarea
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-blue-500 outline-none resize-none"
            placeholder="اكتب نبذة مختصرة عن الكابتن وخبراته في تدريب أبناء المكلا..."
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            الشهادات والاعتمادات (شهادة بكل سطر)
          </label>
          <textarea
            rows={2}
            value={certificationsText}
            onChange={(e) => setCertificationsText(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-blue-500 outline-none resize-none"
            placeholder="شهادة تدريب لياقة معتمدة&#10;دورة إنعاش قلبي وإسعافات رياضية"
          />
        </div>

        <div className="pt-2 flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
            <input
              type="checkbox"
              checked={isVerified}
              onChange={(e) => setIsVerified(e.target.checked)}
              className="rounded text-brand-blue-600 focus:ring-brand-blue-500 w-4 h-4"
            />
            <span>توثيق المدرب ككابتن معتمد رسمياً</span>
          </label>
        </div>

        <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors"
          >
            إلغاء
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-brand-blue-600 hover:bg-brand-blue-700 text-white text-xs font-bold shadow-md shadow-brand-blue-600/20 active:scale-95 transition-all"
          >
            {trainer ? 'حفظ التعديلات' : 'إضافة الكابتن'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default TrainerAdminModal;
