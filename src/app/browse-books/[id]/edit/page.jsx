import { getBookDetails } from '@/src/lib/action/api';
import { getUser } from '@/src/lib/userSession';
import { redirect } from 'next/navigation';
import { Button } from '@heroui/react';
import { updateBookAction } from '@/src/lib/action/bookActions'; // সার্ভার অ্যাকশন (ধাপ ৩ এ তৈরি করব)

const EditBookPage = async ({ params }) => {
    const user = await getUser();
    const userId = user?.id;

    const { id } = await params || {};
    const book = await getBookDetails(id);

    if (!book) {
        return <div className="text-center p-10 text-red-500">Book not found!</div>;
    }

    // সিকিউরিটি চেক: লগইন করা ইউজারই কি এই বইয়ের লাইব্রেরিয়ান? না হলে ফেরত পাঠিয়ে দিন।
    if (book.librarianId !== userId) {
        return redirect(`/browse-books/${id}`);
    }

    return (
        <div className="min-h-screen max-w-xl mx-auto p-6 bg-white shadow-md rounded-2xl my-10">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Edit Book Details</h1>

            {/* ফর্ম অ্যাকশনে আমরা ধাপ ৩-এর সার্ভার অ্যাকশনটি ব্যবহার করব */}
            <form action={updateBookAction} className="space-y-4">
                {/* হিডেন ফিল্ড আকারে বইয়ের আইডি পাস করা হচ্ছে */}
                <input type="hidden" name="id" value={id} />

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Book Title</label>
                    <input
                        type="text"
                        name="title"
                        defaultValue={book.title}
                        className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:border-primary"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                    <input
                        type="text"
                        name="author"
                        defaultValue={book.author}
                        className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:border-primary"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <input
                        type="text"
                        name="category"
                        defaultValue={book.category}
                        className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:border-primary"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Fee ($)</label>
                    <input
                        type="number"
                        step="0.01"
                        name="deliveryFee"
                        defaultValue={book.deliveryFee}
                        className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:border-primary"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        name="description"
                        defaultValue={book.description}
                        rows="4"
                        className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:border-primary"
                        required
                    ></textarea>
                </div>

                <div className="flex gap-4 pt-4">
                    <Button type="submit" color="primary" className="flex-1 font-bold">
                        Update Book
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default EditBookPage;