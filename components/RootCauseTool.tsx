
import React, { useState } from 'react';

const RootCauseTool: React.FC = () => {
  const [problem, setProblem] = useState('تأخر تسليم حديد التسليح');
  // Fixed: explicitly typed causes as Record<string, string[]> to ensure Typescript correctly infers 'items' in Object.entries
  const [causes, setCauses] = useState<Record<string, string[]>>({
    'Man (الأفراد)': ['نقص العمالة المدربة', 'إصابات عمل'],
    'Method (الطرق)': ['طريقة الرفع بطيئة', 'تداخل المسارات'],
    'Material (المواد)': ['تأخر المورد الأساسي', 'فشل في اختبار الشد'],
    'Machine (المعدات)': ['عطل في الونش البرجي', 'نقص مقصات الحديد']
  });

  const addCause = (category: string) => {
    const text = prompt('أدخل السبب الجديد:');
    if (text) {
      setCauses({
        ...causes,
        [category]: [...causes[category], text]
      });
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 overflow-x-auto">
      <div className="min-w-[800px]">
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-xl font-bold text-slate-800">مخطط إيشيكاوا (عظم السمكة)</h3>
          <div className="flex gap-2">
            <button className="bg-slate-100 text-slate-600 px-4 py-2 rounded-xl text-sm font-bold">حفظ كـ PDF</button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold">مشاركة التحليل</button>
          </div>
        </div>

        <div className="relative pt-20 pb-20">
          {/* Main Spine */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 transform -translate-y-1/2"></div>
          
          {/* Effect / Head */}
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-full pr-4">
             <div className="bg-red-500 text-white p-4 rounded-xl shadow-lg font-bold text-center w-48 border-4 border-red-100">
               {problem}
             </div>
          </div>

          <div className="grid grid-cols-2 gap-x-20 gap-y-32">
            {/* Added explicit cast to resolve 'unknown' type error on map function at line 58 */}
            {(Object.entries(causes) as [string, string[]][]).map(([category, items], idx) => (
              <div key={category} className={`relative flex flex-col ${idx < 2 ? 'items-end pb-10' : 'items-end pt-10'}`}>
                {/* Diagonal Bone */}
                <div className={`absolute right-0 w-1 bg-slate-300 h-24 transform ${idx < 2 ? 'rotate-45 -bottom-5' : '-rotate-45 -top-5'}`}></div>
                
                <div className="bg-slate-800 text-white px-3 py-1 rounded-md text-xs font-bold mb-4 z-10">
                  {category}
                </div>
                
                <div className="space-y-2 z-10 w-48">
                  {/* Fixed: items is now typed correctly as string[], allowing map() to be used */}
                  {items.map((item, i) => (
                    <div key={i} className="bg-slate-50 border-r-4 border-blue-400 p-2 text-[11px] text-slate-700 shadow-sm flex justify-between items-center">
                      {item}
                      <button className="text-slate-300 hover:text-red-400">×</button>
                    </div>
                  ))}
                  <button 
                    onClick={() => addCause(category)}
                    className="w-full border border-dashed border-slate-300 text-slate-400 text-[10px] py-1 hover:bg-slate-50 transition-colors"
                  >
                    + إضافة سبب
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-slate-400 mt-10">استخدم هذا المخطط لتحديد الأسباب الجذرية للهدر في العملية الإنشائية</p>
    </div>
  );
};

export default RootCauseTool;
