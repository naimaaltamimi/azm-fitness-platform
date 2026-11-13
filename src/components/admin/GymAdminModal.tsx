import React, { useState, useEffect } from 'react';
import { Gym, GymPricingPlan, GymWorkingHours } from '../../types';
import { Modal } from '../common/Modal';
import { Building2, MapPin, Phone, DollarSign, ShieldCheck } from 'lucide-react';

interface GymAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  gym?: Gym | null;
  onSave: (gymData: Partial<Gym>) => void;
}

export const GymAdminModal: React.FC<GymAdminModalProps> = ({
  isOpen,
  onClose,
  gym,
  onSave
}) => {
  const [nameAr, setNameAr] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [neighborhood, setNeighborhood] = useState('الشرج');
  const [addressText, setAddressText] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [monthlyPrice, setMonthlyPrice] = useState(15000);
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [featuresText, setFeaturesText] = useState('');
  const [isVerified, setIsVerified] = useState(true);
  const [featured, setFeatured] = useState(false);

  useEffect(() => {
    if (gym) {
      setNameAr(gym.nameAr || '');
      setNameEn(gym.nameEn || '');
      setNeighborhood(gym.neighborhood || 'الشرج');
      setAddressText(gym.addressText || '');
      setPhone(gym.phone || '');
      setWhatsapp(gym.whatsapp || '');
      setMonthlyPrice(gym.pricingPlans?.[0]?.priceYer || 15000);
      setShortDescription(gym.shortDescription || '');
      setFullDescription(gym.fullDescription || '');
      setCoverImage(gym.coverImage || '');
      setFeaturesText((gym.features || []).join('\n'));
      setIsVerified(gym.isVerified !== undefined ? gym.isVerified : true);
      setFeatured(gym.featured || false);
    } else {
      setNameAr('');
      setNameEn('');
      setNeighborhood('الشرج');
      setAddressText('');
      setPhone('');
      setWhatsapp('');
      setMonthlyPrice(15000);
      setShortDescription('');
      setFullDescription('');
      setCoverImage('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=85');
      setFeaturesText('أجهزة قوة ومقاومة حديثة مستوردة\nمنطقة كارديو وأجهزة سير ذكية\nإشراف ومتابعة أسبوعية من كباتن معتمدين\nتكييف مركزي متكامل وغرف تبديل نظيفة');
      setIsVerified(true);
      setFeatured(false);
    }
  }, [gym, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const parsedFeatures = featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    const defaultPricing: GymPricingPlan[] = gym?.pricingPlans?.length
      ? [
          {
            ...gym.pricingPlans[0],
            priceYer: Number(monthlyPrice)
          },
          ...gym.pricingPlans.slice(1)
        ]
      : [
          {
            id: 'plan-month-' + Date.now().toString(36),
            name: 'اشتراك اللياقة الشهري',
            period: 'شهر واحد',
            priceYer: Number(monthlyPrice),
            features: ['دخول مفتوح لكافة الأجهزة والكارديو', 'تقييم بدني مبدئي', 'استخدام الخزانات والمرافق'],
            isPopular: true
          },
          {
            id: 'plan-3months-' + Date.now().toString(36),
            name: 'باقة التحدي (3 أشهر)',
            period: '3 أشهر',
            priceYer: Number(monthlyPrice) * 2.7,
            features: ['دخول غير محدود لـ 90 يوماً', 'متابعة دورية للدهون والعضلات', 'خطة غذائية ساحلية']
          }
        ];

    const defaultWorkingHours: GymWorkingHours[] = gym?.workingHours?.length
      ? gym.workingHours
      : [
          {
            period: 'الفترة الصباحية',
            days: 'من السبت إلى الخميس',
            hours: '06:00 صباحاً - 11:00 صباحاً',
            targetGroup: 'رجال'
          },
          {
            period: 'الفترة المسائية',
            days: 'من السبت إلى الخميس',
            hours: '03:30 عصراً - 11:30 مساءً',
            targetGroup: 'رجال'
          }
        ];

    onSave({
      nameAr,
      nameEn: nameEn || nameAr,
      neighborhood,
      addressText: addressText || `المكلا - حي ${neighborhood}`,
      phone,
      whatsapp,
      shortDescription: shortDescription || `صالة تدريب متكاملة للياقة وبناء الأجسام في المكلا بمنطقة ${neighborhood}`,
      fullDescription: fullDescription || shortDescription || 'مركز رياضي مجهز بأحدث المعدات والأجهزة الرياضية بإشراف كباتن معتمدين.',
      coverImage: coverImage || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=85',
      galleryImages: gym?.galleryImages?.length ? gym.galleryImages : [coverImage],
      features: parsedFeatures.length > 0 ? parsedFeatures : ['أجهزة مقاومة متطورة', 'تكييف مركزي', 'إشراف كباتن'],
      workingHours: defaultWorkingHours,
      pricingPlans: defaultPricing,
      city: 'المكلا',
      isVerified,
      featured
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={gym ? 'تعديل بيانات الصالة الرياضية' : 'إضافة صالة رياضية جديدة للمنظومة'}
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-right font-['Cairo',sans-serif]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              اسم الصالة بالعربية *
            </label>
            <input
              type="text"
              required
              value={nameAr}
              onChange={(e) => setNameAr(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#2878B8] outline-none"
              placeholder="مثال: صالة النخبة الرياضية"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              اسم الصالة بالإنجليزية
            </label>
            <input
              type="text"
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#2878B8] outline-none"
              placeholder="مثال: Elite Gym Mukalla"
              dir="ltr"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              الحي في المكلا *
            </label>
            <select
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#2878B8] outline-none bg-white"
            >
              <option value="الشرج">الشرج</option>
              <option value="خلف">خلف</option>
              <option value="فوة المتضررين">فوة المتضررين</option>
              <option value="فوة القديمة">فوة القديمة</option>
              <option value="ديس المكلا">ديس المكلا</option>
              <option value="المكلا القديمة">المكلا القديمة</option>
              <option value="روكب">روكب</option>
              <option value="بويش">بويش</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              رقم الهاتف / الاتصال
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#2878B8] outline-none"
              placeholder="770123456"
              dir="ltr"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              سعر الاشتراك الشهري (ر.ي) *
            </label>
            <input
              type="number"
              required
              min={5000}
              step={500}
              value={monthlyPrice}
              onChange={(e) => setMonthlyPrice(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#2878B8] outline-none font-mono"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            العنوان بالتفصيل
          </label>
          <input
            type="text"
            value={addressText}
            onChange={(e) => setAddressText(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#2878B8] outline-none"
            placeholder="مثال: المكلا - الشارع العام بجانب جسر الشهيد"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            رابط صورة الواجهة / الغلاف (Image URL)
          </label>
          <input
            type="url"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#2878B8] outline-none"
            placeholder="https://images.unsplash.com/..."
            dir="ltr"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            نبذة تعريفية مختصرة
          </label>
          <textarea
            rows={2}
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#2878B8] outline-none"
            placeholder="وصف موجز يظهر في بطاقة الصالة في الدليل والصفحة الرئيسية..."
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            مميزات الصالة (ميزة واحدة في كل سطر)
          </label>
          <textarea
            rows={3}
            value={featuresText}
            onChange={(e) => setFeaturesText(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#2878B8] outline-none font-sans"
            placeholder="أجهزة مقاومة حديثة&#10;منطقة كارديو واسعة&#10;تكييف مركزي"
          />
        </div>

        <div className="flex items-center gap-6 pt-2">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isVerified}
              onChange={(e) => setIsVerified(e.target.checked)}
              className="w-4 h-4 rounded text-[#2878B8] accent-[#2878B8]"
            />
            <span className="text-xs font-bold text-slate-700">صالة معتمدة وموثقة ميدانياً</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-4 h-4 rounded text-[#D9AD55] accent-[#D9AD55]"
            />
            <span className="text-xs font-bold text-slate-700">تمييز في الواجهة الرئيسية</span>
          </label>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition-colors"
          >
            إلغاء
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-xl bg-[#2878B8] hover:bg-[#1f639a] text-white text-xs font-bold shadow-md shadow-[#2878B8]/20 transition-all"
          >
            {gym ? 'حفظ التعديلات' : 'إضافة الصالة'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default GymAdminModal;
