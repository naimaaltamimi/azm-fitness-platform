import React, { useState } from 'react';
import { MEALS_DATA } from '../data/mealsData';
import { MealCard } from '../components/nutrition/MealCard';
import { EmptyState } from '../components/common/EmptyState';
import { Utensils, Search, Salad, Sparkles } from 'lucide-react';

export const MealsLibraryPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories: { key: string; label: string }[] = [
    { key: 'all', label: 'جميع الوجبات' },
    { key: 'breakfast', label: 'فطور صحي' },
    { key: 'lunch', label: 'غداء رياضي' },
    { key: 'dinner', label: 'عشاء خفيف' },
    { key: 'pre_workout', label: 'قبل التمرين' },
  ];

  const filteredMeals = MEALS_DATA.filter((m) => {
    const matchSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.ingredients.some((i) => i.toLowerCase().includes(searchQuery.toLowerCase())) ||
      m.dietaryTags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchCategory =
      selectedCategory === 'all' || m.category === selectedCategory;

    return matchSearch && matchCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-forest-900 via-forest-800 to-forest-950 text-white rounded-3xl p-6 sm:p-8 md:p-12 relative overflow-hidden shadow-xl border border-forest-800/60">
        <div className="absolute top-0 left-0 w-80 h-80 bg-terracotta-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sage-500/20 text-sage-300 text-xs font-bold border border-sage-500/30">
            <Salad className="w-3.5 h-3.5 text-sage-300" />
            <span>تغذية رياضية صحية متوافقة مع البيئة الساحلية</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black">
            مكتبة الوجبات الصحية والرياضية
          </h1>
          <p className="text-sand-200 text-xs sm:text-sm leading-relaxed">
            وصفات دقيقة القيمة الغذائية تجمع بين النظافة الصحية، كميات البروتين المحسوبة، والمكونات المتاحة في حضرموت والمكلا.
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-5 rounded-3xl border border-sand-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث بمكون (ثمد، دجاج، شوفان، تمر)..."
              className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-terracotta-500 text-sm bg-sand-50/50"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => setSelectedCategory(c.key)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all min-h-[38px] ${
                  selectedCategory === c.key
                    ? 'bg-terracotta-500 text-white shadow-sm shadow-terracotta-500/20'
                    : 'bg-sand-100 text-forest-800 hover:bg-sand-200'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-sand-100">
          <span>عرض {filteredMeals.length} وجبة رياضية محسوبة القيم</span>
          {(searchQuery || selectedCategory !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-terracotta-600 font-bold hover:underline"
            >
              إلغاء الفلترة
            </button>
          )}
        </div>
      </div>

      {/* Meals Grid */}
      {filteredMeals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMeals.map((meal) => (
            <MealCard key={meal.id} meal={meal} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Utensils}
          title="لم نجد وجبات تطابق البحث"
          description="جرب البحث بكلمة أخرى مثل (سمك، بيض، شوفان) أو اختر جميع الفئات."
          actionText="عرض كافة الوجبات"
          onActionClick={() => {
            setSearchQuery('');
            setSelectedCategory('all');
          }}
        />
      )}
    </div>
  );
};
