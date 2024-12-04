
export class CreatePublicationYearRequest{
    year: number;

    constructor(year: number){
        this.year = year;
    }
}

export class ListPublicationYearRequest{
    page: number;
    pageSize: number;
    searchYear: number;

    constructor(page: number, pageSize: number, searchYear: number){
        this.page = page;
        this.pageSize = pageSize;
        this.searchYear = searchYear;
    }
}

export class ListPublicationYearRecord{
    id: number;
    year: number;
    numberOfBooks: number;

    constructor(id: number, year: number, numberOfBooks: number){
        this.id = id;
        this.year = year;
        this.numberOfBooks = numberOfBooks;
    }
}

export class ListPublicationYearResult{
    records: ListPublicationYearRecord[];
    totalNumberOfYears: number;

    constructor(records: ListPublicationYearRecord[], totalRecords: number){
        this.records = records;
        this.totalNumberOfYears = totalRecords;
    }
}

export class UpdatePublicationYearRequest{
    id: number;
    year: number;

    constructor(id: number, year: number){
        this.id = id;
        this.year = year;
    }
}