import React, { useState } from 'react';

const ReviewForm = ({ id }: { id: string }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Lấy customer_id từ localStorage
    const customerData = localStorage.getItem('customer');

    // Kiểm tra nếu không có customerData trong localStorage
    if (!customerData) {
      console.error('Không tìm thấy dữ liệu khách hàng trong localStorage');
      return;
    }
  
    // Chuyển đổi chuỗi JSON thành đối tượng và lấy ID
    const customer = JSON.parse(customerData);
    const customerId = customer.id;

  // Log kết quả của customerId
  console.log('Customer ID:', customerId);

    // Tạo dữ liệu đánh giá
    const reviewData = {
      customer_id: customerId, // Lấy ID khách hàng từ localStorage
      comment,
      rating,
    };

    // Gửi yêu cầu POST tới API để thêm đánh giá
    try {
      const response = await fetch(`http://localhost:3200/books/${id}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        // Nếu thành công, xử lý phản hồi (thông báo thành công, reset form...)
        const result = await response.json();
        console.log('Đánh giá đã được gửi:', result);
        // Reset form sau khi submit
        setRating(0);
        setComment('');
          // Delay reload page after 3 seconds
       setTimeout(() => {
        window.location.reload(); // Làm mới trang sau 3 giây
      }, 1000);
      } else {
        console.error('Lỗi khi gửi đánh giá:', response.statusText);
      }
    } catch (error) {
      console.error('Đã xảy ra lỗi:', error);
    }
  };

  return (
    <div className="w-[40%]">
      <h2 className="text-xl font-semibold mb-4">Đánh Giá Của Bạn</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Đánh giá sao */}
        <div>
          <label htmlFor="rating" className="block text-gray-700 font-medium mb-2">
            Đánh giá:
          </label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                className={`text-2xl ${rating >= star ? 'text-primary-400' : 'text-gray-300'}`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        {/* Nhận xét */}
        <div>
          <label htmlFor="comment" className="block text-gray-700 font-medium mb-2">
            Nhận xét:
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-sm"
            placeholder="Viết nhận xét của bạn"
            rows="4"
            required
          />
        </div>

        {/* Nút gửi */}
        <div>
          <button
            type="submit"
            className="w-full p-2 bg-primary-400 text-white font-semibold rounded-sm hover:bg-primary-300 transition duration-200"
          >
            Gửi Đánh Giá
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
