"use client";
import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

const Revenue: React.FC = () => {
    const [revenue, setRevenue] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    
    useEffect(() => {
        const fetchRevenue = async () => {
            try {
                const response = await axios.get<{ totalRevenue: number }>(`http://localhost:3200/revenue`, {
                    headers: {
                        'Cache-Control': 'no-cache',
                    },
                });
                setRevenue(response.data.totalRevenue);
            } catch (error) {
                const err = error as AxiosError;
                console.error("Error fetching revenue:", err.response ? err.response.data : err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRevenue();
    }, []);
  
    if (loading) {
        return <div>Loading...</div>;
    }
  
    return (
        <div className="bg-white text-gray-800 shadow-md rounded-lg p-4">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <h3 className="font-semibold">Doanh Thu</h3>
                    <p className="text-xl font-bold">${revenue.toFixed(2)}</p>
                </div>
                <div className="ml-4 flex items-center justify-center">
                    <div className="w-12 h-12 flex items-center justify-center border border-[#8280FF] rounded-lg">
                        <i className="fas fa-dollar-sign text-[#8280FF]"></i>
                    </div>
                </div>
            </div>
            <div className="flex items-center mt-2">
                <span className="mr-2">📈</span>
                <p className="text-green-400">Tăng: +N/A % so với hôm qua</p>
            </div>
        </div>
    );
};

export default Revenue;
