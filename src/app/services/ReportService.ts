// src/app/services/ReportService.ts

export interface ReportData {
    numberOfBooks: number;
    numberOfAuthors: number;
    numberOfCategories: number;
    numberOfPatrons: number;
    numberOfBorrowRecords: number;
    numberOfReturnRecords: number;
    numberOfBorrowRecordsPastMonth: number;
    numberOfReturnRecordsPastMonth: number;
    totalChargePastMonth: number;
}

export class ReportService {
    async getReportData(): Promise<ReportData> {
        const response = await fetch('https://localhost:44313/api/Report/list', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Failed to fetch report data');
        }
    }
}

export default ReportService;