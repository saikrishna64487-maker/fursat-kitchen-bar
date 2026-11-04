import type { Metadata, Viewport } from "next";
import { Poppins, Playfair_Display, Dancing_Script, Anton } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
  weight: ["700"],
  display: "swap",
});

const anton = Anton({
  subsets: ["latin"],
  variable: "--font-anton",
  weight: ["400"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#ECDEC8",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Fursat Kitchen & Bar | Madhapur, Hyderabad",
  description:
    "Fursat Kitchen & Bar in Madhapur, Hyderabad — an immersive luxury dining and cocktail lounge experience. Take a moment to savour contemporary Indian and global culinary craft, artisan mixology, and celebratory nightlife.",
  keywords: [
    "Fursat Kitchen and Bar",
    "Fursat Hyderabad",
    "Madhapur Restaurant",
    "Luxury Bar Hyderabad",
    "Fine Dining Madhapur",
    "High End Cocktail Bar Hyderabad",
    "Take a moment Fursat",
    "Hyderabad Nightlife",
    "Fursat Menu",
  ],
  authors: [{ name: "Fursat Kitchen & Bar" }],
  openGraph: {
    title: "Fursat Kitchen & Bar | Madhapur, Hyderabad",
    description: "Take a Moment. Contemporary Indian hospitality, culinary artistry, and elevated cocktails in the heart of Madhapur.",
    url: "https://fursat-hyderabad.com",
    siteName: "Fursat Kitchen & Bar",
    images: [
      {
        url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Fursat Kitchen & Bar Atmosphere",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fursat Kitchen & Bar | Madhapur, Hyderabad",
    description: "Take a Moment. Experience high-end culinary craft and signature mixology in Madhapur, Hyderabad.",
    images: ["https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

import CustomCursor from "@/components/CustomCursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Fursat Kitchen & Bar",
    image: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200&q=80",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Capital Pk Road, Ayyappa Society, VIP Hills, Silicon Valley, Madhapur",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      postalCode: "500081",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "17.4483",
      longitude: "78.3915",
    },
    url: "https://fursatkitchenbar.in",
    telephone: "+91-90596-70033",
    servesCuisine: ["Hyderabadi", "Tandoori", "Biryani & Pulao", "Cafe & Pizzas", "Artisan Cocktails"],
    priceRange: "₹₹",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "12:00",
        closes: "23:30",
      },
    ],
    hasMenu: "https://fursatkitchenbar.in#menu",
    acceptsReservations: "True",
  };

  return (
    <html lang="en" className={`${poppins.variable} ${playfair.variable} ${dancingScript.variable} ${anton.variable}`}>
      <head>
        <link rel="icon" href="/assets/logo-DB0x_8ZX.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-fursat-sand text-fursat-charcoal selection:bg-fursat-terracotta/25 selection:text-fursat-charcoal font-sans antialiased">
        <CustomCursor />
        <div className="film-grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
