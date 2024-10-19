import React from 'react';
import Nav from './nav/nav';


const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Nav/>
      <main className='bg-light-50'>{children}</main>
    </div>
  );
};

export default Layout;
