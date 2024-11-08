import React from "react";

const Sidebar = () => {
  // Định nghĩa mảng menu
  const menu = [
    {
      icon: <i className="fas fa-chart-bar text-xl mr-4"></i>,
      title: "Thống kê",
      link: "/admin/thong-ke",
    },
    {
      icon: <i className="fas fa-list text-xl mr-4"></i>,
      title: "Danh Mục",
      link: "/admin/danh-muc",
    },
    {
      icon: <i className="fas fa-book text-xl mr-4"></i>,
      title: "Sản phẩm",
      link: "/admin/products",
    },
    {
      icon: <i className="fas fa-user text-xl mr-4"></i>,
      title: "Nhân viên",
      link: "/admin/staffs",
    },
    {
      icon: <i className="fas fa-users text-xl mr-4"></i>,
      title: "Khách hàng",
      link: "/admin/customer",
    },
    {
      icon: <i className="fas fa-building text-xl mr-4"></i>,
      title: "Nhà xuất bản",
      link: "/admin/nha-xuat-ban",
    },
    {
      icon: <i className="fas fa-box text-xl mr-4"></i>,
      title: "Đơn hàng",
      link: "/admin/don-hang",
    },
  ];

  return (
    <div className="min-h-screen w-64 bg-primary-400 text-white flex flex-col  py-6">
      <div className="text-2xl font-semibold mb-4 px-6 text-center">Admin</div>
      <div className="border-b border-white w-40 mx-auto mb-6"></div>
      <ul className="space-y-6 pl-6">
        {menu.map((item, index) => (
          <li key={index} className="flex items-center">
            <span className="w-[36px]">{item.icon}</span>
            <a href={item.link} className="hover:text-gray-300">
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
