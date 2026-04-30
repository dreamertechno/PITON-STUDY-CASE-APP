'use client';

import { useContentStore } from '@/shared/store/useContentStore';
import { GeneratedContent } from '@/shared/types';
import { Trash2, Edit, FileText, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import SerpPreview from '../seo-analyzer/SerpPreview';

export default function ContentList({ onSelect }: { onSelect: (content: GeneratedContent) => void }) {
  const { contents, removeContent } = useContentStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Or a loading skeleton
  }

  if (contents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/20 text-zinc-500">
        <FileText className="w-12 h-12 mb-4 opacity-50" />
        <p>Henüz üretilmiş bir içerik yok.</p>
        <p className="text-sm">Sol taraftaki paneli kullanarak içerik üretebilirsiniz.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {contents.map((item) => (
        <div key={item.id} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-zinc-100 mb-1">{item.seoTitle}</h3>
              <div className="flex flex-wrap gap-2 text-xs text-zinc-400">
                <span>{new Date(item.createdAt).toLocaleDateString('tr-TR')}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Globe className="w-3 h-3"/> /{item.urlSlug}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => onSelect(item)}
                className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors"
                title="Detayı İncele / Düzenle"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button 
                onClick={() => removeContent(item.id)}
                className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                title="Sil"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="mt-4 mb-4">
            <h4 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Google SERP Önizlemesi</h4>
            <SerpPreview 
              title={item.metaTitle} 
              description={item.metaDescription} 
              slug={item.urlSlug} 
              domain={item.domain}
            />
          </div>

          <div className="flex flex-wrap gap-1.5 mt-4">
            {item.keywords?.map((kw, i) => (
              <span key={i} className="px-2 py-1 text-[10px] font-medium bg-zinc-800 text-zinc-300 rounded-md">
                {kw}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
