
import React from 'react';
import { LEAN_TEMPLATES } from '../constants';

const TemplateLibrary: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-slate-800">مكتبة القوالب الذكية</h3>
        <button className="text-sm text-blue-600 font-bold hover:underline">إضافة قالب مخصص +</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {LEAN_TEMPLATES.map(template => (
          <div key={template.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-300 transition-all group cursor-pointer">
            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
              {template.icon}
            </div>
            <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">{template.category}</span>
            <h4 className="text-lg font-bold text-slate-800 mt-1">{template.title}</h4>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">{template.description}</p>
            <div className="mt-6 flex gap-2">
              <button className="flex-1 bg-blue-600 text-white text-xs font-bold py-2 rounded-lg hover:bg-blue-700 transition-colors">استخدام القالب</button>
              <button className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:bg-slate-100">👁️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateLibrary;
