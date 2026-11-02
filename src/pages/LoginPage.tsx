import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/common/Logo';
import { UserRole } from '../types';
import { Lock, Mail, ArrowRight, Shield, Dumbbell, UserCheck, ShieldCheck } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, loginAsDemo } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      setError('حدث خطأ أثناء محاولة تسجيل الدخول');
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
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full space-y-6">
        {/* Top Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <Logo size="lg" variant="full" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">تسجيل الدخول إلى حسابك</h2>
          <p className="text-sm text-slate-500">
            أهلاً بك مجدداً في منصة اللياقة الأولى بمدينة المكلا
          </p>
        </div>

        {/* Demo Fast Logins Banner */}
        <div className="bg-brand-blue-50/70 border border-brand-blue-200/80 rounded-2xl p-4 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-bold text-brand-blue-900">
            <span>تجربة سريعة بنقرة واحدة (Demo Roles):</span>
            <span className="text-[10px] text-brand-blue-600 bg-brand-blue-100 px-2 py-0.5 rounded-full">جاهزة للاختبار</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleDemoLogin('trainee')}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white border border-brand-blue-200 hover:border-brand-blue-400 font-bold text-slate-700 hover:text-brand-blue-700 shadow-sm transition-all text-right"
            >
              <UserCheck className="w-3.5 h-3.5 text-brand-blue-600" />
              <span>دخول كمتدرب</span>
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('trainer')}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white border border-brand-blue-200 hover:border-brand-blue-400 font-bold text-slate-700 hover:text-brand-blue-700 shadow-sm transition-all text-right"
            >
              <Dumbbell className="w-3.5 h-3.5 text-brand-green-600" />
              <span>دخول كمدرب</span>
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('gym_owner')}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white border border-brand-blue-200 hover:border-brand-blue-400 font-bold text-slate-700 hover:text-brand-blue-700 shadow-sm transition-all text-right"
            >
              <Shield className="w-3.5 h-3.5 text-amber-600" />
              <span>دخول صاحب صالة</span>
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('admin')}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white border border-brand-blue-200 hover:border-brand-blue-400 font-bold text-slate-700 hover:text-brand-blue-700 shadow-sm transition-all text-right"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-red-600" />
              <span>دخول إدارة المنصة</span>
            </button>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-xl space-y-5">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-3.5 pr-10 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue-500 text-sm"
                  dir="ltr"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700">كلمة المرور</label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('في بيئة التجربة: يمكنك الضغط على أحد أزرار الدخول السريع بأعلى الصفحة.'); }} className="text-xs text-brand-blue-600 hover:underline">
                  نسيت كلمة المرور؟
                </a>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-3.5 pr-10 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue-500 text-sm"
                  dir="ltr"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-brand-blue-600 hover:bg-brand-blue-700 text-white font-bold text-sm shadow-md shadow-brand-blue-600/20 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>{isLoading ? 'جاري التحقق...' : 'تسجيل الدخول'}</span>
              <ArrowRight className="w-4 h-4 rotate-180" />
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-600">
              ليس لديك حساب بعد؟{' '}
              <Link to="/register" className="text-brand-blue-600 font-bold hover:underline">
                أنشئ حساباً جديداً
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

