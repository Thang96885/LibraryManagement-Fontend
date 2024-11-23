


export class ListPatronRequest{
    page: number;
    pageSize: number;
    searchId: number;
    searchPatronName: string;
    searchEmail: string;

    constructor(page: number, pageSize: number, searchId: number, searchPatronName: string, searchEmail: string){
        this.page = page;
        this.pageSize = pageSize;
        this.searchId = searchId;
        this.searchPatronName = searchPatronName;
        this.searchEmail = searchEmail;
    }
}

export class ListPatronRecord{
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    street: string;
    city: string;
    state: string;
    borrowRecordCount: number;
    returnRecordCount: number;
    patronTypeId: number;
    patronTypeName: string;

    constructor (id: number, name: string, email: string, phoneNumber: string, street: string, city: string, state: string, borrowRecordCount: number, returnRecordCount: number, patronTypeId: number, PatronTypeName: string){
        this.id = id;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.street = street;
        this.city = city;
        this.state = state;
        this.borrowRecordCount = borrowRecordCount;
        this.returnRecordCount = returnRecordCount;
        this.patronTypeId = patronTypeId;
        this.patronTypeName = PatronTypeName;
    }
}


export class ListPatronResult{
    records: ListPatronRecord[];
    totalNumberOfPatrons: number;

    constructor(records: ListPatronRecord[], totalNumberOfPatrons: number){
        this.records = records;
        this.totalNumberOfPatrons = totalNumberOfPatrons;
    }
}

export class PatronAddressDto{
    street: string;
    city: string;
    state: string;
    zipCode: string;

    constructor(street: string, city: string, state: string, zipCode: string){
        this.street = street;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
    }
}

export class CreatePatronRequest{
    name: string;
    email: string;
    phoneNumber: string;
    address: PatronAddressDto;
    patronTypeId: number;

    constructor(name: string, email: string, phoneNumber: string, address: PatronAddressDto, patronTypeId: number){
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.patronTypeId = patronTypeId;
    }
}


export class UpdatePatronRequest{
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    patronTypeId: number;

    constructor(id: number, name: string, email: string, phoneNumber: string, address: string, patronTypeId: number){
        this.id = id;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.patronTypeId = patronTypeId;
    }
}