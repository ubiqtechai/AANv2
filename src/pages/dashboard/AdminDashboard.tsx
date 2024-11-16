import { Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/layout';
import AdminHome from '@/components/admin/AdminHome';
import UserManagement from '@/components/admin/UserManagement';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          <Routes>
            <Route path="/" element={<AdminHome />} />
            <Route path="/users" element={<UserManagement />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}