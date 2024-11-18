// In Order.ts
export interface Order {
  id: string;
  customer_id: string;
  order_date: string;
  status: string; // or adjust as per your data
  total_amount: number;
  shipping_address: string;
  order_status?: string; // Add this line if needed
}
