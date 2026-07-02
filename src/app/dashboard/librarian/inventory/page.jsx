export const dynamic = 'force-dynamic';
import { getData } from '@/src/lib/action/api';
import InventoryTable from '@/src/Components/LibraranDashboard/InventoryTable';


const ManageInventoryPage = async  () => {
    const allBooks = await getData();

    console.log("All books for the current librarian:", allBooks);

    

    return (
        <div className="p-4 space-y-4">
            <h2 className="text-3xl font-bold text-neutral">Manage Inventory</h2>

            {
                allBooks.length === 0 ? (
                    <p className="text-gray-500 p-4 bg-white">No books available in the inventory.</p>
                ) : (
                       <InventoryTable allBooks={allBooks}></InventoryTable>
                )
            }
            
        </div>

    );
};

export default ManageInventoryPage;