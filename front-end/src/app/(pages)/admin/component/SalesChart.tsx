"use client";

import { Chart, registerables, TooltipItem } from 'chart.js';
import { Line } from 'react-chartjs-2';
import React, { useEffect, useState } from 'react';
import useFetchBook from '../../../hook/useFetchBook';

Chart.register(...registerables);

interface typeBook {
    id: string;
    title: string;
    price: number;
    cover_image: string;
    author: string;
    sales: number; // Đảm bảo thuộc tính sales tồn tại
}

const SalesChart: React.FC = () => {
    const { books } = useFetchBook() as { books: typeBook[] };
    const [salesData, setSalesData] = useState<number[]>([]);

    useEffect(() => {
        if (books.length > 0) {
            const data = books.map((book) => book.sales || 0);
            setSalesData(data);
        }
    }, [books]);

    const createGradient = (ctx: CanvasRenderingContext2D, chartArea: { bottom: number; top: number }) => {
        const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        gradient.addColorStop(0, 'rgba(67, 121, 238, 0.3)');
        gradient.addColorStop(1, 'rgba(67, 121, 238, 0)');
        return gradient;
    };

    const data = {
        labels: books.map((book) => book.title),
        datasets: [
            {
                label: 'Doanh Thu (%)',
                data: salesData,
                fill: true,
                backgroundColor: (context: { chart: { ctx: CanvasRenderingContext2D; chartArea: { bottom: number; top: number } | null } }) => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) {
                        return 'rgba(67, 121, 238, 0.3)';
                    }
                    return createGradient(ctx, chartArea);
                },
                borderColor: '#4379EE',
                tension: 0.1,
                pointBackgroundColor: books.map((book) => (book.sales > 0 ? '#4379EE' : '#FF0000')),
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top' as const,
            },
            tooltip: {
                callbacks: {
                    label: (context: TooltipItem<'line'>) => {
                        const book = books[context.dataIndex];
                        return `${book.title}: ${book.sales} units sold`;
                    },
                },
            },
        },
        scales: {
            x: {
                type: 'category' as const,
                title: {
                    display: true,
                    text: 'Tên Sách',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Doanh Thu',
                },
                beginAtZero: true,
                ticks: {
                    stepSize: 20,
                },
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default SalesChart;
