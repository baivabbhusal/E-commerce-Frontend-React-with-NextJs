import Header from "@/components/header";
import "./globals.css";
import config from "@/config";
import Footer from "@/components/footer ";
import { ToastContainer } from "react-toastify";
import AppProvider from "@/redux/provider";
import MainLayout from "@/layouts/MainLayout";
import HeaderWrapper from "@/components/HeaderWrapper";

export const metadata = {
  title: {
    default: config.appName,
    template: `${config.appName} | %s`,
  },
  description: "Website to buy clothes",
  keyword: "Online shopping,Best clothing Product,shirt,online shopping in nepal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <MainLayout>
            <HeaderWrapper />
            <main>
              {children}
            </main>
            <Footer />
            <ToastContainer />
          </MainLayout>
        </AppProvider>
      </body>
    </html>
  );
}
