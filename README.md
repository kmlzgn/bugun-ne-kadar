# Bugün Ne Kadar?

Geçmişteki Türk Lirası değerinizi bugünkü alım gücüne dönüştüren TÜFE bazlı enflasyon hesaplayıcısı.

## Teknoloji Stack

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Recharts** (grafik)
- TCMB/TÜİK TÜFE verileri (statik JSON)

## Kurulum

```bash
npm install
npm run dev
```

Uygulama `http://localhost:3000` adresinde çalışır.

## Production Build

```bash
npm run build
npm start
```

## Veri Güncelleme

`data/cpi-tr.json` dosyasındaki `metadata.updatedAt` alanını ve `data` dizisini TÜİK/TCMB'den alınan güncel TÜFE endeksleriyle güncelleyin. Yeni veriler YYYY-MM formatında ve `index` sütunu 2003=100 baz yılına göre olmalıdır.

```json
{
  "metadata": {
    "source": "TUIK",
    "updatedAt": "2026-05",
    "baseYear": 2003,
    "description": "Aylık TÜFE endeksleri (2003=100 baz yılı)"
  },
  "data": [
    { "date": "2026-05", "index": 4598.3 }
  ]
}
```

## Deploy (Vercel)

```bash
npm run build
vercel deploy
```

Veya GitHub'a bağlayıp Vercel'de otomatik deploy aktifleştirin.

## Scriptler

| Komut | Açıklama |
|-------|----------|
| `npm run dev` | Geliştirme sunucusu |
| `npm run build` | Production build |
| `npm start` | Production sunucusu |
| `npm run lint` | ESLint |
| `npm run type-check` | TypeScript kontrolü |

## Mimari Notlar

- **Server Components**: `app/page.tsx` — hızlı ilk HTML + SEO için
- **Client Components**: `CalculatorForm`, `ResultCard`, `InflationChart` — etkileşim için
- **Hesaplama motoru**: `services/inflationService.ts` — saf fonksiyonlar, doğrulama, tip güvenliği
- **Dinamik tarih**: `lib/date.ts` — Europe/Istanbul timezone, Turkish locale

## Not

Hesaplamalar bilgilendirme amaçlıdır. Kesin finansal tavsiye olarak değerlendirilmemelidir.