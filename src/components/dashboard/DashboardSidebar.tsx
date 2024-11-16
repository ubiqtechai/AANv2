import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home,
  User,
  Briefcase,
  Globe,
  FileText,
  TrendingUp,
  Settings,
  Users,
  Menu,
  X,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: Home },
  { name: 'Profile', href: '/dashboard/profile', icon: User },
  { name: 'Projects', href: '/dashboard/projects', icon: Briefcase },
  { name: 'Jurisdictions', href: '/dashboard/jurisdictions', icon: Globe },
  { name: 'Content', href: '/dashboard/content', icon: FileText },
  { name: 'Marketing', href: '/dashboard/marketing', icon: TrendingUp },
  { name: 'Client Requirements', href: '/dashboard/client-requirements', icon: Users },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardSidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-brand-500 text-white p-3 rounded-full shadow-lg hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all duration-300 transform active:scale-95"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 animate-in fade-in duration-200" />
          ) : (
            <Menu className="h-6 w-6 animate-in fade-in duration-200" />
          )}
        </button>
      </div>

      {/* Mobile sidebar - Slide from left */}
      <div 
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white transform transition-transform duration-300 ease-in-out lg:hidden
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          shadow-lg
        `}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-brand-50 text-brand-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                <span className="truncate">{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Desktop sidebar */}
      <div className={`hidden lg:flex lg:flex-shrink-0 transition-all duration-300 ease-in-out ${
        isCollapsed ? 'lg:w-16' : 'lg:w-64'
      }`}>
        <div className="flex flex-col border-r border-gray-200 bg-white">
          <div className="flex-1 flex flex-col min-h-0 relative">
            {/* Toggle button */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="absolute -right-3 top-8 bg-white border border-gray-200 rounded-full p-1.5 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4 animate-in fade-in duration-200" />
              ) : (
                <ChevronLeft className="h-4 w-4 animate-in fade-in duration-200" />
              )}
            </button>

            <nav className="flex-1 pt-5 pb-4 overflow-y-auto">
              <div className="mt-5 flex-1 px-2 space-y-2">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      `flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-brand-50 text-brand-600'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`
                    }
                    title={isCollapsed ? item.name : undefined}
                  >
                    <item.icon
                      className={`flex-shrink-0 h-5 w-5 transition-all duration-200 ${
                        isCollapsed ? '' : 'mr-3'
                      }`}
                    />
                    <span className={`truncate transition-all duration-200 ${
                      isCollapsed ? 'opacity-0 w-0' : 'opacity-100'
                    }`}>
                      {item.name}
                    </span>
                  </NavLink>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}