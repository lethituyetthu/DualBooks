import React, { useState } from "react";



const QuantitySelector  = ({ quantity, onChange }) => {


  const increase = () => {
    const newQuantity = quantity + 1;
    onChange(newQuantity); 
  };

  const decrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      onChange(newQuantity); // Gọi hàm onChange để báo cho component cha
    }
  };

  return (
    <div className="flex border border-gray-300 rounded-lg w-[130px]">
      <button
        onClick={decrease}
        className={`px-3 py-2 border-r border-gray-300 rounded-l-lg ${
          quantity <= 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "hover:bg-gray-100 text-black"
        }`}
        disabled={quantity <= 1}
      >
        -
      </button>
      <span className="px-5 py-2 text-center "><p className="w-6 text-center">{quantity}</p></span>
      <button
        onClick={increase}
        className="px-3 py-2 border-l border-gray-300 rounded-r-lg hover:bg-gray-100 text-black"
      >
        +
      </button>
    </div>  
  );
};

export default QuantitySelector;
