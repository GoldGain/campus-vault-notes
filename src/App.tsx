import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from '@/components/ui/sonner';

// Layout
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Subjects from './pages/Subjects';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Books from './pages/Books';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MembersArea from './pages/MembersArea';
import AdminPanel from './pages/AdminPanel';
import SemesterBundle from './pages/SemesterBundle';
import YearBundle from './pages/YearBundle';
import FourYearPack from './pages/FourYearPack';
import SingleUnit from './pages/SingleUnit';
import EbookDetails from './pages/EbookDetails';
import Resources from './pages/Resources';
import StudyTips from './pages/StudyTips';
import CareerGuidance from './pages/CareerGuidance';
import MentalHealth from './pages/MentalHealth';
import ExamPreparation from './pages/ExamPreparation';
import Confessions from './pages/Confessions';
import StudyGroups from './pages/StudyGroups';
import NotFound from './pages/NotFound';

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

// Layout wrapper for pages with navbar and footer
function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0B0F1C]">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/subjects" element={<MainLayout><Subjects /></MainLayout>} />
          <Route path="/pricing" element={<MainLayout><Pricing /></MainLayout>} />
          <Route path="/about" element={<MainLayout><About /></MainLayout>} />
          <Route path="/testimonials" element={<MainLayout><Testimonials /></MainLayout>} />
          <Route path="/success-stories" element={<MainLayout><Testimonials /></MainLayout>} />
          <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
          <Route path="/faq" element={<MainLayout><FAQ /></MainLayout>} />
          <Route path="/books" element={<MainLayout><Books /></MainLayout>} />
          <Route path="/ebooks" element={<MainLayout><Books /></MainLayout>} />
          <Route path="/resources" element={<MainLayout><Resources /></MainLayout>} />
          <Route path="/study-tips" element={<MainLayout><StudyTips /></MainLayout>} />
          <Route path="/career-guidance" element={<MainLayout><CareerGuidance /></MainLayout>} />
          <Route path="/mental-health" element={<MainLayout><MentalHealth /></MainLayout>} />
          <Route path="/exam-preparation" element={<MainLayout><ExamPreparation /></MainLayout>} />
          <Route path="/confessions" element={<MainLayout><Confessions /></MainLayout>} />
          <Route path="/study-groups" element={<MainLayout><StudyGroups /></MainLayout>} />
          
          {/* Product Pages */}
          <Route path="/semester-bundle" element={<MainLayout><SemesterBundle /></MainLayout>} />
          <Route path="/year-bundle" element={<MainLayout><YearBundle /></MainLayout>} />
          <Route path="/4-year-pack" element={<MainLayout><FourYearPack /></MainLayout>} />
          <Route path="/single-unit" element={<MainLayout><SingleUnit /></MainLayout>} />
          <Route path="/ebook/:id" element={<MainLayout><EbookDetails /></MainLayout>} />
          
          {/* Auth Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/get-access" element={<Signup />} />
          
          {/* Protected Pages */}
          <Route path="/members-area" element={<MembersArea />} />
          <Route path="/dashboard" element={<MembersArea />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
          
          {/* 404 */}
          <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;
