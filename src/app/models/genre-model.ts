
class GenreRecord{
    Id: number;
    Name: string;

    constructor(Id: number, Name: string){
        this.Id = Id;
        this.Name = Name;
    }

    static fromJSON(json: any): GenreRecord {
        return new GenreRecord(
          json.id,
          json.name
        );
      }
}


export { GenreRecord };

