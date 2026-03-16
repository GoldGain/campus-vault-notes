import { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Check, Download, BookOpen, Star, ArrowRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export default function EbookDetails() {
  const { id } = useParams();

  const handlePurchase = () => {
    toast.info('Redirecting to payment...');
  };

  return (
    <div className="bg-[#0B0F1C] min-h-screen pt-20">
      <section className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Image */}
              <div className="aspect-[3/4] max-w-md mx-auto lg:mx-0 rounded-3xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=800&fit=crop"
                  alt="The 48 Laws of Power"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div>
                <Badge className="bg-[#FF2D8F] text-white border-0 mb-4">
                  E-BOOK
                </Badge>
                <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4">
                  The 48 Laws of Power
                </h1>
                <p className="text-[#A9B1C7] mb-4">by Robert Greene</p>

                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star key={i} className="w-5 h-5 fill-[#FF2D8F] text-[#FF2D8F]" />
                    ))}
                  </div>
                  <span className="text-white">4.8/5</span>
                  <span className="text-[#A9B1C7]">(234 reviews)</span>
                </div>

                <div className="flex items-baseline space-x-3 mb-6">
                  <span className="text-4xl font-bold text-white">KES 199</span>
                  <span className="text-[#A9B1C7] line-through">KES 1,500</span>
                  <Badge className="bg-green-500/20 text-green-400">
                    Save 87%
                  </Badge>
                </div>

                <p className="text-[#A9B1C7] mb-6 leading-relaxed">
                  The ultimate guide to understanding and navigating power dynamics. Essential reading 
                  for future leaders and educators who want to understand the subtle social games that 
                  shape our world. This book will transform your perspective on influence, authority, 
                  and human behavior.
                </p>

                <div className="space-y-3 mb-8">
                  {[
                    'Complete book in PDF format',
                    'Watermarked with your details',
                    'Instant download after payment',
                    'Readable on any device'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-[#FF2D8F]" />
                      <span className="text-[#A9B1C7]">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={handlePurchase}
                    size="lg"
                    className="bg-[#FF2D8F] hover:bg-[#FF2D8F]/90 text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Buy Now - KES 199
                  </Button>
                  <Link to="/books">
                    <Button size="lg" variant="outline" className="border-white/20 text-white">
                      View All Books
                    </Button>
                  </Link>
                </div>

                <div className="flex items-center space-x-6 mt-8 pt-8 border-t border-white/10">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-[#FF2D8F]" />
                    <span className="text-[#A9B1C7] text-sm">Secure Payment</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Download className="w-5 h-5 text-[#FF2D8F]" />
                    <span className="text-[#A9B1C7] text-sm">Instant Download</span>
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
