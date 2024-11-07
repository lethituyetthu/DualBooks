"use client";
import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Admin } from '../models/Admins';

const AdminStats: React.FC = () => {
    const [admins, setAdmins] = useState<Admin[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    
    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const response = await axios.get<{ data: Admin[] }>(`http://localhost:3200/admins`, {
                    headers: {
                        'Cache-Control': 'no-cache',
                    },
                });
                setAdmins(response.data.data);
            } catch (error) {
                const err = error as AxiosError;
                console.error("Error fetching admins:", err.response ? err.response.data : err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAdmins();
    }, []);
  
    if (loading) {
        return <div>Loading...</div>;
    }
  
    return (
        <div className="bg-white text-gray-800 shadow-md rounded-lg p-4">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <h3 className="font-semibold">Nhân Viên</h3>
                    <p className="text-xl font-bold">{admins.length}</p>
                </div>
                <div className="ml-4 flex items-center justify-center">
                    <div className="w-12 h-12 flex items-center justify-center border border-[#8280FF] rounded-lg">
                        <i className="fas fa-user-shield text-[#8280FF]"></i>
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

export default AdminStats;
