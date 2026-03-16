import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, BookOpen, FileText, Download as DownloadIcon, Clock, 
  Bell, Settings, LogOut, ChevronRight, Star, Check, Target,
  FolderOpen, Calendar, User, TrendingUp, Award, Zap,
  Flame, BookMarked, Clock3, CheckCircle2, Play, Lock,
  Sparkles, BarChart3, ChevronLeft, MoreHorizontal, Eye,
  AlertTriangle, Package, Crown, Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { 
  supabase, getUserPurchases, getUserDownloads, getNotifications, 
  markNotificationAsRead, getUserAccessibleResources, getUserEbooks,
  subscribeToNotifications, type Purchase, type Download as DownloadType, type Resource, type Ebook
} from '@/lib/supabase';

interface UserUnit {
  id: string;
  unit_code: string;
  unit_name: string;
  progress: number;
  resources_count: number;
  downloads_count: number;
  expiry_date?: string;
  color: string;
}

interface DownloadActivity extends DownloadType {
  resource?: Resource;
  ebook?: Ebook;
}

export default function MembersArea() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Data states
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [downloads, setDownloads] = useState<DownloadActivity[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [accessibleResources, setAccessibleResources] = useState<Resource[]>([]);
  const [userEbooks, setUserEbooks] = useState<Ebook[]>([]);
  const [studyStreak, setStudyStreak] = useState(12);
  
  // User units (derived from purchases)
  const [myUnits, setMyUnits] = useState<UserUnit[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    fetchUserData();
    
    // Subscribe to real-time notifications
    if (user?.id) {
      const subscription = subscribeToNotifications(user.id, (payload) => {
        setNotifications(prev => [payload.new, ...prev]);
        setUnreadCount(prev => prev + 1);
        toast.info(payload.new.title, { description: payload.new.message });
      });
      
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [isAuthenticated, navigate, user?.id]);

  const fetchUserData = async () => {
    if (!user?.id) return;
    
    setIsLoading(true);
    try {
      // Fetch purchases
      const { data: purchasesData } = await getUserPurchases(user.id);
      if (purchasesData) {
        setPurchases(purchasesData);
        
        // Generate user units from purchases
        const units: UserUnit[] = purchasesData
          .filter(p => p.product_type !== 'ebook')
          .map((p, index) => ({
            id: p.id,
            unit_code: p.product_id || p.product_name,
            unit_name: p.product_name,
            progress: Math.floor(Math.random() * 60) + 20, // Simulated progress
            resources_count: Math.floor(Math.random() * 10) + 5,
            downloads_count: Math.floor(Math.random() * 5),
            expiry_date: p.access_expires_at,
            color: ['from-blue-500 to-cyan-500', 'from-green-500 to-emerald-500', 'from-orange-500 to-amber-500', 'from-purple-500 to-pink-500'][index % 4]
          }));
        setMyUnits(units);
      }
      
      // Fetch downloads
      const { data: downloadsData } = await getUserDownloads(user.id);
      if (downloadsData) {
        setDownloads(downloadsData.map((d: any) => ({
          ...d,
          resource: d.resources,
          ebook: d.ebooks
        })));
      }
      
      // Fetch notifications
      const { data: notificationsData } = await getNotifications(user.id);
      if (notificationsData) {
        setNotifications(notificationsData);
        setUnreadCount(notificationsData.filter((n: any) => !n.is_read).length);
      }
      
      // Fetch accessible resources
      const { data: resourcesData } = await getUserAccessibleResources(user.id);
      if (resourcesData) setAccessibleResources(resourcesData);
      
      // Fetch user ebooks
      const { data: ebooksData } = await getUserEbooks(user.id);
      if (ebooksData) setUserEbooks(ebooksData);
      
      // Fetch study stats from user profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('study_streak')
        .eq('id', user.id)
        .single();
        
      if (profile) {
        setStudyStreak(profile.study_streak || 12);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleMarkNotificationRead = async (notificationId: string) => {
    await markNotificationAsRead(notificationId);
    setNotifications(prev => prev.map(n => 
      n.id === notificationId ? { ...n, is_read: true } : n
    ));
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const handleDownload = async (resource: Resource) => {
    // Check download limit
    const existingDownload = downloads.find(d => d.resource?.id === resource.id);
    if (existingDownload && existingDownload.download_count >= 3) {
      toast.error('Download limit reached (3/3). Contact support for assistance.');
      return;
    }
    
    toast.success(`Downloading ${resource.title}...`);
    // In real implementation, this would trigger the download with watermark
  };

  const getActiveSubscription = () => {
    return purchases.find(p => 
      p.payment_status === 'completed' && 
      (!p.access_expires_at || new Date(p.access_expires_at) > new Date())
    );
  };

  const getSubscriptionDaysLeft = () => {
    const active = getActiveSubscription();
    if (!active?.access_expires_at) return null;
    const daysLeft = Math.ceil((new Date(active.access_expires_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return Math.max(0, daysLeft);
  };

  const formatExpiryDate = (date?: string) => {
    if (!date) return 'Never expires';
    const daysLeft = Math.ceil((new Date(date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    if (daysLeft < 0) return 'Expired';
    if (daysLeft === 0) return 'Expires today';
    if (daysLeft === 1) return 'Expires tomorrow';
    if (daysLeft <= 7) return `Expires in ${daysLeft} days`;
    return `Expires ${new Date(date).toLocaleDateString()}`;
  };

  if (!isAuthenticated) {
    return null;
  }

  const activeSubscription = getActiveSubscription();
  const subscriptionDaysLeft = getSubscriptionDaysLeft();
  const totalDownloads = downloads.reduce((acc, d) => acc + d.download_count, 0);

  return (
    <div className="min-h-screen bg-[#0B0F1C]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#0f1420] border-r border-white/10 hidden lg:block z-50">
        <div className="p-6">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#FF2D8F] to-[#ff6b9d] rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-white font-bold text-lg">CampusVault</span>
          </Link>
        </div>

        <nav className="px-4 py-4 space-y-1">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl w-full transition-all ${
              activeTab === 'dashboard' 
                ? 'bg-gradient-to-r from-[#FF2D8F]/20 to-[#FF2D8F]/5 text-[#FF2D8F] border border-[#FF2D8F]/30' 
                : 'text-[#A9B1C7] hover:bg-white/5 hover:text-white'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab('my-units')}
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl w-full transition-all ${
              activeTab === 'my-units' 
                ? 'bg-gradient-to-r from-[#FF2D8F]/20 to-[#FF2D8F]/5 text-[#FF2D8F] border border-[#FF2D8F]/30' 
                : 'text-[#A9B1C7] hover:bg-white/5 hover:text-white'
            }`}
          >
            <FolderOpen className="w-5 h-5" />
            <span>My Units</span>
          </button>
          <button
            onClick={() => setActiveTab('my-books')}
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl w-full transition-all ${
              activeTab === 'my-books' 
                ? 'bg-gradient-to-r from-[#FF2D8F]/20 to-[#FF2D8F]/5 text-[#FF2D8F] border border-[#FF2D8F]/30' 
                : 'text-[#A9B1C7] hover:bg-white/5 hover:text-white'
            }`}
          >
            <BookMarked className="w-5 h-5" />
            <span>My Books</span>
          </button>
          <button
            onClick={() => setActiveTab('downloads')}
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl w-full transition-all ${
              activeTab === 'downloads' 
                ? 'bg-gradient-to-r from-[#FF2D8F]/20 to-[#FF2D8F]/5 text-[#FF2D8F] border border-[#FF2D8F]/30' 
                : 'text-[#A9B1C7] hover:bg-white/5 hover:text-white'
            }`}
          >
            <DownloadIcon className="w-5 h-5" />
            <span>Downloads</span>
          </button>
          <Link
            to="/resources"
            className="flex items-center space-x-3 px-4 py-3 rounded-xl text-[#A9B1C7] hover:bg-white/5 hover:text-white transition-colors"
          >
            <FileText className="w-5 h-5" />
            <span>Browse Resources</span>
          </Link>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
          <Link
            to="/profile"
            className="flex items-center space-x-3 px-4 py-3 rounded-xl text-[#A9B1C7] hover:bg-white/5 hover:text-white transition-colors"
          >
            <User className="w-5 h-5" />
            <span>Profile</span>
          </Link>
          <Link
            to="/settings"
            className="flex items-center space-x-3 px-4 py-3 rounded-xl text-[#A9B1C7] hover:bg-white/5 hover:text-white transition-colors"
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 rounded-xl text-[#A9B1C7] hover:bg-white/5 hover:text-white transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-[#0B0F1C]/95 backdrop-blur-md border-b border-white/10">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button className="lg:hidden p-2 text-[#A9B1C7] hover:text-white">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-white">
                  {activeTab === 'dashboard' && `Welcome back, ${user?.name?.split(' ')[0]}!`}
                  {activeTab === 'my-units' && 'My Units'}
                  {activeTab === 'my-books' && 'My Books'}
                  {activeTab === 'downloads' && 'Download History'}
                </h1>
                <p className="text-sm text-[#A9B1C7]">
                  {activeTab === 'dashboard' && "Here's what's happening with your studies"}
                  {activeTab === 'my-units' && 'Access all your purchased units'}
                  {activeTab === 'my-books' && 'Your purchased e-books'}
                  {activeTab === 'downloads' && 'Track your download usage'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Study Streak */}
              <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-orange-500/10 rounded-full border border-orange-500/30">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-orange-400 text-sm font-medium">{studyStreak} day streak</span>
              </div>
              
              {/* Notifications */}
              <button className="relative p-2 text-[#A9B1C7] hover:text-white transition-colors">
                <Bell className="w-6 h-6" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 w-5 h-5 bg-[#FF2D8F] rounded-full text-xs text-white flex items-center justify-center font-medium">
                    {unreadCount}
                  </span>
                )}
              </button>
              
              {/* User Avatar */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF2D8F] to-[#ff6b9d] flex items-center justify-center">
                <span className="text-white font-semibold">{user?.name?.charAt(0)}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-12 h-12 border-4 border-[#FF2D8F]/30 border-t-[#FF2D8F] rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  {/* Membership Status & Quick Stats */}
                  <div className="grid lg:grid-cols-3 gap-6">
                    {/* Membership Status Card */}
                    <div className="lg:col-span-1 bg-gradient-to-br from-[#FF2D8F] to-[#ff6b9d] rounded-2xl p-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                      <div className="relative z-10">
                        <div className="flex items-center space-x-2 mb-3">
                          <Crown className="w-5 h-5 text-white" />
                          <span className="text-white/80 text-sm font-medium">Membership Status</span>
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <CheckCircle2 className="w-5 h-5 text-white" />
                          <span className="text-white font-semibold text-lg">
                            {activeSubscription ? 'Active' : 'Free Plan'}
                          </span>
                        </div>
                        <p className="text-white/80 text-sm mb-4">
                          {subscriptionDaysLeft !== null 
                            ? formatExpiryDate(activeSubscription?.access_expires_at)
                            : 'Upgrade to access premium content'}
                        </p>
                        {subscriptionDaysLeft !== null && subscriptionDaysLeft <= 7 && (
                          <div className="flex items-center space-x-2 bg-white/20 rounded-lg px-3 py-2 mb-4">
                            <AlertTriangle className="w-4 h-4 text-white" />
                            <span className="text-white text-sm">Expiring soon!</span>
                          </div>
                        )}
                        <Link to="/pricing">
                          <Button variant="secondary" className="w-full bg-white text-[#FF2D8F] hover:bg-white/90">
                            {activeSubscription ? 'Renew/Upgrade' : 'Upgrade Now'}
                          </Button>
                        </Link>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="lg:col-span-2 grid sm:grid-cols-3 gap-4">
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-blue-400" />
                          </div>
                        </div>
                        <p className="text-3xl font-bold text-white">{myUnits.length}</p>
                        <p className="text-sm text-[#A9B1C7]">Units</p>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                            <BookMarked className="w-5 h-5 text-purple-400" />
                          </div>
                        </div>
                        <p className="text-3xl font-bold text-white">{userEbooks.length}</p>
                        <p className="text-sm text-[#A9B1C7]">Books</p>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                            <Star className="w-5 h-5 text-green-400" />
                          </div>
                        </div>
                        <p className="text-3xl font-bold text-white">98%</p>
                        <p className="text-sm text-[#A9B1C7]">Success Rate</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-3 gap-6">
                    {/* Main Column */}
                    <div className="lg:col-span-2 space-y-6">
                      {/* My Units */}
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-6">
                          <h2 className="text-lg font-semibold text-white flex items-center space-x-2">
                            <FolderOpen className="w-5 h-5 text-[#FF2D8F]" />
                            <span>My Units</span>
                          </h2>
                          <button 
                            onClick={() => setActiveTab('my-units')}
                            className="text-sm text-[#FF2D8F] hover:underline"
                          >
                            View All
                          </button>
                        </div>
                        
                        <div className="space-y-4">
                          {myUnits.slice(0, 3).map((unit) => (
                            <div key={unit.id} className="bg-white/[0.03] rounded-xl p-4 border border-white/5">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${unit.color} flex items-center justify-center`}>
                                    <BookOpen className="w-5 h-5 text-white" />
                                  </div>
                                  <div>
                                    <h3 className="text-white font-medium">{unit.unit_name}</h3>
                                    <p className="text-sm text-[#A9B1C7]">{unit.unit_code}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-lg font-bold text-white">{unit.progress}%</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-2 mb-3">
                                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full bg-gradient-to-r ${unit.color} rounded-full transition-all duration-500`}
                                    style={{ width: `${unit.progress}%` }}
                                  />
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4 text-sm text-[#A9B1C7]">
                                  <span className="flex items-center space-x-1">
                                    <FileText className="w-4 h-4" />
                                    <span>{unit.resources_count} resources</span>
                                  </span>
                                  <span className="flex items-center space-x-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{formatExpiryDate(unit.expiry_date)}</span>
                                  </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <button className="flex items-center space-x-1 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-[#A9B1C7] hover:text-white transition-colors text-sm">
                                    <Eye className="w-4 h-4" />
                                    <span>View</span>
                                  </button>
                                  <button className="flex items-center space-x-1 px-3 py-1.5 bg-[#FF2D8F] hover:bg-[#FF2D8F]/90 rounded-lg text-white text-sm">
                                    <DownloadIcon className="w-4 h-4" />
                                    <span>DL</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                          
                          {myUnits.length === 0 && (
                            <div className="text-center py-8">
                              <Package className="w-12 h-12 text-[#A9B1C7] mx-auto mb-3" />
                              <p className="text-[#A9B1C7]">No units purchased yet</p>
                              <Link to="/pricing">
                                <Button className="mt-3 bg-[#FF2D8F]">Browse Plans</Button>
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* My Books */}
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-6">
                          <h2 className="text-lg font-semibold text-white flex items-center space-x-2">
                            <BookMarked className="w-5 h-5 text-[#FF2D8F]" />
                            <span>My Books</span>
                          </h2>
                          <Link to="/books" className="text-sm text-[#FF2D8F] hover:underline">
                            Browse More
                          </Link>
                        </div>
                        
                        <div className="space-y-3">
                          {userEbooks.slice(0, 2).map((book) => (
                            <div key={book.id} className="flex items-center justify-between p-4 bg-white/[0.03] rounded-xl">
                              <div className="flex items-center space-x-3">
                                <div className="w-12 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                  <BookMarked className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                  <h3 className="text-white font-medium">{book.title}</h3>
                                  {book.author && <p className="text-sm text-[#A9B1C7]">by {book.author}</p>}
                                  {book.is_bestseller && (
                                    <Badge className="bg-yellow-500/20 text-yellow-400 mt-1">
                                      <Star className="w-3 h-3 mr-1" />
                                      Bestseller
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button className="flex items-center space-x-1 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-[#A9B1C7] hover:text-white transition-colors text-sm">
                                  <Eye className="w-4 h-4" />
                                  <span>Read</span>
                                </button>
                                <button className="flex items-center space-x-1 px-3 py-1.5 bg-[#FF2D8F] hover:bg-[#FF2D8F]/90 rounded-lg text-white text-sm">
                                  <DownloadIcon className="w-4 h-4" />
                                  <span>DL</span>
                                </button>
                              </div>
                            </div>
                          ))}
                          
                          {userEbooks.length === 0 && (
                            <div className="text-center py-6">
                              <p className="text-[#A9B1C7]">No books purchased yet</p>
                              <Link to="/books">
                                <Button variant="outline" className="mt-2 border-white/20 text-white">
                                  Browse Books
                                </Button>
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Sidebar Column */}
                    <div className="space-y-6">
                      {/* Download Activity */}
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <h2 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                          <DownloadIcon className="w-5 h-5 text-[#FF2D8F]" />
                          <span>Download Activity</span>
                        </h2>
                        <div className="space-y-3">
                          {downloads.slice(0, 5).map((download) => (
                            <div key={download.id} className="flex items-center justify-between p-3 bg-white/[0.03] rounded-lg">
                              <div className="flex-1 min-w-0">
                                <p className="text-white text-sm truncate">{download.file_name}</p>
                                <p className="text-xs text-[#A9B1C7]">
                                  Downloaded {download.download_count}/{download.max_downloads} times
                                </p>
                              </div>
                              {download.download_count >= download.max_downloads ? (
                                <Lock className="w-4 h-4 text-red-400" />
                              ) : (
                                <CheckCircle2 className="w-4 h-4 text-green-400" />
                              )}
                            </div>
                          ))}
                          
                          {downloads.length === 0 && (
                            <p className="text-center text-[#A9B1C7] py-4">No downloads yet</p>
                          )}
                        </div>
                      </div>

                      {/* Notifications */}
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-lg font-semibold text-white flex items-center space-x-2">
                            <Bell className="w-5 h-5 text-[#FF2D8F]" />
                            <span>Notifications</span>
                          </h2>
                          {unreadCount > 0 && (
                            <Badge className="bg-[#FF2D8F] text-white">{unreadCount} new</Badge>
                          )}
                        </div>
                        <div className="space-y-3 max-h-64 overflow-y-auto">
                          {notifications.slice(0, 5).map((notification: any) => (
                            <div
                              key={notification.id}
                              onClick={() => !notification.is_read && handleMarkNotificationRead(notification.id)}
                              className={`p-3 rounded-xl cursor-pointer transition-colors ${
                                notification.is_read ? 'bg-white/5' : 'bg-[#FF2D8F]/10 hover:bg-[#FF2D8F]/20'
                              }`}
                            >
                              <p className={`text-sm font-medium ${notification.is_read ? 'text-[#A9B1C7]' : 'text-white'}`}>
                                {notification.title}
                              </p>
                              <p className="text-xs text-[#A9B1C7] mt-0.5">{notification.message}</p>
                              <p className="text-xs text-[#A9B1C7]/60 mt-1">
                                {new Date(notification.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          ))}
                          
                          {notifications.length === 0 && (
                            <p className="text-center text-[#A9B1C7] py-4">No notifications</p>
                          )}
                        </div>
                      </div>

                      {/* Recommended */}
                      <div className="bg-gradient-to-br from-[#FF2D8F]/20 to-[#FF2D8F]/5 border border-[#FF2D8F]/30 rounded-2xl p-6">
                        <h2 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                          <Sparkles className="w-5 h-5 text-[#FF2D8F]" />
                          <span>Recommended</span>
                        </h2>
                        <div className="space-y-3">
                          <div className="p-3 bg-white/5 rounded-xl">
                            <p className="text-white text-sm font-medium">Physics Unit 2</p>
                            <p className="text-xs text-[#A9B1C7]">Other students also bought</p>
                          </div>
                          <div className="p-3 bg-white/5 rounded-xl">
                            <p className="text-white text-sm font-medium">Semester Bundle</p>
                            <p className="text-xs text-[#A9B1C7]">Save 30% vs individual units</p>
                          </div>
                        </div>
                        <Link to="/pricing">
                          <Button className="w-full mt-4 bg-[#FF2D8F] hover:bg-[#FF2D8F]/90">
                            View All Plans
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'my-units' && (
                <div className="space-y-6">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h2 className="text-lg font-semibold text-white mb-6">All My Units</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {myUnits.map((unit) => (
                        <div key={unit.id} className="bg-white/[0.03] rounded-xl p-5 border border-white/5">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${unit.color} flex items-center justify-center`}>
                                <BookOpen className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <h3 className="text-white font-medium">{unit.unit_name}</h3>
                                <p className="text-sm text-[#A9B1C7]">{unit.unit_code}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-white">{unit.progress}%</p>
                            </div>
                          </div>
                          
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-4">
                            <div 
                              className={`h-full bg-gradient-to-r ${unit.color} rounded-full transition-all duration-500`}
                              style={{ width: `${unit.progress}%` }}
                            />
                          </div>
                          
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-4 text-[#A9B1C7]">
                              <span className="flex items-center space-x-1">
                                <FileText className="w-4 h-4" />
                                <span>{unit.resources_count} resources</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{formatExpiryDate(unit.expiry_date)}</span>
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2 mt-4">
                            <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-[#A9B1C7] hover:text-white transition-colors">
                              <Eye className="w-4 h-4" />
                              <span>View</span>
                            </button>
                            <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-[#FF2D8F] hover:bg-[#FF2D8F]/90 rounded-lg text-white">
                              <DownloadIcon className="w-4 h-4" />
                              <span>Download</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {myUnits.length === 0 && (
                      <div className="text-center py-12">
                        <Package className="w-16 h-16 text-[#A9B1C7] mx-auto mb-4" />
                        <h3 className="text-white text-xl font-semibold mb-2">No units yet</h3>
                        <p className="text-[#A9B1C7] mb-4">Purchase a plan to access study materials</p>
                        <Link to="/pricing">
                          <Button className="bg-[#FF2D8F]">Browse Plans</Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'my-books' && (
                <div className="space-y-6">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h2 className="text-lg font-semibold text-white mb-6">My E-Books</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {userEbooks.map((book) => (
                        <div key={book.id} className="bg-white/[0.03] rounded-xl p-5 border border-white/5">
                          <div className="w-full h-40 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                            <BookMarked className="w-16 h-16 text-white" />
                          </div>
                          <h3 className="text-white font-medium mb-1">{book.title}</h3>
                          {book.author && <p className="text-sm text-[#A9B1C7] mb-2">by {book.author}</p>}
                          {book.is_bestseller && (
                            <Badge className="bg-yellow-500/20 text-yellow-400 mb-3">
                              <Star className="w-3 h-3 mr-1" />
                              Bestseller
                            </Badge>
                          )}
                          <div className="flex items-center space-x-2 mt-4">
                            <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-[#A9B1C7] hover:text-white transition-colors">
                              <Eye className="w-4 h-4" />
                              <span>Read</span>
                            </button>
                            <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-[#FF2D8F] hover:bg-[#FF2D8F]/90 rounded-lg text-white">
                              <DownloadIcon className="w-4 h-4" />
                              <span>Download</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {userEbooks.length === 0 && (
                      <div className="text-center py-12">
                        <BookMarked className="w-16 h-16 text-[#A9B1C7] mx-auto mb-4" />
                        <h3 className="text-white text-xl font-semibold mb-2">No books yet</h3>
                        <p className="text-[#A9B1C7] mb-4">Purchase e-books to add them here</p>
                        <Link to="/books">
                          <Button className="bg-[#FF2D8F]">Browse Books</Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'downloads' && (
                <div className="space-y-6">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h2 className="text-lg font-semibold text-white mb-6">Download History</h2>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left text-[#A9B1C7] text-sm border-b border-white/10">
                            <th className="pb-3">File Name</th>
                            <th className="pb-3">Downloads Used</th>
                            <th className="pb-3">Last Downloaded</th>
                            <th className="pb-3">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {downloads.map((download) => (
                            <tr key={download.id} className="border-b border-white/5">
                              <td className="py-4">
                                <div className="flex items-center space-x-3">
                                  <FileText className="w-5 h-5 text-[#FF2D8F]" />
                                  <span className="text-white">{download.file_name}</span>
                                </div>
                              </td>
                              <td className="py-4">
                                <span className={`${download.download_count >= download.max_downloads ? 'text-red-400' : 'text-white'}`}>
                                  {download.download_count}/{download.max_downloads}
                                </span>
                              </td>
                              <td className="py-4 text-[#A9B1C7]">
                                {new Date(download.downloaded_at).toLocaleDateString()}
                              </td>
                              <td className="py-4">
                                {download.download_count >= download.max_downloads ? (
                                  <Badge className="bg-red-500/20 text-red-400">
                                    <Lock className="w-3 h-3 mr-1" />
                                    Locked
                                  </Badge>
                                ) : (
                                  <Badge className="bg-green-500/20 text-green-400">
                                    <CheckCircle2 className="w-3 h-3 mr-1" />
                                    Available
                                  </Badge>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    {downloads.length === 0 && (
                      <div className="text-center py-12">
                        <DownloadIcon className="w-16 h-16 text-[#A9B1C7] mx-auto mb-4" />
                        <h3 className="text-white text-xl font-semibold mb-2">No downloads yet</h3>
                        <p className="text-[#A9B1C7] mb-4">Start downloading resources from your units</p>
                        <button 
                          onClick={() => setActiveTab('my-units')}
                          className="text-[#FF2D8F] hover:underline"
                        >
                          Go to My Units
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-white font-semibold mb-2">Download Limit Policy</h3>
                        <p className="text-sm text-[#A9B1C7]">
                          Each file can be downloaded up to 3 times. This limit helps prevent unauthorized sharing. 
                          If you need more downloads for legitimate reasons, please contact support.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
