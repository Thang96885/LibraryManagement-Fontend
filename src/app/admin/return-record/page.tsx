// src/app/admin/return-record/page.tsx
'use client'
import { useState } from 'react';
import ReturnRecordTable from '@/app/components/table/return-record-table';
import ReturnRecordService from '@/app/services/ReturnRecordService';
import CreateReturnRecordPopupForm from '@/app/components/popup/create-return-record-popup-form';
import { CreateReturnRecordCommand } from '@/app/models/return-record-model';
import { BorrowRecordService } from '@/app/services/BorrowRecordService';
import { PatronService } from '@/app/services/PatronService';

export default function Page() {
    const returnRecordService = new ReturnRecordService();
    const borrowRecordService = new BorrowRecordService();
    const patronService = new PatronService();


    return (
        <div>
            
            <ReturnRecordTable returnRecordService={returnRecordService} patronService={patronService} borrowRecordService={borrowRecordService} />
        </div>
    );
}