import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/common/Logo';
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Eye,
  EyeOff,
  AlertCircle
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const redirectPath = (location.state as any)?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('يرجى إدخال البريد الإلكتروني وكلمة المرور');
      return;
    }

    setIsLoading(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        navigate(redirectPath);
      } else {
        setError(res.message || 'بيانات الدخول غير صحيحة، يرجى المحاولة مجدداً');
      }
    } catch {
      setError('حدث خطأ أثناء محاولة تسجيل الدخول. يرجى التحقق من اتصالك والمحاولة مجدداً.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    alert('تم إرسال تعليمات استعادة كلمة المرور إلى بريدك الإلكتروني في حال كان مسجلاً لدينا.');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] font-['Cairo',sans-serif] relative" dir="rtl">
      {/* Subtle organic background glow */}
      <div className="absolute top-1/4 -right-16 w-80 h-80 rounded-full bg-[#E5ECE7]/50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-16 w-80 h-80 rounded-full bg-[#FDF6F2]/60 blur-3xl pointer-events-none" />

      <div className="max-w-md w-full space-y-6 relative z-10">
        
        {/* Header Branding */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <Logo size="lg" variant="full" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1F2722] leading-tight">
            تسجيل الدخول إلى حسابك
          </h1>
          <p className="text-xs sm:text-sm text-[#7D9683] font-medium">
            أهلاً بك مجدداً في منصة اللياقة والتغذية الأولى بالمكلا
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white p-7 sm:p-9 rounded-3xl border border-[#EAE5DA] shadow-[0_12px_35px_-10px_rgba(31,39,34,0.08)] space-y-6">
          
          {error && (
            <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs font-bold leading-relaxed flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
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
                  className="w-full pl-4 pr-11 py-3 rounded-2xl border border-[#EAE5DA] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#D97241] focus:ring-2 focus:ring-[#D97241]/20 text-xs sm:text-sm font-semibold text-[#1F2722] transition-all placeholder:text-gray-400"
                  dir="ltr"
                />
                <Mail className="w-4 h-4 text-[#7D9683] absolute right-4 top-3.5 pointer-events-none" />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-black text-[#1F2722]">
                  كلمة المرور
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-xs text-[#D97241] font-bold hover:underline transition-all"
                >
                  نسيت كلمة المرور؟
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3 rounded-2xl border border-[#EAE5DA] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#D97241] focus:ring-2 focus:ring-[#D97241]/20 text-xs sm:text-sm font-semibold text-[#1F2722] transition-all placeholder:text-gray-400"
                  dir="ltr"
                />
                <Lock className="w-4 h-4 text-[#7D9683] absolute right-4 top-3.5 pointer-events-none" />
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

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-[#D97241] focus:ring-[#D97241] accent-[#D97241]"
                />
                <span className="text-xs text-[#536559] font-medium">تذكر تسجيل دخولي</span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-2xl bg-[#D97241] hover:bg-[#C75F2F] text-white font-black text-sm shadow-xl shadow-[#D97241]/25 hover:shadow-none hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 min-h-[48px] disabled:opacity-60 disabled:cursor-not-allowed"
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
            <span>اتصال آمن ومشفّر 100% • منصة عزم المكلا</span>
          </p>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
