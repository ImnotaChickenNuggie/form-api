import { ReduxProvider } from "./redux-provider";
import { Providers } from "./providers";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Fake Store",
  description: "Tienda en línea para comprar productos falsos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es-MX" className="h-full">
      <body className="min-h-full flex flex-col">
        <ReduxProvider>
          <Providers>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </Providers>
        </ReduxProvider>
      </body>
    </html>
  );
}
