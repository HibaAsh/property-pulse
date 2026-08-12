import AuthProvider from "@/components/AuthProvider";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { ToastContainer } from "react-toastify";

import "@/assets/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "Property Pulse | Find The Perfect Rental",
  description: "Fidn your dream rental property",
  keywords: "rental, find rentals, find properties",
};

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <Navbar />

          <main className="p-2">{children}</main>

          <ToastContainer />
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
