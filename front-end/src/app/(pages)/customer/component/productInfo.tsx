// components/ProductInfo.js
import Image from "next/image";

const ProductInfo = ({ title, cover_image, author, categoryName, price, description }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="flex justify-center">
        <Image
          src={`http://localhost:3200/uploads/books/${cover_image}`}
          alt={title}
          width={200}
          height={300}
          style={{ height: "auto" }}
          className="object-cover mb-4"
        />
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-4">Thông tin sản phẩm</h2>
        <p><strong>Tác giả:</strong> {author}</p>
        <p><strong>Thể loại:</strong> {categoryName}</p>
        <p><strong>Kích thước:</strong> 13x20 cm</p>
        <p><strong>Nhà xuất bản:</strong> Nhà xuất bản Trẻ</p>
        <p><strong>Thương hiệu:</strong> DualBooks</p>
        <p><strong>Giá bìa:</strong> {(price * 1000).toLocaleString("vi-VN") + " đ"}</p>
      </div>
    </div>
  );
};

export default ProductInfo;
