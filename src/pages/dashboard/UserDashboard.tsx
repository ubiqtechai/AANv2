import { Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/layout';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import Overview from '@/components/dashboard/Overview';
import Profile from '@/components/dashboard/Profile';
import Projects from '@/components/dashboard/Projects';
import Jurisdictions from '@/components/dashboard/Jurisdictions';
import Content from '@/components/dashboard/Content';
import Marketing from '@/components/dashboard/Marketing';
import Settings from '@/components/dashboard/Settings';
import ClientRequirements from '@/components/dashboard/ClientRequirements';

export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/projects/*" element={<Projects />} />
              <Route path="/jurisdictions" element={<Jurisdictions />} />
              <Route path="/content" element={<Content />} />
              <Route path="/marketing" element={<Marketing />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/client-requirements" element={<ClientRequirements />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}