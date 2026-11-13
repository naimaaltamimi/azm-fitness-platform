import { SubscriptionRequest, NutritionPlan, Trainer, Gym } from '../types';
import { INITIAL_TRAINERS } from '../data/trainersData';
import { MUKALLA_GYMS } from '../data/mukallaGymsData';

const SUBSCRIPTIONS_KEY = 'azm_subscriptions';
const NUTRITION_PLAN_KEY = 'azm_saved_nutrition_plan';
const APPLIED_TRAINERS_KEY = 'azm_applied_trainers';
const GYMS_KEY = 'azm_gyms_data';

// Real production subscriptions - starts clean and only records actual user requests
const INITIAL_SUBSCRIPTIONS: SubscriptionRequest[] = [];

export const storageService = {
  // ===================== Subscriptions CRUD =====================
  getSubscriptions(): SubscriptionRequest[] {
    try {
      const data = localStorage.getItem(SUBSCRIPTIONS_KEY);
      if (!data) {
        return INITIAL_SUBSCRIPTIONS;
      }
      const parsed: SubscriptionRequest[] = JSON.parse(data);
      // Clean out any legacy mock demo subscriptions
      const cleaned = parsed.filter(
        (s) => s.id !== 'sub-mukalla-101' && s.id !== 'sub-mukalla-102'
      );
      if (cleaned.length !== parsed.length) {
        localStorage.setItem(SUBSCRIPTIONS_KEY, JSON.stringify(cleaned));
      }
      return cleaned;
    } catch (e) {
      console.error(e);
      return INITIAL_SUBSCRIPTIONS;
    }
  },

  getUserSubscriptions(userId: string): SubscriptionRequest[] {
    const all = this.getSubscriptions();
    return all.filter((s) => s.userId === userId);
  },

  getGymSubscriptions(gymIdOrSlug: string): SubscriptionRequest[] {
    const all = this.getSubscriptions();
    return all.filter((s) => s.gymId === gymIdOrSlug || s.gymName.toLowerCase().includes(gymIdOrSlug.toLowerCase()));
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

  deleteSubscription(id: string): boolean {
    let all = this.getSubscriptions();
    const initialLen = all.length;
    all = all.filter((s) => s.id !== id);
    if (all.length !== initialLen) {
      localStorage.setItem(SUBSCRIPTIONS_KEY, JSON.stringify(all));
      window.dispatchEvent(new Event('azm_storage_update'));
      return true;
    }
    return false;
  },

  // ===================== Gyms CRUD =====================
  getGyms(): Gym[] {
    try {
      const data = localStorage.getItem(GYMS_KEY);
      if (!data) {
        localStorage.setItem(GYMS_KEY, JSON.stringify(MUKALLA_GYMS));
        return MUKALLA_GYMS;
      }
      const parsed: Gym[] = JSON.parse(data);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        localStorage.setItem(GYMS_KEY, JSON.stringify(MUKALLA_GYMS));
        return MUKALLA_GYMS;
      }
      return parsed;
    } catch {
      return MUKALLA_GYMS;
    }
  },

  getGymById(idOrSlug: string): Gym | undefined {
    const gyms = this.getGyms();
    return gyms.find((g) => g.id === idOrSlug || g.slug === idOrSlug);
  },

  addGym(gymData: Omit<Gym, 'id' | 'slug'> & { slug?: string }): Gym {
    const all = this.getGyms();
    const generatedSlug =
      gymData.slug ||
      (gymData.nameEn ? gymData.nameEn.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'gym-' + Date.now().toString(36));
    const newGym: Gym = {
      ...gymData,
      id: 'gym-' + Date.now().toString(36),
      slug: generatedSlug
    };
    all.unshift(newGym);
    localStorage.setItem(GYMS_KEY, JSON.stringify(all));
    window.dispatchEvent(new Event('azm_storage_update'));
    return newGym;
  },

  updateGym(id: string, updates: Partial<Gym>): Gym[] {
    const all = this.getGyms();
    const index = all.findIndex((g) => g.id === id);
    if (index !== -1) {
      all[index] = { ...all[index], ...updates };
      localStorage.setItem(GYMS_KEY, JSON.stringify(all));
      window.dispatchEvent(new Event('azm_storage_update'));
    }
    return all;
  },

  deleteGym(id: string): Gym[] {
    let all = this.getGyms();
    all = all.filter((g) => g.id !== id);
    localStorage.setItem(GYMS_KEY, JSON.stringify(all));
    window.dispatchEvent(new Event('azm_storage_update'));
    return all;
  },

  resetGyms(): Gym[] {
    localStorage.setItem(GYMS_KEY, JSON.stringify(MUKALLA_GYMS));
    window.dispatchEvent(new Event('azm_storage_update'));
    return MUKALLA_GYMS;
  },

  // ===================== Nutrition Plan =====================
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

  // ===================== Trainers CRUD =====================
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
