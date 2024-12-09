class ListBorrowRecordResult {
    records: ListBorrowRecordBookRecord[];
    totalNumberOfRecords: number;

    constructor(records: ListBorrowRecordBookRecord[] = [], totalNumberOfRecords: number = 0) {
        this.records = records;
        this.totalNumberOfRecords = totalNumberOfRecords;
    }
}

class ListBorrowRecordBookRecord {
    id: number;
    borrowDate: Date;
    dueDate: Date;
    isReturned: boolean;
    patronId: number;
    patronName: string;
    rentalFee: number;
    bookInfoList: ListBorrowRecordBookInfo[];
    numberBooksBorrowed: number;

    constructor(
        id: number,
        borrowDate: Date,
        dueDate: Date,
        isReturned: boolean,
        patronId: number,
        patronName: string,
        rentalFee: number,
        bookInfoList: ListBorrowRecordBookInfo[] = [],
        numberBooksBorrowed: number = 0
    ) {
        this.id = id;
        this.borrowDate = borrowDate;
        this.dueDate = dueDate;
        this.isReturned = isReturned;
        this.patronId = patronId;
        this.patronName = patronName;
        this.rentalFee = rentalFee;
        this.bookInfoList = bookInfoList;
        this.numberBooksBorrowed = numberBooksBorrowed;
    }
}

class ListBorrowRecordBookInfo {
    bookId: number;
    bookName: string;
    bookCopyIds: string[];

    constructor(bookId: number, bookName: string, bookCopyIds: string[] = []) {
        this.bookId = bookId;
        this.bookName = bookName;
        this.bookCopyIds = bookCopyIds;
    }
}

class ListBorrowRecordRequest {
    page: number;
    pageSize: number;
    notReturned: boolean;
    patronId: number;

    constructor(
        page: number = 1,
        pageSize: number = 10,
        notReturned: boolean = false,
        patronId: number = 0
    ) {
        this.page = page;
        this.pageSize = pageSize;
        this.notReturned = notReturned;
        this.patronId = patronId;
    }
}

class GetBorrowRecordDto {
    id: number;
    borrowDate: Date;
    dueDate: Date;
    isReturned: boolean;
    patronId: number;
    patronName: string;
    bookInfoList: GetBorrowRecordBookInfo[];

    constructor({
        id,
        borrowDate,
        dueDate,
        isReturned,
        patronId,
        patronName,
        bookInfoList
    }: {
        id: number;
        borrowDate: Date;
        dueDate: Date;
        isReturned: boolean;
        patronId: number;
        patronName: string;
        bookInfoList: GetBorrowRecordBookInfo[];
    }) {
        this.id = id;
        this.borrowDate = borrowDate;
        this.dueDate = dueDate;
        this.isReturned = isReturned;
        this.patronId = patronId;
        this.patronName = patronName;
        this.bookInfoList = bookInfoList;
    }
}

class GetBorrowRecordBookInfo {
    bookId: number;
    bookName: string;
    bookCopyBorrowInfoList: GetBorrowRecordBookCopyInfo[];

    constructor({
        bookId,
        bookName,
        bookCopyBorrowInfoList
    }: {
        bookId: number;
        bookName: string;
        bookCopyBorrowInfoList: GetBorrowRecordBookCopyInfo[];
    }) {
        this.bookId = bookId;
        this.bookName = bookName;
        this.bookCopyBorrowInfoList = bookCopyBorrowInfoList;
    }
}

class GetBorrowRecordBookCopyInfo {
    id: string;
    condition: string;

    constructor({ id, condition }: { id: string; condition: string }) {
        this.id = id;
        this.condition = condition;
    }
}

class GetBorrowRecordQuery {
    id: number;

    constructor(id: number) {
        this.id = id;
    }
}

class BorrowRecordBookInfo {
    bookId: number;
    bookCopyIds: string[];

    constructor(bookId: number, bookCopyIds: string[]) {
        this.bookId = bookId;
        this.bookCopyIds = bookCopyIds;
    }
}

class CreateBorrowRecordRequest {
    borrowRecordBooksInfo: BorrowRecordBookInfo[];
    dueDate: Date;
    patronId: number;

    constructor(borrowRecordBooksInfo: BorrowRecordBookInfo[], dueDate: Date, patronId: number) {
        this.borrowRecordBooksInfo = borrowRecordBooksInfo;
        this.dueDate = dueDate;
        this.patronId = patronId;
    }
}

class UpdateBorrowRecordRequest {
    borrowRecordId: number;
    dueDate: Date;

    constructor(borrowRecordId: number, dueDate: Date) {
        this.borrowRecordId = borrowRecordId;
        this.dueDate = dueDate;
    }
}

export {
    ListBorrowRecordResult,
    ListBorrowRecordBookRecord,
    ListBorrowRecordBookInfo,
    ListBorrowRecordRequest,
    GetBorrowRecordDto,
    GetBorrowRecordBookInfo,
    GetBorrowRecordBookCopyInfo,
    GetBorrowRecordQuery,
    BorrowRecordBookInfo,
    CreateBorrowRecordRequest,
    UpdateBorrowRecordRequest
};
