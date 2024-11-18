// admin/thong-ke/page.tsx
import React from 'react';
import AdminStats from '../component/AdminStats';
import CustomerStats from '../component/CustomerStats';
import SalesChart from '../component/SalesChart';
import Orders from '../component/Orders';
import Revenue from '../component/Revenue';

const ThongKePage: React.FC = () => {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Thống Kê</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <AdminStats />
                <CustomerStats />
                <Orders />
                <Revenue />
            </div>
            <div className="mt-6">
                <SalesChart />
            </div>
        </div>
    );
};

export default ThongKePage;
