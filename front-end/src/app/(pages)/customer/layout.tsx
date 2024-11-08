import React from 'react';
import Header from './component/Header';
import Footer from './component/footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header/>
      <main className='bg-light-50'>{children}</main>
      <Footer/>
    </div>
  );
};

export default Layout;
