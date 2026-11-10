import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * مكوّن حماية يضمن أن المستخدم لديه صلاحية `admin` فقط.
 * إذا لم يكن المستخدم مسجلاً كمسؤول يتم توجيهه إلى صفحة تسجيل الدخول.
 */
export const RequireAdmin: React.FC = () => {
  const { user } = useAuth();
  if (!user || (user as any).role !== 'admin') {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

