import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, FileText, Target, Download, Search, Filter, ChevronRight, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

const resources = [
  {
    id: 1,
    title: 'Calculus I - Complete Notes',
    subject: 'Mathematics',
    type: 'notes',
    size: '2.4 MB',
    pages: 45,
    downloads: 1245,
    date: '2026-02-15',
    preview: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    title: 'Organic Chemistry Past Paper 2024',
    subject: 'Chemistry',
    type: 'papers',
    size: '1.8 MB',
    pages: 12,
    downloads: 987,
    date: '2026-02-14',
    preview: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop'
  },
  {
    id: 3,
    title: 'Physics Exam Predictions 2026',
    subject: 'Physics',
    type: 'predictions',
    size: '856 KB',
    pages: 8,
    downloads: 2156,
    date: '2026-02-10',
    preview: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&h=300&fit=crop'
  },
  {
    id: 4,
    title: 'Cell Biology Summary Notes',
    subject: 'Biology',
    type: 'notes',
    size: '3.2 MB',
    pages: 32,
    downloads: 876,
    date: '2026-02-08',
    preview: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=400&h=300&fit=crop'
  },
  {
    id: 5,
    title: 'Linear Algebra - Full Notes',
    subject: 'Mathematics',
    type: 'notes',
    size: '4.1 MB',
    pages: 58,
    downloads: 2341,
    date: '2026-02-05',
    preview: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=300&fit=crop'
  },
  {
    id: 6,
    title: 'Chemistry Exam Predictions 2026',
    subject: 'Chemistry',
    type: 'predictions',
    size: '1.2 MB',
    pages: 10,
    downloads: 1876,
    date: '2026-02-03',
    preview: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=400&h=300&fit=crop'
  }
];

const filters = [
  { id: 'all', name: 'All Resources', icon: BookOpen },
  { id: 'notes', name: 'Notes', icon: BookOpen },
  { id: 'papers', name: 'Past Papers', icon: FileText },
  { id: 'predictions', name: 'Predictions', icon: Target }
];

export default function Resources() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState(searchParams.get('type') || 'all');
  const { isAuthenticated } = useAuth();
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      sectionsRef.current.forEach((section) => {
        if (section) {
          gsap.fromTo(
            section.querySelectorAll('.animate-in'),
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const filteredResources = resources.filter(resource => {
    const matchesFilter = activeFilter === 'all' || resource.type === activeFilter;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleDownload = (resourceId: number) => {
    if (!isAuthenticated) {
      toast.error('Please sign in to download resources');
      return;
    }
    toast.success('Download started!');
  };

  return (
    <div className="bg-[#0B0F1C] min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="bg-[#FF2D8F]/10 text-[#FF2D8F] border-[#FF2D8F]/20 mb-4">
              RESOURCES
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Study Resources
            </h1>
            <p className="text-lg text-[#A9B1C7]">
              Access comprehensive notes, past papers, and exam predictions for all your subjects.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 border-y border-white/10">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A9B1C7]" />
              <Input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 bg-white/5 border-white/10 text-white placeholder:text-[#A9B1C7]/50 focus:border-[#FF2D8F]"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === filter.id
                      ? 'bg-[#FF2D8F] text-white'
                      : 'bg-white/5 text-[#A9B1C7] hover:bg-white/10'
                  }`}
                >
                  <filter.icon className="w-4 h-4" />
                  <span>{filter.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section ref={(el) => { sectionsRef.current[0] = el; }} className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          {filteredResources.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource, index) => (
                <div
                  key={resource.id}
                  className="animate-in bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden group hover:border-[#FF2D8F]/30 transition-all"
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img
                      src={resource.preview}
                      alt={resource.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1C] via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-[#FF2D8F] text-white border-0 capitalize">
                        {resource.type}
                      </Badge>
                    </div>
                    {!isAuthenticated && (
                      <div className="absolute inset-0 bg-[#0B0F1C]/80 flex items-center justify-center">
                        <div className="text-center">
                          <Lock className="w-8 h-8 text-[#FF2D8F] mx-auto mb-2" />
                          <p className="text-white text-sm">Sign in to access</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="outline" className="border-white/20 text-[#A9B1C7]">
                        {resource.subject}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{resource.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-[#A9B1C7] mb-4">
                      <span>{resource.pages} pages</span>
                      <span>{resource.size}</span>
                      <span>{resource.downloads} downloads</span>
                    </div>
                    <Button
                      onClick={() => handleDownload(resource.id)}
                      className="w-full bg-[#FF2D8F] hover:bg-[#FF2D8F]/90 text-white"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-[#A9B1C7]/30 mx-auto mb-4" />
              <p className="text-[#A9B1C7]">No resources found</p>
              <p className="text-[#A9B1C7]/60 text-sm mt-2">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      {!isAuthenticated && (
        <section className="py-16 lg:py-24">
          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="bg-gradient-to-r from-[#FF2D8F] to-[#ff6b9d] rounded-3xl p-8 lg:p-12 text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                Get full access to all resources
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto mb-8">
                Sign up today and unlock 500+ study resources, exam predictions, and more.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup">
                  <Button size="lg" className="bg-white text-[#FF2D8F] hover:bg-white/90">
                    Get Started
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
