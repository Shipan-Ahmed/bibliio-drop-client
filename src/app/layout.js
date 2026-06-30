import { Merriweather, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Toaster } from "react-hot-toast";

// Configure the serif heading font
const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-merriweather",
});

// Configure the clean UI/body font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "BiblioDrop | Online Book Delivery Management System",
  description: "Connect with local libraries, borrow diverse collections, and enjoy doorstep delivery.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="light" 
      className={`${merriweather.variable} ${inter.variable} h-full antialiased font-body`}
    >
      <body >
        <Navbar/>
        <main >
          {children}
        </main>
        <Footer />
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}