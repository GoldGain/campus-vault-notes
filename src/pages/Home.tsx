import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowRight, Star, BookOpen, FileText, Target, 
  GraduationCap, Users, Check, ChevronRight,
  Quote, Download, Bookmark, Search, Zap,
  TrendingUp, Award, Clock, Heart, Lightbulb,
  Calendar, MessageCircle, Play, CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

gsap.registerPlugin(ScrollTrigger);

// Real testimonials with Grace Ndinda
const testimonials = [
  {
    id: 1,
    name: 'Grace Ndinda',
    year: 'Nursing Student',
    quote: 'CampusVault has been a lifesaver! Even as a nursing student, the study tips and organizational skills I learned here have helped me excel. The resources are incredibly well-organized.',
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
    quote: 'Notes are clean, organized, and actually match our lectures. I have improved from a C to an A in just one semester! The past papers with solutions were exactly what I needed.',
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
    quote: 'Past papers with solutions helped me understand the exam format. I scored an A in Physics thanks to CampusVault! The step-by-step solutions made everything click.',
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
    quote: 'The 4-year pack was the best investment I made. All my revision materials in one place, never expiring. I have used it every semester and it has been worth every shilling.',
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
    quote: 'As a first-year, I was overwhelmed. CampusVault helped me organize my studies and stay on track. Highly recommend! The semester bundle is perfect for new students.',
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
    quote: 'The 48 Laws of Power book changed my perspective on student leadership. Great addition to academic resources! It is not just about grades, it is about becoming a better person.',
    rating: 5,
    image: '/images/students-campus.jpg',
    improvement: 'Leadership Skills',
    subject: 'Personal Growth'
  }
];

// FAQ data
const faqData = [
  {
    question: 'How do I get access after payment?',
    answer: 'Within 5 minutes of successful payment, you will receive an SMS and email with your login details. Simply log in to the members area using your email and the password provided. You can then access all your purchased materials immediately.'
  },
  {
    question: 'Can I download notes?',
    answer: 'Yes! You can download watermarked copies of all notes. Each download shows your name and phone number on every page for security. You have a maximum of 3 downloads per file to prevent unauthorized sharing.'
  },
  {
    question: 'What happens when the semester ends?',
    answer: 'For Semester Bundle users, access expires at the end of the semester. You can purchase the new semester bundle for KES 999 to continue accessing materials. Year Bundle and 4-Year Pack users maintain access according to their plan terms.'
  },
  {
    question: 'Is there a refund policy?',
    answer: 'Yes, we offer a 30-day money-back guarantee. If you are not satisfied with our materials, contact us within 30 days of purchase for a full refund. No questions asked.'
  },
  {
    question: 'Can I share my account?',
    answer: 'No. Each copy is watermarked with your personal details. Sharing violates our terms of service and will result in permanent account ban without refund. We monitor downloads to protect our content.'
  },
  {
    question: 'Do you have all Education Science units?',
    answer: 'Yes! We cover all teaching subjects plus common units for Bachelor of Education Science at MUT. This includes Mathematics, Chemistry, Biology, Physics, and all professional units.'
  },
  {
    question: 'Can I pay with card?',
    answer: 'Yes! We accept Visa, Mastercard, and other cards via Stripe for international students. Kenyan students can use M-PESA for instant access.'
  },
  {
    question: 'How often are materials updated?',
    answer: 'We update our materials every semester to match the latest MUT syllabus. Exam predictions are released 2 weeks before exams based on past trends and lecturer patterns.'
  }
];

// Stats data
const stats = [
  { value: '10,000+', label: 'Active Students' },
  { value: '500+', label: 'Study Resources' },
  { value: '98%', label: 'Success Rate' },
  { value: '4.9/5', label: 'Student Rating' }
];

// Student advice tips
const studentAdvice = [
  {
    icon: Lightbulb,
    title: 'Start Early',
    description: 'Do not wait until exams are near. Start reviewing your notes from week one.'
  },
  {
    icon: Clock,
    title: 'Manage Your Time',
    description: 'Create a study schedule and stick to it. Balance academics with social life.'
  },
  {
    icon: Users,
    title: 'Join Study Groups',
    description: 'Learning with peers helps you understand concepts better and stay motivated.'
  },
  {
    icon: Heart,
    title: 'Take Care of Yourself',
    description: 'Sleep well, eat healthy, and exercise. A healthy mind needs a healthy body.'
  }
];

// Motivational quotes
const motivationalQuotes = [
  { quote: 'Success is the sum of small efforts, repeated day in and day out.', author: 'Robert Collier' },
  { quote: 'The future belongs to those who believe in the beauty of their dreams.', author: 'Eleanor Roosevelt' },
  { quote: 'Education is the passport to the future.', author: 'Malcolm X' },
  { quote: 'Your limitation is only your imagination.', author: 'Unknown' }
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animation
      gsap.fromTo(
        '.hero-headline',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.2 }
      );
      gsap.fromTo(
        '.hero-subheadline',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.4 }
      );
      gsap.fromTo(
        '.hero-card',
        { opacity: 0, x: 60, scale: 0.98 },
        { opacity: 1, x: 0, scale: 1, duration: 1, ease: 'power2.out', delay: 0.3 }
      );
      gsap.fromTo(
        '.hero-social',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.6 }
      );

      // Scroll animations for sections
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

    // Rotate quotes
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length);
    }, 5000);

    return () => {
      ctx.revert();
      clearInterval(quoteInterval);
    };
  }, []);

  return (
    <div className="bg-[#0B0F1C] min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen pt-20 lg:pt-0 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F1C] via-[#0B0F1C] to-[#1a1f35]" />
        
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12 min-h-screen flex items-center">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full py-12 lg:py-0">
            {/* Left Content */}
            <div className="space-y-6 lg:space-y-8">
              <div className="space-y-4">
                <Badge className="bg-[#FF2D8F]/10 text-[#FF2D8F] border-[#FF2D8F]/20 text-xs tracking-wider">
                  TRUSTED BY 10,000+ MUT STUDENTS
                </Badge>
                <h1 className="hero-headline text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[0.95] tracking-tight">
                  Study Smarter.<br />
                  <span className="text-[#FF2D8F]">Pass Faster.</span>
                </h1>
                <p className="hero-subheadline text-lg lg:text-xl text-[#A9B1C7] max-w-lg leading-relaxed">
                  Premium revision packs for MUT students—notes, past papers, and exam predictions that actually match the syllabus.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button size="lg" className="bg-[#FF2D8F] hover:bg-[#FF2D8F]/90 text-white px-8 py-6 text-base rounded-xl">
                    Get Instant Access
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/subjects">
                  <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5 px-8 py-6 text-base rounded-xl">
                    Explore Subjects
                  </Button>
                </Link>
              </div>

              <div className="hero-social flex items-center space-x-4 pt-4">
                <div className="flex -space-x-2">
                  <img src="/images/student1.jpg" alt="Student" className="w-10 h-10 rounded-full border-2 border-[#0B0F1C] object-cover" />
                  <img src="/images/student-library.jpg" alt="Student" className="w-10 h-10 rounded-full border-2 border-[#0B0F1C] object-cover" />
                  <img src="/images/students-smiling.jpg" alt="Student" className="w-10 h-10 rounded-full border-2 border-[#0B0F1C] object-cover" />
                  <img src="/images/students-campus.jpg" alt="Student" className="w-10 h-10 rounded-full border-2 border-[#0B0F1C] object-cover" />
                </div>
                <div>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FF2D8F] text-[#FF2D8F]" />
                    ))}
                  </div>
                  <p className="text-sm text-[#A9B1C7]">4.9/5 from 10,000+ students</p>
                </div>
              </div>
            </div>

            {/* Right Card */}
            <div className="hero-card relative">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden">
                <div className="aspect-[4/3] relative">
                  <img
                    src="/images/students-group.jpg"
                    alt="MUT Students"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1C] via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-[#FF2D8F] text-white border-0">
                      NEW
                    </Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Exam predictions now live
                  </h3>
                  <p className="text-[#A9B1C7] text-sm mb-4">
                    Get ahead with our expert predictions for this semester's exams. Updated weekly.
                  </p>
                  <Link to="/resources?type=predictions" className="inline-flex items-center text-[#FF2D8F] hover:underline text-sm font-medium">
                    See what is new
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/5 backdrop-blur-md border-t border-white/10">
          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-[#A9B1C7]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Motivational Quote Banner */}
      <section className="py-8 bg-gradient-to-r from-[#FF2D8F]/20 to-[#ff6b9d]/20 border-y border-[#FF2D8F]/20">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center">
            <Quote className="w-8 h-8 text-[#FF2D8F] mx-auto mb-3" />
            <p className="text-white text-lg lg:text-xl font-medium italic">
              "{motivationalQuotes[currentQuote].quote}"
            </p>
            <p className="text-[#A9B1C7] text-sm mt-2">— {motivationalQuotes[currentQuote].author}</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={(el) => { sectionsRef.current[0] = el; }} className="py-20 lg:py-32">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-3xl mb-12 lg:mb-16">
            <p className="animate-in text-[#FF2D8F] text-sm font-semibold tracking-wider uppercase mb-4">
              Features
            </p>
            <h2 className="animate-in text-3xl lg:text-5xl font-bold text-white leading-tight">
              Everything you need—notes, papers, and predictions.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: BookOpen,
                title: 'Subject Notes',
                description: 'Structured, semester-ready notes that match the MUT syllabus perfectly.',
                image: '/images/student1.jpg'
              },
              {
                icon: FileText,
                title: 'Past Papers',
                description: 'Practice with real exams and detailed solutions from previous years.',
                image: '/images/student-library.jpg'
              },
              {
                icon: Target,
                title: 'Exam Predictions',
                description: 'High-probability topics and questions, updated each semester.',
                image: '/images/student-laptop.jpg'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="animate-in group bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:border-[#FF2D8F]/30 transition-all duration-300"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FF2D8F]/10 flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-[#FF2D8F]" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                  </div>
                  <p className="text-[#A9B1C7] text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Advice Section */}
      <section ref={(el) => { sectionsRef.current[1] = el; }} className="py-20 lg:py-32 bg-[#F6F7FB]">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="animate-in text-[#FF2D8F] text-sm font-semibold tracking-wider uppercase mb-4">
              Student Advice
            </p>
            <h2 className="animate-in text-3xl lg:text-5xl font-bold text-[#0B0F1C] leading-tight mb-6">
              Tips for Academic Success
            </h2>
            <p className="animate-in text-lg text-gray-600">
              Wisdom from students who have walked the path before you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {studentAdvice.map((advice, index) => (
              <div
                key={index}
                className="animate-in bg-white rounded-3xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#FF2D8F]/10 flex items-center justify-center mb-4">
                  <advice.icon className="w-7 h-7 text-[#FF2D8F]" />
                </div>
                <h3 className="text-lg font-semibold text-[#0B0F1C] mb-2">{advice.title}</h3>
                <p className="text-gray-600 text-sm">{advice.description}</p>
              </div>
            ))}
          </div>

          <div className="animate-in mt-12 text-center">
            <Link to="/study-tips">
              <Button className="bg-[#FF2D8F] hover:bg-[#FF2D8F]/90 text-white">
                More Study Tips
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Study Smarter Section */}
      <section ref={(el) => { sectionsRef.current[2] = el; }} className="py-20 lg:py-32">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <h2 className="animate-in text-3xl lg:text-5xl font-bold text-white leading-tight">
                Study smarter.<br />Not harder.
              </h2>
              <p className="animate-in text-lg text-[#A9B1C7] max-w-md">
                We organize the syllabus so you can focus on learning—no more hunting for notes across different sources.
              </p>
              <div className="animate-in flex items-center space-x-4 pt-4">
                <Link to="/subjects">
                  <Button className="bg-[#FF2D8F] hover:bg-[#FF2D8F]/90 text-white px-6">
                    Explore subjects
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="animate-in relative">
              <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
                <div className="aspect-[16/10] relative">
                  <img
                    src="/images/students-smiling.jpg"
                    alt="Students collaborating"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F1C]/80 via-[#0B0F1C]/40 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <Badge className="bg-white/10 text-white border-white/20 mb-3">
                      MADE FOR MUT
                    </Badge>
                    <h3 className="text-xl font-semibold text-white mb-1">
                      Syllabus-matched, semester by semester.
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section ref={(el) => { sectionsRef.current[3] = el; }} className="py-20 lg:py-32">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-3xl mb-12 lg:mb-16">
            <p className="animate-in text-[#FF2D8F] text-sm font-semibold tracking-wider uppercase mb-4">
              Subjects
            </p>
            <h2 className="animate-in text-3xl lg:text-5xl font-bold text-white leading-tight">
              All your subjects. One place.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                name: 'Mathematics',
                description: 'Pure & applied, step-by-step.',
                image: '/images/student1.jpg',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                name: 'Chemistry',
                description: 'Organic, inorganic, and lab prep.',
                image: '/images/student-library.jpg',
                color: 'from-green-500 to-emerald-500'
              },
              {
                name: 'Biology',
                description: 'Cell biology, ecology, and genetics.',
                image: '/images/students-smiling.jpg',
                color: 'from-purple-500 to-pink-500'
              },
              {
                name: 'Physics',
                description: 'Mechanics, electricity, and modern physics.',
                image: '/images/student-laptop.jpg',
                color: 'from-orange-500 to-red-500'
              }
            ].map((subject, index) => (
              <Link
                key={index}
                to={`/subjects?subject=${subject.name.toLowerCase()}`}
                className="animate-in group relative bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="grid md:grid-cols-2">
                  <div className="p-6 lg:p-8 flex flex-col justify-center">
                    <h3 className="text-xl lg:text-2xl font-bold text-[#0B0F1C] mb-2">{subject.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{subject.description}</p>
                    <div className="flex items-center text-[#FF2D8F] text-sm font-medium">
                      Explore
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                  <div className="aspect-square md:aspect-auto">
                    <img
                      src={subject.image}
                      alt={subject.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section ref={(el) => { sectionsRef.current[4] = el; }} className="py-20 lg:py-32">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-3xl mb-12 lg:mb-16">
            <p className="animate-in text-[#FF2D8F] text-sm font-semibold tracking-wider uppercase mb-4">
              Resources
            </p>
            <h2 className="animate-in text-3xl lg:text-5xl font-bold text-white leading-tight">
              Exam-ready resources.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Notes',
                description: 'Structured, printable, easy to review.',
                image: '/images/student1.jpg'
              },
              {
                title: 'Past Papers',
                description: 'Practice under exam conditions.',
                image: '/images/student-library.jpg'
              },
              {
                title: 'Predictions',
                description: 'Focus on what matters most.',
                image: '/images/student-laptop.jpg'
              },
              {
                title: 'Books',
                description: 'Motivation + mindset for students.',
                image: '/images/students-campus.jpg'
              }
            ].map((resource, index) => (
              <Link
                key={index}
                to={`/resources?type=${resource.title.toLowerCase().replace(' ', '-')}`}
                className="animate-in group relative aspect-[16/9] rounded-3xl overflow-hidden"
              >
                <img
                  src={resource.image}
                  alt={resource.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1C] via-[#0B0F1C]/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-xl font-semibold text-white mb-1">{resource.title}</h3>
                  <p className="text-[#A9B1C7] text-sm">{resource.description}</p>
                </div>
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 rounded-full bg-[#FF2D8F] flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section ref={(el) => { sectionsRef.current[5] = el; }} className="py-20 lg:py-32 bg-[#F6F7FB]">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <p className="animate-in text-[#FF2D8F] text-sm font-semibold tracking-wider uppercase">
                Community
              </p>
              <h2 className="animate-in text-3xl lg:text-5xl font-bold text-[#0B0F1C] leading-tight">
                Built for MUT students.
              </h2>
              <p className="animate-in text-lg text-gray-600 max-w-md">
                Study with materials made by students who understand the workload, the deadlines, and the pressure.
              </p>
              <Link to="/about" className="animate-in inline-flex items-center text-[#FF2D8F] font-medium hover:underline">
                Meet the team
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            <div className="animate-in grid grid-cols-3 gap-3">
              <img src="/images/student1.jpg" alt="Student" className="rounded-2xl aspect-square object-cover" />
              <img src="/images/student-library.jpg" alt="Student" className="rounded-2xl aspect-[3/4] object-cover" />
              <img src="/images/students-smiling.jpg" alt="Student" className="rounded-2xl aspect-square object-cover" />
              <img src="/images/student-laptop.jpg" alt="Student" className="rounded-2xl aspect-[3/4] object-cover" />
              <img src="/images/students-campus.jpg" alt="Student" className="rounded-2xl aspect-square object-cover" />
              <img src="/images/students-group.jpg" alt="Student" className="rounded-2xl aspect-[3/4] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={(el) => { sectionsRef.current[6] = el; }} className="py-20 lg:py-32">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-3xl mb-12 lg:mb-16">
            <p className="animate-in text-[#FF2D8F] text-sm font-semibold tracking-wider uppercase mb-4">
              Testimonials
            </p>
            <h2 className="animate-in text-3xl lg:text-5xl font-bold text-white leading-tight">
              What students say.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 6).map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="animate-in bg-white rounded-3xl p-6 lg:p-8"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FF2D8F] text-[#FF2D8F]" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-[#FF2D8F]/20 mb-4" />
                <p className="text-[#0B0F1C] mb-6 leading-relaxed">{testimonial.quote}</p>
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
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/testimonials">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/5">
                View all success stories
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section ref={(el) => { sectionsRef.current[7] = el; }} className="py-20 lg:py-32 bg-[#F6F7FB]">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="animate-in text-[#FF2D8F] text-sm font-semibold tracking-wider uppercase mb-4">
              Pricing
            </p>
            <h2 className="animate-in text-3xl lg:text-5xl font-bold text-[#0B0F1C] leading-tight">
              Simple pricing. No surprises.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Single Unit',
                price: '199',
                description: 'One unit. Lifetime access.',
                features: ['One specific unit', 'Lifetime access', 'Watermarked PDF', '3 downloads'],
                cta: 'Choose Plan',
                popular: false
              },
              {
                name: 'Semester Bundle',
                price: '999',
                description: 'All 7-8 units. Expires at semester end.',
                features: ['All 7-8 units', 'Save 30% vs individual', 'Access expires end of semester', '3 downloads per file'],
                cta: 'Choose Plan',
                popular: true
              },
              {
                name: 'Year Bundle',
                price: '1,899',
                description: 'Both semesters. Best value.',
                features: ['Both semesters (15+ units)', 'Save even more', 'Access expires end of year', '3 downloads per file'],
                cta: 'Choose Plan',
                popular: false
              }
            ].map((plan, index) => (
              <div
                key={index}
                className={`animate-in relative bg-white rounded-3xl p-6 lg:p-8 ${
                  plan.popular ? 'ring-2 ring-[#FF2D8F] shadow-xl' : 'border border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-[#FF2D8F] text-white border-0 px-4">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-[#0B0F1C] mb-2">{plan.name}</h3>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-3xl lg:text-4xl font-bold text-[#0B0F1C]">KES {plan.price}</span>
                  </div>
                  <p className="text-gray-500 text-sm mt-2">{plan.description}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-[#FF2D8F]" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/pricing">
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? 'bg-[#FF2D8F] hover:bg-[#FF2D8F]/90 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-[#0B0F1C]'
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          <p className="animate-in text-center text-gray-500 text-sm mt-8">
            Secure payment via M-PESA or Stripe. 30-day money-back guarantee.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={(el) => { sectionsRef.current[8] = el; }} className="py-20 lg:py-32">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <p className="animate-in text-[#FF2D8F] text-sm font-semibold tracking-wider uppercase mb-4">
                FAQ
              </p>
              <h2 className="animate-in text-3xl lg:text-5xl font-bold text-white leading-tight">
                Questions? Answered.
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqData.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="animate-in bg-white/5 border border-white/10 rounded-2xl px-6"
                >
                  <AccordionTrigger className="text-left text-white font-semibold hover:no-underline py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#A9B1C7] pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="animate-in text-center mt-12">
              <p className="text-[#A9B1C7] mb-4">Still have questions?</p>
              <Link to="/contact">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/5">
                  Contact us
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section ref={(el) => { sectionsRef.current[9] = el; }} className="py-20 lg:py-32">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="animate-in text-3xl lg:text-5xl font-bold text-white mb-4">
              Start studying smarter today.
            </h2>
            <p className="animate-in text-lg text-[#A9B1C7] mb-8">
              Get a free sample pack + weekly study tips delivered to your inbox.
            </p>
            <form className="animate-in flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-transparent border border-white/20 rounded-xl text-white placeholder:text-[#A9B1C7]/60 focus:border-[#FF2D8F] focus:outline-none"
              />
              <Button className="bg-[#FF2D8F] hover:bg-[#FF2D8F]/90 text-white px-6">
                Get free pack
              </Button>
            </form>
            <p className="animate-in text-xs text-[#A9B1C7]/60 mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
