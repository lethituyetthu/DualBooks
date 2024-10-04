import React from 'react';
import Header from './component/header/Header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header/>
      <main>{children}</main>
      <footer>
        <p>Bản quyền © 2024</p>
      </footer>
    </div>
  );
};

export default Layout;
