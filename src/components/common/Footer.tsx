import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import {
  MapPin,
  Phone,
  MessageCircle,
  Dumbbell,
  ShieldCheck,
  Calculator,
  Salad,
  Clock,
  CreditCard,
  Building2,
  Users2,
  ArrowUpRight
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#060a12] text-white border-t border-slate-800/80 overflow-hidden" dir="rtl">
      {/* Subtle Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brand-green-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 space-y-12">
        {/* Top Community Card */}
        <div className="relative rounded-3xl bg-gradient-to-r from-slate-900/90 via-brand-dark-800 to-slate-900/90 border border-slate-800 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl backdrop-blur-xl">
          <div className="space-y-2 text-center md:text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green-500/15 border border-brand-green-500/30 text-brand-green-400 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-brand-green-400 animate-pulse" />
              <span>خدمة مجتمع المكلا وساحل حضرموت</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              جاهز للبدء في رحلتك الرياضية اليوم؟
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              تصفح صالات المكلا، احسب سعراتك بدقة علمية، واشترك في صالتك المفضلة دون أي تعقيد.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3 w-full md:w-auto shrink-0">
            <a
              href="https://wa.me/967733444520"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-2xl bg-brand-green-600 hover:bg-brand-green-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-green-600/25 active:scale-95 min-h-[44px]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>واتساب الاستفسارات المباشر</span>
            </a>
            <Link
              to="/gyms"
              className="px-5 py-3 rounded-2xl bg-brand-blue-600 hover:bg-brand-blue-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-blue-600/25 active:scale-95 min-h-[44px]"
            >
              <Dumbbell className="w-4 h-4" />
              <span>استكشف الصالات الآن</span>
            </Link>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 pb-8 border-b border-slate-800/80">
          {/* Brand Info & Mission (Col 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <Logo variant="full" theme="dark" size="lg" />
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed text-justify">
              منصة <strong className="text-white">عزم (AZM)</strong> هي المنظومة الرقمية الميدانية المتخصصة في ربط المتدربين بأفضل صالات ونوادي اللياقة المعتمدة في مدينة المكلا، مع حلول اشتراكات فورية وأدوات تغذية صحية مصممة للبيئة الساحلية.
            </p>
            <div className="flex flex-col gap-2 pt-1 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-blue-400 shrink-0" />
                <span>حضرموت - مدينة المكلا (الشرج، فوة، الديس)</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-green-400 shrink-0" />
                <span dir="ltr" className="font-mono">+967 733 444 520</span>
              </div>
            </div>
          </div>

          {/* Mukalla Gyms (Col 5-7) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2 pb-1 border-b border-slate-800">
              <Building2 className="w-4 h-4 text-brand-blue-400" />
              <span>صالات المكلا المعتمدة</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  to="/gyms/smart-gym"
                  className="flex items-center justify-between text-slate-300 hover:text-brand-blue-400 transition-colors py-1 group"
                >
                  <span className="font-medium group-hover:translate-x-1 transition-transform">سمارت جيم</span>
                  <span className="text-[10px] text-brand-green-400 bg-brand-green-950/60 border border-brand-green-800/50 px-2 py-0.5 rounded-full">
                    فوة المتضررين
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/gyms/mukalla-gym"
                  className="flex items-center justify-between text-slate-300 hover:text-brand-blue-400 transition-colors py-1 group"
                >
                  <span className="font-medium group-hover:translate-x-1 transition-transform">المكلا جيم</span>
                  <span className="text-[10px] text-brand-blue-400 bg-brand-blue-950/60 border border-brand-blue-800/50 px-2 py-0.5 rounded-full">
                    فوق قاعة ميرال
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/gyms/golds-gym"
                  className="flex items-center justify-between text-slate-300 hover:text-brand-blue-400 transition-colors py-1 group"
                >
                  <span className="font-medium group-hover:translate-x-1 transition-transform">قولدن جيم</span>
                  <span className="text-[10px] text-amber-400 bg-amber-950/60 border border-amber-800/50 px-2 py-0.5 rounded-full">
                    الشرج
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/gyms/winner-gym"
                  className="flex items-center justify-between text-slate-300 hover:text-brand-blue-400 transition-colors py-1 group"
                >
                  <span className="font-medium group-hover:translate-x-1 transition-transform">وينر جيم</span>
                  <span className="text-[10px] text-sky-400 bg-sky-950/60 border border-sky-800/50 px-2 py-0.5 rounded-full">
                    مارينا مول (الدور 2)
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/gyms/power-gym"
                  className="flex items-center justify-between text-slate-300 hover:text-brand-blue-400 transition-colors py-1 group"
                >
                  <span className="font-medium group-hover:translate-x-1 transition-transform">باور جيم</span>
                  <span className="text-[10px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-full">
                    ديس المكلا
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools & Features (Col 8-10) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2 pb-1 border-b border-slate-800">
              <Calculator className="w-4 h-4 text-brand-green-400" />
              <span>الأدوات والتغذية الذكية</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  to="/calculator"
                  className="flex items-center gap-2 text-slate-300 hover:text-brand-green-400 transition-colors py-1"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green-500" />
                  <span>حاسبة السعرات (Mifflin-St Jeor)</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/nutrition-plan"
                  className="flex items-center gap-2 text-slate-300 hover:text-brand-green-400 transition-colors py-1"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green-500" />
                  <span>جدول الخطة الغذائية اليومية</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/meals"
                  className="flex items-center gap-2 text-slate-300 hover:text-brand-green-400 transition-colors py-1"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green-500" />
                  <span>مكتبة الوجبات الساحلية الصحية</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/trainers"
                  className="flex items-center gap-2 text-slate-300 hover:text-brand-green-400 transition-colors py-1"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green-500" />
                  <span>دليل الكباتن والمدربين المعتمدين</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/my-orders"
                  className="flex items-center gap-2 text-slate-300 hover:text-brand-green-400 transition-colors py-1"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green-500" />
                  <span>متابعة طلبات الاشتراكات والحجوزات</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Payment & Trust (Col 11-12) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2 pb-1 border-b border-slate-800">
              <CreditCard className="w-4 h-4 text-amber-400" />
              <span>طرق السداد</span>
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] space-y-1">
                <span className="font-bold text-slate-300 block">سداد محلي مباشر:</span>
                <span className="text-slate-400 block">• نقداً عند الحضور للصالة</span>
                <span className="text-slate-400 block">• تحويل عبر بنك الكريمي</span>
                <span className="text-slate-400 block">• حوالة عبر العمقي للصرافة</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-brand-green-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>ضمان توثيق الحجز لدى إدارة الصالة</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 pt-4">
          <p className="text-center sm:text-right">
            © {new Date().getFullYear()} <strong className="text-slate-400 font-bold">عزم AZM</strong> • جميع الحقوق محفوظة لخدمة مجتمع المكلا الرياضي - حضرموت.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <Link to="/admin" className="text-slate-400 hover:text-white transition-colors">
              بوابة الإدارة
            </Link>
            <span>•</span>
            <Link to="/register" className="text-slate-400 hover:text-white transition-colors">
              تسجيل كابتن / صالة
            </Link>
            <span>•</span>
            <span className="text-brand-green-400 font-semibold flex items-center gap-1">
              <span>حضرموت</span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green-400" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
