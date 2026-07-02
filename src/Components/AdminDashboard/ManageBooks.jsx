'use client';
import React, { useState, useEffect } from 'react';
import { Table,  Button } from "@heroui/react";
import { MdDelete } from 'react-icons/md';
import { DeleteBook } from '@/src/lib/action/api';

const ManageBooks = ({ allBooks: initialBooks }) => {
   
    const [books, setBooks] = useState(initialBooks || []);

    useEffect(() => {
        setBooks(initialBooks || []);
    }, [initialBooks]);

    const handleDeleteData = async (bookId) => {
        if (!confirm("Are you sure you want to delete this book?")) return;

        console.log("Deleting book with ID:", bookId);
        try {
            const res = await DeleteBook(bookId);
            if (res.success) {
             
                setBooks(prevBooks => prevBooks.filter(book => book._id !== bookId));
            } else {
                console.error("Failed to delete book with ID:", bookId);
            }
        } catch (error) {
            console.error("Error deleting book:", error);
        }
    };

    const handleUnpublish = async (data) => {
        
        let { bookId, adminStatus } = data;
        console.log("Unpublishing book with ID:", bookId);

        if (adminStatus === 'approve') adminStatus = 'approved';
        else if (adminStatus === 'approved') adminStatus = 'approve';

        try { 
            const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/books/${bookId}/unpublish?adminStatus=${adminStatus}`;

            const res = await fetch(url, {
                method: 'PATCH', 
                headers: {
                    'Content-Type': 'application/json',
                },
                
            });

            const resData = await res.json(); 
            console.log("Unpublish response:", resData);

            if (!res.ok) {
                throw new Error(`Failed to unpublish book with ID ${bookId}`);
            }

            if (resData.success) {
                setBooks(prevBooks =>
                    prevBooks.map(book =>
                        book._id === bookId ? { ...book, adminStatus: adminStatus } : book
                    )
                );
            }
        } catch (error) {
            console.error('Error unpublishing book:', error);
        }
    };

    return (
        <div>
            <Table>
                <Table.ScrollContainer>
                    <Table.Content aria-label="Manage Books Table" className="min-w-[600px]">
                        <Table.Header>
                            <Table.Column isRowHeader>Book Title</Table.Column>
                            <Table.Column>Author</Table.Column>
                            <Table.Column>Category</Table.Column>
                            <Table.Column>Delivery Fee</Table.Column>
                            <Table.Column>Librarian Id</Table.Column>
                            <Table.Column>Action</Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {
                                books.map((book, index) => {
                                    return (
                                        <Table.Row key={book._id || index}>
                                            <Table.Cell>{book.title}</Table.Cell>
                                            <Table.Cell>{book.author}</Table.Cell>
                                            <Table.Cell>{book.category}</Table.Cell>
                                            <Table.Cell>{book.deliveryFee} $</Table.Cell>
                                            <Table.Cell>{book.librarianId}</Table.Cell>
                                            <Table.Cell className="flex gap-2">
                                                <button
                                                    onClick={() => handleDeleteData(book._id)}
                                                    className="btn btn-ghost bg-danger/10 hover:bg-danger/20"
                                                >
                                                    <MdDelete className="text-danger" />
                                                </button>
                                                
                                            
                                                <Button
                                                    onClick={() => handleUnpublish({ bookId: book._id , adminStatus: book.adminStatus}) }
                                                    className="btn btn-ghost bg-primary/10 hover:bg-primary/20"
                                                >
                                                    
                                                    {book.adminStatus === 'approve' ? 'Publish' : 'Unpublish'}
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

export default ManageBooks;