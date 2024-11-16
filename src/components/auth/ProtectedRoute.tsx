import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireApproved?: boolean;
}

export default function ProtectedRoute({
  children,
  requireAdmin = false,
  requireApproved = true,
}: ProtectedRouteProps) {
  const { user, userData, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user || !userData) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Admin users bypass all checks
  if (userData.role === 'admin') {
    return <>{children}</>;
  }

  if (!user.emailVerified) {
    return <Navigate to="/verify-email" state={{ from: location }} replace />;
  }

  if (requireAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  if (requireApproved && userData.status !== 'approved') {
    return <Navigate to="/pending-approval" replace />;
  }

  return <>{children}</>;
}