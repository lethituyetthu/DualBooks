"use client"
import React from "react";
import Header from "./component/Header";
import Footer from "./component/footer";
import { SnackbarProvider } from "notistack";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
        <Header />
        <main className="bg-light-50">{children}</main>
        <Footer />
      
    </SnackbarProvider>
  );
};

export default Layout;
