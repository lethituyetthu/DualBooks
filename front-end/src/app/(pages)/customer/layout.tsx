import React from 'react';
import Header from './component/header/Header';
import Footer from './component/footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header/>
      <main className='bg-[#fefdfb]'>{children}</main>
      <Footer/>
    </div>
  );
};

export default Layout;
