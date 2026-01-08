
import React from 'react';
import { LEAN_TOOLS } from '../constants';

const ToolEducation: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {LEAN_TOOLS.map(tool => (
        <div key={tool.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="text-4xl mb-4">{tool.icon}</div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">{tool.name}</h3>
          <p className="text-sm text-slate-600 mb-4 leading-relaxed">{tool.description}</p>
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">خطوات التنفيذ:</h4>
            <div className="flex flex-wrap gap-2">
              {tool.steps.map((step, idx) => (
                <span key={idx} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-md border border-blue-100">
                  {idx + 1}. {step}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToolEducation;
