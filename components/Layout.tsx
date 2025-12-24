import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Rocket, Menu, X, Github, Twitter, Zap, LayoutDashboard, Plus, ChevronRight, Home, LogOut } from 'lucide-react';
import { getCurrentUser, logout } from '../services/authService';

interface LayoutProps {
  children: React.ReactNode;
}

export const PublicLayout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle smooth scrolling
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        setMobileMenuOpen(false);
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-white selection:bg-indigo-500 selection:text-white">
      {/* Modern Floating-style Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm py-3' 
            : 'bg-white/80 backdrop-blur-sm border-b border-transparent py-4'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link 
              to="/" 
              onClick={handleLogoClick}
              className="flex items-center gap-2 group"
            >
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3">
                <Rocket className="h-5 w-5 fill-current" />
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">LaunchCopy</span>
            </Link>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1 bg-white/50 backdrop-blur-sm px-2 py-1.5 rounded-full border border-slate-100 shadow-sm">
              <a 
                href="/#problem" 
                onClick={(e) => scrollToSection(e, 'problem')}
                className="px-4 py-1.5 text-sm font-semibold text-slate-600 hover:text-indigo-600 hover:bg-white rounded-full transition-all"
              >
                Problem
              </a>
              <a 
                href="/#features" 
                onClick={(e) => scrollToSection(e, 'features')}
                className="px-4 py-1.5 text-sm font-semibold text-slate-600 hover:text-indigo-600 hover:bg-white rounded-full transition-all"
              >
                Features
              </a>
              <a 
                href="/#process" 
                onClick={(e) => scrollToSection(e, 'process')}
                className="px-4 py-1.5 text-sm font-semibold text-slate-600 hover:text-indigo-600 hover:bg-white rounded-full transition-all"
              >
                How it Works
              </a>
              <a 
                href="/#testimonials" 
                onClick={(e) => scrollToSection(e, 'testimonials')}
                className="px-4 py-1.5 text-sm font-semibold text-slate-600 hover:text-indigo-600 hover:bg-white rounded-full transition-all"
              >
                Reviews
              </a>
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex gap-4 items-center">
              <Link to="/login" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">
                Log in
              </Link>
              <Link 
                to="/app/create" 
                className="group relative inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-slate-900/20 transition-all hover:bg-indigo-600 hover:-translate-y-0.5 hover:shadow-indigo-600/30"
              >
                Start for Free
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-slate-500 hover:text-indigo-600 transition-colors bg-white rounded-lg border border-slate-100 shadow-sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 border-b border-slate-100 bg-white px-4 py-6 shadow-2xl animate-in fade-in slide-in-from-top-5">
            <div className="flex flex-col gap-4">
              <a href="/#problem" onClick={(e) => scrollToSection(e, 'problem')} className="p-2 text-base font-bold text-slate-600 hover:text-indigo-600">Problem</a>
              <a href="/#features" onClick={(e) => scrollToSection(e, 'features')} className="p-2 text-base font-bold text-slate-600 hover:text-indigo-600">Features</a>
              <a href="/#process" onClick={(e) => scrollToSection(e, 'process')} className="p-2 text-base font-bold text-slate-600 hover:text-indigo-600">How it Works</a>
              <a href="/#testimonials" onClick={(e) => scrollToSection(e, 'testimonials')} className="p-2 text-base font-bold text-slate-600 hover:text-indigo-600">Reviews</a>
              <hr className="border-slate-100 my-2"/>
              <div className="grid grid-cols-2 gap-4">
                 <Link to="/login" className="flex items-center justify-center py-3 text-sm font-bold text-slate-700 bg-slate-100 rounded-xl hover:bg-slate-200" onClick={() => setMobileMenuOpen(false)}>
                  Log In
                </Link>
                <Link to="/app/create" className="flex items-center justify-center py-3 text-sm font-bold text-white bg-indigo-600 rounded-xl shadow-lg hover:bg-indigo-700" onClick={() => setMobileMenuOpen(false)}>
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
      
      {/* Spacer for fixed header */}
      <div className="h-24"></div>
      
      <main className="flex-1">{children}</main>
      
      <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 font-display font-bold text-xl text-white mb-4">
                <Rocket className="h-5 w-5 text-indigo-500" />
                <span>LaunchCopy</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                The AI copywriter for startups. Stop staring at blank pages and start converting visitors into customers.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-indigo-400 transition-colors">Features</a></li>
                <li><a href="#process" className="hover:text-indigo-400 transition-colors">How it Works</a></li>
                <li><Link to="/login" className="hover:text-indigo-400 transition-colors">Pricing</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Examples</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Help Center</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-slate-600">
              © {new Date().getFullYear()} LaunchCopy. All rights reserved.
            </div>
            <div className="flex gap-4">
              <Twitter className="h-5 w-5 hover:text-white cursor-pointer transition-colors" />
              <Github className="h-5 w-5 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;
  
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <header className="bg-white border-b border-slate-200 h-16 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex justify-between items-center">
          <div className="flex items-center gap-8">
            <Link to="/app" className="flex items-center gap-2 group">
              <div className="bg-slate-900 p-1.5 rounded-lg text-white group-hover:bg-indigo-600 transition-colors shadow-sm">
                <Rocket className="h-4 w-4 fill-current" />
              </div>
              <span className="font-display font-bold text-xl text-slate-900 hidden sm:inline">LaunchCopy</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-1">
              <Link 
                to="/app" 
                className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all ${location.pathname === '/app' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <Link 
                to="/app/create" 
                className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all ${location.pathname.includes('/create') ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}
              >
                <Plus className="h-4 w-4" />
                New Project
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
             <Link to="/" className="hidden sm:flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors">
                <Home className="h-4 w-4" />
                <span className="hidden lg:inline">Back to Home</span>
            </Link>
            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-600 bg-gradient-to-r from-amber-50 to-orange-50 border border-orange-100 px-3 py-1.5 rounded-full">
              <Zap className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
              <span>Pro Plan</span>
            </div>
            
            <div className="flex items-center gap-3">
                 <div className="h-9 w-9 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-md ring-2 ring-white border border-slate-200" title={user.username}>
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <button 
                  onClick={handleLogout}
                  className="hidden sm:flex p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Log out"
                >
                    <LogOut className="h-5 w-5" />
                </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
                className="md:hidden p-2 text-slate-500 hover:text-indigo-600 transition-colors bg-white rounded-lg border border-slate-100 shadow-sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu for App Layout */}
        {mobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 border-b border-slate-100 bg-white px-4 py-6 shadow-2xl animate-in fade-in slide-in-from-top-5">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 px-2 pb-4 mb-2 border-b border-slate-100">
                        <div className="h-10 w-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold">
                            {user.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <div className="font-bold text-slate-900">{user.username}</div>
                            <div className="text-xs text-slate-500">Free Plan</div>
                        </div>
                    </div>

                    <Link 
                        to="/app" 
                        onClick={() => setMobileMenuOpen(false)}
                        className={`p-3 rounded-xl text-sm font-bold flex items-center gap-3 ${location.pathname === '/app' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                        <LayoutDashboard className="h-5 w-5" /> Dashboard
                    </Link>
                    <Link 
                        to="/app/create" 
                        onClick={() => setMobileMenuOpen(false)}
                        className={`p-3 rounded-xl text-sm font-bold flex items-center gap-3 ${location.pathname.includes('/create') ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                        <Plus className="h-5 w-5" /> New Project
                    </Link>
                    <Link 
                        to="/" 
                        onClick={() => setMobileMenuOpen(false)}
                        className="p-3 rounded-xl text-sm font-bold flex items-center gap-3 text-slate-600 hover:bg-slate-50"
                    >
                        <Home className="h-5 w-5" /> Back to Home
                    </Link>
                    <hr className="border-slate-100 my-1"/>
                    <button 
                        onClick={handleLogout}
                        className="p-3 rounded-xl text-sm font-bold flex items-center gap-3 text-red-600 hover:bg-red-50 w-full text-left"
                    >
                        <LogOut className="h-5 w-5" /> Log Out
                    </button>
                </div>
            </div>
        )}
      </header>
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 max-w-6xl">
        {children}
      </main>
    </div>
  );
};
