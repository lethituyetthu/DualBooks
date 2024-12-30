import { useState, useEffect, ReactNode } from "react";
import { useSnackbar } from "notistack";

interface Book {
  _id: string;
  id: number;
  title: string;
  author: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  cover_image: string;
  created_at: string;
  updated_at: string;
  categoryID: string;
  publisherID?: string;
  reviews: string[];
  sales: number;
  views: number;
}

interface User {
  _id: string;
  name: string;
  email: string;
}
interface Product {
  title: ReactNode;
  id: string;

  _id: string;
  name: string;
  price: number;
  cover_image: string;
  author: string;
}

interface FavoriteBooksResponse {
  message: string;
  favoriteBooks: {
    _id: string;
    userId: User;
    books: Book[];
    createdAt: string;
    updatedAt: string;
  };
}

function useFavoriteBooks() {
  const {enqueueSnackbar}= useSnackbar()
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [message, setMessage] = useState<string>("");
  const [bookCount, setBookCount] = useState<number>(0); // State mới để lưu số lượng sách

  // Fetch dữ liệu wishlist từ API khi component mount
  useEffect(() => {
    const customer = localStorage.getItem("customer");

    if (customer) {
      const customerData = JSON.parse(customer);
      const userId = customerData.id;

      // Fetch dữ liệu sách yêu thích từ API
      fetch(`http://localhost:3200/favoriteBooks/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          // console.log("Dữ liệu trả về từ API: ", data);

          if (
            data &&
            data.favoriteBooks &&
            Array.isArray(data.favoriteBooks.books)
          ) {
            const books = data.favoriteBooks.books;
            setWishlist(books); // Cập nhật wishlist với mảng sách yêu thích
            setBookCount(books.length); // Lưu số lượng sách vào state
            // console.log("Số lượng sách yêu thích: ", books.length); // Log số lượng sách
          } else {
            setMessage("Không có sách yêu thích.");
          }
        })
        .catch((error) => {
          console.error("Error fetching favorite books:", error);
          setMessage("Đã xảy ra lỗi khi tải dữ liệu.");
        });
    }
  }, []); // Chỉ chạy một lần khi component mount
  const addToWishlist = async (product: Product) => {
    const customer = localStorage.getItem("customer");

    if (customer) {
      const customerData = JSON.parse(customer);
      const userId = customerData.id;
      const bookId = product.id;

      try {
        const response = await fetch(
          "http://localhost:3200/favoriteBooks/add",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId, bookId }),
          }
        );

        if (response.ok) {
          setWishlist((prevWishlist) => [...prevWishlist, product]); // Cập nhật wishlist ngay sau khi thêm sản phẩm
          setMessage("Sản phẩm đã được thêm vào danh sách yêu thích!");
          enqueueSnackbar(`Sản phẩm đã được thêm vào danh sách yêu thích!`, {
            variant: "success",
            autoHideDuration: 1500,
          })
           // Làm mới trang sau 3 giây
        } else {
          enqueueSnackbar(`Sản phẩm đã tồn tại danh sách yêu thích!`, {
            variant: "warning",
            autoHideDuration: 1500,
          })
        }
      } catch (error) {
        console.error("Lỗi khi thêm sản phẩm vào danh sách yêu thích: ", error); // Log chi tiết lỗi
        setMessage("Có lỗi xảy ra khi thêm sản phẩm vào danh sách yêu thích!");
      } finally {
        setTimeout(() => setMessage(""), 3000); // Xóa thông báo sau 3 giây
      }
    } else {
      setMessage("Vui lòng đăng nhập.");
      enqueueSnackbar(`Bạn cần đăng nhập!`, {
        variant: "error",
        autoHideDuration: 1500,
      })
      setTimeout(() => setMessage(""), 3000);
    }
  };
  // Thêm sản phẩm vào wishlist
  const handleAddToWishlist = (product: Product) => {
    const isProductInWishlist = wishlist.some((item) => item.id === product.id);

    if (isProductInWishlist) {
      enqueueSnackbar(`Sản phẩm đã tồn tại danh sách yêu thích!`, {
        variant: "warning",
        autoHideDuration: 1500,
      })
      setTimeout(() => setMessage(""), 3000);
    } else {
      const updatedWishlist = [...wishlist, product];
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setWishlist(updatedWishlist);
      enqueueSnackbar(`Sản phẩm đã được thêm vào danh sách yêu thích!`, {
        variant: "success",
        autoHideDuration: 1500,
      })
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleRemoveFromWishlist = (productId: string) => {
    const customer = localStorage.getItem("customer");
    console.log(customer);

    if (customer) {
      const customerData = JSON.parse(customer);
      const userId = customerData.id;

      console.log("userId:", userId);
      console.log("productId:", productId);

      fetch(`http://localhost:3200/favoriteBooks/remove`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Đổi tên 'productId' thành 'bookId' trong request body
        body: JSON.stringify({ userId, bookId: productId }), // productId -> bookId
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to remove product from wishlist");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Sản phẩm đã xóa thành công:", data);
          // Delay reload page after 3 seconds
          /*  setTimeout(() => {
        window.location.reload(); // Làm mới trang sau 3 giây
      }, 1000); */
          const updatedWishlist = wishlist.filter(
            (product) => product._id !== productId
          );
          setWishlist(updatedWishlist);
          enqueueSnackbar(`Sản phẩm đã được xoá khỏi danh sách yêu thích!`, {
            variant: "error",
            autoHideDuration: 1500,
          })
          setTimeout(() => setMessage(""), 3000);
        })
        .catch((error) => {
          console.error("Error removing product from wishlist:", error);
          setMessage("Đã xảy ra lỗi khi xóa sản phẩm.");
          setTimeout(() => setMessage(""), 3000);
        });
    } else {
      console.error("Không tìm thấy thông tin người dùng.");
      setMessage("Không thể xóa sản phẩm, vui lòng đăng nhập lại.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return {
    wishlist,
    message,
    handleAddToWishlist,
    addToWishlist,
    handleRemoveFromWishlist,
  };
}

export default useFavoriteBooks;
