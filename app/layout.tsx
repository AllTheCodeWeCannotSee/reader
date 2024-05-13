import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@/components/theme-provider";
import {ModalProvider} from "@/components/providers/modal-provider";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Reader",
    description: "Unique Epub Reader",
    icons: {
        icon: '/logo.svg'
    }
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <html lang="en">

        <body className={inter.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            <ModalProvider />
            {children}
        </ThemeProvider>
        </body>
        </html>
    );
}
