import React, { useState } from 'react';

interface QuantitySelectorProps {
  initialQuantity?: number; // Thêm dấu hỏi để số lượng ban đầu có thể là không bắt buộc
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ initialQuantity = 1 }) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const increase = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  return (
    <div className="flex items-center">
      <button onClick={decrease} className="px-2 py-1 border" disabled={quantity <= 1}>
        -
      </button>
      <span className="px-4">{quantity}</span>
      <button onClick={increase} className="px-2 py-1 border">
        +
      </button>
    </div>
  );
};
    
export default QuantitySelector;
