import { getAllPaymentData } from '@/src/lib/action/api';
import React from 'react';
import { Table} from "@heroui/react";

const TransactionPage = async () => {
    const AllTransactions = await getAllPaymentData() || [];
    console.log("Fetched transactions from API:", AllTransactions)
    return (
        <div className='min-h-screen container mx-auto'>
            <h1 className='text-3xl font-bold  my-4'>All Transactions</h1>
            <div className='overflow-x-auto'>
                {AllTransactions.length === 0 ? (
                    <p className="text-gray-500">No transactions found.</p>
                ) : (
                    <Table>
                        <Table.ScrollContainer>
                            <Table.Content aria-label="Team members" className="min-w-[600px]">
                                <Table.Header>
                                    <Table.Column isRowHeader>Transaction ID</Table.Column>
                                    <Table.Column >Book Title</Table.Column>
                                    <Table.Column>User Name</Table.Column>
                                    
                                        <Table.Column>Librarian ID</Table.Column>
                                        <Table.Column>Delivery Fee</Table.Column>
                                    <Table.Column>Date</Table.Column>
                                </Table.Header>
                                <Table.Body>
                                    {
                                        AllTransactions.map((transaction, index) => {
                                            return (
                                                <Table.Row key={index}>
                                                    <Table.Cell>{transaction.transactionId}</Table.Cell>
                                                    <Table.Cell>{transaction.title}</Table.Cell>
                                                    <Table.Cell>{transaction.userName}</Table.Cell>
                                                    <Table.Cell>{transaction.librarianId}</Table.Cell>
                                                    <Table.Cell>{transaction.deliveryfee} $</Table.Cell>
                                                
                                                    <Table.Cell >
                                                        {transaction.requestDate}

                                                    </Table.Cell>
                                                </Table.Row>
                                            );
                                        })
                                    }


                                </Table.Body>
                            </Table.Content>
                        </Table.ScrollContainer>
                    </Table>
                )}
            </div>

        </div>
    );
};

export default TransactionPage;