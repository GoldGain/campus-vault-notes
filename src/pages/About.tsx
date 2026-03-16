import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, BookOpen, Users, Target, Heart, Lightbulb, ArrowRight, Quote, Star, Award, Calendar, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: BookOpen,
    title: 'Quality First',
    description: 'Every note, every paper, every prediction is carefully curated and verified for accuracy.'
  },
  {
    icon: Users,
    title: 'Student-Centered',
    description: 'We exist to serve students. Every decision we make puts student success first.'
  },
  {
    icon: Target,
    title: 'Results Driven',
    description: 'Our materials are designed to help you pass exams, not just study harder.'
  },
  {
    icon: Heart,
    title: 'Passionate Team',
    description: 'We are former MUT students who understand the struggle and want to help.'
  }
];

const milestones = [
  {
    year: '2020',
    title: 'The Beginning',
    description: 'CampusVault started as a small WhatsApp group sharing notes among friends.'
  },
  {
    year: '2021',
    title: 'First 1,000 Students',
    description: 'Word spread quickly, and we reached our first milestone of 1,000 active students.'
  },
  {
    year: '2022',
    title: 'Platform Launch',
    description: 'We built our first website to better organize and distribute study materials.'
  },
  {
    year: '2023',
    title: '5,000 Students',
    description: 'Half of all Education Science students at MUT were using CampusVault.'
  },
  {
    year: '2024',
    title: 'Major Expansion',
    description: 'Added all subjects, past papers, and exam predictions to our offerings.'
  },
  {
    year: '2025',
    title: '10,000+ Students',
    description: 'Reached over 10,000 active students with a 98% success rate.'
  }
];

const team = [
  {
    name: 'Dr. Sarah Kimani',
    role: 'Academic Advisor',
    image: '/images/student-library.jpg',
    bio: 'Former lecturer at MUT with 15 years of experience in Education Science.'
  },
  {
    name: 'James Mwangi',
    role: 'Content Lead',
    image: '/images/student1.jpg',
    bio: 'MUT graduate who scored First Class Honors using his own study methods.'
  },
  {
    name: 'Grace Ochieng',
    role: 'Student Success',
    image: '/images/students-smiling.jpg',
    bio: 'Passionate about helping students achieve their academic goals.'
  },
  {
    name: 'Peter Njoroge',
    role: 'Technical Lead',
    image: '/images/student-laptop.jpg',
    bio: 'Software engineer dedicated to building tools that help students learn.'
  }
];

// Student success stories
const successStories = [
  {
    name: 'Grace Ndinda',
    course: 'Nursing Student',
    achievement: 'Top 5% of her class',
    quote: 'CampusVault taught me how to study effectively. The tips here work for any course!',
    image: '/images/grace-ndinda.jpg'
  },
  {
    name: 'Brian Ochieng',
    course: 'Education Science',
    achievement: 'First Class Honors',
    quote: 'The organized notes and past papers were exactly what I needed to excel.',
    image: '/images/student1.jpg'
  },
  {
    name: 'Faith Muthoni',
    course: 'Education Science',
    achievement: 'Scored A in Physics',
    quote: 'From a D to an A! CampusVault made the impossible possible.',
    image: '/images/student-library.jpg'
  }
];

export default function About() {
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
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <Badge className="bg-[#FF2D8F]/10 text-[#FF2D8F] border-[#FF2D8F]/20 mb-4">
                ABOUT US
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Built by students,<br />
                <span className="text-[#FF2D8F]">for students.</span>
              </h1>
              <p className="text-lg text-[#A9B1C7] max-w-xl mb-8">
                CampusVault was born from a simple idea: every student deserves access to quality 
                study materials. What started as sharing notes among friends has grown into 
                Murang'a University of Technology's most trusted study platform.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/testimonials">
                  <Button className="bg-[#FF2D8F] hover:bg-[#FF2D8F]/90 text-white">
                    Success Stories
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/5">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden">
                <img
                  src="/images/students-group.jpg"
                  alt="MUT Students"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-full bg-[#FF2D8F] flex items-center justify-center">
                    <GraduationCap className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-[#0B0F1C]">10,000+</p>
                    <p className="text-gray-500">Active Students</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-white/10">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '10,000+', label: 'Active Students', icon: Users },
              { value: '500+', label: 'Study Resources', icon: BookOpen },
              { value: '98%', label: 'Success Rate', icon: Target },
              { value: '4.9/5', label: 'Student Rating', icon: Star }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-[#FF2D8F]/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-[#FF2D8F]" />
                </div>
                <p className="text-3xl lg:text-4xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-[#A9B1C7]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section ref={(el) => { sectionsRef.current[0] = el; }} className="py-20 lg:py-32">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="animate-in text-3xl lg:text-5xl font-bold text-white mb-6">
              Our Story
            </h2>
            <p className="animate-in text-lg text-[#A9B1C7]">
              From a small WhatsApp group to MUT's most trusted study platform.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`animate-in flex flex-col md:flex-row items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                      <Badge className="bg-[#FF2D8F]/10 text-[#FF2D8F] border-[#FF2D8F]/20 mb-3">
                        {milestone.year}
                      </Badge>
                      <h3 className="text-xl font-semibold text-white mb-2">{milestone.title}</h3>
                      <p className="text-[#A9B1C7]">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex w-12 h-12 rounded-full bg-[#FF2D8F] items-center justify-center z-10 my-4 md:my-0">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={(el) => { sectionsRef.current[1] = el; }} className="py-20 lg:py-32 bg-[#F6F7FB]">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="animate-in text-3xl lg:text-5xl font-bold text-[#0B0F1C] mb-6">
              Our Values
            </h2>
            <p className="animate-in text-lg text-gray-600">
              The principles that guide everything we do at CampusVault.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="animate-in bg-white rounded-3xl p-8 border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#FF2D8F]/10 flex items-center justify-center mb-6">
                  <value.icon className="w-7 h-7 text-[#FF2D8F]" />
                </div>
                <h3 className="text-xl font-semibold text-[#0B0F1C] mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professor Martin Makau Section - The Founder */}
      <section ref={(el) => { sectionsRef.current[2] = el; }} className="py-20 lg:py-32 bg-gradient-to-br from-[#1a1f35] to-[#0B0F1C]">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="bg-[#FF2D8F]/10 text-[#FF2D8F] border-[#FF2D8F]/20 mb-4">
                OUR FOUNDER
              </Badge>
              <h2 className="animate-in text-3xl lg:text-5xl font-bold text-white mb-6">
                Meet Professor Martin Makau
              </h2>
            </div>

            <div className="animate-in bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden">
              <div className="grid lg:grid-cols-2">
                <div className="aspect-[3/4] lg:aspect-auto">
                  <img
                    src="/images/martin-makau.jpg"
                    alt="Professor Martin Makau"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <Quote className="w-10 h-10 text-[#FF2D8F]/30 mb-4" />
                  
                  <div className="space-y-4 text-[#A9B1C7] leading-relaxed">
                    <p className="text-white font-medium text-lg">
                      "My journey to creating CampusVault began not in a boardroom, but in a crowded 
                      hostel room at Murang'a University of Technology back in 2018."
                    </p>
                    
                    <p>
                      As a young Education Science student, I watched my classmates struggle—not because they 
                      lacked intelligence or dedication, but because they lacked access to quality study materials.
                    </p>
                    
                    <p>
                      I remember the nights before exams, seeing friends frantically searching for notes, 
                      borrowing tattered papers from seniors, and photocopying materials that were often outdated 
                      or incomplete. The frustration was palpable.
                    </p>
                    
                    <p>
                      That inequality haunted me. I started small—organizing my own notes meticulously, 
                      sharing them with a few friends. When I saw their grades improve, something clicked. 
                      What if every student at MUT had access to the same quality of materials?
                    </p>
                    
                    <p className="text-white font-medium">
                      Today, CampusVault serves over 10,000 students, but our mission remains the same: 
                      to ensure that every student at MUT, regardless of their background, has access to 
                      the tools they need to succeed.
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10">
                    <div className="flex items-center space-x-4">
                      <Award className="w-6 h-6 text-[#FF2D8F]" />
                      <span className="text-white">First Class Honors, MUT Education Science</span>
                    </div>
                    <p className="text-[#FF2D8F] font-semibold mt-2">Founder & CEO, CampusVault</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section ref={(el) => { sectionsRef.current[3] = el; }} className="py-20 lg:py-32">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="animate-in text-3xl lg:text-5xl font-bold text-white mb-6">
              Student Success Stories
            </h2>
            <p className="animate-in text-lg text-[#A9B1C7]">
              Real students, real results. See how CampusVault has transformed academic journeys.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {successStories.map((story, index) => (
              <div
                key={index}
                className="animate-in bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden group hover:border-[#FF2D8F]/30 transition-all"
              >
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1C] via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge className="bg-[#FF2D8F] text-white border-0 mb-2">
                      {story.achievement}
                    </Badge>
                    <h3 className="text-lg font-bold text-white">{story.name}</h3>
                    <p className="text-[#A9B1C7] text-sm">{story.course}</p>
                  </div>
                </div>
                <div className="p-6">
                  <Quote className="w-6 h-6 text-[#FF2D8F]/30 mb-2" />
                  <p className="text-[#A9B1C7] text-sm italic">"{story.quote}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={(el) => { sectionsRef.current[4] = el; }} className="py-20 lg:py-32 bg-[#F6F7FB]">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="animate-in text-3xl lg:text-5xl font-bold text-[#0B0F1C] mb-6">
              Meet the Team
            </h2>
            <p className="animate-in text-lg text-gray-600">
              Passionate individuals dedicated to helping students succeed.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div
                key={index}
                className="animate-in bg-white rounded-3xl overflow-hidden shadow-lg group hover:shadow-xl transition-shadow"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[#0B0F1C] mb-1">{member.name}</h3>
                  <p className="text-[#FF2D8F] text-sm mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="bg-gradient-to-r from-[#FF2D8F] to-[#ff6b9d] rounded-3xl p-8 lg:p-16 text-center">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              Join our mission
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8 text-lg">
              Be part of the 10,000+ students who are already studying smarter with CampusVault. 
              Together, we can make academic success accessible to everyone.
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
