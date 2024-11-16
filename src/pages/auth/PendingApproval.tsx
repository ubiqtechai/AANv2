import { useAuth } from '@/contexts/AuthContext';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { Clock, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function PendingApproval() {
  const { userData } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center">
          <Logo size="lg" className="mx-auto mb-6" />
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 mb-6">
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Under Review</h2>
          <p className="text-gray-600 mb-6">
            Thank you for registering with Aumirah Alliance Network. Your account is currently under review by our admin team. This process typically takes 1-2 business days.
          </p>
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-700">
              We will notify you via email at <span className="font-medium">{userData?.email}</span> once your account has been approved.
            </div>
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="w-full"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Login
            </Button>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            If you have any questions, please contact{' '}
            <a href="mailto:support@aumirahalliance.com" className="text-brand-600 hover:text-brand-700">
              support@aumirahalliance.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}