// hooks/useAddToCart.ts
import { useCallback } from "react";

const useAddToCart = (updateCartCount: () => void) => {
  const addToCart = useCallback((book) => {
    const customerToken = localStorage.getItem("customer");

    // Kiểm tra khách hàng đã đăng nhập
    if (!customerToken) {
      alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!");
      return;
    }

    // Thông tin sản phẩm cần thêm
    const product = {
      id: book._id || book.id,
      title: book.title,
      author: book.author,
      price: book.price,
      cover_image: book.cover_image,
    };

    // Lấy giỏ hàng từ localStorage
    const existingCart = localStorage.getItem("cart");
    const cart = existingCart ? JSON.parse(existingCart) : [];

    // Kiểm tra sản phẩm đã tồn tại hay chưa
    const existingProductIndex = cart.findIndex((item) => item.id === product.id);

    if (existingProductIndex !== -1) {
      // Nếu sản phẩm đã tồn tại, tăng số lượng
      cart[existingProductIndex].quantity += 1;
      alert(`Đã tăng số lượng sản phẩm trong giỏ hàng! Số lượng hiện tại: ${cart[existingProductIndex].quantity}`);
    } else {
      // Thêm sản phẩm vào giỏ hàng
      cart.push({ ...product, quantity: 1 });
      alert("Sản phẩm đã được thêm vào giỏ hàng!");
    }

    // Lưu giỏ hàng vào localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Cập nhật số lượng giỏ hàng
    updateCartCount();
  }, [updateCartCount]);

  return addToCart;
};

export default useAddToCart;
