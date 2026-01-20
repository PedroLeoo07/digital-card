import "./globals.css";

export const metadata = {
    metadataBase: new URL('https://dev-leonardo-portfolio.vercel.app'),
    title: "Leonardo Oliveira - Full Stack Developer | Estudante de Engenharia de Software",
    description: "Desenvolvedor Full Stack e estudante de Engenharia de Software especializado em React, Next.js, Node.js e desenvolvimento mobile. Criando aplicações web modernas e performáticas com foco em experiência do usuário.",
    icons: {
        icon: "/icons/favicon.png",
        apple: "/icons/favicon.png",
    },
    manifest: "/manifest.json",
    openGraph: {
        title: "Leonardo Oliveira - Full Stack Developer | Estudante de Engenharia de Software",
        description: "Desenvolvedor Full Stack e estudante de Engenharia de Software especializado em React, Next.js, Node.js e desenvolvimento mobile.",
        url: "https://dev-leonardo-portfolio.vercel.app/",
        siteName: "Leonardo Oliveira - Digital Card",
        images: [
            {
                url: "/image/landingPage.jpg",
                width: 1200,
                height: 630,
                alt: "Leonardo Oliveira - Full Stack Developer",
            },
        ],
        locale: "pt_BR",
        type: "profile",
        alternateLocale: ["en_US"],
    },
    twitter: {
        card: "summary_large_image",
        title: "Leonardo Oliveira - Full Stack Developer",
        description: "Desenvolvedor Full Stack e estudante de Engenharia de Software especializado em React, Next.js, Node.js.",
        images: ["/image/landingPage.jpg"],
        creator: "@leonardooliveira",
    },
    keywords: [
        "leonardo oliveira",
        "desenvolvedor full stack",
        "engenharia de software",
        "react developer",
        "next.js developer",
        "node.js",
        "javascript",
        "typescript",
        "desenvolvedor web",
        "frontend developer",
        "backend developer",
        "react native",
        "portfolio",
        "digital card",
        "cartão digital"
    ],
    authors: [{ name: "Leonardo Oliveira", url: "https://dev-leonardo-portfolio.vercel.app/" }],
    creator: "Leonardo Oliveira",
    publisher: "Leonardo Oliveira",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    alternates: {
        canonical: "https://dev-leonardo-portfolio.vercel.app/",
        languages: {
            'pt-BR': 'https://dev-leonardo-portfolio.vercel.app/',
            'en-US': 'https://dev-leonardo-portfolio.vercel.app/en',
        },
    },
    verification: {
        // Adicione aqui quando tiver: google: "seu-codigo-google",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
                <meta name="theme-color" content="#2563EB" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Anton&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
            </head>
            <body>{children}</body>
        </html>
    );
}

