import React, { useState } from 'react';
import { Controls } from './components/Controls';
import { ThemePreview } from './components/ThemePreview';
import { CodeViewer } from './components/CodeViewer';
import { ThemeConfig, GeneratedFile, GenerationStatus } from './types';
import { generateWPThemeCode, suggestThemeConfig } from './services/geminiService';

const DEFAULT_CONFIG: ThemeConfig = {
  name: "My Awesome Theme",
  description: "A customized WordPress theme generated with AI.",
  primaryColor: "#3b82f6",
  secondaryColor: "#64748b",
  backgroundColor: "#ffffff",
  textColor: "#0f172a",
  fontHeading: "Inter, sans-serif",
  fontBody: "Inter, sans-serif",
  borderRadius: "0.5rem",
  layout: "modern",
};

const App: React.FC = () => {
  const [config, setConfig] = useState<ThemeConfig>(DEFAULT_CONFIG);
  const [prompt, setPrompt] = useState("");
  const [generatedFiles, setGeneratedFiles] = useState<GeneratedFile[]>([]);
  const [status, setStatus] = useState<GenerationStatus>(GenerationStatus.IDLE);
  const [showCode, setShowCode] = useState(false);

  const handleAutoStyle = async () => {
    if (!prompt.trim()) return;
    
    setStatus(GenerationStatus.LOADING);
    try {
      const suggestions = await suggestThemeConfig(prompt);
      setConfig(prev => ({
        ...prev,
        ...suggestions
      }));
      setStatus(GenerationStatus.IDLE);
    } catch (error) {
      console.error(error);
      setStatus(GenerationStatus.ERROR);
      setTimeout(() => setStatus(GenerationStatus.IDLE), 3000);
    }
  };

  const handleGenerateCode = async () => {
    setStatus(GenerationStatus.LOADING);
    try {
      // Use the prompt if available, otherwise describe the current config
      const generationPrompt = prompt || `Create a ${config.layout} theme named ${config.name} with primary color ${config.primaryColor}.`;
      
      const files = await generateWPThemeCode(generationPrompt, config);
      setGeneratedFiles(files);
      setShowCode(true);
      setStatus(GenerationStatus.SUCCESS);
    } catch (error) {
      console.error("Failed to generate code", error);
      setStatus(GenerationStatus.ERROR);
      alert("Failed to generate theme files. Please check your API key.");
    } finally {
      setStatus(GenerationStatus.IDLE);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden bg-slate-50">
      
      {/* Sidebar Controls */}
      <div className="w-full md:w-[400px] flex-shrink-0 h-[40vh] md:h-full z-10 shadow-xl">
        <Controls 
          config={config}
          setConfig={setConfig}
          onGenerateCode={handleGenerateCode}
          status={status}
          prompt={prompt}
          setPrompt={setPrompt}
          onAutoStyle={handleAutoStyle}
        />
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 h-[60vh] md:h-full relative">
        <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-slate-500 border shadow-sm">
          Live Preview
        </div>
        <ThemePreview config={config} />
      </div>

      {/* Code Modal */}
      {showCode && (
        <CodeViewer 
          files={generatedFiles} 
          onClose={() => setShowCode(false)} 
        />
      )}
    </div>
  );
};

export default App;
