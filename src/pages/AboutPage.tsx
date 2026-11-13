import React from 'react';
import { Link } from 'react-router-dom';
import {
  Target,
  Eye,
  CheckCircle2,
  Compass,
  Dumbbell,
  Users2,
  Calculator,
  UtensilsCrossed,
  Sparkles,
  MapPin,
  Mail,
  ShieldCheck,
  ArrowLeft,
  Building2
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const goals = [
    {
      icon: Building2,
      text: 'تسهيل الوصول إلى الأندية والمرافق الرياضية في مدينة المكلا.',
    },
    {
      icon: Users2,
      text: 'تعريف المستخدمين بالمدربين وخدماتهم الرياضية.',
    },
    {
      icon: Calculator,
      text: 'توفير أدوات تساعد على تقدير الاحتياجات اليومية من السعرات الحرارية.',
    },
    {
      icon: UtensilsCrossed,
      text: 'تقديم معلومات وخطط غذائية تساعد على تبني عادات غذائية متوازنة.',
    },
    {
      icon: CheckCircle2,
      text: 'تسهيل إرسال ومتابعة طلبات الاشتراك في الأندية.',
    },
    {
      icon: Sparkles,
      text: 'دعم التحول الرقمي للخدمات الرياضية والغذائية المحلية.',
    },
  ];

  return (
    <div className="bg-white text-[#1F2722] font-['Cairo',sans-serif] min-h-screen" dir="rtl">
      
      {/* ─── Hero Header Banner ─── */}
      <section className="bg-gradient-to-b from-[#FAF8F5] to-white border-b border-[#F0EBE3] py-14 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FDF4EF] border border-[#F0D5C7] text-[#D97241] text-xs font-bold shadow-sm">
            <Compass className="w-4 h-4" />
            <span>منصة عزم الرقمية • حضرموت المكلا</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1F2722] tracking-tight">
            عن منصة <span className="text-[#D97241]">عزم AZM</span>
          </h1>

          <p className="text-sm sm:text-base text-[#7D9683] font-medium max-w-2xl mx-auto leading-relaxed">
            منصتك الرقمية الموثوقة نحو أسلوب حياة أكثر نشاطاً وتغذية صحية متوازنة في مدينة المكلا
          </p>
        </div>
      </section>

      {/* ─── Section 1: من نحن ─── */}
      <section className="py-12 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#EAE5DA] p-8 sm:p-12 shadow-[0_4px_25px_rgb(0,0,0,0.03)] hover:border-[#D97241] transition-all duration-300">
          <div className="flex flex-col md:flex-row items-start gap-6 sm:gap-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#FDF4EF] text-[#D97241] flex items-center justify-center shrink-0 shadow-sm">
              <Dumbbell className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <div className="space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-[#D97241] block">
                التعريف بالمنصة
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1F2722]">
                من نحن
              </h2>
              <p className="text-sm sm:text-base text-[#536559] leading-relaxed font-medium">
                عزم هي منصة رقمية محلية متخصصة في مجال اللياقة البدنية والتغذية الصحية، تستهدف سكان مدينة المكلا بمحافظة حضرموت. تهدف إلى تسهيل الوصول إلى الخدمات الرياضية والغذائية من خلال جمع معلومات الأندية الرياضية والمدربين والخدمات المتعلقة بالتغذية الصحية في منصة رقمية واحدة.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section 2: رؤيتنا ─── */}
      <section className="py-6 sm:py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F5] rounded-3xl border border-[#EAE5DA] p-8 sm:p-12 shadow-[0_4px_25px_rgb(0,0,0,0.02)]">
          <div className="flex flex-col md:flex-row items-start gap-6 sm:gap-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#1F2722] text-white flex items-center justify-center shrink-0 shadow-sm">
              <Eye className="w-7 h-7 sm:w-8 sm:h-8 text-[#D97241]" />
            </div>
            <div className="space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-[#7D9683] block">
                التطلعات والمستقبل
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1F2722]">
                رؤيتنا
              </h2>
              <p className="text-sm sm:text-base text-[#536559] leading-relaxed font-medium">
                أن تكون منصة عزم وجهة رقمية موثوقة في المكلا للوصول إلى خدمات اللياقة البدنية والتغذية الصحية، وأن تسهم في تعزيز الوعي بأهمية النشاط البدني والتغذية المتوازنة.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section 3: أهدافنا ─── */}
      <section className="py-12 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10 sm:mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-[#D97241] block">
            خارطة العمل
          </span>
          <h2 className="text-2xl sm:text-3xl sm:text-4xl font-black text-[#1F2722]">
            أهدافنا
          </h2>
          <p className="text-xs sm:text-sm text-[#7D9683] font-medium max-w-lg mx-auto">
            محاور نسعى لتحقيقها لخدمة مجتمع المكلا الرياضي والمهتمين بالصحة البدنية
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {goals.map((goal, idx) => {
            const IconComp = goal.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#EAE5DA] p-5 sm:p-6 hover:border-[#D97241] hover:shadow-[0_8px_25px_rgb(0,0,0,0.04)] transition-all duration-300 flex items-start gap-4 group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#FAF8F5] group-hover:bg-[#FDF4EF] text-[#1F2722] group-hover:text-[#D97241] flex items-center justify-center shrink-0 transition-colors">
                  <IconComp className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm font-bold text-[#1F2722] leading-relaxed">
                    {goal.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── Section 4: تواصل معنا (Contact Section) ─── */}
      <section id="contact" className="py-12 sm:py-16 bg-[#FAF8F5] border-t border-[#F0EBE3]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-[#EAE5DA] p-8 sm:p-12 shadow-[0_6px_30px_rgb(0,0,0,0.03)] space-y-8">
            
            <div className="text-center space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-[#D97241] block">
                تواصل مباشر
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1F2722]">
                تواصل معنا
              </h2>
              <p className="text-xs sm:text-sm text-[#7D9683] font-medium max-w-md mx-auto">
                يسعدنا الرد على استفساراتكم وملاحظاتكم لدعم وتطوير منصة عزم في المكلا
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DA] text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-white text-[#D97241] flex items-center justify-center mx-auto shadow-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-black text-[#1F2722]">الموقع الميداني</h3>
                <p className="text-xs text-[#536559] font-medium leading-relaxed">
                  الجمهورية اليمنية • محافظة حضرموت • مدينة المكلا
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DA] text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-white text-[#D97241] flex items-center justify-center mx-auto shadow-sm">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-black text-[#1F2722]">البريد الإلكتروني</h3>
                <p className="text-xs text-[#536559] font-medium font-mono" dir="ltr">
                  info@azm-mukalla.com
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DA] text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-white text-[#D97241] flex items-center justify-center mx-auto shadow-sm">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-black text-[#1F2722]">خدمة المنصة</h3>
                <p className="text-xs text-[#536559] font-medium leading-relaxed">
                  من السبت إلى الخميس: 08:00 ص - 10:00 م
                </p>
              </div>

            </div>

            {/* Quick Actions */}
            <div className="pt-6 border-t border-[#F0EBE3] flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/gyms"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D97241] hover:bg-[#C75F2F] text-white text-xs sm:text-sm font-bold shadow-md transition-all"
              >
                <span>استكشف الصالات الرياضية</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <Link
                to="/calculator"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1F2722] hover:bg-black text-white text-xs sm:text-sm font-bold shadow-md transition-all"
              >
                <span>احسب سعراتك مجاناً</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;

