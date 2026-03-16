import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, MessageCircle, Flag, Send, Shield, Sparkles, 
  TrendingUp, Clock, Eye, MoreHorizontal, X, CheckCircle,
  AlertTriangle, Ghost, Flame
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { 
  getConfessions, createConfession, likeConfession, reportConfession,
  getComments, createComment, type Confession 
} from '@/lib/supabase';

interface ConfessionWithComments extends Confession {
  comments_count?: number;
  userLiked?: boolean;
}

interface Comment {
  id: string;
  content: string;
  created_at: string;
}

export default function Confessions() {
  const [confessions, setConfessions] = useState<ConfessionWithComments[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newConfession, setNewConfession] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedConfession, setSelectedConfession] = useState<ConfessionWithComments | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'popular'>('newest');
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 10;

  // Get or create session ID for anonymous tracking
  useEffect(() => {
    let sid = localStorage.getItem('confession_session_id');
    if (!sid) {
      sid = 'sess_' + Math.random().toString(36).substring(2, 15);
      localStorage.setItem('confession_session_id', sid);
    }
    setSessionId(sid);
  }, []);

  const fetchConfessions = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, count } = await getConfessions({
        status: 'approved',
        limit: PAGE_SIZE,
        offset: page * PAGE_SIZE
      });
      
      if (data) {
        setConfessions(prev => page === 0 ? data : [...prev, ...data]);
        setTotalCount(count || 0);
      }
    } catch (error) {
      console.error('Error fetching confessions:', error);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchConfessions();
  }, [fetchConfessions]);

  const handleSubmitConfession = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newConfession.trim()) {
      toast.error('Please write something before submitting');
      return;
    }
    
    if (newConfession.length < 10) {
      toast.error('Confession must be at least 10 characters');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const { data, error } = await createConfession(newConfession.trim(), sessionId);
      
      if (error) throw error;
      
      toast.success('Confession submitted! It will appear after approval.');
      setNewConfession('');
    } catch (error: any) {
      toast.error('Failed to submit confession: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = async (confessionId: string) => {
    try {
      const { liked } = await likeConfession(confessionId, sessionId);
      
      setConfessions(prev => prev.map(c => {
        if (c.id === confessionId) {
          return {
            ...c,
            likes: liked ? c.likes + 1 : Math.max(0, c.likes - 1),
            userLiked: liked
          };
        }
        return c;
      }));
      
      if (liked) {
        toast.success('Liked! ❤️');
      }
    } catch (error) {
      toast.error('Failed to like confession');
    }
  };

  const handleReport = async (confessionId: string) => {
    if (!confirm('Are you sure you want to report this confession?')) return;
    
    try {
      await reportConfession(confessionId);
      toast.success('Reported. Thank you for keeping our community safe.');
    } catch (error) {
      toast.error('Failed to report');
    }
  };

  const openComments = async (confession: ConfessionWithComments) => {
    setSelectedConfession(confession);
    try {
      const { data } = await getComments(confession.id);
      if (data) setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim() || !selectedConfession) return;
    
    try {
      const { data, error } = await createComment(selectedConfession.id, newComment.trim(), sessionId);
      
      if (error) throw error;
      
      toast.success('Comment submitted for approval');
      setNewComment('');
    } catch (error: any) {
      toast.error('Failed to submit comment: ' + error.message);
    }
  };

  const sortedConfessions = [...confessions].sort((a, b) => {
    if (sortBy === 'popular') {
      return b.likes - a.likes;
    }
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const formatTimeAgo = (date: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-[#0B0F1C]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FF2D8F]/10 to-transparent" />
        <div className="max-w-4xl mx-auto px-4 py-12 relative">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-[#FF2D8F]/10 border border-[#FF2D8F]/30 rounded-full px-4 py-2 mb-6">
              <Ghost className="w-4 h-4 text-[#FF2D8F]" />
              <span className="text-[#FF2D8F] text-sm font-medium">Anonymous Confessions</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Campus <span className="text-[#FF2D8F]">Confessions</span>
            </h1>
            <p className="text-[#A9B1C7] text-lg max-w-2xl mx-auto">
              Share your thoughts anonymously. Read what others are thinking. 
              No judgment, just a safe space to express yourself.
            </p>
            
            {/* Stats */}
            <div className="flex items-center justify-center space-x-8 mt-8">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{totalCount.toLocaleString()}</p>
                <p className="text-sm text-[#A9B1C7]">Confessions</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <p className="text-2xl font-bold text-white">
                  {confessions.reduce((acc, c) => acc + c.likes, 0).toLocaleString()}
                </p>
                <p className="text-sm text-[#A9B1C7]">Total Likes</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <p className="text-2xl font-bold text-white">100%</p>
                <p className="text-sm text-[#A9B1C7]">Anonymous</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-12">
        {/* Submit Confession */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-[#FF2D8F] to-[#ff6b9d] rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white font-semibold">Share Your Confession</h2>
              <p className="text-sm text-[#A9B1C7]">Completely anonymous • No tracking</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmitConfession}>
            <textarea
              value={newConfession}
              onChange={(e) => setNewConfession(e.target.value)}
              placeholder="What's on your mind? Share your thoughts, secrets, or stories..."
              rows={4}
              maxLength={1000}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#A9B1C7] resize-none focus:outline-none focus:border-[#FF2D8F]/50 transition-colors"
            />
            <div className="flex items-center justify-between mt-3">
              <p className="text-sm text-[#A9B1C7]">{newConfession.length}/1000</p>
              <Button
                type="submit"
                disabled={isSubmitting || newConfession.length < 10}
                className="bg-[#FF2D8F] hover:bg-[#FF2D8F]/90 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Submitting...</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-2">
                    <Send className="w-4 h-4" />
                    <span>Post Anonymously</span>
                  </span>
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSortBy('newest')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm transition-colors ${
                sortBy === 'newest' 
                  ? 'bg-[#FF2D8F] text-white' 
                  : 'bg-white/5 text-[#A9B1C7] hover:bg-white/10'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Newest</span>
            </button>
            <button
              onClick={() => setSortBy('popular')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm transition-colors ${
                sortBy === 'popular' 
                  ? 'bg-[#FF2D8F] text-white' 
                  : 'bg-white/5 text-[#A9B1C7] hover:bg-white/10'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Most Liked</span>
            </button>
          </div>
          <p className="text-sm text-[#A9B1C7]">Showing {confessions.length} of {totalCount}</p>
        </div>

        {/* Confessions List */}
        <div className="space-y-4">
          {isLoading && page === 0 ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-12 h-12 border-4 border-[#FF2D8F]/30 border-t-[#FF2D8F] rounded-full animate-spin" />
            </div>
          ) : sortedConfessions.length === 0 ? (
            <div className="text-center py-12">
              <Ghost className="w-16 h-16 text-[#A9B1C7] mx-auto mb-4" />
              <h3 className="text-white text-xl font-semibold mb-2">No confessions yet</h3>
              <p className="text-[#A9B1C7]">Be the first to share your thoughts!</p>
            </div>
          ) : (
            sortedConfessions.map((confession) => (
              <div 
                key={confession.id} 
                className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/[0.07] transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Ghost className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Anonymous</p>
                      <p className="text-xs text-[#A9B1C7]">{formatTimeAgo(confession.created_at)}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleReport(confession.id)}
                    className="text-[#A9B1C7] hover:text-red-400 transition-colors"
                  >
                    <Flag className="w-4 h-4" />
                  </button>
                </div>
                
                <p className="text-white leading-relaxed mb-4 whitespace-pre-wrap">
                  {confession.content}
                </p>
                
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleLike(confession.id)}
                    className={`flex items-center space-x-2 px-3 py-1.5 rounded-full transition-colors ${
                      confession.userLiked 
                        ? 'bg-red-500/20 text-red-400' 
                        : 'bg-white/5 text-[#A9B1C7] hover:bg-white/10'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${confession.userLiked ? 'fill-current' : ''}`} />
                    <span className="text-sm">{confession.likes}</span>
                  </button>
                  
                  <button
                    onClick={() => openComments(confession)}
                    className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/5 text-[#A9B1C7] hover:bg-white/10 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">{confession.comments_count || 0}</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Load More */}
        {confessions.length < totalCount && (
          <div className="text-center mt-8">
            <Button
              onClick={() => setPage(p => p + 1)}
              disabled={isLoading}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              {isLoading ? 'Loading...' : 'Load More Confessions'}
            </Button>
          </div>
        )}
      </div>

      {/* Comments Modal */}
      {selectedConfession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0f1420] border border-white/10 rounded-2xl w-full max-w-lg max-h-[80vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h3 className="text-white font-semibold">Comments</h3>
              <button 
                onClick={() => setSelectedConfession(null)}
                className="text-[#A9B1C7] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Original Confession */}
            <div className="p-4 bg-white/5 border-b border-white/10">
              <p className="text-white text-sm">{selectedConfession.content}</p>
            </div>
            
            {/* Comments List */}
            <div className="p-4 max-h-64 overflow-y-auto space-y-3">
              {comments.length === 0 ? (
                <p className="text-center text-[#A9B1C7] py-4">No comments yet. Be the first!</p>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="bg-white/5 rounded-xl p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Ghost className="w-3 h-3 text-[#A9B1C7]" />
                      <span className="text-xs text-[#A9B1C7]">Anonymous</span>
                      <span className="text-xs text-[#A9B1C7]">•</span>
                      <span className="text-xs text-[#A9B1C7]">{formatTimeAgo(comment.created_at)}</span>
                    </div>
                    <p className="text-white text-sm">{comment.content}</p>
                  </div>
                ))
              )}
            </div>
            
            {/* Add Comment */}
            <div className="p-4 border-t border-white/10">
              <form onSubmit={handleSubmitComment} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-white text-sm placeholder-[#A9B1C7] focus:outline-none focus:border-[#FF2D8F]/50"
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={!newComment.trim()}
                  className="bg-[#FF2D8F] hover:bg-[#FF2D8F]/90 rounded-full w-10 h-10 p-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Guidelines */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-2xl p-6">
          <div className="flex items-start space-x-3">
            <Shield className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-white font-semibold mb-2">Community Guidelines</h3>
              <ul className="text-sm text-[#A9B1C7] space-y-1">
                <li>• Be respectful - no hate speech, bullying, or harassment</li>
                <li>• Keep it anonymous - don't reveal personal information</li>
                <li>• No spam or promotional content</li>
                <li>• All confessions are moderated before appearing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
