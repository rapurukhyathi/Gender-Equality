
import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">SDG 5 Impact Hub</h1>
          <p className="text-gray-500 font-medium">Monitoring Gender Equality & Safety via Agentic AI</p>
        </div>
        <div className="bg-sdg-5 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-sm flex items-center gap-2">
          <i className="fa-solid fa-calendar-days"></i>
          {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Bias Detected', value: '42%', icon: 'fa-scale-unbalanced', trend: '+5%', color: 'text-red-500' },
          { label: 'Content Audited', value: '1,284', icon: 'fa-file-signature', trend: '24h', color: 'text-blue-500' },
          { label: 'Safety Score', value: '8.4', icon: 'fa-shield-heart', trend: '+0.2', color: 'text-green-500' },
          { label: 'Agent Tasks', value: '312', icon: 'fa-robot', trend: 'Live', color: 'text-purple-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
            <div className={`w-12 h-12 rounded-2xl mb-4 flex items-center justify-center bg-gray-50 group-hover:scale-110 transition-transform ${stat.color}`}>
              <i className={`fa-solid ${stat.icon} text-xl`}></i>
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
              <span className="text-[10px] font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded-md">{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
            <i className="fa-solid fa-bullseye text-sdg-5"></i>
            SDG 5 Targets Focus
          </h3>
          <div className="space-y-6">
            {[
              { label: 'Eliminate Harmful Practices', progress: 65, color: 'bg-sdg-5' },
              { label: 'Women in Leadership', progress: 42, color: 'bg-sdg-5/70' },
              { label: 'Access to Digital Economy', progress: 88, color: 'bg-sdg-5/40' },
            ].map((target, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-bold text-gray-700">{target.label}</span>
                  <span className="text-sm font-black text-gray-900">{target.progress}%</span>
                </div>
                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                  <div className={`${target.color} h-full rounded-full transition-all duration-1000`} style={{ width: `${target.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-4">Agentic AI Insights</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Our AI agents are currently crawling external job boards. Preliminary data suggests a 12% decrease in masculine-coded language in Tech sectors since Q3.
            </p>
            <button className="bg-sdg-5 hover:bg-red-600 text-white px-6 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2">
              View Detailed Report
              <i className="fa-solid fa-arrow-right text-xs"></i>
            </button>
          </div>
          <div className="absolute top-[-20px] right-[-20px] opacity-10">
            <i className="fa-solid fa-robot text-[200px]"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
