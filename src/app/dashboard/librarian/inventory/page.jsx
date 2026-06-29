 'use client';
import React, { useEffect, useState } from 'react';
import { Table, Tooltip } from "@heroui/react";
import { MdDelete, MdEdit, MdEditOff } from 'react-icons/md';
import { getData } from '@/src/lib/action/api';
import { Button } from '@heroui/react';


const ManageInventoryPage =  () => {
    const [allBooks, setAllBooks] = useState([]);

    useEffect(() => {
        const fetchAllBooks = async () => {
            const books = await getData();
            setAllBooks(books);
        };
        fetchAllBooks();
    }, []);

    console.log("All books for the current librarian:", allBooks);

    const handleDeleteData = async (bookId) => {
        // Implementation for deleting data
        const confirmed = window.confirm("Are you sure you want to delete this book?");
        if (!confirmed) return;
        console.log("Deleting book with ID:", bookId);
        
       const res = await DeleteBook(bookId);
        if (res.success) {
            // Update the state to remove the deleted book
            setAllBooks(prevBooks => prevBooks.filter(book => book._id !== bookId));
        } else {
            console.error("Failed to delete book with ID:", bookId);
        }
    }

    const handleUnpublish = async (bookId) => {
        // Implementation for unpublishing data
        console.log("Unpublishing book with ID:", bookId);
        // i want to change the status of the book to "Unpublished" in the database
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/books/${bookId}/unpublish`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'Unpublished' })
            });
            const data = await res.json();
            console.log("Unpublish response:", data);
            if (!res.ok) {
                throw new Error(`Failed to unpublish book with ID ${bookId}`);
            }
            if(data.success) {
                // Update the state to reflect the unpublished status
                setAllBooks(prevBooks => prevBooks.map(book => 
                    book._id === bookId ? { ...book, status: 'Unpublished' } : book
                ));
            }
        } catch (error) {
            console.error('Error unpublishing book:', error);
        }
    }

    return (
        <div className="p-4 space-y-4">
            <h2 className="text-3xl font-bold text-neutral">Manage Inventory</h2>
            <Table>
                <Table.ScrollContainer>
                    <Table.Content aria-label="Team members" className="min-w-[600px]">
                        <Table.Header>
                            <Table.Column isRowHeader>Book Title</Table.Column>
                            <Table.Column>Category</Table.Column>
                            <Table.Column>Delivery Fee</Table.Column>
                            <Table.Column>Status</Table.Column>
                            <Table.Column>Action</Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {
                                allBooks.map((book, index) => {
                                    return (
                                        <Table.Row key={index}>
                                            <Table.Cell>{book.title}</Table.Cell>
                                            <Table.Cell>{book.category}</Table.Cell>
                                            <Table.Cell>{book.deliveryFee} $</Table.Cell>
                                            <Table.Cell ><div className={`badge badge-soft ${book.status === 'Pending Approval' ? 'badge-primary' : book.status === 'Published' ? 'badge-success' : 'badge-danger'}`}>{book.status}</div></Table.Cell>
                                            <Table.Cell className="flex gap-2">
                                                <button onClick={() => handleDeleteData(book._id)} className="btn btn-ghost bg-danger/10 hover:bg-danger/20 hover:unpublish" >
                                                    <MdDelete className="text-danger" />
                                                </button>
                                                {
                                                    book.status === 'Published' ? (
                                                        <Tooltip 
                                                            delay={100}>
                                                            <Button onClick={() => handleUnpublish(book._id)} className="btn btn-ghost bg-primary/10 hover:bg-primary/20" >
                                                                <MdEditOff />
                                                            </Button>
                                                            <Tooltip.Content>
                                                                <p>Unpublish Book</p>
                                                            </Tooltip.Content>
                                                        </Tooltip>
                                                    ) : null
                                                }
                                                
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

export default ManageInventoryPage;