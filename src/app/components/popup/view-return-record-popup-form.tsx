// src/app/components/popup/view-return-record-popup-form.tsx
import { useEffect, useState } from 'react';
import { GetReturnRecordDto, GetReturnRecordQuery, GetReturnRecordBookStatusDto } from '@/app/models/return-record-model';
import ReturnRecordService from '@/app/services/ReturnRecordService';

interface ViewReturnRecordPopupFormProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    returnRecordId: number;
    returnRecordService: ReturnRecordService;
}

export default function ViewReturnRecordPopupForm({ open, setOpen, returnRecordId, returnRecordService }: ViewReturnRecordPopupFormProps) {
    const [returnRecord, setReturnRecord] = useState<GetReturnRecordDto | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchReturnRecord = async () => {
            setIsLoading(true);
            try {
                const query = new GetReturnRecordQuery(returnRecordId);
                const result = await returnRecordService.getReturnRecord(query);
                setReturnRecord(result);
            } catch (error) {
                console.error('Failed to fetch return record:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (open) {
            fetchReturnRecord();
        }
    }, [open, returnRecordId, returnRecordService]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    returnRecord && (
                        <div className="mt-3">
                            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                                Return Record Details
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">ID</label>
                                    <p className="mt-1 text-sm text-gray-900">{returnRecord.id}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Borrow Record ID</label>
                                    <p className="mt-1 text-sm text-gray-900">{returnRecord.borrowRecordId}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Borrow Date</label>
                                    <p className="mt-1 text-sm text-gray-900">{new Date(returnRecord.borrowDate).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Return Date</label>
                                    <p className="mt-1 text-sm text-gray-900">{new Date(returnRecord.returnDate).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Patron ID</label>
                                    <p className="mt-1 text-sm text-gray-900">{returnRecord.patronId}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Patron Name</label>
                                    <p className="mt-1 text-sm text-gray-900">{returnRecord.patronName}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Note</label>
                                    <p className="mt-1 text-sm text-gray-900">{returnRecord.note}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Book Statuses</label>
                                    <ul className="list-disc list-inside">
                                        {returnRecord.bookStatuses.map((status: GetReturnRecordBookStatusDto) => (
                                            <li key={status.bookCopyId} className="text-sm text-gray-900">
                                                {status.bookTitle} (Copy ID: {status.bookCopyId}) - {status.bookPhysicalStatus}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="mt-4 flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}