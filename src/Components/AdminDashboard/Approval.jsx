'use client';
import React, { useState, useEffect } from 'react';
import { Table, Button } from "@heroui/react";
import { MdDelete } from 'react-icons/md';

const Approval = ({ allAdminPendingBooks: initialBooks }) => {
   
    const [pendingBooks, setPendingBooks] = useState(initialBooks || []);

    
    useEffect(() => {
        setPendingBooks(initialBooks || []);
    }, [initialBooks]);

    const handleDeleteData = async (bookId) => {
        if (!confirm("Are you sure you want to reject/delete this book?")) return;

        console.log("Deleting book with ID:", bookId);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/books/${bookId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            console.log("Delete response:", data);

            if (res.ok) {
             
                setPendingBooks(prevBooks => prevBooks.filter(book => book._id !== bookId));
            }
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    const handleApproveData = async (bookId) => {
        console.log("Approving book with ID:", bookId);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/books/${bookId}/approve`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            console.log("Approve response:", data);

            if (res.ok) {
                
                setPendingBooks(prevBooks => prevBooks.filter(book => book._id !== bookId));
            }
        } catch (error) {
            console.error('Error approving book:', error);
        }
    };

    return (
        <div>
            <Table>
                <Table.ScrollContainer>
                    <Table.Content aria-label="Pending Books Approval Table" className="min-w-[600px]">
                        <Table.Header>
                            <Table.Column isRowHeader>Book Title</Table.Column>
                            <Table.Column>Category</Table.Column>
                            <Table.Column>Delivery Fee</Table.Column>
                            <Table.Column>Date Added</Table.Column>
                            <Table.Column>Action</Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {pendingBooks.length === 0 ? (
                               
                                <Table.Row>
                                    <Table.Cell>No pending books available</Table.Cell>
                                    <Table.Cell>-</Table.Cell>
                                    <Table.Cell>-</Table.Cell>
                                    <Table.Cell>-</Table.Cell>
                                    <Table.Cell>-</Table.Cell>
                                </Table.Row>
                            ) : (
                                pendingBooks.map((book, index) => (
                                    <Table.Row key={book._id || index}>
                                        <Table.Cell>{book.title}</Table.Cell>
                                        <Table.Cell>{book.category}</Table.Cell>
                                        <Table.Cell>{book.deliveryFee} $</Table.Cell>
                                        <Table.Cell>
                                            {book.createdAt ? new Date(book.createdAt).toLocaleDateString() : 'N/A'}
                                        </Table.Cell>
                                        <Table.Cell className="flex gap-2 items-center">
                                            <button
                                                onClick={() => handleDeleteData(book._id)}
                                                className="btn btn-ghost bg-danger/10 hover:bg-danger/20 p-2 rounded-lg"
                                            >
                                                <MdDelete className="text-danger" />
                                            </button>
                                            <Button
                                                onClick={() => handleApproveData(book._id)}
                                                color="primary"
                                                size="sm"
                                            >
                                                Approve
                                            </Button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))
                            )}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>
        </div>
    );
};

export default Approval;