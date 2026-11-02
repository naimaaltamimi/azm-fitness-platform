import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { GymsDirectoryPage } from './pages/GymsDirectoryPage';
import { GymDetailsPage } from './pages/GymDetailsPage';
import { SubscriptionRequestPage } from './pages/SubscriptionRequestPage';
import { TrainersDirectoryPage } from './pages/TrainersDirectoryPage';
import { TrainerDetailsPage } from './pages/TrainerDetailsPage';
import { CalorieCalculatorPage } from './pages/CalorieCalculatorPage';
import { NutritionPlanPage } from './pages/NutritionPlanPage';
import { MealsLibraryPage } from './pages/MealsLibraryPage';
import { MealDetailsPage } from './pages/MealDetailsPage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { UserProfilePage } from './pages/UserProfilePage';
import { MyOrdersPage } from './pages/MyOrdersPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { EmptyState } from './components/common/EmptyState';
import { Compass } from 'lucide-react';

// Scroll to top on route navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 selection:bg-brand-blue-600 selection:text-white" dir="rtl">
          <Navbar />
          <main className="flex-1">
            <Routes>
              {/* 1. Landing Page */}
              <Route path="/" element={<LandingPage />} />

              {/* 2. Authentication */}
              <Route path="/login" element={<LoginPage />} />
              {/* 3. Register */}
              <Route path="/register" element={<RegisterPage />} />

              {/* 4. Gyms Directory */}
              <Route path="/gyms" element={<GymsDirectoryPage />} />
              {/* 5. Gym Details */}
              <Route path="/gyms/:id" element={<GymDetailsPage />} />
              {/* 6. Subscription Request */}
              <Route path="/gyms/:id/subscribe" element={<SubscriptionRequestPage />} />
              <Route path="/subscribe" element={<SubscriptionRequestPage />} />

              {/* 7. Trainers Directory */}
              <Route path="/trainers" element={<TrainersDirectoryPage />} />
              {/* 8. Trainer Details */}
              <Route path="/trainers/:id" element={<TrainerDetailsPage />} />

              {/* 9. Calorie Calculator */}
              <Route path="/calculator" element={<CalorieCalculatorPage />} />
              {/* 10. Nutrition Plan */}
              <Route path="/nutrition-plan" element={<NutritionPlanPage />} />
              {/* 11. Meals Library */}
              <Route path="/meals" element={<MealsLibraryPage />} />
              {/* 12. Meal Details */}
              <Route path="/meals/:id" element={<MealDetailsPage />} />

              {/* 13. User Dashboard */}
              <Route path="/dashboard" element={<UserDashboardPage />} />
              {/* 14. User Profile */}
              <Route path="/profile" element={<UserProfilePage />} />
              {/* 15. My Orders & Bookings */}
              <Route path="/my-orders" element={<MyOrdersPage />} />
              {/* 16. Admin Dashboard */}
              <Route path="/admin" element={<AdminDashboardPage />} />

              {/* 404 Not Found Catch-All */}
              <Route
                path="*"
                element={
                  <div className="max-w-7xl mx-auto px-4 py-24 text-center">
                    <EmptyState
                      icon={Compass}
                      title="الصفحة المطلوبة غير موجودة (404)"
                      description="عذراً، الرابط الذي حاولت الوصول إليه غير متوفر في منصة عزم."
                      actionText="العودة للصفحة الرئيسية"
                      actionLink="/"
                    />
                  </div>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;

