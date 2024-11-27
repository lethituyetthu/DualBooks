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
              className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="text-primary-600 space-y-2">
                <p>
                  <strong className="block font-medium text-blue-600">
                  </strong>{" "}
                  {n.id}
                </p>
                <p>
                  <strong className="block font-medium text-gray-800">
                    Khách hàng:
                  </strong>{" "}
                  {n.customer.name}
                </p>
                <p>
                  <strong className="block font-medium text-gray-800">
                    Số điện thoại:
                  </strong>{" "}
                  {n.customer.phone}
                </p>
                <p>
                  <strong className="block font-medium text-gray-800">
                    Địa chỉ:
                  </strong>{" "}
                  {n.customer.address}
                </p>
                <p>
                  <strong className="block font-medium text-gray-800">
                    Tổng tiền:
                  </strong>{" "}
                  {(n.total_amount*1000).toLocaleString("vi-VN")} đ
                </p>
              </div>
              <button
                className="mt-4 md:mt-0 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 shadow-md transition-all duration-200"
                onClick={() => onUpdateStatus(n.id)}
              >
                Xác nhận
              </button>
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
