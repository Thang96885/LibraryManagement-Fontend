// src/app/components/popup/create-return-record-popup-form.tsx
import { useState, useEffect } from 'react';
import { CreateReturnRecordCommand, CreateReturnRecordBookStatus } from '@/app/models/return-record-model';
import { BorrowRecordService } from '@/app/services/BorrowRecordService';
import { PatronService } from '@/app/services/PatronService';
import { ListBorrowRecordBookRecord, GetBorrowRecordDto } from '@/app/models/borrow-record-model';
import ReturnRecordService from '@/app/services/ReturnRecordService';

interface CreateReturnRecordPopupFormProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    returnRecordService: ReturnRecordService;
    borrowRecordService: BorrowRecordService;
    patronService: PatronService;
    onCreate: (request: CreateReturnRecordCommand) => void;
}

const bookConditions = ['New', 'Good', 'Fair', 'Damaged'];

export default function CreateReturnRecordPopupForm({ open, setOpen, returnRecordService, borrowRecordService, patronService, onCreate }: CreateReturnRecordPopupFormProps) {
    const [borrowRecords, setBorrowRecords] = useState<ListBorrowRecordBookRecord[]>([]);
    const [selectedBorrowRecordId, setSelectedBorrowRecordId] = useState<number>(0);
    const [borrowRecordDetails, setBorrowRecordDetails] = useState<GetBorrowRecordDto | null>(null);
    const [bookStatuses, setBookStatuses] = useState<CreateReturnRecordBookStatus[]>([]);

    useEffect(() => {
        const fetchBorrowRecords = async () => {
            try {
                const result = await borrowRecordService.listBorrowRecord({ page: 1, pageSize: 1000, notReturned: true, patronId: 0 });
                setBorrowRecords(result.records);
            } catch (error) {
                console.error('Failed to fetch borrow records:', error);
            }
        };

        if (open) {
            fetchBorrowRecords();
        }
    }, [open, borrowRecordService]);

    useEffect(() => {
        const fetchBorrowRecordDetails = async () => {
            if (selectedBorrowRecordId > 0) {
                try {
                    const result = await borrowRecordService.getBorrowRecord(selectedBorrowRecordId);
                    setBorrowRecordDetails(result);
                    setBookStatuses(result.bookInfoList.flatMap(book =>
                        book.bookCopyBorrowInfoList.map(copy => new CreateReturnRecordBookStatus(book.bookId, copy.id, copy.condition))
                    ));
                } catch (error) {
                    console.error('Failed to fetch borrow record details:', error);
                }
            }
        };

        fetchBorrowRecordDetails();
    }, [selectedBorrowRecordId, borrowRecordService]);

    const handleBookConditionChange = (bookCopyId: string, condition: string) => {
        setBookStatuses(prevStatuses =>
            prevStatuses.map(status =>
                status.bookCopyId === bookCopyId ? { ...status, condition } : status
            )
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (borrowRecordDetails) {
            const request = new CreateReturnRecordCommand(borrowRecordDetails.id, borrowRecordDetails.patronId, bookStatuses);
            onCreate(request);
            setOpen(false);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                        Create Return Record
                    </h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Borrow Record</label>
                            <select
                                value={selectedBorrowRecordId}
                                onChange={(e) => setSelectedBorrowRecordId(Number(e.target.value))}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                required
                            >
                                <option value={0}>Select Borrow Record</option>
                                {borrowRecords.map((record) => (
                                    <option key={record.id} value={record.id}>{record.id}</option>
                                ))}
                            </select>
                        </div>
                        {borrowRecordDetails && (
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Books</label>
                                {borrowRecordDetails.bookInfoList.map((book) => (
                                    book.bookCopyBorrowInfoList.map((copy) => (
                                        <div key={copy.id} className="mb-2">
                                            <p className="text-sm text-gray-900">{book.bookName} (Copy ID: {copy.id})</p>
                                            <select
                                                value={bookStatuses.find(status => status.bookCopyId === copy.id)?.condition || 'New'}
                                                onChange={(e) => handleBookConditionChange(copy.id, e.target.value)}
                                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                                required
                                            >
                                                {bookConditions.map(condition => (
                                                    <option key={condition} value={condition}>{condition}</option>
                                                ))}
                                            </select>
                                        </div>
                                    ))
                                ))}
                            </div>
                        )}
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