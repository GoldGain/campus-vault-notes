import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Infinity, Crown, ArrowRight, Star, Shield, Download, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export default function FourYearPack() {
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
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 mb-4">
                <Crown className="w-4 h-4 mr-1" />
                ULTIMATE
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                4-Year Complete Pack
              </h1>
              <p className="text-xl text-[#A9B1C7] mb-8">
                Everything from Year 1 to Year 4. Never expires. The ultimate investment in your education.
              </p>
              <div className="flex items-center justify-center space-x-4 mb-4">
                <span className="text-5xl font-bold text-white">KES 4,999</span>
                <span className="text-[#A9B1C7] line-through text-xl">KES 7,996</span>
              </div>
              <p className="text-green-400 font-medium mb-8">Save KES 2,997</p>
            </div>

            <div className="animate-in bg-gradient-to-br from-[#FF2D8F]/20 to-[#ff6b9d]/20 border border-[#FF2D8F]/30 rounded-3xl p-8 mb-12">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-6">Lifetime Access</h3>
                  <ul className="space-y-3">
                    {[
                      'Everything from Year 1 to 4',
                      'Never expires - lifetime access',
                      'All subjects & education units',
                      'All notes, past papers & predictions',
                      'Unlimited downloads',
                      'VIP priority support',
                      'First access to new materials',
                      'Exclusive study guides',
                      'Career guidance resources'
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-[#FF2D8F] flex-shrink-0 mt-0.5" />
                        <span className="text-[#A9B1C7]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6">
                  <div className="bg-white/5 rounded-2xl p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Infinity className="w-8 h-8 text-[#FF2D8F]" />
                      <h4 className="text-white font-semibold">Never Expires</h4>
                    </div>
                    <p className="text-[#A9B1C7] text-sm">
                      Pay once and access all materials forever. No renewals, no expirations.
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Download className="w-8 h-8 text-[#FF2D8F]" />
                      <h4 className="text-white font-semibold">Unlimited Downloads</h4>
                    </div>
                    <p className="text-[#A9B1C7] text-sm">
                      Download any file as many times as you need. No limits.
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Star className="w-8 h-8 text-[#FF2D8F]" />
                      <h4 className="text-white font-semibold">VIP Support</h4>
                    </div>
                    <p className="text-[#A9B1C7] text-sm">
                      Get priority support whenever you need help.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-in text-center">
              <Button
                onClick={handlePurchase}
                size="lg"
                className="bg-[#FF2D8F] hover:bg-[#FF2D8F]/90 text-white px-8"
              >
                Get Lifetime Access
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <p className="text-[#A9B1C7] text-sm mt-4">
                Payment plan available: KES 2,500 now, KES 2,499 later
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
