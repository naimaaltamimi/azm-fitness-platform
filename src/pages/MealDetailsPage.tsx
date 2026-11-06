import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MEALS_DATA } from '../data/mealsData';
import { EmptyState } from '../components/common/EmptyState';
import {
  Utensils,
  Clock,
  Flame,
  Beef,
  Wheat,
  Droplet,
  Check,
  ChevronRight,
  Sparkles,
  Share2
} from 'lucide-react';

export const MealDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const meal = MEALS_DATA.find((m) => m.id === id);

  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});

  if (!meal) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <EmptyState
          icon={Utensils}
          title="الوجبة غير متوفرة"
          description="لم نتمكن من إيجاد الوجبة المطلوبة في مكتبة وجبات عزم."
          actionText="العودة لمكتبة الوجبات"
          actionLink="/meals"
        />
      </div>
    );
  }

  const toggleIngredient = (idx: number) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${meal.title} - عزم`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('تم نسخ رابط الوجبة إلى الحافظة!');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between text-xs text-slate-500 flex-wrap gap-2">
        <div className="flex items-center gap-1.5 flex-wrap min-w-0">
          <Link to="/" className="hover:text-terracotta-600 transition-colors shrink-0">الرئيسية</Link>
          <span>/</span>
          <Link to="/meals" className="hover:text-terracotta-600 transition-colors shrink-0">مكتبة الوجبات</Link>
          <span>/</span>
          <span className="text-forest-900 font-bold truncate max-w-[140px] sm:max-w-none">{meal.title}</span>
        </div>

        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-sand-200 bg-white text-forest-800 hover:bg-sand-50 text-xs font-semibold shadow-sm transition-colors shrink-0"
        >
          <Share2 className="w-3.5 h-3.5 text-terracotta-500" />
          <span className="hidden sm:inline">مشاركة الوصفة</span>
          <span className="sm:hidden">مشاركة</span>
        </button>
      </div>

      {/* Main Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Photo Container */}
        <div className="md:col-span-6 relative aspect-square rounded-3xl overflow-hidden shadow-xl border border-sand-200 bg-forest-900">
          <img
            src={meal.imageUrl}
            alt={meal.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-900/85 backdrop-blur-md text-white text-xs font-bold border border-white/10">
            <Clock className="w-3.5 h-3.5 text-sage-300" />
            <span>وقت التحضير: {meal.prepTimeMinutes} دقيقة</span>
          </div>
        </div>

        {/* Info & Macros Card */}
        <div className="md:col-span-6 bg-white p-5 sm:p-8 rounded-3xl border border-sand-200 shadow-xl space-y-6">
          <div>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {meal.dietaryTags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-sage-50 text-sage-800 border border-sage-200 font-bold text-[10px]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-forest-900 leading-snug">
              {meal.title}
            </h1>
            <p className="text-slate-600 text-xs leading-relaxed mt-2">
              {meal.description}
            </p>
          </div>

          {/* Macro Breakdown */}
          <div className="p-3 sm:p-4 bg-sand-50 rounded-2xl border border-sand-200 space-y-2.5 sm:space-y-3">
            <h3 className="text-xs font-bold text-forest-900">القيمة الغذائية المحسوبة للوجبة:</h3>
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2 text-center">
              <div className="bg-amber-50/70 p-2 sm:p-2.5 rounded-xl border border-amber-200/60 shadow-sm">
                <span className="text-[9px] sm:text-[10px] text-amber-700 font-bold block flex items-center justify-center gap-0.5">
                  <Flame className="w-3 h-3 text-amber-500 fill-amber-500/20" />
                  سعرات
                </span>
                <span className="text-sm sm:text-base font-black text-amber-600 font-mono">{meal.calories}</span>
              </div>
              <div className="bg-sage-50/80 p-2 sm:p-2.5 rounded-xl border border-sage-200/60 shadow-sm">
                <span className="text-[9px] sm:text-[10px] text-sage-800 font-bold block">بروتين</span>
                <span className="text-sm sm:text-base font-black text-sage-700 font-mono">{meal.protein}g</span>
              </div>
              <div className="bg-sand-100/80 p-2 sm:p-2.5 rounded-xl border border-sand-200/80 shadow-sm">
                <span className="text-[9px] sm:text-[10px] text-forest-800 font-bold block">كارب</span>
                <span className="text-sm sm:text-base font-black text-forest-700 font-mono">{meal.carbs}g</span>
              </div>
              <div className="bg-terracotta-50/70 p-2 sm:p-2.5 rounded-xl border border-terracotta-200/60 shadow-sm">
                <span className="text-[9px] sm:text-[10px] text-terracotta-800 block font-bold">دهون</span>
                <span className="text-sm sm:text-base font-black text-terracotta-600 font-mono">{meal.fats}g</span>
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-sand-100/70 rounded-2xl border border-sand-200 text-xs text-forest-900 flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-terracotta-500 shrink-0" />
            <span className="font-medium">وجبة معتمدة ومجربة لرواد صالات اللياقة بالمكلا بمكونات بلدية طازجة.</span>
          </div>
        </div>
      </div>

      {/* Ingredients & Preparation Instructions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* Ingredients */}
        <div className="bg-white p-5 sm:p-8 rounded-3xl border border-sand-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-sand-100 pb-3">
            <h2 className="text-base sm:text-lg font-bold text-forest-900">المقادير والمكونات</h2>
            <span className="text-xs text-slate-500">انقر لتحديد المكون المتوفر</span>
          </div>
          <div className="space-y-2.5">
            {meal.ingredients.map((ing, idx) => {
              const isChecked = !!checkedIngredients[idx];
              return (
                <div
                  key={idx}
                  onClick={() => toggleIngredient(idx)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs min-h-[44px] ${
                    isChecked
                      ? 'bg-sage-50/80 border-sage-200 text-slate-400 line-through'
                      : 'bg-sand-50/60 border-sand-100 text-forest-900 hover:bg-sand-100/70'
                  }`}
                >
                  <span className="font-medium">{ing}</span>
                  <div
                    className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-colors shrink-0 mr-2 ${
                      isChecked
                        ? 'bg-sage-600 border-sage-600 text-white'
                        : 'border-sand-300 bg-white'
                    }`}
                  >
                    {isChecked && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step-by-Step Preparation */}
        <div className="bg-white p-5 sm:p-8 rounded-3xl border border-sand-200 shadow-sm space-y-4">
          <h2 className="text-base sm:text-lg font-bold text-forest-900 border-b border-sand-100 pb-3">
            خطوات التحضير والإعداد
          </h2>
          <div className="space-y-4">
            {meal.instructions.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-forest-900 text-sand-50 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed pt-1">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
