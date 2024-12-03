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
  }
export default getStatusColor