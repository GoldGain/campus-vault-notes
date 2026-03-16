import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, BookOpen, Calendar, Target, ArrowRight, Badge } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function YearBundle() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.animate-in',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handlePurchase = () => {
    toast.info('Redirecting to payment...');
  };

  return (
    <div className="bg-[#0B0F1C] min-h-screen pt-20">
      <section ref={sectionRef} className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 bg-[#FF2D8F]/10 rounded-full text-[#FF2D8F] text-sm font-medium mb-4">
                <Badge className="bg-[#FF2D8F] text-white border-0 mr-2">Best Value</Badge>
                Year Bundle
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                Year Bundle
              </h1>
              <p className="text-xl text-[#A9B1C7] mb-8">
                Both semesters. Best value for serious students.
              </p>
              <div className="flex items-center justify-center space-x-4 mb-8">
                <span className="text-5xl font-bold text-white">KES 1,899</span>
                <span className="text-[#A9B1C7] line-through text-xl">KES 1,998</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="animate-in bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
                <h3 className="text-xl font-semibold text-white mb-6">What is included</h3>
                <ul className="space-y-3">
                  {[
                    'Both semesters (15+ units)',
                    'Save even more vs semester bundles',
                    'All notes, past papers & predictions',
                    'Watermarked PDF downloads',
                    '3 downloads per file',
                    'Priority support',
                    'Early access to predictions',
                    'Bonus study guides'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-[#FF2D8F] flex-shrink-0 mt-0.5" />
                      <span className="text-[#A9B1C7]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="animate-in bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
                <h3 className="text-xl font-semibold text-white mb-6">Perfect for</h3>
                <ul className="space-y-4">
                  {[
                    { icon: BookOpen, text: 'Students committed to academic excellence' },
                    { icon: Calendar, text: 'Those who want uninterrupted year-long access' },
                    { icon: Target, text: 'Students who want the best value for money' }
                  ].map((item, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-[#FF2D8F]/10 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-[#FF2D8F]" />
                      </div>
                      <span className="text-[#A9B1C7]">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="animate-in text-center">
              <Button
                onClick={handlePurchase}
                size="lg"
                className="bg-[#FF2D8F] hover:bg-[#FF2D8F]/90 text-white px-8"
              >
                Get Year Bundle
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <p className="text-[#A9B1C7] text-sm mt-4">
                Access expires at end of academic year
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
