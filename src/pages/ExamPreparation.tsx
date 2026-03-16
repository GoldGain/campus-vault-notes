import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, Clock, Target, Check, AlertCircle, BookOpen, Calendar, TrendingUp, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

gsap.registerPlugin(ScrollTrigger);

const examTimeline = [
  {
    weeks: '4-6 Weeks Before',
    tasks: [
      'Create a study schedule',
      'Gather all study materials',
      'Identify weak areas',
      'Start reviewing notes'
    ]
  },
  {
    weeks: '2-3 Weeks Before',
    tasks: [
      'Focus on past papers',
      'Practice under timed conditions',
      'Review exam predictions',
      'Form study groups'
    ]
  },
  {
    weeks: '1 Week Before',
    tasks: [
      'Light review of key concepts',
      'Get plenty of rest',
      'Prepare exam materials',
      'Stay calm and confident'
    ]
  },
  {
    weeks: 'Exam Day',
    tasks: [
      'Wake up early',
      'Eat a healthy breakfast',
      'Arrive 30 minutes early',
      'Read instructions carefully'
    ]
  }
];

const tips = [
  {
    icon: Clock,
    title: 'Time Management',
    description: 'Allocate time based on marks. Do not spend too long on one question.'
  },
  {
    icon: Target,
    title: 'Read Carefully',
    description: 'Understand what each question is asking before you start answering.'
  },
  {
    icon: FileText,
    title: 'Show Your Work',
    description: 'Even if your final answer is wrong, you can get marks for correct working.'
  },
  {
    icon: Check,
    title: 'Review Your Answers',
    description: 'If you finish early, use the remaining time to check your work.'
  }
];

const checklist = [
  'Student ID card',
  'Exam entry ticket',
  'Pens (black/blue ink)',
  'Pencils and eraser',
  'Calculator (if allowed)',
  'Ruler',
  'Water bottle',
  'Watch (non-smart)'
];

export default function ExamPreparation() {
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
              EXAM PREPARATION
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Ace Your Exams
            </h1>
            <p className="text-lg text-[#A9B1C7]">
              Comprehensive guide to preparing for and excelling in your exams.
            </p>
          </div>
        </div>
      </section>

      {/* Exam Timeline */}
      <section ref={(el) => { sectionsRef.current[0] = el; }} className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="animate-in text-3xl lg:text-4xl font-bold text-white mb-6">
              Your Exam Preparation Timeline
            </h2>
            <p className="animate-in text-[#A9B1C7]">
              Follow this schedule to ensure you are fully prepared when exam day arrives.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {examTimeline.map((phase, index) => (
              <div
                key={index}
                className="animate-in relative pl-8 pb-8 last:pb-0 border-l-2 border-[#FF2D8F]/30"
              >
                <div className="absolute left-0 top-0 -translate-x-1/2 w-6 h-6 rounded-full bg-[#FF2D8F]" />
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">{phase.weeks}</h3>
                  <ul className="space-y-2">
                    {phase.tasks.map((task, i) => (
                      <li key={i} className="flex items-center space-x-3 text-[#A9B1C7]">
                        <Check className="w-4 h-4 text-[#FF2D8F]" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exam Tips */}
      <section ref={(el) => { sectionsRef.current[1] = el; }} className="py-16 lg:py-24 bg-[#F6F7FB]">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="animate-in text-3xl lg:text-4xl font-bold text-[#0B0F1C] mb-6">
              Exam Day Tips
            </h2>
            <p className="animate-in text-gray-600">
              Strategies to help you perform your best on exam day.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {tips.map((tip, index) => (
              <div
                key={index}
                className="animate-in bg-white rounded-3xl p-6 border border-gray-200"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#FF2D8F]/10 flex items-center justify-center mb-4">
                  <tip.icon className="w-7 h-7 text-[#FF2D8F]" />
                </div>
                <h3 className="text-xl font-semibold text-[#0B0F1C] mb-2">{tip.title}</h3>
                <p className="text-gray-600">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section ref={(el) => { sectionsRef.current[2] = el; }} className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="animate-in text-3xl lg:text-4xl font-bold text-white mb-6">
                Exam Day Checklist
              </h2>
              <p className="animate-in text-[#A9B1C7] mb-8">
                Make sure you have everything you need before leaving for the exam.
              </p>

              <div className="animate-in space-y-3">
                {checklist.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 bg-white/5 rounded-xl p-4"
                  >
                    <div className="w-6 h-6 rounded border-2 border-[#FF2D8F] flex items-center justify-center">
                      <Check className="w-3 h-3 text-[#FF2D8F]" />
                    </div>
                    <span className="text-white">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-in">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
                <h3 className="text-xl font-semibold text-white mb-6">
                  Exam Predictions
                </h3>
                <p className="text-[#A9B1C7] mb-6">
                  Our exam predictions have an 85% accuracy rate. Focus on these topics 
                  for maximum results.
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { subject: 'Mathematics', accuracy: 87 },
                    { subject: 'Chemistry', accuracy: 83 },
                    { subject: 'Physics', accuracy: 85 },
                    { subject: 'Biology', accuracy: 86 }
                  ].map((subject, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white text-sm">{subject.subject}</span>
                        <span className="text-[#FF2D8F] text-sm">{subject.accuracy}%</span>
                      </div>
                      <Progress value={subject.accuracy} className="h-2" />
                    </div>
                  ))}
                </div>
                <Link to="/resources?type=predictions">
                  <Button className="w-full bg-[#FF2D8F] hover:bg-[#FF2D8F]/90">
                    View Predictions
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
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
              Ready to ace your exams?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Access past papers, exam predictions, and comprehensive notes to boost your preparation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/resources?type=papers">
                <Button size="lg" className="bg-white text-[#FF2D8F] hover:bg-white/90">
                  Past Papers
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/resources?type=predictions">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Exam Predictions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
