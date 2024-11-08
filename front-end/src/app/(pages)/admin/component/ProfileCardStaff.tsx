// ProfileCard.jsx
import Image from 'next/image';
import React, { useState } from 'react';

const ProfileCardStaff = ({ name, role, date, img, email }) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div
      className="bg-gray-50 p-6 rounded-sm shadow-md flex flex-col items-center w-52 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        className="w-24 h-24 rounded-full mb-4"
        width={200}
        height={200}
        src={`http://localhost:3200/uploads/admins/${img}`}
        alt={`${name} profile`}
      />
      <h2 className="text-xl  max-w-44 mx-auto">{name}</h2>
      <p className="text-gray-500">{role}</p>
      <p className="text-gray-500">{email}</p>
      <p className="text-gray-400 mt-2">{formatDateTime(date)}</p>

      {isHovered && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-opacity-75 bg-light-300 rounded-sm flex gap-4 p-2">
          <button
            /* onClick={onEdit} */
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Sửa
          </button>
          <button
            /* onClick={onDelete} */
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Xóa
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileCardStaff;
