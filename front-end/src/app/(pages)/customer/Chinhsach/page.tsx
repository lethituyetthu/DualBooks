import React from "react";

const ShippingPolicy: React.FC = () => {
  return (
    <div className=" max-w-[1200px] mx-auto p-6">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <a href="/customer" className="hover:text-blue-500 transition">
          Trang chủ
        </a>
        <span>/</span>
        <a href="/Chinhsach" className="hover:text-blue-500 transition">
          Chính sách
        </a>
      </nav>

      <main className="container mx-auto px-6">
        {/* Section Intro */}
        <section className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 font-itim">Giới thiệu</h2>
          <p className="text-gray-700 leading-relaxed">
            Chính sách vận chuyển của chúng tôi được thiết kế nhằm đảm bảo hàng
            hóa được giao đến tay khách hàng một cách nhanh chóng và an toàn
            nhất.
          </p>
        </section>

        {/* Delivery Information */}
        <section className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 font-itim">
            Thông Tin Giao Hàng
          </h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-3">
            <li>Thời gian giao hàng: 3-5 ngày làm việc (trừ ngày lễ).</li>
            <li>Phí giao hàng: 30.000 VNĐ cho tất cả các đơn hàng.</li>
            <li>Giao hàng toàn quốc, đảm bảo đúng thời gian cam kết.</li>
          </ul>
        </section>

        {/* Shipping Methods */}
        <section className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 font-itim">
            Phương Thức Vận Chuyển
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 font-itim">
                Giao Hàng Tiêu Chuẩn
              </h3>
              <p className="text-gray-600">
                Hàng hóa sẽ được giao trong khoảng 3-5 ngày làm việc.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 font-itim">
                Giao Hàng Nhanh
              </h3>
              <p className="text-gray-600">
                Hàng hóa sẽ được giao trong vòng 1-2 ngày làm việc (có phụ phí).
              </p>
            </div>
          </div>
        </section>

        {/* Return Policy */}
        <section className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 font-itim">
            Chính Sách Đổi Trả
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Nếu sản phẩm gặp lỗi do vận chuyển, quý khách vui lòng liên hệ với
            bộ phận chăm sóc khách hàng trong vòng 48 giờ kể từ khi nhận hàng để
            được hỗ trợ đổi trả.
          </p>
        </section>
      </main>
    </div>
  );
};

export default ShippingPolicy;
