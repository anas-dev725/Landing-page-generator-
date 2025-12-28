import React from 'react';
import { LandingPageCopy, ColorTheme } from '../types';
import { Check, Star, ChevronDown, ArrowRight, X, Quote, Zap, Shield, MousePointer2 } from 'lucide-react';

interface Props {
  data: LandingPageCopy;
  theme?: ColorTheme;
}

export const LandingPagePreview: React.FC<Props> = ({ data, theme = 'indigo' }) => {
  
  const themes: Record<string, any> = {
    indigo: {
        primary: 'bg-indigo-600',
        primaryHover: 'hover:bg-indigo-700',
        secondary: 'bg-indigo-50',
        secondaryText: 'text-indigo-600',
        text: 'text-indigo-600',
        border: 'border-indigo-100',
        ring: 'ring-indigo-500',
        gradient: 'from-indigo-600 via-indigo-500 to-violet-600',
        iconBg: 'bg-indigo-100',
        darkBg: 'bg-slate-900',
        pill: 'bg-indigo-100 text-indigo-700 border-indigo-200'
    },
    blue: {
        primary: 'bg-blue-600',
        primaryHover: 'hover:bg-blue-700',
        secondary: 'bg-blue-50',
        secondaryText: 'text-blue-600',
        text: 'text-blue-600',
        border: 'border-blue-100',
        ring: 'ring-blue-500',
        gradient: 'from-blue-600 via-blue-500 to-cyan-600',
        iconBg: 'bg-blue-100',
        darkBg: 'bg-slate-900',
        pill: 'bg-blue-100 text-blue-700 border-blue-200'
    },
    emerald: {
        primary: 'bg-emerald-600',
        primaryHover: 'hover:bg-emerald-700',
        secondary: 'bg-emerald-50',
        secondaryText: 'text-emerald-600',
        text: 'text-emerald-600',
        border: 'border-emerald-100',
        ring: 'ring-emerald-500',
        gradient: 'from-emerald-600 via-emerald-500 to-teal-600',
        iconBg: 'bg-emerald-100',
        darkBg: 'bg-slate-900',
        pill: 'bg-emerald-100 text-emerald-700 border-emerald-200'
    },
    rose: {
        primary: 'bg-rose-600',
        primaryHover: 'hover:bg-rose-700',
        secondary: 'bg-rose-50',
        secondaryText: 'text-rose-600',
        text: 'text-rose-600',
        border: 'border-rose-100',
        ring: 'ring-rose-500',
        gradient: 'from-rose-600 via-rose-500 to-pink-600',
        iconBg: 'bg-rose-100',
        darkBg: 'bg-slate-900',
        pill: 'bg-rose-100 text-rose-700 border-rose-200'
    },
    amber: {
        primary: 'bg-amber-500',
        primaryHover: 'hover:bg-amber-600',
        secondary: 'bg-amber-50',
        secondaryText: 'text-amber-600',
        text: 'text-amber-600',
        border: 'border-amber-100',
        ring: 'ring-amber-500',
        gradient: 'from-amber-500 via-amber-400 to-orange-500',
        iconBg: 'bg-amber-100',
        darkBg: 'bg-slate-900', 
        pill: 'bg-amber-100 text-amber-700 border-amber-200'
    },
    violet: {
        primary: 'bg-violet-600',
        primaryHover: 'hover:bg-violet-700',
        secondary: 'bg-violet-50',
        secondaryText: 'text-violet-600',
        text: 'text-violet-600',
        border: 'border-violet-100',
        ring: 'ring-violet-500',
        gradient: 'from-violet-600 via-violet-500 to-fuchsia-600',
        iconBg: 'bg-violet-100',
        darkBg: 'bg-slate-900',
        pill: 'bg-violet-100 text-violet-700 border-violet-200'
    }
  };

  const t = themes[theme] || themes.indigo;

  // Icons for features to make them look different if AI generated standard ones
  const featureIcons = [Zap, Shield, MousePointer2, Check];

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden font-sans mx-auto max-w-7xl my-8">
      {/* Mock Browser Header */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center gap-4 sticky top-0 z-10">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-amber-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
        <div className="flex-1 bg-white h-8 rounded-md border border-slate-200 flex items-center justify-center px-3 text-xs text-slate-400 font-medium shadow-sm">
          <span className="text-slate-300 mr-2">https://</span>{data.hero.headline.split(' ')[0].toLowerCase() || 'startup'}.com
        </div>
      </div>

      <div className="h-[800px] overflow-y-auto custom-scrollbar">
        {/* HERO SECTION */}
        <section className={`py-28 px-6 text-center relative overflow-hidden bg-white`}>
           <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b ${t.gradient} opacity-[0.08] rounded-full blur-3xl -z-10`}></div>
           
          <div className="max-w-5xl mx-auto relative z-10">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-8 border ${t.pill}`}>
                <Star className="w-3 h-3 fill-current" /> New Release 2.0
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-8 leading-[1.05] tracking-tight">
              {data.hero.headline}
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              {data.hero.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className={`px-10 py-4 ${t.primary} ${t.primaryHover} text-white text-lg font-bold rounded-xl transition-all shadow-xl shadow-slate-200 hover:-translate-y-1`}>
                {data.hero.ctaPrimary}
              </button>
              <button className="px-10 py-4 bg-white text-slate-600 font-bold border border-slate-200 rounded-xl hover:bg-slate-50 transition-all hover:border-slate-300">
                {data.hero.ctaSecondary}
              </button>
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF STRIP */}
        <section className="py-10 bg-white border-y border-slate-100">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Trusted by 10,000+ companies</p>
            <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale">
               <div className="flex items-center gap-2 font-bold text-xl font-display text-slate-800"><div className="w-6 h-6 bg-slate-800 rounded"></div>Acme</div>
               <div className="flex items-center gap-2 font-bold text-xl font-display text-slate-800"><div className="w-6 h-6 rounded-full bg-slate-800"></div>Starlight</div>
               <div className="flex items-center gap-2 font-bold text-xl font-display text-slate-800"><div className="w-6 h-6 border-2 border-slate-800 rounded"></div>Bolt</div>
               <div className="flex items-center gap-2 font-bold text-xl font-display text-slate-800"><div className="w-6 h-6 bg-slate-800 rotate-45"></div>Nexus</div>
            </div>
          </div>
        </section>

        {/* PROBLEM SECTION */}
        <section className="py-24 px-6 bg-slate-50">
            <div className="max-w-6xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-sm font-bold text-red-500 uppercase tracking-widest mb-4">The Problem</h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">{data.problem.headline}</h3>
                    <p className="text-lg text-slate-600">{data.problem.description}</p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                    {data.problem.painPoints.map((point, i) => (
                        <div key={i} className="bg-white p-8 rounded-2xl border border-red-100 shadow-sm hover:shadow-lg transition-all relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <X className="h-6 w-6 text-red-500" />
                            </div>
                            <p className="text-slate-800 font-medium text-lg leading-relaxed">{point}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* SOLUTION SECTION */}
        <section className="py-24 px-6 bg-slate-900 text-white text-center relative overflow-hidden">
           <div className={`absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b ${t.gradient} opacity-20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2`}></div>
           <div className={`absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-t ${t.gradient} opacity-20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2`}></div>
          <div className="max-w-4xl mx-auto relative z-10">
            <div className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-8 bg-white/10 text-white border border-white/20`}>The Solution</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">{data.solution.headline}</h2>
            <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">{data.solution.description}</p>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <div className={`inline-block px-3 py-1 mb-4 rounded-full text-xs font-bold uppercase tracking-wider ${t.secondary} ${t.secondaryText}`}>Features</div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{data.features.headline}</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {data.features.items.map((item, i) => {
                const Icon = featureIcons[i % featureIcons.length];
                return (
                  <div key={i} className={`p-8 rounded-2xl border border-slate-100 bg-white hover:border-${theme}-200 hover:shadow-xl hover:shadow-${theme}-100 transition-all duration-300 group`}>
                    <div className={`w-14 h-14 ${t.iconBg} rounded-2xl mb-6 flex items-center justify-center ${t.text} group-hover:scale-110 transition-transform shadow-sm`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-24 px-6 bg-slate-50 border-y border-slate-200">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-16 items-center">
                <div className="w-full md:w-1/2">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">{data.howItWorks.headline}</h2>
                    <p className="text-lg text-slate-600 mb-8">Get up and running in minutes with our simple process.</p>
                    <div className="space-y-8">
                      {data.howItWorks.steps.map((step, i) => (
                        <div key={i} className="flex gap-6 relative">
                          {i !== data.howItWorks.steps.length - 1 && (
                            <div className="absolute top-10 left-6 w-0.5 h-full bg-slate-200 -z-10"></div>
                          )}
                          <div className={`w-12 h-12 rounded-full ${t.primary} text-white flex items-center justify-center font-bold text-lg shadow-lg flex-shrink-0`}>
                              {i + 1}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                </div>
                <div className="w-full md:w-1/2 bg-white rounded-3xl shadow-xl border border-slate-100 p-8 min-h-[400px] flex items-center justify-center relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${t.gradient} opacity-5`}></div>
                    <div className="text-center">
                        <div className={`w-20 h-20 ${t.secondary} rounded-2xl mx-auto mb-6 flex items-center justify-center`}>
                            <Zap className={`w-10 h-10 ${t.text}`} />
                        </div>
                        <div className="font-bold text-slate-300 text-xl">Product Screenshot</div>
                    </div>
                </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-16">{data.socialProof.headline}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {data.socialProof.testimonials.map((testimonial, i) => (
                <div key={i} className="p-8 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-lg transition-all relative">
                  <Quote className={`absolute top-6 right-6 h-6 w-6 ${t.text} opacity-20`} />
                  <div className="flex gap-1 mb-6 text-amber-400">
                    {[1,2,3,4,5].map(s => <Star key={s} className="h-4 w-4 fill-current" />)}
                  </div>
                  <p className="text-slate-700 mb-8 italic text-lg leading-relaxed">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-4 border-t border-slate-50 pt-6">
                     <div className={`w-10 h-10 rounded-full ${t.secondary} ${t.text} flex items-center justify-center font-bold`}>
                        {testimonial.name.charAt(0)}
                     </div>
                     <div>
                        <div className="font-bold text-slate-900">{testimonial.name}</div>
                        <div className="text-sm text-slate-500">{testimonial.role}</div>
                     </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 px-6 bg-slate-50">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12">{data.faq.headline}</h2>
                <div className="space-y-4">
                    {data.faq.items.map((item, i) => (
                        <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-slate-300 transition-colors shadow-sm cursor-pointer group">
                            <div className="flex justify-between items-start gap-4">
                                <h3 className="font-bold text-slate-900 text-lg group-hover:text-indigo-600 transition-colors">{item.question}</h3>
                                <ChevronDown className="h-5 w-5 text-slate-400 flex-shrink-0 mt-1" />
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-50">
                                <p className="text-slate-600 leading-relaxed">{item.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* CTA */}
        <section className={`py-32 px-6 text-center relative overflow-hidden`}>
          <div className={`absolute inset-0 bg-gradient-to-br ${t.gradient}`}></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          
          <div className="max-w-3xl mx-auto relative z-10 text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">{data.cta.headline}</h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto font-medium">{data.cta.subheadline}</p>
            <button className="px-10 py-5 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-50 transition-all shadow-2xl hover:-translate-y-1 flex items-center gap-2 mx-auto text-lg">
              {data.cta.buttonText} <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </section>
        
        {/* Footer Mock */}
        <footer className="bg-white py-12 border-t border-slate-200 text-center text-sm text-slate-400">
            <div className="flex justify-center items-center gap-2 mb-6 font-bold text-slate-900 text-xl">
                <div className={`w-8 h-8 rounded-lg ${t.primary}`}></div>
                {data.hero.headline.split(' ')[0] || 'Company'}
            </div>
            <div className="flex justify-center gap-6 mb-8 text-slate-500 font-medium">
                <span>Features</span>
                <span>Pricing</span>
                <span>About</span>
                <span>Blog</span>
                <span>Contact</span>
            </div>
            &copy; {new Date().getFullYear()} All rights reserved.
        </footer>
      </div>
    </div>
  );
};