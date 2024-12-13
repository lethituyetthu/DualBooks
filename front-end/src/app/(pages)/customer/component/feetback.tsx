import React, { useEffect, useState } from "react";
import useFetchBook from "../../../hook/useFetchBook"; // Hook lấy dữ liệu sách

const FeetBack = ({ id }: { id: string }) => {
  const { fetchDetail, reviews, loading, error } = useFetchBook();
  const [isFetched, setIsFetched] = useState(false);

  // Lấy thông tin customerId từ localStorage
  const customerData = localStorage.getItem("customer");
  const customerId = customerData ? JSON.parse(customerData).id : null;

  if (!customerId) {
    console.error("Không tìm thấy dữ liệu khách hàng trong localStorage");
    return null;
  }

  useEffect(() => {
    if (!isFetched) {
      fetchDetail(id);
      setIsFetched(true);
    }
  }, [id, fetchDetail, isFetched]);

  const handleDelete = async (reviewId: string) => {
    const bookId = id;
    try {
      const response = await fetch(
        `http://localhost:3200/books/${bookId}/reviews/${reviewId}/${customerId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Xóa bài đánh giá thành công:", data);
        fetchDetail(bookId); // Cập nhật lại danh sách sau khi xóa
      } else {
        const errorData = await response.json();
        console.error("Lỗi khi xóa bài đánh giá:", errorData.message);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API xóa bài đánh giá:", error);
    }
  };

  if (loading) return <p>Đang tải đánh giá...</p>;
  if (error) return <p>Lỗi: {error}</p>;

  return (
    <div className="w-[50%]">
      <h2 className="text-xl font-semibold mb-4 ml-3">Đánh Giá Của Khách Hàng</h2>
      {/* Khung chứa danh sách bình luận */}
      <div
        className="border p-4 rounded-md shadow-sm bg-gray-50"
        style={{
          maxHeight: "300px", // Chiều cao giới hạn cho khung chứa
          overflowY: "auto", // Hiển thị thanh cuộn dọc nếu nội dung vượt quá
        }}
      >
        {reviews.length > 0 ? (
          reviews.map((feedback: any, index: number) => (
            <div
              key={index}
              className="border p-4 rounded-md shadow-sm mb-6 bg-white"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="text-sm font-bold">{feedback.customer_id.name}</div>
                  <div className="text-xs text-gray-500">{feedback.created_at}</div>
                </div>

                {feedback.customer_id._id === customerId && (
                  <button
                    onClick={() => handleDelete(feedback.id)}
                    className="text-red-500 hover:text-red-700 text-xs font-semibold"
                  >
                    Xóa
                  </button>
                )}
              </div>
              <div className="text-primary-400"> {"★".repeat(Math.floor(feedback.rating)) + "☆".repeat(5 - Math.floor(feedback.rating))}</div>
              <p className="text-gray-700 mt-2">{feedback.comment}</p>
            </div>
          ))
        ) : (
          <p>Không có đánh giá.</p>
        )}
      </div>
    </div>
  );
};

export default FeetBack;
