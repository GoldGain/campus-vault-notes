import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, Users, DollarSign, Download, FileText, 
  Bell, Settings, LogOut, ChevronRight, TrendingUp, 
  TrendingDown, Upload, Plus, Search, Filter, MoreVertical,
  BookOpen, Check, X, AlertTriangle, RefreshCw, Edit, Trash2,
  Eye, Mail, Phone, Calendar, Package, BarChart3, PieChart,
  Send, ChevronDown, CheckCircle2, XCircle, Ghost, UserPlus,
  BarChart, TrendingUp as TrendUp, Clock, Shield, Ban
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { 
  supabase, getAdminStats, getAllUsers, getAllTransactions, 
  getResources, uploadResource, deleteResource, subscribeToResources,
  getPendingContent, approveConfession, approveStudyGroup,
  type User as UserType, type Purchase, type Resource
} from '@/lib/supabase';

interface DashboardStats {
  totalUsers: number;
  activeSubscriptions: number;
  monthlyRevenue: number;
  totalDownloads: number;
  totalResources: number;
  pendingConfessions: number;
  pendingGroups: number;
}

interface NotificationForm {
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning';
  target: 'all' | 'active' | 'expiring';
}

export default function AdminPanel() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeSubscriptions: 0,
    monthlyRevenue: 0,
    totalDownloads: 0,
    totalResources: 0,
    pendingConfessions: 0,
    pendingGroups: 0
  });
  
  // Data states
  const [users, setUsers] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Pending content
  const [pendingContent, setPendingContent] = useState({
    pendingConfessions: [] as any[],
    pendingGroups: [] as any[],
    reportedConfessions: [] as any[],
    reportedComments: [] as any[]
  });
  
  // Upload form
  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    subject: '',
    unit_code: '',
    type: 'notes' as 'notes' | 'past_paper' | 'prediction' | 'ebook',
    is_premium: true
  });
  const [isUploading, setIsUploading] = useState(false);
  
  // Notification form
  const [notificationForm, setNotificationForm] = useState<NotificationForm>({
    title: '',
    message: '',
    type: 'info',
    target: 'all'
  });
  const [isSendingNotification, setIsSendingNotification] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (!isAdmin) {
      toast.error('Access denied. Admin only.');
      navigate('/members-area');
    } else {
      fetchAllData();
    }
  }, [isAuthenticated, isAdmin, navigate]);

  useEffect(() => {
    // Subscribe to real-time resource updates
    const subscription = subscribeToResources((payload) => {
      if (payload.eventType === 'INSERT') {
        setResources(prev => [payload.new as Resource, ...prev]);
      } else if (payload.eventType === 'DELETE') {
        setResources(prev => prev.filter(r => r.id !== payload.old.id));
      }
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      // Fetch stats
      const statsData = await getAdminStats();
      setStats(statsData);
      
      // Fetch users
      const { data: usersData } = await getAllUsers();
      if (usersData) setUsers(usersData);
      
      // Fetch transactions
      const { data: transactionsData } = await getAllTransactions();
      if (transactionsData) setTransactions(transactionsData);
      
      // Fetch resources
      const { data: resourcesData } = await getResources();
      if (resourcesData) setResources(resourcesData);
      
      // Fetch pending content
      const pending = await getPendingContent();
      setPendingContent(pending);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      toast.error('Failed to load admin data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleUploadResource = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!uploadForm.title || !uploadForm.subject) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsUploading(true);
    try {
      const { data, error } = await uploadResource({
        ...uploadForm,
        file_url: '#', // Would be actual file URL after upload
        file_size: '2.5 MB',
        download_count: 0
      });
      
      if (error) throw error;
      
      toast.success('Resource uploaded successfully!');
      setUploadForm({
        title: '',
        description: '',
        subject: '',
        unit_code: '',
        type: 'notes',
        is_premium: true
      });
    } catch (error: any) {
      toast.error('Failed to upload resource: ' + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteResource = async (resourceId: string) => {
    if (!confirm('Are you sure you want to delete this resource?')) return;
    
    try {
      const { error } = await deleteResource(resourceId);
      if (error) throw error;
      
      setResources(prev => prev.filter(r => r.id !== resourceId));
      toast.success('Resource deleted successfully');
    } catch (error: any) {
      toast.error('Failed to delete resource: ' + error.message);
    }
  };

  const handleApproveConfession = async (confessionId: string, approve: boolean) => {
    try {
      const { error } = await approveConfession(confessionId, approve);
      if (error) throw error;
      
      setPendingContent(prev => ({
        ...prev,
        pendingConfessions: prev.pendingConfessions.filter(c => c.id !== confessionId)
      }));
      
      toast.success(approve ? 'Confession approved!' : 'Confession rejected');
    } catch (error: any) {
      toast.error('Failed to process confession: ' + error.message);
    }
  };

  const handleApproveGroup = async (groupId: string, approve: boolean) => {
    try {
      const { error } = await approveStudyGroup(groupId, approve);
      if (error) throw error;
      
      setPendingContent(prev => ({
        ...prev,
        pendingGroups: prev.pendingGroups.filter(g => g.id !== groupId)
      }));
      
      toast.success(approve ? 'Study group approved!' : 'Study group rejected');
    } catch (error: any) {
      toast.error('Failed to process group: ' + error.message);
    }
  };

  const handleSendNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!notificationForm.title || !notificationForm.message) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setIsSendingNotification(true);
    try {
      // Get target users
      let targetUsers = users;
      if (notificationForm.target === 'active') {
        targetUsers = users.filter(u => u.purchases?.some((p: any) => p.payment_status === 'completed'));
      } else if (notificationForm.target === 'expiring') {
        targetUsers = users.filter(u => {
          const activePurchase = u.purchases?.find((p: any) => p.payment_status === 'completed');
          if (!activePurchase?.access_expires_at) return false;
          const daysLeft = Math.ceil((new Date(activePurchase.access_expires_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
          return daysLeft <= 7;
        });
      }
      
      // Send notifications
      const notifications = targetUsers.map(u => ({
        user_id: u.id,
        title: notificationForm.title,
        message: notificationForm.message,
        type: notificationForm.type,
        is_read: false
      }));
      
      const { error } = await supabase.from('notifications').insert(notifications);
      if (error) throw error;
      
      toast.success(`Notification sent to ${targetUsers.length} users!`);
      setNotificationForm({ title: '', message: '', type: 'info', target: 'all' });
    } catch (error: any) {
      toast.error('Failed to send notification: ' + error.message);
    } finally {
      setIsSendingNotification(false);
    }
  };

  const filteredUsers = users.filter(u => 
    u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.reg_number?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTransactions = transactions.filter(t =>
    t.profiles?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.transaction_id?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getExpiringSubscriptions = () => {
    return users.filter(u => {
      const activePurchase = u.purchases?.find((p: any) => p.payment_status === 'completed');
      if (!activePurchase?.access_expires_at) return false;
      const daysLeft = Math.ceil((new Date(activePurchase.access_expires_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
      return daysLeft <= 14 && daysLeft > 0;
    }).map(u => {
      const activePurchase = u.purchases?.find((p: any) => p.payment_status === 'completed');
      const daysLeft = Math.ceil((new Date(activePurchase.access_expires_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
      return {
        user: u.name,
        plan: activePurchase.product_name,
        expiryDate: new Date(activePurchase.access_expires_at).toLocaleDateString(),
        daysLeft
      };
    }).sort((a, b) => a.daysLeft - b.daysLeft);
  };

  const getTotalPendingActions = () => {
    return pendingContent.pendingConfessions.length + 
           pendingContent.pendingGroups.length + 
           pendingContent.reportedConfessions.length + 
           pendingContent.reportedComments.length;
  };

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0B0F1C]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#0f1420] border-r border-white/10 hidden lg:block z-50">
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#FF2D8F] to-[#ff6b9d] rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-white font-bold text-lg">Admin Panel</span>
          </div>
        </div>

        <nav className="px-4 py-4 space-y-1">
          {[
            { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
            { id: 'users', name: 'Users', icon: Users },
            { id: 'transactions', name: 'Transactions', icon: DollarSign },
            { id: 'resources', name: 'Resources', icon: BookOpen },
            { id: 'pending', name: 'Pending Actions', icon: Clock, badge: getTotalPendingActions() },
            { id: 'notifications', name: 'Notifications', icon: Bell },
            { id: 'settings', name: 'Settings', icon: Settings }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center justify-between px-4 py-3 rounded-xl w-full transition-all ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-[#FF2D8F]/20 to-[#FF2D8F]/5 text-[#FF2D8F] border border-[#FF2D8F]/30'
                  : 'text-[#A9B1C7] hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </div>
              {item.badge && item.badge > 0 && (
                <span className="bg-[#FF2D8F] text-white text-xs px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
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
            <div>
              <h1 className="text-xl font-bold text-white">
                {activeTab === 'dashboard' && 'Admin Dashboard'}
                {activeTab === 'users' && 'User Management'}
                {activeTab === 'transactions' && 'Transactions'}
                {activeTab === 'resources' && 'Resource Management'}
                {activeTab === 'pending' && 'Pending Actions'}
                {activeTab === 'notifications' && 'Send Notifications'}
                {activeTab === 'settings' && 'Settings'}
              </h1>
              <p className="text-sm text-[#A9B1C7]">Welcome back, {user?.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={fetchAllData}
                className="p-2 text-[#A9B1C7] hover:text-white transition-colors"
              >
                <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
              <button className="relative p-2 text-[#A9B1C7] hover:text-white">
                <Bell className="w-6 h-6" />
                {getTotalPendingActions() > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF2D8F] rounded-full" />
                )}
              </button>
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
                <>
                  {/* Stats */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {[
                      { label: 'Total Users', value: stats.totalUsers.toLocaleString(), change: '+12%', trend: 'up', icon: Users },
                      { label: 'Monthly Revenue', value: `KES ${stats.monthlyRevenue.toLocaleString()}`, change: '+23%', trend: 'up', icon: DollarSign },
                      { label: 'Total Downloads', value: stats.totalDownloads.toLocaleString(), change: '+8%', trend: 'up', icon: Download },
                      { label: 'Active Subscriptions', value: stats.activeSubscriptions.toLocaleString(), change: '+5%', trend: 'up', icon: Package }
                    ].map((stat, index) => (
                      <div key={index} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/[0.07] transition-all">
                        <div className="flex items-center justify-between mb-3">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            stat.trend === 'up' ? 'bg-green-500/10' : 'bg-red-500/10'
                          }`}>
                            <stat.icon className={`w-6 h-6 ${
                              stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                            }`} />
                          </div>
                          <div className={`flex items-center space-x-1 text-sm ${
                            stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                          }`}>
                            {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                            <span>{stat.change}</span>
                          </div>
                        </div>
                        <p className="text-3xl font-bold text-white">{stat.value}</p>
                        <p className="text-[#A9B1C7] text-sm">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Pending Actions Alert */}
                  {getTotalPendingActions() > 0 && (
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-4 mb-8">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <AlertTriangle className="w-6 h-6 text-yellow-500" />
                          <div>
                            <h3 className="text-white font-semibold">Pending Actions</h3>
                            <p className="text-sm text-[#A9B1C7]">
                              {pendingContent.pendingConfessions.length} confessions, {pendingContent.pendingGroups.length} groups pending approval
                            </p>
                          </div>
                        </div>
                        <Button 
                          onClick={() => setActiveTab('pending')}
                          className="bg-yellow-500 hover:bg-yellow-500/90 text-black"
                        >
                          Review Now
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="grid lg:grid-cols-3 gap-6">
                    {/* Recent Users */}
                    <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-white">Recent Users</h2>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-white/20 text-white"
                          onClick={() => setActiveTab('users')}
                        >
                          View All
                        </Button>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="text-left text-[#A9B1C7] text-sm">
                              <th className="pb-3">Name</th>
                              <th className="pb-3">Plan</th>
                              <th className="pb-3">Joined</th>
                              <th className="pb-3">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {users.slice(0, 5).map((u: any) => (
                              <tr key={u.id} className="border-t border-white/5">
                                <td className="py-3">
                                  <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF2D8F] to-[#ff6b9d] flex items-center justify-center">
                                      <span className="text-white text-sm font-semibold">{u.name?.charAt(0)}</span>
                                    </div>
                                    <div>
                                      <p className="text-white text-sm">{u.name}</p>
                                      <p className="text-[#A9B1C7] text-xs">{u.email}</p>
                                    </div>
                                  </div>
                                </td>
                                <td className="py-3">
                                  <Badge variant="outline" className="border-white/20 text-[#A9B1C7]">
                                    {u.purchases?.[0]?.product_name || 'Free'}
                                  </Badge>
                                </td>
                                <td className="py-3 text-[#A9B1C7] text-sm">
                                  {new Date(u.created_at).toLocaleDateString()}
                                </td>
                                <td className="py-3">
                                  <Badge className={u.purchases?.some((p: any) => p.payment_status === 'completed') 
                                    ? 'bg-green-500/20 text-green-400' 
                                    : 'bg-gray-500/20 text-gray-400'}>
                                    {u.purchases?.some((p: any) => p.payment_status === 'completed') ? 'Active' : 'Free'}
                                  </Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Expiring Subscriptions */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-white">Expiring Soon</h2>
                        <AlertTriangle className="w-5 h-5 text-yellow-500" />
                      </div>
                      <div className="space-y-4">
                        {getExpiringSubscriptions().slice(0, 5).map((sub, index) => (
                          <div key={index} className="bg-white/5 rounded-xl p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-white font-medium">{sub.user}</span>
                              <Badge className={sub.daysLeft <= 3 ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}>
                                {sub.daysLeft} days
                              </Badge>
                            </div>
                            <p className="text-[#A9B1C7] text-sm">{sub.plan}</p>
                            <p className="text-[#A9B1C7] text-xs mt-1">Expires: {sub.expiryDate}</p>
                          </div>
                        ))}
                        {getExpiringSubscriptions().length === 0 && (
                          <p className="text-[#A9B1C7] text-center py-4">No expiring subscriptions</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Recent Transactions */}
                  <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-semibold text-white">Recent Transactions</h2>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-white/20 text-white"
                        onClick={() => setActiveTab('transactions')}
                      >
                        View All
                      </Button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left text-[#A9B1C7] text-sm">
                            <th className="pb-3">Transaction ID</th>
                            <th className="pb-3">User</th>
                            <th className="pb-3">Amount</th>
                            <th className="pb-3">Method</th>
                            <th className="pb-3">Status</th>
                            <th className="pb-3">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactions.slice(0, 5).map((trx: any) => (
                            <tr key={trx.id} className="border-t border-white/5">
                              <td className="py-3 text-white text-sm font-mono">{trx.transaction_id || trx.id.slice(0, 8)}</td>
                              <td className="py-3 text-white text-sm">{trx.profiles?.name}</td>
                              <td className="py-3 text-white text-sm">KES {trx.amount}</td>
                              <td className="py-3">
                                <Badge variant="outline" className="border-white/20 text-[#A9B1C7]">
                                  {trx.payment_method}
                                </Badge>
                              </td>
                              <td className="py-3">
                                <Badge className={trx.payment_status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}>
                                  {trx.payment_status}
                                </Badge>
                              </td>
                              <td className="py-3 text-[#A9B1C7] text-sm">
                                {new Date(trx.created_at).toLocaleDateString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'users' && (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-white">All Users ({filteredUsers.length})</h2>
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A9B1C7]" />
                        <Input
                          placeholder="Search users..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 bg-white/5 border-white/10 text-white w-64"
                        />
                      </div>
                      <Button variant="outline" className="border-white/20 text-white">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                      </Button>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-[#A9B1C7] text-sm">
                          <th className="pb-3">Name</th>
                          <th className="pb-3">Email</th>
                          <th className="pb-3">Phone</th>
                          <th className="pb-3">Reg Number</th>
                          <th className="pb-3">Plan</th>
                          <th className="pb-3">Joined</th>
                          <th className="pb-3">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((u: any) => (
                          <tr key={u.id} className="border-t border-white/5">
                            <td className="py-3">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF2D8F] to-[#ff6b9d] flex items-center justify-center">
                                  <span className="text-white text-sm font-semibold">{u.name?.charAt(0)}</span>
                                </div>
                                <span className="text-white text-sm">{u.name}</span>
                              </div>
                            </td>
                            <td className="py-3 text-[#A9B1C7] text-sm">{u.email}</td>
                            <td className="py-3 text-[#A9B1C7] text-sm">{u.phone}</td>
                            <td className="py-3 text-[#A9B1C7] text-sm">{u.reg_number || '-'}</td>
                            <td className="py-3">
                              <Badge variant="outline" className="border-white/20 text-[#A9B1C7]">
                                {u.purchases?.[0]?.product_name || 'Free'}
                              </Badge>
                            </td>
                            <td className="py-3 text-[#A9B1C7] text-sm">
                              {new Date(u.created_at).toLocaleDateString()}
                            </td>
                            <td className="py-3">
                              <Badge className={u.purchases?.some((p: any) => p.payment_status === 'completed') 
                                ? 'bg-green-500/20 text-green-400' 
                                : 'bg-gray-500/20 text-gray-400'}>
                                {u.purchases?.some((p: any) => p.payment_status === 'completed') ? 'Active' : 'Free'}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'transactions' && (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-white">All Transactions ({filteredTransactions.length})</h2>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A9B1C7]" />
                      <Input
                        placeholder="Search transactions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-white/5 border-white/10 text-white w-64"
                      />
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-[#A9B1C7] text-sm">
                          <th className="pb-3">Transaction ID</th>
                          <th className="pb-3">User</th>
                          <th className="pb-3">Product</th>
                          <th className="pb-3">Amount</th>
                          <th className="pb-3">Method</th>
                          <th className="pb-3">Status</th>
                          <th className="pb-3">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTransactions.map((trx: any) => (
                          <tr key={trx.id} className="border-t border-white/5">
                            <td className="py-3 text-white text-sm font-mono">{trx.transaction_id || trx.id.slice(0, 8)}</td>
                            <td className="py-3 text-white text-sm">{trx.profiles?.name}</td>
                            <td className="py-3">
                              <Badge variant="outline" className="border-[#FF2D8F]/30 text-[#FF2D8F]">
                                {trx.product_name}
                              </Badge>
                            </td>
                            <td className="py-3 text-white text-sm font-medium">KES {trx.amount}</td>
                            <td className="py-3">
                              <Badge variant="outline" className="border-white/20 text-[#A9B1C7]">
                                {trx.payment_method}
                              </Badge>
                            </td>
                            <td className="py-3">
                              <Badge className={trx.payment_status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}>
                                {trx.payment_status}
                              </Badge>
                            </td>
                            <td className="py-3 text-[#A9B1C7] text-sm">
                              {new Date(trx.created_at).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'resources' && (
                <div className="space-y-6">
                  {/* Upload Form */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">Upload New Resource</h2>
                    <form onSubmit={handleUploadResource} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Input
                        placeholder="Resource Title"
                        value={uploadForm.title}
                        onChange={(e) => setUploadForm({...uploadForm, title: e.target.value})}
                        className="bg-white/5 border-white/10 text-white"
                      />
                      <Input
                        placeholder="Subject"
                        value={uploadForm.subject}
                        onChange={(e) => setUploadForm({...uploadForm, subject: e.target.value})}
                        className="bg-white/5 border-white/10 text-white"
                      />
                      <Input
                        placeholder="Unit Code (e.g., MAT 101)"
                        value={uploadForm.unit_code}
                        onChange={(e) => setUploadForm({...uploadForm, unit_code: e.target.value})}
                        className="bg-white/5 border-white/10 text-white"
                      />
                      <select
                        value={uploadForm.type}
                        onChange={(e) => setUploadForm({...uploadForm, type: e.target.value as any})}
                        className="bg-white/5 border border-white/10 text-white rounded-md px-3 py-2"
                      >
                        <option value="notes" className="bg-[#0B0F1C]">Notes</option>
                        <option value="past_paper" className="bg-[#0B0F1C]">Past Paper</option>
                        <option value="prediction" className="bg-[#0B0F1C]">Exam Prediction</option>
                        <option value="ebook" className="bg-[#0B0F1C]">E-Book</option>
                      </select>
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id="is_premium"
                          checked={uploadForm.is_premium}
                          onChange={(e) => setUploadForm({...uploadForm, is_premium: e.target.checked})}
                          className="w-4 h-4 accent-[#FF2D8F]"
                        />
                        <label htmlFor="is_premium" className="text-white text-sm">Premium Resource</label>
                      </div>
                      <Button 
                        type="submit" 
                        className="bg-[#FF2D8F] hover:bg-[#FF2D8F]/90"
                        disabled={isUploading}
                      >
                        {isUploading ? 'Uploading...' : 'Upload Resource'}
                      </Button>
                    </form>
                  </div>

                  {/* Resources List */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-semibold text-white">All Resources ({resources.length})</h2>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left text-[#A9B1C7] text-sm">
                            <th className="pb-3">Name</th>
                            <th className="pb-3">Subject</th>
                            <th className="pb-3">Type</th>
                            <th className="pb-3">Downloads</th>
                            <th className="pb-3">Premium</th>
                            <th className="pb-3">Uploaded</th>
                            <th className="pb-3">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {resources.map((resource) => (
                            <tr key={resource.id} className="border-t border-white/5">
                              <td className="py-3 text-white text-sm">{resource.title}</td>
                              <td className="py-3">
                                <Badge variant="outline" className="border-white/20 text-[#A9B1C7]">
                                  {resource.subject}
                                </Badge>
                              </td>
                              <td className="py-3">
                                <Badge className="bg-[#FF2D8F]/20 text-[#FF2D8F]">
                                  {resource.type}
                                </Badge>
                              </td>
                              <td className="py-3 text-white text-sm">{resource.download_count}</td>
                              <td className="py-3">
                                {resource.is_premium ? (
                                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                                ) : (
                                  <XCircle className="w-5 h-5 text-gray-500" />
                                )}
                              </td>
                              <td className="py-3 text-[#A9B1C7] text-sm">
                                {new Date(resource.created_at).toLocaleDateString()}
                              </td>
                              <td className="py-3">
                                <div className="flex items-center space-x-2">
                                  <Button variant="ghost" size="sm" className="text-[#A9B1C7] hover:text-white">
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="text-red-400 hover:text-red-300"
                                    onClick={() => handleDeleteResource(resource.id)}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'pending' && (
                <div className="space-y-6">
                  {/* Pending Confessions */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-semibold text-white flex items-center space-x-2">
                        <Ghost className="w-5 h-5 text-[#FF2D8F]" />
                        <span>Pending Confessions ({pendingContent.pendingConfessions.length})</span>
                      </h2>
                    </div>
                    <div className="space-y-4">
                      {pendingContent.pendingConfessions.map((confession) => (
                        <div key={confession.id} className="bg-white/[0.03] rounded-xl p-4">
                          <p className="text-white mb-4">{confession.content}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-[#A9B1C7]">
                              Submitted {new Date(confession.created_at).toLocaleDateString()}
                            </span>
                            <div className="flex items-center space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                                onClick={() => handleApproveConfession(confession.id, false)}
                              >
                                <X className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                              <Button
                                size="sm"
                                className="bg-green-500 hover:bg-green-500/90"
                                onClick={() => handleApproveConfession(confession.id, true)}
                              >
                                <Check className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                      {pendingContent.pendingConfessions.length === 0 && (
                        <p className="text-center text-[#A9B1C7] py-4">No pending confessions</p>
                      )}
                    </div>
                  </div>

                  {/* Pending Study Groups */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-semibold text-white flex items-center space-x-2">
                        <Users className="w-5 h-5 text-[#FF2D8F]" />
                        <span>Pending Study Groups ({pendingContent.pendingGroups.length})</span>
                      </h2>
                    </div>
                    <div className="space-y-4">
                      {pendingContent.pendingGroups.map((group) => (
                        <div key={group.id} className="bg-white/[0.03] rounded-xl p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-white font-medium">{group.group_name}</h3>
                              <p className="text-sm text-[#A9B1C7]">{group.platform}</p>
                              {group.unit_code && (
                                <Badge variant="outline" className="mt-1 border-white/20 text-[#A9B1C7]">
                                  {group.unit_code}
                                </Badge>
                              )}
                            </div>
                          </div>
                          {group.description && (
                            <p className="text-sm text-[#A9B1C7] mb-3">{group.description}</p>
                          )}
                          <div className="flex items-center justify-between">
                            <a 
                              href={group.invite_link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm text-[#FF2D8F] hover:underline"
                            >
                              Preview Link
                            </a>
                            <div className="flex items-center space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                                onClick={() => handleApproveGroup(group.id, false)}
                              >
                                <X className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                              <Button
                                size="sm"
                                className="bg-green-500 hover:bg-green-500/90"
                                onClick={() => handleApproveGroup(group.id, true)}
                              >
                                <Check className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                      {pendingContent.pendingGroups.length === 0 && (
                        <p className="text-center text-[#A9B1C7] py-4">No pending study groups</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="max-w-2xl">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">Send Notification to Users</h2>
                    <form onSubmit={handleSendNotification} className="space-y-4">
                      <div>
                        <label className="text-white text-sm mb-2 block">Target Audience</label>
                        <select
                          value={notificationForm.target}
                          onChange={(e) => setNotificationForm({...notificationForm, target: e.target.value as any})}
                          className="w-full bg-white/5 border border-white/10 text-white rounded-md px-3 py-2"
                        >
                          <option value="all" className="bg-[#0B0F1C]">All Users</option>
                          <option value="active" className="bg-[#0B0F1C]">Active Subscribers Only</option>
                          <option value="expiring" className="bg-[#0B0F1C]">Expiring Subscriptions (7 days)</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-white text-sm mb-2 block">Notification Type</label>
                        <select
                          value={notificationForm.type}
                          onChange={(e) => setNotificationForm({...notificationForm, type: e.target.value as any})}
                          className="w-full bg-white/5 border border-white/10 text-white rounded-md px-3 py-2"
                        >
                          <option value="info" className="bg-[#0B0F1C]">Info</option>
                          <option value="success" className="bg-[#0B0F1C]">Success</option>
                          <option value="warning" className="bg-[#0B0F1C]">Warning</option>
                        </select>
                      </div>
                      <Input
                        placeholder="Notification Title"
                        value={notificationForm.title}
                        onChange={(e) => setNotificationForm({...notificationForm, title: e.target.value})}
                        className="bg-white/5 border-white/10 text-white"
                      />
                      <textarea
                        placeholder="Notification Message"
                        value={notificationForm.message}
                        onChange={(e) => setNotificationForm({...notificationForm, message: e.target.value})}
                        rows={4}
                        className="w-full bg-white/5 border border-white/10 text-white rounded-md px-3 py-2 resize-none"
                      />
                      <Button 
                        type="submit" 
                        className="w-full bg-[#FF2D8F] hover:bg-[#FF2D8F]/90"
                        disabled={isSendingNotification}
                      >
                        {isSendingNotification ? 'Sending...' : 'Send Notification'}
                      </Button>
                    </form>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="max-w-2xl">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">Admin Settings</h2>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                        <div>
                          <h3 className="text-white font-medium">Email Notifications</h3>
                          <p className="text-sm text-[#A9B1C7]">Receive email alerts for new transactions</p>
                        </div>
                        <div className="w-12 h-6 bg-[#FF2D8F] rounded-full relative cursor-pointer">
                          <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                        <div>
                          <h3 className="text-white font-medium">Auto-Approve Payments</h3>
                          <p className="text-sm text-[#A9B1C7]">Automatically confirm M-PESA payments</p>
                        </div>
                        <div className="w-12 h-6 bg-white/20 rounded-full relative cursor-pointer">
                          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                        <div>
                          <h3 className="text-white font-medium">Maintenance Mode</h3>
                          <p className="text-sm text-[#A9B1C7]">Temporarily disable user access</p>
                        </div>
                        <div className="w-12 h-6 bg-white/20 rounded-full relative cursor-pointer">
                          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
                        </div>
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
