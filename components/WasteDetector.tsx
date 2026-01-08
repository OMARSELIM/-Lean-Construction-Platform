
import React, { useState, useRef, useEffect } from 'react';
import { analyzeImageForWaste } from '../services/geminiService';

const WasteDetector: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingMessageIdx, setLoadingMessageIdx] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadingMessages = [
    "جاري فحص العناصر بصرياً...",
    "تحليل تدفق المواد والمعدات...",
    "البحث عن مظاهر الهدر (Muda)...",
    "تحديد أخطاء التخزين والحركة...",
    "صياغة التوصيات الرشيقة...",
    "جاري إنهاء التقرير الإنشائي..."
  ];

  useEffect(() => {
    let interval: number;
    if (loading) {
      interval = window.setInterval(() => {
        setLoadingMessageIdx((prev) => (prev + 1) % loadingMessages.length);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        setImage(reader.result as string);
        processImage(base64String, file.type);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async (base64: string, mime: string) => {
    setLoading(true);
    setAnalysis(null);
    setLoadingMessageIdx(0);
    const result = await analyzeImageForWaste(base64, mime);
    setAnalysis(result);
    setLoading(false);
  };

  const wastes = [
    { icon: '⚠️', name: 'العيوب' },
    { icon: '📦', name: 'المخزون' },
    { icon: '⏳', name: 'الانتظار' },
    { icon: '🏃', name: 'الحركة' },
    { icon: '🛠️', name: 'المعالجة الزائدة' },
    { icon: '🏗️', name: 'الإنتاج الزائد' },
    { icon: '🚛', name: 'النقل' },
    { icon: '💡', name: 'المواهب' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Header Section */}
        <div className="p-8 border-b border-slate-50 bg-slate-50/50">
          <h3 className="text-2xl font-black text-slate-800">كاشف الهدر البصري الذكي</h3>
          <p className="text-slate-500 text-sm mt-1">قم بتحليل صور الموقع لاكتشاف نقاط الهدر الـ 8 وتحسين الكفاءة التشغيلية.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x lg:divide-x-reverse divide-slate-100">
          {/* Left Column: Image Area */}
          <div className="p-8 flex flex-col items-center justify-center bg-white">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 self-start">معاينة الموقع</h4>
            
            {!image ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-full aspect-square border-4 border-dashed border-slate-100 rounded-3xl flex flex-col items-center justify-center hover:border-blue-200 hover:bg-blue-50 transition-all cursor-pointer group group-active:scale-95"
              >
                <div className="text-7xl mb-6 group-hover:scale-110 transition-transform drop-shadow-sm">📸</div>
                <p className="text-slate-400 font-bold">اضغط لرفع صورة الموقع</p>
                <p className="text-slate-300 text-xs mt-2">يدعم JPG, PNG, WebP</p>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  ref={fileInputRef}
                  onChange={handleFileUpload} 
                />
              </div>
            ) : (
              <div className="relative w-full group">
                <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white transition-transform">
                  <img src={image} alt="Site" className="w-full h-auto max-h-[500px] object-cover" />
                  
                  {/* Scanning Animation Overlay */}
                  {loading && (
                    <div className="absolute inset-0 z-10 pointer-events-none">
                      <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,1)] animate-[scan_3s_ease-in-out_infinite]"></div>
                      <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay"></div>
                    </div>
                  )}
                </div>
                
                {!loading && (
                  <button 
                    onClick={() => {setImage(null); setAnalysis(null);}}
                    className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center font-bold transition-all hover:scale-110 z-20"
                    title="إزالة الصورة"
                  >
                    ×
                  </button>
                )}

                <div className="mt-4 flex justify-center">
                   <button 
                    disabled={loading}
                    onClick={() => fileInputRef.current?.click()}
                    className={`text-xs font-bold underline ${loading ? 'text-slate-300' : 'text-blue-600 hover:text-blue-700'}`}
                   >
                     {loading ? 'جاري التحليل...' : 'تغيير الصورة'}
                   </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Analysis Results */}
          <div className="p-8 bg-slate-50/30 flex flex-col">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">تقرير التحليل التلقائي</h4>
            
            <div className="flex-1">
              {loading ? (
                <div className="h-full flex flex-col items-center justify-center py-20 animate-in fade-in duration-300">
                  <div className="relative mb-8">
                    {/* Layered Spinner */}
                    <div className="w-20 h-20 border-4 border-slate-200 rounded-full"></div>
                    <div className="absolute top-0 left-0 w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <div className="absolute top-2 left-2 w-16 h-16 border-4 border-blue-400 border-b-transparent rounded-full animate-[spin_1.5s_linear_infinite_reverse]"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl animate-pulse">🤖</div>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-blue-600 font-black text-lg transition-all duration-500">
                      {loadingMessages[loadingMessageIdx]}
                    </p>
                    <div className="flex gap-1 justify-center mt-3">
                      {loadingMessages.map((_, i) => (
                        <div 
                          key={i} 
                          className={`h-1.5 rounded-full transition-all duration-500 ${i === loadingMessageIdx ? 'w-8 bg-blue-600' : 'w-2 bg-slate-200'}`}
                        ></div>
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-400 text-xs mt-6 max-w-[250px] text-center leading-relaxed">
                    نقوم باستخدام رؤية الكمبيوتر المتقدمة لمطابقة الصورة مع مبادئ الـ Lean الثمانية.