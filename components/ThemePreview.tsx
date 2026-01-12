import React from 'react';
import { ThemeConfig } from '../types';

interface ThemePreviewProps {
  config: ThemeConfig;
}

export const ThemePreview: React.FC<ThemePreviewProps> = ({ config }) => {
  
  // Dynamic styles based on config
  const containerStyle = {
    backgroundColor: config.backgroundColor,
    color: config.textColor,
    fontFamily: config.fontBody,
  };

  const headingStyle = {
    fontFamily: config.fontHeading,
    color: config.primaryColor,
  };

  const buttonStyle = {
    backgroundColor: config.primaryColor,
    color: '#ffffff',
    borderRadius: config.borderRadius,
  };

  const cardStyle = {
    backgroundColor: '#ffffff', // Usually cards are white or slightly off-bg
    borderColor: config.secondaryColor,
    borderRadius: config.borderRadius,
  };

  return (
    <div className="w-full h-full bg-slate-100 p-4 sm:p-8 overflow-y-auto">
      <div className="max-w-5xl mx-auto shadow-2xl rounded-lg overflow-hidden transition-all duration-500" style={containerStyle}>
        
        {/* Mock Header */}
        <header className="border-b px-8 py-6 flex justify-between items-center" style={{ borderColor: `${config.secondaryColor}40` }}>
          <h1 className="text-2xl font-bold tracking-tight" style={headingStyle}>{config.name}</h1>
          <nav className="hidden sm:flex space-x-6 text-sm font-medium opacity-80">
            <a href="#" className="hover:opacity-100">Home</a>
            <a href="#" className="hover:opacity-100">About</a>
            <a href="#" className="hover:opacity-100">Services</a>
            <a href="#" className="hover:opacity-100">Contact</a>
          </nav>
        </header>

        {/* Mock Hero Section */}
        <div className="px-8 py-16 sm:py-24 text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6" style={headingStyle}>
            Welcome to {config.name}
          </h2>
          <p className="max-w-2xl mx-auto text-lg mb-8 opacity-80 leading-relaxed">
            {config.description || "Just another WordPress site created with AI."}
          </p>
          <button className="px-8 py-3 font-semibold text-sm transition-transform active:scale-95 shadow-lg" style={buttonStyle}>
            Get Started
          </button>
        </div>

        {/* Layout Simulation */}
        <div className={`px-8 py-12 ${config.backgroundColor === '#ffffff' ? 'bg-gray-50' : 'bg-black/5'}`}>
          <div className={`grid gap-8 ${
            config.layout === 'grid' ? 'grid-cols-1 sm:grid-cols-3' : 
            config.layout === 'modern' ? 'grid-cols-1 sm:grid-cols-2' : 
            'grid-cols-1 max-w-2xl mx-auto'
          }`}>
            {[1, 2, 3].map((item) => (
              <div key={item} className="p-6 border shadow-sm transition-all hover:shadow-md" style={cardStyle}>
                <div className="h-40 bg-slate-200 mb-4 rounded opacity-50 flex items-center justify-center">
                  <span className="text-slate-400 text-3xl">🖼️</span>
                </div>
                <h3 className="text-xl font-bold mb-2" style={headingStyle}>Blog Post Title {item}</h3>
                <p className="text-sm opacity-70 mb-4 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <a href="#" className="text-sm font-semibold underline decoration-2 underline-offset-4" style={{ color: config.secondaryColor }}>Read More</a>
              </div>
            ))}
          </div>
        </div>

        {/* Mock Footer */}
        <footer className="px-8 py-12 text-center text-sm opacity-60 border-t" style={{ borderColor: `${config.secondaryColor}40` }}>
          <p>&copy; {new Date().getFullYear()} {config.name}. Built with WP Theme Architect.</p>
        </footer>

      </div>
    </div>
  );
};
