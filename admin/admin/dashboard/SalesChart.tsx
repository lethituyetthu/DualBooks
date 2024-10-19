"use client"; // Thêm dòng này nếu bạn chưa có

import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import React from 'react';

// Đăng ký tất cả các thành phần của Chart.js
Chart.register(...registerables);

const SalesChart = () => {
  const data = {
    labels: ['1', '2', '3', '4', '5', '6','7','8','9','10','11','12'], // Đổi tháng thành số cho dễ hiểu hơn
    datasets: [
        {
            label: 'Doanh Thu',
            data: [1200000, 1500000, 900000, 2200000, 1800000, 2400000, 3000000, 2700000, 1900000, 2300000, 2100000, 2500000], // Doanh thu cho 12 tháng
            fill: true, // Tô màu bên dưới đường biểu đồ
            backgroundColor: 'rgba(75, 192, 192, 0.3)', // Màu nền cho diện tích dưới đường biểu đồ
            borderColor: 'rgba(75, 192, 192, 1)', // Màu đường biểu đồ
            tension: 0.1, // Độ cong của đường biểu đồ
            pointBackgroundColor: 'rgba(75, 192, 192, 1)', // Màu sắc cho các điểm dữ liệu
          },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const, // Thay đổi ở đây để chỉ định kiểu chính xác
      },
    },
    scales: {
      x: {
        type: 'category' as const, // Chỉ định kiểu là 'category'
        title: {
          display: true,
          text: 'Tháng', // Tiêu đề cho trục x
        },
      },
      y: {
        title: {
          display: true,
          text: 'Doanh Thu (VND)', // Tiêu đề cho trục y
        },
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default SalesChart;
