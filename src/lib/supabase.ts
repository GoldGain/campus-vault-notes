import { createClient } from '@supabase/supabase-js';

// CampusVault Supabase Configuration
const SUPABASE_URL = 'https://yvffndvfomfhauzhyhtu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2ZmZuZHZmb21maGF1emh5aHR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4NjQwMDAsImV4cCI6MjAyNTQ0MDAwMH0.example_anon_key';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// ============================================
// DATABASE TYPES
// ============================================

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  reg_number?: string;
  role: 'student' | 'admin';
  avatar_url?: string;
  study_streak?: number;
  total_study_hours?: number;
  created_at: string;
  updated_at: string;
}

export interface Purchase {
  id: string;
  user_id: string;
  product_type: 'single_unit' | 'semester_bundle' | 'year_bundle' | 'four_year_pack' | 'ebook';
  product_name: string;
  product_id?: string;
  amount: number;
  currency: string;
  payment_method: 'mpesa' | 'stripe';
  payment_status: 'pending' | 'completed' | 'failed' | 'refunded';
  transaction_id?: string;
  access_expires_at?: string;
  created_at: string;
}

export interface Download {
  id: string;
  user_id: string;
  resource_id?: string;
  ebook_id?: string;
  file_name: string;
  download_count: number;
  max_downloads: number;
  ip_address?: string;
  downloaded_at: string;
}

export interface Unit {
  id: string;
  unit_code: string;
  unit_name: string;
  year: number;
  semester: number;
  description?: string;
  price_kes: number;
  is_common: boolean;
  created_at: string;
}

export interface Resource {
  id: string;
  unit_id?: string;
  title: string;
  description?: string;
  subject: string;
  unit_code?: string;
  type: 'notes' | 'past_paper' | 'prediction' | 'ebook';
  file_url: string;
  file_size: string;
  pages?: number;
  download_count: number;
  is_premium: boolean;
  created_at: string;
  updated_at: string;
}

export interface Ebook {
  id: string;
  title: string;
  author?: string;
  price_kes: number;
  file_url: string;
  cover_image?: string;
  description?: string;
  is_bestseller?: boolean;
  download_count: number;
  created_at: string;
}

export interface Testimonial {
  id: string;
  user_id: string;
  name: string;
  course: string;
  year: string;
  quote: string;
  rating: number;
  improvement: string;
  subject: string;
  avatar_url?: string;
  is_featured: boolean;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning';
  is_read: boolean;
  created_at: string;
}

// Confessions Types
export interface Confession {
  id: string;
  content: string;
  likes: number;
  status: 'pending' | 'approved' | 'rejected';
  report_count: number;
  created_at: string;
  approved_at?: string;
  session_id: string;
}

export interface Comment {
  id: string;
  confession_id: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  report_count: number;
  created_at: string;
  session_id: string;
}

export interface StudyGroup {
  id: string;
  group_name: string;
  platform: 'WhatsApp' | 'Telegram' | 'Discord';
  invite_link: string;
  member_count: number;
  description?: string;
  unit_id?: string;
  unit_code?: string;
  status: 'pending' | 'approved' | 'rejected';
  created_by?: string;
  created_at: string;
}

export interface StudentAdvice {
  id: string;
  title: string;
  content: string;
  category: string;
  author?: string;
  likes: number;
  is_featured: boolean;
  created_at: string;
}

// ============================================
// AUTH FUNCTIONS
// ============================================

export const signUp = async (email: string, password: string, userData: {
  name: string;
  phone: string;
  reg_number?: string;
}) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: userData.name,
        phone: userData.phone,
        reg_number: userData.reg_number,
        role: 'student'
      }
    }
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
    
  return { ...user, profile };
};

// ============================================
// UNITS & RESOURCES FUNCTIONS
// ============================================

export const getUnits = async (filters?: {
  year?: number;
  semester?: number;
  isCommon?: boolean;
}) => {
  let query = supabase.from('units').select('*');
  
  if (filters?.year) {
    query = query.eq('year', filters.year);
  }
  if (filters?.semester) {
    query = query.eq('semester', filters.semester);
  }
  if (filters?.isCommon !== undefined) {
    query = query.eq('is_common', filters.isCommon);
  }
  
  const { data, error } = await query.order('unit_code', { ascending: true });
  return { data, error };
};

export const getResources = async (filters?: {
  unit_id?: string;
  subject?: string;
  type?: string;
  isPremium?: boolean;
}) => {
  let query = supabase.from('resources').select('*, units(*)');
  
  if (filters?.unit_id) {
    query = query.eq('unit_id', filters.unit_id);
  }
  if (filters?.subject) {
    query = query.eq('subject', filters.subject);
  }
  if (filters?.type) {
    query = query.eq('type', filters.type);
  }
  if (filters?.isPremium !== undefined) {
    query = query.eq('is_premium', filters.isPremium);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  return { data, error };
};

export const getUserAccessibleResources = async (userId: string) => {
  // Get user's purchases
  const { data: purchases } = await supabase
    .from('purchases')
    .select('*')
    .eq('user_id', userId)
    .eq('payment_status', 'completed');
  
  if (!purchases || purchases.length === 0) {
    return { data: [], error: null };
  }
  
  // Get accessible unit codes from purchases
  const accessibleUnitCodes: string[] = [];
  purchases.forEach(purchase => {
    if (purchase.product_type === 'single_unit' && purchase.product_id) {
      accessibleUnitCodes.push(purchase.product_id);
    } else if (['semester_bundle', 'year_bundle', 'four_year_pack'].includes(purchase.product_type)) {
      // These bundles give access to all units in that period
      accessibleUnitCodes.push('all');
    }
  });
  
  // If user has a bundle, they can access all resources
  if (accessibleUnitCodes.includes('all')) {
    const { data, error } = await supabase
      .from('resources')
      .select('*, units(*)')
      .order('created_at', { ascending: false });
    return { data, error };
  }
  
  // Otherwise, filter by unit codes
  const { data, error } = await supabase
    .from('resources')
    .select('*, units(*)')
    .in('unit_code', accessibleUnitCodes)
    .order('created_at', { ascending: false });
  
  return { data, error };
};

export const getEbooks = async () => {
  const { data, error } = await supabase
    .from('ebooks')
    .select('*')
    .order('created_at', { ascending: false });
  return { data, error };
};

export const getUserEbooks = async (userId: string) => {
  const { data: purchases } = await supabase
    .from('purchases')
    .select('*')
    .eq('user_id', userId)
    .eq('product_type', 'ebook')
    .eq('payment_status', 'completed');
  
  if (!purchases || purchases.length === 0) {
    return { data: [], error: null };
  }
  
  const ebookIds = purchases.map(p => p.product_id).filter(Boolean);
  
  const { data, error } = await supabase
    .from('ebooks')
    .select('*')
    .in('id', ebookIds);
  
  return { data, error };
};

// ============================================
// USER DASHBOARD FUNCTIONS
// ============================================

export const getUserPurchases = async (userId: string) => {
  const { data, error } = await supabase
    .from('purchases')
    .select('*')
    .eq('user_id', userId)
    .eq('payment_status', 'completed')
    .order('created_at', { ascending: false });
  return { data, error };
};

export const getUserDownloads = async (userId: string) => {
  const { data, error } = await supabase
    .from('downloads')
    .select('*, resources(*), ebooks(*)')
    .eq('user_id', userId)
    .order('downloaded_at', { ascending: false });
  return { data, error };
};

export const getUserDownloadCount = async (userId: string, resourceId: string) => {
  const { data, error } = await supabase
    .from('downloads')
    .select('download_count')
    .eq('user_id', userId)
    .eq('resource_id', resourceId)
    .single();
  
  return { count: data?.download_count || 0, error };
};

export const recordDownload = async (userId: string, resourceId: string, fileName: string) => {
  // Check if download record exists
  const { data: existing } = await supabase
    .from('downloads')
    .select('*')
    .eq('user_id', userId)
    .eq('resource_id', resourceId)
    .single();
  
  if (existing) {
    // Update existing record
    const { data, error } = await supabase
      .from('downloads')
      .update({ 
        download_count: existing.download_count + 1,
        downloaded_at: new Date().toISOString()
      })
      .eq('id', existing.id)
      .select()
      .single();
    return { data, error };
  } else {
    // Create new record
    const { data, error } = await supabase
      .from('downloads')
      .insert({
        user_id: userId,
        resource_id: resourceId,
        file_name: fileName,
        download_count: 1,
        max_downloads: 3
      })
      .select()
      .single();
    return { data, error };
  }
};

export const getNotifications = async (userId: string) => {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(20);
  return { data, error };
};

export const markNotificationAsRead = async (notificationId: string) => {
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', notificationId);
  return { error };
};

export const getTestimonials = async (options?: { featured?: boolean; limit?: number }) => {
  let query = supabase.from('testimonials').select('*');
  
  if (options?.featured) {
    query = query.eq('is_featured', true);
  }
  if (options?.limit) {
    query = query.limit(options.limit);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  return { data, error };
};

// ============================================
// CONFESSIONS FUNCTIONS
// ============================================

export const getConfessions = async (options?: { 
  status?: 'pending' | 'approved' | 'rejected';
  limit?: number;
  offset?: number;
}) => {
  let query = supabase
    .from('confessions')
    .select('*, comments:comments(count)', { count: 'exact' });
  
  if (options?.status) {
    query = query.eq('status', options.status);
  } else {
    query = query.eq('status', 'approved');
  }
  
  if (options?.limit) {
    query = query.limit(options.limit);
  }
  
  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
  }
  
  const { data, error, count } = await query.order('created_at', { ascending: false });
  return { data, error, count };
};

export const createConfession = async (content: string, sessionId: string) => {
  const { data, error } = await supabase
    .from('confessions')
    .insert({
      content,
      session_id: sessionId,
      status: 'pending',
      likes: 0,
      report_count: 0
    })
    .select()
    .single();
  return { data, error };
};

export const likeConfession = async (confessionId: string, sessionId: string) => {
  // Check if already liked
  const { data: existing } = await supabase
    .from('likes')
    .select('*')
    .eq('confession_id', confessionId)
    .eq('session_id', sessionId)
    .single();
  
  if (existing) {
    // Unlike
    await supabase.from('likes').delete().eq('id', existing.id);
    await supabase.rpc('decrement_likes', { confession_id: confessionId });
    return { liked: false };
  } else {
    // Like
    await supabase.from('likes').insert({ confession_id: confessionId, session_id: sessionId });
    await supabase.rpc('increment_likes', { confession_id: confessionId });
    return { liked: true };
  }
};

export const reportConfession = async (confessionId: string) => {
  const { error } = await supabase.rpc('increment_report_count', { 
    table_name: 'confessions',
    record_id: confessionId 
  });
  return { error };
};

// ============================================
// COMMENTS FUNCTIONS
// ============================================

export const getComments = async (confessionId: string) => {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('confession_id', confessionId)
    .eq('status', 'approved')
    .order('created_at', { ascending: true });
  return { data, error };
};

export const createComment = async (confessionId: string, content: string, sessionId: string) => {
  const { data, error } = await supabase
    .from('comments')
    .insert({
      confession_id: confessionId,
      content,
      session_id: sessionId,
      status: 'pending',
      report_count: 0
    })
    .select()
    .single();
  return { data, error };
};

// ============================================
// STUDY GROUPS FUNCTIONS
// ============================================

export const getStudyGroups = async (options?: {
  status?: 'pending' | 'approved' | 'rejected';
  unit_id?: string;
}) => {
  let query = supabase.from('study_groups').select('*');
  
  if (options?.status) {
    query = query.eq('status', options.status);
  } else {
    query = query.eq('status', 'approved');
  }
  
  if (options?.unit_id) {
    query = query.eq('unit_id', options.unit_id);
  }
  
  const { data, error } = await query.order('member_count', { ascending: false });
  return { data, error };
};

export const createStudyGroup = async (groupData: {
  group_name: string;
  platform: 'WhatsApp' | 'Telegram' | 'Discord';
  invite_link: string;
  description?: string;
  unit_id?: string;
  unit_code?: string;
  created_by?: string;
}) => {
  const { data, error } = await supabase
    .from('study_groups')
    .insert({
      ...groupData,
      status: 'pending',
      member_count: 0
    })
    .select()
    .single();
  return { data, error };
};

// ============================================
// STUDENT ADVICE FUNCTIONS
// ============================================

export const getStudentAdvice = async (options?: {
  category?: string;
  featured?: boolean;
  limit?: number;
}) => {
  let query = supabase.from('student_advice').select('*');
  
  if (options?.category) {
    query = query.eq('category', options.category);
  }
  if (options?.featured) {
    query = query.eq('is_featured', true);
  }
  if (options?.limit) {
    query = query.limit(options.limit);
  }
  
  const { data, error } = await query.order('likes', { ascending: false });
  return { data, error };
};

// ============================================
// ADMIN FUNCTIONS
// ============================================

export const getAdminStats = async () => {
  const [
    { count: totalUsers },
    { count: activeSubscriptions },
    { data: monthlyRevenue },
    { count: totalDownloads },
    { count: totalResources },
    { count: pendingConfessions },
    { count: pendingGroups }
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('purchases').select('*', { count: 'exact', head: true })
      .eq('payment_status', 'completed')
      .gte('access_expires_at', new Date().toISOString()),
    supabase.from('purchases')
      .select('amount')
      .eq('payment_status', 'completed')
      .gte('created_at', new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString()),
    supabase.from('downloads').select('*', { count: 'exact', head: true }),
    supabase.from('resources').select('*', { count: 'exact', head: true }),
    supabase.from('confessions').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('study_groups').select('*', { count: 'exact', head: true }).eq('status', 'pending')
  ]);
  
  const revenue = monthlyRevenue?.reduce((sum, p) => sum + p.amount, 0) || 0;
  
  return {
    totalUsers: totalUsers || 0,
    activeSubscriptions: activeSubscriptions || 0,
    monthlyRevenue: revenue,
    totalDownloads: totalDownloads || 0,
    totalResources: totalResources || 0,
    pendingConfessions: pendingConfessions || 0,
    pendingGroups: pendingGroups || 0
  };
};

export const getAllUsers = async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*, purchases(*)')
    .order('created_at', { ascending: false });
  return { data, error };
};

export const getAllTransactions = async () => {
  const { data, error } = await supabase
    .from('purchases')
    .select('*, profiles(name, email, phone)')
    .order('created_at', { ascending: false });
  return { data, error };
};

export const uploadResource = async (resource: Partial<Resource>) => {
  const { data, error } = await supabase
    .from('resources')
    .insert(resource)
    .select()
    .single();
  return { data, error };
};

export const deleteResource = async (resourceId: string) => {
  const { error } = await supabase
    .from('resources')
    .delete()
    .eq('id', resourceId);
  return { error };
};

export const approveConfession = async (confessionId: string, approve: boolean) => {
  const { data, error } = await supabase
    .from('confessions')
    .update({ 
      status: approve ? 'approved' : 'rejected',
      approved_at: approve ? new Date().toISOString() : null
    })
    .eq('id', confessionId)
    .select()
    .single();
  return { data, error };
};

export const approveStudyGroup = async (groupId: string, approve: boolean) => {
  const { data, error } = await supabase
    .from('study_groups')
    .update({ status: approve ? 'approved' : 'rejected' })
    .eq('id', groupId)
    .select()
    .single();
  return { data, error };
};

export const getPendingContent = async () => {
  const [
    { data: pendingConfessions },
    { data: pendingGroups },
    { data: reportedConfessions },
    { data: reportedComments }
  ] = await Promise.all([
    supabase.from('confessions').select('*').eq('status', 'pending').order('created_at', { ascending: false }),
    supabase.from('study_groups').select('*').eq('status', 'pending').order('created_at', { ascending: false }),
    supabase.from('confessions').select('*').gte('report_count', 3).order('report_count', { ascending: false }),
    supabase.from('comments').select('*').gte('report_count', 3).order('report_count', { ascending: false })
  ]);
  
  return {
    pendingConfessions: pendingConfessions || [],
    pendingGroups: pendingGroups || [],
    reportedConfessions: reportedConfessions || [],
    reportedComments: reportedComments || []
  };
};

// ============================================
// PAYMENT FUNCTIONS
// ============================================

export const createPayment = async (paymentData: {
  user_id: string;
  product_type: string;
  product_name: string;
  product_id?: string;
  amount: number;
  payment_method: 'mpesa' | 'stripe';
}) => {
  const { data, error } = await supabase
    .from('purchases')
    .insert({
      ...paymentData,
      currency: 'KES',
      payment_status: 'pending'
    })
    .select()
    .single();
  return { data, error };
};

export const confirmPayment = async (purchaseId: string, transactionId: string) => {
  // Calculate expiry date based on product type
  const { data: purchase } = await supabase
    .from('purchases')
    .select('*')
    .eq('id', purchaseId)
    .single();
  
  if (!purchase) return { error: new Error('Purchase not found') };
  
  let expiresAt = null;
  const now = new Date();
  
  switch (purchase.product_type) {
    case 'single_unit':
      expiresAt = new Date(now.setMonth(now.getMonth() + 6)).toISOString();
      break;
    case 'semester_bundle':
      expiresAt = new Date(now.setMonth(now.getMonth() + 4)).toISOString();
      break;
    case 'year_bundle':
      expiresAt = new Date(now.setFullYear(now.getFullYear() + 1)).toISOString();
      break;
    case 'four_year_pack':
      expiresAt = new Date(now.setFullYear(now.getFullYear() + 4)).toISOString();
      break;
    case 'ebook':
      expiresAt = null; // Ebooks don't expire
      break;
  }
  
  const { data, error } = await supabase
    .from('purchases')
    .update({
      payment_status: 'completed',
      transaction_id: transactionId,
      access_expires_at: expiresAt
    })
    .eq('id', purchaseId)
    .select()
    .single();
  
  return { data, error };
};

// ============================================
// REAL-TIME SUBSCRIPTIONS
// ============================================

export const subscribeToNotifications = (userId: string, callback: (payload: any) => void) => {
  return supabase
    .channel(`notifications:${userId}`)
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'notifications',
      filter: `user_id=eq.${userId}`
    }, callback)
    .subscribe();
};

export const subscribeToResources = (callback: (payload: any) => void) => {
  return supabase
    .channel('resources')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'resources'
    }, callback)
    .subscribe();
};

export const subscribeToConfessions = (callback: (payload: any) => void) => {
  return supabase
    .channel('confessions')
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'confessions',
      filter: `status=eq.approved`
    }, callback)
    .subscribe();
};
