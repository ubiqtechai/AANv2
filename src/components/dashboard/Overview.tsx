import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/Card';
import { 
  Bell,
  Activity,
  Users,
  Briefcase,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';

export default function Overview() {
  const { userData } = useAuth();

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {userData?.fullName}!
            </h1>
            <p className="mt-1 text-gray-500">
              Your trusted partner in global business solutions
            </p>
          </div>
          <div className="relative">
            <Bell className="h-6 w-6 text-gray-400" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center text-xs text-white">
              3
            </span>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Projects"
          value="8"
          icon={Briefcase}
          trend="+2 this month"
          trendUp={true}
        />
        <StatCard
          title="Network Partners"
          value="124"
          icon={Users}
          trend="+12 new"
          trendUp={true}
        />
        <StatCard
          title="Success Rate"
          value="94%"
          icon={CheckCircle}
          trend="+2.5%"
          trendUp={true}
        />
        <StatCard
          title="Response Time"
          value="2.4h"
          icon={Clock}
          trend="-0.5h"
          trendUp={true}
        />
      </div>

      {/* Recent Activity */}
      <Card>
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
        </div>
        <div className="divide-y divide-gray-200">
          <ActivityItem
            icon={CheckCircle}
            title="Project Completed"
            description="Successfully completed the merger consultation for Tech Corp."
            time="2 hours ago"
            iconColor="text-green-500"
          />
          <ActivityItem
            icon={Users}
            title="New Connection"
            description="Connected with Legal Associates LLC"
            time="5 hours ago"
            iconColor="text-blue-500"
          />
          <ActivityItem
            icon={AlertTriangle}
            title="Deadline Approaching"
            description="Project deliverable due in 48 hours"
            time="1 day ago"
            iconColor="text-yellow-500"
          />
        </div>
      </Card>

      {/* Notifications */}
      <Card>
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Important Notifications</h2>
        </div>
        <div className="divide-y divide-gray-200">
          <NotificationItem
            type="warning"
            title="Document Review Required"
            message="Please review and sign the updated partnership agreement"
          />
          <NotificationItem
            type="info"
            title="New Feature Available"
            message="Try our new client matching system for better project allocation"
          />
          <NotificationItem
            type="success"
            title="Achievement Unlocked"
            message="Congratulations! You've completed 50 successful projects"
          />
        </div>
      </Card>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, trend, trendUp }: {
  title: string;
  value: string;
  icon: any;
  trend: string;
  trendUp: boolean;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center">
        <div className="p-2 bg-brand-50 rounded-lg">
          <Icon className="h-6 w-6 text-brand-600" />
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div className="mt-1 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
            <p className={`ml-2 text-sm ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
              {trend}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivityItem({ icon: Icon, title, description, time, iconColor }: {
  icon: any;
  title: string;
  description: string;
  time: string;
  iconColor: string;
}) {
  return (
    <div className="px-6 py-4">
      <div className="flex items-center">
        <div className={`p-2 rounded-lg ${iconColor} bg-opacity-10`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
        <div className="ml-4 flex-1">
          <h4 className="text-sm font-medium text-gray-900">{title}</h4>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
        <span className="text-sm text-gray-400">{time}</span>
      </div>
    </div>
  );
}

function NotificationItem({ type, title, message }: {
  type: 'warning' | 'info' | 'success';
  title: string;
  message: string;
}) {
  const colors = {
    warning: 'bg-yellow-50 text-yellow-800',
    info: 'bg-blue-50 text-blue-800',
    success: 'bg-green-50 text-green-800'
  };

  return (
    <div className={`px-6 py-4 ${colors[type]}`}>
      <h4 className="text-sm font-medium">{title}</h4>
      <p className="mt-1 text-sm opacity-75">{message}</p>
    </div>
  );
}