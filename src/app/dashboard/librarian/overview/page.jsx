export const dynamic = 'force-dynamic';
import LibrarianChart from '@/src/Components/LibrarianChart';
import { getData, getPaymentlibrarian } from '@/src/lib/action/api';
import { getUser } from '@/src/lib/userSession';
import React from 'react';
import { CiDeliveryTruck } from 'react-icons/ci';
import { FaDollarSign } from 'react-icons/fa';
import { FiBookOpen } from 'react-icons/fi';




const LibrarianOverview = async () => {
    const user = await getUser();
    const userId = user?.id;


    const MyBooks = await getPaymentlibrarian(userId) || [];
    const totalBooksListed = await getData() || [];

    const PendingDeliveries = MyBooks.filter(book => book?.status === 'pending delivery').length;
    const TotalEarning = MyBooks.reduce((total, book) => total + parseInt(book?.deliveryfee || book?.deliveryFee || 0), 0);
    const totalListedBooks = totalBooksListed.length;

    const monthlyCount = {};

    totalBooksListed.forEach((book) => {
        if (book?.createdAt) {
            try {
                const date = new Date(book.createdAt);
                const monthName = date.toLocaleString('en-US', { month: 'short' });

                if (monthName && monthName !== 'Invalid Date') {
                    monthlyCount[monthName] = (monthlyCount[monthName] || 0) + 1;
                }
            } catch (error) {
                console.error("Error parsing createdAt date:", error);
            }
        }
    });

    const formattedChartData = Object.keys(monthlyCount).map((month) => ({
        month: month,
        books: monthlyCount[month]
    }));

    return (
        <div className="container mx-auto p-4 md:p-8 flex flex-col gap-6 min-h-screen bg-base-200">
            <div>
                <h1 className="text-3xl font-bold text-neutral-800">Librarian Overview</h1>
                <p className="text-gray-500">Welcome to your dashboard! Here you can manage your reading activities.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white shadow rounded-lg px-2 py-3 mb-4 flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center mb-4 bg-gray-100 rounded-lg w-16 h-16">
                        <FiBookOpen className="text-4xl text-blue-600 mb-2" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">Total Books Listed</h2>
                    <p className="text-2xl font-bold text-blue-600">{totalListedBooks}</p>
                </div>
                <div className="bg-white shadow rounded-lg p-4 mb-4 flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center mb-4 bg-gray-100 rounded-lg w-16 h-16">
                        <CiDeliveryTruck className="text-4xl text-yellow-600 mb-2" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">Pending Requests</h2>
                    <p className="text-2xl font-bold text-yellow-600">{PendingDeliveries}</p>
                </div>
                <div className="bg-white shadow rounded-lg p-4 mb-4 flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center mb-4 bg-gray-100 rounded-lg w-16 h-16">
                        <FaDollarSign className="text-4xl text-green-600 mb-2" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">Total Earning</h2>
                    <p className="text-2xl font-bold text-green-600">${TotalEarning}</p>
                </div>
            </div>

            <div className="mt-4 max-w-4xl">
                <LibrarianChart data={formattedChartData} />
            </div>
        </div>
    );
};

export default LibrarianOverview;