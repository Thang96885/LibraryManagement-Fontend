import { useState, useEffect } from "react";
import { BookCopyDto, BookPhysicalCondition, BookStatus, CreateBookCopyRequest, GetBookResult } from "@/app/models/book-model";
import BookService from "@/app/services/BookService";
import RoleGuard from "../auth/RoleGuard";
import EditBookCopyPopupForm from "../popup/edit-book-copy-popup-form";
import AddBookCopyPopupForm from "../popup/add-bookcopy-popup-form";

interface BookCopyTableProps {
    bookInfo: GetBookResult;
    bookService: BookService;
    onUpdate?: (success: boolean) => Promise<void>;  // Make optional
}

export default function BookCopyTable({ bookInfo, bookService, onUpdate }: BookCopyTableProps) {
    const [page, setPage] = useState(1);
    const [openEdit, setOpenEdit] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [selectedBookCopy, setSelectedBookCopy] = useState<BookCopyDto | null>(null);
    const [searchISBN, setSearchISBN] = useState("");
    const [searchStatus, setSearchStatus] = useState<BookStatus>(BookStatus.None);
    const [searchCondition, setSearchCondition] = useState<BookPhysicalCondition>(BookPhysicalCondition.None);
    const [displayedCopies, setDisplayedCopies] = useState<BookCopyDto[]>([]);
    const [totalCopies, setTotalCopies] = useState<BookCopyDto[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const pageSize = 10;

    // Add a refresh handler
    const refreshData = async () => {
        if (!bookInfo?.bookInfo?.id) return;
        
        const updatedBook = await bookService.getBook(bookInfo.bookInfo.id);
        if (updatedBook?.bookCopyList) {
            setTotalCopies(updatedBook.bookCopyList);
        }
    };

    const handlePopupClose = async (success: boolean) => {
        setSelectedBookCopy(null);
        setOpenEdit(false);
        
        // Add null check before calling
        if (onUpdate) {
            await onUpdate(true);
        }

        // Refresh local data regardless
        if (success && bookInfo?.bookInfo?.id) {
            const updatedBook = await bookService.getBook(bookInfo.bookInfo.id);
            if (updatedBook?.bookCopyList) {
                setTotalCopies(updatedBook.bookCopyList);
            }
        }
    };

    // Modify handleEditClick to pass the updated handlePopupClose
    const handleEditClick = (copy: BookCopyDto) => {
        setSelectedBookCopy(copy);
        setOpenEdit(true);
    };

    const handlerAddBookCopy = () => {
        setOpenAdd(true);
    }

    const handleDelete = async (copy: BookCopyDto) => {
        const confirmed = window.confirm("Are you sure you want to delete this book copy?");
        if (!confirmed) return;

        try {
            const result = await bookService.deleteBookCopyRequest({
                bookId: bookInfo.bookInfo.id,
                bookCopyId: copy.ibns
            });

            if (result) {
                alert("Book copy deleted successfully");
                // Refresh data
                const updatedBook = await bookService.getBook(bookInfo.bookInfo.id);
                if (updatedBook?.bookCopyList) {
                    setTotalCopies(updatedBook.bookCopyList);
                }
            } else {
                alert("Failed to delete book copy");
            }
        } catch (error) {
            console.error("Error deleting book copy:", error);
            alert("Error deleting book copy");
        }
    };

    const handleAddBookCopy = async () => {
    };

    useEffect(() => {
        if (bookInfo?.bookCopyList) {
            setTotalCopies(bookInfo.bookCopyList);
            setIsLoading(false);
        }
    }, [bookInfo]);
    
    useEffect(() => {
        const filtered = totalCopies.filter(copy => {
            const isbnMatch = !searchISBN || copy.ibns.includes(searchISBN);
            const statusMatch = !searchStatus || copy.status === searchStatus;
            const conditionMatch = !searchCondition || copy.bookPhysicalCondition === searchCondition;
            return isbnMatch && statusMatch && conditionMatch;
        });

        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        setDisplayedCopies(filtered.slice(start, end));
    }, [totalCopies, searchISBN, searchStatus, searchCondition, page]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white p-4 rounded-lg shadow mb-6">
                <div className="flex flex-wrap gap-4 items-center">
                    <input
                        type="text"
                        placeholder="Search by ISBN"
                        className="flex-1 px-4 py-2 border rounded"
                        onChange={(e) => setSearchISBN(e.target.value)}
                    />
                    <select 
                        className="flex-1 px-4 py-2 border rounded"
                        onChange={(e) => setSearchStatus(e.target.value as BookStatus)}
                    >
                        <option value="">All Statuses</option>
                        {Object.values(BookStatus).filter(status => status !== BookStatus.None).map(status => (
                            <option key={`status-${status}`} value={status}>{status}</option>
                        ))}
                    </select>
                    <select
                        className="flex-1 px-4 py-2 border rounded"
                        onChange={(e) => setSearchCondition(e.target.value as BookPhysicalCondition)}
                    >
                        <option value="">All Conditions</option>
                        {Object.values(BookPhysicalCondition).filter(condition => condition !== BookPhysicalCondition.None).map(condition => (
                            <option key={`condition-${condition}`} value={condition}>{condition}</option>
                        ))}
                    </select>
                </div>
            </div>
            
            <button 
                onClick={() => {handlerAddBookCopy()}}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Add Book Copy
            </button>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ISBN</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acquisition Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Condition</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {displayedCopies.map((copy, index) => (
                            <tr key={`${copy.ibns}-${index}`}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{copy.ibns}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {new Date(copy.acquisitionDate).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{copy.status}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${copy.price}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{copy.bookPhysicalCondition}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <RoleGuard allowedRoles={["Admin", "Librarian"]}>
                                        <button 
                                            onClick={() => handleEditClick(copy)} 
                                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(copy)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </button>
                                    </RoleGuard>
                                    {selectedBookCopy && (
                                        <EditBookCopyPopupForm 
                                            open={openEdit} 
                                            setOpen={handlePopupClose}  // Updated to use new handlePopupClose
                                            bookCopy={selectedBookCopy}
                                            bookService={bookService}
                                            bookId={bookInfo.bookInfo.id}
                                        />
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-700">
                    Showing {Math.min(displayedCopies.length, 1)} to {displayedCopies.length} of {totalCopies.length} results
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page <= 1}
                        className="px-4 py-2 border rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => setPage(p => p + 1)}
                        disabled={totalCopies.length <= page * pageSize}
                        className="px-4 py-2 border rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
                <AddBookCopyPopupForm bookId={bookInfo.bookInfo.id} bookService={bookService}
                open={openAdd} setOpen={setOpenAdd} onSuccess={refreshData}
                ></AddBookCopyPopupForm>
            </div>
            
        </div>
    );
}
