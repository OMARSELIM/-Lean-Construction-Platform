
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getLeanAdvice(prompt: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: `أنت خبير في البناء الرشيق (Lean Construction). 
        ساعد المهندسين في حل مشاكل الموقع باستخدام أدوات مثل Last Planner, 5S, JIT, Kaizen. 
        اجعل إجاباتك عملية ومختصرة وباللغة العربية الفصحى.`,
        temperature: 0.7,
      },
    });
    return response.text || "عذراً، لم أستطع توليد نصيحة حالياً.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "حدث خطأ أثناء الاتصال بمستشار الذكاء الاصطناعي.";
  }
}

export async function analyzeImageForWaste(base64Image: string, mimeType: string): Promise<string> {
  try {
    // Fixed multi-part content structure to follow SDK guidelines (using { parts: [...] })
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          },
          {
            text: `بصفتك خبير Lean Construction، حلل هذه الصورة من موقع البناء وابحث عن أنواع الهدر الثمانية (8 Wastes):
          1. العيوب (Defects)
          2. الإنتاج الزائد (Overproduction)
          3. الانتظار (Waiting)
          4. المواهب غير المستغلة (Non-utilized talent)
          5. النقل (Transportation)
          6. المخزون (Inventory)
          7. الحركة (Motion)
          8. المعالجة الزائدة (Extra-processing)
          
          اذكر فقط أنواع الهدر التي تلاحظها في الصورة بوضوح، واشرح السبب، ثم قدم نصيحة سريعة للتخلص منها باستخدام منهجية Lean. اجعل الإجابة مرتبة في نقاط.`
          }
        ]
      },
      config: {
        systemInstruction: "أنت متخصص في الرؤية الحاسوبية المطبقة على البناء الرشيق. ركز على التفاصيل التقنية والتنظيمية في الموقع.",
        temperature: 0.4,
      }
    });
    return response.text || "لم يتم اكتشاف هدر واضح في هذه الصورة.";
  } catch (error) {
    console.error("Gemini Vision Error:", error);
    return "فشل تحليل الصورة. يرجى المحاولة مرة أخرى.";
  }
}
