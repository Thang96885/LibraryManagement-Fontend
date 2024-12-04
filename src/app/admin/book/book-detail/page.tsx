"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import BookService from '@/app/services/BookService';
import { BookRecord } from '@/app/models/book-model';
import { useSearchParams } from 'next/navigation';
import BookForm, { BookFormType } from '@/app/components/form/book-form';

export default function BookDetail() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const bookService = new BookService();
    const id = searchParams.get("id");
    const [book, setBook] = useState<BookRecord | null>(null);
    const [type, setType] = useState(BookFormType.View);

    useEffect(() => {
        const bookId = Number(id); // Parse the id to a number
        bookService.getBook(bookId).then((data) => {
                setBook(data);
        }).catch((error) => {
            console.error('Failed to fetch book details:', error);
            alert("Failed to get book");
        });

    }, [id]);

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <BookForm bookId={Number(id)} type={BookFormType.View} setType={setType}></BookForm>
    );
}