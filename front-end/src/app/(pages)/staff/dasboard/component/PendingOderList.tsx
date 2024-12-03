const PendingOrdersList = ({ orders, onUpdateStatus }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold text-gray-700 mb-4">
        Đơn hàng cần xác nhận
      </h3>
      {orders && orders.length > 0 ? (
        <ul className="space-y-4">
          {orders.map((n) => (
            <li
              key={n.id}
              className="flex flex-col gap-4 md:flex-row md:items-center justify-between bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="space-y-2">
                <p className="text-lg font-bold text-blue-600">
                  Mã đơn hàng: {n.id}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Khách hàng:</span>{" "}
                  {n.customer.name}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Số điện thoại:</span>{" "}
                  {n.customer.phone}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Địa chỉ:</span>{" "}
                  {n.customer.address}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Tổng tiền:</span>{" "}
                  {(n.total_amount * 1000).toLocaleString("vi-VN")} đ
                </p>
              </div>
              <div className="flex-shrink-0">
                <button
                  className="w-full md:w-auto bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 shadow-md transition-all duration-200"
                  onClick={() => onUpdateStatus(n.id)}
                >
                  Xác nhận
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Không có đơn hàng cần xác nhận.</p>
      )}
    </div>
  );
};

export default PendingOrdersList;
