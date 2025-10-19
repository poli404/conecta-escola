import { Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";

export const metadata = {
  title: "Conecta Escola",
  description: "Plataforma de comunicação entre pais e escola!",
};

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" className={poppins.className}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
