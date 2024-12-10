// src/app/components/popup/create-borrow-record-popup-form.tsx
import { useState, useEffect } from 'react';
import { CreateBorrowRecordRequest, BorrowRecordBookInfo } from '@/app/models/borrow-record-model';
import { PatronService } from '@/app/services/PatronService';
import BookService from '@/app/services/BookService';
import { ListPatronRecord } from '@/app/models/patron-model';
import { ListBookRecord, BookCopyDto, ListBookQuery, BookRecord } from '@/app/models/book-model';

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
    const [bookCopies, setBookCopies] = useState<BookCopyDto[]>([]);
    const [patronId, setPatronId] = useState<number>(0);
    const [dueDate, setDueDate] = useState<string>('');
    const [selectedBooks, setSelectedBooks] = useState<{ bookId: number, bookCopyIds: string[] }[]>([]);
    const [currentBookId, setCurrentBookId] = useState<number>(0);
    const [currentBookCopyId, setCurrentBookCopyId] = useState<string>('');

    useEffect(() => {
        const fetchPatrons = async () => {
            try {
                const result = await patronService.ListPatron({ page: 1, pageSize: 1000, searchId: 0, searchPatronName: '', searchEmail: '' });
                setPatrons(result.records);
            } catch (error) {
                console.error('Failed to fetch patrons:', error);
            }
        };

        const fetchBooks = async () => {
            try {
                const result = await bookService.getBooks(new ListBookQuery(1, 1000, 0, "", 0, 0, 0, true, []));
                setBooks(result.books);
            } catch (error) {
                console.error('Failed to fetch books:', error);
            }
        };
        if(open){
            fetchPatrons();
            fetchBooks();
        }
        
    }, [patronService, bookService, open]);

    useEffect(() => {
        const fetchBookCopies = async () => {
            if (currentBookId > 0) {
                try {
                    const result = await bookService.getBook(currentBookId);
                    result.bookCopyList = result.bookCopyList.filter((copy: BookCopyDto) => copy.status === 'Available');
                    setBookCopies(result.bookCopyList);
                } catch (error) {
                    console.error('Failed to fetch book copies:', error);
                }
            }
        };

        fetchBookCopies();
    }, [currentBookId, bookService]);

    const handleBookSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentBookId(Number(e.target.value));
        setCurrentBookCopyId('');
    };

    const handleBookCopySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCopyId = e.target.value;
        if (selectedCopyId) {
            const updatedBooks = [...selectedBooks];
            const bookIndex = updatedBooks.findIndex(book => book.bookId === currentBookId);
            if (bookIndex > -1) {
                updatedBooks[bookIndex].bookCopyIds.push(selectedCopyId);
            } else {
                updatedBooks.push({ bookId: currentBookId, bookCopyIds: [selectedCopyId] });
            }
            setSelectedBooks(updatedBooks);
            setCurrentBookCopyId(''); // Reset the combobox value
        }
    };

    const handleDeleteAll = () => {
        setSelectedBooks([]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const borrowRecordBooksInfo = selectedBooks.map(book => new BorrowRecordBookInfo(book.bookId, book.bookCopyIds));
        const request = new CreateBorrowRecordRequest(borrowRecordBooksInfo, new Date(dueDate), patronId);
        onCreate(request);
        setOpen(false);
    };

    const getFilteredBookCopies = () => {
        const selectedCopyIds = selectedBooks.flatMap(book => book.bookCopyIds);
        return bookCopies.filter(copy => !selectedCopyIds.includes(copy.ibns));
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
                                value={currentBookId}
                                onChange={handleBookSelect}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                required
                            >
                                <option value={0}>Select Book</option>
                                {books.map((book) => (
                                    <option key={book.id} value={book.id}>{book.Title}</option>
                                ))}
                            </select>
                        </div>
                        {currentBookId > 0 && (
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Book Copy</label>
                                <select
                                    value={currentBookCopyId}
                                    onChange={(e) => {handleBookCopySelect(e)}}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                >
                                    <option value="">Select Book Copy</option>
                                    {getFilteredBookCopies().map((copy) => (
                                        <option key={copy.ibns} value={copy.ibns}>{copy.ibns}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Selected Book Copies</label>
                            <textarea
                                value={selectedBooks.map(book => `Book ID: ${book.bookId}, Copies: ${book.bookCopyIds.join(', ')}`).join('\n')}
                                readOnly
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                rows={5}
                            />
                        </div>
                        <div className="mt-4 flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={handleDeleteAll}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                                Delete All
                            </button>
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