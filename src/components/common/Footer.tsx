import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { MapPin, Mail, Clock, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const sitemapLinks = [
    { label: 'الرئيسية', path: '/' },
    { label: 'الأندية الرياضية', path: '/gyms' },
    { label: 'المدربون', path: '/trainers' },
    { label: 'حاسبة السعرات الحرارية', path: '/calculator' },
    { label: 'الخطط الغذائية', path: '/nutrition-plan' },
    { label: 'من نحن', path: '/about' },
    { label: 'تواصل معنا', path: '/about#contact' },
  ];

  return (
    <footer className="w-full bg-[#1F2722] text-white font-['Cairo',sans-serif]" dir="rtl">

      {/* ─── MAIN FOOTER CONTENT (3 Columns) ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 items-start">

          {/* ════════════════════════════════════════
              الجزء الأول: شعار منصة AZM والوصف المختصر
          ════════════════════════════════════════ */}
          <div className="space-y-4">
            <Logo size="lg" theme="dark" />
            <p className="text-sm text-white/80 leading-relaxed max-w-sm font-medium">
              «عزم، منصتك نحو أسلوب حياة أكثر نشاطًا وصحة».
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-[#7D9683]">
              <ShieldCheck className="w-4 h-4 text-[#D97241]" />
              <span>المنصة الرقمية الأولى للياقة والتغذية في المكلا</span>
            </div>
          </div>

          {/* ════════════════════════════════════════
              الجزء الثاني: خريطة الموقع (Sitemap)
          ════════════════════════════════════════ */}
          <div className="space-y-4">
            <h4 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2 border-b border-white/10 pb-2">
              <span className="w-2 h-2 rounded-full bg-[#D97241]" />
              <span>خريطة الموقع</span>
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {sitemapLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.path}
                    className="text-xs text-white/70 hover:text-[#D97241] font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-[#D97241]/60 text-[10px]">›</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ════════════════════════════════════════
              الجزء الثالث: معلومات التواصل والخدمة المحلية
          ════════════════════════════════════════ */}
          <div className="space-y-4">
            <h4 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2 border-b border-white/10 pb-2">
              <span className="w-2 h-2 rounded-full bg-[#D97241]" />
              <span>تواصل معنا</span>
            </h4>
            <div className="space-y-3 text-xs text-white/75">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D97241] shrink-0 mt-0.5" />
                <span>الجمهورية اليمنية • حضرموت • مدينة المكلا</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D97241] shrink-0" />
                <span className="font-mono text-white/90" dir="ltr">info@azm-mukalla.com</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#D97241] shrink-0 mt-0.5" />
                <span>السبت - الخميس: 08:00 صباحاً - 10:00 مساءً</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ─── BOTTOM BAR (Copyright) ─── */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60">
            <p className="font-medium text-center sm:text-right">
              © AZM Platform. جميع الحقوق محفوظة.
            </p>
            <div className="flex items-center gap-4 text-[11px] text-white/50">
              <span>حضرموت - المكلا</span>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
