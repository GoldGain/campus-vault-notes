import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Download, Star, Check, ArrowRight, Shield, Clock, FileText, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

const books = [
  {
    id: '48-laws',
    title: 'The 48 Laws of Power',
    author: 'Robert Greene',
    description: 'The ultimate guide to understanding and navigating power dynamics. Essential reading for future leaders and educators.',
    price: 199,
    originalPrice: 1500,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
    rating: 4.8,
    reviews: 234,
    features: [
      'Complete book in PDF format',
      'Watermarked with your details',
      'Instant download after payment',
      'Readable on any device'
    ],
    formats: ['PDF'],
    popular: true
  },
  {
    id: '48-laws-premium',
    title: 'The 48 Laws of Power - Premium Pack',
    author: 'Robert Greene',
    description: 'The complete experience with bonus materials designed specifically for students.',
    price: 299,
    originalPrice: 2000,
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=600&fit=crop',
    rating: 4.9,
    reviews: 189,
    features: [
      'PDF + ePub formats',
      'Summary notes for each law',
      'How to Apply as a Student guide',
      'Printable law cheat sheet',
      'Instant download'
    ],
    formats: ['PDF', 'ePub'],
    popular: false,
    badge: 'Best Value'
  }
];

const bookBenefits = [
  {
    icon: BookOpen,
    title: 'Digital Format',
    description: 'Read on any device—phone, tablet, or computer'
  },
  {
    icon: Shield,
    title: 'Watermarked',
    description: 'Your copy is personalized with your details'
  },
  {
    icon: Clock,
    title: 'Instant Access',
    description: 'Download immediately after payment'
  },
  {
    icon: FileText,
    title: 'Multiple Formats',
    description: 'PDF and ePub formats available'
  }
];

const whatYouWillLearn = [
  'Understand power dynamics in any situation',
  'Navigate workplace and academic politics',
  'Build influence and authority as a future educator',
  'Protect yourself from manipulation',
  'Develop leadership skills essential for teaching',
  'Learn from historical examples of power'
];

export default function Books() {
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

  const handlePurchase = (bookId: string) => {
    toast.info('Redirecting to payment...');
  };

  return (
    <div className="bg-[#0B0F1C] min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <Badge className="bg-[#FF2D8F]/10 text-[#FF2D8F] border-[#FF2D8F]/20 mb-4">
                E-BOOKS
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Knowledge at your<br />
                <span className="text-[#FF2D8F]">fingertips</span>
              </h1>
              <p className="text-lg text-[#A9B1C7] max-w-xl mb-8">
                Access powerful books that will transform your mindset and prepare you for success 
                in your academic and professional journey.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2 text-[#A9B1C7]">
                  <Download className="w-5 h-5 text-[#FF2D8F]" />
                  <span>Instant Download</span>
                </div>
                <div className="flex items-center space-x-2 text-[#A9B1C7]">
                  <Shield className="w-5 h-5 text-[#FF2D8F]" />
                  <span>Watermarked</span>
                </div>
                <div className="flex items-center space-x-2 text-[#A9B1C7]">
                  <Star className="w-5 h-5 text-[#FF2D8F]" />
                  <span>Premium Quality</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[3/4] max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=800&fit=crop"
                  alt="The 48 Laws of Power"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl">
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star key={i} className="w-4 h-4 fill-[#FF2D8F] text-[#FF2D8F]" />
                    ))}
                  </div>
                  <span className="text-[#0B0F1C] font-semibold">4.8/5</span>
                </div>
                <p className="text-gray-500 text-sm">234 reviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Book */}
      <section ref={(el) => { sectionsRef.current[0] = el; }} className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="animate-in text-3xl lg:text-5xl font-bold text-white mb-6">
              Featured Book
            </h2>
            <p className="animate-in text-lg text-[#A9B1C7]">
              The book that every Education Science student should read.
            </p>
          </div>

          <div className="animate-in bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2">
              <div className="aspect-[3/4] lg:aspect-auto">
                <img
                  src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=800&fit=crop"
                  alt="The 48 Laws of Power"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <Badge className="bg-[#FF2D8F] text-white border-0 w-fit mb-4">
                  Bestseller
                </Badge>
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                  The 48 Laws of Power
                </h3>
                <p className="text-[#A9B1C7] mb-4">by Robert Greene</p>
                
                <div className="flex items-center space-x-2 mb-6">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star key={i} className="w-5 h-5 fill-[#FF2D8F] text-[#FF2D8F]" />
                    ))}
                  </div>
                  <span className="text-white font-semibold">4.8/5</span>
                  <span className="text-[#A9B1C7]">(234 reviews)</span>
                </div>

                <p className="text-[#A9B1C7] mb-6 leading-relaxed">
                  The ultimate guide to understanding and navigating power dynamics. Essential reading 
                  for future leaders and educators who want to understand the subtle social games that 
                  shape our world.
                </p>

                <div className="space-y-3 mb-8">
                  {books[0].features.map((feature, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-[#FF2D8F]" />
                      <span className="text-[#A9B1C7]">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-baseline space-x-3 mb-6">
                  <span className="text-4xl font-bold text-white">KES 199</span>
                  <span className="text-[#A9B1C7] line-through">KES 1,500</span>
                  <Badge className="bg-green-500/20 text-green-400 border-0">
                    Save 87%
                  </Badge>
                </div>

                <Button
                  onClick={() => handlePurchase('48-laws')}
                  className="bg-[#FF2D8F] hover:bg-[#FF2D8F]/90 text-white w-full"
                >
                  Buy Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Will Learn */}
      <section ref={(el) => { sectionsRef.current[1] = el; }} className="py-16 lg:py-24 bg-[#F6F7FB]">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="animate-in text-3xl lg:text-4xl font-bold text-[#0B0F1C] mb-6">
                What you will learn
              </h2>
              <p className="animate-in text-gray-600 mb-8">
                This book will transform your understanding of power and influence, essential skills 
                for any future educator and leader.
              </p>

              <div className="space-y-4">
                {whatYouWillLearn.map((item, index) => (
                  <div key={index} className="animate-in flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-[#FF2D8F]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Sparkles className="w-3 h-3 text-[#FF2D8F]" />
                    </div>
                    <span className="text-[#0B0F1C]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-in">
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h3 className="text-xl font-semibold text-[#0B0F1C] mb-6">
                  Why students love this book
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      name: 'Michael Otieno',
                      year: 'Year 3',
                      quote: 'This book changed my perspective on student leadership. Essential reading!'
                    },
                    {
                      name: 'Grace Wanjiku',
                      year: 'Year 2',
                      quote: 'Helped me understand classroom dynamics. A must-read for future teachers.'
                    },
                    {
                      name: 'John Kamau',
                      year: 'Year 4',
                      quote: 'The principles apply to every aspect of life, not just power.'
                    }
                  ].map((review, index) => (
                    <div key={index} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                      <p className="text-gray-600 text-sm mb-2">"{review.quote}"</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-[#0B0F1C] font-medium text-sm">{review.name}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-500 text-sm">{review.year}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section ref={(el) => { sectionsRef.current[2] = el; }} className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="animate-in text-3xl lg:text-4xl font-bold text-white mb-6">
              Choose your package
            </h2>
            <p className="animate-in text-[#A9B1C7]">
              Select the option that best fits your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {books.map((book, index) => (
              <div
                key={book.id}
                className={`animate-in bg-white/5 backdrop-blur-sm border ${
                  book.badge ? 'border-[#FF2D8F] ring-2 ring-[#FF2D8F]/20' : 'border-white/10'
                } rounded-3xl overflow-hidden`}
              >
                <div className="aspect-[16/10] relative">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1C] via-transparent to-transparent" />
                  {book.badge && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-[#FF2D8F] text-white border-0">
                        {book.badge}
                      </Badge>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{book.title}</h3>
                  <p className="text-[#A9B1C7] text-sm mb-4">{book.description}</p>

                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map(i => (
                        <Star key={i} className="w-4 h-4 fill-[#FF2D8F] text-[#FF2D8F]" />
                      ))}
                    </div>
                    <span className="text-white text-sm">{book.rating}</span>
                    <span className="text-[#A9B1C7] text-sm">({book.reviews})</span>
                  </div>

                  <div className="flex items-baseline space-x-2 mb-4">
                    <span className="text-2xl font-bold text-white">KES {book.price}</span>
                    <span className="text-[#A9B1C7] line-through text-sm">KES {book.originalPrice}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {book.formats.map(format => (
                      <Badge key={format} variant="outline" className="border-white/20 text-[#A9B1C7]">
                        {format}
                      </Badge>
                    ))}
                  </div>

                  <Button
                    onClick={() => handlePurchase(book.id)}
                    className="w-full bg-[#FF2D8F] hover:bg-[#FF2D8F]/90 text-white"
                  >
                    Buy Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section ref={(el) => { sectionsRef.current[3] = el; }} className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="animate-in text-3xl lg:text-4xl font-bold text-white mb-6">
              Why buy from CampusVault?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bookBenefits.map((benefit, index) => (
              <div
                key={index}
                className="animate-in bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FF2D8F]/10 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-6 h-6 text-[#FF2D8F]" />
                </div>
                <h3 className="text-white font-semibold mb-2">{benefit.title}</h3>
                <p className="text-[#A9B1C7] text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="bg-gradient-to-r from-[#FF2D8F] to-[#ff6b9d] rounded-3xl p-8 lg:p-16 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Start reading today
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Join thousands of students who have transformed their mindset with our e-books.
            </p>
            <Button
              onClick={() => handlePurchase('48-laws')}
              size="lg"
              className="bg-white text-[#FF2D8F] hover:bg-white/90"
            >
              Get Your Copy
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
