



export class ListPatronTypeRequest{
    page: number;
    pageSize: number;
    searchId: number;
    searchName: string;

    constructor(page: number, pageSize: number, searchId: number, searchName: string){
        this.page = page;
        this.pageSize = pageSize;
        this.searchId = searchId;
        this.searchName = searchName;
    }
}


export class ListPatronTypeRecord{
    id: number;
    name: string;
    discountPercent: number;
    numberOfPatrons: number;

    constructor(Id: number, Name: string, DiscountPercent: number, NumberOfPatrons: number){
        this.id = Id;
        this.name = Name;
        this.discountPercent = DiscountPercent;
        this.numberOfPatrons = NumberOfPatrons;
    }
}


export class ListPatronTypeResult{
    listPatronTypeRecords: ListPatronTypeRecord[];
    totalNumberOfPatronTypes: number;

    constructor(listPatronTypeRecords: ListPatronTypeRecord[], totalNumberOfPatronTypes: number){
        this.listPatronTypeRecords = listPatronTypeRecords;
        this.totalNumberOfPatronTypes = totalNumberOfPatronTypes;
    }
}

export class CreatePatronTypeRequest{
    name: string;
    discountPercent: number;

    constructor(name: string, discountPercent: number){
        this.name = name;
        this.discountPercent = discountPercent;
    }
}


export class UpdatePatronTypeRequest{
    id: number;
    newName: string;
    newDiscountPercent: number;

    constructor(id: number, name: string, discountPercent: number){
        this.id = id;
        this.newName = name;
        this.newDiscountPercent = discountPercent;
    }
}
