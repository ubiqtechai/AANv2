import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LogOut, User, Settings, Bell, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { user, userData } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Logo showText={true} size="sm" />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-500 dark:hover:bg-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            <ThemeToggle />
            <button className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 rounded-full p-1 dark:text-gray-400 dark:hover:text-gray-300">
              <span className="sr-only">View notifications</span>
              <Bell className="h-6 w-6" />
            </button>

            {userData?.role === 'admin' ? (
              <Link to="/admin/users">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center"
                >
                  <User className="h-4 w-4 mr-2" />
                  Manage Users
                </Button>
              </Link>
            ) : (
              <Link to="/dashboard/settings">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </Link>
            )}

            <div className="border-l h-6 border-gray-200 dark:border-gray-700" />

            <Button
              variant="ghost"
              size="sm"
              className="flex items-center text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="pt-2 pb-3 space-y-1 px-4">
          <button className="flex items-center w-full px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700">
            <Bell className="h-5 w-5 mr-3" />
            Notifications
          </button>

          {userData?.role === 'admin' ? (
            <Link
              to="/admin/users"
              className="flex items-center w-full px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700"
            >
              <User className="h-5 w-5 mr-3" />
              Manage Users
            </Link>
          ) : (
            <Link
              to="/dashboard/settings"
              className="flex items-center w-full px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700"
            >
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sign out
          </button>
        </div>
      </div>
    </nav>
  );
}