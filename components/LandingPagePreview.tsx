import React from 'react';
import { LandingPageCopy, ColorTheme } from '../types';
import { Check, Star, ChevronDown, ArrowRight, X } from 'lucide-react';

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
        gradient: 'from-indigo-600 to-violet-600',
        iconBg: 'bg-indigo-100',
        darkBg: 'bg-indigo-950',
    },
    blue: {
        primary: 'bg-blue-600',
        primaryHover: 'hover:bg-blue-700',
        secondary: 'bg-blue-50',
        secondaryText: 'text-blue-600',
        text: 'text-blue-600',
        border: 'border-blue-100',
        ring: 'ring-blue-500',
        gradient: 'from-blue-600 to-cyan-600',
        iconBg: 'bg-blue-100',
        darkBg: 'bg-blue-950',
    },
    emerald: {
        primary: 'bg-emerald-600',
        primaryHover: 'hover:bg-emerald-700',
        secondary: 'bg-emerald-50',
        secondaryText: 'text-emerald-600',
        text: 'text-emerald-600',
        border: 'border-emerald-100',
        ring: 'ring-emerald-500',
        gradient: 'from-emerald-600 to-teal-600',
        iconBg: 'bg-emerald-100',
        darkBg: 'bg-emerald-950',
    },
    rose: {
        primary: 'bg-rose-600',
        primaryHover: 'hover:bg-rose-700',
        secondary: 'bg-rose-50',
        secondaryText: 'text-rose-600',
        text: 'text-rose-600',
        border: 'border-rose-100',
        ring: 'ring-rose-500',
        gradient: 'from-rose-600 to-pink-600',
        iconBg: 'bg-rose-100',
        darkBg: 'bg-rose-950',
    },
    amber: {
        primary: 'bg-amber-500',
        primaryHover: 'hover:bg-amber-600',
        secondary: 'bg-amber-50',
        secondaryText: 'text-amber-600',
        text: 'text-amber-600',
        border: 'border-amber-100',
        ring: 'ring-amber-500',
        gradient: 'from-amber-500 to-orange-500',
        iconBg: 'bg-amber-100',
        darkBg: 'bg-slate-900', // Amber dark doesn't look great usually
    },
    violet: {
        primary: 'bg-violet-600',
        primaryHover: 'hover:bg-violet-700',
        secondary: 'bg-violet-50',
        secondaryText: 'text-violet-600',
        text: 'text-violet-600',
        border: 'border-violet-100',
        ring: 'ring-violet-500',
        gradient: 'from-violet-600 to-fuchsia-600',
        iconBg: 'bg-violet-100',
        darkBg: 'bg-violet-950',
    }
  };

  const t = themes[theme] || themes.indigo;

  return (
    <div className="bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden font-sans">
      {/* Mock Browser Header */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center gap-4 sticky top-0 z-10">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-amber-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
        <div className="flex-1 bg-white h-7 rounded-md border border-slate-200 flex items-center justify-center px-3 text-xs text-slate-400 font-medium">
          yourstartup.com
        </div>
      </div>

      <div className="h-[800px] overflow-y-auto custom-scrollbar">
        {/* HERO SECTION */}
        <section className={`py-24 px-6 text-center relative overflow-hidden`}>
           {/* Abstract Background Elements */}
           <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b ${t.gradient} opacity-5 rounded-full blur-3xl -z-10`}></div>
           
          <div className="max-w-4xl mx-auto relative z-10">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 mb-8 leading-[1.1] tracking-tight">
              {data.hero.headline}
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              {data.hero.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className={`px-8 py-4 ${t.primary} ${t.primaryHover} text-white font-bold rounded-full transition-all shadow-xl shadow-slate-200 hover:-translate-y-1`}>
                {data.hero.ctaPrimary}
              </button>
              <button className="px-8 py-4 bg-white text-slate-700 font-bold border border-slate-200 rounded-full hover:bg-slate-50 transition-all hover:-translate-y-1">
                {data.hero.ctaSecondary}
              </button>
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF */}
        <section className="py-12 bg-white border-y border-slate-100">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Trusted by industry leaders</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-40">
               {/* Mock Logos */}
               <div className="h-8 w-32 bg-slate-800 rounded-md"></div>
               <div className="h-8 w-32 bg-slate-800 rounded-md"></div>
               <div className="h-8 w-32 bg-slate-800 rounded-md"></div>
               <div className="h-8 w-32 bg-slate-800 rounded-md"></div>
            </div>
          </div>
        </section>

        {/* PROBLEM SECTION */}
        <section className="py-24 px-6 bg-slate-50">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 bg-white rounded-2xl h-80 w-full shadow-lg border border-slate-100 flex items-center justify-center">
                <span className="text-slate-300 font-bold text-lg">Visual / Graph Placeholder</span>
            </div>
            <div className="order-1 md:order-2">
              <div className={`inline-block px-3 py-1 mb-4 rounded-full text-xs font-bold uppercase tracking-wider ${t.secondary} ${t.secondaryText}`}>The Problem</div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">{data.problem.headline}</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">{data.problem.description}</p>
              <ul className="space-y-4">
                {data.problem.painPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700">
                    <div className="mt-0.5 p-1 bg-red-100 rounded-full">
                        <X className="h-3 w-3 text-red-600" />
                    </div>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* SOLUTION SECTION */}
        <section className={`py-24 px-6 ${t.darkBg} text-white text-center relative overflow-hidden`}>
           <div className={`absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b ${t.gradient} opacity-20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2`}></div>
          <div className="max-w-4xl mx-auto relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">{data.solution.headline}</h2>
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
              {data.features.items.map((item, i) => (
                <div key={i} className={`p-8 rounded-2xl border border-slate-100 bg-white hover:shadow-xl transition-all duration-300 group`}>
                  <div className={`w-12 h-12 ${t.iconBg} rounded-xl mb-6 flex items-center justify-center ${t.text} group-hover:scale-110 transition-transform`}>
                    <Check className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-24 px-6 bg-slate-50 border-y border-slate-200">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-16">{data.howItWorks.headline}</h2>
            <div className="grid md:grid-cols-3 gap-12">
              {data.howItWorks.steps.map((step, i) => (
                <div key={i} className="relative pt-8">
                  <div className="absolute top-0 left-0 text-8xl font-black text-slate-200/50 font-sans -z-10 select-none">0{i+1}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">{step.title}</h3>
                  <p className="text-slate-600 relative z-10 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-16">{data.socialProof.headline}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.socialProof.testimonials.map((t, i) => (
                <div key={i} className="p-8 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex gap-1 mb-6 text-amber-400">
                    {[1,2,3,4,5].map(s => <Star key={s} className="h-4 w-4 fill-current" />)}
                  </div>
                  <p className="text-slate-700 mb-6 italic text-lg leading-relaxed">"{t.quote}"</p>
                  <div className="flex items-center gap-4">
                     <div className={`w-10 h-10 rounded-full ${t.secondary} ${t.text} flex items-center justify-center font-bold`}>
                        {t.name.charAt(0)}
                     </div>
                     <div>
                        <div className="font-bold text-slate-900">{t.name}</div>
                        <div className="text-sm text-slate-500">{t.role}</div>
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
                        <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 hover:border-indigo-200 transition-colors shadow-sm">
                            <div className="flex justify-between items-start mb-2 gap-4">
                                <h3 className="font-bold text-slate-900 text-lg">{item.question}</h3>
                                <ChevronDown className="h-5 w-5 text-slate-400 flex-shrink-0 mt-1" />
                            </div>
                            <p className="text-slate-600 leading-relaxed">{item.answer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* CTA */}
        <section className={`py-32 px-6 text-center bg-gradient-to-br ${t.gradient} text-white`}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">{data.cta.headline}</h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">{data.cta.subheadline}</p>
            <button className="px-10 py-5 bg-white text-slate-900 font-bold rounded-full hover:bg-slate-50 transition-all shadow-xl hover:-translate-y-1 flex items-center gap-2 mx-auto">
              {data.cta.buttonText} <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </section>
        
        {/* Footer Mock */}
        <footer className="bg-white py-12 border-t border-slate-200 text-center text-sm text-slate-400">
            <div className="flex justify-center items-center gap-2 mb-4 font-bold text-slate-900 text-lg">
                <div className={`w-6 h-6 rounded-md ${t.primary}`}></div>
                {data.hero.headline.split(' ')[0] || 'Company'}
            </div>
            &copy; {new Date().getFullYear()} All rights reserved.
        </footer>
      </div>
    </div>
  );
};
