import { Card } from '@/components/ui/Card';
import { TrendingUp, Users, DollarSign, BarChart2 } from 'lucide-react';

export default function Marketing() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Marketing & Analytics</h1>
        <p className="mt-2 text-gray-600">Track your marketing performance and ROI</p>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Reach"
          value="24.5K"
          change="+12.5%"
          trend="up"
          icon={Users}
        />
        <StatCard
          title="Engagement Rate"
          value="4.2%"
          change="+0.8%"
          trend="up"
          icon={TrendingUp}
        />
        <StatCard
          title="Marketing ROI"
          value="285%"
          change="+25%"
          trend="up"
          icon={DollarSign}
        />
        <StatCard
          title="Conversion Rate"
          value="3.8%"
          change="+0.5%"
          trend="up"
          icon={BarChart2}
        />
      </div>

      <Card>
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Marketing Performance</h2>
          <div className="text-center py-12 text-gray-500">
            Marketing analytics visualization coming soon
          </div>
        </div>
      </Card>
    </div>
  );
}

function StatCard({ title, value, change, trend, icon: Icon }: {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: any;
}) {
  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center">
          <div className="p-2 bg-brand-50 rounded-lg">
            <Icon className="h-6 w-6 text-brand-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            <div className="mt-1 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{value}</p>
              <p className={`ml-2 text-sm ${
                trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {change}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}