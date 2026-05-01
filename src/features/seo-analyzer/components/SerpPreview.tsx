export default function SerpPreview({ title, description, slug, domain = 'sizinwebsiteniz.com' }: { title: string, description: string, slug: string, domain?: string }) {
  const siteName = domain === 'sizinwebsiteniz.com' ? 'Sizin Web Siteniz' : domain.charAt(0).toUpperCase() + domain.split('.')[0].slice(1);
  const initial = siteName.charAt(0).toUpperCase();

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm w-full max-w-2xl font-sans">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-7 h-7 bg-zinc-200 rounded-full flex items-center justify-center">
          <span className="text-xs text-zinc-500 font-bold">{initial}</span>
        </div>
        <div>
          <p className="text-sm text-[#202124] leading-tight">{siteName}</p>
          <p className="text-xs text-[#4d5156] leading-tight truncate">https://{domain} › {slug}</p>
        </div>
      </div>
      <h3 className="text-xl text-[#1a0dab] hover:underline cursor-pointer mb-1 leading-tight">
        {title}
      </h3>
      <p className="text-sm text-[#4d5156] leading-snug line-clamp-2">
        {description}
      </p>
    </div>
  );
}
