// src/app/components/table/return-record-table.tsx
import { useState, useEffect } from 'react';
import { ReturnRecordService } from '@/app/services/ReturnRecordService';
import { ListReturnRecord, ListReturnRecordQuery, ListReturnRecordDto, CreateReturnRecordCommand } from '@/app/models/return-record-model';
import { PatronService } from '@/app/services/PatronService';
import { BorrowRecordService } from '@/app/services/BorrowRecordService';
import { ListPatronRecord } from '@/app/models/patron-model';
import { ListBorrowRecordBookRecord } from '@/app/models/borrow-record-model';
import ViewReturnRecordPopupForm from '@/app/components/popup/view-return-record-popup-form';
import CreateReturnRecordPopupForm from '@/app/components/popup/create-return-record-popup-form';

interface ReturnRecordTableProps {
    returnRecordService: ReturnRecordService;
    patronService: PatronService;
    borrowRecordService: BorrowRecordService;
}

export default function ReturnRecordTable({ returnRecordService, patronService, borrowRecordService }: ReturnRecordTableProps) {
    const [returnRecords, setReturnRecords] = useState<ListReturnRecord[]>([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const [isLoading, setIsLoading] = useState(true);
    const [patrons, setPatrons] = useState<ListPatronRecord[]>([]);
    const [borrowRecords, setBorrowRecords] = useState<ListBorrowRecordBookRecord[]>([]);
    const [searchPatronId, setSearchPatronId] = useState<number>(0);
    const [searchBorrowRecordId, setSearchBorrowRecordId] = useState<number>(0);
    const [isViewPopupOpen, setIsViewPopupOpen] = useState(false);
    const [selectedReturnRecordId, setSelectedReturnRecordId] = useState<number | null>(null);
    const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);

    const fetchReturnRecords = async () => {
        setIsLoading(true);
        try {
            const query = new ListReturnRecordQuery(page, pageSize, searchPatronId, searchBorrowRecordId);
            const result: ListReturnRecordDto = await returnRecordService.listReturnRecords(query);
            setReturnRecords(result.returnRecords);
            setTotalRecords(result.totalNumber);
        } catch (error) {
            console.error('Failed to fetch return records:', error);
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

    const fetchBorrowRecords = async () => {
        try {
            const result = await borrowRecordService.listBorrowRecord({ page: 1, pageSize: 1000, notReturned: false, patronId: 0 });
            setBorrowRecords(result.records);
        } catch (error) {
            console.error('Failed to fetch borrow records:', error);
        }
    };

    const handlerDelete = async (id: number) => {
        try {
            await returnRecordService.deleteReturnRecord(id);
            fetchReturnRecords();
        } catch (error) {
            console.error('Failed to delete return record:', error);
        }
    }

    useEffect(() => {
        fetchPatrons();
        fetchBorrowRecords();
    }, []);

    useEffect(() => {
        fetchReturnRecords();
    }, [page, searchPatronId, searchBorrowRecordId]);

    const handleViewClick = (id: number) => {
        setSelectedReturnRecordId(id);
        setIsViewPopupOpen(true);
    };

    const handleCreateReturnRecord = (request: CreateReturnRecordCommand) => {
        returnRecordService.createReturnRecord(request).then(success => {
            if (success) {
                fetchReturnRecords();
                setIsCreatePopupOpen(false);
            } else {
                console.error('Failed to create return record');
            }
        });
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white p-4 rounded-lg shadow mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Return Records</h2>
                    <button
                        onClick={() => setIsCreatePopupOpen(true)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Create Return Record
                    </button>
                </div>
                <div className="flex flex-wrap gap-4 items-center mb-4">
                    <select
                        className="w-1/5 px-4 py-2 border rounded"
                        value={searchPatronId}
                        onChange={(e) => setSearchPatronId(Number(e.target.value))}
                    >
                        <option value={0}>Select Patron</option>
                        {patrons.map((patron) => (
                            <option key={patron.id} value={patron.id}>{patron.name}</option>
                        ))}
                    </select>
                    <select
                        className="w-1/5 px-4 py-2 border rounded"
                        value={searchBorrowRecordId}
                        onChange={(e) => setSearchBorrowRecordId(Number(e.target.value))}
                    >
                        <option value={0}>Select Borrow Record</option>
                        {borrowRecords.map((record) => (
                            <option key={record.id} value={record.id}>{record.id}</option>
                        ))}
                    </select>
                    <button
                        onClick={() => {
                            setPage(1);
                            fetchReturnRecords();
                        }}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Search
                    </button>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Return Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patron ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patron Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Borrow Record ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Additional Fee</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Fee</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {returnRecords.map((record) => (
                            <tr key={record.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(record.returnDate).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.patronId}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.patronName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.borrowRecordId}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${record.additionalFee}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${record.totalFee}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    <button
                                        onClick={() => handleViewClick(record.id)}
                                        className="mr-2 text-blue-600 hover:text-blue-900"
                                    >
                                        View
                                    </button>
                                    <button
                                        onClick={() => {handlerDelete(record.id)}}
                                        className=" ml-2text-red-600 hover:text-red-900"
                                    >
                                        Delete
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

            {selectedReturnRecordId !== null && (
                <ViewReturnRecordPopupForm
                    open={isViewPopupOpen}
                    setOpen={setIsViewPopupOpen}
                    returnRecordId={selectedReturnRecordId}
                    returnRecordService={returnRecordService}
                />
            )}

            {isCreatePopupOpen && (
                <CreateReturnRecordPopupForm
                    open={isCreatePopupOpen}
                    setOpen={setIsCreatePopupOpen}
                    returnRecordService={returnRecordService}
                    borrowRecordService={borrowRecordService}
                    patronService={patronService}
                    onCreate={handleCreateReturnRecord}
                />
            )}
        </div>
    );
}