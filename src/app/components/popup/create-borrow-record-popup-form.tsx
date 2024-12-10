// src/app/components/popup/create-borrow-record-popup-form.tsx
import { useState, useEffect } from 'react';
import { CreateBorrowRecordRequest, BorrowRecordBookInfo } from '@/app/models/borrow-record-model';
import { PatronService } from '@/app/services/PatronService';
import BookService from '@/app/services/BookService';
import { ListPatronRecord } from '@/app/models/patron-model';
import { ListBookRecord, BookCopyDto, ListBookQuery, BookRecord, GetBookResult } from '@/app/models/book-model';

interface CreateBorrowRecordPopupFormProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    patronService: PatronService;
    bookService: BookService;
    onCreate: (request: CreateBorrowRecordRequest) => void;
}

export default function CreateBorrowRecordPopupForm({ open, setOpen, patronService, bookService, onCreate }: CreateBorrowRecordPopupFormProps) {
    const [patrons, setPatrons] = useState<ListPatronRecord[]>([]);
    const [books, setBooks] = useState<BookRecord[]>([]);
    const [bookCopies, setBookCopies] = useState<GetBookResult>(null);
    const [patronId, setPatronId] = useState<number>(0);
    const [dueDate, setDueDate] = useState<string>('');
    const [bookId, setBookId] = useState<number>(0);
    const [bookCopyId, setBookCopyId] = useState<string>('');
    const [selectedBookCopyIds, setSelectedBookCopyIds] = useState<string[]>([]);

    useEffect(() => {
        const fetchPatrons = async () => {
            try {
                const result = await patronService.ListPatron({ page: 1, pageSize: 1000, searchId: 0, searchPatronName: '', searchEmail: '' });
                setPatrons(result.records);
            } catch (error) {
                console.error('Failed to fetch patrons:', error);
            }
        };

        bookService.getBooks({
            page: 1,
            pageSize: 1000,
            bookId: 0,
            authorId: 0,
            bookTitle: '',
            locationId: 0,
            isAvailable: true,
            genreIds:  [],
            yearPublicationId: 0
        }).then((data) => {
            setBooks(data.books);
        });

        fetchPatrons();
    }, [patronService, bookService]);

    useEffect(() => {
        const fetchBookCopies = async () => {
            if (bookId > 0) {
                try {
                    const result = await bookService.getBook(bookId);
                    result.bookCopyList = result.bookCopyList.filter((copy: BookCopyDto) => copy.status === 'Available');
                    setBookCopies(result);
                    console.log(bookCopies);
                } catch (error) {
                    console.error('Failed to fetch book copies:', error);
                }
            }
        };

        fetchBookCopies();
        console.log(bookCopies);
    }, [bookId, bookService]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const borrowRecordBooksInfo = [new BorrowRecordBookInfo(bookId, [bookCopyId])];
        const request = new CreateBorrowRecordRequest(borrowRecordBooksInfo, new Date(dueDate), patronId);
        onCreate(request);
        setOpen(false);
    };

    const handleBookCopySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCopyId = e.target.value;
        if (selectedCopyId) {
            setSelectedBookCopyIds([...selectedBookCopyIds, selectedCopyId]);
            setBookCopyId('');
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                        Create Borrow Record
                    </h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Patron</label>
                            <select
                                value={patronId}
                                onChange={(e) => setPatronId(Number(e.target.value))}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                required
                            >
                                <option value={0}>Select Patron</option>
                                {patrons.map((patron) => (
                                    <option key={patron.id} value={patron.id}>{patron.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Due Date</label>
                            <input
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Book</label>
                            <select
                                value={bookId}
                                onChange={(e) => setBookId(Number(e.target.value))}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                required
                            >
                                <option value={0}>Select Book</option>
                                {books.map((book) => (
                                    <option key={book.id} value={book.id}>{book.Title}</option>
                                ))}
                            </select>
                        </div>
                        {bookId > 0 && (
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Book Copy</label>
                                <select
                                    value={bookCopyId}
                                    onChange={handleBookCopySelect}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="">Select Book Copy</option>
                                    {bookCopies?.bookCopyList.map((copy) => (
                                        <option key={copy.ibns} value={copy.ibns}>{copy.ibns}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Selected Book Copies</label>
                            <textarea
                                value={selectedBookCopyIds.join('\n')}
                                readOnly
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                rows={5}
                            />
                        </div>
                        <div className="mt-4 flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}