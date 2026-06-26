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

    const handleDeleteData = () => {
        " "
    }

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
                                                <button onClick={handleDeleteData} className="btn btn-ghost bg-danger/10 hover:bg-danger/20">
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