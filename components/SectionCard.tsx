import React, { useState } from 'react';
import { Copy, RefreshCw, Check, Edit2, Save } from 'lucide-react';

interface SectionCardProps {
  title: string;
  content: string;
  onRegenerate?: () => void;
  isRegenerating?: boolean;
}

export const SectionCard: React.FC<SectionCardProps> = ({ title, content, onRegenerate, isRegenerating }) => {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editableContent, setEditableContent] = useState(content);

  React.useEffect(() => {
    setEditableContent(content);
  }, [content]);

  const handleCopy = () => {
    navigator.clipboard.writeText(editableContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="group bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-300 hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-900 mb-6">
      <div className="bg-slate-50/50 dark:bg-slate-800/50 px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center backdrop-blur-sm">
        <h3 className="font-display font-bold text-slate-800 dark:text-slate-200 text-sm uppercase tracking-wider flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
          {title}
        </h3>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
           <button 
            onClick={toggleEdit}
            className={`p-2 rounded-lg transition-all ${isEditing ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400' : 'text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-slate-700'}`}
            title={isEditing ? "Stop Editing" : "Edit Copy"}
          >
            {isEditing ? <Save className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
          </button>
          {onRegenerate && (
            <button 
              onClick={onRegenerate}
              disabled={isRegenerating}
              className={`p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-all ${isRegenerating ? 'animate-spin text-indigo-600' : ''}`}
              title="Regenerate this section"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          )}
          <button 
            onClick={handleCopy}
            className={`p-2 rounded-lg transition-all ${copied ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-slate-700'}`}
            title="Copy to clipboard"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      </div>
      <div className="p-6 relative">
        {isEditing ? (
          <textarea 
            className="w-full min-h-[200px] p-4 bg-slate-50 dark:bg-slate-800 border border-indigo-200 dark:border-indigo-900 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none text-slate-700 dark:text-slate-300 font-mono text-sm leading-relaxed transition-all resize-y"
            value={editableContent}
            onChange={(e) => setEditableContent(e.target.value)}
            spellCheck={false}
          />
        ) : (
          <div className="prose prose-slate dark:prose-invert prose-sm max-w-none text-slate-600 dark:text-slate-300 leading-relaxed">
            <pre className="whitespace-pre-wrap font-sans bg-transparent p-0 border-none shadow-none">{editableContent}</pre>
          </div>
        )}
      </div>
    </div>
  );
};