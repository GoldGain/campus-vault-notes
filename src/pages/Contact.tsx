import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, MessageCircle, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Message sent successfully! We will get back to you within 24 hours.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="bg-[#0B0F1C] min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="bg-[#FF2D8F]/10 text-[#FF2D8F] border-[#FF2D8F]/20 mb-4">
              CONTACT US
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Get in touch
            </h1>
            <p className="text-lg text-[#A9B1C7]">
              Have questions? We are here to help. Reach out to us and we will respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: Mail,
                title: 'Email',
                content: 'info@campusvault.co.ke',
                link: 'mailto:info@campusvault.co.ke'
              },
              {
                icon: Phone,
                title: 'Phone',
                content: '+254 720 123 456',
                link: 'tel:+254720123456'
              },
              {
                icon: MapPin,
                title: 'Location',
                content: 'Murang\'a University of Technology',
                link: '#'
              }
            ].map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:border-[#FF2D8F]/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FF2D8F]/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-[#FF2D8F]" />
                </div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-[#A9B1C7] text-sm">{item.content}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Send us a message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-[#A9B1C7] mb-2">Name</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="bg-white/5 border-white/10 text-white placeholder:text-[#A9B1C7]/50 focus:border-[#FF2D8F]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#A9B1C7] mb-2">Email</label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="bg-white/5 border-white/10 text-white placeholder:text-[#A9B1C7]/50 focus:border-[#FF2D8F]"
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-[#A9B1C7] mb-2">Phone (optional)</label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+254..."
                      className="bg-white/5 border-white/10 text-white placeholder:text-[#A9B1C7]/50 focus:border-[#FF2D8F]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#A9B1C7] mb-2">Subject</label>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      className="bg-white/5 border-white/10 text-white placeholder:text-[#A9B1C7]/50 focus:border-[#FF2D8F]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-[#A9B1C7] mb-2">Message</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    rows={5}
                    className="bg-white/5 border-white/10 text-white placeholder:text-[#A9B1C7]/50 focus:border-[#FF2D8F] resize-none"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#FF2D8F] hover:bg-[#FF2D8F]/90 text-white"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {[
                    { q: 'How quickly do you respond?', a: 'We typically respond within 24 hours during business days.' },
                    { q: 'Can I call for urgent issues?', a: 'Yes, our phone line is open 9 AM - 6 PM, Monday to Saturday.' },
                    { q: 'Do you offer support in Swahili?', a: 'Yes, our support team can assist you in both English and Swahili.' }
                  ].map((faq, index) => (
                    <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <h3 className="text-white font-medium mb-2 flex items-center">
                        <MessageCircle className="w-4 h-4 text-[#FF2D8F] mr-2" />
                        {faq.q}
                      </h3>
                      <p className="text-[#A9B1C7] text-sm">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="w-5 h-5 text-[#FF2D8F]" />
                  <h3 className="text-white font-semibold">Business Hours</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#A9B1C7]">Monday - Friday</span>
                    <span className="text-white">8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#A9B1C7]">Saturday</span>
                    <span className="text-white">9:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#A9B1C7]">Sunday</span>
                    <span className="text-white">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
