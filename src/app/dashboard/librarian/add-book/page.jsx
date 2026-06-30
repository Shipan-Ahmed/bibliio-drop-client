"use client";

import { useState, useRef } from "react";
import { Button, Form, Input, Label, TextField, ListBox, Select, TextArea } from "@heroui/react";
import { BiCheck, BiCloudUpload, BiBook, BiDollar, BiCategory } from "react-icons/bi";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSession } from "@/src/lib/auth-client";

export default function ProfessionalAddBook() {

    const { data, isPending } = useSession();
    const userId = data?.user?.id; // Fallback to null if user ID is not available
    console.log("Current user ID:", userId);

    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    // Added a state to correctly capture HeroUI Select data
    const [selectedCategory, setSelectedCategory] = useState("");
    const fileInputRef = useRef(null); // Reference to programmatically trigger or clear the input

    // Handle local UI preview when user selects an image file
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleFormReset = () => {
        setImagePreview(null);
        setSelectedCategory(""); // Reset category state
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Explicitly clear native file data
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData(e.target);
            const userData = Object.fromEntries(formData.entries());
            console.log("Raw form data entries:", userData);

            const imageFile = formData.get("coverImage");
            console.log("image file: ", imageFile);

            // 1. Upload to imgBB
            let coverImageUrl = "";
            if (imageFile && imageFile.size > 0) {
                const imgData = new FormData();
                imgData.append("image", imageFile);

                const imgbbApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
                const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
                    method: "POST",
                    body: imgData,
                });

                const resData = await response.json();
                if (resData.success) {
                    coverImageUrl = resData.data.url;
                } else {
                    throw new Error("Cloud image host rejected upload.");
                }
            } else {
                throw new Error("Please select a cover image file.");
            }

            console.log("Uploaded cover image URL:", coverImageUrl);

            // 2. Map Clean Object Schema (Fixed: Using selectedCategory state)
            const bookPayload = {
                title: userData.title,
                author: userData.author,
                description: userData.description,
                category: selectedCategory, // Injected the tracked category state directly
                deliveryFee: parseFloat(userData.deliveryFee) || 0,
                quantity:  1,
                coverImage: coverImageUrl,
                status: "Pending Approval",
                librarianId: userId,
                availability: true,
                createdAt: new Date().toISOString(),
                adminStatus: "pending"
            };

            console.log("Submitting structured payload:", bookPayload);

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/books`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(bookPayload)
            });

            const responseData = await res.json();
            console.log("Server response:", responseData);

            if (!res.ok) {
                throw new Error(responseData.message || "Failed to submit book data.");
            }

            if (responseData.bookId) {
                toast.success("Success! Book submitted into the admin verification pipeline.");
                e.target.reset();
                handleFormReset(); // Clears image preview state, category state, and input buffer safely
            } else {
                throw new Error("Server processed the request but did not return a valid Book ID.");
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto py-4">
            <div className="mb-6 bg-white p-6 my-10">
                <h2 className="text-3xl font-bold text-neutral font-heading">Add New Book</h2>
                <p className="text-sm text-gray-500">Fill in the details below to add a new book to your inventory. All fields are required.</p>
            </div>

            {/* Main Structural Form Layout Split */}
            <div className="border border-gray-100 rounded-2xl shadow-sm bg-white p-6">
                <Form className="grid grid-cols-1 lg:grid-cols-3 gap-8" onSubmit={onSubmit} onReset={handleFormReset}>

                    {/* Core Inputs Block */}
                    <div className="lg:col-span-2 space-y-6 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="border-b border-gray-100 pb-3">
                            <h2 className="text-lg font-bold text-neutral font-heading flex items-center gap-2">
                                <BiBook className="text-primary" size={20} />
                                Book Particulars
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <TextField name="title" type="text" isRequired className="w-full">
                                <Label className="text-xs font-semibold uppercase tracking-wider text-neutral/60 mb-1">Book Title</Label>
                                <Input placeholder="e.g., Fundamentals of Algorithms" />
                            </TextField>

                            <TextField name="author" type="text" isRequired className="w-full">
                                <Label className="text-xs font-semibold uppercase tracking-wider text-neutral/60 mb-1">Author Name</Label>
                                <Input placeholder="e.g., Thomas H. Cormen" />
                            </TextField>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1 w-full">
                                <Label className="text-xs font-semibold uppercase tracking-wider text-neutral/60">Category</Label>
                                {/* Added selectedKey and onSelectionChange listeners to track updates */}
                                <Select
                                    name="category"
                                    placeholder="Assign standard classification"
                                    isRequired
                                    className="w-full"
                                    selectedKey={selectedCategory}
                                    onSelectionChange={(key) => setSelectedCategory(key)}
                                >
                                    <Select.Trigger><Select.Value /><Select.Indicator /></Select.Trigger>
                                    <Select.Popover>
                                        <ListBox>
                                            <ListBox.Item id="ScienceFiction">Science Fiction</ListBox.Item>
                                            <ListBox.Item id="Fantasy">Fantasy</ListBox.Item>
                                            <ListBox.Item id="Mystery">Mystery & Thriller</ListBox.Item>
                                            <ListBox.Item id="History">Historical Fiction</ListBox.Item>
                                            <ListBox.Item id="Romance">Romance</ListBox.Item>
                                            <ListBox.Item id="NonFiction">Non Fiction</ListBox.Item>
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                            </div>

                          
                        </div>

                        <div className="flex flex-col gap-1 w-full">
                            <Label className="text-xs font-semibold uppercase tracking-wider text-neutral/60">Description</Label>
                            <TextArea
                                name="description"
                                placeholder="Provide a comprehensive narrative overview, condition markers, or key chapters to capture reader interest..."
                                className="w-full min-h-[120px]"
                               
                            />
                        </div>
                    </div>

                    {/* Media Assets & Submission Controls */}
                    <div className="space-y-6 flex flex-col justify-between">

                        {/* Cover Media Dropzone Box */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 flex-1">
                            <div className="border-b border-gray-100 pb-3">
                                <h2 className="text-sm font-bold text-neutral font-heading flex items-center gap-2">
                                    <BiCategory className="text-primary" size={18} />
                                    Cover Image Upload
                                </h2>
                            </div>

                            <div className="relative border-2 border-dashed border-gray-200 hover:border-primary/50 transition-colors rounded-xl p-4 flex flex-col items-center justify-center text-center bg-gray-50/50 min-h-[220px]">

                                <input
                                    ref={fileInputRef}
                                    id="coverImageInput"
                                    type="file"
                                    name="coverImage"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />

                                {imagePreview ? (
                                    <div className="absolute inset-2 rounded-lg overflow-hidden group">
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <label htmlFor="coverImageInput" className="cursor-pointer text-white text-xs bg-white/20 px-3 py-1.5 rounded-md backdrop-blur-sm hover:bg-white/30 transition-all">
                                                Change File
                                            </label>
                                        </div>
                                    </div>
                                ) : (
                                    <label htmlFor="coverImageInput" className="cursor-pointer flex flex-col items-center justify-center w-full h-full p-4">
                                        <BiCloudUpload className="text-neutral/30 mb-2" size={36} />
                                        <span className="text-xs font-medium text-neutral/70">Click or drag image file here</span>
                                        <span className="text-[10px] text-neutral/40 mt-1">Accepts PNG, JPG, JPEG formats</span>
                                    </label>
                                )}
                            </div>
                        </div>

                        {/* Pricing & Submission Action Box */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                            <TextField name="deliveryFee" type="number" isRequired className="w-full">
                                <Label className="text-xs font-semibold uppercase tracking-wider text-neutral/60 mb-1 flex items-center gap-1">
                                    <BiDollar size={14} /> Delivery Fee ($)
                                </Label>
                                <Input placeholder="0.00" min="0" step="0.01" />
                            </TextField>

                            <div className="flex gap-3 w-full pt-2">
                                <Button type="reset" variant="flat" className="flex-1 rounded-xl font-medium text-sm" isDisabled={loading}>
                                    Clear Form
                                </Button>
                                <Button type="submit" color="primary" className="flex-1 rounded-xl font-bold text-sm bg-primary text-white shadow-sm" isDisabled={loading}>
                                    {loading ? (
                                        <>
                                            <Loader2 className="size-4 animate-spin" />
                                            <span>Publishing...</span>
                                        </>
                                    ) : (
                                        <>
                                            <BiCheck size={18} />
                                            <span>Publish Book</span>
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>

                    </div>

                </Form>
            </div>
        </div>
    );
}