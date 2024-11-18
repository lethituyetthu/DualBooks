import { useEffect, useState, useCallback } from 'react';
export interface Customer {
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

export const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  function isCustomerArray(data: unknown): data is Customer[] {
    if (!Array.isArray(data)) return false;
  
    return data.every(item => 
      typeof item._id === 'string' &&
      typeof item.name === 'string' &&
      typeof item.email === 'string' &&
      (typeof item.password === 'string' || item.password === undefined) &&
      typeof item.phone === 'string' &&
      typeof item.address === 'string' &&
      (item.status === 'active' || item.status === 'blocked') &&
      (typeof item.created_at === 'string' || item.created_at instanceof Date) &&
      (typeof item.updated_at === 'string' || item.updated_at instanceof Date)
    );
  }
  const fetchCustomers = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3200/customers');
      if (!response.ok) {
        throw new Error('Mã lỗi: ' + response.status);
      }
  
      const data = await response.json();
      
      // Kiểm tra nếu data là một mảng Customer[]
      if (!isCustomerArray(data)) {
        throw new Error('Dữ liệu không hợp lệ');
      }
      
      setCustomers(data); // Nếu kiểm tra thành công, lưu vào state
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);
  

  const deleteCustomer = async (id: string) => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn xóa khách hàng này?");
    if (confirmed) {
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
        // Cập nhật lại danh sách khách hàng sau khi xóa
        setCustomers(customers.filter(customer => customer._id !== id));
      } catch (err) {
        setError((err as Error).message);
      }
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

  // Kiểm tra trạng thái và dữ liệu
  useEffect(() => {
    console.log('Loading:', loading);
    console.log('Customers:', customers);
    console.log('Error:', error);
  }, [loading, customers, error]);

  return { customers, loading, error, deleteCustomer, toggleCustomerStatus };
};
