'use client';
import React from 'react';
import { Table } from "@heroui/react";
import { MdDelete } from 'react-icons/md';
import { Button } from '@heroui/react';


const Approval = ({ allAdminPendingBooks }) => {

    const handleDeleteData = async (bookId) => {

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
                // Update the state to remove the deleted book
                allAdminPendingBooks = allAdminPendingBooks.filter(book => book._id !== bookId);
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
                // Update the state to remove the approved book
                allAdminPendingBooks = allAdminPendingBooks.filter(book => book._id !== bookId);
            }
        } catch (error) {
            console.error('Error approving book:', error);
        }
    };
    return (
        <div>
            <Table>
                <Table.ScrollContainer>
                    <Table.Content aria-label="Team members" className="min-w-[600px]">
                        <Table.Header>
                            <Table.Column isRowHeader>Book Title</Table.Column>
                            <Table.Column>Category</Table.Column>
                            <Table.Column>Delivery Fee</Table.Column>
                            <Table.Column>Date Added</Table.Column>
                            <Table.Column>Action</Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {
                                allAdminPendingBooks.map((book, index) => {
                                    return (
                                        <Table.Row key={index}>
                                            <Table.Cell>{book.title}</Table.Cell>
                                            <Table.Cell>{book.category}</Table.Cell>
                                            <Table.Cell>{book.deliveryFee} $</Table.Cell>
                                            <Table.Cell> {new Date(book.createdAt).toLocaleDateString()} </Table.Cell>
                                            <Table.Cell className="flex gap-2">
                                                <button onClick={() => handleDeleteData(book._id)} className="btn btn-ghost bg-danger/10 hover:bg-danger/20 hover:unpublish" >
                                                    <MdDelete className="text-danger" />
                                                </button>
                                                <Button onClick={() => handleApproveData(book._id)} className="btn btn-primary" >
                                                    Approve
                                                </Button>

                                            </Table.Cell>
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

export default Approval;