

export class CreateAuthorCommand{
    name: string;

    constructor(name: string){
        this.name = name;
    }
}

export class ListAuthorRequest{
    page: number;
    pageSize: number;
    searchName: string;

    constructor(page: number, pageSize: number, searchName: string){
        this.page = page;
        this.pageSize = pageSize;
        this.searchName = searchName;
    }
}

export class ListAuthorRecord{
    id: number;
    name: string;
    numberOfBooks: number;

    constructor(id: number, name: string, numberOfBooks: number){
        this.id = id;
        this.name = name;
        this.numberOfBooks = numberOfBooks;
    }
}


export class ListAuthorResult{
    authors: ListAuthorRecord[];
    totalNumberOfAuthors: number;

    constructor(authors: ListAuthorRecord[], totalNumberOfAuthors: number){
        this.authors = authors;
        this.totalNumberOfAuthors = totalNumberOfAuthors;
    }
}

export class UpdateAuthorRequest{
    id: number;
    name: string;

    constructor(id: number, name: string){
        this.id = id;
        this.name = name;
    }
}
