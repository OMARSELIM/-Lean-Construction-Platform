
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { PPC_DATA } from '../constants';

const Dashboard: React.FC = () => {
  const currentPPC = PPC_DATA[PPC_DATA.length - 1].percentage;
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center">
          <span className="text-slate-500 text-sm mb-1">نسبة إنجاز المخطط (PPC)</span>
          <span className={`text-4xl font-bold ${currentPPC > 80 ? 'text-green-600' : 'text-orange-500'}`}>{currentPPC}%</span>
          <span className="text-xs text-slate-400 mt-2">الأسبوع الحالي</span>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center">
          <span className="text-slate-500 text-sm mb-1">المهام المكتملة</span>
          <span className="text-4xl font-bold text-blue-600">12</span>
          <span className="text-xs text-slate-400 mt-2">من أصل 15 مهمة</span>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center">
          <span className="text-slate-500 text-sm mb-1">أسباب التأخير الأكثر شيوعاً</span>
          <span className="text-xl font-bold text-red-500">تأخر التوريدات</span>
          <span className="text-xs text-slate-400 mt-2">بنسبة 40% من العوائق</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-4">تطور نسبة PPC الأسبوعية</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={PPC_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="percentage" stroke="#3b82f6" strokeWidth={3} dot={{r: 6, fill: '#3b82f6'}} activeDot={{r: 8}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-4">تحليل الهدر (Muda Analysis)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'الانتظار', val: 30 },
                { name: 'النقل', val: 15 },
                { name: 'الحركة', val: 20 },
                { name: 'العيوب', val: 10 },
                { name: 'المخزون', val: 25 },
              ]}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis hide />
                <Tooltip cursor={{fill: '#f8fafc'}} />
                <Bar dataKey="val" radius={[4, 4, 0, 0]}>
                  {[0,1,2,3,4].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#ef4444', '#f97316', '#eab308', '#3b82f6', '#8b5cf6'][index % 5]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
