"use client"
import React from "react";
import Header from "./component/Header";
import { SnackbarProvider } from "notistack";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <div className="">
        <Header />
        <main className="bg-light-100 min-h-screen">{children}</main>
      </div>
    </SnackbarProvider>
  );
};

export default Layout;
