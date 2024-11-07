import React, { useState } from 'react';

const ReviewForm = () => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Thực hiện logic gửi đánh giá ở đây (có thể dùng API)
    console.log({ name, rating, comment });
    // Reset form sau khi submit
    setName('');
    setRating(0);
    setComment('');
  };

  return (
    <div className="w-[40%] ">
      <h2 className="text-xl font-semibold mb-4">Đánh Giá Của Bạn</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tên người dùng */}
        <div>
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Tên của bạn:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-sm"
            placeholder="Nhập tên của bạn"
            required
          />
        </div>

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
