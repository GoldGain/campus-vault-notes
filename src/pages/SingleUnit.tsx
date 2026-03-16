import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, BookOpen, ArrowRight, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function SingleUnit() {
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
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/5 rounded-full text-[#A9B1C7] text-sm font-medium mb-4">
              <Target className="w-4 h-4 mr-2" />
              Single Unit
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Single Unit
            </h1>
            <p className="text-xl text-[#A9B1C7] mb-8">
              Perfect for retakes or catching up on one specific unit.
            </p>
            <div className="flex items-center justify-center space-x-4 mb-12">
              <span className="text-5xl font-bold text-white">KES 199</span>
              <span className="text-[#A9B1C7]">/ unit</span>
            </div>

            <div className="animate-in bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 mb-8">
              <h3 className="text-xl font-semibold text-white mb-6">What is included</h3>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                {[
                  'One specific unit of your choice',
                  'Lifetime access to that unit',
                  'All notes, past papers & predictions',
                  'Watermarked PDF downloads',
                  '3 downloads per file',
                  'Email support'
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-[#FF2D8F] flex-shrink-0 mt-0.5" />
                    <span className="text-[#A9B1C7]">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-in">
              <Button
                onClick={handlePurchase}
                size="lg"
                className="bg-[#FF2D8F] hover:bg-[#FF2D8F]/90 text-white px-8"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Choose Your Unit
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <p className="text-[#A9B1C7] text-sm mt-4">
                Lifetime access • No expiration
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
