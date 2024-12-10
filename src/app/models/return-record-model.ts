// src/app/models/return-record-model.ts

class CreateReturnRecordBookStatus {
    bookId: number;
    bookCopyId: string;
    condition: string;

    constructor(bookId: number, bookCopyId: string, condition: string) {
        this.bookId = bookId;
        this.bookCopyId = bookCopyId;
        this.condition = condition;
    }
}

class CreateReturnRecordCommand {
    borrowRecordId: number;
    patronId: number;
    bookReturnStatuses: CreateReturnRecordBookStatus[];

    constructor(borrowRecordId: number, patronId: number, bookReturnStatuses: CreateReturnRecordBookStatus[]) {
        this.borrowRecordId = borrowRecordId;
        this.patronId = patronId;
        this.bookReturnStatuses = bookReturnStatuses;
    }
}

class ListReturnRecord {
    id: number;
    returnDate: Date;
    patronId: number;
    patronName: string;
    borrowRecordId: number;
    additionalFee: number;
    totalFee: number;

    constructor(
        id: number,
        returnDate: Date,
        patronId: number,
        patronName: string,
        borrowRecordId: number,
        additionalFee: number,
        totalFee: number
    ) {
        this.id = id;
        this.returnDate = returnDate;
        this.patronId = patronId;
        this.patronName = patronName;
        this.borrowRecordId = borrowRecordId;
        this.additionalFee = additionalFee;
        this.totalFee = totalFee;
    }
}

class ListReturnRecordDto {
    returnRecords: ListReturnRecord[];
    totalNumber: number;

    constructor(returnRecords: ListReturnRecord[], totalNumber: number) {
        this.returnRecords = returnRecords;
        this.totalNumber = totalNumber;
    }
}

class ListReturnRecordQuery {
    page: number;
    pageSize: number;
    searchPatronId: number;
    searchBorrowId: number;

    constructor(
        page: number,
        pageSize: number,
        searchPatronId: number = 0,
        searchBorrowId: number = 0
    ) {
        this.page = page;
        this.pageSize = pageSize;
        this.searchPatronId = searchPatronId;
        this.searchBorrowId = searchBorrowId;
    }
}

class GetReturnRecordBookStatusDto {
    bookId: number;
    bookTitle: string;
    bookCopyId: string;
    bookPhysicalStatus: string;

    constructor(bookId: number, bookTitle: string, bookCopyId: string, bookPhysicalStatus: string) {
        this.bookId = bookId;
        this.bookTitle = bookTitle;
        this.bookCopyId = bookCopyId;
        this.bookPhysicalStatus = bookPhysicalStatus;
    }
}

class GetReturnRecordDto {
    id: number;
    borrowRecordId: number;
    borrowDate: Date;
    returnDate: Date;
    patronId: number;
    patronName: string;
    note: string;
    bookStatuses: GetReturnRecordBookStatusDto[];

    constructor(
        id: number,
        borrowRecordId: number,
        borrowDate: Date,
        returnDate: Date,
        patronId: number,
        patronName: string,
        note: string,
        bookStatuses: GetReturnRecordBookStatusDto[]
    ) {
        this.id = id;
        this.borrowRecordId = borrowRecordId;
        this.borrowDate = borrowDate;
        this.returnDate = returnDate;
        this.patronId = patronId;
        this.patronName = patronName;
        this.note = note;
        this.bookStatuses = bookStatuses;
    }
}

class GetReturnRecordQuery {
    id: number;

    constructor(id: number) {
        this.id = id;
    }
}

export {
    CreateReturnRecordBookStatus,
    CreateReturnRecordCommand,
    ListReturnRecord,
    ListReturnRecordDto,
    ListReturnRecordQuery,
    GetReturnRecordDto,
    GetReturnRecordBookStatusDto,
    GetReturnRecordQuery
};