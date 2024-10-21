import React from "react";

const Rating = () => {
  return (
    <div className="max-w-full bg-white">
      <div className="border p-4 rounded-md shadow-sm mb-6 border-spacing-6 bg-white  border-gray-00 ">
        <h2 className="text-xl font-semibold mb-4">Xếp Hạng</h2>
        <div className="flex items-center mb-4">
          {/* Phần hiển thị điểm trung bình */}
          <div className="text-center w-1/4">
            <div className="text-4xl font-bold text-gray-800">4.8</div>
            <div className="text-primary-400 text-xl">★★★★☆</div>
            <div className="text-gray-600">Xếp Hạng </div>
          </div>

          {/* Phần thanh tiến độ cho từng xếp hạng */}
          <div className="w-3/4">
            {[
              { stars: 5, percentage: 75 },
              { stars: 4, percentage: 21 },
              { stars: 3, percentage: 3 },
              { stars: 2, percentage: 20 },
              { stars: 1, percentage: 0.5 },
            ].map((rating, index) => (
              <div key={index} className="flex items-center mb-2">
                {/* Hiển thị số sao */}
                <span className="w-8 text-gray-700">{rating.stars}</span>
                
                {/* Thanh tiến độ */}
                <div className="w-full h-3 bg-gray-300 rounded-lg mx-2 relative">
                  <div
                    className="bg-primary-400 h-full rounded-lg"
                    style={{ width: `${rating.percentage}%` }}
                  ></div>
                </div>

                {/* Hiển thị phần trăm */}
                <span className="w-12 text-gray-600">{rating.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rating;
