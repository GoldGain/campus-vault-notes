import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Eye, EyeOff, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      toast.success('Welcome back to CampusVault!');
      navigate('/members-area');
    } else {
      setError(result.error || 'Invalid email or password');
      toast.error(result.error || 'Login failed');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0B0F1C] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="w-12 h-12 bg-[#FF2D8F] rounded-xl flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <span className="text-white font-bold text-2xl tracking-tight">
              CampusVault
            </span>
          </Link>
          <p className="text-[#A9B1C7] mt-2">Sign in to access your study materials</p>
        </div>

        {/* Form */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
          <h1 className="text-2xl font-bold text-white mb-6">Sign In</h1>
          
          {error && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <span className="text-red-400 text-sm">{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm text-[#A9B1C7] mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A9B1C7]" />
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your@email.com"
                  className="pl-12 py-6 bg-white/5 border-white/10 text-white placeholder:text-[#A9B1C7]/50 focus:border-[#FF2D8F]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#A9B1C7] mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A9B1C7]" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Enter your password"
                  className="pl-12 pr-12 py-6 bg-white/5 border-white/10 text-white placeholder:text-[#A9B1C7]/50 focus:border-[#FF2D8F]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A9B1C7] hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, rememberMe: checked as boolean }))
                  }
                  className="border-white/20 data-[state=checked]:bg-[#FF2D8F] data-[state=checked]:border-[#FF2D8F]"
                />
                <label htmlFor="remember" className="text-sm text-[#A9B1C7]">
                  Remember me
                </label>
              </div>
              <Link to="/forgot-password" className="text-sm text-[#FF2D8F] hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#FF2D8F] hover:bg-[#FF2D8F]/90 text-white py-6"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#A9B1C7]">
              Do not have an account?{' '}
              <Link to="/signup" className="text-[#FF2D8F] hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-[#A9B1C7] text-sm mt-8">
          © 2026 CampusVault. All rights reserved.
        </p>
      </div>
    </div>
  );
}
