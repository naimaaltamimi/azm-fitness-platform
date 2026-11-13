export type UserRole = 'trainee' | 'trainer' | 'gym_owner' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  neighborhood: string;
  role: UserRole;
  avatarUrl?: string;
  fitnessGoal?: 'fat_loss' | 'muscle_gain' | 'fitness_maintenance' | 'endurance';
  weight?: number; // kg
  height?: number; // cm
  age?: number;
  gender?: 'male' | 'female';
  activityLevel?: 'sedentary' | 'light' | 'moderate' | 'very_active';
  targetCalories?: number;
  password?: string;
}

export interface GymPricingPlan {
  id: string;
  name: string; // e.g. "اشتراك شهر عادي", "اشتراك 3 أشهر VIP"
  period: string; // e.g. "شهر", "3 أشهر", "6 أشهر"
  priceYer: number; // in Yemeni Rials (e.g. 15000, 25000)
  features: string[];
  isPopular?: boolean;
}

export interface GymWorkingHours {
  period: string; // e.g. "فترة صباحية", "فترة مسائية", "فترة نسائية خاصة"
  days: string;   // e.g. "السبت - الخميس"
  hours: string;  // e.g. "04:00 مساءً - 11:30 مساءً"
  targetGroup: 'رجال' | 'نساء' | 'مختلط وفق فترات منفصلة';
}

export interface Gym {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  shortDescription: string;
  fullDescription: string;
  city: 'المكلا';
  neighborhood: string; // e.g. "الشرج", "فوه", "ديس المكلا", "المكلا القديمة"
  addressText: string;
  phone?: string;
  whatsapp?: string;
  coverImage: string;
  galleryImages: string[];
  features: string[]; // e.g. "أجهزة كارديو حديثة", "أوزان حرة متكاملة", "تكييف مركزي", "مدرب معتمد", "مواقف سيارات"
  workingHours: GymWorkingHours[];
  pricingPlans: GymPricingPlan[];
  isVerified: boolean;
  featured: boolean;
  notes?: string;
}

export interface Trainer {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  experienceYears: number;
  city: 'المكلا';
  neighborhood: string;
  phone?: string;
  avatarUrl: string;
  certifications: string[];
  availableForPersonalTraining: boolean;
  sessionPriceYer?: number;
  isVerified: boolean;
  rating?: number;
  activeGymAffiliation?: string;
  gender?: 'male' | 'female';
}

export interface Meal {
  id: string;
  title: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'pre_workout' | 'post_workout';
  calories: number;
  protein: number; // grams
  carbs: number;   // grams
  fats: number;    // grams
  prepTimeMinutes: number;
  imageUrl: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  dietaryTags: string[]; // e.g. "غني بالبروتين", "خالي من السكر", "سمك طازج محلي", "قليل الدهون"
}

export interface SubscriptionRequest {
  id: string;
  createdAt: string;
  userId: string;
  userName: string;
  userPhone: string;
  gymId: string;
  gymName: string;
  planId: string;
  planName: string;
  priceYer: number;
  preferredShift: 'morning' | 'evening';
  paymentMethod: 'cash_at_gym' | 'kuraimi_exchange' | 'omgy_exchange';
  paymentReference?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'active';
  startDate: string;
  notes?: string;
}

export interface NutritionPlan {
  id: string;
  title: string;
  goal: string;
  totalCalories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatsGrams: number;
  waterLiters: number;
  meals: {
    mealTime: string;
    mealTitle: string;
    description: string;
    calories: number;
    protein: number;
  }[];
}

