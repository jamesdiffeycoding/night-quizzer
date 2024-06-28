import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Footer from "@/components/Footer";
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "https://quizzer-backend-api.onrender.com";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Night Quizzer",
  description: "Learn without barriers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          <div className="bg-gray-900 text-white w-full flex-1 flex flex-col items-center">
            {children}
          </div>
          <Footer></Footer>
        </main>
      </body>
    </html>
  );
}
