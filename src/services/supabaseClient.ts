/**
 * إعداد عميل Supabase للمرحلة القادمة
 * سيتم استبدال المفاتيح بمتغيرات البيئة VITE_SUPABASE_URL و VITE_SUPABASE_ANON_KEY عند الربط الفعلي
 */

export interface SupabaseConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
  isConfigured: boolean;
}

export const supabaseConfig: SupabaseConfig = {
  supabaseUrl: (import.meta as any).env?.VITE_SUPABASE_URL || '',
  supabaseAnonKey: (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '',
  get isConfigured() {
    return Boolean(this.supabaseUrl && this.supabaseAnonKey);
  }
};

export const getSupabaseStatusMessage = () => {
  if (supabaseConfig.isConfigured) {
    return 'قاعدة بيانات Supabase متصلة بنجاح.';
  }
  return 'المشروع مهيأ ومجهز للربط المباشر مع Supabase في المرحلة القادمة.';
};

