# SEO Blogger

PITON Technology değerlendirmesi için hazırlanan yapay zeka destekli, özellik bazlı (feature-based) SEO içerik üretim ve yönetim platformu.

## Özellikler

- **AI İçerik Üretimi**: Google Gemini API kullanılarak kullanıcı kriterlerine uygun (ton, dil, hedef kitle, anahtar kelimeler) blog yazıları üretimi.
- **SERP Önizleme**: Oluşturulan yazıların Google arama sonuçlarında nasıl görüneceğinin birebir simülasyonu.
- **Yönetim Paneli**: Üretilen içeriklerin listelenmesi, incelenmesi, HTML kodunun düzenlenmesi ve kaydedilmesi.
- **Sosyal Medya Desteği**: İçeriğe uygun sosyal medya paylaşım önerileri.
- **Feature-Based Mimari**: Proje ölçeklenebilir bir yapı olan klasör yapısı (features/shared) ile inşa edilmiştir.
- **Zustand State Management**: Yüksek performanslı ve kalıcı (localStorage) state yönetimi.

## Kurulum (Setup)

1. Depoyu klonlayın:
```bash
git clone https://github.com/KULLANICI_ADI/seo-blogger.git
cd seo-blogger
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Çevresel Değişkenleri ayarlayın:
`.env.example` dosyasını `.env.local` olarak kopyalayın ve içerisine kendi Gemini API anahtarınızı ekleyin.
```bash
cp .env.example .env.local
```

4. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

Uygulama `http://localhost:3000` adresinde çalışacaktır.

## Kullanım (Usage)

1. Sol paneldeki **AI İçerik Üretici** formunu kullanarak bir konu/prompt girin. İstediğiniz SEO seviyesini ve anahtar kelimeleri belirleyin.
2. **"SEO İçerik Üret"** butonuna basarak Gemini API ile içeriklerin oluşturulmasını bekleyin.
3. Üretilen içerikler anında sağ paneldeki **İçerik Yönetim Paneli** listesine düşer (Zustand üzerinden anlık güncellenir).
4. Listeden herhangi bir içeriğin yanındaki **Düzenle** butonuna basarak; HTML formatındaki blog yazısını düzenleyebilir, sosyal medya önerilerini okuyabilir ve Google SERP önizlemesini detaylıca görebilirsiniz.

## Teknik Tercihler
- **Neden Next.js App Router?** SEO uyumlu yapı oluşturmak ve API Routes mimarisini tek bir çatı altında kullanmak için.
- **Neden Zustand?** Redux'a göre çok daha az boilerplate (kod kalabalığı) içermesi ve React hook yapısıyla native bir deneyim sunması.
- **Neden Tailwind CSS?** Hızlı prototipleme ve modern karanlık tema desteği.

## Ekran Görüntüleri ve Video
- Projeye ait video kayıt linki: [VİDEO LİNKİ BURAYA EKLENECEK]
- Ekran görüntüleri README klasörüne eklenecektir.
