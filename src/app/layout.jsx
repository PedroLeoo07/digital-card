import "./globals.css";

export const metadata = {
    title: "Leonardo Oliveira | Desenvolvedor Full Stack",
    description: "Projeto de uma landing page",
    icons: {
        icon: "/icons/favicon.png",
    },
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

