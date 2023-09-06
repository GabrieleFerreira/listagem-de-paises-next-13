import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import Image from "next/image";
import "./globals.css";
const nunitoSans = Nunito_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lista de Países",
  description: "Lista de países criada com o Next13",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-gray-100 h-full ${nunitoSans.className}`}>
        <main className=" flex flex-col items-center">
          <nav className="bg-white h-16 w-full flex items-center justify-center">
            <section className="container flex items-center gap-3">
              <Image
                src="/Logo.jpg"
                width={48}
                alt="Imagem do mapa"
                height={48}
              ></Image>
              <h1 className=" font-bold text-2xl  p-2">Lista de países</h1>
            </section>
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}
