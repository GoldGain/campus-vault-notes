import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, Clock, BookOpen, Target, Zap, Coffee, Moon, Calendar, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

gsap.registerPlugin(ScrollTrigger);

const studyTips = [
  {
    icon: Brain,
    title: 'Active Recall',
    description: 'Test yourself instead of just re-reading. This strengthens memory retention significantly.',
    steps: ['Close your notes', 'Write down what you remember', 'Check and correct', 'Repeat until perfect']
  },
  {
    icon: Clock,
    title: 'Pomodoro Technique',
    description: 'Study in focused 25-minute bursts with 5-minute breaks in between.',
    steps: ['Set a 25-minute timer', 'Focus on one task', 'Take a 5-minute break', 'Repeat 4 times, then take a longer break']
  },
  {
    icon: Target,
    title: 'Set SMART Goals',
    description: 'Specific, Measurable, Achievable, Relevant, Time-bound goals keep you on track.',
    steps: ['Define specific objectives', 'Set deadlines', 'Break into smaller tasks', 'Track your progress']
  },
  {
    icon: BookOpen,
    title: 'Spaced Repetition',
    description: 'Review material at increasing intervals to move it to long-term memory.',
    steps: ['Review after 1 day', 'Then after 3 days', 'Then after 1 week', 'Then after 2 weeks']
  },
  {
    icon: Zap,
    title: 'Teach What You Learn',
    description: 'Explaining concepts to others helps solidify your own understanding.',
    steps: ['Study a topic', 'Explain it to a friend', 'Identify gaps in your knowledge', 'Review and refine']
  },
  {
    icon: Coffee,
    title: 'Take Strategic Breaks',
    description: 'Your brain needs rest to consolidate information. Do not skip breaks!',
    steps: ['Study for 50 minutes', 'Take a 10-minute break', 'Move your body', 'Stay hydrated']
  }
];

const dailyRoutine = [
  { time: '6:00 AM', activity: 'Wake up, hydrate, light exercise', icon: Moon },
  { time: '7:00 AM', activity: 'Review notes from previous day', icon: BookOpen },
  { time: '9:00 AM', activity: 'Deep study session (Pomodoro)', icon: Brain },
  { time: '12:00 PM', activity: 'Lunch break', icon: Coffee },
  { time: '2:00 PM', activity: 'Practice problems / Past papers', icon: Target },
  { time: '5:00 PM', activity: 'Review and summarize', icon: Check },
  { time: '7:00 PM', activity: 'Free time / Relaxation', icon: Zap },
  { time: '10:00 PM', activity: 'Sleep (8 hours minimum!)', icon: Moon }
];

export default function StudyTips() {
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
              STUDY TIPS
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Study Smarter,<br />Not Harder
            </h1>
            <p className="text-lg text-[#A9B1C7]">
              Proven techniques and strategies to help you learn more effectively and retain information longer.
            </p>
          </div>
        </div>
      </section>

      {/* Study Tips Grid */}
      <section ref={(el) => { sectionsRef.current[0] = el; }} className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="animate-in text-3xl lg:text-4xl font-bold text-white mb-6">
              Proven Study Techniques
            </h2>
            <p className="animate-in text-[#A9B1C7]">
              These methods are backed by science and used by top students worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studyTips.map((tip, index) => (
              <div
                key={index}
                className="animate-in bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 hover:border-[#FF2D8F]/30 transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#FF2D8F]/10 flex items-center justify-center mb-6">
                  <tip.icon className="w-7 h-7 text-[#FF2D8F]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{tip.title}</h3>
                <p className="text-[#A9B1C7] mb-4">{tip.description}</p>
                <ul className="space-y-2">
                  {tip.steps.map((step, i) => (
                    <li key={i} className="flex items-start space-x-2 text-sm text-[#A9B1C7]">
                      <Check className="w-4 h-4 text-[#FF2D8F] flex-shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Routine */}
      <section ref={(el) => { sectionsRef.current[1] = el; }} className="py-16 lg:py-24 bg-[#F6F7FB]">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="animate-in text-3xl lg:text-4xl font-bold text-[#0B0F1C] mb-6">
                The Perfect Study Day
              </h2>
              <p className="animate-in text-gray-600 mb-8">
                A well-structured daily routine can dramatically improve your productivity and retention.
                Here is a sample schedule used by top-performing students.
              </p>

              <div className="animate-in space-y-4">
                {dailyRoutine.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 bg-white rounded-xl p-4">
                    <div className="w-12 h-12 rounded-xl bg-[#FF2D8F]/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-[#FF2D8F]" />
                    </div>
                    <div>
                      <p className="text-[#0B0F1C] font-semibold">{item.time}</p>
                      <p className="text-gray-600 text-sm">{item.activity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-in">
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h3 className="text-xl font-semibold text-[#0B0F1C] mb-6">
                  Quick Tips for Success
                </h3>
                <div className="space-y-4">
                  {[
                    'Start with the hardest subject when your mind is fresh',
                    'Create a dedicated study space free from distractions',
                    'Use flashcards for quick revision sessions',
                    'Form study groups for difficult topics',
                    'Reward yourself after completing study goals',
                    'Stay consistent - small daily efforts compound'
                  ].map((tip, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-[#FF2D8F]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#FF2D8F]" />
                      </div>
                      <span className="text-[#0B0F1C]">{tip}</span>
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
              Ready to put these tips into practice?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Access our comprehensive study materials and start implementing these strategies today.
            </p>
            <Link to="/resources">
              <Button size="lg" className="bg-white text-[#FF2D8F] hover:bg-white/90">
                Browse Resources
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
