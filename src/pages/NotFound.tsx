import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0B0F1C] flex items-center justify-center p-4">
      <div className="text-center max-w-lg">
        <div className="text-8xl font-bold text-[#FF2D8F] mb-4">404</div>
        <h1 className="text-3xl font-bold text-white mb-4">Page Not Found</h1>
        <p className="text-[#A9B1C7] mb-8">
          Oops! The page you are looking for does not exist. It might have been moved or deleted.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="bg-[#FF2D8F] hover:bg-[#FF2D8F]/90 text-white">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
          <button onClick={() => window.history.back()}>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </button>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-[#A9B1C7] text-sm mb-4">Looking for something else?</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/subjects" className="text-[#FF2D8F] hover:underline text-sm">
              Subjects
            </Link>
            <Link to="/pricing" className="text-[#FF2D8F] hover:underline text-sm">
              Pricing
            </Link>
            <Link to="/resources" className="text-[#FF2D8F] hover:underline text-sm">
              Resources
            </Link>
            <Link to="/contact" className="text-[#FF2D8F] hover:underline text-sm">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
