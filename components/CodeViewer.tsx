import React, { useState } from 'react';
import { GeneratedFile } from '../types';
import { Copy, Download, FileCode, Check } from 'lucide-react';

interface CodeViewerProps {
  files: GeneratedFile[];
  onClose: () => void;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ files, onClose }) => {
  const [selectedFile, setSelectedFile] = useState<GeneratedFile>(files[0]);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!files || files.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl h-[80vh] flex flex-col overflow-hidden animate-fade-in">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileCode className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold">Generated Theme Files</h2>
          </div>
          <button 
            onClick={onClose}
            className="hover:bg-slate-800 p-2 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          
          {/* Sidebar */}
          <div className="w-64 bg-slate-100 border-r border-slate-200 overflow-y-auto">
            <div className="p-4">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Project Structure</h3>
              <ul className="space-y-1">
                {files.map((file) => (
                  <li key={file.filename}>
                    <button
                      onClick={() => setSelectedFile(file)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                        selectedFile.filename === file.filename
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <span className="text-xs opacity-70">
                        {file.filename.endsWith('php') ? '🐘' : file.filename.endsWith('css') ? '🎨' : '📄'}
                      </span>
                      {file.filename}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Code Editor Area */}
          <div className="flex-1 flex flex-col bg-[#1e1e1e] text-slate-300">
            
            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-[#3e3e42]">
              <span className="text-sm font-mono text-slate-400">{selectedFile.filename}</span>
              <div className="flex gap-2">
                <button 
                  onClick={handleCopy}
                  className="flex items-center gap-1 px-3 py-1.5 bg-[#3e3e42] hover:bg-[#4e4e52] text-xs text-white rounded transition-colors"
                >
                  {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Code Content */}
            <div className="flex-1 overflow-auto p-4 font-mono text-sm">
              <pre>
                <code>{selectedFile.content}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
