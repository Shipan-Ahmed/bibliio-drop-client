export const dynamic = 'force-dynamic';
import Approval from '@/src/Components/AdminDashboard/Approval';


const ApprovalQueue = async () => {
    
    // const allAdminPendingBooks = await getAllAdminPendingBooks() || [];
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/pending-books`, {
        cache: 'no-store', // Ensure fresh data on each request
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const allAdminPendingBooks = await res.json();

    console.log("All pending books for admin approval:", allAdminPendingBooks);

  
    return (
        <div className="container mx-auto p-4 md:p-8 flex flex-col gap-6 min-h-screen bg-base-200">
            <h1 className="text-3xl font-bold text-neutral-800">Approval Queue</h1>
            <div>
                {allAdminPendingBooks.length === 0 ? (
                    <p className="text-gray-500">No pending books for approval.</p>
                ) : (
                        <Approval allAdminPendingBooks={allAdminPendingBooks} />
                   
                )}
            </div>
        </div>
    );
};

export default ApprovalQueue;