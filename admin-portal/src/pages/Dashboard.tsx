import React, { useState, useEffect } from 'react';
import { useAuth } from '../../src/context/AuthContext';
import { storageService } from '../../src/services/storageService';
import { MUKALLA_GYMS } from '../../src/data/mukallaGymsData';
import { SubscriptionRequest, Trainer } from '../../src/types';
import { TrainerAdminModal } from '../../src/components/trainers/TrainerAdminModal';
import { AdminLayout } from '../../src/components/admin/AdminLayout';
import {
  ShieldAlert,
  Building2,
  CalendarCheck,
  Users,
  CheckCircle,
  XCircle,
  PlusCircle,
  Edit,
  Trash2,
} from 'lucide-react';

/**
 * Admin Dashboard – isolated from the main user‑facing platform.
 *
 * This file lives under `admin-portal/` to keep the admin UI separate.
 * It re‑uses shared utilities (AuthContext, services, data) via relative
 * imports that point back into the main project folder.
 */
export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [gyms, setGyms] = useState(MUKALLA_GYMS);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [subscriptions, setSubscriptions] = useState<SubscriptionRequest[]>([]);
  const [showTrainerModal, setShowTrainerModal] = useState(false);

  // Example effect – fetch trainers from Supabase (placeholder)
  useEffect(() => {
    // TODO: replace with real fetch logic
    const fetchTrainers = async () => {
      const data = await storageService.getAll('trainers');
      setTrainers(data as Trainer[]);
    };
    fetchTrainers();
  }, []);

  const handleLogout = async () => {
    await logout();
    // Redirect to login page of the main app (optional)
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">لوحة تحكم المسؤول</h1>
        <button
          onClick={handleLogout}
          className="mb-4 px-4 py-2 bg-primary-10 text-dark rounded"
        >
          تسجيل الخروج
        </button>
        {/* هنا يمكن إضافة بطاقات إحصائية، جداول صالات، مدربين، طلبات اشتراك … */}
        {/* مثال مختصر للعرض */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded shadow">
            <h2 className="font-semibold mb-2">عدد الصالات</h2>
            <p>{gyms.length}</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <h2 className="font-semibold mb-2">عدد المدربين</h2>
            <p>{trainers.length}</p>
          </div>
        </section>
        {/* يمكن إضافة زر لإظهار نموذج إضافة مدرب */}
        <button
          onClick={() => setShowTrainerModal(true)}
          className="mt-4 px-4 py-2 bg-primary text-white rounded"
        >
          إضافة مدرب
        </button>
        {showTrainerModal && (
          <TrainerAdminModal
            onClose={() => setShowTrainerModal(false)}
            // تمرير البيانات اللازمة للإنشاء أو التعديل
          />
        )}
      </div>
    </AdminLayout>
  );
};

