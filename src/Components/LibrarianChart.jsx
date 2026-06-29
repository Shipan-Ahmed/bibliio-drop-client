'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const LibrarianChart = ({ data }) => {
    const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const chartData = allMonths.map(monthName => {
        const found = data?.find(d => d.month === monthName);
        return {
            name: monthName,
            books: found ? found.books : 0
        };
    });

    return (
        <div className="w-full bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-1">Books Added Analytics</h3>
            <p className="text-gray-400 text-sm mb-6">Number of books added to inventory month by month</p>

            <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                        <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} />
                        <YAxis stroke="#9ca3af" fontSize={12} allowDecimals={false} tickLine={false} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                            cursor={{ fill: '#f3f4f6', opacity: 0.4 }}
                        />
                        <Legend />
                        <Bar
                            name="Books Listed"
                            dataKey="books"
                            fill="#2563eb" 
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default LibrarianChart;