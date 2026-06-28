import { getPaymentUser } from '@/src/lib/action/api';
import { Table } from '@heroui/react';
import React from 'react';

const DeliveryHistoryPage = async () => {
    const allHistory = await getPaymentUser();
    console.log("Fetched delivery history from API:", allHistory);
    return (
        <div className='flex flex-col gap-4 container mx-auto min-h-screen'>
            <h2 className="text-2xl font-bold text-neutral">Delivery History</h2>

            {
                allHistory.length === 0 ? <>
                    <div className="bg-white shadow rounded-2xl p-10 text-center border border-gray-100">
                        <p className="text-gray-500 font-medium">No history yet</p>
                    </div>
                </> : <>
                    <Table>
                        <Table.ScrollContainer>
                            <Table.Content aria-label="Team members" className="min-w-[600px]">
                                <Table.Header>
                                    <Table.Column isRowHeader>Book Title</Table.Column>
                                    <Table.Column>Delivery Fee</Table.Column>
                                    <Table.Column>Transaction ID</Table.Column>
                                    <Table.Column>Request Date</Table.Column>
                                    <Table.Column>Status</Table.Column>
                                </Table.Header>
                                <Table.Body>
                                    {
                                        allHistory?.map((book, index) => {
                                            return (
                                                <Table.Row key={index}>
                                                    <Table.Cell>{book.title}</Table.Cell>
                                                    <Table.Cell>{book.deliveryfee || book.deliveryFee} $</Table.Cell>
                                                    <Table.Cell>{book.transactionId}</Table.Cell>
                                                    <Table.Cell>{book.requestDate}</Table.Cell>
                                                    <Table.Cell>
                                                        <div className={`badge ${book.status === 'pending delivery' ? 'badge-primary' : book.status === 'Dispatched' ? 'badge-secondary' : 'badge-success'}`}>
                                                            {book.status}
                                                        </div>
                                                    </Table.Cell>
                                                </Table.Row>
                                            );
                                        })
                                    }
                                </Table.Body>
                            </Table.Content>
                        </Table.ScrollContainer>
                    </Table>
                </>
            }
        </div>
    );
};

export default DeliveryHistoryPage;