'use client';
import BorrowRecordTable from "@/app/components/table/borrow-record-table";
import { BorrowRecordService } from "@/app/services/BorrowRecordService";
import { PatronService } from "@/app/services/PatronService";



export default function BorrowRecordPage() {
    const borrowRecordService = new BorrowRecordService();
    const patronService = new PatronService();
    
    return (
        <BorrowRecordTable borrowRecordService={borrowRecordService} patronService={patronService}></BorrowRecordTable>
    );
}