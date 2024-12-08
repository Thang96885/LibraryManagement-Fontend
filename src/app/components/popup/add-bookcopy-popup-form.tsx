// src/app/components/popup/add-bookcopy-popup-form.tsx
import { useState } from 'react';
import BookService from '@/app/services/BookService';
import { CreateBookCopyRequest } from '@/app/models/book-model';
import { ApiError } from '@/app/services/BookService';

interface AddBookCopyPopupFormProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    bookId: number;
    bookService: BookService;
    onSuccess?: () => Promise<void>;
}

const isValidISBN = (isbn: string): boolean => {
    isbn = isbn.replace(/[-\s]/g, ''); // Remove hyphens and spaces
    return (isbn.length === 13 && /^\d+$/.test(isbn)) || 
           (isbn.length === 10 && /^[\dX]+$/.test(isbn));
};

export default function AddBookCopyPopupForm({ open, setOpen, bookId, bookService, onSuccess }: AddBookCopyPopupFormProps) {
    const [ibnsList, setIbnsList] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [errors, setErrors] = useState({
        ibns: '',
        price: ''
    });

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if (isNaN(value) || value < 0) {
            setErrors(prev => ({ ...prev, price: 'Price must be a positive number' }));
            setPrice(0);
        } else {
            setErrors(prev => ({ ...prev, price: '' }));
            setPrice(value);
        }
    };

    const handleSubmit = async () => {
        try {
            // Validate inputs
            const newErrors = { ibns: '', price: '' };
            if (!ibnsList.trim()) {
                newErrors.ibns = 'ISBN list is required';
            }
            if (price <= 0) {
                newErrors.price = 'Price must be greater than 0';
            }
    
            // Validate each ISBN
            const isbnCodes = ibnsList
                .split('\n')
                .map(code => code.trim())
                .filter(code => code.length > 0);
    
            const invalidIsbns = isbnCodes.filter(isbn => !isValidISBN(isbn));
            if (invalidIsbns.length > 0) {
                newErrors.ibns = `Invalid ISBN format: ${invalidIsbns.join(', ')}`;
                setErrors(newErrors);
                return;
            }
    
            const result = await bookService.addBookCopyRequest(
                new CreateBookCopyRequest(bookId, isbnCodes, price)
            );
            if (result) {
                alert('Book copies added successfully');
                setOpen(false);
                if (onSuccess) await onSuccess();
            }
        } catch (error: any) {
            if (error && error.status === 400 && error.errorData?.errors) {
                const firstErrorKey = Object.keys(error.errorData.errors)[0];
                setErrors(prev => ({
                    ...prev,
                    ibns: firstErrorKey
                }));
            } else {
                console.error('Error adding book copies:', error);
                setErrors(prev => ({
                    ...prev,
                    ibns: 'Failed to add book copies'
                }));
            }
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                        Add Book Copies
                    </h3>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ISBN List (one per line)
                            </label>
                            <textarea
                                value={ibnsList}
                                onChange={(e) => setIbnsList(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows={5}
                                placeholder="Enter ISBN codes, one per line"
                            />
                            {errors.ibns && (
                                <p className="text-red-500 text-sm mt-1">{errors.ibns}</p>
                            )}
                        </div>

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
                            {errors.price && (
                                <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                            )}
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
                                Add Copies
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
