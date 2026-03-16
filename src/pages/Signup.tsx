import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    regNumber: '',
    password: '',
    agreeTerms: false
  });
  
  const navigate = useNavigate();
  const { signup } = useAuth();

  const features = [
    'Access to 500+ study resources',
    'Exam predictions updated every semester',
    'Past papers with solutions',
    'Watermarked downloads',
    'Mobile-friendly platform'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    if (!formData.agreeTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy');
      setIsLoading(false);
      return;
    }
    
    const result = await signup(
      formData.name,
      formData.email,
      formData.phone,
      formData.password,
      formData.regNumber
    );
    
    if (result.success) {
      toast.success('Welcome to CampusVault! Your account has been created.');
      navigate('/members-area');
    } else {
      setError(result.error || 'Failed to create account');
      toast.error(result.error || 'Signup failed');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0B0F1C] flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8">
        {/* Left Side - Info */}
        <div className="hidden lg:flex flex-col justify-center">
          <Link to="/" className="inline-flex items-center space-x-2 mb-8">
            <div className="w-12 h-12 bg-[#FF2D8F] rounded-xl flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <span className="text-white font-bold text-2xl tracking-tight">
              CampusVault
            </span>
          </Link>

          <h1 className="text-4xl font-bold text-white mb-6">
            Start your journey to academic success
          </h1>
          
          <p className="text-[#A9B1C7] text-lg mb-8">
            Join 10,000+ MUT students who are already studying smarter with CampusVault.
          </p>

          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-[#FF2D8F]/10 flex items-center justify-center">
                  <Check className="w-3 h-3 text-[#FF2D8F]" />
                </div>
                <span className="text-[#A9B1C7]">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Form */}
        <div>
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-2">
              <div className="w-10 h-10 bg-[#FF2D8F] rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-white font-bold text-xl tracking-tight">
                CampusVault
              </span>
            </Link>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
            <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-[#A9B1C7] mb-6">Get instant access to premium study materials</p>
            
            {error && (
              <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <span className="text-red-400 text-sm">{error}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm text-[#A9B1C7] mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A9B1C7]" />
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="John Doe"
                    className="pl-12 py-5 bg-white/5 border-white/10 text-white placeholder:text-[#A9B1C7]/50 focus:border-[#FF2D8F]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-[#A9B1C7] mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A9B1C7]" />
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your@email.com"
                    className="pl-12 py-5 bg-white/5 border-white/10 text-white placeholder:text-[#A9B1C7]/50 focus:border-[#FF2D8F]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-[#A9B1C7] mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A9B1C7]" />
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+254 7XX XXX XXX"
                    className="pl-12 py-5 bg-white/5 border-white/10 text-white placeholder:text-[#A9B1C7]/50 focus:border-[#FF2D8F]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-[#A9B1C7] mb-2">
                  Registration Number <span className="text-[#A9B1C7]/50">(optional)</span>
                </label>
                <Input
                  type="text"
                  value={formData.regNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, regNumber: e.target.value }))}
                  placeholder="EDU/2023/001"
                  className="py-5 bg-white/5 border-white/10 text-white placeholder:text-[#A9B1C7]/50 focus:border-[#FF2D8F]"
                />
              </div>

              <div>
                <label className="block text-sm text-[#A9B1C7] mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A9B1C7]" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Create a password"
                    className="pl-12 pr-12 py-5 bg-white/5 border-white/10 text-white placeholder:text-[#A9B1C7]/50 focus:border-[#FF2D8F]"
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

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, agreeTerms: checked as boolean }))
                  }
                  className="mt-1 border-white/20 data-[state=checked]:bg-[#FF2D8F] data-[state=checked]:border-[#FF2D8F]"
                />
                <label htmlFor="terms" className="text-sm text-[#A9B1C7]">
                  I agree to the{' '}
                  <Link to="/terms" className="text-[#FF2D8F] hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-[#FF2D8F] hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#FF2D8F] hover:bg-[#FF2D8F]/90 text-white py-6"
              >
                {isLoading ? 'Creating account...' : 'Create Account'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-[#A9B1C7]">
                Already have an account?{' '}
                <Link to="/login" className="text-[#FF2D8F] hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          <p className="text-center text-[#A9B1C7] text-sm mt-8">
            © 2026 CampusVault. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
