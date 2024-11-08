  import React, { useEffect, useState } from "react";

  // Define prop types for CartItem
  interface CartItemProps {
    id:string;
    product: string;
    quantity: number;
    price: number;
    onQuantityChange:(id:string, newQuantity:number) => void
    onDelete: (id: string) => void; 
  }

  const CartItem: React.FC<CartItemProps> = ({id, product, quantity,onQuantityChange, price,onDelete }) => {
    const [currentQuantity, setCurrentQuantity] = useState(quantity);

    useEffect(()=>{
      setCurrentQuantity(quantity);
    },[quantity])

    const decrementQuantity = () =>{
      if(currentQuantity >1){
        const newQuantity = currentQuantity -1 
        setCurrentQuantity(newQuantity)
        onQuantityChange(id, newQuantity)

      }else {
        onDelete(id)
      }
    }

    const totalPrice = currentQuantity * price;


    return (
      <div className="grid grid-cols-5 gap-4 items-center py-2 border-b ">
        <div className="col-span-2">
          {product}
          <div className="text-dark-200">Giá: {(price * 1000).toLocaleString("vi-VN") + " đ"}</div>
        </div>

        <div>
          {currentQuantity}
        </div>

        <div>{(totalPrice * 1000).toLocaleString("vi-VN") + " đ"}</div>

        <button className="text-red-500" onClick={decrementQuantity} >✖</button>
      </div>
    );
  };

  export default CartItem;
