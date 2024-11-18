import React from "react";

type ShippingAddressProps = {
  shippingAddress: string;
  setShippingAddress: (value: string) => void;
  shippingMethod: string;
  handleShippingMethodChange: (method: string) => void;
  verifyAddress: () => void;
};

const ShippingAddress: React.FC<ShippingAddressProps> = ({
  shippingAddress,
  setShippingAddress,
  shippingMethod,
  handleShippingMethodChange,
  verifyAddress,
}) => {
  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Địa chỉ giao hàng</h2>
      <textarea
        placeholder="Nhập địa chỉ giao hàng"
        value={shippingAddress}
        onChange={(e) => setShippingAddress(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-3 text-gray-800 focus:outline-none focus:ring focus:ring-primary-300 mb-4"
        rows={3}
      />
      <button
        onClick={verifyAddress}
        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition"
      >
        Xác nhận địa chỉ giao hàng
      </button>

      <hr className="my-4 border-gray-200" />

      <h3 className="text-lg font-semibold text-gray-800 mb-2">Phương thức giao hàng</h3>
      <label className="block mt-2">
        <input
          type="radio"
          value="standard"
          checked={shippingMethod === "standard"}
          onChange={() => handleShippingMethodChange("standard")}
          className="mr-2"
        />
        Giao hàng tiêu chuẩn (30.000 đ)
      </label>
      <label className="block mt-2">
        <input
          type="radio"
          value="express"
          checked={shippingMethod === "express"}
          onChange={() => handleShippingMethodChange("express")}
          className="mr-2"
        />
        Giao hàng nhanh (50.000 đ)
      </label>
    </div>
  );
};

export default ShippingAddress;
