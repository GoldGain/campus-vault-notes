import { useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, FileText, Target, ChevronRight, Download, Clock, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const subjects = [
  {
    id: 'mathematics',
    name: 'Mathematics',
    description: 'Pure & applied mathematics, step-by-step solutions for all topics.',
    longDescription: 'Master calculus, algebra, geometry, and statistics with our comprehensive notes and practice problems.',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=500&fit=crop',
    units: 8,
    resources: 124,
    students: 2400,
    color: 'from-blue-500 to-cyan-500',
    topics: ['Calculus I & II', 'Linear Algebra', 'Differential Equations', 'Probability & Statistics', 'Discrete Mathematics']
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    description: 'Organic, inorganic, and physical chemistry with lab preparation.',
    longDescription: 'From atomic structure to complex organic reactions, we cover it all with detailed explanations.',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=500&fit=crop',
    units: 7,
    resources: 98,
    students: 1800,
    color: 'from-green-500 to-emerald-500',
    topics: ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Analytical Chemistry', 'Biochemistry']
  },
  {
    id: 'biology',
    name: 'Biology',
    description: 'Cell biology, ecology, genetics, and human physiology.',
    longDescription: 'Explore the living world from microscopic cells to complex ecosystems.',
    image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&h=500&fit=crop',
    units: 6,
    resources: 87,
    students: 2100,
    color: 'from-purple-500 to-pink-500',
    topics: ['Cell Biology', 'Genetics', 'Ecology', 'Human Physiology', 'Microbiology']
  },
  {
    id: 'physics',
    name: 'Physics',
    description: 'Mechanics, electricity, magnetism, and modern physics.',
    longDescription: 'Understand the fundamental laws of nature with clear explanations and solved problems.',
    image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&h=500&fit=crop',
    units: 7,
    resources: 112,
    students: 1600,
    color: 'from-orange-500 to-red-500',
    topics: ['Classical Mechanics', 'Electromagnetism', 'Thermodynamics', 'Quantum Physics', 'Optics']
  }
];

const educationUnits = [
  {
    code: 'EDU 101',
    name: 'Introduction to Education',
    year: 'Year 1',
    semester: 'Semester 1'
  },
  {
    code: 'EDU 102',
    name: 'Psychology of Education',
    year: 'Year 1',
    semester: 'Semester 2'
  },
  {
    code: 'EDU 201',
    name: 'Curriculum Development',
    year: 'Year 2',
    semester: 'Semester 1'
  },
  {
    code: 'EDU 202',
    name: 'Teaching Methods',
    year: 'Year 2',
    semester: 'Semester 2'
  },
  {
    code: 'EDU 301',
    name: 'Educational Administration',
    year: 'Year 3',
    semester: 'Semester 1'
  },
  {
    code: 'EDU 302',
    name: 'Special Needs Education',
    year: 'Year 3',
    semester: 'Semester 2'
  },
  {
    code: 'EDU 401',
    name: 'Educational Research',
    year: 'Year 4',
    semester: 'Semester 1'
  },
  {
    code: 'EDU 402',
    name: 'Professional Ethics in Education',
    year: 'Year 4',
    semester: 'Semester 2'
  }
];

export default function Subjects() {
  const [searchParams] = useSearchParams();
  const highlightedSubject = searchParams.get('subject');
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

  return (
    <div className="bg-[#0B0F1C] min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-3xl">
            <Badge className="bg-[#FF2D8F]/10 text-[#FF2D8F] border-[#FF2D8F]/20 mb-4">
              ALL SUBJECTS
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Complete Subject Coverage
            </h1>
            <p className="text-lg text-[#A9B1C7] max-w-2xl">
              Access comprehensive revision materials for all Bachelor of Education Science subjects at MUT. 
              From first year to final year, we have got you covered.
            </p>
          </div>
        </div>
      </section>

      {/* Core Subjects */}
      <section ref={(el) => { sectionsRef.current[0] = el; }} className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="mb-12">
            <h2 className="animate-in text-2xl lg:text-3xl font-bold text-white mb-4">
              Core Science Subjects
            </h2>
            <p className="animate-in text-[#A9B1C7]">
              Master these fundamental subjects with our comprehensive study materials.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {subjects.map((subject, index) => (
              <div
                key={subject.id}
                id={subject.id}
                className={`animate-in group bg-white/5 backdrop-blur-sm border ${
                  highlightedSubject === subject.id.toLowerCase()
                    ? 'border-[#FF2D8F] ring-2 ring-[#FF2D8F]/20'
                    : 'border-white/10'
                } rounded-3xl overflow-hidden hover:border-[#FF2D8F]/30 transition-all duration-300`}
              >
                <div className="aspect-[16/9] relative overflow-hidden">
                  <img
                    src={subject.image}
                    alt={subject.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1C] via-[#0B0F1C]/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-1">{subject.name}</h3>
                    <p className="text-[#A9B1C7] text-sm">{subject.description}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-6 mb-4">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4 text-[#FF2D8F]" />
                      <span className="text-sm text-[#A9B1C7]">{subject.units} Units</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-[#FF2D8F]" />
                      <span className="text-sm text-[#A9B1C7]">{subject.resources} Resources</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-[#FF2D8F]" />
                      <span className="text-sm text-[#A9B1C7]">{subject.students}+ Students</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-[#A9B1C7] mb-3">Key Topics:</p>
                    <div className="flex flex-wrap gap-2">
                      {subject.topics.map((topic, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-white/5 rounded-full text-xs text-white"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    to={`/resources?subject=${subject.id}`}
                    className="flex items-center text-[#FF2D8F] font-medium hover:underline"
                  >
                    Explore resources
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Units */}
      <section ref={(el) => { sectionsRef.current[1] = el; }} className="py-16 lg:py-24 bg-[#F6F7FB]">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="mb-12">
            <h2 className="animate-in text-2xl lg:text-3xl font-bold text-[#0B0F1C] mb-4">
              Education Units
            </h2>
            <p className="animate-in text-gray-600">
              Professional education courses for Bachelor of Education Science students.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {educationUnits.map((unit, index) => (
              <div
                key={unit.code}
                className="animate-in bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#FF2D8F]/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline" className="text-[#FF2D8F] border-[#FF2D8F]/30">
                    {unit.code}
                  </Badge>
                  <span className="text-xs text-gray-500">{unit.year}</span>
                </div>
                <h3 className="font-semibold text-[#0B0F1C] mb-2">{unit.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{unit.semester}</p>
                <Link
                  to={`/resources?unit=${unit.code}`}
                  className="flex items-center text-sm text-[#FF2D8F] font-medium"
                >
                  View materials
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Overview */}
      <section ref={(el) => { sectionsRef.current[2] = el; }} className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="animate-in text-2xl lg:text-3xl font-bold text-white mb-4">
              What's Included
            </h2>
            <p className="animate-in text-[#A9B1C7]">
              Every subject comes with comprehensive resources to help you succeed.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: BookOpen,
                title: 'Subject Notes',
                description: 'Comprehensive, semester-ready notes that match the MUT syllabus perfectly.',
                features: ['Structured by topic', 'Easy to review', 'Printable PDFs']
              },
              {
                icon: FileText,
                title: 'Past Papers',
                description: 'Practice with real exams from previous years with detailed solutions.',
                features: ['5+ years of papers', 'Step-by-step solutions', 'Marking schemes']
              },
              {
                icon: Target,
                title: 'Exam Predictions',
                description: 'High-probability topics and questions based on past patterns.',
                features: ['Updated each semester', 'Expert analysis', 'Topic weighting']
              }
            ].map((resource, index) => (
              <div
                key={index}
                className="animate-in bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#FF2D8F]/10 flex items-center justify-center mb-6">
                  <resource.icon className="w-7 h-7 text-[#FF2D8F]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{resource.title}</h3>
                <p className="text-[#A9B1C7] mb-6">{resource.description}</p>
                <ul className="space-y-2">
                  {resource.features.map((feature, i) => (
                    <li key={i} className="flex items-center space-x-2 text-sm text-[#A9B1C7]">
                      <Download className="w-4 h-4 text-[#FF2D8F]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="bg-gradient-to-r from-[#FF2D8F] to-[#ff6b9d] rounded-3xl p-8 lg:p-12 text-center">
            <h2 className="text-2xl lg:text-4xl font-bold text-white mb-4">
              Ready to master your subjects?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Get instant access to all subject materials. Choose a plan that works for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/pricing">
                <Button size="lg" className="bg-white text-[#FF2D8F] hover:bg-white/90 px-8">
                  View Pricing
                </Button>
              </Link>
              <Link to="/resources">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                  Browse Resources
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
