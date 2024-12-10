// hooks/useAddToCart.ts
import { useSnackbar } from "notistack";
import { useCallback } from "react";

const useAddToCart = (updateCartCount: () => void) => {
  const {enqueueSnackbar}= useSnackbar()
  const addToCart = useCallback((book) => {
    const customerToken = localStorage.getItem("customer");


    
    // Kiểm tra khách hàng đã đăng nhập
    if (!customerToken) {
      enqueueSnackbar(`bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng`, {
      variant: "error",
      autoHideDuration: 2000,
    });
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
      enqueueSnackbar(`Đã tăng số lượng sản phẩm trong giỏ hàng! Số lượng hiện tại: ${cart[existingProductIndex].quantity}`, {
        variant: "info",
        autoHideDuration: 1500,
      })
    } else {
      // Thêm sản phẩm vào giỏ hàng
      cart.push({ ...product, quantity: 1 });
      enqueueSnackbar(`Sản phẩm đã được thêm vào giỏ hàng!`, {
        variant: "success",
        autoHideDuration: 1500,
      })
    }

    // Lưu giỏ hàng vào localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Cập nhật số lượng giỏ hàng
    updateCartCount();
  }, [updateCartCount]);

  return addToCart;
};

export default useAddToCart;
