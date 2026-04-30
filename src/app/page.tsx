'use client';

import { useState } from 'react';
import GeneratorForm from '@/features/content-generator/GeneratorForm';
import ContentList from '@/features/content-management/ContentList';
import ContentDetailModal from '@/features/content-management/ContentDetailModal';
import { GeneratedContent } from '@/shared/types';

export default function Home() {
  const [selectedContent, setSelectedContent] = useState<GeneratedContent | null>(null);

  return (
    <div className="min-h-screen bg-zinc-950 py-12">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-100 sm:text-5xl mb-4">
            SEO <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Blogger</span>
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl">
            PITON Technology değerlendirme projesi. Yapay zeka destekli, özellik bazlı (feature-based) SEO içerik üretim platformu.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sol Taraf: Form */}
          <div className="lg:col-span-4">
            <GeneratorForm />
          </div>

          {/* Sağ Taraf: Liste ve Yönetim */}
          <div className="lg:col-span-8">
            <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-6 min-h-[600px]">
              <h2 className="text-xl font-semibold text-zinc-100 mb-6 flex items-center justify-between">
                İçerik Yönetim Paneli
              </h2>
              <ContentList onSelect={setSelectedContent} />
            </div>
          </div>
        </div>

      </div>

      {selectedContent && (
        <ContentDetailModal 
          content={selectedContent} 
          onClose={() => setSelectedContent(null)} 
        />
      )}
    </div>
  );
}
