import { useState } from 'react';
import { Search, HelpCircle, BookOpen, CreditCard, Download, Users, Shield, Clock, MessageCircle, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const faqCategories = [
  {
    id: 'general',
    name: 'General',
    icon: HelpCircle,
    questions: [
      {
        q: 'What is CampusVault?',
        a: 'CampusVault is a digital study platform designed specifically for Bachelor of Education Science students at Murang\'a University of Technology. We provide comprehensive revision materials including notes, past papers, exam predictions, and motivational books.'
      },
      {
        q: 'Who can use CampusVault?',
        a: 'CampusVault is primarily designed for MUT students pursuing Bachelor of Education Science. However, students from other courses who share similar subjects may also find our resources helpful.'
      },
      {
        q: 'How do I get started?',
        a: 'Simply create an account, choose a pricing plan that suits you, make payment via M-PESA or Stripe, and you will have instant access to all materials included in your plan.'
      },
      {
        q: 'Is CampusVault affiliated with MUT?',
        a: 'CampusVault is an independent platform created by MUT alumni and students. While we are not officially affiliated with the university, our materials are carefully curated to match the MUT syllabus.'
      }
    ]
  },
  {
    id: 'payment',
    name: 'Payment & Pricing',
    icon: CreditCard,
    questions: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept M-PESA for Kenyan students and Stripe (credit/debit cards) for international students. Both methods are secure and encrypted.'
      },
      {
        q: 'How do I pay via M-PESA?',
        a: 'During checkout, select M-PESA as your payment method. You will receive a prompt on your phone to enter your M-PESA PIN. Once confirmed, your account will be activated within 5 minutes.'
      },
      {
        q: 'Can I get a refund?',
        a: 'Yes, we offer a 30-day money-back guarantee. If you are not satisfied with our materials, contact us within 30 days of purchase for a full refund.'
      },
      {
        q: 'Is there a payment plan for the 4-Year Pack?',
        a: 'Yes! You can pay KES 2,500 upfront and the remaining KES 2,499 within 30 days. Contact our support team to set up a payment plan.'
      },
      {
        q: 'What happens when my semester bundle expires?',
        a: 'Your access will be suspended at the end of the semester. You can purchase a new semester bundle to continue accessing materials for the next semester.'
      }
    ]
  },
  {
    id: 'access',
    name: 'Access & Downloads',
    icon: Download,
    questions: [
      {
        q: 'How do I access my purchased materials?',
        a: 'After payment, log in to your account and go to the Members Area. All your purchased materials will be available there for download or online viewing.'
      },
      {
        q: 'Can I download the materials?',
        a: 'Yes, you can download watermarked PDFs. Each file shows your name and phone number on every page for security purposes.'
      },
      {
        q: 'How many times can I download a file?',
        a: 'You can download each file up to 3 times. This limit helps prevent unauthorized sharing while giving you flexibility.'
      },
      {
        q: 'Can I access materials offline?',
        a: 'Yes, once you download the PDFs, you can view them offline on any device that supports PDF viewing.'
      },
      {
        q: 'What devices are supported?',
        a: 'Our platform works on all devices—computers, tablets, and smartphones. You can also install our PWA app on Android devices.'
      }
    ]
  },
  {
    id: 'content',
    name: 'Content & Materials',
    icon: BookOpen,
    questions: [
      {
        q: 'How often are materials updated?',
        a: 'We update our materials every semester to match the latest MUT syllabus. Exam predictions are released 2 weeks before exams.'
      },
      {
        q: 'Are the exam predictions accurate?',
        a: 'Our predictions have an 85% accuracy rate based on past exam patterns and syllabus analysis. However, we recommend studying all topics, not just predicted ones.'
      },
      {
        q: 'Do you have materials for all subjects?',
        a: 'Yes, we cover all core subjects for Education Science: Mathematics, Chemistry, Biology, Physics, and all professional education units.'
      },
      {
        q: 'Can I request specific materials?',
        a: 'Yes! If you need materials for a specific topic or unit that is not available, contact us and we will do our best to add it.'
      }
    ]
  },
  {
    id: 'account',
    name: 'Account & Security',
    icon: Shield,
    questions: [
      {
        q: 'Can I share my account?',
        a: 'No. Each account is personal and watermarked with your details. Sharing violates our terms and will result in permanent account ban without refund.'
      },
      {
        q: 'How do I reset my password?',
        a: 'Click on "Forgot Password" on the login page. Enter your email address, and we will send you a password reset link.'
      },
      {
        q: 'Can I change my email address?',
        a: 'Yes, you can update your email address in your account settings. You will need to verify the new email address.'
      },
      {
        q: 'Is my personal information secure?',
        a: 'Absolutely. We use industry-standard encryption and never share your personal information with third parties.'
      }
    ]
  },
  {
    id: 'support',
    name: 'Support',
    icon: MessageCircle,
    questions: [
      {
        q: 'How do I contact support?',
        a: 'You can reach us via email at info@campusvault.co.ke, phone at +254 720 123 456, or through the contact form on our website.'
      },
      {
        q: 'What are your support hours?',
        a: 'Our support team is available Monday to Friday, 8 AM to 6 PM, and Saturday, 9 AM to 4 PM. We typically respond within 24 hours.'
      },
      {
        q: 'Do you offer tutoring services?',
        a: 'While we do not offer direct tutoring, our materials are designed to be comprehensive and self-explanatory. We also have study tips and exam preparation guides.'
      }
    ]
  },
  {
    id: 'community',
    name: 'Community Features',
    icon: Users,
    questions: [
      {
        q: 'What is Campus Confessions?',
        a: 'Campus Confessions is an anonymous space where you can share your thoughts, secrets, or stories without revealing your identity. All confessions are moderated before appearing.'
      },
      {
        q: 'How do I join a study group?',
        a: 'Go to the Study Groups page, browse groups by unit or platform (WhatsApp, Telegram, Discord), and click "Join" to open the invite link directly.'
      },
      {
        q: 'Can I create my own study group?',
        a: 'Yes! Click "Add Group" on the Study Groups page, fill in the details, and submit for review. Your group will appear after admin approval.'
      },
      {
        q: 'Is Campus Confessions really anonymous?',
        a: 'Yes, completely. We do not track who posts what. Each device gets a random session ID that cannot be traced back to you.'
      },
      {
        q: 'What happens if someone posts something inappropriate?',
        a: 'All confessions are reviewed before appearing. You can also report any content, and our team will review it within 24 hours.'
      }
    ]
  },
  {
    id: 'technical',
    name: 'Technical',
    icon: Clock,
    questions: [
      {
        q: 'Why is there a watermark on downloaded files?',
        a: 'Watermarks protect our content from unauthorized sharing. Each download includes your name and phone number to discourage piracy.'
      },
      {
        q: 'What if I exceed my download limit?',
        a: 'Each file can be downloaded 3 times. If you need more downloads, contact support and we can reset your limit for legitimate reasons.'
      },
      {
        q: 'Can I print the downloaded materials?',
        a: 'Yes, you can print the PDFs for personal study. However, the watermark will appear on printed copies as well.'
      },
      {
        q: 'The website is not loading. What should I do?',
        a: 'Try clearing your browser cache, using a different browser, or checking your internet connection. If the issue persists, contact support.'
      },
      {
        q: 'Do you have a mobile app?',
        a: 'We have a Progressive Web App (PWA) that you can install on Android devices. On iOS, you can add CampusVault to your home screen from Safari.'
      }
    ]
  }
];

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [openQuestions, setOpenQuestions] = useState<string[]>([]);

  const toggleQuestion = (questionId: string) => {
    setOpenQuestions(prev =>
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q =>
        q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="bg-[#0B0F1C] min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="bg-[#FF2D8F]/10 text-[#FF2D8F] border-[#FF2D8F]/20 mb-4">
              FAQ
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Questions? Answered.
            </h1>
            <p className="text-lg text-[#A9B1C7] mb-8">
              Find answers to frequently asked questions about CampusVault.
            </p>

            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A9B1C7]" />
              <Input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 bg-white/5 border-white/10 text-white placeholder:text-[#A9B1C7]/50 focus:border-[#FF2D8F] rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      {!searchQuery && (
        <section className="py-8 border-b border-white/10">
          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === null
                    ? 'bg-[#FF2D8F] text-white'
                    : 'bg-white/5 text-[#A9B1C7] hover:bg-white/10'
                }`}
              >
                All
              </button>
              {faqCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center space-x-2 ${
                    activeCategory === category.id
                      ? 'bg-[#FF2D8F] text-white'
                      : 'bg-white/5 text-[#A9B1C7] hover:bg-white/10'
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Content */}
      <section className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-3xl mx-auto space-y-8">
            {(searchQuery ? filteredCategories : activeCategory
              ? faqCategories.filter(c => c.id === activeCategory)
              : faqCategories
            ).map(category => (
              <div key={category.id}>
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <category.icon className="w-5 h-5 text-[#FF2D8F] mr-2" />
                  {category.name}
                </h2>
                <div className="space-y-3">
                  {category.questions.map((q, index) => {
                    const questionId = `${category.id}-${index}`;
                    const isOpen = openQuestions.includes(questionId);
                    
                    return (
                      <div
                        key={index}
                        className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
                      >
                        <button
                          onClick={() => toggleQuestion(questionId)}
                          className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
                        >
                          <span className="text-white font-medium pr-4">{q.q}</span>
                          <ChevronDown
                            className={`w-5 h-5 text-[#FF2D8F] flex-shrink-0 transition-transform ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4">
                            <p className="text-[#A9B1C7] leading-relaxed">{q.a}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {searchQuery && filteredCategories.length === 0 && (
              <div className="text-center py-12">
                <HelpCircle className="w-12 h-12 text-[#A9B1C7]/30 mx-auto mb-4" />
                <p className="text-[#A9B1C7]">No results found for "{searchQuery}"</p>
                <p className="text-[#A9B1C7]/60 text-sm mt-2">
                  Try different keywords or browse by category
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="bg-gradient-to-r from-[#FF2D8F] to-[#ff6b9d] rounded-3xl p-8 lg:p-12 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Still have questions?
            </h2>
            <p className="text-white/80 mb-6">
              Can not find what you are looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:info@campusvault.co.ke"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#FF2D8F] rounded-lg font-medium hover:bg-white/90 transition-colors"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Email Support
              </a>
              <a
                href="tel:+254720123456"
                className="inline-flex items-center justify-center px-6 py-3 border border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
              >
                <Clock className="w-4 h-4 mr-2" />
                Call Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
