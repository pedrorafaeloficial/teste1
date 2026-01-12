import React from 'react';
import { ThemeConfig, GenerationStatus } from '../types';
import { Wand2, Loader2, RefreshCw } from 'lucide-react';

interface ControlsProps {
  config: ThemeConfig;
  setConfig: React.Dispatch<React.SetStateAction<ThemeConfig>>;
  onGenerateCode: () => void;
  status: GenerationStatus;
  prompt: string;
  setPrompt: (s: string) => void;
  onAutoStyle: () => void;
}

export const Controls: React.FC<ControlsProps> = ({ 
  config, 
  setConfig, 
  onGenerateCode, 
  status,
  prompt,
  setPrompt,
  onAutoStyle
}) => {
  
  const handleChange = (key: keyof ThemeConfig, value: string) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="w-full h-full bg-white border-r border-slate-200 flex flex-col">
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">WP</div>
          <h1 className="text-xl font-bold text-slate-900">Theme Architect</h1>
        </div>
        <p className="text-xs text-slate-500">AI-Powered WordPress Theme Generator</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        
        {/* AI Section */}
        <section className="space-y-4">
          <label className="block text-sm font-semibold text-slate-900">
            Describe your vision
          </label>
          <textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full h-24 p-3 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-slate-50"
            placeholder="e.g. A dark portfolio for a photographer with gold accents..."
          />
          <button 
            onClick={onAutoStyle}
            disabled={status === GenerationStatus.LOADING || !prompt}
            className="w-full py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
          >
            {status === GenerationStatus.LOADING ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Wand2 className="w-4 h-4" />
            )}
            Auto-Apply Styles
          </button>
        </section>

        <hr className="border-slate-100" />

        {/* Manual Controls */}
        <section className="space-y-6">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Visual Identity</h3>
          
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
               <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Primary Color</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="color" 
                    value={config.primaryColor}
                    onChange={(e) => handleChange('primaryColor', e.target.value)}
                    className="h-8 w-8 rounded overflow-hidden cursor-pointer border border-slate-200 p-0"
                  />
                  <span className="text-xs text-slate-500 font-mono">{config.primaryColor}</span>
                </div>
              </div>

               <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Background</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="color" 
                    value={config.backgroundColor}
                    onChange={(e) => handleChange('backgroundColor', e.target.value)}
                    className="h-8 w-8 rounded overflow-hidden cursor-pointer border border-slate-200 p-0"
                  />
                  <span className="text-xs text-slate-500 font-mono">{config.backgroundColor}</span>
                </div>
              </div>
            </div>

             <div className="grid grid-cols-2 gap-4">
               <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Secondary</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="color" 
                    value={config.secondaryColor}
                    onChange={(e) => handleChange('secondaryColor', e.target.value)}
                    className="h-8 w-8 rounded overflow-hidden cursor-pointer border border-slate-200 p-0"
                  />
                  <span className="text-xs text-slate-500 font-mono">{config.secondaryColor}</span>
                </div>
              </div>

               <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Text Color</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="color" 
                    value={config.textColor}
                    onChange={(e) => handleChange('textColor', e.target.value)}
                    className="h-8 w-8 rounded overflow-hidden cursor-pointer border border-slate-200 p-0"
                  />
                  <span className="text-xs text-slate-500 font-mono">{config.textColor}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-medium text-slate-600">Site Name</label>
            <input 
              type="text" 
              value={config.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full p-2 text-sm border border-slate-200 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-medium text-slate-600">Layout Style</label>
            <div className="grid grid-cols-3 gap-2">
              {(['classic', 'modern', 'grid'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => handleChange('layout', l)}
                  className={`py-2 text-xs font-medium rounded border ${
                    config.layout === l 
                      ? 'bg-blue-50 border-blue-500 text-blue-700' 
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {l.charAt(0).toUpperCase() + l.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
             <label className="block text-xs font-medium text-slate-600">Typography (Body)</label>
             <select 
               value={config.fontBody}
               onChange={(e) => handleChange('fontBody', e.target.value)}
               className="w-full p-2 text-sm border border-slate-200 rounded bg-white"
             >
               <option value="Inter, sans-serif">Inter (Sans)</option>
               <option value="'Times New Roman', serif">Times (Serif)</option>
               <option value="'Courier New', monospace">Courier (Mono)</option>
               <option value="system-ui, sans-serif">System UI</option>
             </select>
          </div>
        </section>
      </div>

      <div className="p-6 border-t border-slate-100 bg-slate-50">
        <button
          onClick={onGenerateCode}
          disabled={status === GenerationStatus.LOADING}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/30 transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {status === GenerationStatus.LOADING ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating Files...
            </>
          ) : (
            <>
              Generate Theme Files
            </>
          )}
        </button>
      </div>
    </div>
  );
};
