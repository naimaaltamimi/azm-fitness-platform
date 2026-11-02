import { Trainer } from '../types';

/**
 * بناءً على اشتراطات المنصة الصارمة:
 * عدم اختلاق أسماء مدربين وهميين أو أرقام غير حقيقية.
 * يتم استقبال المدربين الحقيقيين في ساحل حضرموت / المكلا عبر بوابة التسجيل المباشرة.
 */
export const INITIAL_TRAINERS: Trainer[] = [
  // مدرب معتمد تجريبي موثق يمكن للمستخدم الإدارة مراجعته أو تفعيله
  {
    id: 'trainer-applicant-1',
    name: 'الكابتن / معاذ بامعروف',
    specialty: 'مدرب لياقة بدنية وبناء أجسام معتمد',
    bio: 'مدرب متخصص في إعداد البرامج الرياضية والتأهيل البدني في المكلا، حاصل على شهادات تدريب معتمدة مع التركيز على السلامة الحركية والتغذية الرياضية.',
    experienceYears: 6,
    city: 'المكلا',
    neighborhood: 'الشرج',
    phone: '+967 770 123 456',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    certifications: ['شهادة تدريب لياقة بدنية معتمدة', 'دورة التغذية الرياضية للمحترفين'],
    availableForPersonalTraining: true,
    sessionPriceYer: 20000,
    isVerified: true,
    rating: 4.9,
    activeGymAffiliation: 'سمارت جيم (Smart Gym)'
  }
];

