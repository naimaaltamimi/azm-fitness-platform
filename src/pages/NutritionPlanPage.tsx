import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { storageService } from '../services/storageService';
import {
  Salad,
  Flame,
  Beef,
  Wheat,
  Droplet,
  GlassWater,
  Printer,
  Bookmark,
  CheckCircle,
  Clock,
  ArrowRight
} from 'lucide-react';

export const NutritionPlanPage: React.FC = () => {
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  const passedState = location.state as {
    calories?: number;
    protein?: number;
    carbs?: number;
    fats?: number;
    water?: string;
    goal?: string;
  } | null;

  const [targetCalories, setTargetCalories] = useState<number>(
    passedState?.calories || user?.targetCalories || 2450
  );
  const [proteinGrams, setProteinGrams] = useState<number>(
    passedState?.protein || 155
  );
  const [carbsGrams, setCarbsGrams] = useState<number>(
    passedState?.carbs || 260
  );
  const [fatsGrams, setFatsGrams] = useState<number>(
    passedState?.fats || 65
  );
  const [waterLiters, setWaterLiters] = useState<string>(
    passedState?.water || '3.2'
  );

  const [activePlanType, setActivePlanType] = useState<string>(
    passedState?.goal === 'cut' ? 'تنشيف وحرق دهون' : passedState?.goal === 'bulk' ? 'تضخيم وبناء عضلات' : 'نمط حياة صحي ومتوازن'
  );

  const [isSaved, setIsSaved] = useState(false);

  const dailySchedule = [
    {
      mealTime: '07:30 صباحاً',
      category: 'الفطور الصباحي',
      title: 'شوفان التمر الحضرمي وزبدة الفول السوداني وبياض البيض',
      calories: 520,
      protein: 38,
      carbs: 65,
      fats: 12,
      mealId: 'dates-oatmeal-protein',
      description: 'فطور متكامل يزودك بالطاقة البطيئة ويحمي الكتلة العضلية مع بداية اليوم.'
    },
    {
      mealTime: '11:00 صباحاً',
      category: 'سناك خفيف',
      title: 'حفنة لوز نيء وتفاحة خضراء أو زبادي طبيعي',
      calories: 190,
      protein: 6,
      carbs: 22,
      fats: 10,
      description: 'محاربة الجوع بين الوجبات والحفاظ على استقرار مستوى الأنسولين في الدم.'
    },
    {
      mealTime: '02:30 ظهراً',
      category: 'وجبة الغداء الرئيسية',
      title: 'فيليه سمك الثمد المكلاوي المشوي مع الأرز البني والسلطة الخضراء',
      calories: 580,
      protein: 55,
      carbs: 58,
      fats: 11,
      mealId: 'mukalla-grilled-thamad',
      description: 'وجبة غنية ببروتين صيد المكلا الطازج وأحماض أوميغا-3 الطبيعية لتعزيز الاستشفاء.'
    },
    {
      mealTime: '04:30 عصراً',
      category: 'طاقة ما قبل التمرين',
      title: 'موزة ناضجة + شريحة توست أسمر مع زبدة الفول السوداني وقهوة',
      calories: 270,
      protein: 10,
      carbs: 45,
      fats: 7,
      mealId: 'banana-peanut-preworkout',
      description: 'تُؤكل قبل الدخول للصالة بساعة واحدة لمنحك القوة والتركيز لرفع الأوزان.'
    },
    {
      mealTime: '08:30 مساءً',
      category: 'وجبة العشاء الصحي',
      title: 'أومليت بياض البيض بالخضار والجبن القريش مع خبز البر',
      calories: 390,
      protein: 36,
      carbs: 32,
      fats: 9,
      mealId: 'egg-whites-avocado',
      description: 'عشاء خفيف عالي البروتين ومريح للمعدة قبل النوم لتحفيز هرمون النمو أثناء النوم.'
    }
  ];

  const handleSavePlan = () => {
    storageService.saveNutritionPlan({
      id: 'plan-' + Date.now().toString(36),
      title: `خطة ${activePlanType} (${targetCalories} سعرة)`,
      goal: activePlanType,
      totalCalories: targetCalories,
      proteinGrams,
      carbsGrams,
      fatsGrams,
      waterLiters: Number(waterLiters) || 3.2,
      meals: dailySchedule.map((m) => ({
        mealTime: m.mealTime,
        mealTitle: m.title,
        description: m.description,
        calories: m.calories,
        protein: m.protein
      }))
    });

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-brand-blue-900 via-slate-900 to-brand-dark-900 text-white rounded-3xl p-6 sm:p-8 md:p-12 relative overflow-hidden shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl text-right">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-green-500/20 text-brand-green-400 text-xs font-bold border border-brand-green-500/30">
            <Salad className="w-3.5 h-3.5" />
            <span>خطة تغذية رياضية مخصصة</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black">
            جدول الخطة الغذائية اليومية
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            برنامج غذائي رياضي متكامل مقسم على فترات اليوم بالاعتماد على المكونات الصحية المتوفرة في أسواق المكلا (كالأسماك الطازجة والشوفان والمأكولات النظيفة).
          </p>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 sm:gap-3 w-full sm:w-auto shrink-0">
          <button
            onClick={handlePrint}
            className="flex-1 sm:flex-none justify-center px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold transition-all flex items-center gap-1.5 min-h-[44px]"
          >
            <Printer className="w-4 h-4" />
            <span>طباعة الجدول</span>
          </button>
          <button
            onClick={handleSavePlan}
            className="flex-1 sm:flex-none justify-center px-5 py-3 rounded-xl bg-brand-green-600 hover:bg-brand-green-700 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5 active:scale-95 min-h-[44px]"
          >
            {isSaved ? <CheckCircle className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            <span>{isSaved ? 'تم الحفظ في ملفك' : 'حفظ الخطة'}</span>
          </button>
        </div>
      </div>

      {/* Target Macros Quick Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3">
        <div className="p-3 sm:p-4 rounded-2xl bg-amber-50/50 border border-amber-200/60 shadow-sm text-center">
          <span className="text-[10px] sm:text-[11px] text-amber-800 font-bold block mb-0.5">الهدف الإجمالي</span>
          <span className="text-base sm:text-lg font-black text-amber-600 flex items-center justify-center gap-1 font-mono">
            <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 fill-amber-500/20" />
            {targetCalories}
          </span>
          <span className="text-[9px] sm:text-[10px] text-amber-700/80">سعرة حرارية</span>
        </div>

        <div className="p-3 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm text-center">
          <span className="text-[10px] sm:text-[11px] text-slate-500 block mb-0.5">البروتين اليومي</span>
          <span className="text-base sm:text-lg font-black text-brand-blue-600 flex items-center justify-center gap-1 font-mono">
            <Beef className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            {proteinGrams}g
          </span>
          <span className="text-[9px] sm:text-[10px] text-slate-400">بناء واستشفاء</span>
        </div>

        <div className="p-3 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm text-center">
          <span className="text-[10px] sm:text-[11px] text-slate-500 block mb-0.5">الكربوهيدرات</span>
          <span className="text-base sm:text-lg font-black text-brand-green-600 flex items-center justify-center gap-1 font-mono">
            <Wheat className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            {carbsGrams}g
          </span>
          <span className="text-[9px] sm:text-[10px] text-slate-400">طاقة وجليكوجين</span>
        </div>

        <div className="p-3 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm text-center">
          <span className="text-[10px] sm:text-[11px] text-slate-500 block mb-0.5">الدهون الصحية</span>
          <span className="text-base sm:text-lg font-black text-amber-600 flex items-center justify-center gap-1 font-mono">
            <Droplet className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            {fatsGrams}g
          </span>
          <span className="text-[9px] sm:text-[10px] text-slate-400">توازن هرموني</span>
        </div>

        <div className="p-3 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm text-center col-span-2 sm:col-span-1">
          <span className="text-[10px] sm:text-[11px] text-slate-500 block mb-0.5">شرب الماء (المكلا)</span>
          <span className="text-base sm:text-lg font-black text-sky-600 flex items-center justify-center gap-1 font-mono">
            <GlassWater className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            {waterLiters}L
          </span>
          <span className="text-[9px] sm:text-[10px] text-slate-400">ترطيب يومي</span>
        </div>
      </div>

      {/* Daily Schedule Timeline */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">جدول الوجبات على مدار اليوم</h2>
          <Link to="/calculator" className="text-xs font-bold text-brand-blue-600 hover:underline">
            تعديل أرقام السعرات في الحاسبة
          </Link>
        </div>

        <div className="space-y-4">
          {dailySchedule.map((meal, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue-700">
                    <Clock className="w-3.5 h-3.5 text-brand-blue-600" />
                    {meal.mealTime}
                  </span>
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                    {meal.category}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{meal.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">{meal.description}</p>
              </div>

              {/* Nutrition Mini Card */}
              <div className="flex items-center gap-4 shrink-0 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs w-full md:w-auto justify-between md:justify-end">
                <div className="text-center">
                  <span className="text-[10px] text-slate-500 block">السعرات</span>
                  <span className="font-black text-amber-600 font-mono text-sm flex items-center justify-center gap-0.5">
                    <Flame className="w-3 h-3 text-amber-500 fill-amber-500/20" />
                    {meal.calories}
                  </span>
                </div>
                <div className="text-center">
                  <span className="text-[10px] text-slate-500 block">بروتين</span>
                  <span className="font-black text-brand-blue-600 font-mono text-sm">{meal.protein}g</span>
                </div>
                <div className="text-center">
                  <span className="text-[10px] text-slate-500 block">كارب</span>
                  <span className="font-black text-brand-green-600 font-mono text-sm">{meal.carbs}g</span>
                </div>

                {meal.mealId && (
                  <Link
                    to={`/meals/${meal.mealId}`}
                    className="p-2 rounded-xl bg-white border border-slate-200 text-brand-blue-700 hover:bg-brand-blue-50 transition-colors shadow-sm"
                    title="عرض طريقة التحضير"
                  >
                    <ArrowRight className="w-4 h-4 rotate-180" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

