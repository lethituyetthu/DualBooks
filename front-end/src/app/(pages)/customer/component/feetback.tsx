import Image from "next/image";
import React from "react";

const FeetBack = () => {
  const feedbacks = [
    {
      name: "Nguyễn Văn A",
      time: "1 tuần trước",
      comment:
        "Cuốn sách này rất bổ ích, giúp tôi hiểu rõ hơn về lập trình và các kiến thức chuyên môn. Các ví dụ trong sách rất dễ hiểu và dễ dàng áp dụng vào thực tế. Đây là một trong những cuốn sách hay nhất mà tôi từng đọc về lĩnh vực này.",
      rating: 5,
    },
    {
      name: "Lê Thị B",
      time: "2 ngày trước",
      comment:
        "Sách có nội dung rất hấp dẫn, cách viết dễ hiểu và logic. Đặc biệt là những ví dụ trong sách giúp tôi dễ dàng hình dung và nắm bắt kiến thức nhanh chóng. Đây là cuốn sách tuyệt vời cho bất kỳ ai muốn nâng cao kỹ năng lập trình.",
      rating: 5,
    }
    ,
    {
      name: "Lê Thị B",
      time: "2 ngày trước",
      comment:
        "Sách có nội dung rất hấp dẫn, cách viết dễ hiểu và logic. Đặc biệt là những ví dụ trong sách giúp tôi dễ dàng hình dung và nắm bắt kiến thức nhanh chóng. Đây là cuốn sách tuyệt vời cho bất kỳ ai muốn nâng cao kỹ năng lập trình.",
      rating: 5,
    },
  ];

  return (
    <div className="w-[50%]  ">
      <h2 className="text-xl font-semibold mb-4 ml-3">
        Đánh Giá Của Khách Hàng
      </h2>

      <div className="max-h-[350px] overflow-y-auto">
        {feedbacks.map((feedback, index) => (
          <div
            key={index}
            className="border p-4 rounded-md shadow-sm mb-6 bg-white"
          >
            <div className="flex items-center mb-2">
              <div className="">
                <div className="text-sm font-bold">{feedback.name}</div>
                <div className="text-xs text-gray-500">{feedback.time}</div>
              </div>
            </div>
            <div className="text-primary-400">
              {"★".repeat(feedback.rating)}
            </div>
            <p className="text-gray-700 mt-2">{feedback.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeetBack;
