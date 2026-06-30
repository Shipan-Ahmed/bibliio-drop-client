'use client';
import React from 'react';
import { Table, Button } from "@heroui/react";


const DeliveryTable = ( {allDeliveries}) => {

    const handleStatus = async (data) => {
        // Implementation for changing the status of the book
        const { bookId, status } = data;
        if (status === 'Delivered') return; // If already delivered, do nothing
        console.log("Changing status for book ID:", bookId, "Current status:", status);
        const newStatus = status === 'pending delivery' ? 'Dispatched' : 'Delivered';

        try {

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/deliveries/${bookId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus })
            });
            if (res.ok) {
                console.log("Status changed successfully for book ID:", bookId, "New status:", newStatus);
                // Update the state to reflect the new status
                allDeliveries = allDeliveries.map(delivery => 
                    delivery.bookId === bookId ? { ...delivery, status: newStatus } : delivery
                );
            } else {
                console.error("Failed to change status for book ID:", bookId);
            }

        } catch (error) {
            console.error("Error changing status:", error);
        }
    };

    return (
        <div>
            <Table>
                <Table.ScrollContainer>
                    <Table.Content aria-label="Team members" className="min-w-[600px]">
                        <Table.Header>
                            <Table.Column isRowHeader>Book Title</Table.Column>
                            <Table.Column>Client Name</Table.Column>
                            <Table.Column>Delivery Fee</Table.Column>
                            <Table.Column>Date</Table.Column>
                            <Table.Column>Status</Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {
                                allDeliveries.map((book, index) => {
                                    return (
                                        <Table.Row key={index}>
                                            <Table.Cell>{book.title}</Table.Cell>
                                            <Table.Cell>{book.userName}</Table.Cell>
                                            <Table.Cell>{book.deliveryfee} $</Table.Cell>
                                            <Table.Cell>{book.requestDate}</Table.Cell>

                                            <Table.Cell ><Button disabled={book.status === 'Delivered'} onClick={() => handleStatus({ bookId: book.bookId || book._id, status: book.status })} className={`badge badge-soft ${book.status === 'pending delivery' ? 'badge-primary' : book.status === 'Delivered' ? 'badge-success' : 'badge-danger'}`}>{book.status}</Button></Table.Cell>
                                        </Table.Row>
                                    );
                                })
                            }


                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>
        </div>
    );
};

export default DeliveryTable;