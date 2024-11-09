
"use client";
import React from 'react';
import Sidebar from './component/Sidebar';
import Header from './component/Header';


const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex bg-light-50'>
      <Sidebar/>
<<<<<<< HEAD
      <main className=' w-full mx-10'>
=======
      <main className=' w-full mx-10 '>
>>>>>>> origin/nhathuy
        <Header/>
        {children}</main>
    </div>
  );
};

export default Layout;
