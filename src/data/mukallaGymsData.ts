import { Gym } from '../types';

export const MUKALLA_GYMS: Gym[] = [
  {
    id: 'smart-gym-mukalla',
    slug: 'smart-gym',
    nameAr: 'سمارت جيم (Smart Gym)',
    nameEn: 'Smart Gym Mukalla',
    shortDescription: 'صالة رياضية متكاملة للياقة وبناء الأجسام في قلب فوة المتضررين بالمكلا.',
    fullDescription: 'تعتبر صالة سمارت جيم إحدى أبرز وجهات اللياقة وبناء الأجسام في منطقة فوة المتضررين بمدينة المكلا، حيث توفر تجهيزات متكاملة لتمارين المقاومة، الأوزان الحرة، وأجهزة الكارديو واللياقة البدنية، تحت إشراف مدربين مؤهلين لمتابعة الأداء والتطور الحركي.',
    city: 'المكلا',
    neighborhood: 'فوة المتضررين',
    addressText: 'المكلا - فوة، حي المتضررين، الشارع التجاري العام',
    phone: '+967 733 444 520',
    whatsapp: '+967733444520',
    coverImage: '/images/clubs/smart-gym/interior.png',
    galleryImages: [
      '/images/clubs/smart-gym/facade.png',
      '/images/clubs/smart-gym/interior.png',
      '/images/clubs/smart-gym/hd-interior.jpg',
      '/images/clubs/smart-gym/hd-weights.jpg'
    ],
    features: [
      'أجهزة مقاومة متطورة لجميع العضلات',
      'منطقة أوزان حرة متكاملة ودنابل متعددة الأوزان',
      'أجهزة كارديو ولياقة بدنية متطورة',
      'إشراف وتوجيه كباتن متخصصين',
      'تهوية وتكييف مريح للتمارين الشاقة',
      'خزانات أمانات خاصة للمشتركين'
    ],
    workingHours: [
      {
        period: 'الفترة الصباحية',
        days: 'من السبت إلى الخميس',
        hours: '06:00 صباحاً - 10:30 صباحاً',
        targetGroup: 'رجال'
      },
      {
        period: 'الفترة المسائية',
        days: 'من السبت إلى الخميس',
        hours: '04:00 عصراً - 11:30 مساءً',
        targetGroup: 'رجال'
      }
    ],
    pricingPlans: [
      {
        id: 'smart-month',
        name: 'اشتراك شهري أساسي',
        period: 'شهر واحد',
        priceYer: 15000,
        features: ['دخول يومي مفتوح لكافة الأجهزة', 'استخدام مرافق الصالة وغرف التبديل', 'برنامج تدريب تمهيدي للمبتدئين'],
        isPopular: true
      },
      {
        id: 'smart-3months',
        name: 'باقة التطوير (3 أشهر)',
        period: '3 أشهر',
        priceYer: 40000,
        features: ['دخول مفتوح لـ 90 يوماً', 'قياسات دورية لنسبة الدهون والكتلة العضلية', 'متابعة جدول التمارين المحدث']
      },
      {
        id: 'smart-annual',
        name: 'الباقة السنوية الاحترافية',
        period: 'سنة كاملة',
        priceYer: 140000,
        features: ['توفير كبير على مدار 12 شهراً', 'إمكانية تجميد الاشتراك لمدة 30 يوماً', 'أولوية في الاستشارات التغذوية']
      }
    ],
    isVerified: true,
    featured: true,
    notes: 'الصالة معتمدة وموثقة وموقعها واضح بحي المتضررين في فوة.'
  },
  {
    id: 'mukalla-gym-club',
    slug: 'mukalla-gym',
    nameAr: 'المكلا جيم (Mukalla Gym)',
    nameEn: 'Mukalla Gym',
    shortDescription: 'صالة اللياقة والتمرين الشامل في الشرج فوق قاعة ميرال بأحدث التجهيزات الرياضية.',
    fullDescription: 'تقدم صالة المكلا جيم تجربة لياقة شاملة ومميزة في منطقة الشرج فوق قاعة ميرال، بتجهيزات عصرية وألوان حمراء وسوداء محفزة، تضم أجهزة صدر، أكتاف، ظهر، أجهزة كابلات، ومضمار سير كهربائي متطور.',
    city: 'المكلا',
    neighborhood: 'الشرج',
    addressText: 'المكلا - الشرج، فوق قاعة ميرال للمناسبات والأفراح',
    phone: '+967 777 555 666',
    whatsapp: '+967777555666',
    coverImage: '/images/clubs/mukalla-gym/hd-red-machines.jpg',
    galleryImages: [
      '/images/clubs/mukalla-gym/hd-red-machines.jpg',
      '/images/clubs/mukalla-gym/machines-red.jpg',
      '/images/clubs/mukalla-gym/hd-fitness.jpg'
    ],
    features: [
      'خط كامل من أجهزة المقاومة الحديثة ذات اللون الأحمر',
      'موقع استراتيجي بالشرج فوق قاعة ميرال',
      'بيئة نظيفة ومنظمة بأرضيات عازلة لامتصاص الصدمات',
      'أجهزة لياقة عامة، تخسيس، وحرق دهون'
    ],
    workingHours: [
      {
        period: 'الفترة المسائية الممتدة',
        days: 'من السبت إلى الخميس',
        hours: '03:30 عصراً - 11:30 مساءً',
        targetGroup: 'رجال'
      }
    ],
    pricingPlans: [
      {
        id: 'mukalla-month',
        name: 'اشتراك شهري شامل',
        period: 'شهر واحد',
        priceYer: 15000,
        features: ['دخول مفتوح لجميع الأجهزة', 'متابعة دورية من مشرف الصالة', 'استخدام الخزانات وغرف التبديل'],
        isPopular: true
      },
      {
        id: 'mukalla-3months',
        name: 'اشتراك 3 أشهر المميز',
        period: '3 أشهر',
        priceYer: 40000,
        features: ['دخول مفتوح طوال فترة الاشتراك', 'توجيهات غذائية وتمارين مخصصة']
      }
    ],
    isVerified: true,
    featured: true,
    notes: 'موقع مميز جداً بالشرج فوق قاعة ميرال يسهل الوصول إليه.'
  },
  {
    id: 'golds-gym-mukalla',
    slug: 'golds-gym',
    nameAr: 'قولدن جيم (Golden Gym)',
    nameEn: 'Golden Gym Mukalla',
    shortDescription: 'صالة حديثة مجهزة بأحدث خطوط إنتاج الأجهزة الرياضية وموقع استراتيجي بالشرج فوق شركة الشامل.',
    fullDescription: 'يتميز قولدن جيم بالشرج بموقعه الحيوي البارز وتجهيزاته الاحترافية التي تلبي تطلعات أبطال كمال الأجسام والراغبين في خسارة الوزن ورفع اللياقة، مع صالات تمرين واسعة ومرايا بانورامية وأجهزة كارديو Matrix عالمية.',
    city: 'المكلا',
    neighborhood: 'الشرج',
    addressText: 'المكلا - الشرج، شارع الميناء / فوق مقر شركة الشامل للصرافة',
    phone: '+967 770 000 000',
    whatsapp: '+967770000000',
    coverImage: '/images/clubs/golds-gym/hd-cover.jpg',
    galleryImages: [
      '/images/clubs/golds-gym/facade.png',
      '/images/clubs/golds-gym/interior-mirror.png',
      '/images/clubs/golds-gym/hd-cover.jpg',
      '/images/clubs/golds-gym/hd-cardio.jpg'
    ],
    features: [
      'صالة كارديو مجهزة بأجهزة مشي ودراجات حديثة عالية الدقة',
      'أجهزة عزل ومقاومة متقدمة للمحترفين والمبتدئين',
      'إطلالة بانورامية واسعة بالشرج وتكييف مركزي متكامل',
      'منطقة تمارين بطن ومرونة واستطالة مخصصة',
      'أرضيات مطاطية احترافية لامتصاص الصدمات والأوزان الثقيلة'
    ],
    workingHours: [
      {
        period: 'الفترة الصباحية',
        days: 'من السبت إلى الخميس',
        hours: '06:30 صباحاً - 11:00 صباحاً',
        targetGroup: 'رجال'
      },
      {
        period: 'الفترة المسائية',
        days: 'من السبت إلى الخميس',
        hours: '03:30 عصراً - 11:30 مساءً',
        targetGroup: 'رجال'
      }
    ],
    pricingPlans: [
      {
        id: 'gold-month',
        name: 'اشتراك شهر كامل',
        period: 'شهر واحد',
        priceYer: 18000,
        features: ['استخدام غير محدود لأجهزة الكارديو والأوزان', 'خزانة شخصية أثناء التمرين', 'إرشادات وضعيات التمارين الصحيحة'],
        isPopular: true
      },
      {
        id: 'gold-3months',
        name: 'اشتراك 3 أشهر الذهبي',
        period: '3 أشهر',
        priceYer: 48000,
        features: ['دخول مفتوح كامل المرافق', 'تقييم بدني شهري', 'استشارة تدريبية مجانية']
      }
    ],
    isVerified: true,
    featured: true,
    notes: 'موقع استراتيجي شهير في الشرج فوق شركة الشامل للصرافة.'
  },
  {
    id: 'winner-gym-mukalla',
    slug: 'winner-gym',
    nameAr: 'وينر جيم (Winner Gym)',
    nameEn: 'Winner Gym Mukalla',
    shortDescription: 'مركز رياضي عصري بالشرج بجانب مارينا مول الدور الثاني يجمع بين أجهزة الركض وتمارين القوة.',
    fullDescription: 'يعد وينر جيم من الصالات العصرية الفاخرة في الشرج بموقع مميز بجانب مارينا مول بالدور الثاني، ويحظى بإقبال واسع من الشباب بفضل بيئته الرياضية الحماسية، وأجهزة المشي والسبينينج الزرقاء الحديثة، وجداول التمارين التي تركز على التحمل وحرق السعرات.',
    city: 'المكلا',
    neighborhood: 'الشرج',
    addressText: 'المكلا - الشرج، بجانب مارينا مول، الدور الثاني',
    phone: '+967 775 111 222',
    whatsapp: '+967775111222',
    coverImage: '/images/clubs/winner-gym/treadmills.png',
    galleryImages: [
      '/images/clubs/winner-gym/logo.png',
      '/images/clubs/winner-gym/treadmills.png',
      '/images/clubs/winner-gym/hd-treadmills.jpg',
      '/images/clubs/winner-gym/hd-zone.jpg'
    ],
    features: [
      'صف أجهزة ركض كهربائية ذكية وشاشات تتبع عالية الدقة',
      'موقع فاخر بالشرج بجانب مارينا مول - الدور الثاني',
      'دراجات هوائية وسبينينج متطورة لحرق الدهون',
      'أجهزة كابلات ومقاومة متعددة المستويات',
      'موسيقى رياضية تحفيزية ونظام إضاءة عصري',
      'برامج متخصصة لتخسيس الوزن وبناء اللياقة'
    ],
    workingHours: [
      {
        period: 'فترة الظهيرة والمساء',
        days: 'من السبت إلى الخميس',
        hours: '03:00 مساءً - 11:30 مساءً',
        targetGroup: 'رجال'
      }
    ],
    pricingPlans: [
      {
        id: 'winner-month',
        name: 'اشتراك شهري كارديو وحديد',
        period: 'شهر واحد',
        priceYer: 16000,
        features: ['استخدام حر لأجهزة السير والكارديو', 'استخدام صالة الأوزان الحرة', 'متابعة أسبوعية للوزن'],
        isPopular: true
      },
      {
        id: 'winner-3months',
        name: 'اشتراك 3 أشهر اللياقة',
        period: '3 أشهر',
        priceYer: 42000,
        features: ['خطة تمرين مقترحة', 'دخول غير محدود لجميع الحصص المفتوحة']
      }
    ],
    isVerified: true,
    featured: true,
    notes: 'موقع فاخر وسهل الوصول بالشرج بجانب مارينا مول الدور الثاني.'
  },
  {
    id: 'power-gym-mukalla',
    slug: 'power-gym',
    nameAr: 'باور جيم (Power Gym)',
    nameEn: 'Power Gym Mukalla',
    shortDescription: 'صالة القوة البدنية الكلاسيكية وعشاق رفع الأثقال وتضخيم العضلات في ديس المكلا.',
    fullDescription: 'باور جيم هي الصالة المفضلة لعشاق القوة الصافية ورفع الأثقال وبناء الأجسام في منطقة ديس المكلا. تتميز بتنوع ضخم في الأوزان الحرة والبارات الأولمبية ومصاطب الضغط المختلفة التي تلبي التمارين العنيفة والشاقة.',
    city: 'المكلا',
    neighborhood: 'ديس المكلا',
    addressText: 'المكلا - الديس، بالقرب من الجسر الصيني',
    phone: '+967 771 333 444',
    whatsapp: '+967771333444',
    coverImage: '/images/clubs/power-gym/hall.png',
    galleryImages: [
      '/images/clubs/power-gym/hall.png',
      '/images/clubs/power-gym/hd-power.jpg',
      '/images/clubs/power-gym/hd-dumbbells.jpg'
    ],
    features: [
      'مجموعة دنابل ثقيلة تصل لأوزان متقدمة',
      'منصات ديدلفت ومقاعد بنش متعددة الزوايا',
      'أجهزة أرجل مكبس وسكوات مخصصة',
      'أجواء تدريب حماسية جادة لعشاق الباورليفتنج',
      'أسعار اشتراك في متناول كافة الشباب'
    ],
    workingHours: [
      {
        period: 'الفترة المسائية الممتدة',
        days: 'من السبت إلى الخميس',
        hours: '03:30 عصراً - 12:00 منتصف الليل',
        targetGroup: 'رجال'
      }
    ],
    pricingPlans: [
      {
        id: 'power-month',
        name: 'اشتراك القوة الشهري',
        period: 'شهر واحد',
        priceYer: 14000,
        features: ['دخول يومي كامل للصالة', 'استخدام البارات والأوزان الثقيلة', 'نصائح توجيهية للرفع الصحيح'],
        isPopular: true
      },
      {
        id: 'power-quarter',
        name: 'باقة الأبطال (3 أشهر)',
        period: '3 أشهر',
        priceYer: 36000,
        features: ['توفير مميز للرياضيين المنتظمين', 'متابعة أرقام الأوزان والقوة البدنية']
      }
    ],
    isVerified: true,
    featured: false,
    notes: 'صالة ذات تاريخ عريق في ديس المكلا وروادها من نخبة الرياضيين.'
  }
];
