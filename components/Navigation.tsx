
import React from 'react';
import { AppView } from '../types';

interface NavProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
}

const Navigation: React.FC<NavProps> = ({ currentView, onViewChange }) => {
  const items = [
    { id: AppView.DASHBOARD, label: 'Overview', icon: 'fa-house' },
    { id: AppView.BIAS_CHECKER, label: 'Bias Checker', icon: 'fa-scale-balanced' },
    { id: AppView.HARASSMENT_DETECTOR, label: 'Harassment Guard', icon: 'fa-shield-halved' },
    { id: AppView.SAFETY_CHAT, label: 'Safety Bot', icon: 'fa-comment-dots' },
    { id: AppView.DOCUMENTATION, label: 'Project Docs', icon: 'fa-file-lines' },
  ];

  return (
    <nav className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 z-20">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-sdg-5 rounded-lg flex items-center justify-center text-white">
            <i className="fa-solid fa-venus-mars text-xl"></i>
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">EquiGuard</h1>
            <p className="text-xs text-sdg-5 font-semibold">SDG 5 AI Agent</p>
          </div>
        </div>
      </div>
      <div className="flex-1 py-4 px-3 space-y-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              currentView === item.id
                ? 'bg-sdg-5 text-white shadow-lg shadow-red-200'
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <i className={`fa-solid ${item.icon} ${currentView === item.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'}`}></i>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </div>
      <div className="p-4 border-t border-gray-100">
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-[10px] uppercase font-bold text-gray-400 mb-2">Developed for</p>
          <p className="text-xs font-semibold text-gray-600">Capstone Project Internship</p>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
