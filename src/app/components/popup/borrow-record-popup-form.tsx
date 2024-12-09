import { GetBorrowRecordDto } from "@/app/models/borrow-record-model";
import { useState, useEffect } from "react";

interface BorrowRecordPopupFormProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    borrowRecord: GetBorrowRecordDto;
    onUpdateDueDate: (newDueDate: Date) => void;
}

export default function BorrowRecordPopupForm({ open, setOpen, borrowRecord, onUpdateDueDate }: BorrowRecordPopupFormProps) {
    const [newDueDate, setNewDueDate] = useState<string>("");

    useEffect(() => {
        if (borrowRecord.dueDate instanceof Date) {
            setNewDueDate(borrowRecord.dueDate.toISOString().split('T')[0]);
        } else {
            setNewDueDate(new Date(borrowRecord.dueDate).toISOString().split('T')[0]);
        }
    }, [borrowRecord.dueDate]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdateDueDate(new Date(newDueDate));
        setOpen(false);
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                        Borrow Record Details
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">ID</label>
                            <p className="mt-1 text-sm text-gray-900">{borrowRecord.id}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Borrow Date</label>
                            <p className="mt-1 text-sm text-gray-900">{new Date(borrowRecord.borrowDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Due Date</label>
                            <p className="mt-1 text-sm text-gray-900">{new Date(borrowRecord.dueDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Returned</label>
                            <p className="mt-1 text-sm text-gray-900">{borrowRecord.isReturned ? 'Yes' : 'No'}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Patron Name</label>
                            <p className="mt-1 text-sm text-gray-900">{borrowRecord.patronName}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Books Borrowed</label>
                            {borrowRecord.bookInfoList.map((book) => (
                                <div key={book.bookId} className="mt-2">
                                    <p className="text-sm text-gray-900 font-semibold">{book.bookName}</p>
                                    <ul className="list-disc list-inside">
                                        {book.bookCopyBorrowInfoList.map((copy) => (
                                            <li key={copy.id} className="text-sm text-gray-900">
                                                {copy.id} - {copy.condition}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Extend Due Date</label>
                                <input
                                    type="date"
                                    value={newDueDate}
                                    onChange={(e) => setNewDueDate(e.target.value)}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
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
                                    Update Due Date
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}