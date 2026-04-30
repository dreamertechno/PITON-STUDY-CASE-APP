import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ContentRequest } from '@/shared/types';

export const maxDuration = 60; // Next.js serverless function max duration
export const dynamic = 'force-dynamic';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

export async function POST(req: Request) {
  try {
    if (!apiKey) {
      return NextResponse.json({ error: "Gemini API anahtarı yapılandırılmamış." }, { status: 500 });
    }

    const body: ContentRequest = await req.json();

    let sourceContext = body.sourceValue;

    if (body.sourceType === 'url') {
      try {
        const urlResponse = await fetch(body.sourceValue);
        if (urlResponse.ok) {
          const html = await urlResponse.text();
          // Extract text by removing scripts, styles, and html tags
          const text = html
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
            .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
            .replace(/<[^>]+>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
            .substring(0, 15000); // Limit context length
          
          sourceContext = `Aşağıdaki web sitesi içeriğini inceleyerek blog yazılarını oluştur:\n\n${text}`;
        }
      } catch (err) {
        console.warn("URL okunamadı:", err);
      }
    }

    // Use Gemini Flash Latest
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const prompt = `
    Sen uzman bir SEO uzmanı ve metin yazarısın. 
    Kullanıcının verdiği bilgilere göre tam olarak ${body.postCount} adet SEO uyumlu blog yazısı üreteceksin.
    
    GİRDİ BİLGİLERİ:
    - Kaynak/Konu: ${sourceContext}
    - Dil: ${body.language}
    - Ton: ${body.tone}
    - Hedef Kitle: ${body.targetAudience}
    - Odak Anahtar Kelimeler: ${body.focusKeywords}
    - SEO Seviyesi: ${body.seoLevel} (Eğer yüksekse anahtar kelimeleri çok akıcı bir şekilde yedir, meta etiketlerini kusursuz hazırla).

    Lütfen tam olarak ${body.postCount} elemanlı bir JSON dizisi oluştur. Dizideki her obje aşağıdaki yapıda olmalıdır:
    {
      "id": "rastgele-benzersiz-string-id",
      "seoTitle": "Arama motorları için optimize edilmiş çarpıcı SEO başlığı",
      "metaTitle": "SEO meta title (maks 60 karakter)",
      "metaDescription": "Tıklama oranını artıracak SEO meta description (maks 155 karakter)",
      "keywords": ["kelime1", "kelime2", "kelime3"],
      "subheadings": ["Alt Başlık 1", "Alt Başlık 2"],
      "content": "<h1>Ana Başlık</h1><p>Giriş paragrafı...</p><h2>Alt Başlık 1</h2><p>İçerik...</p><h2>Sonuç</h2><p>Kapanış...</p>",
      "socialMediaPost": "Bu harika blog yazımızı okumak için linke tıklayın! #SEO #Blog ...",
      "urlSlug": "seo-uyumlu-url-yapisi"
    }
    
    KURALLAR:
    1. İçerik (content) alanı ZENGİN HTML formatında olmalıdır. (p, h2, h3, ul, li, strong etiketlerini kullan). İçerik doyurucu ve uzmanca yazılmış olmalıdır (en az 500 kelime eşdeğeri yoğunlukta).
    2. SADECE GEÇERLİ BİR JSON DİZİSİ döndür. Hiçbir ekstra açıklama, markdown formatı vb. ekleme. Sadece köşeli parantez ile başlayan diziyi ver.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean up if it contains markdown code blocks
    const cleanText = text.replace(/```json/gi, '').replace(/```/gi, '').trim();
    
    let parsedData;
    try {
      parsedData = JSON.parse(cleanText);
    } catch (parseError) {
      console.error("Parse hatası. Gelen metin:", cleanText);
      return NextResponse.json({ error: "Yapay zeka geçerli bir JSON formatı döndüremedi.", details: cleanText }, { status: 500 });
    }

    let domain = 'sizinwebsiteniz.com';
    if (body.sourceType === 'url') {
      try {
        const urlObj = new URL(body.sourceValue);
        domain = urlObj.hostname.replace(/^www\./, '');
      } catch (e) {
        // ignore invalid URL
      }
    }

    // Add createdAt date and domain to all items
    const finalData = parsedData.map((item: any) => ({
      ...item,
      createdAt: new Date().toISOString(),
      domain: domain
    }));

    return NextResponse.json(finalData);

  } catch (error: any) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: error.message || "İçerik üretilirken beklenmeyen bir hata oluştu." }, { status: 500 });
  }
}
