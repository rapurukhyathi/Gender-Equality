
import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import BiasChecker from './components/BiasChecker';
import HarassmentDetector from './components/HarassmentDetector';
import SafetyChat from './components/SafetyChat';
import Documentation from './components/Documentation';
import { AppView } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return <Dashboard />;
      case AppView.BIAS_CHECKER:
        return <BiasChecker />;
      case AppView.HARASSMENT_DETECTOR:
        return <HarassmentDetector />;
      case AppView.SAFETY_CHAT:
        return <SafetyChat />;
      case AppView.DOCUMENTATION:
        return <Documentation />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="pl-64 min-h-screen">
        {/* Top Header */}
        <div className="h-16 bg-white/50 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Active Module:</span>
            <span className="text-sm font-bold text-gray-900">{currentView.replace('_', ' ')}</span>
          </div>
          <div className="flex items-center gap-4">
             <button className="text-gray-400 hover:text-gray-600">
               <i className="fa-solid fa-bell"></i>
             </button>
             <div className="w-8 h-8 rounded-full bg-sdg-5/20 text-sdg-5 flex items-center justify-center font-bold text-xs border border-sdg-5/30">
               IA
             </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
