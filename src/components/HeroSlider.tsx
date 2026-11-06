import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { ArrowLeft, CheckCircle2, Flame, Dumbbell, Salad, Compass } from 'lucide-react';

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
  secondaryBtnText?: string;
  secondaryBtnLink?: string;
  secondaryText: string;
  image: string;
  altText: string;
}

const SLIDES_DATA: SlideData[] = [
  {
    id: 1,
    badge: 'المنصة الرياضية المعتمدة في المكلا • ساحل حضرموت',
    titlePrefix: 'دليلك المعتمد',
    pillText: 'لأفضل نوادي المكلا',
    titleSuffix: 'واشتراكات فورية مؤكدة',
    description: 'تصفح الصالات الرياضية المعتمدة في الشرج، فوة المتضررين، والديس مع صور وتجهيزات واقعية وأسعار رسمية محددة بالريال اليمني دون وسطاء.',
    primaryBtnText: 'استكشف الصالات المعتمدة',
    primaryBtnLink: '/gyms',
    secondaryBtnText: 'احسب سعراتك مجاناً',
    secondaryBtnLink: '/calculator',
    secondaryText: '5 صالات حقيقية موثقة ومجربة ميدانياً بالمكلا',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1400&q=85',
    altText: 'تدريب كمال أجسام وأجهزة رياضية متطورة في المكلا',
  },
  {
    id: 2,
    badge: 'تغذية صحية ذكية • مستوحاة من البيئة الساحلية',
    titlePrefix: 'نظامك الغذائي المحسوب',
    pillText: 'بأسماك وثروات المكلا',
    titleSuffix: 'لبناء جسم رياضي قوي',
    description: 'وجبات رياضية غنية بالبروتين تعتمد على صيد بحر المكلا الطازج من سمك الثمد والباغة، محسوبة السعرات والماكروز لدعم أهدافك في التنشيف والتضخيم.',
    primaryBtnText: 'تصفح مكتبة الوجبات الصحية',
    primaryBtnLink: '/meals',
    secondaryBtnText: 'خطة غذائية مخصصة',
    secondaryBtnLink: '/nutrition-plan',
    secondaryText: 'وجبات ساحلية طازجة محسوبة الماكروز بنسبة 100%',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1400&q=85',
    altText: 'طبق صحي متوازن غني بالخضار والبروتين للرياضيين',
  },
  {
    id: 3,
    badge: 'دقة علمية مثبتة • معتمدة عالمياً ومناخياً',
    titlePrefix: 'اعرف احتياج جسمك الفعلي',
    pillText: 'من السعرات والماء',
    titleSuffix: 'وفق مناخ المكلا الساحلي',
    description: 'احسب معدل حرقك اليومي بدقة ميفلين-سانت جور مع تعويض رطوبة وحرارة الساحل، واحصل على جدول الماكروز المخصص لهدفك فوراً.',
    primaryBtnText: 'احسب سعراتك الآن مجاناً',
    primaryBtnLink: '/calculator',
    secondaryBtnText: 'دليل المدربين المعتمدين',
    secondaryBtnLink: '/trainers',
    secondaryText: 'معادلة Mifflin-St Jeor العالمية المعتمدة طبياً',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1400&q=85',
    altText: 'تمارين لياقة بدنية ورشاقة وحساب السعرات بدقة',
  },
];

interface HeroSliderProps {
  slides?: SlideData[];
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ slides = SLIDES_DATA }) => {
  return (
    <div className="w-full relative overflow-hidden bg-forest-950 font-['Cairo',sans-serif]" dir="rtl">
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
        className="w-full min-h-[580px] md:h-[640px] lg:h-[670px] hero-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="w-full h-full">
            <div className="w-full h-full flex flex-col-reverse md:flex-row items-stretch">
              {/* Content Column (52% on Desktop, Full on Mobile) */}
              <div className="w-full md:w-[54%] flex flex-col justify-center items-start px-5 sm:px-10 lg:px-16 py-8 sm:py-12 md:py-16 bg-gradient-to-l from-forest-900 via-forest-800 to-forest-950 text-white relative z-10 border-l border-forest-800/40">
                {/* Ambient Subtle Glows */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-terracotta-500/10 rounded-full blur-3xl pointer-events-none" />
                <div
                  className={`absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl pointer-events-none transition-colors duration-700 ${
                    slide.id === 3 ? 'bg-amber-500/15' : 'bg-sage-500/15'
                  }`}
                />

                {/* Eyebrow Pill Badge */}
                <div className="relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-sand-100 text-xs sm:text-[13px] font-bold mb-4 shadow-sm">
                  <span
                    className={`w-2.5 h-2.5 rounded-full animate-pulse shrink-0 ${
                      slide.id === 3 ? 'bg-amber-400' : 'bg-sage-400'
                    }`}
                  />
                  <span className="line-clamp-1">{slide.badge}</span>
                </div>

                {/* Main Headline with High-Contrast Bold Pill */}
                <h1 className="relative heading-hero text-white mb-4 tracking-tight">
                  <span className="block text-white/95">{slide.titlePrefix}</span>
                  {/* High-Contrast Pill with Terracotta Accent */}
                  <span className="inline-block my-1.5 sm:my-2 px-3.5 sm:px-4 py-1 rounded-2xl bg-white text-forest-900 shadow-xl shadow-black/15 transform hover:scale-[1.01] transition-transform text-[0.88em]">
                    {slide.pillText}
                  </span>
                  <span className="block text-terracotta-400 text-[0.72em] font-extrabold mt-1">
                    {slide.titleSuffix}
                  </span>
                </h1>

                {/* Body Lead Description */}
                <p className="relative text-sand-200 text-sm sm:text-base leading-relaxed max-w-xl mb-6 sm:mb-8 font-medium">
                  {slide.description}
                </p>

                {/* Dual Action Buttons */}
                <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                  <Link
                    to={slide.primaryBtnLink}
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-terracotta-500 text-white hover:bg-terracotta-600 font-extrabold text-sm sm:text-base shadow-xl shadow-terracotta-500/30 hover:shadow-2xl active:scale-95 transition-all group min-h-[46px]"
                  >
                    <span>{slide.primaryBtnText}</span>
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:-translate-x-1" />
                  </Link>

                  {slide.secondaryBtnText && slide.secondaryBtnLink && (
                    <Link
                      to={slide.secondaryBtnLink}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 backdrop-blur-sm transition-all min-h-[46px]"
                    >
                      <span>{slide.secondaryBtnText}</span>
                    </Link>
                  )}
                </div>

                {/* Trust Anchor text below buttons */}
                <p className="relative text-sand-200/90 text-xs sm:text-[13px] font-semibold mt-4 sm:mt-5 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sage-400 shrink-0" />
                  <span>{slide.secondaryText}</span>
                </p>
              </div>

              {/* Image Art Frame Column (48% on Desktop, Full on Mobile) */}
              <div className="w-full md:w-[46%] min-h-[280px] md:min-h-full relative overflow-hidden bg-forest-950 md:rounded-r-none md:rounded-l-[40px] shadow-2xl">
                <img
                  src={slide.image}
                  alt={slide.altText}
                  className="w-full h-full object-cover object-center transform scale-100 transition-transform duration-1000 hover:scale-105"
                  loading="eager"
                />
                {/* Soft gradient edge for seamless visual transition */}
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-forest-900/60 via-transparent to-black/30 pointer-events-none" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
