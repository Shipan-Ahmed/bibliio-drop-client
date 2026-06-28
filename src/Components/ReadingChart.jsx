'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const ReadingChart = ({ data }) => {
    const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const chartData = allMonths.map(monthName => {
        const found = data?.find(d => d.month === monthName);
        return {
            name: monthName,
            books: found ? found.books : 0
        };
    });

    return (
        <div className="w-full bg-white shadow-md border border-gray-100 rounded-2xl p-6 mt-6">
            <h3 className="text-xl font-bold text-neutral-800 mb-1">Reading Analytics</h3>
            <p className="text-gray-400 text-sm mb-6">Total books read month by month</p>

            <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 10, right: 30, left: -20, bottom: 0 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                        <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} />
                        <YAxis stroke="#9ca3af" fontSize={12} allowDecimals={false} tickLine={false} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb' }}
                            cursor={{ fill: '#f3f4f6', opacity: 0.4 }}
                        />
                        <Legend wrapperStyle={{ paddingTop: '10px' }} />
                        <Bar
                            name="Books Read"
                            dataKey="books"
                            fill="#4f46e5"  
                            radius={[6, 6, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ReadingChart;