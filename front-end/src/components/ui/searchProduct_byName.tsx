import React from "react";

type SearchProductProps = {
  searchTerm: string;
  onSearchChange: (term: string) => void;
};

const SearchProduct: React.FC<SearchProductProps> = ({ searchTerm, onSearchChange }) => {
  // Hàm xử lý thay đổi ô tìm kiếm
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Nhập tên sản phẩm..."
      className="border border-gray-300 rounded px-4 py-2 mr-4"
      value={searchTerm}
      onChange={handleChange}
    />
  );
};

export default SearchProduct;
