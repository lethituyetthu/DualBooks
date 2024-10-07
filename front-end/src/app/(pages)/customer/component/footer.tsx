import Link from "next/link";
import React from "react";

export default function Footer() {
  const aboutUs = [
    { name: "Cửa hàng", link: "/store" },
    { name: "Dịch vụ", link: "/services" },
    { name: "Tư vấn", link: "/consulting" },
    { name: "Tiểu sử", link: "/about" },
  ];

  const helpItems = [
    { name: "Vận chuyển", link: "/shipping" },
    { name: "Đổi hàng", link: "/exchange" },
    { name: "Trả hàng", link: "/return" },
    { name: "Hoàn tiền", link: "/refund" },
  ];

  const icons = [
    {
      icon: <i className="fab fa-instagram"></i>,
      link: "https://instagram.com",
    },
    {
      icon: <i className="fab fa-facebook"></i>,
      link: "https://facebook.com",
    },
  ];
  return (
    <div className="bg-light-100">
      <div className="max-w-[1100px] mx-auto flex justify-between py-10">
        <div className="footer-box1">
          <h3 className="text-lg font-bold text-primary">
            Tham gia cùng <span className="text-primary-400">DualBooks!</span>
          </h3>
          <p>"Khám phá thế giới từ những trang giấy."</p>
          <div className="mt-4">
            <button className="bg-primary text-white px-6 py-2 rounded-lg bg-primary-700 hover:bg-primary-300">
              Đăng ký
            </button>
            <button className="border border-primary text-primary px-6 py-2 rounded-lg ml-4 hover:bg-primary-700 hover:text-light-100">
              Đăng nhập
            </button>
          </div>
        </div>
        <div className="footer-box2">
          <h3 className="text-lg font-bold text-primary-600">Về chúng tôi</h3>
          <ul className="mt-4 space-y-2">
            {aboutUs.map((e, index) => {
              return (
                <li key={index} className="hover:text-primary-600">
                  <Link href={e.link}>{e.name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="footer-box3">
          <h3 className="text-lg font-bold text-primary-600">Hỗ trợ</h3>
          <ul className="mt-4 space-y-2">
            {helpItems.map((item, index) => (
              <li key={index} className="hover:text-primary-600">
                <Link href={item.link}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-box4">
          <h3 className="text-lg font-bold text-primary-600">Liên hệ</h3>
          <ul className="mt-4 space-y-2">
            <li className="hover:underline hover:text-primary-600">
              📞 0326 310 819
            </li>
            <li className="hover:underline hover:text-primary-600">
              ✉️ DualBooks@gmail.com
            </li>
            <li className="flex space-x-4">
              {icons.map((item, index) => (
                <a
                  href={item.link}
                  className="text-primary-600 text-3xl"
                  key={index}
                >
                  {item.icon}
                </a>
              ))}
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-primary-400 h-[50px] text-white flex items-center justify-center">
        © 2024 DualBooks - Bản quyền thuộc về DualBooks
      </div>
    </div>
  );
}
