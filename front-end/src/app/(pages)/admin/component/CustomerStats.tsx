"use client";
import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Customer } from '../models/Customer';

const CustomerStats: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    
    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get<Customer[]>('http://localhost:3200/customers');
                setCustomers(response.data);
            } catch (error) {
                const err = error as AxiosError;
                console.error("Error fetching customers:", err.response ? err.response.data : err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, []);
  
    if (loading) {
        return <div>Loading...</div>;
    }
  
    return (
        <div className="bg-white text-gray-800 shadow-md rounded-lg p-4">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <h3 className="font-semibold">Khách Hàng</h3>
                    <p className="text-xl font-bold">{customers.length}</p>
                </div>
                <div className="ml-4 flex items-center justify-center">
                    <div className="w-12 h-12 flex items-center justify-center border border-[#8280FF] rounded-lg">
                        <i className="fas fa-user text-[#8280FF]"></i>
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

export default CustomerStats;
