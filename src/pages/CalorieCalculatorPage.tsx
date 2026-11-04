import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Info
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
  // Protein: 2.0g per kg of bodyweight
  const proteinGrams = Math.round(weight * 2.1);
  const proteinCals = proteinGrams * 4;

  // Fat: 25% of total calories
  const fatCals = targetCalories * 0.25;
  const fatGrams = Math.round(fatCals / 9);

  // Carbs: Remaining calories
  const remainingCals = Math.max(0, targetCalories - proteinCals - fatCals);
  const carbsGrams = Math.round(remainingCals / 4);

  // Hydration in coastal Mukalla (Weight * 0.035L + 0.6L heat allowance)
  const waterLiters = (weight * 0.035 + 0.6).toFixed(1);

  const handleGeneratePlan = () => {
    // Navigate to nutrition-plan with state
    navigate('/nutrition-plan', {
      state: {
        calories: targetCalories,
        protein: proteinGrams,
        carbs: carbsGrams,
        fats: fatGrams,
        water: waterLiters,
        goal
      }
    });
  };

  const handleSaveToProfile = () => {
    if (!isAuthenticated) {
      alert('يرجى تسجيل الدخول لحفظ أرقامك في ملفك الشخصي');
      return;
    }
    updateProfile({
      weight,
      height,
      age,
      gender,
      targetCalories
    });
    alert('تم حفظ السعرات المستهدفة وبياناتك البدنية في ملفك بنجاح!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-brand-blue-900 via-brand-blue-800 to-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-green-500/20 text-brand-green-400 text-xs font-bold border border-brand-green-500/30">
            <Calculator className="w-3.5 h-3.5" />
            <span>معادلة ميفلين-سانت جور (Mifflin-St Jeor) العالمية</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black">
            حاسبة السعرات والمغذيات الذكية
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            احسب احتياجك اليومي الفعلي من السعرات الحرارية، البروتين، الكربوهيدرات، والدهون الصحية بدقة علمية ملائمة لمناخ المكلا ومجهودك الرياضي.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Input Form Column */}
        <div className="lg:col-span-7 bg-white p-7 sm:p-9 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <span>البيانات البيولوجية والنشاط الرياضي</span>
          </h2>

          {/* Gender */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">الجنس</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setGender('male')}
                className={`py-3 rounded-2xl border text-xs font-bold transition-all ${
                  gender === 'male'
                    ? 'border-brand-blue-600 bg-brand-blue-50 text-brand-blue-700 ring-2 ring-brand-blue-500/20'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                ذكر (رجل)
              </button>
              <button
                type="button"
                onClick={() => setGender('female')}
                className={`py-3 rounded-2xl border text-xs font-bold transition-all ${
                  gender === 'female'
                    ? 'border-brand-blue-600 bg-brand-blue-50 text-brand-blue-700 ring-2 ring-brand-blue-500/20'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                أنثى (امرأة)
              </button>
            </div>
          </div>

          {/* Age, Weight, Height */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">العمر (سنة)</label>
              <input
                type="number"
                min="12"
                max="90"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-center"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">الوزن الحالي (كجم)</label>
              <input
                type="number"
                min="30"
                max="250"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-center"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">الطول (سم)</label>
              <input
                type="number"
                min="100"
                max="230"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-center"
              />
            </div>
          </div>

          {/* Activity Level */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">مستوى النشاط الحركي والتمرين</label>
            <div className="space-y-2">
              {[
                { label: 'خامل (عمل مكتبي، بدون تمارين)', labelSm: 'خامل', factor: 1.2 },
                { label: 'نشاط خفيف (تمارين 1-3 أيام في الأسبوع)', labelSm: 'نشاط خفيف (1-3 أيام)', factor: 1.375 },
                { label: 'نشاط متوسط (تمارين صالة 3-5 أيام أسبوعياً)', labelSm: 'نشاط متوسط (3-5 أيام)', factor: 1.55 },
                { label: 'نشاط عالي (تمارين مكثفة 6-7 أيام في الأسبوع)', labelSm: 'نشاط عالي (6-7 أيام)', factor: 1.725 },
              ].map((act) => (
                <div
                  key={act.factor}
                  onClick={() => setActivity(act.factor)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs ${
                    activity === act.factor
                      ? 'border-brand-blue-600 bg-brand-blue-50/70 font-bold text-brand-blue-900'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span className="hidden sm:inline">{act.label}</span>
                  <span className="sm:hidden">{act.labelSm}</span>
                  <span className={`w-3.5 h-3.5 rounded-full border-2 shrink-0 ${activity === act.factor ? 'border-brand-blue-600 bg-brand-blue-600' : 'border-slate-300'}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Fitness Goal */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">الهدف البدني الحالي</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setGoal('cut')}
                className={`py-3 rounded-2xl border text-xs font-bold transition-all ${
                  goal === 'cut'
                    ? 'border-amber-600 bg-amber-50 text-amber-800 ring-2 ring-amber-500/20'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                تنشيف وخسارة دهون
              </button>
              <button
                type="button"
                onClick={() => setGoal('maintain')}
                className={`py-3 rounded-2xl border text-xs font-bold transition-all ${
                  goal === 'maintain'
                    ? 'border-brand-green-600 bg-brand-green-50 text-brand-green-800 ring-2 ring-brand-green-500/20'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                ثبات وتحسين لياقة
              </button>
              <button
                type="button"
                onClick={() => setGoal('bulk')}
                className={`py-3 rounded-2xl border text-xs font-bold transition-all ${
                  goal === 'bulk'
                    ? 'border-brand-blue-600 bg-brand-blue-50 text-brand-blue-800 ring-2 ring-brand-blue-500/20'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                تضخيم وبناء عضلات
              </button>
            </div>
          </div>
        </div>

        {/* Calculation Results Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-7 rounded-3xl border border-slate-200/90 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-bold text-slate-900 text-base">النتائج التغذوية الموصى بها</h3>
              <span className="text-xs px-2.5 py-1 rounded-full bg-brand-green-100 text-brand-green-800 font-bold">
                حساب فوري
              </span>
            </div>

            {/* Calories Hero Box */}
            <div className="bg-gradient-to-br from-brand-blue-900 via-slate-900 to-brand-dark-900 rounded-2xl p-6 text-white text-center space-y-2 relative overflow-hidden shadow-lg border border-brand-blue-700/40">
              {/* Subtle warm glow behind calories */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative flex items-center justify-center gap-1.5 text-xs text-amber-300 font-bold">
                <Flame className="w-4 h-4 text-amber-400 fill-amber-400/30" />
                <span>السعرات اليومية المستهدفة (Daily Target)</span>
              </div>
              <div className="relative text-4xl sm:text-5xl font-black text-amber-400 font-mono tracking-tight drop-shadow-sm">
                {targetCalories.toLocaleString()}
              </div>
              <p className="relative text-xs text-slate-300">
                سعرة حرارية / اليوم لتحقيق هدفك: {goal === 'cut' ? 'تنشيف الدهون (-500 سعرة)' : goal === 'bulk' ? 'تضخيم العضلات (+400 سعرة)' : 'المحافظة على ثبات الوزن'}
              </p>
            </div>

            {/* BMR & TDEE mini stats */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl text-center border border-slate-100">
                <span className="text-slate-500 block text-[11px]">معدل الأيض الأساسي (BMR)</span>
                <span className="font-black text-slate-800 text-sm font-mono">{bmr} سعرة</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl text-center border border-slate-100">
                <span className="text-slate-500 block text-[11px]">حرق النشاط الإجمالي (TDEE)</span>
                <span className="font-black text-slate-800 text-sm font-mono">{tdee} سعرة</span>
              </div>
            </div>

            {/* Macronutrients Grid */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-700">توزيع المغذيات الكبرى (Macros):</h4>

              {/* Protein */}
              <div className="p-3 rounded-2xl bg-brand-blue-50/70 border border-brand-blue-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-brand-blue-600 text-white flex items-center justify-center">
                    <Beef className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">البروتين اليومي</span>
                    <span className="text-[10px] text-slate-500">2.1g لكل كجم للبناء العضلي</span>
                  </div>
                </div>
                <div className="text-left font-black text-brand-blue-800 text-base font-mono">
                  {proteinGrams}g
                </div>
              </div>

              {/* Carbs */}
              <div className="p-3 rounded-2xl bg-brand-green-50/70 border border-brand-green-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-brand-green-600 text-white flex items-center justify-center">
                    <Wheat className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">الكربوهيدرات الصحية</span>
                    <span className="text-[10px] text-slate-500">طاقة التمارين ومخازن الجليكوجين</span>
                  </div>
                </div>
                <div className="text-left font-black text-brand-green-800 text-base font-mono">
                  {carbsGrams}g
                </div>
              </div>

              {/* Fats */}
              <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center">
                    <Droplet className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">الدهون الصحية</span>
                    <span className="text-[10px] text-slate-500">للهرمونات وامتصاص الفيتامينات</span>
                  </div>
                </div>
                <div className="text-left font-black text-amber-800 text-base font-mono">
                  {fatGrams}g
                </div>
              </div>

              {/* Water */}
              <div className="p-3 rounded-2xl bg-sky-50/70 border border-sky-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center">
                    <GlassWater className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">احتياج الماء اليومي</span>
                    <span className="text-[10px] text-slate-500">معوض لرطوبة وحرارة الساحل</span>
                  </div>
                </div>
                <div className="text-left font-black text-sky-800 text-base font-mono">
                  {waterLiters} لتر
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={handleGeneratePlan}
                className="w-full py-3.5 px-4 rounded-xl bg-brand-green-600 hover:bg-brand-green-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-brand-green-600/20 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>توليد خطة غذائية فورية بهذه الأرقام</span>
              </button>

              {isAuthenticated && (
                <button
                  type="button"
                  onClick={handleSaveToProfile}
                  className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors"
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

