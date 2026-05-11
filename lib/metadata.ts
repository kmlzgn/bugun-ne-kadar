import type { Metadata } from "next";

const BASE_URL = "https://bugunnekadar.vercel.app";
const SITE_NAME = "Bugün Ne Kadar?";
const DEFAULT_DESCRIPTION =
  "Geçmişteki Türk Lirası değerinizi bugünkü alım gücüne dönüştürün. TÜFE bazlı enflasyon hesaplayıcı.";

export function getDefaultMetadata(): Metadata {
  return {
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    description: DEFAULT_DESCRIPTION,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
      url: BASE_URL,
      siteName: SITE_NAME,
      locale: "tr_TR",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
    },
    metadataBase: new URL(BASE_URL),
  };
}

export function getCalculationMetadata(
  amount: number,
  year: string
): Metadata {
  const title = `${year}'deki ${amount.toLocaleString("tr-TR")} TL Bugün Ne Kadar?`;
  const description = `${year} yılındaki ${amount.toLocaleString("tr-TR")} TL'nin bugünkü alım gücünü hesapla.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: BASE_URL,
      siteName: SITE_NAME,
      locale: "tr_TR",
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}
