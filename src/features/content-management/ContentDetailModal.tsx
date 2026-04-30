'use client';

import { GeneratedContent } from '@/shared/types';
import { X, Save } from 'lucide-react';
import { useState } from 'react';
import { useContentStore } from '@/shared/store/useContentStore';

export default function ContentDetailModal({ 
  content, 
  onClose 
}: { 
  content: GeneratedContent, 
  onClose: () => void 
}) {
  const { updateContent } = useContentStore();
  const [editableContent, setEditableContent] = useState(content.content);

  const handleSave = () => {
    updateContent(content.id, { content: editableContent });
    alert('İçerik başarıyla güncellendi!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-zinc-800">
          <h2 className="text-xl font-bold text-zinc-100">{content.seoTitle}</h2>
          <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-2">Sosyal Medya Paylaşım Önerisi</h3>
            <div className="bg-blue-500/10 border border-blue-500/20 text-blue-100 p-4 rounded-xl text-sm">
              {content.socialMediaPost}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">İçerik (HTML)</h3>
              <button onClick={handleSave} className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-sm text-zinc-200 rounded-lg transition-colors">
                <Save className="w-4 h-4" /> Kaydet
              </button>
            </div>
            {/* HTML Edit View */}
            <textarea
              className="w-full h-64 bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-zinc-300 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editableContent}
              onChange={(e) => setEditableContent(e.target.value)}
            />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-2">Render Edilmiş Görünüm (Önizleme)</h3>
            <div 
              className="prose prose-invert max-w-none prose-blue bg-zinc-900 p-6 rounded-xl border border-zinc-800"
              dangerouslySetInnerHTML={{ __html: editableContent }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
