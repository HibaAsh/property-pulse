import ClientProviders from "./ClientProviders";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { ToastContainer } from "react-toastify";

import "@/assets/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "photoswipe/dist/photoswipe.css"

export const metadata = {
  title: "Property Pulse | Find The Perfect Rental",
  description: "Fidn your dream rental property",
  keywords: "rental, find rentals, find properties",
};

const MainLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          <Navbar />

          <main className="p-2">{children}</main>

          <ToastContainer />
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
};

export default MainLayout;
