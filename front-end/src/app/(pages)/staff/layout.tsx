import React from 'react';
import Header from './component/Header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=' h-screen'>
      <Header/>
      <main className='bg-light-100 h-screen'>{children}</main>
    </div>
  );
};

export default Layout;
