import { CreateReturnRecordCommand, ListReturnRecordQuery, ListReturnRecordDto, GetReturnRecordQuery, GetReturnRecordDto, GetReturnRecordBookStatusDto } from '@/app/models/return-record-model';
import { Base_URL } from './BaseUrl';

const BASE_URL = Base_URL + '/api/ReturnRecord';

export class ReturnRecordService {
    async createReturnRecord(request: CreateReturnRecordCommand): Promise<boolean> {
        const response = await fetch(`${BASE_URL}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });

        if (response.ok) {
            return true;
        } else {
            return false;
        }
    }

    async listReturnRecords(query: ListReturnRecordQuery): Promise<ListReturnRecordDto> {
        const params = new URLSearchParams(query as any).toString();
        const response = await fetch(`${BASE_URL}/list?${params}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            return new ListReturnRecordDto(data.returnRecords, data.totalNumber);
        } else {
            throw new Error('Failed to fetch return records');
        }
    }

    async getReturnRecord(query: GetReturnRecordQuery): Promise<GetReturnRecordDto> {
        const params = new URLSearchParams(query as any).toString();
        const response = await fetch(`${BASE_URL}/get?${params}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            return new GetReturnRecordDto(
                data.id,
                data.borrowRecordId,
                new Date(data.borrowDate),
                new Date(data.returnDate),
                data.patronId,
                data.patronName,
                data.note,
                data.bookStatuses.map((status: any) => new GetReturnRecordBookStatusDto(
                    status.bookId,
                    status.bookTitle,
                    status.bookCopyId,
                    status.bookPhysicalStatus
                ))
            );
        } else {
            throw new Error('Failed to fetch return record');
        }
    }

    async deleteReturnRecord(id: number): Promise<boolean> {
        const response = await fetch(`${BASE_URL}/delete?ReturnRecordId=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            return true;
        } else {
            return false;
        }
    }
}

export default ReturnRecordService;
