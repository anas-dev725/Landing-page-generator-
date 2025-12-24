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
    <div className="group bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-md hover:border-indigo-200 mb-6">
      <div className="bg-slate-50/50 px-5 py-4 border-b border-slate-100 flex justify-between items-center backdrop-blur-sm">
        <h3 className="font-display font-bold text-slate-800 text-sm uppercase tracking-wider flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
          {title}
        </h3>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
           <button 
            onClick={toggleEdit}
            className={`p-2 rounded-lg transition-all ${isEditing ? 'bg-indigo-100 text-indigo-700' : 'text-slate-400 hover:text-indigo-600 hover:bg-white'}`}
            title={isEditing ? "Stop Editing" : "Edit Copy"}
          >
            {isEditing ? <Save className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
          </button>
          {onRegenerate && (
            <button 
              onClick={onRegenerate}
              disabled={isRegenerating}
              className={`p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-lg transition-all ${isRegenerating ? 'animate-spin text-indigo-600' : ''}`}
              title="Regenerate this section"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          )}
          <button 
            onClick={handleCopy}
            className={`p-2 rounded-lg transition-all ${copied ? 'bg-green-100 text-green-700' : 'text-slate-400 hover:text-indigo-600 hover:bg-white'}`}
            title="Copy to clipboard"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      </div>
      <div className="p-6 relative">
        {isEditing ? (
          <textarea 
            className="w-full min-h-[200px] p-4 bg-slate-50 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none text-slate-700 font-mono text-sm leading-relaxed transition-all resize-y"
            value={editableContent}
            onChange={(e) => setEditableContent(e.target.value)}
            spellCheck={false}
          />
        ) : (
          <div className="prose prose-slate prose-sm max-w-none text-slate-600 leading-relaxed">
            <pre className="whitespace-pre-wrap font-sans bg-transparent p-0 border-none shadow-none">{editableContent}</pre>
          </div>
        )}
      </div>
    </div>
  );
};
