import "./globals.css";

export const metadata = {
    title: "Leonardo Oliveira - Full Stack Developer | React, Next.js, Node.js",
    description: "Desenvolvedor Full Stack especializado em React, Next.js, Node.js e desenvolvimento mobile. Criando aplicações web modernas e performáticas com foco em experiência do usuário.",
    icons: {
        icon: "/icons/favicon.png",
    },
    openGraph: {
        title: "Leonardo Oliveira - Full Stack Developer",
        description: "Desenvolvedor Full Stack especializado em React, Next.js, Node.js e desenvolvimento mobile.",
        url: "https://dev-leonardo-portfolio.vercel.app/",
        siteName: "Leonardo Oliveira Portfolio",
        images: [
            {
                url: "/image/landingPage.jpg",
                width: 800,
                height: 600,
                alt: "Leonardo Oliveira - Full Stack Developer",
            },
        ],
        locale: "pt_BR",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Leonardo Oliveira - Full Stack Developer",
        description: "Desenvolvedor Full Stack especializado em React, Next.js, Node.js e desenvolvimento mobile.",
        images: ["/image/landingPage.jpg"],
    },
    keywords: ["desenvolvedor full stack", "react", "next.js", "node.js", "javascript", "typescript", "desenvolvedor web", "frontend", "backend"],
    authors: [{ name: "Leonardo Oliveira" }],
    creator: "Leonardo Oliveira",
};

export default function RootLayout({ children }) {
    return (
        <html>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Anton&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
            </head>
            <body>{children}</body>
        </html>
    );
}

