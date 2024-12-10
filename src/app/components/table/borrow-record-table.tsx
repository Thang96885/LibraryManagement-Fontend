// src/app/components/table/borrow-record-table.tsx
import { useState, useEffect } from 'react';
import { BorrowRecordService } from '@/app/services/BorrowRecordService';
import { PatronService } from '@/app/services/PatronService';
import { ListBorrowRecordBookRecord, ListBorrowRecordRequest, ListBorrowRecordResult, GetBorrowRecordDto, UpdateBorrowRecordRequest, CreateBorrowRecordRequest } from '@/app/models/borrow-record-model';
import { ListPatronRecord } from '@/app/models/patron-model';
import BorrowRecordPopupForm from '@/app/components/popup/borrow-record-popup-form';
import CreateBorrowRecordPopupForm from '@/app/components/popup/create-borrow-record-popup-form';
import BookService from '@/app/services/BookService';

interface BorrowRecordTableProps {
    borrowRecordService: BorrowRecordService;
    patronService: PatronService;
}

export default function BorrowRecordTable({ borrowRecordService, patronService }: BorrowRecordTableProps) {
    const [page, setPage] = useState(1);
    const [borrowRecords, setBorrowRecords] = useState<ListBorrowRecordBookRecord[]>([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [searchPatronName, setSearchPatronName] = useState('');
    const [searchBookTitle, setSearchBookTitle] = useState('');
    const [notReturned, setNotReturned] = useState(false);
    const [patronId, setPatronId] = useState(0);
    const [patrons, setPatrons] = useState<ListPatronRecord[]>([]);
    const [selectedBorrowRecord, setSelectedBorrowRecord] = useState<GetBorrowRecordDto | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);

    const pageSize = 10;

    const fetchBorrowRecords = async () => {
        setIsLoading(true);
        try {
            const result: ListBorrowRecordResult = await borrowRecordService.listBorrowRecord(
                new ListBorrowRecordRequest(page, pageSize, notReturned, patronId)
            );
            setBorrowRecords(result.records);
            setTotalRecords(result.totalNumberOfRecords);
        } catch (error) {
            console.error('Failed to fetch borrow records:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchPatrons = async () => {
        try {
            const result = await patronService.ListPatron({ page: 1, pageSize: 1000, searchId: 0, searchPatronName: '', searchEmail: '' });
            setPatrons(result.records);
        } catch (error) {
            console.error('Failed to fetch patrons:', error);
        }
    };

    useEffect(() => {
        fetchPatrons();
    }, []);

    useEffect(() => {
        fetchBorrowRecords();
    }, [page, searchPatronName, searchBookTitle, notReturned, patronId]);

    const handleViewClick = async (recordId: number) => {
        const record = await borrowRecordService.getBorrowRecord(recordId);
        setSelectedBorrowRecord(record);
        setIsPopupOpen(true);
    };

    const handleUpdateDueDate = async (newDueDate: Date) => {
        if (selectedBorrowRecord) {
            const updateRequest = new UpdateBorrowRecordRequest(selectedBorrowRecord.id, newDueDate);
            const success = await borrowRecordService.updateBorrowRecord(updateRequest);
            if (success) {
                fetchBorrowRecords();
                setIsPopupOpen(false);
            } else {
                console.error('Failed to update due date');
            }
        }
    };

    const handleCreateBorrowRecord = async (request: CreateBorrowRecordRequest) => {
        const success = await borrowRecordService.createBorrowRecord(request);
        if (success) {
            fetchBorrowRecords();
        } else {
            console.error('Failed to create borrow record');
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white p-4 rounded-lg shadow mb-6">
                <h2 className="text-2xl font-bold mb-4">Borrow Records</h2>
                <div className="flex flex-wrap gap-4 items-center mb-4">
                    <select
                        className="w-1/5 px-4 py-2 border rounded"
                        value={notReturned.toString()}
                        onChange={(e) => setNotReturned(e.target.value === 'true')}
                    >
                        <option value="false">All</option>
                        <option value="true">Not Returned</option>
                    </select>
                    <select
                        className=" w-1/5 px-4 py-2 border rounded"
                        value={patronId}
                        onChange={(e) => setPatronId(Number(e.target.value))}
                    >
                        <option value={0}>All Patrons</option>
                        {patrons.map((patron) => (
                            <option key={patron.id} value={patron.id}>{patron.name}</option>
                        ))}
                    </select>
                    <button
                        onClick={() => setIsCreatePopupOpen(true)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Create Borrow Record
                    </button>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Borrow Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Returned</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patron Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rental Fee</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Books Borrowed</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {borrowRecords.map((record) => (
                            <tr key={record.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(record.borrowDate).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(record.dueDate).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.isReturned ? 'Yes' : 'No'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.patronName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${record.rentalFee.toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.numberBooksBorrowed}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    <button
                                        onClick={() => handleViewClick(record.id)}
                                        className="text-blue-600 hover:text-blue-900 mr-4"
                                    >
                                        View
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-700">
                    Showing {Math.min((page - 1) * pageSize + 1, totalRecords)} to {Math.min(page * pageSize, totalRecords)} of {totalRecords} results
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
                        disabled={totalRecords <= page * pageSize}
                        className="px-4 py-2 border rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>

            {selectedBorrowRecord && (
                <BorrowRecordPopupForm
                    open={isPopupOpen}
                    setOpen={setIsPopupOpen}
                    borrowRecord={selectedBorrowRecord}
                    onUpdateDueDate={handleUpdateDueDate}
                />
            )}

            {isCreatePopupOpen && (
                <CreateBorrowRecordPopupForm
                bookService={new BookService()}
                    open={isCreatePopupOpen}
                    setOpen={setIsCreatePopupOpen}
                    patronService={patronService}
                    onCreate={handleCreateBorrowRecord}
                />
            )}
        </div>
    );
}