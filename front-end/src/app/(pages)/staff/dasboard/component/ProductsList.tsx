
const ProductsList = ({ title, products, renderDetails }) => {
  return (
    <div className="bg-white rounded-lg h-[40%] shadow p-6 overflow-y-auto">
      <h3 className="text-lg font-semibold text-gray-700 mb-4 w-[70%]">{title}</h3>
      <ul className="space-y-4">
        {products.length > 0 ? (
          products.map((product) => (
            <li key={product.id} className="flex justify-between">
              <span className="w-[75%]">{product.title}</span>
              <span className="font-semibold">{renderDetails(product)}</span>
            </li>
          ))
        ) : (
          <li className="text-gray-500 text-sm">Không có sản phẩm phù hợp.</li>
        )}
      </ul>
    </div>
  );
};

export default ProductsList