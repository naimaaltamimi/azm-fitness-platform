import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 2000);
  };

  return (
    <footer className="w-full bg-[#1F2722] text-white font-['Cairo',sans-serif]" dir="rtl">

      {/* ─── MAIN FOOTER CONTENT (4 Columns) ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">

          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <Logo size="lg" theme="dark" />
            <p className="text-xs text-white/60 leading-relaxed max-w-xs">
              منصة اللياقة والتغذية الصحية الأولى في المكلا. نوفر لك صالات معتمدة ميدانياً وخطط غذائية مبنية على أسس علمية.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-black text-white uppercase tracking-wide">روابط سريعة</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'الرئيسية', path: '/' },
                { label: 'صالات المكلا', path: '/gyms' },
                { label: 'دليل المدربين', path: '/trainers' },
                { label: 'الوجبات الصحية', path: '/meals' },
                { label: 'حاسبة السعرات', path: '/calculator' },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-xs text-white/60 hover:text-white font-medium transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="space-y-4">
            <h4 className="text-sm font-black text-white uppercase tracking-wide">الدعم</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'الخطة الغذائية', path: '/nutrition-plan' },
                { label: 'تسجيل حساب', path: '/register' },
                { label: 'تسجيل الدخول', path: '/login' },
                { label: 'سياسة الخصوصية', path: '/' },
                { label: 'الشروط والأحكام', path: '/' },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.path}
                    className="text-xs text-white/60 hover:text-white font-medium transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-4">
            <h4 className="text-sm font-black text-white uppercase tracking-wide">النشرة البريدية</h4>
            <p className="text-xs text-white/60 leading-relaxed">
              اشترك للحصول على آخر العروض والنصائح الصحية من منصة عزم.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="بريدك الإلكتروني..."
                className="flex-1 px-3 py-2.5 rounded-lg bg-white/10 border border-white/15 text-xs text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-[#7D9683] transition-all"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-lg bg-[#D97241] hover:bg-[#C75F2F] text-white font-bold text-xs shrink-0 transition-colors"
              >
                {subscribed ? '✓ تم' : 'اشتراك'}
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* ─── BOTTOM BAR (Copyright) ─── */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-white/50">
            <p>
              © {new Date().getFullYear()} <strong className="text-white/70">عزم AZM</strong> • جميع الحقوق محفوظة – حضرموت، المكلا.
            </p>
            <div className="flex items-center gap-4 font-medium">
              <Link to="/" className="hover:text-white/80 transition-colors">سياسة الخصوصية</Link>
              <span className="text-white/20">|</span>
              <Link to="/" className="hover:text-white/80 transition-colors">الشروط والأحكام</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
