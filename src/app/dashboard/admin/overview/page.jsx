export const dynamic = 'force-dynamic';
import LibrarianChart from '@/src/Components/LibrarianChart';
import CategoryPieChart from '@/src/Components/CategoryPieChart'; // 👈 নতুন পাই চার্টটি ইম্পোর্ট করুন
import { getAllBooks, getAllUser } from '@/src/lib/action/api';
import { getUser } from '@/src/lib/userSession';
import React from 'react';
import { CiDeliveryTruck } from 'react-icons/ci';
import { FaBook, FaDollarSign, FaUserAlt } from 'react-icons/fa';

const AdminOverview = async () => {
    const user = await getUser();
    const userId = user?.id;

    const AllUsers = await getAllUser() || [];
    console.log("all users: ", AllUsers);

    const AllBooks = await getAllBooks() || [];
    console.log("all books: ", AllBooks);

    const TotalDeliveredBooks = AllBooks.filter(book => book.status === 'Delivered').length;
    const TotalEarning = AllBooks.reduce((total, book) => total + parseInt(book.deliveryfee || book.deliveryFee || 0), 0);

  
    const categoryCounts = AllBooks.reduce((acc, book) => {
        const category = book.category || "Unknown";
        acc[category] = (acc[category] || 0) + 1;
        return acc;
    }, {});

 
    const pieChartData = Object.keys(categoryCounts).map(category => ({
        name: category,
        value: categoryCounts[category]
    }));

    return (
        <div className="container mx-auto p-4 md:p-8 flex flex-col gap-6 min-h-screen bg-base-200">
            <div>
                <h1 className="text-3xl font-bold text-neutral-800">Admin Overview</h1>
                <p className="text-gray-500">Welcome to your dashboard! Here you can manage your administrative activities.</p>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white shadow rounded-lg px-2 py-3 flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center mb-4 bg-gray-100 rounded-lg w-16 h-16">
                        <FaUserAlt className="text-4xl text-blue-600 mb-2" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">Total Users</h2>
                    <p className="text-2xl font-bold text-blue-600">{AllUsers.length}</p>
                </div>

                <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center mb-4 bg-gray-100 rounded-lg w-16 h-16">
                        <FaBook className="text-4xl text-purple-600 mb-2" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">Total Books</h2>
                    <p className="text-2xl font-bold text-purple-600">{AllBooks.length}</p>
                </div>

                <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center mb-4 bg-gray-100 rounded-lg w-16 h-16">
                        <CiDeliveryTruck className="text-4xl text-yellow-600 mb-2" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">Delivered Books</h2>
                    <p className="text-2xl font-bold text-yellow-600">{TotalDeliveredBooks}</p>
                </div>

                <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center mb-4 bg-gray-100 rounded-lg w-16 h-16">
                        <FaDollarSign className="text-4xl text-green- green-600 mb-2" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">Total Revenue</h2>
                    <p className="text-2xl font-bold text-green-600">${TotalEarning}</p>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                <CategoryPieChart data={pieChartData} />
            </div>
        </div>
    );
};

export default AdminOverview;