import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='bg-light-50'>
      
      {children}
      
    </div>
  );
};

export default Layout;
