'use client';

import { useState } from 'react';
import { useContentStore } from '@/shared/store/useContentStore';
import { ContentRequest } from '@/shared/types';
import { Loader2, Sparkles } from 'lucide-react';

export default function GeneratorForm() {
  const { addMultipleContents, setIsGenerating, isGenerating } = useContentStore();

  const [formData, setFormData] = useState<ContentRequest>({
    sourceType: 'prompt',
    sourceValue: '',
    postCount: 1,
    language: 'Türkçe',
    tone: 'Profesyonel',
    targetAudience: 'Genel',
    focusKeywords: '',
    seoLevel: 'Yüksek'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.sourceValue.trim()) return;

    try {
      setIsGenerating(true);
      
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('API yanıt vermedi.');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      // Add to Zustand Store
      addMultipleContents(data);
      
    } catch (error) {
      console.error(error);
      alert('İçerik üretilirken hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
      <div className="mb-6 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-blue-400" />
        <h2 className="text-xl font-semibold text-zinc-100">AI İçerik Üretici</h2>
      </div>

      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Kaynak Türü</label>
          <select 
            name="sourceType" 
            value={formData.sourceType} 
            onChange={handleChange}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-100 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all"
          >
            <option value="prompt">Serbest Metin (Prompt)</option>
            <option value="url">Web Sitesi URL</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">
            {formData.sourceType === 'url' ? 'URL Giriniz' : 'Konu / Prompt'}
          </label>
          <textarea 
            name="sourceValue" 
            value={formData.sourceValue} 
            onChange={handleChange}
            placeholder={formData.sourceType === 'url' ? 'https://...' : 'Yapay zeka hakkında bir blog yazısı...'}
            rows={3}
            required
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Yazı Sayısı</label>
            <input 
              type="number" 
              name="postCount" 
              value={formData.postCount} 
              onChange={handleChange}
              min={1} max={5}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-100 focus:ring-2 focus:ring-blue-500/50 outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Dil</label>
            <select name="language" value={formData.language} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-100 focus:ring-2 focus:ring-blue-500/50 outline-none">
              <option value="Türkçe">Türkçe</option>
              <option value="İngilizce">İngilizce</option>
              <option value="Almanca">Almanca</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Yazı Tonu</label>
            <select name="tone" value={formData.tone} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-100 focus:ring-2 focus:ring-blue-500/50 outline-none">
              <option value="Profesyonel">Profesyonel</option>
              <option value="Samimi">Samimi</option>
              <option value="Eğitici">Eğitici</option>
              <option value="İkna Edici">İkna Edici</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">SEO Seviyesi</label>
            <select name="seoLevel" value={formData.seoLevel} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-100 focus:ring-2 focus:ring-blue-500/50 outline-none">
              <option value="Düşük">Düşük</option>
              <option value="Orta">Orta</option>
              <option value="Yüksek">Yüksek</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Odak Anahtar Kelimeler (Virgülle ayırın)</label>
          <input 
            type="text" 
            name="focusKeywords" 
            value={formData.focusKeywords} 
            onChange={handleChange}
            placeholder="yapay zeka, seo, içerik üretimi"
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-100 focus:ring-2 focus:ring-blue-500/50 outline-none"
          />
        </div>

        <button 
          type="button" 
          onClick={handleSubmit}
          disabled={isGenerating}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Üretiliyor...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              SEO İçerik Üret
            </>
          )}
        </button>

      </form>
    </div>
  );
}
