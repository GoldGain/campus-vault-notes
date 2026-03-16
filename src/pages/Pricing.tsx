import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Star, Shield, Clock, Download, Users, Zap, CreditCard, Smartphone, ArrowRight, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

const pricingPlans = [
  {
    id: 'single',
    name: 'Single Unit',
    price: '199',
    description: 'Perfect for retakes or catching up on one specific unit.',
    features: [
      'One specific unit of your choice',
      'Lifetime access to that unit',
      'All notes, past papers & predictions',
      'Watermarked PDF downloads',
      '3 downloads per file',
      'Email support'
    ],
    cta: 'Get Started',
    popular: false,
    badge: null,
    savings: null
  },
  {
    id: 'semester',
    name: 'Semester Bundle',
    price: '999',
    description: 'All units for one semester. Our most popular plan!',
    features: [
      'ALL 7-8 units for one semester',
      'Save 30% vs buying individually',
      'All notes, past papers & predictions',
      'Watermarked PDF downloads',
      '3 downloads per file',
      'Priority email support',
      'Early access to predictions'
    ],
    cta: 'Get Started',
    popular: true,
    badge: 'Most Popular',
    savings: 'Save KES 593'
  },
  {
    id: 'year',
    name: 'Year Bundle',
    price: '1,899',
    description: 'Both semesters. Best value for serious students.',
    features: [
      'Both semesters (15+ units)',
      'Save even more vs semester bundles',
      'All notes, past papers & predictions',
      'Watermarked PDF downloads',
      '3 downloads per file',
      'Priority support',
      'Early access to predictions',
      'Bonus study guides'
    ],
    cta: 'Get Started',
    popular: false,
    badge: 'Best Value',
    savings: 'Save KES 99 + more'
  }
];

const fourYearPlan = {
  id: 'fouryear',
  name: '4-Year Complete Pack',
  price: '4,999',
  originalPrice: '7,996',
  description: 'Everything from Year 1 to Year 4. Never expires.',
  features: [
    'Everything from Year 1 to 4',
    'Never expires - lifetime access',
    'All subjects & education units',
    'All notes, past papers & predictions',
    'Unlimited downloads',
    'VIP priority support',
    'First access to new materials',
    'Exclusive study guides',
    'Career guidance resources'
  ],
  cta: 'Get Lifetime Access',
  popular: false,
  badge: 'Ultimate',
  savings: 'Save KES 2,997'
};

const ebookPlans = [
  {
    id: 'ebook-single',
    name: 'Single E-Book',
    price: '199',
    description: '48 Laws of Power - Complete PDF',
    features: [
      'Complete book in PDF format',
      'Watermarked with your details',
      'Instant download after payment',
      'Readable on any device'
    ],
    cta: 'Buy Now'
  },
  {
    id: 'ebook-premium',
    name: 'Premium E-Book Pack',
    price: '299',
    description: 'PDF + ePub + Bonus Materials',
    features: [
      'PDF + ePub formats',
      'Summary notes for each law',
      'How to Apply as a Student guide',
      'Printable law cheat sheet',
      'Instant download'
    ],
    cta: 'Buy Premium',
    popular: true
  }
];

export default function Pricing() {
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'stripe'>('mpesa');
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

  const handlePayment = (planId: string) => {
    toast.info(`Redirecting to ${paymentMethod === 'mpesa' ? 'M-PESA' : 'Stripe'} payment...`);
    // In production, this would redirect to the actual payment gateway
  };

  return (
    <div className="bg-[#0B0F1C] min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="bg-[#FF2D8F]/10 text-[#FF2D8F] border-[#FF2D8F]/20 mb-4">
              PRICING
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Simple pricing.<br />
              <span className="text-[#FF2D8F]">No surprises.</span>
            </h1>
            <p className="text-lg text-[#A9B1C7]">
              Choose the plan that works best for you. All plans include watermarked downloads 
              and access to our comprehensive study materials.
            </p>
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-8">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <p className="text-[#A9B1C7] text-sm">Payment methods:</p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-full">
                <Smartphone className="w-4 h-4 text-green-500" />
                <span className="text-white text-sm">M-PESA</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-full">
                <CreditCard className="w-4 h-4 text-blue-500" />
                <span className="text-white text-sm">Stripe (Cards)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Pricing Cards */}
      <section ref={(el) => { sectionsRef.current[0] = el; }} className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <Tabs defaultValue="materials" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="bg-white/5 border border-white/10">
                <TabsTrigger value="materials" className="data-[state=active]:bg-[#FF2D8F] data-[state=active]:text-white">
                  Study Materials
                </TabsTrigger>
                <TabsTrigger value="ebooks" className="data-[state=active]:bg-[#FF2D8F] data-[state=active]:text-white">
                  E-Books
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="materials">
              <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
                {pricingPlans.map((plan, index) => (
                  <div
                    key={plan.id}
                    className={`animate-in relative bg-white/5 backdrop-blur-sm border ${
                      plan.popular ? 'border-[#FF2D8F] ring-2 ring-[#FF2D8F]/20' : 'border-white/10'
                    } rounded-3xl p-6 lg:p-8`}
                  >
                    {plan.badge && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <Badge className={`${plan.popular ? 'bg-[#FF2D8F]' : 'bg-[#0B0F1C]'} text-white border-0 px-4`}>
                          {plan.badge}
                        </Badge>
                      </div>
                    )}

                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-4xl lg:text-5xl font-bold text-white">KES {plan.price}</span>
                      </div>
                      {plan.savings && (
                        <p className="text-[#FF2D8F] text-sm mt-1">{plan.savings}</p>
                      )}
                      <p className="text-[#A9B1C7] text-sm mt-3">{plan.description}</p>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start space-x-3">
                          <Check className="w-5 h-5 text-[#FF2D8F] flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-[#A9B1C7]">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      onClick={() => handlePayment(plan.id)}
                      className={`w-full ${
                        plan.popular
                          ? 'bg-[#FF2D8F] hover:bg-[#FF2D8F]/90 text-white'
                          : 'bg-white/10 hover:bg-white/20 text-white'
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="ebooks">
              <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
                {ebookPlans.map((plan, index) => (
                  <div
                    key={plan.id}
                    className={`animate-in relative bg-white/5 backdrop-blur-sm border ${
                      plan.popular ? 'border-[#FF2D8F] ring-2 ring-[#FF2D8F]/20' : 'border-white/10'
                    } rounded-3xl p-6 lg:p-8`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <Badge className="bg-[#FF2D8F] text-white border-0 px-4">
                          Recommended
                        </Badge>
                      </div>
                    )}

                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-4xl font-bold text-white">KES {plan.price}</span>
                      </div>
                      <p className="text-[#A9B1C7] text-sm mt-3">{plan.description}</p>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start space-x-3">
                          <Check className="w-5 h-5 text-[#FF2D8F] flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-[#A9B1C7]">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      onClick={() => handlePayment(plan.id)}
                      className={`w-full ${
                        plan.popular
                          ? 'bg-[#FF2D8F] hover:bg-[#FF2D8F]/90 text-white'
                          : 'bg-white/10 hover:bg-white/20 text-white'
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* 4-Year Pack Highlight */}
      <section ref={(el) => { sectionsRef.current[1] = el; }} className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="animate-in bg-gradient-to-br from-[#FF2D8F] to-[#ff6b9d] rounded-3xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <Badge className="bg-white/20 text-white border-white/30 mb-4">
                  {fourYearPlan.badge}
                </Badge>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  {fourYearPlan.name}
                </h2>
                <div className="flex items-baseline space-x-3 mb-4">
                  <span className="text-5xl lg:text-6xl font-bold text-white">
                    KES {fourYearPlan.price}
                  </span>
                  <span className="text-white/60 line-through text-xl">
                    KES {fourYearPlan.originalPrice}
                  </span>
                </div>
                <p className="text-white/80 text-lg mb-6">{fourYearPlan.description}</p>
                <p className="text-white font-semibold mb-6">{fourYearPlan.savings}</p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={() => handlePayment(fourYearPlan.id)}
                    size="lg"
                    className="bg-white text-[#FF2D8F] hover:bg-white/90 px-8"
                  >
                    {fourYearPlan.cta}
                  </Button>
                  <div className="flex items-center space-x-2 text-white/80">
                    <HelpCircle className="w-5 h-5" />
                    <span className="text-sm">Payment plan available</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-4">What's included:</h3>
                <ul className="space-y-3">
                  {fourYearPlan.features.map((feature, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                      <span className="text-white/90">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section ref={(el) => { sectionsRef.current[2] = el; }} className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'Secure Payment', description: 'M-PESA & Stripe encrypted' },
              { icon: Clock, title: 'Instant Access', description: 'Within 5 minutes' },
              { icon: Download, title: 'Watermarked', description: 'Your name on every page' },
              { icon: Zap, title: '30-Day Guarantee', description: 'Money back if not satisfied' }
            ].map((badge, index) => (
              <div
                key={index}
                className="animate-in bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FF2D8F]/10 flex items-center justify-center mx-auto mb-4">
                  <badge.icon className="w-6 h-6 text-[#FF2D8F]" />
                </div>
                <h3 className="text-white font-semibold mb-1">{badge.title}</h3>
                <p className="text-[#A9B1C7] text-sm">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section ref={(el) => { sectionsRef.current[3] = el; }} className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="animate-in text-2xl lg:text-3xl font-bold text-white mb-4">
              Compare Plans
            </h2>
            <p className="animate-in text-[#A9B1C7]">
              See what's included in each plan to make the best choice.
            </p>
          </div>

          <div className="animate-in overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 text-[#A9B1C7] font-medium">Feature</th>
                  <th className="text-center py-4 px-4 text-white font-semibold">Single Unit</th>
                  <th className="text-center py-4 px-4 text-[#FF2D8F] font-semibold">Semester</th>
                  <th className="text-center py-4 px-4 text-white font-semibold">Year</th>
                  <th className="text-center py-4 px-4 text-white font-semibold">4-Year</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Price', single: 'KES 199', semester: 'KES 999', year: 'KES 1,899', fouryear: 'KES 4,999' },
                  { feature: 'Units', single: '1', semester: '7-8', year: '15+', fouryear: 'All' },
                  { feature: 'Access Duration', single: 'Lifetime', semester: '1 Semester', year: '1 Year', fouryear: 'Lifetime' },
                  { feature: 'Notes', single: true, semester: true, year: true, fouryear: true },
                  { feature: 'Past Papers', single: true, semester: true, year: true, fouryear: true },
                  { feature: 'Predictions', single: true, semester: true, year: true, fouryear: true },
                  { feature: 'Downloads per file', single: '3', semester: '3', year: '3', fouryear: 'Unlimited' },
                  { feature: 'Priority Support', single: false, semester: true, year: true, fouryear: true },
                  { feature: 'Early Access', single: false, semester: true, year: true, fouryear: true },
                  { feature: 'Bonus Guides', single: false, semester: false, year: true, fouryear: true },
                ].map((row, index) => (
                  <tr key={index} className="border-b border-white/5">
                    <td className="py-4 px-4 text-[#A9B1C7]">{row.feature}</td>
                    <td className="text-center py-4 px-4">
                      {typeof row.single === 'boolean' ? (
                        row.single ? <Check className="w-5 h-5 text-[#FF2D8F] mx-auto" /> : <span className="text-white/20">—</span>
                      ) : (
                        <span className="text-white">{row.single}</span>
                      )}
                    </td>
                    <td className="text-center py-4 px-4 bg-[#FF2D8F]/5">
                      {typeof row.semester === 'boolean' ? (
                        row.semester ? <Check className="w-5 h-5 text-[#FF2D8F] mx-auto" /> : <span className="text-white/20">—</span>
                      ) : (
                        <span className="text-white">{row.semester}</span>
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      {typeof row.year === 'boolean' ? (
                        row.year ? <Check className="w-5 h-5 text-[#FF2D8F] mx-auto" /> : <span className="text-white/20">—</span>
                      ) : (
                        <span className="text-white">{row.year}</span>
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      {typeof row.fouryear === 'boolean' ? (
                        row.fouryear ? <Check className="w-5 h-5 text-[#FF2D8F] mx-auto" /> : <span className="text-white/20">—</span>
                      ) : (
                        <span className="text-white">{row.fouryear}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Pricing Questions
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                q: 'Can I upgrade my plan later?',
                a: 'Yes! You can upgrade anytime. We will prorate the difference based on your current plan.'
              },
              {
                q: 'What happens after semester ends?',
                a: 'Semester bundle access expires. You can purchase the new semester bundle to continue.'
              },
              {
                q: 'Is there a payment plan for 4-Year Pack?',
                a: 'Yes! Pay KES 2,500 now and KES 2,499 later. Contact us to set this up.'
              },
              {
                q: 'Can I get a refund?',
                a: 'We offer a 30-day money-back guarantee if you are not satisfied with our materials.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-2">{faq.q}</h3>
                <p className="text-[#A9B1C7] text-sm">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-[#A9B1C7] mb-4">Still have questions?</p>
            <Link to="/contact">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/5">
                Contact us
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
