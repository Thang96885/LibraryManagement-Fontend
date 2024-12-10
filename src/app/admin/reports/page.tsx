// src/app/admin/report/page.tsx
'use client'
import { useState, useEffect } from 'react';
import ReportService, { ReportData } from '@/app/services/ReportService';

export default function ReportPage() {
    const [reportData, setReportData] = useState<ReportData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReportData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const reportService = new ReportService();
                const data = await reportService.getReportData();
                setReportData(data);
            } catch (error) {
                setError('Failed to fetch report data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchReportData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!reportData) {
        return <div>No report data available</div>;
    }

    return (
        <div className="container mx-auto p-6 mt-3">
            <h1 className="text-2xl font-bold mb-4">Report</h1>
            <div className="bg-white p-4 rounded-lg shadow">
                <p><strong>Number of Books:</strong> {reportData.numberOfBooks}</p>
                <p><strong>Number of Authors:</strong> {reportData.numberOfAuthors}</p>
                <p><strong>Number of Categories:</strong> {reportData.numberOfCategories}</p>
                <p><strong>Number of Patrons:</strong> {reportData.numberOfPatrons}</p>
                <p><strong>Number of Borrow Records:</strong> {reportData.numberOfBorrowRecords}</p>
                <p><strong>Number of Return Records:</strong> {reportData.numberOfReturnRecords}</p>
                <p><strong>Number of Borrow Records Past Month:</strong> {reportData.numberOfBorrowRecordsPastMonth}</p>
                <p><strong>Number of Return Records Past Month:</strong> {reportData.numberOfReturnRecordsPastMonth}</p>
                <p><strong>Total Charge Past Month:</strong> ${reportData.totalChargePastMonth.toFixed(2)}</p>
            </div>
        </div>
    );
}