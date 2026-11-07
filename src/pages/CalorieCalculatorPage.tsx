import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Calculator,
  Flame,
  Beef,
  Wheat,
  Droplet,
  GlassWater,
  ArrowRight,
  Sparkles,
  Info,
  Share2,
  CheckCircle2,
  UtensilsCrossed
} from 'lucide-react';

export const CalorieCalculatorPage: React.FC = () => {
  const { user, isAuthenticated, updateProfile } = useAuth();
  const navigate = useNavigate();

  // Inputs
  const [gender, setGender] = useState<'male' | 'female'>(user?.gender || 'male');
  const [age, setAge] = useState<number>(user?.age || 25);
  const [weight, setWeight] = useState<number>(user?.weight || 74);
  const [height, setHeight] = useState<number>(user?.height || 175);
  const [activity, setActivity] = useState<number>(1.55); // Moderate default
  const [goal, setGoal] = useState<'cut' | 'maintain' | 'bulk'>(
    user?.fitnessGoal === 'fat_loss'
      ? 'cut'
      : user?.fitnessGoal === 'muscle_gain'
      ? 'bulk'
      : 'maintain'
  );

  const [copied, setCopied] = useState(false);

  // Scientific calculation (Mifflin-St Jeor)
  const calculateBMR = () => {
    if (gender === 'male') {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      return 10 * weight + 6.25 * height - 5 * age - 161;
    }
  };

  const bmr = Math.round(calculateBMR());
  const tdee = Math.round(bmr * activity);

  let targetCalories = tdee;
  if (goal === 'cut') targetCalories = tdee - 500;
  if (goal === 'bulk') targetCalories = tdee + 400;

  // Macros distribution
  // Protein: 2.1g per kg of bodyweight
  const proteinGrams = Math.round(weight * 2.1);
  const proteinCals = proteinGrams * 4;

  // Fat: 25% of total calories
  const fatCals = targetCalories * 0.25;
  const fatGrams = Math.round(fatCals / 9);

  // Carbs: Remaining calories
  const remainingCals = Math.max(0, targetCalories - proteinCals - fatCals);
  const carbsGrams = Math.round(remainingCals / 4);

  // Hydration calculation: 35ml per kg + 500ml for coastal humidity
  const waterLiters = Number(((weight * 0.035) + 0.5).toFixed(1));

  const handleSaveToProfile = () => {
    if (updateProfile) {
      updateProfile({
        gender,
        age,
        weight,
        height,
        targetCalories,
        fitnessGoal: goal === 'cut' ? 'fat_loss' : goal === 'bulk' ? 'muscle_gain' : 'fitness_maintenance'
      });
      alert('تم حفظ أهدافك وسعراتك في ملفك الشخصي بنجاح!');
    }
  };

  const handleShareReport = () => {
    const goalTitle = goal === 'cut' ? 'تنشيف وخسارة دهون' : goal === 'bulk' ? 'تضخيم وبناء عضلات' : 'ثبات وتحسين لياقة';
    const text = `📊 تقريري التغذوي من منصة عزم - المكلا:\n- الهدف: ${goalTitle}\n- السعرات اليومية: ${targetCalories} سعرة\n- بروتين: ${proteinGrams}g\n- كارب: ${carbsGrams}g\n- دهون: ${fatGrams}g\n- احتياج الماء: ${waterLiters} لتر\nاحسب سعراتك الآن: ${window.location.href}`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 font-['Cairo',sans-serif]" dir="rtl">
      
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5ECE7] text-[#617C69] text-xs font-bold">
          <Calculator className="w-4 h-4 text-[#7D9683]" />
          <span>حاسبة السعرات والماكروز العلمية • المكلا</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#1F2722] leading-[1.3] tracking-normal">
          احسب احتياجك اليومي بدقة علمية
        </h1>
        <p className="text-sm text-[#536559] leading-[1.8] font-normal sm:font-medium">
          معادلة ميفلين-سانت جور المعتمدة عالمياً مع احتساب تعويض الماء لرطوبة وطقس ساحل حضرموت.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Input Form Column */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#F0EBE3] shadow-[0_10px_35px_-10px_rgba(31,39,34,0.06)] space-y-6">
          
          <h2 className="text-lg font-black text-[#1F2722] flex items-center gap-2 pb-3 border-b border-[#F0EBE3]">
            <Info className="w-5 h-5 text-[#D97241]" />
            <span>البيانات البدنية والشخصية</span>
          </h2>

          {/* Gender Selector */}
          <div>
            <label className="block text-xs font-black text-[#1F2722] mb-2">الجنس</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setGender('male')}
                className={`py-3 px-4 rounded-2xl border text-xs font-bold transition-all ${
                  gender === 'male'
                    ? 'border-[#D97241] bg-[#FDF6F2] text-[#D97241] ring-2 ring-[#D97241]/20'
                    : 'border-[#F0EBE3] text-[#536559] hover:bg-[#FAF8F5]'
                }`}
              >
                ذكر (رجل)
              </button>
              <button
                type="button"
                onClick={() => setGender('female')}
                className={`py-3 px-4 rounded-2xl border text-xs font-bold transition-all ${
                  gender === 'female'
                    ? 'border-[#D97241] bg-[#FDF6F2] text-[#D97241] ring-2 ring-[#D97241]/20'
                    : 'border-[#F0EBE3] text-[#536559] hover:bg-[#FAF8F5]'
                }`}
              >
                أنثى (سيدة)
              </button>
            </div>
          </div>

          {/* Age, Weight, Height Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-black text-[#1F2722] mb-1.5">العمر (سنة)</label>
              <input
                type="number"
                min="12"
                max="90"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-2xl border border-[#F0EBE3] bg-[#FAF8F5] text-sm font-bold text-center text-[#1F2722] focus:ring-2 focus:ring-[#D97241] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-black text-[#1F2722] mb-1.5">الوزن الحالي (كجم)</label>
              <input
                type="number"
                min="30"
                max="250"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-2xl border border-[#F0EBE3] bg-[#FAF8F5] text-sm font-bold text-center text-[#1F2722] focus:ring-2 focus:ring-[#D97241] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-black text-[#1F2722] mb-1.5">الطول (سم)</label>
              <input
                type="number"
                min="100"
                max="230"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-2xl border border-[#F0EBE3] bg-[#FAF8F5] text-sm font-bold text-center text-[#1F2722] focus:ring-2 focus:ring-[#D97241] focus:outline-none"
              />
            </div>
          </div>

          {/* Activity Level */}
          <div>
            <label className="block text-xs font-black text-[#1F2722] mb-2">مستوى النشاط البدني والتمرين</label>
            <div className="space-y-2.5">
              {[
                { label: 'خامل (عمل مكتبي، بدون تمرين صالة)', factor: 1.2 },
                { label: 'نشاط خفيف (تمارين صالة 1-3 أيام أسبوعياً)', factor: 1.375 },
                { label: 'نشاط متوسط (تمارين مكثفة 3-5 أيام أسبوعياً)', factor: 1.55 },
                { label: 'نشاط عالي (رياضيون 6-7 أيام أسبوعياً)', factor: 1.725 },
              ].map((act) => (
                <div
                  key={act.factor}
                  onClick={() => setActivity(act.factor)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between text-xs ${
                    activity === act.factor
                      ? 'border-[#D97241] bg-[#FDF6F2] font-bold text-[#D97241]'
                      : 'border-[#F0EBE3] hover:bg-[#FAF8F5] text-[#536559]'
                  }`}
                >
                  <span>{act.label}</span>
                  <span className={`w-4 h-4 rounded-full border-2 shrink-0 ${activity === act.factor ? 'border-[#D97241] bg-[#D97241]' : 'border-[#CBDCD0]'}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Fitness Goal */}
          <div>
            <label className="block text-xs font-black text-[#1F2722] mb-2">هدفك البدني الحالي</label>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setGoal('cut')}
                className={`py-3 rounded-2xl border text-xs font-bold transition-all ${
                  goal === 'cut'
                    ? 'border-[#D97241] bg-[#D97241] text-white shadow-md'
                    : 'border-[#F0EBE3] text-[#536559] hover:bg-[#FAF8F5]'
                }`}
              >
                تنشيف وخسارة دهون
              </button>
              <button
                type="button"
                onClick={() => setGoal('maintain')}
                className={`py-3 rounded-2xl border text-xs font-bold transition-all ${
                  goal === 'maintain'
                    ? 'border-[#7D9683] bg-[#7D9683] text-white shadow-md'
                    : 'border-[#F0EBE3] text-[#536559] hover:bg-[#FAF8F5]'
                }`}
              >
                ثبات وتحسين لياقة
              </button>
              <button
                type="button"
                onClick={() => setGoal('bulk')}
                className={`py-3 rounded-2xl border text-xs font-bold transition-all ${
                  goal === 'bulk'
                    ? 'border-[#1F2722] bg-[#1F2722] text-white shadow-md'
                    : 'border-[#F0EBE3] text-[#536559] hover:bg-[#FAF8F5]'
                }`}
              >
                تضخيم وبناء عضلات
              </button>
            </div>
          </div>

        </div>

        {/* Calculation Results Column (Personal Report Card) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#F0EBE3] shadow-[0_12px_40px_-10px_rgba(31,39,34,0.08)] space-y-6">
            
            <div className="flex items-center justify-between border-b border-[#F0EBE3] pb-4">
              <div>
                <span className="text-[10px] text-[#7D9683] font-black uppercase">التقرير الشخصي المعتمد</span>
                <h3 className="font-black text-[#1F2722] text-base">احتياجك التغذوي اليومي</h3>
              </div>
              <button
                onClick={handleShareReport}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#F0EBE3] bg-[#FAF8F5] text-xs font-bold text-[#536559] hover:text-[#1F2722] transition-colors"
                title="نسخ التقرير لمشاركته"
              >
                <Share2 className="w-3.5 h-3.5 text-[#D97241]" />
                <span>{copied ? 'تم النسخ ✓' : 'مشاركة'}</span>
              </button>
            </div>

            {/* Calories Hero Box */}
            <div className="bg-[#1F2722] rounded-3xl p-6 sm:p-7 text-white text-center space-y-2 relative overflow-hidden shadow-xl">
              <div className="flex items-center justify-center gap-1.5 text-xs text-[#E49C7A] font-bold">
                <Flame className="w-4 h-4 text-[#D97241]" />
                <span>السعرات اليومية المستهدفة</span>
              </div>
              <div className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight">
                {targetCalories.toLocaleString()}
              </div>
              <p className="text-xs text-white/70 font-medium">
                سعرة حرارية يومياً لـ {goal === 'cut' ? 'حرق الدهون (-500 سعرة)' : goal === 'bulk' ? 'بناء الكتلة العضلية (+400 سعرة)' : 'المحافظة على ثبات الوزن الحالي'}
              </p>
            </div>

            {/* BMR & TDEE mini stats */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-[#FAF8F5] rounded-2xl text-center border border-[#F0EBE3]">
                <span className="text-[#536559] block text-[11px] font-bold">الأيض الأساسي (BMR)</span>
                <span className="font-black text-[#1F2722] text-sm font-mono mt-0.5 block">{bmr} سعرة</span>
              </div>
              <div className="p-3.5 bg-[#FAF8F5] rounded-2xl text-center border border-[#F0EBE3]">
                <span className="text-[#536559] block text-[11px] font-bold">حرق النشاط (TDEE)</span>
                <span className="font-black text-[#1F2722] text-sm font-mono mt-0.5 block">{tdee} سعرة</span>
              </div>
            </div>

            {/* Macronutrients Grid */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-black text-[#1F2722]">توزيع المغذيات الكبرى (الماكروز اليومي):</h4>

              {/* Protein */}
              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#F0EBE3] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#E5ECE7] text-[#617C69] flex items-center justify-center">
                    <Beef className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-[#1F2722] block">البروتين المستهدف</span>
                    <span className="text-[10px] text-[#536559]">2.1g لكل كجم للبناء العضلي</span>
                  </div>
                </div>
                <div className="text-left font-black text-[#1F2722] text-base font-mono">
                  {proteinGrams}g
                </div>
              </div>

              {/* Carbs */}
              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#F0EBE3] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#FDF6F2] text-[#D97241] flex items-center justify-center">
                    <Wheat className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-[#1F2722] block">الكربوهيدرات الصحية</span>
                    <span className="text-[10px] text-[#536559]">طاقة التمارين ومخازن الجليكوجين</span>
                  </div>
                </div>
                <div className="text-left font-black text-[#1F2722] text-base font-mono">
                  {carbsGrams}g
                </div>
              </div>

              {/* Fats */}
              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#F0EBE3] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#FAF8F5] text-amber-600 flex items-center justify-center border border-[#F0EBE3]">
                    <Droplet className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-[#1F2722] block">الدهون الصحية</span>
                    <span className="text-[10px] text-[#536559]">لصحة الهرمونات والمفاصل</span>
                  </div>
                </div>
                <div className="text-left font-black text-[#1F2722] text-base font-mono">
                  {fatGrams}g
                </div>
              </div>

              {/* Water (Coastal Hydration) */}
              <div className="p-3.5 rounded-2xl bg-[#F4F7F5] border border-[#CBDCD0] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#7D9683] text-white flex items-center justify-center">
                    <GlassWater className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-[#1F2722] block">احتياج الماء اليومي</span>
                    <span className="text-[10px] text-[#617C69]">معوض لرطوبة وحرارة ساحل المكلا</span>
                  </div>
                </div>
                <div className="text-left font-black text-[#617C69] text-base font-mono">
                  {waterLiters} لتر
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-2.5">
              <Link
                to="/nutrition-plan"
                className="w-full py-3.5 px-4 rounded-2xl bg-[#D97241] hover:bg-[#C75F2F] text-white font-bold text-xs sm:text-sm shadow-xl shadow-[#D97241]/25 active:scale-95 transition-all flex items-center justify-center gap-2 text-center"
              >
                <UtensilsCrossed className="w-4 h-4" />
                <span>عرض خطة الوجبات الساحلية المناسبة لك</span>
              </Link>

              {isAuthenticated && (
                <button
                  type="button"
                  onClick={handleSaveToProfile}
                  className="w-full py-3 px-4 rounded-2xl border border-[#F0EBE3] hover:bg-[#FAF8F5] text-[#1F2722] font-bold text-xs transition-colors"
                >
                  حفظ هذا الهدف في ملفي الشخصي
                </button>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default CalorieCalculatorPage;
