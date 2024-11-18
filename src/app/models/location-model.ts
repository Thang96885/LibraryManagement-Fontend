



export class ListLocationRequest{
    page: number;
    pageSize: number;
    locationId: number;
    SearchName: string;

    constructor(page: number, pageSize: number, locationId: number, SearchName: string){
        this.page = page;
        this.pageSize = pageSize;
        this.locationId = locationId;
        this.SearchName = SearchName;
    }
}

export class ListLocationRecord{
    id: number;
    name: string;
    numberOfBookLocated: number;

    constructor(Id: number, Name: string, NumberOfBookLocated: number){
        this.id = Id;
        this.name = Name;
        this.numberOfBookLocated = NumberOfBookLocated;
    }
}

export class ListLocationResult{
    locations: ListLocationRecord[];
    NumberLocations: number;

    constructor(locations: ListLocationRecord[], NumberLocations: number){
        this.locations = locations;
        this.NumberLocations = NumberLocations;
    }
}

export class LocationRecord{
    id: number;
    name: string;

    constructor(Id: number, Name: string){
        this.id = Id;
        this.name = Name;
    }
}


