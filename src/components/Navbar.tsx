import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, BookOpen, GraduationCap, Users, Phone, HelpCircle, Home, Library, Brain, Briefcase, Heart, FileText, Ghost, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { 
      name: 'Subjects', 
      path: '/subjects',
      icon: GraduationCap,
      dropdown: [
        { name: 'All Subjects', path: '/subjects', icon: Library },
        { name: 'Mathematics', path: '/subjects?subject=math', icon: BookOpen },
        { name: 'Chemistry', path: '/subjects?subject=chemistry', icon: BookOpen },
        { name: 'Biology', path: '/subjects?subject=biology', icon: BookOpen },
        { name: 'Physics', path: '/subjects?subject=physics', icon: BookOpen },
      ]
    },
    { 
      name: 'Resources', 
      path: '/resources',
      icon: Library,
      dropdown: [
        { name: 'All Resources', path: '/resources', icon: Library },
        { name: 'Notes', path: '/resources?type=notes', icon: FileText },
        { name: 'Past Papers', path: '/resources?type=papers', icon: FileText },
        { name: 'Predictions', path: '/resources?type=predictions', icon: FileText },
      ]
    },
    { name: 'Books', path: '/books', icon: BookOpen },
    { 
      name: 'Community', 
      path: '#',
      icon: Users,
      dropdown: [
        { name: 'Confessions', path: '/confessions', icon: Ghost },
        { name: 'Study Groups', path: '/study-groups', icon: MessageCircle },
        { name: 'Study Tips', path: '/study-tips', icon: Brain },
        { name: 'Career Guidance', path: '/career-guidance', icon: Briefcase },
        { name: 'Mental Health', path: '/mental-health', icon: Heart },
        { name: 'Exam Preparation', path: '/exam-preparation', icon: FileText },
      ]
    },
    { name: 'Pricing', path: '/pricing', icon: BookOpen },
    { name: 'Success Stories', path: '/testimonials', icon: Users },
    { name: 'About', path: '/about', icon: BookOpen },
    { name: 'FAQ', path: '/faq', icon: HelpCircle },
    { name: 'Contact', path: '/contact', icon: Phone },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B0F1C]/95 backdrop-blur-md border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-[#FF2D8F] rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <span className="text-white font-bold text-lg lg:text-xl tracking-tight">
              CampusVault
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-1">
            {navLinks.map((link) =>
              link.dropdown ? (
                <DropdownMenu key={link.name}>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive(link.path)
                          ? 'text-[#FF2D8F]'
                          : 'text-[#A9B1C7] hover:text-white'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-[#0B0F1C] border border-white/10">
                    {link.dropdown.map((item) => (
                      <DropdownMenuItem key={item.name} asChild>
                        <Link
                          to={item.path}
                          className="flex items-center space-x-2 text-[#A9B1C7] hover:text-white hover:bg-white/5"
                        >
                          <item.icon className="w-4 h-4" />
                          <span>{item.name}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'text-[#FF2D8F]'
                      : 'text-[#A9B1C7] hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              )
            )}
          </div>

          {/* CTA Buttons */}
          <div className="hidden xl:flex items-center space-x-3">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-[#A9B1C7] hover:text-white hover:bg-white/5"
                  >
                    <span className="mr-2">{user?.name}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#0B0F1C] border border-white/10">
                  <DropdownMenuItem asChild>
                    <Link to="/members-area" className="text-[#A9B1C7] hover:text-white">
                      Members Area
                    </Link>
                  </DropdownMenuItem>
                  {user?.role === 'admin' && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="text-[#A9B1C7] hover:text-white">
                        Admin Panel
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    onClick={logout}
                    className="text-[#A9B1C7] hover:text-white cursor-pointer"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className="text-[#A9B1C7] hover:text-white hover:bg-white/5"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-[#FF2D8F] hover:bg-[#FF2D8F]/90 text-white px-6">
                    Get Access
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="xl:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-[#0B0F1C]/98 backdrop-blur-md border-t border-white/10">
          <div className="px-4 py-4 space-y-2 max-h-[80vh] overflow-y-auto">
            {navLinks.map((link) => (
              <div key={link.name}>
                <Link
                  to={link.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
                    isActive(link.path)
                      ? 'bg-[#FF2D8F]/10 text-[#FF2D8F]'
                      : 'text-[#A9B1C7] hover:bg-white/5 hover:text-white'
                  }`}
                  onClick={() => !link.dropdown && setIsMobileMenuOpen(false)}
                >
                  <link.icon className="w-5 h-5" />
                  <span className="font-medium">{link.name}</span>
                </Link>
                {link.dropdown && (
                  <div className="ml-8 mt-1 space-y-1">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="flex items-center space-x-3 px-4 py-2 rounded-lg text-sm text-[#A9B1C7] hover:bg-white/5 hover:text-white"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-white/10 space-y-2">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/members-area"
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-[#A9B1C7] hover:bg-white/5 hover:text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Users className="w-5 h-5" />
                    <span>Members Area</span>
                  </Link>
                  {user?.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg text-[#A9B1C7] hover:bg-white/5 hover:text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <BookOpen className="w-5 h-5" />
                      <span>Admin Panel</span>
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-[#A9B1C7] hover:bg-white/5 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-[#A9B1C7] hover:bg-white/5 hover:text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Users className="w-5 h-5" />
                    <span>Sign In</span>
                  </Link>
                  <Link
                    to="/signup"
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-[#FF2D8F] text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <GraduationCap className="w-5 h-5" />
                    <span>Get Access</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
