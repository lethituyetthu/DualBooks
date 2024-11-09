// models/Customer.ts
export interface Customer {
<<<<<<< HEAD
  _id: string; // ID là thuộc tính bắt buộc
  name: string; // Bắt buộc
  email: string; // Bắt buộc
  password: string; // Bắt buộc, có thể xóa nếu không cần
  phone: string; // Bắt buộc
  address: string; // Bắt buộc
  status: 'active' | 'blocked'; // Trạng thái là thuộc tính bắt buộc
  created_at: string; // Bắt buộc, hoặc có thể dùng Date
  updated_at: string; // Bắt buộc, hoặc có thể dùng Date
}
=======
    _id: string;
    name: string;
    email: string;
    password: string; // Bạn có thể muốn không lưu password trong state
    phone: string;
    address: string;
    created_at: string;
    updated_at: string;
    status: string;
  }
  
>>>>>>> origin/nhathuy
