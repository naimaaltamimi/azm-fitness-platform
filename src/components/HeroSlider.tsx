import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { ArrowLeft, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

// Swiper core & module styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export interface SlideData {
  id: string | number;
  badge: string;
  titlePrefix: string;
  pillText: string;
  titleSuffix: string;
  description: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  secondaryText: string;
  image: string;
  altText: string;
}

const SLIDES_DATA: SlideData[] = [
  {
    id: 1,
    badge: 'المنصة الرياضية الأولى في المكلا • ساحل حضرموت',
    titlePrefix: 'دليلك المعتمد',
    pillText: 'لأفضل نوادي المكلا',
    titleSuffix: 'واشتراكات فورية',
    description: 'تصفح الصالات الرياضية المعتمدة في الشرج، فوة المتضررين، والديس مع صور وتجهيزات واقعية وأسعار رسمية مباشرة دون تعقيد.',
    primaryBtnText: 'استكشف الصالات المعتمدة',
    primaryBtnLink: '/gyms',
    secondaryText: '✓ 5 صالات حقيقية موثقة ومعاينة ميدانياً',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1400&q=85',
    altText: 'تدريب كمال أجسام وأجهزة رياضية متطورة في المكلا',
  },
  {
    id: 2,
    badge: 'تغذية صحية ذكية • مستوحاة من البيئة الساحلية',
    titlePrefix: 'نظامك الغذائي المحسوب',
    pillText: 'بأسماك وثروات المكلا',
    titleSuffix: 'لبناء جسم مثالي',
    description: 'وجبات رياضية غنية بالبروتين تعتمد على صيد بحر المكلا الطازج من سمك الثمد، محسوبة السعرات والماكروز لدعم أهدافك الرياضية.',
    primaryBtnText: 'تصفح مكتبة الوجبات الصحية',
    primaryBtnLink: '/meals',
    secondaryText: '✓ وجبات محلية طازجة غنية بالبروتين والمعادن',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1400&q=85',
    altText: 'طبق صحي متوازن غني بالخضار والبروتين للرياضيين',
  },
  {
    id: 3,
    badge: 'دقة علمية مثبتة • معتمدة عالمياً',
    titlePrefix: 'اعرف احتياج جسمك الفعلي',
    pillText: 'من السعرات والماء',
    titleSuffix: 'لمناخ المكلا الساحلي',
    description: 'احسب معدل حرقك اليومي بدقة ميفلين-سانت جور مع تعويض حرارة ورطوبة الساحل، واحصل على تقسيم الماكروز المناسب فوراً.',
    primaryBtnText: 'احسب سعراتك الآن مجاناً',
    primaryBtnLink: '/calculator',
    secondaryText: '✓ معادلة Mifflin-St Jeor المعتمدة لدى خبراء التغذية',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1400&q=85',
    altText: 'تمارين لياقة بدنية ورشاقة وحساب السعرات بدقة',
  },
];

interface HeroSliderProps {
  slides?: SlideData[];
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ slides = SLIDES_DATA }) => {
  return (
    <div className="w-full relative overflow-hidden bg-brand-blue-950 font-['Cairo',sans-serif]" dir="rtl">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        loop={true}
        className="w-full min-h-[580px] md:h-[640px] lg:h-[680px] hero-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="w-full h-full">
            <div className="w-full h-full flex flex-col-reverse md:flex-row">
              {/* Text Column (50% on Desktop, Full on Mobile) - Inspired by MyFitnessPal vibrant gradient */}
              <div className="w-full md:w-1/2 flex flex-col justify-center items-start px-4 sm:px-10 lg:px-16 py-8 sm:py-12 md:py-16 bg-gradient-to-l from-brand-blue-700 via-brand-blue-600 to-brand-blue-800 text-white relative z-10">
                {/* Ambient glow effect inside text container */}
                <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-green-500/15 rounded-full blur-3xl pointer-events-none" />

                {/* Pill Badge */}
                <div className="relative inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-blue-50 text-[11px] sm:text-xs font-bold mb-3 sm:mb-4 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-brand-green-400 animate-pulse shrink-0" />
                  <span className="line-clamp-1">{slide.badge}</span>
                </div>

                {/* Main Headline with MyFitnessPal-style Highlight Pill */}
                <h1 className="relative text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.3] mb-3 sm:mb-4 tracking-tight">
                  <span className="block">{slide.titlePrefix}</span>
                  {/* High-Contrast White Pill with Blue Text (MyFitnessPal Aesthetic) */}
                  <span className="inline-block my-1 sm:my-1.5 px-3 sm:px-4 py-0.5 sm:py-1 rounded-2xl bg-white text-brand-blue-700 shadow-xl shadow-black/15 transform hover:scale-[1.02] transition-transform text-xl sm:text-3xl lg:text-4xl">
                    {slide.pillText}
                  </span>
                  <span className="block text-sky-200 text-lg sm:text-2xl lg:text-3xl font-extrabold mt-1">
                    {slide.titleSuffix}
                  </span>
                </h1>

                {/* Subtitle / Description */}
                <p className="relative text-blue-100 text-xs sm:text-sm lg:text-base leading-relaxed max-w-xl mb-6 sm:mb-7 line-clamp-3 md:line-clamp-none font-medium">
                  {slide.description}
                </p>

                {/* CTA Action Button */}
                <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                  <Link
                    to={slide.primaryBtnLink}
                    className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white text-brand-blue-700 hover:bg-blue-50 hover:text-brand-blue-800 font-black text-xs sm:text-sm md:text-base shadow-xl hover:shadow-2xl active:scale-95 transition-all group min-h-[44px]"
                  >
                    <span>{slide.primaryBtnText}</span>
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:-translate-x-1 text-brand-blue-600" />
                  </Link>
                </div>

                {/* Trust Anchor text below button */}
                <p className="relative text-blue-200/90 text-[11px] sm:text-xs font-semibold mt-3 sm:mt-4 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-green-400 shrink-0" />
                  <span>{slide.secondaryText}</span>
                </p>
              </div>

              {/* Image Column (50% on Desktop, Full on Mobile) */}
              <div className="w-full md:w-1/2 min-h-[260px] md:min-h-full relative overflow-hidden bg-slate-900">
                <img
                  src={slide.image}
                  alt={slide.altText}
                  className="w-full h-full object-cover object-center transform scale-100 transition-transform duration-1000 hover:scale-105"
                  loading="eager"
                />
                {/* Soft gradient edge for seamless integration */}
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-brand-blue-700/60 via-transparent to-black/20 pointer-events-none" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
