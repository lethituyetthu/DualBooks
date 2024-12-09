import React, { useEffect, useState } from "react";
import useFetchBook from "../../../hook/useFetchBook";

const Rating = ({ id }: { id: string }) => {
  // console.log("Rating component received id:", id);
  const { fetchDetail, reviews: fetchedReviews, loading, error } = useFetchBook();
  const [isFetched, setIsFetched] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingPercentages, setRatingPercentages] = useState<
    { stars: number; percentage: number }[]
  >([]);
   
  useEffect(() => {
    if (!isFetched) {
      fetchDetail(id);
      setIsFetched(true);
    }
  }, [id, fetchDetail, isFetched]);
  // Debug dữ liệu fetchedReviews
  useEffect(() => {
    // console.log("Fetched reviews:", fetchedReviews);
  }, [fetchedReviews]);

  // Hàm tính trung bình rating và tỷ lệ phần trăm
  const calculateRatings = (reviewList: any[]) => {
    if (!reviewList || reviewList.length === 0) return { average: 0, percentages: [] };

    const totalReviews = reviewList.length;
    const ratingCounts = [0, 0, 0, 0, 0]; // 5 mức rating từ 1 đến 5

    let totalRating = 0;

    reviewList.forEach((review) => {
      const roundedRating = Math.round(review.rating); // Làm tròn rating
      totalRating += review.rating;
      ratingCounts[roundedRating - 1] += 1;
    });

    const average = totalRating / totalReviews;
    const percentages = ratingCounts.map((count, index) => ({
      stars: index + 1,
      percentage: Math.round((count / totalReviews) * 100),
    }));

    return { average, percentages };
  };

  // Tính toán rating khi fetchedReviews thay đổi
  useEffect(() => {
    if (fetchedReviews) {
      const { average, percentages } = calculateRatings(fetchedReviews);
      setAverageRating(average);
      setRatingPercentages(percentages);
    }
  }, [fetchedReviews]);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;
  if (!fetchedReviews || fetchedReviews.length === 0)
    return (
      <div className="text-center text-gray-600">
        Chưa có đánh giá nào cho sản phẩm này.
      </div>
    );

  return (
    <div className="max-w-full bg-white">
      <div className="border p-4 rounded-md shadow-sm mb-6 border-spacing-6 bg-white border-gray-00">
        <h2 className="text-xl font-semibold mb-4">Xếp Hạng</h2>
        <div className="flex items-center mb-4">
          {/* Hiển thị điểm trung bình */}
          <div className="text-center w-1/4">
            <div className="text-4xl font-bold text-gray-800">
              {averageRating.toFixed(1)}
            </div>
            <div className="text-primary-400 text-xl">
              {"★".repeat(Math.floor(averageRating))}
              {"☆".repeat(5 - Math.floor(averageRating))}
            </div>
            <div className="text-gray-600">Xếp Hạng</div>
          </div>

          {/* Thanh tiến độ cho từng mức sao */}
          <div className="w-3/4">
            {ratingPercentages.map((rating, index) => (
              <div key={index} className="flex items-center mb-2">
                <span className="w-8 text-gray-700">{rating.stars}</span>
                <div className="w-full h-3 bg-gray-300 rounded-lg mx-2 relative">
                  <div
                    className="bg-primary-400 h-full rounded-lg"
                    style={{ width: `${rating.percentage}%` }}
                  ></div>
                </div>
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
