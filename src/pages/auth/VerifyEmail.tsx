import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { sendEmailVerification } from 'firebase/auth';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { Mail, AlertCircle } from 'lucide-react';

export default function VerifyEmail() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [countdown, setCountdown] = useState(0);
  const { user, userData } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResendEmail = async () => {
    if (countdown > 0) return;

    try {
      setLoading(true);
      setError('');
      await sendEmailVerification(user!);
      setMessage('Verification email sent! Please check your inbox.');
      setCountdown(60); // Start 60-second countdown
    } catch (err: any) {
      console.error('Error sending verification email:', err);
      setError('Failed to send verification email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    if (userData?.status === 'pending') {
      navigate('/pending-approval');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <Logo size="lg" className="mx-auto mb-6" />
        <Mail className="h-12 w-12 text-brand-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify your email</h2>
        <p className="text-gray-600 mb-6">
          We've sent a verification email to:<br />
          <span className="font-medium">{user?.email}</span>
        </p>

        {error && (
          <div className="mb-4 p-4 bg-red-50 rounded-md flex items-center text-red-600">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {message && (
          <div className="mb-4 p-4 bg-green-50 rounded-md">
            <p className="text-sm text-green-600">{message}</p>
          </div>
        )}

        <div className="space-y-4">
          <Button
            onClick={handleResendEmail}
            disabled={loading || countdown > 0}
            className="w-full"
          >
            {countdown > 0 ? (
              `Resend email (${countdown}s)`
            ) : (
              'Resend verification email'
            )}
          </Button>

          <Button
            variant="outline"
            onClick={handleSkip}
            className="w-full"
          >
            Skip for now
          </Button>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          Didn't receive the email? Check your spam folder or click resend above.
        </p>
      </div>
    </div>
  );
}