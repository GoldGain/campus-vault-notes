import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, BookOpen, FileText, Target, Users, Clock, ArrowRight, Star, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

const features = [
  'ALL 7-8 units for one semester',
  'Complete notes for every unit',
  'Past papers with solutions (5+ years)',
  'Exam predictions updated each semester',
  'Watermarked PDF downloads',
  '3 downloads per file',
  'Priority email support',
  'Early access to predictions'
];

const includedUnits = [
  { code: 'MAT 101', name: 'Calculus I' },
  { code: 'CHE 102', name: 'Organic Chemistry' },
  { code: 'PHY 201', name: 'Mechanics' },
  { code: 'BIO 103', name: 'Cell Biology' },
  { code: 'EDU 101', name: 'Introduction to Education' },
  { code: 'EDU 102', name: 'Psychology of Education' },
  { code: 'MAT 102', name: 'Linear Algebra' },
  { code: 'CHE 103', name: 'Physical Chemistry' }
];

export default function SemesterBundle() {
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

  const handlePurchase = () => {
    toast.info('Redirecting to payment...');
  };

  return (
    <div className="bg-[#0B0F1C] min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-[#FF2D8F] text-white border-0 mb-4">
                MOST POPULAR
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Semester Bundle
              </h1>
              <p className="text-xl text-[#A9B1C7] mb-6">
                Get ALL 7-8 units for one semester at an unbeatable price.
              </p>
              <div className="flex items-baseline space-x-3 mb-8">
                <span className="text-5xl font-bold text-white">KES 999</span>
                <span className="text-[#A9B1C7] line-through text-xl">KES 1,592</span>
                <Badge className="bg-green-500/20 text-green-400">
                  Save KES 593
                </Badge>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handlePurchase}
                  size="lg"
                  className="bg-[#FF2D8F] hover:bg-[#FF2D8F]/90 text-white"
                >
                  Buy Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Link to="/pricing">
                  <Button size="lg" variant="outline" className="border-white/20 text-white">
                    Compare Plans
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <h3 className="text-xl font-semibold text-white mb-6">What is included</h3>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-[#FF2D8F] flex-shrink-0 mt-0.5" />
                    <span className="text-[#A9B1C7]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Units Included */}
      <section ref={(el) => { sectionsRef.current[0] = el; }} className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="animate-in text-3xl lg:text-4xl font-bold text-white mb-6">
              Units Included
            </h2>
            <p className="animate-in text-[#A9B1C7]">
              Get complete access to all these units for the entire semester.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {includedUnits.map((unit, index) => (
              <div
                key={index}
                className="animate-in bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4"
              >
                <Badge variant="outline" className="border-white/20 text-[#A9B1C7] mb-2">
                  {unit.code}
                </Badge>
                <p className="text-white font-medium">{unit.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section ref={(el) => { sectionsRef.current[1] = el; }} className="py-16 lg:py-24 bg-[#F6F7FB]">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="animate-in text-3xl lg:text-4xl font-bold text-[#0B0F1C] mb-6">
              Why Choose the Semester Bundle?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: BookOpen,
                title: 'Complete Coverage',
                description: 'Access all units you need for the semester in one purchase.'
              },
              {
                icon: Shield,
                title: 'Save Money',
                description: 'Pay KES 125-142 per unit instead of KES 199 individually.'
              },
              {
                icon: Clock,
                title: 'Stay Organized',
                description: 'All your study materials in one place, accessible anytime.'
              }
            ].map((item, index) => (
              <div
                key={index}
                className="animate-in bg-white rounded-3xl p-6 border border-gray-200 text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#FF2D8F]/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-[#FF2D8F]" />
                </div>
                <h3 className="text-xl font-semibold text-[#0B0F1C] mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="bg-gradient-to-r from-[#FF2D8F] to-[#ff6b9d] rounded-3xl p-8 lg:p-12 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Ready to get started?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Join thousands of students who are already studying smarter with the Semester Bundle.
            </p>
            <Button
              onClick={handlePurchase}
              size="lg"
              className="bg-white text-[#FF2D8F] hover:bg-white/90"
            >
              Get Semester Bundle
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
