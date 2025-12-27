import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Check, Zap, Target, ArrowRight, LayoutTemplate, Shield, MousePointer2, XCircle, Star, Quote } from 'lucide-react';
import { getCurrentUser } from '../services/authService';

export const MarketingHome: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      navigate('/app', { replace: true });
    }
  }, [navigate]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
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
    }
  };

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative pt-6 pb-20 md:pt-12 md:pb-32 overflow-hidden bg-white dark:bg-slate-950">
        <div className="absolute top-0 left-0 right-0 h-[600px] bg-[radial-gradient(circle_at_50%_0%,_var(--tw-gradient-stops))] from-indigo-50 via-white to-white dark:from-indigo-950/30 dark:via-slate-950 dark:to-slate-950 opacity-100 -z-10"></div>
        <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-purple-200/30 dark:bg-purple-900/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute top-[15%] right-[10%] w-96 h-96 bg-blue-200/30 dark:bg-blue-900/20 rounded-full blur-3xl -z-10 animate-pulse delay-700"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center max-w-5xl">
          <div className="inline-flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors cursor-default">
            <Sparkles className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
            <span>AI-Powered Copywriter v2.0</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white mb-8 leading-[1.05] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            Copywriting that <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 animate-gradient">actually converts.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200 font-light">
            Stop staring at a blank cursor. Generate high-impact landing page copy tailored to your audience in seconds.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
            <Link to="/app/create" className="w-full sm:w-auto px-8 py-4 bg-slate-900 dark:bg-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-slate-300/50 dark:shadow-indigo-900/30 hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 text-lg">
              Start Writing for Free <ArrowRight className="h-5 w-5" />
            </Link>
            <a 
              href="#process" 
              onClick={(e) => scrollToSection(e, 'process')}
              className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-bold rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex items-center justify-center shadow-sm"
            >
              See How It Works
            </a>
          </div>

          {/* Abstract UI Preview */}
          <div className="mt-20 relative mx-auto max-w-5xl animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
             <div className="absolute inset-0 bg-indigo-500 blur-3xl opacity-10 -z-10 rounded-full transform translate-y-10 scale-90"></div>
             <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden p-2">
                <div className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden relative">
                    {/* Floating labels */}
                    <div className="absolute top-10 left-10 z-20 bg-white dark:bg-slate-800 shadow-lg border border-slate-100 dark:border-slate-700 rounded-lg p-3 flex items-center gap-3 animate-bounce duration-[3000ms]">
                        <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                            <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="text-xs font-bold text-slate-700 dark:text-slate-300">Headline Optimized</div>
                    </div>
                    <div className="absolute bottom-20 right-10 z-20 bg-white dark:bg-slate-800 shadow-lg border border-slate-100 dark:border-slate-700 rounded-lg p-3 flex items-center gap-3 animate-bounce duration-[4000ms]">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                            <Zap className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div className="text-xs font-bold text-slate-700 dark:text-slate-300">CTA Generated</div>
                    </div>

                    <div className="h-12 border-b border-slate-100 dark:border-slate-800 flex items-center px-4 gap-2 bg-white/50 dark:bg-slate-900/50 backdrop-blur">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        <div className="ml-4 w-64 h-5 bg-slate-100 dark:bg-slate-800 rounded-md hidden sm:block opacity-50"></div>
                    </div>
                    <div className="grid grid-cols-12 gap-0 h-[450px]">
                        <div className="col-span-3 border-r border-slate-100 dark:border-slate-800 p-6 hidden md:block bg-white/50 dark:bg-slate-900/50">
                            <div className="space-y-4">
                                <div className="h-3 w-12 bg-slate-200 dark:bg-slate-700 rounded"></div>
                                <div className="h-10 w-full bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900/50 rounded-lg"></div>
                                <div className="h-3 w-16 bg-slate-200 dark:bg-slate-700 rounded mt-4"></div>
                                <div className="h-10 w-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg"></div>
                                <div className="h-10 w-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg"></div>
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-9 p-8 md:p-12 flex flex-col items-center justify-center text-center relative overflow-hidden bg-white dark:bg-slate-900">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <Sparkles className="w-48 h-48 text-indigo-600" />
                            </div>
                            <div className="space-y-6 max-w-lg z-10 w-full">
                                <div className="h-8 w-32 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-full mx-auto flex items-center justify-center text-xs font-bold tracking-wider uppercase">New Feature</div>
                                <div className="h-16 w-full bg-slate-900 dark:bg-slate-700 rounded-xl shadow-lg"></div>
                                <div className="space-y-2">
                                    <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded"></div>
                                    <div className="h-4 w-5/6 bg-slate-100 dark:bg-slate-800 rounded mx-auto"></div>
                                </div>
                                <div className="flex justify-center gap-4 pt-4">
                                    <div className="h-12 w-40 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-indigo-900/50"></div>
                                    <div className="h-12 w-32 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Social Proof Strip */}
      <div className="border-y border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 py-10">
        <div className="container mx-auto px-4 text-center">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Powering next-gen startups</p>
            <div className="flex flex-wrap justify-center gap-10 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="flex items-center gap-2 font-display font-bold text-xl text-slate-800 dark:text-slate-300"><div className="w-6 h-6 bg-slate-800 dark:bg-slate-300 rounded"></div>Acme</div>
                <div className="flex items-center gap-2 font-display font-bold text-xl text-slate-800 dark:text-slate-300"><div className="w-6 h-6 rounded-full bg-indigo-600"></div>Starlight</div>
                <div className="flex items-center gap-2 font-display font-bold text-xl text-slate-800 dark:text-slate-300"><div className="w-6 h-6 border-2 border-slate-800 dark:border-slate-300 rounded"></div>BoltShift</div>
                <div className="flex items-center gap-2 font-display font-bold text-xl text-slate-800 dark:text-slate-300"><div className="w-6 h-6 bg-slate-800 dark:bg-slate-300 rotate-45"></div>Nexus</div>
            </div>
        </div>
      </div>

      {/* PROBLEM SECTION */}
      <section id="problem" className="py-32 bg-slate-900 dark:bg-slate-950 text-white relative overflow-hidden scroll-mt-24">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-900/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                    <div className="inline-block bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-1.5 rounded-full text-sm font-bold mb-6">
                        The Problem
                    </div>
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
                        Bad copy is costing you <br/>
                        <span className="text-red-400">customers every day.</span>
                    </h2>
                    <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                        You've built an amazing product, but if you can't articulate its value clearly, nobody will buy it. Most founders struggle with:
                    </p>
                    
                    <div className="space-y-6">
                        {[
                            { title: "Blank Page Paralysis", desc: "Wasting hours staring at a blinking cursor." },
                            { title: "Me-centric Messaging", desc: "Talking about features instead of user benefits." },
                            { title: "Unclear Value Props", desc: "Confusing visitors within the first 5 seconds." }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="flex-shrink-0 mt-1">
                                    <XCircle className="h-6 w-6 text-red-500" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-lg">{item.title}</h3>
                                    <p className="text-slate-400">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-2xl transform rotate-3 opacity-20 blur-lg"></div>
                    <div className="bg-slate-800 dark:bg-slate-900 border border-slate-700 rounded-2xl p-8 relative shadow-2xl">
                        <div className="space-y-6 font-mono text-sm">
                            <div className="flex gap-2">
                                <span className="text-red-400">user:</span>
                                <span className="text-slate-300">"What does your app do?"</span>
                            </div>
                            <div className="flex gap-2">
                                <span className="text-indigo-400">founder:</span>
                                <span className="text-slate-400 typing-cursor">"It's a leveraged synergy platform for data-driven..."</span>
                            </div>
                            <div className="p-4 bg-red-900/20 border border-red-900/50 rounded-lg text-red-300">
                                Error: Visitor bounced. Attention span exceeded.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 bg-white dark:bg-slate-950 scroll-mt-24">
        <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-20">
                <div className="inline-block bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900/50 text-indigo-600 dark:text-indigo-400 px-4 py-1.5 rounded-full text-sm font-bold mb-6">
                    Why LaunchCopy?
                </div>
                <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-6">Everything you need to launch fast.</h2>
                <p className="text-lg text-slate-600 dark:text-slate-400">We don't just generate text. We build structure, persuasion, and flow.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {[
                    {
                        icon: <Target className="h-6 w-6 text-indigo-600" />,
                        title: "Benefit-Driven Copy",
                        desc: "Our AI is trained to turn your 'features' into 'benefits' that resonate with human desires."
                    },
                    {
                        icon: <LayoutTemplate className="h-6 w-6 text-pink-600" />,
                        title: "Full Page Structure",
                        desc: "Get all essential sections: Hero, Problem, Solution, Features, Social Proof, FAQ, and CTAs."
                    },
                    {
                        icon: <MousePointer2 className="h-6 w-6 text-blue-600" />,
                        title: "Instant Regeneration",
                        desc: "Don't like a specific section? Hit regenerate to get a fresh angle in seconds."
                    },
                    {
                        icon: <Shield className="h-6 w-6 text-emerald-600" />,
                        title: "Tone Customization",
                        desc: "Match your brand's voice. Choose from Professional, Friendly, Bold, Luxury, and more."
                    },
                    {
                        icon: <Zap className="h-6 w-6 text-amber-500" />,
                        title: "Speed to Market",
                        desc: "Skip the weeks of drafting and editing. Get to a shippable version 1.0 in minutes."
                    },
                    {
                        icon: <Check className="h-6 w-6 text-violet-600" />,
                        title: "Developer Friendly",
                        desc: "Clean, structured output that's easy to copy-paste into React, Webflow, or Framer."
                    }
                ].map((feature, i) => (
                    <div key={i} className="group p-8 rounded-3xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800 hover:border-indigo-100 dark:hover:border-indigo-900 hover:shadow-xl hover:shadow-indigo-100/50 dark:hover:shadow-indigo-900/30 transition-all duration-300">
                        <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            {feature.icon}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-32 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800 overflow-hidden scroll-mt-24">
        <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1 relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-3xl opacity-20"></div>
                    <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-2xl border border-slate-100 dark:border-slate-700">
                         {/* Simulation of the App UI */}
                         <div className="border-b border-slate-100 dark:border-slate-700 pb-4 mb-6 flex justify-between items-center">
                            <div className="font-bold text-slate-800 dark:text-white">New Project</div>
                            <div className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-xs font-bold px-2 py-1 rounded">Draft</div>
                         </div>
                         <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Product Name</label>
                                <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg text-slate-800 dark:text-slate-200 font-medium border border-slate-200 dark:border-slate-700 mt-1">SuperCal</div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Problem</label>
                                <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg text-slate-800 dark:text-slate-200 text-sm border border-slate-200 dark:border-slate-700 mt-1">Scheduling meetings takes too many emails back and forth.</div>
                            </div>
                            <div className="pt-4">
                                <button className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-indigo-900/50 flex items-center justify-center gap-2">
                                    <Sparkles className="h-4 w-4" /> Generate Landing Page
                                </button>
                            </div>
                         </div>
                    </div>
                </div>
                <div className="order-1 lg:order-2">
                    <div className="inline-block bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 px-4 py-1.5 rounded-full text-sm font-bold mb-8 shadow-sm">
                        How It Works
                    </div>
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 text-slate-900 dark:text-white">From idea to <br/>launched in minutes.</h2>
                    <div className="space-y-12">
                        {[
                            {
                                step: "01",
                                title: "Input Product Details",
                                desc: "Tell us your product name, target audience, and the core problem you solve. The more specific, the better."
                            },
                            {
                                step: "02",
                                title: "AI Generation",
                                desc: "Our Gemini-powered engine analyzes your input and constructs a persuasive narrative structure tailored to your audience."
                            },
                            {
                                step: "03",
                                title: "Refine & Export",
                                desc: "Review the copy. Tweak specific sections or regenerate them. Copy the final text and paste it into your website builder."
                            }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-6 group">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white dark:bg-slate-800 border-2 border-indigo-100 dark:border-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold font-mono group-hover:border-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                                    {item.step}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{item.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-32 bg-white dark:bg-slate-950 scroll-mt-24">
        <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-20">
                <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-6">Loved by Builders</h2>
                <p className="text-lg text-slate-600 dark:text-slate-400">Join thousands of founders who use LaunchCopy to ship faster.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
                {[
                    {
                        quote: "I used to spend days agonizing over my hero section. LaunchCopy nailed it in 30 seconds. It's almost scary how good it is.",
                        name: "Sarah Jenkins",
                        role: "Founder, DesignJoy",
                        avatar: "bg-orange-100 text-orange-600"
                    },
                    {
                        quote: "The structure it generates is what sold me. It follows the exact framework I pay consultants thousands for.",
                        name: "Marcus Chen",
                        role: "Indie Hacker",
                        avatar: "bg-blue-100 text-blue-600"
                    },
                    {
                        quote: "Finally, an AI writer that doesn't sound like a robot. The 'Friendly' tone setting is perfect for my B2C app.",
                        name: "Elena Rodriguez",
                        role: "Product Manager",
                        avatar: "bg-purple-100 text-purple-600"
                    }
                ].map((t, i) => (
                    <div key={i} className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 relative">
                        <Quote className="absolute top-8 right-8 h-8 w-8 text-slate-200 dark:text-slate-800 fill-slate-200 dark:fill-slate-800" />
                        <div className="flex gap-1 mb-6">
                            {[1,2,3,4,5].map(star => <Star key={star} className="h-4 w-4 text-amber-400 fill-amber-400" />)}
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 text-lg mb-8 leading-relaxed">"{t.quote}"</p>
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${t.avatar}`}>
                                {t.name.charAt(0)}
                            </div>
                            <div>
                                <div className="font-bold text-slate-900 dark:text-white">{t.name}</div>
                                <div className="text-sm text-slate-500 dark:text-slate-400">{t.role}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white dark:bg-slate-950 text-center">
        <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-slate-900 dark:bg-indigo-900 rounded-[3rem] p-12 md:p-24 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/30 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
                
                <div className="relative z-10">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Ready to launch?</h2>
                    <p className="text-xl text-slate-300 dark:text-indigo-200 mb-10 max-w-2xl mx-auto">Get your high-converting landing page copy in the next 2 minutes.</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/app/create" className="w-full sm:w-auto px-10 py-5 bg-white text-slate-900 font-bold rounded-2xl shadow-xl hover:bg-indigo-50 hover:-translate-y-1 transition-all text-lg flex items-center justify-center gap-2">
                            Generate Now <ArrowRight className="h-5 w-5" />
                        </Link>
                    </div>
                    <p className="mt-8 text-sm text-slate-400 dark:text-indigo-300">No credit card required • Free forever plan</p>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};