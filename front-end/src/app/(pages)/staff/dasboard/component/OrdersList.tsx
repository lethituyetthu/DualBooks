const OrdersList = ({
  orders,
  statuses,
  filterStatus,
  setFilterStatus,
  orderCounts,
}) => {

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Chờ xác nhận":
        return "bg-blue-500"; // Màu xanh dương
      case "Đã xác nhận":
        return "bg-yellow-500"; // Màu vàng
      case "Đang giao hàng":
        return "bg-orange-500"; // Màu cam
      case "Hoàn thành":
        return "bg-green-500"; // Màu xanh lá
      case "Đã hủy":
        return "bg-red-500"; // Màu đỏ
      default:
        return "bg-gray-500"; // Màu xám nếu không có trạng thái khớp
    }
  };
  return (
    <div className="bg-white rounded-lg shadow p-6 mt-9">
      <div className="flex justify-between items-center px-10 py-3">
        <h3 className="text-lg font-semibold text-gray-700">Đơn hàng</h3>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-300 rounded-lg py-2 px-4"
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status} ({orderCounts[status] || 0})
            </option>
          ))}
        </select>
      </div>
      <ul className="space-y-4 px-10 h-80 overflow-y-auto">
        {orders.length > 0 ? (
          orders.map((order) => (
            <li
              key={order.id}
              className="flex justify-between items-center py-3 px-6 bg-white rounded-lg shadow-md"
            >
              <span className="text-gray-700 font-medium text-center w-1/5">
                #...{order.id.slice(-5)}
              </span>
              <span
                className={`font-medium text-white text-center py-1 px-3 rounded w-1/5 ${getStatusColor(order.order_status)}`}
              >
                {order.order_status}
              </span>
              <span className="text-gray-600 font-medium text-center w-1/5">
                {order.customer?.phone || "N/A"}
              </span>
              <span className="text-green-500 font-semibold text-center w-1/5">
                {(order.total_amount * 1000).toLocaleString("vi-VN")} đ
              </span>
            </li>
          ))
        ) : (
          <li className="text-gray-500 text-center py-4">
            Không có đơn hàng cho trạng thái này.
          </li>
        )}
      </ul>
    </div>
  );
};
export default OrdersList ;