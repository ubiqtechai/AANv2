import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  linkTo?: string;
}

export function Logo({ className = '', showText = true, size = 'md', linkTo = '/' }: LogoProps) {
  const { userData } = useAuth();
  const sizes = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16'
  };

  const homeRoute = userData?.role === 'admin' ? '/admin' : '/dashboard';
  const actualLinkTo = linkTo === '/' ? (userData ? homeRoute : '/') : linkTo;

  return (
    <Link 
      to={actualLinkTo} 
      className={`flex items-center group ${className}`}
      aria-label="Aumirah Alliance Network"
    >
      <div className={`relative ${sizes[size]} aspect-square flex-shrink-0 transition-transform duration-300 group-hover:scale-105`}>
        <svg 
          viewBox="0 0 100 100" 
          className="h-full w-auto"
          fill="currentColor"
          style={{ color: '#f97316' }} // AAN Orange color
        >
          <path d="M50 10 L90 80 L50 60 L10 80 Z" />
        </svg>
      </div>
      {showText && (
        <div className="ml-3 flex flex-col">
          <span className="text-xl font-bold text-gray-900 leading-tight tracking-tight">
            Aumirah Alliance
          </span>
          <span className="text-sm text-brand-600 font-medium">
            Network
          </span>
        </div>
      )}
    </Link>
  );
}