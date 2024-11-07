// models/Customer.ts
export interface Customer {
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
  