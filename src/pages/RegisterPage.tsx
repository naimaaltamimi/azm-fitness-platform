import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/common/Logo';
import { UserRole } from '../types';
import {
  User,
  Mail,
  Phone,
  Lock,
  Dumbbell,
  ShieldCheck,
  UserCheck,
  Shield,
  Eye,
  EyeOff,
  CheckCircle2
} from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="min-h-[88vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] font-['Cairo',sans-serif] relative" dir="rtl">
      
      {/* Subtle organic background blur effect */}
      <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-[#E5ECE7]/60 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -left-20 w-80 h-80 rounded-full bg-[#FDF6F2]/70 blur-3xl pointer-events-none" />

      <div className="max-w-xl w-full space-y-6 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <Logo size="lg" variant="full" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1F2722] tracking-tight">
            إنشاء حساب جديد في عزم
          </h1>
          <p className="text-xs sm:text-sm text-[#536559] font-medium">
            انضم الآن إلى مجتمع اللياقة والتغذية الصحية بمدينة المكلا
          </p>
        </div>

        {/* Card */}
        <div className="bg-white p-6 sm:p-9 rounded-3xl border border-[#F0EBE3] shadow-[0_15px_45px_-15px_rgba(31,39,34,0.08)] space-y-6">
          
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Role Selection */}
            <div>
              <label className="block text-xs font-black text-[#1F2722] mb-2.5">نوع الحساب في المنصة *</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setRole('trainee')}
                  className={`flex sm:flex-col items-center justify-center p-3.5 rounded-2xl border text-xs font-black transition-all gap-2 min-h-[48px] ${
                    role === 'trainee'
                      ? 'border-[#D97241] bg-[#FDF6F2] text-[#D97241] ring-2 ring-[#D97241]/20 shadow-sm'
                      : 'border-[#F0EBE3] bg-[#FAF8F5] text-[#536559] hover:bg-white'
                  }`}
                >
                  <UserCheck className="w-5 h-5 text-[#D97241] shrink-0" />
                  <span>متدرب رياضي</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('trainer')}
                  className={`flex sm:flex-col items-center justify-center p-3.5 rounded-2xl border text-xs font-black transition-all gap-2 min-h-[48px] ${
                    role === 'trainer'
                      ? 'border-[#7D9683] bg-[#E5ECE7] text-[#617C69] ring-2 ring-[#7D9683]/20 shadow-sm'
                      : 'border-[#F0EBE3] bg-[#FAF8F5] text-[#536559] hover:bg-white'
                  }`}
                >
                  <Dumbbell className="w-5 h-5 text-[#7D9683] shrink-0" />
                  <span>كابتن / مدرب</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('gym_owner')}
                  className={`flex sm:flex-col items-center justify-center p-3.5 rounded-2xl border text-xs font-black transition-all gap-2 min-h-[48px] ${
                    role === 'gym_owner'
                      ? 'border-[#1F2722] bg-slate-100 text-[#1F2722] ring-2 ring-[#1F2722]/20 shadow-sm'
                      : 'border-[#F0EBE3] bg-[#FAF8F5] text-[#536559] hover:bg-white'
                  }`}
                >
                  <ShieldCheck className="w-5 h-5 text-[#1F2722] shrink-0" />
                  <span>صاحب صالة</span>
                </button>
              </div>
            </div>

            {/* Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-[#1F2722] mb-1.5">الاسم الكامل *</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثال: سالم باحشوان"
                    className="w-full pl-4 pr-11 py-3 rounded-2xl border border-[#F0EBE3] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D97241] text-xs sm:text-sm font-semibold text-[#1F2722] transition-all"
                  />
                  <User className="w-4 h-4 text-[#7D9683] absolute right-4 top-3.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-[#1F2722] mb-1.5">رقم الهاتف بالمكلا *</label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="770000000"
                    className="w-full pl-4 pr-11 py-3 rounded-2xl border border-[#F0EBE3] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D97241] text-xs sm:text-sm font-semibold text-[#1F2722] transition-all"
                    dir="ltr"
                  />
                  <Phone className="w-4 h-4 text-[#7D9683] absolute right-4 top-3.5" />
                </div>
              </div>
            </div>

            {/* Email & Neighborhood */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-[#1F2722] mb-1.5">البريد الإلكتروني *</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@mukalla.com"
                    className="w-full pl-4 pr-11 py-3 rounded-2xl border border-[#F0EBE3] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D97241] text-xs sm:text-sm font-semibold text-[#1F2722] transition-all"
                    dir="ltr"
                  />
                  <Mail className="w-4 h-4 text-[#7D9683] absolute right-4 top-3.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-[#1F2722] mb-1.5">حي السكن بالمكلا</label>
                <select
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-[#F0EBE3] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D97241] text-xs sm:text-sm font-semibold text-[#1F2722] transition-all"
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
              <label className="block text-xs font-black text-[#1F2722] mb-1.5">كلمة المرور *</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="اختر كلمة مرور قوية (6 خانات على الأقل)"
                  className="w-full pl-11 pr-11 py-3 rounded-2xl border border-[#F0EBE3] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D97241] text-xs sm:text-sm font-semibold text-[#1F2722] transition-all"
                  dir="ltr"
                />
                <Lock className="w-4 h-4 text-[#7D9683] absolute right-4 top-3.5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3.5 top-3.5 text-[#536559] hover:text-[#1F2722] transition-colors p-0.5"
                  title={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Terms checkbox */}
            <div className="flex items-start gap-2.5 pt-1">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 rounded border-[#F0EBE3] text-[#D97241] focus:ring-[#D97241] mt-1 accent-[#D97241]"
              />
              <label htmlFor="terms" className="text-xs text-[#536559] leading-relaxed cursor-pointer select-none font-medium">
                أوافق على الشروط والسياسات الخاصة بمنصة عزم الرياضية في مدينة المكلا.
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-2xl bg-[#D97241] hover:bg-[#C75F2F] text-white font-black text-sm shadow-xl shadow-[#D97241]/25 active:scale-95 transition-all min-h-[48px]"
            >
              {isLoading ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب والبدء فوراً'}
            </button>

          </form>

          {/* Login Link */}
          <div className="pt-4 border-t border-[#F0EBE3] text-center">
            <p className="text-xs text-[#536559] font-medium">
              لديك حساب بالفعل؟{' '}
              <Link to="/login" className="text-[#D97241] font-black hover:underline mr-1">
                سجل الدخول الآن
              </Link>
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default RegisterPage;
