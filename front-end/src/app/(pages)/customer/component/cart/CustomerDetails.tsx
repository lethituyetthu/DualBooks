import React from "react";

type CustomerDetailsProps = {
  customer: {
    name: string;
    email: string;
    phone: string;
  };
};

const CustomerDetails: React.FC<CustomerDetailsProps> = ({ customer }) => {
  return (
    <div className="mb-4 text-gray-600">
      <p>
        <strong>Họ tên:</strong> {customer.name}
      </p>
      <p>
        <strong>Email:</strong> {customer.email}
      </p>
      <p>
        <strong>Số điện thoại:</strong> {customer.phone}
      </p>
    </div>
  );
};

export default CustomerDetails;
