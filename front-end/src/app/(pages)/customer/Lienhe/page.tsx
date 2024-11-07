import React from "react";

const ContactPage: React.FC = () => {
  const contactInfo = [
    {
      label: "Email",
      value: "DualBooks@gmail.com",
      isLink: true,
      href: "mailto:DualBooks@gmail.com",
    },
    {
      label: "Số điện thoại",
      value: "0326 310 819",
      isLink: true,
      href: "tel:0326310819",
    },
    {
      label: "Fanpage",
      value: "DualBooks",
      isLink: false,
    },
    ,
    {
      label: "Địa chỉ",
      value: "778/B1 Nguyễn Kiệm, Phường 4, Quận Phú Nhuận, Tp. Hồ Chí Minh",
      isLink: false,
    }
  ];
  return (
    <div className="max-w-[1300px] mx-auto">
      <nav className="flex items-center space-x-2 text-sm text-gray-600 p-4">
        <a href="/customer" className="hover:text-gray-900">
          Trang chủ
        </a>
        <span>/</span>
        <a href="/" className="hover:text-gray-900">
          Liên hệ
        </a>
        <span>/</span>
        <span style={{ color: "#D98B48" }} className="text font-semibold">
          Liên hệ DualBooks
        </span>
      </nav>

      <div
        className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://img.pikbest.com/ai/illus_our/20230427/e4919c003621b2e3191d860eca2f6089.jpg!sw800)",
        }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl p-6 md:p-12">
          {/*  */}
          <div className="md:w-1/2 text-white">
            <h1 className="text-3xl md:text-4xl font-bold">DualBooks</h1>
            <p className="mt-4 text-lg md:text-xl">
              "Một cuốn sách hay có thể thay đổi cuộc đời bạn, mở ra những cánh
              cửa mới và giúp bạn nhìn thế giới dưới một góc nhìn khác biệt."
            </p>
          </div>

          {/* form liên hệ*/}
          <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-lg max-w-md mt-6 md:mt-0">
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tên *
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Số điện thoại *
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  placeholder="Vui lòng nhập số điện thoại của bạn"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Thêm ghi chú *
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="w-full  p-2 bg-primary-400 text-white rounded-none hover:bg-opacity-80"
                >
                  Gửi
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* địa chỉ */}
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row items-start md:space-x-8">
          {/* Map Section */}
          <div className="w-full md:w-1/2 h-64">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.998339896856!2d106.67602767451761!3d10.811438258548007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528de288ebde9%3A0x657be5f1bfedef35!2zNzc4L0IxIMSQLiBOZ3V54buFbiBLaeG7h20sIFBoxrDhu51uZyAzLCBQaMO6IE5odeG6rW4sIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1728668261343!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Liên hệ */}
          <div className="w-full md:w-1/2 mt-4 md:mt-0 flex flex-col items-center justify-center text-center">
            <h2 className="text-xl font-bold text-brown-600 mb-4">Liên hệ</h2>

            <ul className="space-y-2">
            {contactInfo.map((item, index) => (
          <li key={index} className="flex items-start">
            <span className="font-semibold">{item.label}:</span>
            {item.isLink ? (
              <a href={item.href} className="ml-2 text-brown-600 hover:underline">
                {item.value}
              </a>
            ) : (
              <p className="ml-2 text-brown-600">{item.value}</p>
            )}
          </li>
        ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactPage;