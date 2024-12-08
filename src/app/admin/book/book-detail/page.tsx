"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import BookService from '@/app/services/BookService';
import { BookRecord, GetBookResult } from '@/app/models/book-model';
import { useSearchParams } from 'next/navigation';
import BookForm, { BookFormType } from '@/app/components/form/book-form';
import BookCopyTable from '@/app/components/table/book-copy-table';

export default function BookDetail() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const bookService = new BookService();
    const id = searchParams.get("id");
    const [book, setBook] = useState<GetBookResult>(null);
    const [type, setType] = useState(BookFormType.View);

    const fetchBookData = async () => {
        const bookId = Number(id);
        try {
            const data = await bookService.getBook(bookId);
            setBook(data);
        } catch (error) {
            console.error('Failed to fetch book details:', error);
            alert("Failed to get book");
        }
    };

    // Initial data fetch
    useEffect(() => {
        fetchBookData();
    }, [id]);

    // Handle refresh when book copy is edited
    const handleBookCopyUpdate = async (success: boolean) => {
        if (success) {
            await fetchBookData();
        }
    };

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div className='flex flex-col h-max'>
            <BookForm bookId={Number(id)} type={type} setType={setType} />
            <div className='flex'>
                <div className='flex h-max'>
                    <BookCopyTable 
                        bookInfo={book} 
                        bookService={bookService}
                        onUpdate={handleBookCopyUpdate}
                    />
                </div>
            </div>
        </div>
    );
}