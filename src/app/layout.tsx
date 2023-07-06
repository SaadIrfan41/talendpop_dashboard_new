import Providers from "@/utils/provider";
import "./globals.css";
import { Nunito_Sans } from "next/font/google";
import ToasterComponent from "@/lib/Toaster";
import { viewportContent } from "@/components/zoom";

// const inter = Inter({ subsets: ['latin'] })
const nunito = Nunito_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
  content: { viewportContent },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <meta name="viewport" content={viewportContent} /> */}
      <body className={`${nunito.className} `}>
        <Providers>
          {children}
          <ToasterComponent />
        </Providers>
      </body>
    </html>
  );
}
