import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/common/Logo';
import { UserRole } from '../types';
import { User, Mail, Phone, Lock, Dumbbell, ShieldCheck, UserCheck } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [neighborhood, setNeighborhood] = useState('الشرج');
  const [role, setRole] = useState<UserRole>('trainee');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert('يرجى الموافقة على شروط وقواعد منصة عزم للمتابعة');
      return;
    }
    setIsLoading(true);

    try {
      await register({
        name,
        email,
        phone,
        neighborhood,
        role
      });
      navigate('/dashboard');
    } catch {
      alert('حدث خطأ أثناء إنشاء الحساب');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-xl w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <Logo size="lg" variant="full" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">إنشاء حساب جديد في عزم</h2>
          <p className="text-sm text-slate-500">
            انضم الآن إلى مجتمع الرياضة والصحة بمدينة المكلا
          </p>
        </div>

        {/* Card */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-xl space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">نوع الحساب *</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('trainee')}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-xs font-bold transition-all ${
                    role === 'trainee'
                      ? 'border-brand-blue-600 bg-brand-blue-50/70 text-brand-blue-700 ring-2 ring-brand-blue-500/20'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <UserCheck className="w-5 h-5 mb-1 text-brand-blue-600" />
                  <span>متدرب رياضي</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('trainer')}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-xs font-bold transition-all ${
                    role === 'trainer'
                      ? 'border-brand-green-600 bg-brand-green-50/70 text-brand-green-700 ring-2 ring-brand-green-500/20'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Dumbbell className="w-5 h-5 mb-1 text-brand-green-600" />
                  <span>كابتن / مدرب</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('gym_owner')}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-xs font-bold transition-all ${
                    role === 'gym_owner'
                      ? 'border-amber-600 bg-amber-50/70 text-amber-700 ring-2 ring-amber-500/20'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <ShieldCheck className="w-5 h-5 mb-1 text-amber-600" />
                  <span>صاحب صالة</span>
                </button>
              </div>
            </div>

            {/* Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">الاسم الكامل *</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثال: سالم باحشوان"
                    className="w-full pl-3.5 pr-10 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue-500 text-sm"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">رقم الهاتف بالمكلا *</label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+967 77..."
                    className="w-full pl-3.5 pr-10 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue-500 text-sm"
                    dir="ltr"
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                </div>
              </div>
            </div>

            {/* Email & Neighborhood */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">البريد الإلكتروني *</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@mukalla.com"
                    className="w-full pl-3.5 pr-10 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue-500 text-sm"
                    dir="ltr"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">منطقة السكن بالمكلا</label>
                <select
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue-500 text-sm bg-white"
                >
                  <option value="الشرج">الشرج</option>
                  <option value="فوة المتضررين">فوة (حي المتضررين)</option>
                  <option value="ديس المكلا">ديس المكلا</option>
                  <option value="المكلا القديمة">المكلا القديمة</option>
                  <option value="40 شقة">40 شقة</option>
                  <option value="بويش / روكب">بويش / روكب</option>
                  <option value="جول مسحة / العيون">جول مسحة / العيون</option>
                </select>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">كلمة المرور *</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="اختر كلمة مرور قوية (6 خانات على الأقل)"
                  className="w-full pl-3.5 pr-10 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue-500 text-sm"
                  dir="ltr"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
              </div>
            </div>

            {/* Terms checkbox */}
            <div className="flex items-start gap-2.5 pt-1">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 rounded text-brand-blue-600 focus:ring-brand-blue-500 mt-1"
              />
              <label htmlFor="terms" className="text-xs text-slate-600 leading-relaxed cursor-pointer select-none">
                أوافق على الشروط والسياسات الخاصة بمنصة عزم الرياضية في مدينة المكلا.
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-brand-blue-600 hover:bg-brand-blue-700 text-white font-bold text-sm shadow-md shadow-brand-blue-600/20 active:scale-95 transition-all"
            >
              {isLoading ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب والبدء فوراً'}
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-600">
              لديك حساب بالفعل؟{' '}
              <Link to="/login" className="text-brand-blue-600 font-bold hover:underline">
                سجل الدخول الآن
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

