import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import ReduxProvider from "@/redux/Provider";
import HeaderChanger from "@/components/header/HeaderChanger";
import Footer from "@/components/footer/Footer";
import ChatbotWidgetLoader from "@/components/chatbot/ChatbotWidgetLoader";

// Inter — stable rendering of Azerbaijani diacritics (ə, ş, ğ, ç, ö, ü, ı, İ)
// on both Mac and Windows. "latin-ext" includes the full set used by Azerbaijani.
const interSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aztu.edu.az";
const SITE_NAME_AZ = "Azərbaycan Texniki Universiteti";
const SITE_NAME_EN = "Azerbaijan Technical University";
const DEFAULT_DESCRIPTION_AZ =
  "Azərbaycan Texniki Universiteti (AzTU) — mühəndislik, informasiya texnologiyaları və tətbiqi elmlər sahəsində aparıcı dövlət ali təhsil müəssisəsi. 75 illik tarixə malik, beynəlxalq akkreditasiyalı bakalavr, magistr və doktorantura proqramları.";
const DEFAULT_DESCRIPTION_EN =
  "Azerbaijan Technical University (AzTU) — a leading state higher education institution in engineering, information technology and applied sciences. 75 years of academic excellence with internationally accredited Bachelor's, Master's and doctoral programmes.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME_AZ} | AzTU`,
    template: `%s | ${SITE_NAME_AZ}`,
  },
  description: DEFAULT_DESCRIPTION_AZ,
  applicationName: SITE_NAME_AZ,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: [
    "AzTU",
    "Azərbaycan Texniki Universiteti",
    "Azerbaijan Technical University",
    "ATU",
    "mühəndislik təhsili",
    "engineering university",
    "Bakı universitet",
    "Baku university",
    "qəbul",
    "admission",
    "bakalavr",
    "magistratura",
    "doktorantura",
    "PhD Azerbaijan",
    "ali təhsil Azərbaycan",
    "technical university Baku",
    "Erasmus",
    "international students Azerbaijan",
    "AzTU rektorluq",
    "AzTU fakültələr",
    "computer engineering Baku",
    "elektrik mühəndisliyi",
  ],
  authors: [{ name: SITE_NAME_AZ, url: SITE_URL }],
  creator: SITE_NAME_AZ,
  publisher: SITE_NAME_AZ,
  category: "education",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "az_AZ",
    alternateLocale: ["en_US"],
    url: SITE_URL,
    siteName: SITE_NAME_AZ,
    title: `${SITE_NAME_AZ} | AzTU`,
    description: DEFAULT_DESCRIPTION_AZ,
    images: [
      {
        url: "/aztu.png",
        width: 1200,
        height: 630,
        alt: SITE_NAME_AZ,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME_AZ} | AzTU`,
    description: DEFAULT_DESCRIPTION_AZ,
    images: ["/aztu.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/aztu-logo-light.webp", type: "image/webp" },
    ],
    shortcut: "/aztu-logo-light.webp",
    apple: "/aztu-logo-light.webp",
  },
  manifest: "/manifest.webmanifest",
  other: {
    "msapplication-TileColor": "#1a2355",
    "msapplication-TileImage": "/logo/aztu-logo-light.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  colorScheme: "light dark",
};

const universityJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollegeOrUniversity",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME_AZ,
  alternateName: [SITE_NAME_EN, "AzTU", "ATU"],
  url: SITE_URL,
  logo: `${SITE_URL}/logo/aztu-logo-light.png`,
  image: `${SITE_URL}/aztu.png`,
  description: DEFAULT_DESCRIPTION_EN,
  foundingDate: "1950",
  email: "info@aztu.edu.az",
  telephone: "+994 12 539 13 48",
  address: {
    "@type": "PostalAddress",
    streetAddress: "H. Cavid prospekti 25",
    addressLocality: "Baku",
    postalCode: "AZ1073",
    addressCountry: "AZ",
  },
  sameAs: [
    "https://www.facebook.com/aztu.edu.az",
    "https://www.instagram.com/aztu.edu.az/",
    "https://www.linkedin.com/school/azerbaijan-technical-university/",
    "https://www.youtube.com/@aztu_official",
    "https://en.wikipedia.org/wiki/Azerbaijan_Technical_University",
  ],
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "degree",
    educationalLevel: ["Bachelor", "Master", "Doctoral"],
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME_AZ,
  alternateName: SITE_NAME_EN,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: ["az-AZ", "en-US"],
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://api-aztu.karamshukurlu.site";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="az" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href={API_BASE} crossOrigin="anonymous" />
        <link rel="dns-prefetch" href={API_BASE} />
        <link rel="alternate" type="application/rss+xml" title="AzTU Xəbərləri" href="/feed.xml" />
      </head>
      <body
        className={`${interSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <Script
          id="ld-json-organization"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(universityJsonLd) }}
        />
        <Script
          id="ld-json-website"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />

        {/* Global Background Elements */}
        <div className="bg-mesh" />
        <div className="bg-grid-premium" />

        <ReduxProvider>
          <LanguageProvider>
            <ThemeProvider>
              <HeaderChanger />
              <div className="relative z-10 min-h-screen flex flex-col">
                <div className="flex-1">
                  {children}
                </div>
                <Footer />
              </div>
              <ChatbotWidgetLoader />
            </ThemeProvider>
          </LanguageProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
