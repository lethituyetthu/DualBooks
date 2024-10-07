import React from "react";

interface typeBook {
  id: string;
  title:string;
  author: string;
  category: "Văn học";
  categoryID: "66e52d1113ae0384d3444c41";
  description: "Thất lạc người thân, sinh ly tử biệt, lãng quên tên họ... Những con người đột nhiên đánh mất điều quý giá rồi sa chân vào một góc đô thị - một thế giới tràn đầy sự trùng hợp và bất ngờ. Lữ khách tình cờ đưa ta lần theo ánh sáng nhạt mờ trong trái tim người chỉnh đàn cô độc, Vịnh Hanalei họa nên cuộc sống của một người mẹ có đứa con trai bỏ mạng nơi biển cả xứ xa... Ở thế giới mà ta đã quen, có những điểm mù xuất hiện trong khoảnh khắc, số phận bí ẩn của những người mất hút vào những điểm mù ấy được thuật lại trong năm câu chuyện này.";
  price: 88;
  stock: 100;
  cover_image: "1726962990341-145623384.webp";
  created_at: "2024-09-21T23:56:30.354Z";
  updated_at: "2024-09-21T23:56:30.354Z";
}

export default function useFetchBook() {
  return <div>useFetchBook</div>;
}
