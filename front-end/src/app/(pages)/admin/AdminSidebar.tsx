import React from 'react';

const AdminSidebar: React.FC = () => {
  return (
    <aside className="w-1/4" style={{ backgroundColor: '#AF683E', color: 'white', padding: '1rem' }}>
      <h1 className="text-2xl font-bold mb-2 text-center">Admin</h1> {/* Căn giữa tiêu đề */}
      <hr className="border-b-2 border-white mb-4" /> {/* Đường kẻ ngang dưới tiêu đề */}
      <nav className="mt-4">
        <ul className="space-y-4">
          {/* Căn giữa các mục */}
          <li className="flex items-center justify-center cursor-pointer hover:bg-[#E4AE7F] p-2 rounded transition-colors text-lg">
            <span className="mr-2">
              <i className="fas fa-chart-line"></i>
            </span>
            Thống kê
          </li>
          <li className="flex items-center justify-center cursor-pointer hover:bg-[#E4AE7F] p-2 rounded transition-colors text-lg">
            <span className="mr-2">
              <i className="fas fa-list-alt"></i>
            </span>
            Danh mục
          </li>
          <li className="flex items-center justify-center cursor-pointer hover:bg-[#E4AE7F] p-2 rounded transition-colors text-lg">
            <span className="mr-2">
              <i className="fas fa-book"></i>
            </span>
            Sản phẩm
          </li>
          <li className="flex items-center justify-center cursor-pointer hover:bg-[#E4AE7F] p-2 rounded transition-colors text-lg">
            <span className="mr-2">
              <i className="fas fa-users"></i>
            </span>
            Nhân viên
          </li>
          <li className="flex items-center justify-center cursor-pointer hover:bg-[#E4AE7F] p-2 rounded transition-colors text-lg">
            <span className="mr-2">
              <i className="fas fa-user"></i>
            </span>
            Khách hàng
          </li>
          <li className="flex items-center justify-center cursor-pointer hover:bg-[#E4AE7F] p-2 rounded transition-colors text-lg">
            <span className="mr-2">
              <i className="fas fa-truck"></i>
            </span>
            Nhà xuất bản
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
