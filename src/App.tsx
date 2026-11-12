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
import { AboutPage } from './pages/AboutPage';
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

// Public Website Layout wrapper (Contains public Navbar and Footer)
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-[#1F2722] selection:bg-[#D97241] selection:text-white font-['Cairo',sans-serif]" dir="rtl">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          {/* 1. SEPARATE ADMIN PORTAL ROUTE (Completely Independent Layout - No Public Navbar, No Public Footer) */}
          <Route path="/admin" element={<AdminDashboardPage />} />

          {/* 2. PUBLIC WEBSITE ROUTES (Inside PublicLayout with Public Navbar and Footer) */}
          <Route
            path="*"
            element={
              <PublicLayout>
                <Routes>
                  {/* Landing Page */}
                  <Route path="/" element={<LandingPage />} />

                  {/* Authentication */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />

                  {/* Gyms Directory & Details */}
                  <Route path="/gyms" element={<GymsDirectoryPage />} />
                  <Route path="/gyms/:id" element={<GymDetailsPage />} />
                  <Route path="/gyms/:id/subscribe" element={<SubscriptionRequestPage />} />
                  <Route path="/subscribe" element={<SubscriptionRequestPage />} />

                  {/* Trainers Directory & Details */}
                  <Route path="/trainers" element={<TrainersDirectoryPage />} />
                  <Route path="/trainers/:id" element={<TrainerDetailsPage />} />

                  {/* Health & Nutrition Tools */}
                  <Route path="/calculator" element={<CalorieCalculatorPage />} />
                  <Route path="/nutrition-plan" element={<NutritionPlanPage />} />
                  <Route path="/meals" element={<MealsLibraryPage />} />
                  <Route path="/meals/:id" element={<MealDetailsPage />} />

                  {/* Trainee Account & Orders */}
                  <Route path="/dashboard" element={<UserDashboardPage />} />
                  <Route path="/profile" element={<UserProfilePage />} />
                  <Route path="/my-orders" element={<MyOrdersPage />} />

                  {/* About Us */}
                  <Route path="/about" element={<AboutPage />} />

                  {/* 404 Catch-All within Public Layout */}
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
              </PublicLayout>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
