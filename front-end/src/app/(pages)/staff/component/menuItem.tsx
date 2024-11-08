// src/components/MenuItem.tsx
import React from 'react';
import Link from 'next/link';

interface MenuItemProps {
  href: string;
  icon: JSX.Element;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ href, icon, label }) => {
  return (
    <Link href={href} className="flex items-center px-4 py-2 hover:bg-gray-100">
      {icon} <span className="ml-2">{label}</span>
    </Link>
  );
};

export default MenuItem;
