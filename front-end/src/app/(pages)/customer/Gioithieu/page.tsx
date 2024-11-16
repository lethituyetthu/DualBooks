import React from "react";

const DualBooksPage = () => {
  return (
    <div className="min-h-screen bg-light-50 max-w-[1300px] mx-auto pb-10" >
      <nav className="flex items-center space-x-2 text-sm text-gray-600 p-4">
        <a href="/customer" className="hover:text-gray-900">
          Trang chủ
        </a>
        <span>/</span>
        <a href="/" className="hover:text-gray-900">
          Giới thiệu
        </a>
        <span>/</span>
        <span className="text font-semibold text-primary-400">
          Về DualBooks
        </span>
      </nav>
      {/* Nội dung */}
      <main className="p-6 bg-white max-w-4xl mx-auto mt-4 rounded shadow">
        <h1 className="text-2xl font-bold mb-2 font-itim text-primary-400">
          Chào các bạn đến với DualBooks!
        </h1>
        <p className="text-gray-500 mb-4">09/09/2024</p>

        {/* banner */}
        <div
          className="relative bg-cover bg-center h-96 rounded-lg overflow-hidden"
          style={{
            backgroundImage:
              "url(https://img.pikbest.com/ai/illus_our/20230427/e4919c003621b2e3191d860eca2f6089.jpg!sw800)",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <blockquote className="text-white text-xl italic inter text-center">
              "Sách không chỉ là nguồn tri thức, mà còn là <br /> chìa khóa giúp
              bạn khám phá thế giới <br /> và hiểu sâu hơn về chính mình."
            </blockquote>
          </div>
        </div>

        {/* Giới thiệu */}
        <section className="mt-6">
          <h2 className="text-lg font-bold mb-4">
            Vì sách là nền tảng của tri thức và nguồn cảm hứng bất tận cho sự
            phát triển của nhân loại
          </h2>
          <p className="text-gray-700 mb-4">
            <b>DualBooks</b> đã chọn sách làm kim chỉ nam cho hành trình của mình.
            Chúng tôi xây dựng mô hình nhà sách kết hợp giữa cửa hàng truyền
            thống (offline) phục vụ cộng đồng địa phương, và nền tảng thương mại
            điện tử (online) nhằm mang đến chất lượng và giá trị dịch vụ đồng
            nhất cho khách hàng ở khắp mọi nơi.
          </p>

          <p className="text-gray-700 mb-4">
            Với <b>DualBooks</b>, Quý độc giả sẽ có cơ hội trải nghiệm những sản phẩm
            và dịch vụ vượt trội:
          </p>

          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              Được tuyển chọn kỹ lưỡng và sắp xếp theo chủ đề rõ ràng, trực
              quan, giúp bạn dễ dàng tìm thấy <b>cuốn sách phù hợp với nhu cầu và
              sở thích </b>cá nhân.
            </li>
            <li>
            Dịch vụ hỗ trợ khách hàng qua nhiều kênh tiện lợi như điện thoại
              <b> hotline, Facebook fanpage, email,...</b> luôn sẵn sàng đồng hành cùng
              bạn.
            </li>
            <li>
              Chính sách <b>miễn phí giao hàng</b> với đơn hàng từ 150,000 đồng trong
              phạm vi TP.HCM và từ 300,000 đồng cho các tỉnh thành khác.
            </li>
          </ul>
          <p className="mt-4">
            Quý khách hàng có thể liên hệ với chúng tôi qua các kênh sau:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><b>Điện thoại:</b> 028 3506 3119</li>
            <li><b>Email hỗ trợ:</b> DualBooks@gmail.com</li>
            <li><b>Fanpage:</b> DualBooks</li>
            <li>
              <b>Địa chỉ:</b> 77B/81 Nguyễn Kiệm, Phường 4, Quận Phú Nhuận, TP. Hồ Chí
              Minh
            </li>
          </ul>

          <p className="mt-6 text-gray-700">
            Trân trọng, <br />
            Đội ngũ <b>DualBooks</b>
          </p>
        </section>
      </main>
    </div>
  );
};

export default DualBooksPage;