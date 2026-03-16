import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, MessageCircle, ExternalLink, Plus, Search, Filter,
  CheckCircle, Clock, GraduationCap, BookOpen, Hash, Copy,
  Send, X, AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { getStudyGroups, createStudyGroup, getUnits, type StudyGroup } from '@/lib/supabase';

interface GroupWithUnit extends StudyGroup {
  unit?: {
    unit_code: string;
    unit_name: string;
  };
}

export default function StudyGroups() {
  const [groups, setGroups] = useState<GroupWithUnit[]>([]);
  const [units, setUnits] = useState<{ id: string; unit_code: string; unit_name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  
  // Submit form
  const [submitForm, setSubmitForm] = useState({
    group_name: '',
    platform: 'WhatsApp' as 'WhatsApp' | 'Telegram' | 'Discord',
    invite_link: '',
    description: '',
    unit_id: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchGroups();
    fetchUnits();
  }, []);

  const fetchGroups = async () => {
    setIsLoading(true);
    try {
      const { data } = await getStudyGroups({ status: 'approved' });
      if (data) {
        // Fetch unit details for each group
        const groupsWithUnits = await Promise.all(
          data.map(async (group) => {
            if (group.unit_id) {
              const { data: unitData } = await getUnits();
              const unit = unitData?.find(u => u.id === group.unit_id);
              return { ...group, unit };
            }
            return group;
          })
        );
        setGroups(groupsWithUnits);
      }
    } catch (error) {
      console.error('Error fetching groups:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUnits = async () => {
    try {
      const { data } = await getUnits();
      if (data) setUnits(data);
    } catch (error) {
      console.error('Error fetching units:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!submitForm.group_name || !submitForm.invite_link) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const selectedUnit = units.find(u => u.id === submitForm.unit_id);
      
      const { data, error } = await createStudyGroup({
        group_name: submitForm.group_name,
        platform: submitForm.platform,
        invite_link: submitForm.invite_link,
        description: submitForm.description,
        unit_id: submitForm.unit_id || undefined,
        unit_code: selectedUnit?.unit_code
      });
      
      if (error) throw error;
      
      toast.success('Study group submitted for approval!');
      setShowSubmitModal(false);
      setSubmitForm({
        group_name: '',
        platform: 'WhatsApp',
        invite_link: '',
        description: '',
        unit_id: ''
      });
    } catch (error: any) {
      toast.error('Failed to submit: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast.success('Link copied to clipboard!');
  };

  const filteredGroups = groups.filter(group => {
    const matchesSearch = 
      group.group_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.unit_code?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPlatform = selectedPlatform === 'all' || group.platform === selectedPlatform;
    
    return matchesSearch && matchesPlatform;
  });

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'WhatsApp':
        return <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center"><MessageCircle className="w-5 h-5 text-white" /></div>;
      case 'Telegram':
        return <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center"><Send className="w-5 h-5 text-white" /></div>;
      case 'Discord':
        return <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center"><Users className="w-5 h-5 text-white" /></div>;
      default:
        return <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center"><MessageCircle className="w-5 h-5 text-white" /></div>;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'WhatsApp': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Telegram': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Discord': return 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F1C]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FF2D8F]/10 to-transparent" />
        <div className="max-w-6xl mx-auto px-4 py-12 relative">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-[#FF2D8F]/10 border border-[#FF2D8F]/30 rounded-full px-4 py-2 mb-6">
              <Users className="w-4 h-4 text-[#FF2D8F]" />
              <span className="text-[#FF2D8F] text-sm font-medium">Study Together</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Study <span className="text-[#FF2D8F]">Groups</span>
            </h1>
            <p className="text-[#A9B1C7] text-lg max-w-2xl mx-auto">
              Connect with classmates, join study groups, and ace your exams together. 
              Find groups for your units on WhatsApp, Telegram, or Discord.
            </p>
            
            {/* Stats */}
            <div className="flex items-center justify-center space-x-8 mt-8">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{groups.length}</p>
                <p className="text-sm text-[#A9B1C7]">Active Groups</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <p className="text-2xl font-bold text-white">
                  {groups.reduce((acc, g) => acc + (g.member_count || 0), 0).toLocaleString()}
                </p>
                <p className="text-sm text-[#A9B1C7]">Total Members</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{units.length}</p>
                <p className="text-sm text-[#A9B1C7]">Units Covered</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-12">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A9B1C7]" />
            <Input
              placeholder="Search groups by name or unit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white w-full"
            />
          </div>
          
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <div className="flex items-center space-x-2">
              {['all', 'WhatsApp', 'Telegram', 'Discord'].map((platform) => (
                <button
                  key={platform}
                  onClick={() => setSelectedPlatform(platform)}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    selectedPlatform === platform 
                      ? 'bg-[#FF2D8F] text-white' 
                      : 'bg-white/5 text-[#A9B1C7] hover:bg-white/10'
                  }`}
                >
                  {platform === 'all' ? 'All' : platform}
                </button>
              ))}
            </div>
            
            <Button 
              onClick={() => setShowSubmitModal(true)}
              className="bg-[#FF2D8F] hover:bg-[#FF2D8F]/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Group
            </Button>
          </div>
        </div>

        {/* Groups Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-[#FF2D8F]/30 border-t-[#FF2D8F] rounded-full animate-spin" />
          </div>
        ) : filteredGroups.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-[#A9B1C7] mx-auto mb-4" />
            <h3 className="text-white text-xl font-semibold mb-2">No groups found</h3>
            <p className="text-[#A9B1C7] mb-4">Be the first to add a study group!</p>
            <Button onClick={() => setShowSubmitModal(true)} className="bg-[#FF2D8F]">
              <Plus className="w-4 h-4 mr-2" />
              Add Study Group
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGroups.map((group) => (
              <div 
                key={group.id} 
                className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/[0.07] hover:border-[#FF2D8F]/30 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  {getPlatformIcon(group.platform)}
                  <Badge className={getPlatformColor(group.platform)}>
                    {group.platform}
                  </Badge>
                </div>
                
                <h3 className="text-white font-semibold text-lg mb-2">{group.group_name}</h3>
                
                {group.unit_code && (
                  <div className="flex items-center space-x-2 mb-3">
                    <BookOpen className="w-4 h-4 text-[#A9B1C7]" />
                    <span className="text-sm text-[#A9B1C7]">{group.unit_code}</span>
                  </div>
                )}
                
                {group.description && (
                  <p className="text-sm text-[#A9B1C7] mb-4 line-clamp-2">{group.description}</p>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-[#A9B1C7]">
                    <Users className="w-4 h-4" />
                    <span>{group.member_count || 0} members</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => copyLink(group.invite_link)}
                      className="p-2 bg-white/5 rounded-lg text-[#A9B1C7] hover:bg-white/10 hover:text-white transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <a
                      href={group.invite_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 px-3 py-2 bg-[#FF2D8F] hover:bg-[#FF2D8F]/90 rounded-lg text-white text-sm transition-colors"
                    >
                      <span>Join</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Info Card */}
        <div className="mt-12 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">How It Works</h3>
              <ul className="text-sm text-[#A9B1C7] space-y-2">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Browse study groups by unit or platform</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Click "Join" to open the group link directly</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Add your own group - it will be reviewed before appearing</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>All groups are verified to ensure they're active and relevant</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0f1420] border border-white/10 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h3 className="text-white font-semibold">Add Study Group</h3>
              <button 
                onClick={() => setShowSubmitModal(false)}
                className="text-[#A9B1C7] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="text-white text-sm mb-2 block">Group Name *</label>
                <Input
                  value={submitForm.group_name}
                  onChange={(e) => setSubmitForm({...submitForm, group_name: e.target.value})}
                  placeholder="e.g., Chemistry 301 Study Squad"
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              
              <div>
                <label className="text-white text-sm mb-2 block">Platform *</label>
                <div className="flex space-x-2">
                  {(['WhatsApp', 'Telegram', 'Discord'] as const).map((platform) => (
                    <button
                      key={platform}
                      type="button"
                      onClick={() => setSubmitForm({...submitForm, platform })}
                      className={`flex-1 py-2 rounded-lg text-sm transition-colors ${
                        submitForm.platform === platform 
                          ? 'bg-[#FF2D8F] text-white' 
                          : 'bg-white/5 text-[#A9B1C7] hover:bg-white/10'
                      }`}
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-white text-sm mb-2 block">Invite Link *</label>
                <Input
                  value={submitForm.invite_link}
                  onChange={(e) => setSubmitForm({...submitForm, invite_link: e.target.value})}
                  placeholder="https://chat.whatsapp.com/..."
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              
              <div>
                <label className="text-white text-sm mb-2 block">Related Unit (Optional)</label>
                <select
                  value={submitForm.unit_id}
                  onChange={(e) => setSubmitForm({...submitForm, unit_id: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-3 py-2"
                >
                  <option value="" className="bg-[#0B0F1C]">Select a unit...</option>
                  {units.map((unit) => (
                    <option key={unit.id} value={unit.id} className="bg-[#0B0F1C]">
                      {unit.unit_code} - {unit.unit_name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="text-white text-sm mb-2 block">Description (Optional)</label>
                <textarea
                  value={submitForm.description}
                  onChange={(e) => setSubmitForm({...submitForm, description: e.target.value})}
                  placeholder="What topics does this group cover?"
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-[#A9B1C7] resize-none"
                />
              </div>
              
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                <p className="text-sm text-yellow-400 flex items-start space-x-2">
                  <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Your group will be reviewed before appearing publicly. This usually takes 24 hours.</span>
                </p>
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#FF2D8F] hover:bg-[#FF2D8F]/90"
              >
                {isSubmitting ? 'Submitting...' : 'Submit for Review'}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
