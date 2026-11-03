import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { ArrowLeft } from 'lucide-react';

// Swiper core & module styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export interface SlideData {
  id: string | number;
  badge?: string;
  title: string;
  highlightedText?: string;
  description: string;
  buttonText: string;
  buttonLink?: string;
  image: string;
  altText: string;
}

const SLIDES_DATA: SlideData[] = [
  {
    id: 1,
    badge: 'انطلاقة رياضية جديدة',
    title: 'ابدأ رحلة بناء القوة واللياقة مع',
    highlightedText: 'أفضل صالات المكلا',
    description: 'نوفر لك اشتراكات فورية في نوادي معتمدة، مع أفضل المعدات والمدربين المحترفين لتحقيق أفضل نسخة من ذاتك.',
    buttonText: 'استكشف الصالات واشترك',
    buttonLink: '/gyms',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    altText: 'تدريب كمال أجسام وتمارين قوة في الصالة الرياضية',
  },
  {
    id: 2,
    badge: 'تغذية صحية متوازنة',
    title: 'خطتك الغذائية وحساب سعراتك بدقة مع',
    highlightedText: 'منظومة عزم الذكية',
    description: 'احسب احتياجك اليومي من السعرات والماكروز وفق أحدث المعادلات العلمية مع وجبات محلية صحية ملائمة لأهدافك الرياضية.',
    buttonText: 'احسب سعراتك الآن',
    buttonLink: '/calculator',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
    altText: 'تمارين رياضية ولياقة بدنية ونمط حياة صحي',
  },
];

interface HeroSliderProps {
  slides?: SlideData[];
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ slides = SLIDES_DATA }) => {
  return (
    <section className="w-full font-['Cairo',sans-serif]" dir="rtl">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        loop={true}
        className="w-full h-[600px] md:h-[700px] hero-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="w-full h-full">
            <div className="w-full h-full flex flex-col-reverse md:flex-row">
              {/* Text Container: 50% on Desktop (md+), Full width on Mobile */}
              <div className="w-full md:w-1/2 h-1/2 md:h-full bg-gradient-to-l from-blue-700 to-blue-500 text-white flex flex-col justify-center items-start px-6 sm:px-10 lg:px-16 py-8 md:py-12 relative z-10">
                {slide.badge && (
                  <span className="inline-block px-3.5 py-1 mb-3 sm:mb-4 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-blue-50 border border-white/20">
                    {slide.badge}
                  </span>
                )}

                <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black leading-tight sm:leading-snug mb-3 sm:mb-4 text-white">
                  {slide.title}{' '}
                  {slide.highlightedText && (
                    <span className="block text-amber-300 drop-shadow-sm mt-1">
                      {slide.highlightedText}
                    </span>
                  )}
                </h2>

                <p className="text-sm sm:text-base lg:text-lg text-blue-100 max-w-xl leading-relaxed mb-6 sm:mb-8 line-clamp-3 md:line-clamp-none">
                  {slide.description}
                </p>

                <a
                  href={slide.buttonLink || '#'}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white text-blue-700 font-black text-sm sm:text-base shadow-xl hover:bg-blue-50 hover:shadow-2xl active:scale-95 transition-all group"
                >
                  <span>{slide.buttonText}</span>
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:-translate-x-1" />
                </a>
              </div>

              {/* Image Container: 50% on Desktop (md+), Full width on Mobile */}
              <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden bg-slate-900">
                <img
                  src={slide.image}
                  alt={slide.altText}
                  className="w-full h-full object-cover object-center transform scale-100 transition-transform duration-700 hover:scale-105"
                  loading="eager"
                />
                {/* Gradient overlay for smooth transition */}
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-blue-700/40 md:from-blue-700/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSlider;
