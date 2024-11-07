import React from 'react';
import SidebarOrder from '../component/sidebarOder';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex">
      <SidebarOrder/>
      <main className='w-3/4 p-6 bg-light-100'>{children}</main>
    </div>
  );
};

export default Layout;
