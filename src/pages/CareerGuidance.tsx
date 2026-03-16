import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, GraduationCap, Users, TrendingUp, BookOpen, Award, ArrowRight, Check, Target, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

gsap.registerPlugin(ScrollTrigger);

const careerPaths = [
  {
    title: 'Secondary School Teacher',
    description: 'Teach your specialized subject in high schools across Kenya.',
    requirements: ['Bachelor of Education', 'Teaching License (TSC)', 'Subject Specialization'],
    outlook: 'High demand for STEM teachers',
    salary: 'KES 35,000 - 150,000/month'
  },
  {
    title: 'Curriculum Developer',
    description: 'Design and develop educational programs and materials.',
    requirements: ['Bachelor of Education', 'Curriculum Design Skills', 'Research Experience'],
    outlook: 'Growing demand in EdTech',
    salary: 'KES 50,000 - 120,000/month'
  },
  {
    title: 'Education Administrator',
    description: 'Manage schools, colleges, or educational institutions.',
    requirements: ['Bachelor of Education', 'Management Experience', 'Leadership Skills'],
    outlook: 'Stable career progression',
    salary: 'KES 80,000 - 300,000/month'
  },
  {
    title: 'Private Tutor',
    description: 'Provide personalized education to students one-on-one or in small groups.',
    requirements: ['Subject Expertise', 'Teaching Skills', 'Business Acumen'],
    outlook: 'Flexible and scalable',
    salary: 'KES 30,000 - 200,000/month'
  }
];

const skillsToDevelop = [
  {
    category: 'Teaching Skills',
    skills: ['Classroom Management', 'Lesson Planning', 'Student Assessment', 'Differentiated Instruction']
  },
  {
    category: 'Technology Skills',
    skills: ['Digital Learning Tools', 'Online Teaching Platforms', 'Educational Software', 'Data Analysis']
  },
  {
    category: 'Soft Skills',
    skills: ['Communication', 'Leadership', 'Problem Solving', 'Emotional Intelligence']
  }
];

export default function CareerGuidance() {
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
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="bg-[#FF2D8F]/10 text-[#FF2D8F] border-[#FF2D8F]/20 mb-4">
              CAREER GUIDANCE
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Plan Your Future
            </h1>
            <p className="text-lg text-[#A9B1C7]">
              Explore career paths available to Education Science graduates and discover how to prepare for success.
            </p>
          </div>
        </div>
      </section>

      {/* Career Paths */}
      <section ref={(el) => { sectionsRef.current[0] = el; }} className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="animate-in text-3xl lg:text-4xl font-bold text-white mb-6">
              Career Paths for Education Graduates
            </h2>
            <p className="animate-in text-[#A9B1C7]">
              Your Education Science degree opens doors to various rewarding careers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {careerPaths.map((career, index) => (
              <div
                key={index}
                className="animate-in bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 hover:border-[#FF2D8F]/30 transition-all"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FF2D8F]/10 flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-[#FF2D8F]" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{career.title}</h3>
                </div>
                <p className="text-[#A9B1C7] mb-4">{career.description}</p>
                
                <div className="mb-4">
                  <p className="text-white text-sm font-medium mb-2">Requirements:</p>
                  <ul className="space-y-1">
                    {career.requirements.map((req, i) => (
                      <li key={i} className="flex items-center space-x-2 text-sm text-[#A9B1C7]">
                        <Check className="w-4 h-4 text-[#FF2D8F]" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div>
                    <p className="text-[#A9B1C7] text-xs">Job Outlook</p>
                    <p className="text-green-400 text-sm">{career.outlook}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#A9B1C7] text-xs">Salary Range</p>
                    <p className="text-white text-sm">{career.salary}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={(el) => { sectionsRef.current[1] = el; }} className="py-16 lg:py-24 bg-[#F6F7FB]">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="animate-in text-3xl lg:text-4xl font-bold text-[#0B0F1C] mb-6">
              Skills to Develop
            </h2>
            <p className="animate-in text-gray-600">
              Start building these skills now to stand out in the job market.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {skillsToDevelop.map((category, index) => (
              <div
                key={index}
                className="animate-in bg-white rounded-3xl p-6 border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-[#0B0F1C] mb-4">{category.category}</h3>
                <ul className="space-y-3">
                  {category.skills.map((skill, i) => (
                    <li key={i} className="flex items-center space-x-2 text-gray-600">
                      <div className="w-2 h-2 rounded-full bg-[#FF2D8F]" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section ref={(el) => { sectionsRef.current[2] = el; }} className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="animate-in text-3xl lg:text-4xl font-bold text-white mb-6">
                Tips for Career Success
              </h2>
              <div className="animate-in space-y-6">
                {[
                  {
                    icon: Target,
                    title: 'Start Early',
                    description: 'Begin building your network and gaining experience while still in school.'
                  },
                  {
                    icon: Users,
                    title: 'Network',
                    description: 'Connect with professionals in your field. Attend education conferences and workshops.'
                  },
                  {
                    icon: Award,
                    title: 'Get Certified',
                    description: 'Additional certifications in your subject area can give you a competitive edge.'
                  },
                  {
                    icon: Lightbulb,
                    title: 'Stay Updated',
                    description: 'Education is constantly evolving. Keep learning about new teaching methods and technologies.'
                  }
                ].map((tip, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-[#FF2D8F]/10 flex items-center justify-center flex-shrink-0">
                      <tip.icon className="w-6 h-6 text-[#FF2D8F]" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{tip.title}</h3>
                      <p className="text-[#A9B1C7]">{tip.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-in">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
                <h3 className="text-xl font-semibold text-white mb-6">
                  Your Career Timeline
                </h3>
                <div className="space-y-6">
                  {[
                    { year: 'Year 1-2', focus: 'Build foundation, explore interests', action: 'Join education clubs, attend workshops' },
                    { year: 'Year 3', focus: 'Gain practical experience', action: 'Teaching practice, internships' },
                    { year: 'Year 4', focus: 'Prepare for employment', action: 'Network, apply for jobs, TSC registration' },
                    { year: 'After Graduation', focus: 'Continuous growth', action: 'Professional development, advanced degrees' }
                  ].map((item, index) => (
                    <div key={index} className="relative pl-8 border-l-2 border-[#FF2D8F]/30">
                      <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-[#FF2D8F]" />
                      <p className="text-[#FF2D8F] font-medium">{item.year}</p>
                      <p className="text-white">{item.focus}</p>
                      <p className="text-[#A9B1C7] text-sm">{item.action}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="bg-gradient-to-r from-[#FF2D8F] to-[#ff6b9d] rounded-3xl p-8 lg:p-12 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Start preparing for your career today
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Your academic success is the foundation of your career success. Let us help you build it.
            </p>
            <Link to="/pricing">
              <Button size="lg" className="bg-white text-[#FF2D8F] hover:bg-white/90">
                Get Study Materials
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
