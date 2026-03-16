import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Thank you for subscribing! Check your email for a free sample pack.');
      setEmail('');
    }
  };

  const footerLinks = {
    product: [
      { name: 'Subjects', path: '/subjects' },
      { name: 'Resources', path: '/resources' },
      { name: 'Pricing', path: '/pricing' },
      { name: 'Books', path: '/books' },
    ],
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Success Stories', path: '/testimonials' },
      { name: 'Blog', path: '/study-tips' },
      { name: 'Careers', path: '/career-guidance' },
    ],
    support: [
      { name: 'FAQ', path: '/faq' },
      { name: 'Contact', path: '/contact' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
    ],
    studentLife: [
      { name: 'Study Tips', path: '/study-tips' },
      { name: 'Exam Preparation', path: '/exam-preparation' },
      { name: 'Career Guidance', path: '/career-guidance' },
      { name: 'Mental Health', path: '/mental-health' },
    ],
  };

  return (
    <footer className="bg-[#0B0F1C] border-t border-white/10">
      {/* Newsletter Section */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-12 lg:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Start studying smarter today
          </h3>
          <p className="text-[#A9B1C7] mb-6">
            Get a free sample pack + weekly study tips delivered to your inbox
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent border-white/20 text-white placeholder:text-[#A9B1C7]/60 focus:border-[#FF2D8F]"
              required
            />
            <Button type="submit" className="bg-[#FF2D8F] hover:bg-[#FF2D8F]/90 text-white px-6">
              <Send className="w-4 h-4 mr-2" />
              Subscribe
            </Button>
          </form>
          <p className="text-xs text-[#A9B1C7]/60 mt-3">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>

      {/* Main Footer */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-12 border-t border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-[#FF2D8F] rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-white font-bold text-xl tracking-tight">
                CampusVault
              </span>
            </Link>
            <p className="text-[#A9B1C7] text-sm mb-6 max-w-xs">
              Study Smarter. Pass Faster. Premium revision packs designed by students, for students at Murang'a University of Technology.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-[#A9B1C7] hover:bg-[#FF2D8F] hover:text-white transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-[#A9B1C7] hover:bg-[#FF2D8F] hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-[#A9B1C7] hover:bg-[#FF2D8F] hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-[#A9B1C7] hover:bg-[#FF2D8F] hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-[#A9B1C7] hover:bg-[#FF2D8F] hover:text-white transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-[#A9B1C7] text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-[#A9B1C7] text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-[#A9B1C7] text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Student Life Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Student Life</h4>
            <ul className="space-y-2">
              {footerLinks.studentLife.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-[#A9B1C7] text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
              <div className="flex items-center space-x-2 text-[#A9B1C7] text-sm">
                <MapPin className="w-4 h-4" />
                <span>Murang'a University of Technology, P.O. Box 75-10200, Murang'a</span>
              </div>
              <div className="flex items-center space-x-2 text-[#A9B1C7] text-sm">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@campusvault.co.ke" className="hover:text-white transition-colors">
                  info@campusvault.co.ke
                </a>
              </div>
              <div className="flex items-center space-x-2 text-[#A9B1C7] text-sm">
                <Phone className="w-4 h-4" />
                <a href="tel:+254720123456" className="hover:text-white transition-colors">
                  +254 720 123 456
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-4 border-t border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-[#A9B1C7]/60 text-sm">
            © 2026 CampusVault. All rights reserved.
          </p>
          <p className="text-[#A9B1C7]/60 text-sm">
            Designed with ❤️ for MUT Students
          </p>
        </div>
      </div>
    </footer>
  );
}
