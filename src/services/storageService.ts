import { SubscriptionRequest, NutritionPlan, Trainer } from '../types';
import { INITIAL_TRAINERS } from '../data/trainersData';

const SUBSCRIPTIONS_KEY = 'azm_subscriptions';
const NUTRITION_PLAN_KEY = 'azm_saved_nutrition_plan';
const APPLIED_TRAINERS_KEY = 'azm_applied_trainers';

// Initial seed subscription so the trainee and admin can immediately test without hassle
const INITIAL_SUBSCRIPTIONS: SubscriptionRequest[] = [
  {
    id: 'sub-mukalla-101',
    createdAt: new Date().toISOString(),
    userId: 'user-trainee-1',
    userName: 'سالم أحمد باحشوان',
    userPhone: '+967 771 234 567',
    gymId: 'smart-gym-mukalla',
    gymName: 'سمارت جيم (Smart Gym)',
    planId: 'smart-month',
    planName: 'اشتراك شهري أساسي',
    priceYer: 15000,
    preferredShift: 'evening',
    paymentMethod: 'cash_at_gym',
    status: 'confirmed',
    startDate: new Date().toISOString().split('T')[0],
    notes: 'التدريب في الفترة المسائية - تجديد اشتراك شهري'
  }
];

export const storageService = {
  // Subscriptions
  getSubscriptions(): SubscriptionRequest[] {
    try {
      const data = localStorage.getItem(SUBSCRIPTIONS_KEY);
      if (!data) {
        localStorage.setItem(SUBSCRIPTIONS_KEY, JSON.stringify(INITIAL_SUBSCRIPTIONS));
        return INITIAL_SUBSCRIPTIONS;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error(e);
      return INITIAL_SUBSCRIPTIONS;
    }
  },

  getUserSubscriptions(userId: string): SubscriptionRequest[] {
    const all = this.getSubscriptions();
    return all.filter((s) => s.userId === userId);
  },

  addSubscription(sub: Omit<SubscriptionRequest, 'id' | 'createdAt'>): SubscriptionRequest {
    const all = this.getSubscriptions();
    const newSub: SubscriptionRequest = {
      ...sub,
      id: 'sub-' + Date.now().toString(36),
      createdAt: new Date().toISOString()
    };
    all.unshift(newSub);
    localStorage.setItem(SUBSCRIPTIONS_KEY, JSON.stringify(all));
    window.dispatchEvent(new Event('azm_storage_update'));
    return newSub;
  },

  updateSubscriptionStatus(id: string, status: SubscriptionRequest['status']): boolean {
    const all = this.getSubscriptions();
    const index = all.findIndex((s) => s.id === id);
    if (index !== -1) {
      all[index].status = status;
      localStorage.setItem(SUBSCRIPTIONS_KEY, JSON.stringify(all));
      window.dispatchEvent(new Event('azm_storage_update'));
      return true;
    }
    return false;
  },

  // Nutrition Plan
  getSavedNutritionPlan(): NutritionPlan | null {
    try {
      const data = localStorage.getItem(NUTRITION_PLAN_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  saveNutritionPlan(plan: NutritionPlan): void {
    localStorage.setItem(NUTRITION_PLAN_KEY, JSON.stringify(plan));
    window.dispatchEvent(new Event('azm_storage_update'));
  },

  // Trainers
  getTrainers(): Trainer[] {
    try {
      const custom = localStorage.getItem(APPLIED_TRAINERS_KEY);
      const applied: Trainer[] = custom ? JSON.parse(custom) : [];
      return [...INITIAL_TRAINERS, ...applied];
    } catch {
      return INITIAL_TRAINERS;
    }
  },

  applyAsTrainer(trainer: Omit<Trainer, 'id'>): Trainer {
    const existing = this.getTrainers();
    const newTrainer: Trainer = {
      ...trainer,
      id: 'trainer-' + Date.now().toString(36)
    };
    const custom = localStorage.getItem(APPLIED_TRAINERS_KEY);
    const applied: Trainer[] = custom ? JSON.parse(custom) : [];
    applied.unshift(newTrainer);
    localStorage.setItem(APPLIED_TRAINERS_KEY, JSON.stringify(applied));
    window.dispatchEvent(new Event('azm_storage_update'));
    return newTrainer;
  },

  updateTrainer(id: string, updates: Partial<Trainer>): Trainer[] {
    try {
      const custom = localStorage.getItem(APPLIED_TRAINERS_KEY);
      let applied: Trainer[] = custom ? JSON.parse(custom) : [];
      applied = applied.map((t) => (t.id === id ? { ...t, ...updates } : t));
      localStorage.setItem(APPLIED_TRAINERS_KEY, JSON.stringify(applied));
      window.dispatchEvent(new Event('azm_storage_update'));
      return this.getTrainers();
    } catch {
      return this.getTrainers();
    }
  },

  deleteTrainer(id: string): Trainer[] {
    try {
      const custom = localStorage.getItem(APPLIED_TRAINERS_KEY);
      let applied: Trainer[] = custom ? JSON.parse(custom) : [];
      applied = applied.filter((t) => t.id !== id);
      localStorage.setItem(APPLIED_TRAINERS_KEY, JSON.stringify(applied));
      window.dispatchEvent(new Event('azm_storage_update'));
      return this.getTrainers();
    } catch {
      return this.getTrainers();
    }
  }
};

