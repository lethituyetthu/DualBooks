// CartItem.js
import QuantitySelector from '@/components/ui/quantitySelector';
import React from 'react';

const CartItem = ({ product, quantity, price }) => {
  return (
    <div className="grid grid-cols-5 gap-4 items-center py-2 border-b ">
      <div className="col-span-2">{product}</div>
      <QuantitySelector initialQuantity={1}/>
      <div>{price.toLocaleString()} đ</div>
      <button className="text-red-500">✖</button>
    </div>
  );
};

export default CartItem;
