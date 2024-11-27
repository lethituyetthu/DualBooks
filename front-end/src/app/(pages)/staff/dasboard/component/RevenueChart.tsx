import { Bar } from "react-chartjs-2";

const RevenueChart = ({ chartData, chartOptions }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 ">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        Thống kê doanh thu
      </h3>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};
export default RevenueChart ;