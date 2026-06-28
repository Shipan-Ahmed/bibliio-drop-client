import ReadingChart from '@/src/Components/ReadingChart';
import { getPaymentUser } from '@/src/lib/action/api';
import { getUser } from '@/src/lib/userSession';
import React from 'react';
import { CiDeliveryTruck } from 'react-icons/ci';
import { FaDollarSign } from 'react-icons/fa';
import { FiBookOpen } from 'react-icons/fi';

const OverviewPage = async () => {
    const user = await getUser();
    const userId = user?.id;

    const MyBooks = await getPaymentUser(userId);
    const totalBooksRead = MyBooks.filter(book => book.status === 'Delivered').length;
    const PendingDeliveries = MyBooks.filter(book => book.status === 'pending delivery').length;
    const TotalCost = MyBooks.reduce((total, book) => total + parseInt(book.deliveryfee || book.deliveryFee || 0), 0);

    const processedData = {};

    MyBooks.forEach((book) => {
        if (book.status === "Delivered" && book.requestDate) {
            try {
                const date = new Date(book.requestDate);
                const monthName = date.toLocaleString('en-US', { month: 'short' });

                if (monthName && monthName !== 'Invalid Date') {
                    if (!processedData[monthName]) {
                        processedData[monthName] = 0;
                    }
                    processedData[monthName] += 1; 
                }
            } catch (error) {
                console.error("Error parsing date:", error);
            }
        }
    });

    const formattedChartData = Object.keys(processedData).map((month) => ({
        month: month,
        books: processedData[month]
    }));

    const totalReadBooks = MyBooks.filter(book => book.status === "Delivered").length;

    return (
        <div className="container mx-auto p-4 md:p-8 flex flex-col gap-6 min-h-screen bg-base-200">
            <div className=''>
                <h1 className="text-3xl font-bold text-neutral-800">Reader Overview</h1>
                <p className="text-gray-500">Welcome to your dashboard! Here you can manage your reading activities.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white shadow rounded-lg px-2 py-3 mb-4 flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center mb-4 bg-gray-100 rounded-lg w-16 h-16">
                        <FiBookOpen className="text-4xl  text-blue-600 mb-2" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">Total Books Read</h2>
                    <p className="text-2xl font-bold text-blue-600">{totalBooksRead}</p>
                </div>
                <div className="bg-white shadow rounded-lg p-4 mb-4 flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center mb-4 bg-gray-100 rounded-lg w-16 h-16">
                        <CiDeliveryTruck className="text-4xl  text-yellow-600 mb-2" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">Pending Deliveries</h2>
                    <p className="text-2xl font-bold text-yellow-600">{PendingDeliveries}</p>
                </div>
                <div className="bg-white shadow rounded-lg p-4 mb-4 flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center mb-4 bg-gray-100 rounded-lg w-16 h-16">
                        <FaDollarSign className="text-4xl  text-green-600 mb-2" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">Total Spend of Fees</h2>
                    <p className="text-2xl font-bold text-green-600">${TotalCost}</p>
                </div>
            </div>
            <div className="mt-8 max-w-4xl">
                <ReadingChart data={formattedChartData} /> 
            </div>
        </div>
    );
};

export default OverviewPage;