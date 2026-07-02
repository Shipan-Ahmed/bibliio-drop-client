export const dynamic = 'force-dynamic';
import { getPaymentUser } from '@/src/lib/action/api';
import React from 'react';
import { FiBookOpen } from 'react-icons/fi';

const MyReadingPage = async () => {
    const allHistory = await getPaymentUser();
    console.log("Fetched delivery history from API:", allHistory);
    const ReceivedBooks = allHistory.filter(book => book.status === 'Delivered');
    return (
        <div className='flex flex-col gap-4 container mx-auto min-h-screen'>
            <h2 className="text-3xl font-bold ">My Reading List</h2>
            <p className="text-gray-600 ">Here are the books I've received</p>
            {
                ReceivedBooks.length === 0 ? <>
                    <div className="bg-white shadow rounded-2xl p-10 text-center border border-gray-100 mt-20 ">
                        <p className="text-gray-500 font-medium">No history yet</p>
                    </div>
                </> : <>
                    <div className="overflow-x-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        {
                              ReceivedBooks?.map((book, index) => {
                                return (
                                    <div key={index} className="bg-white border border-gray-200 shadow rounded-lg p-4 mb-4 flex flex-col items-center justify-center"> 
                                        <div className="flex items-center justify-center mb-4">
                                            <FiBookOpen className="text-4xl text-gray-500 mb-2" />
                                        </div>
                                        <h3 className="text-2xl font-semibold">{book.title}</h3>
                                        <p className="text-gray-600">Delivery Status: {book.status}</p>
                                    </div>   
                                );
                              })
                        }
                    </div>
                </>
            }
        </div>
    );
};

export default MyReadingPage;