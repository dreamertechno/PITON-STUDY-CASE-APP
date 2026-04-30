export type Language = 'Türkçe' | 'İngilizce' | 'Almanca' | 'İspanyolca';
export type Tone = 'Profesyonel' | 'Samimi' | 'Eğitici' | 'İkna Edici' | 'Eğlenceli';
export type SeoLevel = 'Düşük' | 'Orta' | 'Yüksek';

export interface ContentRequest {
  sourceType: 'url' | 'prompt';
  sourceValue: string; // The URL or the free text prompt
  postCount: number;
  language: Language;
  tone: Tone;
  targetAudience: string;
  focusKeywords: string;
  seoLevel: SeoLevel;
}

export interface GeneratedContent {
  id: string;
  createdAt: string;
  seoTitle: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  subheadings: string[];
  content: string; // Full HTML content including subheadings and conclusion
  socialMediaPost: string;
  urlSlug: string;
  domain?: string;
}

export interface ContentState {
  contents: GeneratedContent[];
  isGenerating: boolean;
  addContent: (content: GeneratedContent) => void;
  addMultipleContents: (contents: GeneratedContent[]) => void;
  removeContent: (id: string) => void;
  updateContent: (id: string, updated: Partial<GeneratedContent>) => void;
  setIsGenerating: (status: boolean) => void;
}
