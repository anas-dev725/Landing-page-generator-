import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Clock, FileText, ArrowRight, Trash2, Search, Download } from 'lucide-react';
import { getProjects, deleteProject } from '../services/storageService';
import { Project, LandingPageCopy } from '../types';

export const Dashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.preventDefault(); // Prevent navigation
    if (confirm('Are you sure you want to delete this project?')) {
      deleteProject(id);
      setProjects(getProjects());
    }
  };

  const handleExport = (e: React.MouseEvent, project: Project) => {
    e.preventDefault();
    if (!project.copy) return;

    const copy = project.copy;
    const formatSection = (title: string, data: any) => {
      let text = `=== ${title.toUpperCase()} ===\n`;
      if (typeof data === 'string') return text + data + '\n\n';
      
      // Basic formatting for different section structures
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

    let fullText = `LAUNCHCOPY EXPORT: ${project.name}\n`;
    fullText += `Target Audience: ${project.input.audience}\n`;
    fullText += `Tone: ${project.input.tone}\n`;
    fullText += `Generated at: ${new Date(project.updatedAt).toLocaleString()}\n\n`;

    fullText += formatSection('Hero', copy.hero);
    fullText += formatSection('Problem', copy.problem);
    fullText += formatSection('Solution', copy.solution);
    fullText += formatSection('Features', copy.features);
    fullText += formatSection('How It Works', copy.howItWorks);
    fullText += formatSection('Social Proof', copy.socialProof);
    fullText += formatSection('FAQ', copy.faq);
    fullText += formatSection('Call to Action', copy.cta);

    const blob = new Blob([fullText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${project.name.replace(/\s+/g, '_')}_copy.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.input.audience.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white">Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your landing page projects.</p>
        </div>
        <div className="flex gap-3">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input 
                    type="text" 
                    placeholder="Search projects..." 
                    className="pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none w-full md:w-64 text-sm transition-colors"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <Link 
                to="/app/create" 
                className="flex items-center gap-2 bg-indigo-600 text-white font-bold py-2.5 px-5 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-indigo-900/50 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all"
            >
                <Plus className="h-5 w-5" />
                <span className="hidden sm:inline">New Project</span>
            </Link>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-12 text-center transition-colors">
          <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No projects yet</h3>
          <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm mx-auto">Create your first landing page copy in seconds using our AI generator.</p>
          <Link 
            to="/app/create" 
            className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold py-3 px-6 rounded-xl hover:border-indigo-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-sm"
          >
            <Plus className="h-4 w-4" /> Create Project
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {/* New Project Card */}
           <Link 
            to="/app/create"
            className="group flex flex-col items-center justify-center min-h-[200px] bg-slate-50 dark:bg-slate-900/50 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 transition-all cursor-pointer"
          >
            <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Plus className="h-6 w-6 text-slate-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
            </div>
            <span className="font-bold text-slate-600 dark:text-slate-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-400">Create New Project</span>
          </Link>

          {filteredProjects.map((project) => (
            <Link 
              to={`/app/project/${project.id}`} 
              key={project.id}
              className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-xl hover:border-indigo-200 dark:hover:border-indigo-800 transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                 <button 
                    onClick={(e) => handleExport(e, project)}
                    className="p-2 bg-white dark:bg-slate-800 text-slate-400 hover:text-indigo-600 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700 transition-colors"
                    title="Export as Text"
                 >
                    <Download className="h-4 w-4" />
                 </button>
                 <button 
                    onClick={(e) => handleDelete(e, project.id)}
                    className="p-2 bg-white dark:bg-slate-800 text-slate-400 hover:text-red-500 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700 transition-colors"
                    title="Delete Project"
                 >
                    <Trash2 className="h-4 w-4" />
                 </button>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-lg">
                    {project.name.charAt(0).toUpperCase()}
                </div>
                <div>
                    <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate max-w-[150px]">{project.name}</h3>
                    <p className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(project.updatedAt).toLocaleDateString()}
                    </p>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-1">Target Audience</p>
                    <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2 h-10">{project.input.audience}</p>
                </div>
              </div>

              <div className="flex items-center text-indigo-600 dark:text-indigo-400 text-sm font-bold mt-auto group-hover:translate-x-1 transition-transform">
                Open Project <ArrowRight className="h-4 w-4 ml-1" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};