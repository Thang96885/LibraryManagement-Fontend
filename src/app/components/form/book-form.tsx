import { useState, useEffect } from 'react';
import { BookRecord } from '@/app/models/book-model';
import BookService from '@/app/services/BookService';

interface BookFormProps {
    bookId: number;
}

export default function BookForm({ bookId }: BookFormProps) {
    const [book, setBook] = useState<BookRecord | null>(null);
    const bookService = new BookService();

    useEffect(() => {
        bookService.getBook(bookId).then((data) => {
            setBook(data);
        }).catch((error) => {
            console.error('Failed to fetch book details:', error);
            alert("Failed to get book");
        });
    }, [bookId]);

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col p-4 border rounded shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Book Detail</h1>
            <div className="mb-2">
                <label className="block text-gray-700">ID: hellos</label>
                <input type="text" value={book.id} readOnly className="border p-2 rounded w-full" />
            </div>
            <div className="mb-2">
                <label className="block text-gray-700">Title:</label>
                <input type="text" value={book.Title} readOnly className="border p-2 rounded w-full" />
            </div>
            <div className="mb-2">
                <label className="block text-gray-700">Author Name:</label>
                <input type="text" value={book.AuthorName} readOnly className="border p-2 rounded w-full" />
            </div>
            <div className="mb-2">
                <label className="block text-gray-700">Publisher Name:</label>
                <input type="text" value={book.PublisherName} readOnly className="border p-2 rounded w-full" />
            </div>
            <div className="mb-2">
                <label className="block text-gray-700">Publication Year:</label>
                <input type="text" value={book.PublicationYear} readOnly className="border p-2 rounded w-full" />
            </div>
            <div className="mb-2">
                <label className="block text-gray-700">Page Count:</label>
                <input type="text" value={book.PageCount} readOnly className="border p-2 rounded w-full" />
            </div>
            <div className="mb-2">
                <label className="block text-gray-700">Number of Copies:</label>
                <input type="text" value={book.NumberOfCopies} readOnly className="border p-2 rounded w-full" />
            </div>
            <div className="mb-2">
                <label className="block text-gray-700">Number Available:</label>
                <input type="text" value={book.NumberAvailable} readOnly className="border p-2 rounded w-full" />
            </div>
            <div className="mb-2">
                <label className="block text-gray-700">Genres:</label>
                <ul>
                    {book.Genres.map((genre, index) => (
                        <li key={index}>
                            <input type="text" value={genre.Name} readOnly className="border p-2 rounded w-full" />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}