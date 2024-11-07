// src/components/MenuItem.tsx
import React from 'react';
import Link from 'next/link';

interface MenuItemProps {
  href: string;
  icon: JSX.Element;
  label: string;
  onClick?: () => void
}

const MenuItem: React.FC<MenuItemProps> = ({ href, icon, label, onClick }) => {
  return (
    <div
    onClick={onClick}
    className={`flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer ${
      onClick ? "" : "cursor-default"
    }`}
  >
    {onClick ? (
      <span className="flex items-center">
        {icon}
        <span className="ml-2">{label}</span>
      </span>
    ) : (
      <Link href={href} passHref>
        <span className="flex items-center">
          {icon}
          <span className="ml-2">{label}</span>
        </span>
      </Link>
    )}
  </div>
  );
};

export default MenuItem;
