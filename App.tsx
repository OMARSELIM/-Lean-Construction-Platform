
import React, { useState } from 'react';
import { AppTab } from './types';
import Dashboard from './components/Dashboard';
import TaskPlanner from './components/TaskPlanner';
import LeanAdvisor from './components/LeanAdvisor';
import ToolEducation from './components/ToolEducation';
import TemplateLibrary from './components/TemplateLibrary';
import RootCauseTool from './components/RootCauseTool';
import WasteDetector from './components/WasteDetector';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'planner': return <TaskPlanner />;
      case 'advisor': return <LeanAdvisor />;
      case 'tools': return <ToolEducation />;
      case 'templates': return <TemplateLibrary />;
      case 'root-cause': return <RootCauseTool />;
      case 'waste-detector': return <WasteDetector />;
      default: return <Dashboard />;
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: '📊' },
    { id: 'planner', label: 'المخطط الأخير', icon: '📅' },
    { id: 'waste-detector', label: 'كاشف الهدر (AI)', icon: '📷' },
    { id: 'root-cause', label: 'تحليل الأسباب', icon: '🐟' },
    { id: 'templates', label: 'مكتبة القوالب', icon: '📚' },
    { id: 'advisor', label: 'مستشار Lean', icon: '🤖' },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 p-4 md:p-6 flex flex-col border-l border-slate-800">
        <div className="mb-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-900/40">L</div>
          <div>
            <h1 className="text-xl font-extrabold text-white leading-none">LeanBuild</h1>
            <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Construction Pro</span>
          </div>
        </div>
        
        <nav className="flex-1 space-y-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as AppTab)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                activeTab === item.id 
                  ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/30 ring-1 ring-blue-400/50' 
                  : 'hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <span className={`text-xl transition-transform duration-300 ${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110 opacity-70 group-hover:opacity-100'}`}>
                {item.icon}
              </span>
              <span className="font-bold text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-8 pt-6 border-t border-slate-800/50">
          <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-700/50">
             <div className="flex items-center gap-2 mb-2">
               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
               <span className="text-[10px] font-bold text-slate-400 uppercase">مزامنة التعاون</span>
             </div>
             <p className="text-[11px] text-slate-500 leading-relaxed">أنت تعمل في بيئة مشتركة مع 3 مهندسين آخرين.</p>
          </div>
        </div>
      </aside>

      <main className="flex-1 bg-slate-50 p-4 md:p-10 overflow-y-auto">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center text-2xl">
                {navItems.find(i => i.id === activeTab)?.icon}
             </div>
             <div>
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                  {navItems.find(i => i.id === activeTab)?.label}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                   <span className="text-xs text-slate-400">المشروع: </span>
                   <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">برج الجوهرة الإنشائي</span>
                </div>
             </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex flex-col items-end">
               <span className="text-xs font-bold text-slate-700">عمر سليم</span>
               <span className="text-[10px] text-slate-400">مدير المشروع (Lean Champion)</span>
            </div>
            <div className="w-12 h-12 bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
               <div className="w-full h-full bg-slate-200 rounded-xl overflow-hidden flex items-center justify-center font-bold text-slate-400">ع</div>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden sticky bottom-0 bg-white/80 backdrop-blur-lg border-t border-slate-200 p-3 flex justify-around z-50">
          {navItems.map(item => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id as AppTab)}
              className={`flex flex-col items-center p-2 rounded-xl transition-all ${activeTab === item.id ? 'bg-blue-50 text-blue-600' : 'text-slate-400'}`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-[9px] font-black mt-1">{item.label}</span>
            </button>
          ))}
      </div>
    </div>
  );
};

export default App;
