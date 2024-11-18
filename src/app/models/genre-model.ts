
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

export class ListGenreResult{
  genres : ListGenreRecord[];
  NumberGenres : number;

  constructor(genres: ListGenreRecord[], NumberGenres: number){
      this.genres = genres;
      this.NumberGenres = NumberGenres;
  }
}

class ListGenreRecord{
  id : number;
  name : string;
  numberBook : number;

  constructor(Id: number, Name: string, NumberBook: number){
      this.id = Id;
      this.name = Name;
      this.numberBook = NumberBook;
  }
}

class ListGenreRequest{
  page: number;
  pageSize: number;
  genreId : number;
  SearchName: string;

  constructor(page: number, pageSize: number, genreId: number, SearchName: string){
      this.page = page;
      this.pageSize = pageSize;
      this.genreId = genreId;
      this.SearchName = SearchName;
  }
}


export class UpdateGenreRequest{
  id: number;
  name: string;

  constructor(id: number, name: string){
    this.id = id;
    this.name = name;
  }
}

export class CreateGenreRequest{
  genreName: string;

  constructor(genreName: string){
    this.genreName = genreName;
  }
}


export { GenreRecord, ListGenreRecord, ListGenreRequest };

