import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import useFetchCustomer from "../../../hook/useFetchCustomer";

// Định nghĩa kiểu cho customer
interface Customer {
  name: string;
  // Các thuộc tính khác của customer nếu cần
}

interface NameTokenProps {
  customer: Customer;
}

export default function NameToken({ customer }: NameTokenProps) {
  const { logout } = useFetchCustomer();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("cart"); 
    localStorage.removeItem("token");
    window.location.href = "/customer";
  };

  return (
    <li>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 inline-block"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>{" "}
          {customer.name}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <Link href="/customer/profile">
            <DropdownMenuItem>
              <p>Hồ sơ</p>
            </DropdownMenuItem>
          </Link>
          <Link href="/customer/OrderHistory">
            <DropdownMenuItem>
              <p>Lịch sử đơn hàng </p>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>Đăng xuất</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  );
}
