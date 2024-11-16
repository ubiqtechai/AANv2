import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, UserCheck, UserX, ArrowRight } from 'lucide-react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import type { User } from '@/types';

export default function AdminHome() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    rejected: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const usersRef = collection(db, 'users');
    
    const unsubscribe = onSnapshot(usersRef, (snapshot) => {
      try {
        const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
        setStats({
          total: users.length,
          pending: users.filter(user => user.status === 'pending').length,
          rejected: users.filter(user => user.status === 'rejected').length
        });
        setLoading(false);
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError('Failed to load dashboard statistics');
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="mt-1 text-sm sm:text-base text-gray-600 dark:text-gray-400">Monitor and manage user activities</p>
        </div>
        <Link to="/admin/users">
          <Button variant="outline" className="w-full sm:w-auto flex items-center justify-center">
            Manage Users
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-200 p-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <StatCard
          title="Total Users"
          value={stats.total.toString()}
          icon={<Users className="h-6 w-6" />}
          color="blue"
        />
        <StatCard
          title="Pending Approvals"
          value={stats.pending.toString()}
          icon={<UserCheck className="h-6 w-6" />}
          color="yellow"
        />
        <StatCard
          title="Rejected Users"
          value={stats.rejected.toString()}
          icon={<UserX className="h-6 w-6" />}
          color="red"
        />
      </div>

      {stats.pending > 0 && (
        <Card className="bg-yellow-50 dark:bg-yellow-900/50 border-yellow-100 dark:border-yellow-800">
          <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center">
              <UserCheck className="h-5 w-5 text-yellow-600 dark:text-yellow-500 mr-2 flex-shrink-0" />
              <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                You have {stats.pending} pending registration{stats.pending === 1 ? '' : 's'} to review
              </p>
            </div>
            <Link to="/admin/users" className="w-full sm:w-auto">
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full sm:w-auto text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300"
              >
                Review Now
              </Button>
            </Link>
          </div>
        </Card>
      )}
    </div>
  );
}

function StatCard({ title, value, icon, color }: {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: 'blue' | 'yellow' | 'red';
}) {
  const colors = {
    blue: 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400',
    yellow: 'bg-yellow-50 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-400',
    red: 'bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-400'
  };

  return (
    <Card className="p-6">
      <div className="flex items-center">
        <div className={`p-2 rounded-lg ${colors[color]}`}>
          {icon}
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
        </div>
      </div>
    </Card>
  );
}