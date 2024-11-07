
"use client";
import React from 'react';
import Sidebar from './component/Sidebar';
import Header from './component/Header';


const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex bg-light-50'>
      <Sidebar/>
      <main className=' w-full mx-10 '>
        <Header/>
        {children}</main>
    </div>
  );
};

export default Layout;
