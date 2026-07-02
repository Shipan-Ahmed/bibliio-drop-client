export const dynamic = 'force-dynamic';
import ManageBooks from '@/src/Components/AdminDashboard/ManageBooks';
import { getAllBooks } from '@/src/lib/action/api';



const ManageAllBookPage = async  () => {
    
    const allBooks = await getAllBooks() || []

    console.log("All books for the current librarian:", allBooks);

   

    return (
        <div className="p-4 space-y-4">
            <h2 className="text-3xl font-bold text-neutral">Manage All Books</h2>
            {
                allBooks.length === 0 ? (
                    <p className="text-gray-500">No books found.</p>
                ) : (
                    <ManageBooks allBooks={allBooks} />
                )
             }
        </div>

    );
};

export default ManageAllBookPage;