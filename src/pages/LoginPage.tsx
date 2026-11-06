import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/common/Logo';
import { UserRole } from '../types';
import {
  Lock,
  Mail,
  ArrowRight,
  Shield,
  Dumbbell,
  UserCheck,
  ShieldCheck,
  Eye,
  EyeOff,
  Sparkles
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, loginAsDemo } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const redirectPath = (location.state as any)?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate(redirectPath);
    } catch {
      setError('حدث خطأ أثناء محاولة تسجيل الدخول. يرجى التحقق من البيانات.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (role: UserRole) => {
    loginAsDemo(role);
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate(redirectPath);
    }
  };

  return (
    <div className="min-h-[88vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] font-['Cairo',sans-serif] relative" dir="rtl">
      
      {/* Subtle organic background blur effect */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 rounded-full bg-[#E5ECE7]/60 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 rounded-full bg-[#FDF6F2]/70 blur-3xl pointer-events-none" />

      <div className="max-w-md w-full space-y-6 relative z-10">
        
        {/* Top Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <Logo size="lg" variant="full" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1F2722] tracking-tight">
            تسجيل الدخول إلى حسابك
          </h1>
          <p className="text-xs sm:text-sm text-[#536559] font-medium">
            أهلاً بك مجدداً في منصة اللياقة والتغذية الأولى بالمكلا
          </p>
        </div>

        {/* Demo Fast Logins Banner */}
        <div className="bg-white border border-[#F0EBE3] rounded-3xl p-4 sm:p-5 shadow-[0_4px_20px_rgb(0,0,0,0.02)] space-y-3">
          <div className="flex items-center justify-between text-xs font-black text-[#1F2722]">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D97241]" />
              <span>تجربة فورية بنقرة واحدة (Demo Roles):</span>
            </span>
            <span className="text-[10px] text-[#7D9683] bg-[#E5ECE7] px-2.5 py-0.5 rounded-full font-bold">
              جاهزة للاختبار
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleDemoLogin('trainee')}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-[#FAF8F5] border border-[#F0EBE3] hover:border-[#D97241] hover:bg-[#FDF6F2] font-black text-[#1F2722] hover:text-[#D97241] shadow-sm transition-all"
            >
              <UserCheck className="w-4 h-4 text-[#D97241]" />
              <span>دخول كمتدرب</span>
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('trainer')}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-[#FAF8F5] border border-[#F0EBE3] hover:border-[#7D9683] hover:bg-[#F4F7F5] font-black text-[#1F2722] hover:text-[#7D9683] shadow-sm transition-all"
            >
              <Dumbbell className="w-4 h-4 text-[#7D9683]" />
              <span>دخول كمدرب</span>
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('gym_owner')}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-[#FAF8F5] border border-[#F0EBE3] hover:border-[#1F2722] hover:bg-slate-100 font-black text-[#1F2722] shadow-sm transition-all"
            >
              <Shield className="w-4 h-4 text-[#1F2722]" />
              <span>دخول صاحب صالة</span>
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('admin')}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-[#FAF8F5] border border-[#F0EBE3] hover:border-[#D97241] hover:bg-[#FDF6F2] font-black text-[#1F2722] hover:text-[#D97241] shadow-sm transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-[#D97241]" />
              <span>إدارة المنصة</span>
            </button>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white p-7 sm:p-9 rounded-3xl border border-[#F0EBE3] shadow-[0_15px_45px_-15px_rgba(31,39,34,0.08)] space-y-6">
          
          {error && (
            <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs font-bold leading-relaxed">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div>
              <label className="block text-xs font-black text-[#1F2722] mb-1.5">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-4 pr-11 py-3 rounded-2xl border border-[#F0EBE3] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D97241] text-xs sm:text-sm font-semibold text-[#1F2722] transition-all"
                  dir="ltr"
                />
                <Mail className="w-4 h-4 text-[#7D9683] absolute right-4 top-3.5" />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-black text-[#1F2722]">كلمة المرور</label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('في بيئة التجربة: يمكنك الضغط على أحد أزرار الدخول السريع بأعلى الصفحة للدخول فوراً.');
                  }}
                  className="text-xs text-[#D97241] font-bold hover:underline"
                >
                  نسيت كلمة المرور؟
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
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

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-2xl bg-[#D97241] hover:bg-[#C75F2F] text-white font-black text-sm shadow-xl shadow-[#D97241]/25 active:scale-95 transition-all flex items-center justify-center gap-2 min-h-[48px]"
              >
                <span>{isLoading ? 'جاري التحقق والدخول...' : 'تسجيل الدخول'}</span>
                <ArrowRight className="w-4 h-4 rotate-180" />
              </button>
            </div>

          </form>

          {/* Register Link */}
          <div className="pt-4 border-t border-[#F0EBE3] text-center">
            <p className="text-xs text-[#536559] font-medium">
              ليس لديك حساب بعد؟{' '}
              <Link to="/register" className="text-[#D97241] font-black hover:underline mr-1">
                أنشئ حساباً جديداً في عزم
              </Link>
            </p>
          </div>

        </div>

        {/* Security / Trust Stamp */}
        <div className="text-center">
          <p className="text-[11px] text-[#7D9683] font-bold flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#7D9683]" />
            <span>بيانات مشفرة واتصال آمن 100% • منصة عزم المكلا</span>
          </p>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
