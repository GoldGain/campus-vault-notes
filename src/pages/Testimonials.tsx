import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote, ArrowRight, TrendingUp, Award, BookOpen, Target, Users, CheckCircle2, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

gsap.registerPlugin(ScrollTrigger);

// All testimonials with African student images
const testimonials = [
  {
    id: 1,
    name: 'Grace Ndinda',
    year: 'Nursing Student',
    course: 'BSc Nursing',
    quote: 'CampusVault has been a lifesaver! Even as a nursing student, the study tips and organizational skills I learned here have helped me excel. The resources are incredibly well-organized and the exam predictions are spot on!',
    rating: 5,
    image: '/images/grace-ndinda.jpg',
    improvement: 'Top 5% Class',
    subject: 'Nursing'
  },
  {
    id: 2,
    name: 'Brian Ochieng',
    year: 'Year 3',
    course: 'Education Science',
    quote: 'Notes are clean, organized, and actually match our lectures. I have improved from a C to an A in just one semester! The past papers with solutions were exactly what I needed to understand the exam format.',
    rating: 5,
    image: '/images/student1.jpg',
    improvement: 'B to A',
    subject: 'Mathematics'
  },
  {
    id: 3,
    name: 'Faith Muthoni',
    year: 'Year 2',
    course: 'Education Science',
    quote: 'Past papers with solutions helped me understand the exam format. I scored an A in Physics thanks to CampusVault! The step-by-step solutions made everything click. I could not have done it without this platform.',
    rating: 5,
    image: '/images/student-library.jpg',
    improvement: 'D to A',
    subject: 'Physics'
  },
  {
    id: 4,
    name: 'John Kamau',
    year: 'Year 4',
    course: 'Education Science',
    quote: 'The 4-year pack was the best investment I made. All my revision materials in one place, never expiring. I have used it every semester and it has been worth every shilling. Highly recommend to all students!',
    rating: 5,
    image: '/images/student-laptop.jpg',
    improvement: 'Consistent As',
    subject: 'All Subjects'
  },
  {
    id: 5,
    name: 'Sarah Njeri',
    year: 'Year 1',
    course: 'Education Science',
    quote: 'As a first-year, I was overwhelmed. CampusVault helped me organize my studies and stay on track. Highly recommend! The semester bundle is perfect for new students trying to find their footing.',
    rating: 5,
    image: '/images/students-smiling.jpg',
    improvement: 'First Year Success',
    subject: 'All Subjects'
  },
  {
    id: 6,
    name: 'Michael Otieno',
    year: 'Year 3',
    course: 'Education Science',
    quote: 'The 48 Laws of Power book changed my perspective on student leadership. Great addition to academic resources! It is not just about grades, it is about becoming a better person and leader.',
    rating: 5,
    image: '/images/students-campus.jpg',
    improvement: 'Leadership Skills',
    subject: 'Personal Growth'
  },
  {
    id: 7,
    name: 'Esther Akinyi',
    year: 'Year 2',
    course: 'Education Science',
    quote: 'I was skeptical at first, but the exam predictions are scarily accurate. Last semester, 8 out of 10 predicted topics appeared in the exam. Worth every penny! CampusVault is a game-changer.',
    rating: 5,
    image: '/images/students-group.jpg',
    improvement: 'B to A',
    subject: 'Biology'
  },
  {
    id: 8,
    name: 'Daniel Kipchirchir',
    year: 'Year 4',
    course: 'Education Science',
    quote: 'CampusVault helped me balance my studies and teaching practice. The organized notes saved me so much time. I graduated with First Class Honors! This platform is a must-have for every MUT student.',
    rating: 5,
    image: '/images/student1.jpg',
    improvement: 'First Class Honors',
    subject: 'All Subjects'
  },
  {
    id: 9,
    name: 'Lucy Wambui',
    year: 'Year 3',
    course: 'Education Science',
    quote: 'The mental health resources on CampusVault helped me through a tough semester. It is more than just academics—they actually care about students. Thank you for the support!',
    rating: 5,
    image: '/images/student-library.jpg',
    improvement: 'Well-being',
    subject: 'Mental Health'
  },
  {
    id: 10,
    name: 'Peter Mwangi',
    year: 'Year 2',
    course: 'Education Science',
    quote: 'I used to spend hours looking for notes. Now everything is in one place. My grades improved, and I have more time for other activities. CampusVault is the real deal!',
    rating: 5,
    image: '/images/student-laptop.jpg',
    improvement: 'C to B+',
    subject: 'All Subjects'
  },
  {
    id: 11,
    name: 'Mary Njoki',
    year: 'Year 1',
    course: 'Education Science',
    quote: 'The career guidance section helped me choose my teaching subjects wisely. I feel more confident about my future as an educator. CampusVault is an investment in your future!',
    rating: 5,
    image: '/images/students-smiling.jpg',
    improvement: 'Career Clarity',
    subject: 'Career Planning'
  },
  {
    id: 12,
    name: 'James Kuria',
    year: 'Year 3',
    course: 'Education Science',
    quote: 'Retaking a unit was stressful until I found CampusVault. The single unit option was perfect, and I passed with an A this time! The notes are comprehensive and easy to understand.',
    rating: 5,
    image: '/images/students-campus.jpg',
    improvement: 'Retake Success',
    subject: 'Mathematics'
  }
];

const successStats = [
  { value: '98%', label: 'Student Success Rate', icon: TrendingUp },
  { value: '4.9/5', label: 'Average Rating', icon: Star },
  { value: '85%', label: 'Grade Improvement', icon: Award },
  { value: '10,000+', label: 'Students Helped', icon: Users }
];

const featuredStories = [
  {
    name: 'Grace Ndinda',
    title: 'From Struggling to Excelling',
    story: 'Grace was on the verge of dropping out after failing her first-year exams. She discovered CampusVault through a friend and decided to give it a try. With structured notes, past papers, and exam predictions, she not only passed her retakes but is now in the top 5% of her nursing class.',
    result: 'Top 5% of Class',
    image: '/images/grace-ndinda.jpg'
  },
  {
    name: 'Daniel Kipchirchir',
    title: 'First Class Honors Graduate',
    story: 'Daniel used CampusVault throughout his 4-year degree. He credits the platform for helping him maintain consistency and achieve First Class Honors. He is now pursuing his Masters in Education and plans to become a lecturer.',
    result: 'First Class Honors',
    image: '/images/student1.jpg'
  },
  {
    name: 'Esther Akinyi',
    title: 'The Power of Predictions',
    story: 'Esther was overwhelmed by the amount of content to study for her Biology exam. The exam predictions helped her focus on the most important topics, and 8 out of 10 predicted questions appeared in the exam. She scored an A and now recommends CampusVault to all her friends.',
    result: 'Scored A in Biology',
    image: '/images/student-library.jpg'
  }
];

// Student advice
const studentTips = [
  {
    icon: BookOpen,
    title: 'Start Early',
    description: 'Do not wait until the last minute. Begin studying from day one.'
  },
  {
    icon: Target,
    title: 'Set Goals',
    description: 'Have clear, achievable goals for each study session.'
  },
  {
    icon: Users,
    title: 'Study in Groups',
    description: 'Learning with peers helps reinforce concepts.'
  },
  {
    icon: Award,
    title: 'Practice Past Papers',
    description: 'Familiarize yourself with the exam format and timing.'
  }
];

export default function Testimonials() {
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
              SUCCESS STORIES
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
              What our students say
            </h1>
            <p className="text-lg text-[#A9B1C7]">
              Join thousands of MUT students who have transformed their academic journey with CampusVault.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-white/10">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {successStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-[#FF2D8F]/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-[#FF2D8F]" />
                </div>
                <p className="text-3xl lg:text-4xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-[#A9B1C7] text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Stories */}
      <section ref={(el) => { sectionsRef.current[0] = el; }} className="py-20 lg:py-32">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="animate-in text-3xl lg:text-5xl font-bold text-white mb-6">
              Featured Success Stories
            </h2>
            <p className="animate-in text-lg text-[#A9B1C7]">
              Real stories from real students who transformed their academic performance.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {featuredStories.map((story, index) => (
              <div
                key={index}
                className="animate-in bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden group hover:border-[#FF2D8F]/30 transition-all"
              >
                <div className="aspect-[4/5] relative overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1C] via-[#0B0F1C]/50 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <Badge className="bg-[#FF2D8F] text-white border-0 mb-3">
                      {story.result}
                    </Badge>
                    <h3 className="text-xl font-bold text-white mb-1">{story.name}</h3>
                    <p className="text-[#A9B1C7]">{story.title}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-[#A9B1C7] text-sm leading-relaxed">{story.story}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Tips Section */}
      <section ref={(el) => { sectionsRef.current[1] = el; }} className="py-20 lg:py-32 bg-[#F6F7FB]">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="animate-in text-3xl lg:text-4xl font-bold text-[#0B0F1C] mb-6">
              Tips from Successful Students
            </h2>
            <p className="animate-in text-lg text-gray-600">
              Learn from those who have achieved academic excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {studentTips.map((tip, index) => (
              <div
                key={index}
                className="animate-in bg-white rounded-3xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FF2D8F]/10 flex items-center justify-center mb-4">
                  <tip.icon className="w-6 h-6 text-[#FF2D8F]" />
                </div>
                <h3 className="text-lg font-semibold text-[#0B0F1C] mb-2">{tip.title}</h3>
                <p className="text-gray-600 text-sm">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section ref={(el) => { sectionsRef.current[2] = el; }} className="py-20 lg:py-32">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="animate-in text-3xl lg:text-5xl font-bold text-white mb-6">
              Student Testimonials
            </h2>
            <p className="animate-in text-lg text-[#A9B1C7]">
              Hear from students across all years who have benefited from CampusVault.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="animate-in bg-white rounded-3xl p-6 lg:p-8 border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FF2D8F] text-[#FF2D8F]" />
                  ))}
                </div>
                
                <Quote className="w-8 h-8 text-[#FF2D8F]/20 mb-4" />
                
                <p className="text-[#0B0F1C] mb-6 leading-relaxed">{testimonial.quote}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-3">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-[#0B0F1C]">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.year}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-[#FF2D8F] border-[#FF2D8F]/30">
                    {testimonial.improvement}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Students Love Us */}
      <section ref={(el) => { sectionsRef.current[3] = el; }} className="py-20 lg:py-32">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="animate-in text-3xl lg:text-5xl font-bold text-white mb-6">
                Why students love CampusVault
              </h2>
              <p className="animate-in text-lg text-[#A9B1C7] mb-8">
                We have helped thousands of students achieve their academic goals. Here is what makes us different:
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: BookOpen,
                    title: 'Syllabus-Matched Content',
                    description: 'Every note and paper is carefully matched to the MUT syllabus.'
                  },
                  {
                    icon: Target,
                    title: 'Accurate Predictions',
                    description: 'Our exam predictions have an 85% accuracy rate based on past patterns.'
                  },
                  {
                    icon: TrendingUp,
                    title: 'Proven Results',
                    description: '98% of our students report improved grades within one semester.'
                  }
                ].map((feature, index) => (
                  <div key={index} className="animate-in flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-[#FF2D8F]/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-[#FF2D8F]" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                      <p className="text-[#A9B1C7] text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-in relative">
              <div className="aspect-square rounded-3xl overflow-hidden">
                <img
                  src="/images/students-group.jpg"
                  alt="Happy students"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-full bg-[#FF2D8F] flex items-center justify-center">
                    <TrendingUp className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-[#0B0F1C]">85%</p>
                    <p className="text-gray-500">Prediction Accuracy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="bg-gradient-to-r from-[#FF2D8F] to-[#ff6b9d] rounded-3xl p-8 lg:p-16 text-center">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              Start your success story
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8 text-lg">
              Join 10,000+ students who are already studying smarter with CampusVault. 
              Your success story could be next!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-[#FF2D8F] hover:bg-white/90 px-8">
                  Get Started Today
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
