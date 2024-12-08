import { useState, useEffect } from 'react';
import { BookCopyDto, BookStatus, BookPhysicalCondition, UpdateBookCopyRequest } from "@/app/models/book-model";
import BookService from "@/app/services/BookService";

interface EditBookCopyPopupFormProps {
    bookId: number;
    open: boolean;
    bookCopy: BookCopyDto;
    bookService: BookService;
    setOpen: (open: boolean) => void;
}

export default function EditBookCopyPopupForm({ open, bookCopy, bookService, setOpen, bookId }: EditBookCopyPopupFormProps) {
    const [status, setStatus] = useState<BookStatus>(BookStatus.None);
    const [condition, setCondition] = useState<BookPhysicalCondition>(BookPhysicalCondition.None);
    const [price, setPrice] = useState<number>(0);
    const [priceError, setPriceError] = useState<string>("");

    // Reset form when bookCopy changes
    useEffect(() => {
        if (bookCopy) {
            setStatus(bookCopy.status as BookStatus);
            setCondition(bookCopy.bookPhysicalCondition as BookPhysicalCondition);
            setPrice(bookCopy.price);
        }
    }, [bookCopy]); // Changed dependency from [open, bookCopy] to just [bookCopy]

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if (isNaN(value) || value < 0) {
            setPriceError("Price must be a positive number");
            setPrice(0);
        } else {
            setPriceError("");
            setPrice(value);
        }
    };

    const handleSubmit = async () => {
        try {
            if (priceError) {
                alert('Please fix price errors before submitting');
                return;
            }
            
            const result = await bookService.updateBookCopy(
                new UpdateBookCopyRequest(bookId, bookCopy.ibns, status, price, condition)
            );
            if (result) {
                alert('Book copy updated successfully');
                setOpen(true); // Pass true to indicate success
            } else {
                alert('Failed to update book copy');
                setOpen(false); // Pass false to indicate failure
            }
        } catch (error) {
            console.error('Error updating book copy:', error);
            alert('Error updating book copy');
            setOpen(false);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                        Edit Book Copy
                    </h3>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Price ($)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={price}
                                onChange={handlePriceChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {priceError && (
                                <p className="text-red-500 text-sm mt-1">{priceError}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Status
                            </label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value as BookStatus)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {Object.values(BookStatus)
                                    .filter(status => status !== BookStatus.None)
                                    .map(status => (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Physical Condition
                            </label>
                            <select
                                value={condition}
                                onChange={(e) => setCondition(e.target.value as BookPhysicalCondition)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {Object.values(BookPhysicalCondition)
                                    .filter(condition => condition !== BookPhysicalCondition.None)
                                    .map(condition => (
                                        <option key={condition} value={condition}>
                                            {condition}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
