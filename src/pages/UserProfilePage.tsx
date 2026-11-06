import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { EmptyState } from '../components/common/EmptyState';
import {
  User,
  Phone,
  Mail,
  MapPin,
  Flame,
  CheckCircle,
  Save,
  Dumbbell,
  ShieldCheck,
  Camera
} from 'lucide-react';

export const UserProfilePage: React.FC = () => {
  const { user, updateProfile, loginAsDemo } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [neighborhood, setNeighborhood] = useState(user?.neighborhood || 'الشرج');
  const [age, setAge] = useState(user?.age || 26);
  const [weight, setWeight] = useState(user?.weight || 74);
  const [height, setHeight] = useState(user?.height || 176);
  const [targetCalories, setTargetCalories] = useState(user?.targetCalories || 2450);
  const [fitnessGoal, setFitnessGoal] = useState<'fat_loss' | 'muscle_gain' | 'fitness_maintenance'>(
    (user?.fitnessGoal as any) || 'muscle_gain'
  );
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80');
  const [isSaved, setIsSaved] = useState(false);

  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <EmptyState
          icon={User}
          title="الملف الشخصي"
          description="يرجى تسجيل الدخول للوصول إلى بياناتك الشخصية وإعدادات حسابك في منصة عزم."
          actionText="دخول كمتدرب تجريبي"
          onActionClick={() => loginAsDemo('trainee')}
        />
      </div>
    );
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      phone,
      neighborhood,
      age: Number(age),
      weight: Number(weight),
      height: Number(height),
      targetCalories: Number(targetCalories),
      fitnessGoal,
      avatarUrl
    });

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleAvatarChange = () => {
    const avatars = [
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
    ];
    const nextIdx = (avatars.indexOf(avatarUrl) + 1) % avatars.length;
    setAvatarUrl(avatars[nextIdx]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-forest-900 via-forest-800 to-forest-950 text-white rounded-3xl p-6 sm:p-8 md:p-10 relative overflow-hidden shadow-xl border border-forest-800/60 flex flex-col sm:flex-row items-center gap-6">
        <div className="absolute top-0 left-0 w-80 h-80 bg-terracotta-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative group cursor-pointer shrink-0 z-10" onClick={handleAvatarChange} title="انقر لتغيير الصورة الرمزية">
          <img
            src={avatarUrl}
            alt={name}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover ring-4 ring-terracotta-400/40 shadow-xl"
          />
          <div className="absolute inset-0 bg-black/40 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
            <Camera className="w-6 h-6" />
          </div>
        </div>

        <div className="space-y-1 text-center sm:text-right flex-1 relative z-10">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black">{name || 'رياضي عزم'}</h1>
            <span className="px-3.5 py-1.5 rounded-full bg-sage-500/20 text-sage-300 border border-sage-500/30 text-xs font-bold">
              {user.role === 'admin' ? 'مدير المنصة' : user.role === 'trainer' ? 'مدرب معتمد' : 'متدرب نشط'}
            </span>
          </div>
          <p className="text-xs text-sand-300 font-mono" dir="ltr">{user.email}</p>
          <p className="text-xs text-sand-300/80">حضرموت - المكلا، حي {neighborhood}</p>
        </div>
      </div>

      {/* Main Profile Form */}
      <form onSubmit={handleSave} className="bg-white p-5 sm:p-8 rounded-3xl border border-sand-200 shadow-sm space-y-8">
        {/* Personal Details */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-forest-900 border-b border-sand-100 pb-3 flex items-center gap-2">
            <User className="w-5 h-5 text-terracotta-500" />
            <span>البيانات الأساسية</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">الاسم الثلاثي *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-terracotta-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">رقم الهاتف بالمكلا *</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-terracotta-500 text-sm font-mono"
                dir="ltr"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">البريد الإلكتروني (غير قابل للتعديل)</label>
              <input
                type="email"
                disabled
                value={user.email}
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-200 bg-sand-50/70 text-slate-500 text-sm cursor-not-allowed font-mono"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">حي السكن في المكلا</label>
              <select
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-terracotta-500 text-sm bg-white"
              >
                <option value="الشرج">الشرج</option>
                <option value="فوة المتضررين">فوة (حي المتضررين)</option>
                <option value="ديس المكلا">ديس المكلا</option>
                <option value="المكلا القديمة">المكلا القديمة</option>
                <option value="40 شقة">40 شقة</option>
                <option value="بويش / روكب">بويش / روكب</option>
              </select>
            </div>
          </div>
        </div>

        {/* Fitness & Body Measurements */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-forest-900 border-b border-sand-100 pb-3 flex items-center gap-2">
            <Dumbbell className="w-5 h-5 text-terracotta-500" />
            <span>القياسات البدنية والأهداف الرياضية</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">العمر (سنة)</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-terracotta-500 text-sm text-center"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">الوزن (كجم)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-terracotta-500 text-sm text-center"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">الطول (سم)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-terracotta-500 text-sm text-center"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">الهدف اليومي (سعرة)</label>
              <input
                type="number"
                value={targetCalories}
                onChange={(e) => setTargetCalories(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-terracotta-500 text-sm text-center font-bold text-amber-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">الهدف الرياضي</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setFitnessGoal('fat_loss')}
                className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all text-center min-h-[44px] ${
                  fitnessGoal === 'fat_loss'
                    ? 'border-amber-600 bg-amber-50 text-amber-800'
                    : 'border-sand-200 text-slate-600 hover:bg-sand-50'
                }`}
              >
                تنشيف وخسارة دهون
              </button>
              <button
                type="button"
                onClick={() => setFitnessGoal('fitness_maintenance')}
                className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all text-center min-h-[44px] ${
                  fitnessGoal === 'fitness_maintenance'
                    ? 'border-sage-600 bg-sage-50 text-sage-800'
                    : 'border-sand-200 text-slate-600 hover:bg-sand-50'
                }`}
              >
                ثبات وتحسين لياقة
              </button>
              <button
                type="button"
                onClick={() => setFitnessGoal('muscle_gain')}
                className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all text-center min-h-[44px] ${
                  fitnessGoal === 'muscle_gain'
                    ? 'border-terracotta-500 bg-terracotta-50 text-terracotta-800'
                    : 'border-sand-200 text-slate-600 hover:bg-sand-50'
                }`}
              >
                تضخيم وبناء عضلات
              </button>
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="pt-4 border-t border-sand-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {isSaved ? (
            <span className="text-xs font-bold text-sage-700 flex items-center justify-center sm:justify-start gap-1.5 animate-in fade-in">
              <CheckCircle className="w-4 h-4 text-sage-600" />
              تم حفظ التعديلات بنجاح!
            </span>
          ) : (
            <span className="text-xs text-slate-400 text-center sm:text-right">تُحفظ البيانات فورياً في جلستك المحلية.</span>
          )}

          <button
            type="submit"
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold text-xs shadow-md shadow-terracotta-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 min-h-[44px]"
          >
            <Save className="w-4 h-4" />
            <span>حفظ التعديلات</span>
          </button>
        </div>
      </form>
    </div>
  );
};
