import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Brain, Moon, Sun, Phone, MessageCircle, AlertCircle, Check, ArrowRight, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

gsap.registerPlugin(ScrollTrigger);

const wellnessTips = [
  {
    icon: Moon,
    title: 'Get Enough Sleep',
    description: 'Aim for 7-9 hours of quality sleep. Good sleep improves memory, concentration, and emotional regulation.',
    action: 'Set a consistent bedtime and create a relaxing bedtime routine.'
  },
  {
    icon: Sun,
    title: 'Exercise Regularly',
    description: 'Physical activity reduces stress, improves mood, and boosts brain function.',
    action: 'Try to get at least 30 minutes of moderate exercise most days.'
  },
  {
    icon: Brain,
    title: 'Practice Mindfulness',
    description: 'Meditation and mindfulness can reduce anxiety and improve focus.',
    action: 'Start with just 5 minutes of daily meditation using apps like Headspace.'
  },
  {
    icon: Users,
    title: 'Stay Connected',
    description: 'Social support is crucial for mental health. Do not isolate yourself during stressful times.',
    action: 'Schedule regular check-ins with friends and family.'
  }
];

const stressSigns = [
  'Feeling overwhelmed or anxious',
  'Difficulty sleeping or sleeping too much',
  'Loss of interest in activities',
  'Changes in appetite',
  'Difficulty concentrating',
  'Feeling irritable or moody',
  'Physical symptoms like headaches'
];

const copingStrategies = [
  {
    title: 'Break Tasks Down',
    description: 'Large assignments can feel overwhelming. Break them into smaller, manageable chunks.'
  },
  {
    title: 'Take Regular Breaks',
    description: 'Study for 50 minutes, then take a 10-minute break. Your brain needs rest to function well.'
  },
  {
    title: 'Practice Self-Compassion',
    description: 'Be kind to yourself. Perfection is not the goal—progress is.'
  },
  {
    title: 'Seek Help When Needed',
    description: 'There is no shame in asking for help. Reach out to counselors, friends, or family.'
  }
];

export default function MentalHealth() {
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
              MENTAL HEALTH
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Your Mental Health Matters
            </h1>
            <p className="text-lg text-[#A9B1C7]">
              Academic success starts with mental wellness. Here are resources to help you maintain balance.
            </p>
          </div>
        </div>
      </section>

      {/* Wellness Tips */}
      <section ref={(el) => { sectionsRef.current[0] = el; }} className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="animate-in text-3xl lg:text-4xl font-bold text-white mb-6">
              Wellness Tips for Students
            </h2>
            <p className="animate-in text-[#A9B1C7]">
              Small habits can make a big difference in your mental health.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {wellnessTips.map((tip, index) => (
              <div
                key={index}
                className="animate-in bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 hover:border-[#FF2D8F]/30 transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#FF2D8F]/10 flex items-center justify-center mb-6">
                  <tip.icon className="w-7 h-7 text-[#FF2D8F]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{tip.title}</h3>
                <p className="text-[#A9B1C7] mb-4">{tip.description}</p>
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-white text-sm">
                    <span className="text-[#FF2D8F]">Tip:</span> {tip.action}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recognizing Stress */}
      <section ref={(el) => { sectionsRef.current[1] = el; }} className="py-16 lg:py-24 bg-[#F6F7FB]">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="animate-in text-3xl lg:text-4xl font-bold text-[#0B0F1C] mb-6">
                Recognizing Signs of Stress
              </h2>
              <p className="animate-in text-gray-600 mb-8">
                It is important to recognize when stress is becoming overwhelming. Here are common signs to watch for:
              </p>

              <div className="animate-in space-y-3">
                {stressSigns.map((sign, index) => (
                  <div key={index} className="flex items-center space-x-3 bg-white rounded-xl p-4">
                    <AlertCircle className="w-5 h-5 text-[#FF2D8F] flex-shrink-0" />
                    <span className="text-[#0B0F1C]">{sign}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-in">
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h3 className="text-xl font-semibold text-[#0B0F1C] mb-6">
                  Coping Strategies
                </h3>
                <div className="space-y-4">
                  {copingStrategies.map((strategy, index) => (
                    <div key={index} className="border-l-4 border-[#FF2D8F] pl-4">
                      <h4 className="text-[#0B0F1C] font-semibold mb-1">{strategy.title}</h4>
                      <p className="text-gray-600 text-sm">{strategy.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Support */}
      <section ref={(el) => { sectionsRef.current[2] = el; }} className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-3xl p-8 lg:p-12">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="animate-in text-2xl lg:text-3xl font-bold text-white mb-4">
                Need Immediate Support?
              </h2>
              <p className="animate-in text-[#A9B1C7] mb-8">
                If you are experiencing a mental health crisis, please reach out to these resources:
              </p>

              <div className="animate-in grid sm:grid-cols-2 gap-4">
                <a
                  href="tel:1199"
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-colors"
                >
                  <Phone className="w-8 h-8 text-red-400 mx-auto mb-3" />
                  <p className="text-white font-semibold">Emergency Hotline</p>
                  <p className="text-red-400 text-2xl font-bold">1199</p>
                  <p className="text-[#A9B1C7] text-sm">24/7 Mental Health Support</p>
                </a>
                <a
                  href="tel:+254720123456"
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-colors"
                >
                  <MessageCircle className="w-8 h-8 text-[#FF2D8F] mx-auto mb-3" />
                  <p className="text-white font-semibold">MUT Counseling</p>
                  <p className="text-[#FF2D8F] text-lg font-bold">+254 720 123 456</p>
                  <p className="text-[#A9B1C7] text-sm">Mon-Fri, 8 AM - 5 PM</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Self-Care Reminder */}
      <section className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="bg-gradient-to-r from-[#FF2D8F] to-[#ff6b9d] rounded-3xl p-8 lg:p-12 text-center">
            <Heart className="w-12 h-12 text-white mx-auto mb-4" />
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Remember: You Are Not Alone
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Every student faces challenges. Taking care of your mental health is just as important 
              as your academic success. Reach out, talk to someone, and prioritize your well-being.
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-white text-[#FF2D8F] hover:bg-white/90">
                Contact Support
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
