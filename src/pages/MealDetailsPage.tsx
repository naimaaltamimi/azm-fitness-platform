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
      <div className="flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <Link to="/" className="hover:text-brand-blue-600">الرئيسية</Link>
          <span>/</span>
          <Link to="/meals" className="hover:text-brand-blue-600">مكتبة الوجبات</Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">{meal.title}</span>
        </div>

        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>مشاركة الوصفة</span>
        </button>
      </div>

      {/* Main Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Photo Container */}
        <div className="md:col-span-6 relative aspect-square rounded-3xl overflow-hidden shadow-xl border border-slate-200/90 bg-slate-900">
          <img
            src={meal.imageUrl}
            alt={meal.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold">
            <Clock className="w-3.5 h-3.5 text-brand-green-400" />
            <span>وقت التحضير: {meal.prepTimeMinutes} دقيقة</span>
          </div>
        </div>

        {/* Info & Macros Card */}
        <div className="md:col-span-6 bg-white p-8 rounded-3xl border border-slate-200/90 shadow-xl space-y-6">
          <div>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {meal.dietaryTags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-brand-green-50 text-brand-green-700 font-bold text-[10px]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-2xl font-black text-slate-900 leading-snug">
              {meal.title}
            </h1>
            <p className="text-slate-600 text-xs leading-relaxed mt-2">
              {meal.description}
            </p>
          </div>

          {/* Macro Breakdown */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
            <h3 className="text-xs font-bold text-slate-700">القيمة الغذائية المحسوبة للوجبة:</h3>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-white p-2.5 rounded-xl border border-slate-200/70">
                <span className="text-[10px] text-slate-500 block">سعرات</span>
                <span className="text-base font-black text-amber-600 font-mono">{meal.calories}</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200/70">
                <span className="text-[10px] text-slate-500 block">بروتين</span>
                <span className="text-base font-black text-brand-blue-600 font-mono">{meal.protein}g</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200/70">
                <span className="text-[10px] text-slate-500 block">كارب</span>
                <span className="text-base font-black text-brand-green-600 font-mono">{meal.carbs}g</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200/70">
                <span className="text-[10px] text-slate-500 block">دهون</span>
                <span className="text-base font-black text-amber-700 font-mono">{meal.fats}g</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-brand-blue-50/70 rounded-xl border border-brand-blue-100 text-xs text-brand-blue-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-blue-600 shrink-0" />
            <span>وجبة مثالية ومجربة لرواد صالات اللياقة في المكلا.</span>
          </div>
        </div>
      </div>

      {/* Ingredients & Preparation Instructions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Ingredients */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-lg font-bold text-slate-900">المقادير والمكونات</h2>
            <span className="text-xs text-slate-500">انقر لتحديد المكون المتوفر</span>
          </div>
          <div className="space-y-2.5">
            {meal.ingredients.map((ing, idx) => {
              const isChecked = !!checkedIngredients[idx];
              return (
                <div
                  key={idx}
                  onClick={() => toggleIngredient(idx)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs ${
                    isChecked
                      ? 'bg-brand-green-50/70 border-brand-green-200 text-slate-500 line-through'
                      : 'bg-slate-50/70 border-slate-100 text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <span className="font-medium">{ing}</span>
                  <div
                    className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-colors ${
                      isChecked
                        ? 'bg-brand-green-600 border-brand-green-600 text-white'
                        : 'border-slate-300 bg-white'
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
        <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
            خطوات التحضير والإعداد
          </h2>
          <div className="space-y-4">
            {meal.instructions.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-brand-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
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

