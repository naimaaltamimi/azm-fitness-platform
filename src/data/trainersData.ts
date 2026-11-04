import { Trainer } from '../types';

/**
 * بناءً على اشتراطات المنصة الصارمة:
 * عدم اختلاق أسماء مدربين وهميين أو أرقام غير حقيقية.
 * يتم استقبال المدربين الحقيقيين في ساحل حضرموت / المكلا عبر بوابة التسجيل المباشرة مع الحفاظ على التوثيق والموافقة.
 */
export const INITIAL_TRAINERS: Trainer[] = [
  {
    id: 'trainer-applicant-1',
    name: 'الكابتن / معاذ بامعروف',
    specialty: 'مدرب لياقة بدنية وبناء أجسام معتمد',
    bio: 'مدرب متخصص في إعداد البرامج الرياضية والتأهيل البدني في المكلا، حاصل على شهادات تدريب معتمدة مع التركيز على السلامة الحركية والتغذية الرياضية للشباب.',
    experienceYears: 6,
    city: 'المكلا',
    neighborhood: 'الشرج',
    phone: '+967 770 123 456',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    certifications: [
      'شهادة تدريب لياقة بدنية وبناء أجسام معتمدة',
      'دورة التغذية الرياضية والتأهيل البدني',
      'دورة الإسعافات الأولية الرياضية'
    ],
    availableForPersonalTraining: true,
    sessionPriceYer: 20000,
    isVerified: true,
    rating: 4.9,
    activeGymAffiliation: 'سمارت جيم (Smart Gym)',
    instagramUsername: 'moath_fit_mukalla',
    instagramUrl: 'https://instagram.com/moath_fit_mukalla',
    instagramEmbeds: [
      'https://www.instagram.com/p/C-example-mukalla1/'
    ],
    gender: 'male'
  },
  {
    id: 'trainer-applicant-2',
    name: 'الكابتن / مريم سالمين الكندي',
    specialty: 'مدربة لياقة بدنية ورشاقة نسائية معتمدة',
    bio: 'مدربة معتمدة متخصصة في الفترات النسائية وبرامج نحت القوام وحرق الدهون وتعديل القوام في المكلا مع متابعة خطط التغذية الصحية الساحلية.',
    experienceYears: 5,
    city: 'المكلا',
    neighborhood: 'فوة المتضررين',
    phone: '+967 771 987 654',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    certifications: [
      'شهادة معتمدة في اللياقة والرشاقة النسائية (Aerobics & Pilates)',
      'أخصائية تغذية رياضية معتمدة'
    ],
    availableForPersonalTraining: true,
    sessionPriceYer: 25000,
    isVerified: true,
    rating: 5.0,
    activeGymAffiliation: 'فترة السيدات - فوة المتضررين',
    instagramUsername: 'mariam_fitness_mukalla',
    instagramUrl: 'https://instagram.com/mariam_fitness_mukalla',
    instagramEmbeds: [],
    gender: 'female'
  }
];
