import { useAuth } from '@/contexts/AuthContext';
import { Activity, Users, Briefcase, Settings } from 'lucide-react';

export default function DashboardHome() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
        <p className="mt-2 text-gray-600">Here's what's happening with your account.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Activity"
          value="12"
          description="Recent activities"
          icon={<Activity className="h-6 w-6" />}
        />
        <DashboardCard
          title="Network"
          value="48"
          description="Connected partners"
          icon={<Users className="h-6 w-6" />}
        />
        <DashboardCard
          title="Projects"
          value="8"
          description="Active projects"
          icon={<Briefcase className="h-6 w-6" />}
        />
        <DashboardCard
          title="Tasks"
          value="5"
          description="Pending tasks"
          icon={<Settings className="h-6 w-6" />}
        />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="bg-white shadow rounded-lg divide-y">
          {/* Activity items will go here */}
          <p className="p-4 text-gray-600">No recent activity</p>
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ title, value, description, icon }: {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className="p-2 bg-blue-50 rounded-lg">
          {icon}
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-900">{title}</h3>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
}