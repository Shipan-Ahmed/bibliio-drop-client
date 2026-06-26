 'use client';
import React, { useEffect, useState } from 'react';
import { Table } from "@heroui/react";
import { MdDelete, MdEdit } from 'react-icons/md';
import { getData } from '@/src/lib/action/api';


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
        
        try {
            const res = await fetch(`http://localhost:3002/api/books/${bookId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            console.log("Delete response:", data);
            if (!res.ok) {
                throw new Error(`Failed to delete book with ID ${bookId}`);
            }
            if(data.success) {
                // Update the state to remove the deleted book from the list
                setAllBooks(prevBooks => prevBooks.filter(book => book._id !== bookId));
            }
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    }

    // const handleEditData = (bookId) => {
    //     // Implementation for editing data
    //     console.log("Editing book with ID:", bookId);
    //     // You can navigate to an edit page or open a modal for editing
    //     // Example: router.push(`/edit-book/${bookId}`);
       
    // }

    return (
        <div className="p-4 space-y-4">
            <h2 className="text-xl font-bold text-neutral">Manage Inventory</h2>
            <Table>
                <Table.ScrollContainer>
                    <Table.Content aria-label="Team members" className="min-w-[600px]">
                        <Table.Header>
                            <Table.Column isRowHeader>Book Title</Table.Column>
                            <Table.Column>Category</Table.Column>
                            <Table.Column>Delivery Fee</Table.Column>
                            <Table.Column>Status</Table.Column>
                            <Table.Column>Edit</Table.Column>
                            <Table.Column>Delete</Table.Column>
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
                                            <Table.Cell>
                                                <button className="btn btn-ghost bg-gray-100 hover:bg-gray-200">
                                                    <MdEdit className="text-primary" />
                                                </button>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <button onClick={() => handleDeleteData(book._id)} className="btn btn-ghost bg-danger/10 hover:bg-danger/20">
                                                    <MdDelete className="text-danger" />
                                                </button>
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