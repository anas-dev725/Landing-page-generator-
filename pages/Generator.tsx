import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { generateLandingPageCopy } from '../services/geminiService';
import { saveProject, getProject } from '../services/storageService';
import { getCurrentUser } from '../services/authService';
import { ProductInput, LandingPageCopy, Tone, Project, ColorTheme } from '../types';
import { SectionCard } from '../components/SectionCard';
import { LandingPagePreview } from '../components/LandingPagePreview';
import { Sparkles, ArrowLeft, Loader2, Layout, Wand2, FileText, MonitorPlay, Palette, Check, Download } from 'lucide-react';

const initialFormState: ProductInput = {
  name: '',
  audience: '',
  problem: '',
  features: '',
  tone: Tone.PROFESSIONAL,
  colorTheme: 'indigo'
};

export const Generator: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [form, setForm] = useState<ProductInput>(initialFormState);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LandingPageCopy | null>(null);
  const [view, setView] = useState<'edit' | 'copy' | 'preview'>('edit'); 

  // Load project if ID exists
  useEffect(() => {
    if (id) {
      const project = getProject(id);
      if (project) {
        setForm(project.input);
        setResult(project.copy);
        if (project.copy) {
            setView('copy'); // Default to copy view if loaded
        }
      } else {
        navigate('/app');
      }
    }
  }, [id, navigate]);

  const loadExample = () => {
    setForm({
      name: "TaskFlow",
      audience: "Remote project managers and agile teams",
      problem: "Existing project management tools are too complex, slow, and cluttered with features nobody uses.",
      features: "AI-prioritized task lists, 1-click status updates, Minimalist distraction-free UI, Slack integration",
      tone: Tone.PROFESSIONAL,
      colorTheme: 'blue'
    });
  };

  const handleExport = () => {
    if (!result) return;

    const formatSection = (title: string, data: any) => {
      let text = `=== ${title.toUpperCase()} ===\n`;
      if (typeof data === 'string') return text + data + '\n\n';
      
      Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          text += `${key.toUpperCase()}:\n`;
          value.forEach((v: any) => {
            if (typeof v === 'object') {
              text += `  - ${Object.values(v).join(': ')}\n`;
            } else {
              text += `  - ${v}\n`;
            }
          });
        } else {
          text += `${key.toUpperCase()}: ${value}\n`;
        }
      });
      return text + '\n';
    };

    let fullText = `LAUNCHCOPY EXPORT: ${form.name}\n`;
    fullText += `Target Audience: ${form.audience}\n`;
    fullText += `Tone: ${form.tone}\n`;
    fullText += `Generated at: ${new Date().toLocaleString()}\n\n`;

    fullText += formatSection('Hero', result.hero);
    fullText += formatSection('Problem', result.problem);
    fullText += formatSection('Solution', result.solution);
    fullText += formatSection('Features', result.features);
    fullText += formatSection('How It Works', result.howItWorks);
    fullText += formatSection('Social Proof', result.socialProof);
    fullText += formatSection('FAQ', result.faq);
    fullText += formatSection('Call to Action', result.cta);

    const blob = new Blob([fullText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${form.name.replace(/\s+/g, '_')}_copy.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleGenerate = async () => {
    if (!form.name || !form.problem || !form.audience) return; 
    
    setLoading(true);
    try {
      const data = await generateLandingPageCopy(form);
      setResult(data);
      
      const user = getCurrentUser();
      
      // Save the project
      const projectId = id || crypto.randomUUID();
      const newProject: Project = {
        id: projectId,
        userId: user ? user.id : '',
        name: form.name,
        createdAt: id ? (getProject(id)?.createdAt || Date.now()) : Date.now(),
        updatedAt: Date.now(),
        input: form,
        copy: data
      };
      
      saveProject(newProject);
      
      // If we created a new one, navigate to its URL to persist state on refresh
      if (!id) {
          navigate(`/app/project/${projectId}`, { replace: true });
      }
      
      // Automatically switch to preview to show the "Whole page" generated
      setView('preview');
    } catch (error) {
      alert("Failed to generate content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatSectionContent = (data: any, type: string): string => {
    if (!data) return "";
    switch (type) {
      case 'hero':
        return `HEADLINE:\n${data.headline}\n\nSUBHEAD:\n${data.subheadline}\n\nPRIMARY CTA:\n${data.ctaPrimary}\n\nSECONDARY CTA:\n${data.ctaSecondary}`;
      case 'problem':
        return `HEADLINE:\n${data.headline}\n\nDESCRIPTION:\n${data.description}\n\nPAIN POINTS:\n${data.painPoints.map((p: string) => `• ${p}`).join('\n')}`;
      case 'solution':
        return `HEADLINE:\n${data.headline}\n\nDESCRIPTION:\n${data.description}`;
      case 'features':
        return `HEADLINE:\n${data.headline}\n\nFEATURES:\n${data.items.map((i: any) => `• ${i.title}: ${i.description}`).join('\n')}`;
      case 'howItWorks':
        return `HEADLINE:\n${data.headline}\n\nSTEPS:\n${data.steps.map((s: any, idx: number) => `${idx + 1}. ${s.title}: ${s.description}`).join('\n')}`;
      case 'socialProof':
        return `HEADLINE:\n${data.headline}\n\nTESTIMONIALS:\n${data.testimonials.map((t: any) => `"${t.quote}"\n— ${t.name}, ${t.role}`).join('\n\n')}`;
      case 'faq':
        return `HEADLINE:\n${data.headline}\n\nQUESTIONS:\n${data.items.map((i: any) => `Q: ${i.question}\nA: ${i.answer}`).join('\n\n')}`;
      case 'cta':
        return `HEADLINE:\n${data.headline}\n\nSUBHEAD:\n${data.subheadline}\n\nBUTTON:\n${data.buttonText}`;
      default:
        return JSON.stringify(data, null, 2);
    }
  };

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 sticky top-[80px] z-30 bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur py-4 transition-colors">
        <div className="flex items-center gap-4">
            <button 
                onClick={() => navigate('/app')}
                className="p-2 rounded-full hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
            >
                <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
                <h1 className="text-2xl font-display font-bold text-slate-900 dark:text-white">{form.name || "Untitled Project"}</h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{id ? "Last saved just now" : "Unsaved draft"}</p>
            </div>
        </div>
        
        <div className="flex items-center gap-3">
             {/* Toggle View */}
             {result && (
                <>
                <div className="flex bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm mr-2">
                    <button 
                        onClick={() => setView('edit')}
                        className={`flex items-center gap-2 px-3 py-2 text-sm font-bold rounded-lg transition-colors ${view === 'edit' ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                    >
                        <Wand2 className="h-4 w-4" /> Inputs
                    </button>
                    <button 
                        onClick={() => setView('copy')}
                        className={`flex items-center gap-2 px-3 py-2 text-sm font-bold rounded-lg transition-colors ${view === 'copy' ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                    >
                        <FileText className="h-4 w-4" /> Copy
                    </button>
                    <button 
                        onClick={() => setView('preview')}
                        className={`flex items-center gap-2 px-3 py-2 text-sm font-bold rounded-lg transition-colors ${view === 'preview' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                    >
                        <MonitorPlay className="h-4 w-4" /> Preview
                    </button>
                </div>
                
                <button 
                    onClick={handleExport}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm"
                    title="Export all sections as .txt"
                >
                    <Download className="h-4 w-4" />
                    <span className="hidden sm:inline">Export</span>
                </button>
                </>
             )}
             
            <button 
                onClick={handleGenerate}
                disabled={loading || !form.name || !form.problem} 
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold shadow-lg transition-all ${loading ? 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-500 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-200 dark:hover:shadow-indigo-900'}`}
            >
                {loading ? <Loader2 className="h-4 w-4 animate-spin"/> : <Sparkles className="h-4 w-4" />}
                {result ? 'Regenerate' : 'Generate Page'}
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* INPUT COLUMN */}
        <div className={`${view === 'edit' ? 'lg:col-span-12 max-w-3xl mx-auto' : 'hidden'} w-full`}>
             <div className="bg-slate-900 dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-800 dark:border-slate-700 p-8 md:p-10 relative overflow-hidden transition-colors">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                    <Layout className="h-48 w-48 text-white" />
                </div>

               <div className="flex justify-between items-center mb-10 relative z-10">
                 <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <div className="p-2 bg-indigo-600 rounded-lg">
                        <Wand2 className="h-5 w-5 text-white" />
                    </div>
                    Project Details
                 </h2>
                 <button onClick={loadExample} className="text-xs font-bold text-indigo-300 bg-indigo-500/20 border border-indigo-500/30 px-4 py-2 rounded-full hover:bg-indigo-500/30 transition-colors">
                   Auto-fill Example
                 </button>
               </div>
     
               <div className="space-y-8 relative z-10">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-3">
                     <label className="text-sm font-bold text-slate-300 uppercase tracking-wider">Product Name</label>
                     <input 
                       type="text" 
                       value={form.name}
                       onChange={(e) => setForm({...form, name: e.target.value})}
                       className="w-full px-5 py-4 rounded-xl bg-slate-800/50 dark:bg-slate-900/50 border border-slate-700 dark:border-slate-600 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-600 font-medium text-lg"
                       placeholder="e.g. LaunchCopy"
                     />
                   </div>
                   
                   <div className="space-y-3">
                     <label className="text-sm font-bold text-slate-300 uppercase tracking-wider">Tone of Voice</label>
                     <div className="relative">
                       <select 
                         value={form.tone}
                         onChange={(e) => setForm({...form, tone: e.target.value as Tone})}
                         className="w-full px-5 py-4 rounded-xl bg-slate-800/50 dark:bg-slate-900/50 border border-slate-700 dark:border-slate-600 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none appearance-none transition-all font-medium text-lg"
                       >
                         {Object.values(Tone).map((t) => (
                           <option key={t} value={t}>{t}</option>
                         ))}
                       </select>
                       <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                         <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                       </div>
                     </div>
                   </div>
                 </div>

                 {/* Color Theme Selector */}
                 <div className="space-y-3">
                     <label className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                         <Palette className="h-4 w-4" /> Color Theme
                     </label>
                     <div className="flex flex-wrap gap-4">
                         {['indigo', 'blue', 'emerald', 'rose', 'amber', 'violet'].map((color) => (
                             <button
                                 key={color}
                                 onClick={() => setForm({...form, colorTheme: color as ColorTheme})}
                                 className={`
                                    w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center
                                    ${form.colorTheme === color ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'}
                                 `}
                                 style={{ backgroundColor: `var(--color-${color}-500)` }}
                                 title={color.charAt(0).toUpperCase() + color.slice(1)}
                             >
                                 <div className={`w-full h-full rounded-full 
                                     ${color === 'indigo' ? 'bg-indigo-500' : ''}
                                     ${color === 'blue' ? 'bg-blue-500' : ''}
                                     ${color === 'emerald' ? 'bg-emerald-500' : ''}
                                     ${color === 'rose' ? 'bg-rose-500' : ''}
                                     ${color === 'amber' ? 'bg-amber-500' : ''}
                                     ${color === 'violet' ? 'bg-violet-500' : ''}
                                 `}>
                                     {form.colorTheme === color && <Check className="h-5 w-5 text-white mx-auto mt-2" />}
                                 </div>
                             </button>
                         ))}
                     </div>
                 </div>
     
                 <div className="space-y-3">
                   <label className="text-sm font-bold text-slate-300 uppercase tracking-wider">Target Audience</label>
                   <input 
                     type="text" 
                     value={form.audience}
                     onChange={(e) => setForm({...form, audience: e.target.value})}
                     className="w-full px-5 py-4 rounded-xl bg-slate-800/50 dark:bg-slate-900/50 border border-slate-700 dark:border-slate-600 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-600 text-lg"
                     placeholder="e.g. Indie hackers, busy parents, enterprise CTOs..."
                   />
                 </div>
     
                 <div className="space-y-3">
                   <label className="text-sm font-bold text-slate-300 uppercase tracking-wider">The Problem <span className="text-slate-500 font-normal ml-1 normal-case tracking-normal">(What pain do they feel?)</span></label>
                   <textarea 
                     value={form.problem}
                     onChange={(e) => setForm({...form, problem: e.target.value})}
                     className="w-full px-5 py-4 rounded-xl bg-slate-800/50 dark:bg-slate-900/50 border border-slate-700 dark:border-slate-600 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all min-h-[120px] placeholder:text-slate-600 resize-y text-lg"
                     placeholder="Describe the struggle your users face before using your product..."
                   />
                 </div>
     
                 <div className="space-y-3">
                   <label className="text-sm font-bold text-slate-300 uppercase tracking-wider">Key Features <span className="text-slate-500 font-normal ml-1 normal-case tracking-normal">(How do you solve it?)</span></label>
                   <textarea 
                     value={form.features}
                     onChange={(e) => setForm({...form, features: e.target.value})}
                     className="w-full px-5 py-4 rounded-xl bg-slate-800/50 dark:bg-slate-900/50 border border-slate-700 dark:border-slate-600 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all min-h-[120px] placeholder:text-slate-600 resize-y text-lg"
                     placeholder="List your main features or benefits (e.g. One-click setup, 24/7 support)..."
                   />
                 </div>
               </div>
             </div>
             {!result && (
                <div className="text-center mt-8 text-slate-400 font-medium">
                    Fill in the details above and click Generate to start.
                </div>
             )}
        </div>

        {/* COPY VIEW */}
        {view === 'copy' && (
            <div className="lg:col-span-12 max-w-3xl mx-auto w-full">
             {result ? (
               <div className="space-y-6">
                  {[
                    { key: 'hero', label: 'Hero Section' },
                    { key: 'problem', label: 'Problem Section' },
                    { key: 'solution', label: 'Solution Section' },
                    { key: 'features', label: 'Features Section' },
                    { key: 'howItWorks', label: 'How It Works' },
                    { key: 'socialProof', label: 'Social Proof' },
                    { key: 'faq', label: 'FAQ' },
                    { key: 'cta', label: 'Final Call to Action' }
                  ].map(({ key, label }) => (
                    <SectionCard 
                      key={key}
                      title={label}
                      content={formatSectionContent(result[key as keyof LandingPageCopy], key)}
                    />
                  ))}
               </div>
             ) : (
                <div className="flex flex-col items-center justify-center py-32 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
                    <p className="text-slate-500 dark:text-slate-400 font-medium">No copy generated yet.</p>
                </div>
             )}
           </div>
        )}

        {/* PREVIEW VIEW */}
        {view === 'preview' && (
            <div className="lg:col-span-12 w-full">
                {result ? (
                    <LandingPagePreview data={result} theme={form.colorTheme} />
                ) : (
                    <div className="flex flex-col items-center justify-center py-32 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
                        <p className="text-slate-500 dark:text-slate-400 font-medium">Generate content to see the preview.</p>
                    </div>
                )}
            </div>
        )}
      </div>
    </div>
  );
};