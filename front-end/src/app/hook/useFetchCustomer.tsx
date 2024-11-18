import { useEffect, useState, useCallback } from 'react';
// import { useRouter } from "next/navigation";
interface typeCustomer {
  _id: string; // ID là thuộc tính bắt buộc
  name?: string; // Bắt buộc
  email?: string; // Bắt buộc
  password?: string; // Bắt buộc, có thể xóa nếu không cần
  phone?: string; // Bắt buộc
  address?: string; // Bắt buộc
  status?: 'active' | 'blocked'; // Trạng thái là thuộc tính bắt buộc
  created_at?: string; // Bắt buộc, hoặc có thể dùng Date
  updated_at?: string; // Bắt buộc, hoặc có thể dùng Date
}

interface Errors {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  password?: string;
}
// function isCustomerArray(data: unknown): data is typeCustomer[] {
//   if (!Array.isArray(data)) return false;

//   return data.every(item => 
//     typeof item._id === 'string' &&
//     typeof item.name === 'string' &&
//     typeof item.email === 'string' &&
//     (typeof item.password === 'string' || item.password === undefined) &&
//     typeof item.phone === 'string' &&
//     typeof item.address === 'string' &&
//     (item.status === 'active' || item.status === 'blocked') &&
//     (typeof item.created_at === 'string' || item.created_at instanceof Date) &&
//     (typeof item.updated_at === 'string' || item.updated_at instanceof Date)
//   );
// }

export default function useFetchCustomer() {
  // const route = useRouter()
  const [customers, setCustomers] = useState<typeCustomer[]>([]); // Danh sách khách hàng
  const [loading, setLoading] = useState<boolean>(false); // Trạng thái loading
  const [errors, setErrors] = useState<Errors>({});
  const [error, setError] = useState<string | null>(null); // Lỗi
  const [successMessage, setSuccessMessage] = useState<string>("");

  const validateForm = (formData: typeCustomer, isLogin = false) => {
    const newErrors: Errors = {};

    if (!isLogin && !formData.name) {
      newErrors.name = "Tên không được để trống";
    }
    if (!formData.email) {
      newErrors.email = "Email không được để trống";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }
    if (!isLogin && !formData.phone) {
      newErrors.phone = "Số điện thoại không được để trống";
    }
    if (!isLogin && !formData.address) {
      newErrors.address = "Địa chỉ không được để trống";
    }
    if (!formData.password) {
      newErrors.password = "Mật khẩu không được để trống";
    }

    return newErrors;
  };

  // Fetch customer info
  const fetchCustomer = useCallback(async (id: string) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setErrors({ email: "Thiếu token. Vui lòng đăng nhập." });
      return;
    }
    try {
      const response = await fetch(`http://localhost:3200/customers/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        setErrors({ email: errorData.message });
      } else {
        const data = await response.json();
        return data; // Return customer data
        
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi:", error);
    }
  }, []);

  // Register
  const register = async (formData: typeCustomer) => {
    const validateErrors = validateForm(formData);

    if (Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:3200/customers/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrors({ email: errorData.message });
      } else {
        const data = await response.json();
        setSuccessMessage(data.message);
        setErrors({});
        window.location.href = "/customer/login";
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi:", error);
    }
  };

  // Login
  const login = async (formData: typeCustomer) => {
    const validateErrors = validateForm(formData, true);

    if (Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:3200/customers/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setErrors({ email: errorData.message });
      } else {
        const data = await response.json();

        localStorage.setItem("token", data.token);

        const customerInfo = {
          id: data.customer._id,
          email: data.customer.email,
          name: data.customer.name,
          address:data.customer.address,
          phone:data.customer.phone
        };
        localStorage.setItem("customer", JSON.stringify(customerInfo));

        setSuccessMessage("Đăng nhập thành công");
        setErrors({});
        window.location.href = "/customer";
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi:", error);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("customer");
    setSuccessMessage("Đăng xuất thành công");
    setErrors({});
    console.log("Đã đăng xuất");
  };

  // Edit customer info
  const edit = async (id: string, formData: typeCustomer) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setErrors({ email: "Thiếu token. Vui lòng đăng nhập." });
      return;
    }

    const validateErrors = validateForm(formData);
    if (Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3200/customers/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      console.log(formData);
      if (!response.ok) {
        const errorData = await response.json();
        setErrors({ email: errorData.message });
        return;
      } else {
        const data = await response.json();
        console.log("Cập nhật thông tin thành công");
        setSuccessMessage(data.message);
        setErrors({});
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi khi cập nhật thông tin khách hàng:", error);
      setErrors({ email: "Đã xảy ra lỗi không xác định." });
    }
  };

 // Hàm lấy tất cả dữ liệu khách hàng
 const fetchCustomers = useCallback(async () => {
  setLoading(true);
  try {
    const response = await fetch("http://localhost:3200/customers");
    if (!response.ok) {
      throw new Error("Lỗi khi lấy dữ liệu khách hàng!");
    }
    const data = await response.json();
    setCustomers(data);
  } catch (err) {
    setError((err as Error).message);
  } finally {
    setLoading(false);
  }
}, []);

   // Hàm xóa khách hàng
   const deleteCustomer = useCallback(async (id: string) => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn xóa khách hàng này?");
    if (confirmed) {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3200/customers/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Không thể xóa khách hàng: ' + response.status);
        }

        alert("Đã xóa thành công khách hàng");
        // Cập nhật danh sách khách hàng
        setCustomers(prevCustomers => prevCustomers.filter(customer => customer._id !== id));
        setSuccessMessage("Xóa khách hàng thành công");
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
  }, []);
  const searchCustomersByName = async (term: string) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3200/customers/search?query=${term}`);
      if (!response.ok) {
        throw new Error("Lỗi khi tìm kiếm khách hàng theo tên!");
      }
      const data = await response.json();
      console.log("Dữ liệu khách hàng:", data);  // Kiểm tra dữ liệu trả về
      setCustomers(data);  // Cập nhật trạng thái customers
      setError(null); // Xóa lỗi trước đó (nếu có)
    } catch (err) {
      setError((err as Error).message);
      console.error("Lỗi khi tìm kiếm khách hàng theo tên:", err);
    } finally {
      setLoading(false);
    }
  };
  const toggleCustomerStatus = async (id: string) => {
    const customer = customers.find(c => c._id === id);
    if (!customer) return;

    const newStatus = customer.status === 'active' ? 'blocked' : 'active';
    const confirmed = window.confirm(`Bạn có chắc chắn muốn chuyển trạng thái từ "${customer.status}" sang "${newStatus}" không?`);

    if (confirmed) {
      try {
        const response = await fetch(`http://localhost:3200/customers/${id}/status`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: newStatus }),
        });

        if (!response.ok) {
          throw new Error('Không thể cập nhật trạng thái: ' + response.status);
        }

        const updatedCustomer = await response.json();
        setCustomers(customers.map(customer =>
          customer._id === id ? updatedCustomer.customer : customer
        ));
      } catch (err) {
        setError((err as Error).message);
      }
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);
//  // Kiểm tra trạng thái và dữ liệu
//  useEffect(() => {
//   console.log('Loading:', loading);
//   console.log('Customers:', customers);
//   console.log('Error:', error);
// }, [loading, customers, error]);

  return {
    fetchCustomer,
    fetchCustomers,
    edit,
    register,
    login,
    logout,
    deleteCustomer,
    errors,
    successMessage,
    loading,
    customers,
    error,
    searchCustomersByName, // Trả về hàm tìm kiếm theo tên
    toggleCustomerStatus,
  };
}