// src/app/(pages)/admin/models/Customer.ts
export interface Customer {
    _id: string; // Đảm bảo trường _id có mặt
    name: string;
    email: string;
    phone: string;
    address: string;
    status: string; // Nếu bạn muốn thêm trạng thái, có thể để vào đây
    created_at: Date; // Nếu cần sử dụng trường này
    updated_at: Date; // Nếu cần sử dụng trường này
  }
  