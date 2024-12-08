import { List } from "postcss/lib/list";
import { GenreRecord } from "./genre-model";

class ListBookRecord{
  totalNumberOfBooks: number;
  books: BookRecord[];

  constructor(totalNumberOfBooks: number, books: BookRecord[]){
    this.totalNumberOfBooks = totalNumberOfBooks;
    this.books = books;
  }
}


class ListBookQuery {
  page: number;
  pageSize: number;
  bookId: number;
  bookTitle: string;
  authorId: number;
  locationId: number;
  yearPublicationId: number;
  isAvailable: boolean;
  genreIds: number[];

  constructor(page: number, 
      pageSize: number,
      bookId: number,
      bookTitle: string,
      authorId: number,
      locationId: number, 
      yearPublicationId: number, 
      isAvailable: boolean, 
      genreIds: number[]){

    this.page = page;
    this.pageSize = pageSize;
    this.bookId = bookId;
    this.bookTitle = bookTitle;
    this.authorId = authorId;
    this.locationId = locationId;
    this.yearPublicationId = yearPublicationId;
    this.isAvailable = isAvailable;
    this.genreIds = genreIds;
  }
}


class BookRecord {
    id: number;
    Title: string;
    Authors: AuthorDto[];
    PublisherName: string;
    PublicationYear: PublicationYearDto;
    PageCount: number;
    NumberOfCopies: number;
    NumberAvailable: number;
    Genres: GenreRecord[];
    Description: string;
    Location : LocationDto;
    ImageUrl: string;


    constructor(id: number, Title: string, Authors: AuthorDto[],
       PublisherName: string, PublicationYear: PublicationYearDto,
        PageCount: number, NumberOfCopies: number, NumberAvailable: number,
         Genres: GenreRecord[], Description: string, Location: LocationDto, ImageUrl: string = ""){
        this.id = id;
        this.Title = Title;
        this.Authors = Authors;
        this.PublisherName = PublisherName;
        this.PublicationYear = PublicationYear;
        this.PageCount = PageCount;
        this.NumberOfCopies = NumberOfCopies;
        this.NumberAvailable = NumberAvailable;
        this.Genres = Genres;
        this.Description = Description;
        this.Location = Location;
        this.ImageUrl = ImageUrl;
    }

    static fromJSON(json: any): BookRecord {
        return new BookRecord(
          json.id,
          json.title,
          json.authors,
          json.publisherName,
          json.publicationYear,
          json.pageCount,
          json.numberOfCopies,
          json.numberAvailable,
          json.genres.map(GenreRecord.fromJSON),
          json.description,
          new LocationDto(json.location.id, json.location.name),
          json.imageUrl
        );
      }
}

export class UpdateBookRequest{
  bookId: number;
  title: string;
  publisherName: string;
  imageUrl: string;
  description: string;
  publicationYearId: number;
  pageCount: number;
  locationId: number;
  authorIds: number[];
  genreIds: number[];

  constructor(bookId: number, title: string, publisherName: string, imageUrl: string, description: string, publicationYearId: number, pageCount: number, locationId: number, authorIds: number[], genreIds: number[]){
    this.bookId = bookId;
    this.title = title;
    this.publisherName = publisherName;
    this.imageUrl = imageUrl;
    this.description = description;
    this.publicationYearId = publicationYearId;
    this.pageCount = pageCount;
    this.locationId = locationId;
    this.authorIds = authorIds;
    this.genreIds = genreIds;
  }
}

export class CreateBookRequest{
  title: string;
  publisherName: string;
  imageUrl: string;
  description: string;
  publicationYearId: number;
  pageCount: number;
  locationId: number;
  authorIds: number[];
  genreIds: number[];

  constructor(title: string, publisherName: string, imageUrl: string, description: string, publicationYearId: number, pageCount: number, locationId: number, authorIds: number[], genreIds: number[]){
    this.title = title;
    this.publisherName = publisherName;
    this.imageUrl = imageUrl;
    this.description = description;
    this.publicationYearId = publicationYearId;
    this.pageCount = pageCount;
    this.locationId = locationId;
    this.authorIds = authorIds;
    this.genreIds = genreIds;
  }
}

export class LocationDto{
  id: number;
  name: string;

  constructor(id: number, name: string){
    this.id = id;
    this.name = name;
  }
}

export class AuthorDto{
  id: number;
  name: string;

  constructor(id: number, name: string){
    this.id = id;
    this.name = name;
  }
}


export class PublicationYearDto{
  id: number;
  year: number;

  constructor(id: number, year: number){
    this.id = id;
    this.year = year;
  }
}

export class BookCopyDto{
  ibns: string;
  acquisitionDate: Date;
  status: string;
  price: number;
  bookPhysicalCondition: string;

  constructor(iBSN: string, acquisitionDate: Date, status: string, price: number, bookPhysicalCondition: string){
    this.ibns = iBSN;
    this.acquisitionDate = acquisitionDate;
    this.status = status;
    this.price = price;
    this.bookPhysicalCondition = bookPhysicalCondition;
  }
}

export class GetBookResult{
  bookInfo: BookRecord;
  bookCopyList: BookCopyDto[];

  constructor(bookInfo: BookRecord, bookCopyList: BookCopyDto[]){
    this.bookInfo = bookInfo;
    this.bookCopyList = bookCopyList;
  }
}

export class UpdateBookCopyRequest{
  bookId: number;
  bookCopyIbns: string;
  status: string;
  price: number;
  condition: string;

  constructor(bookId: number, bookCopyIbns: string, status: string, price: number, condition: string){
    this.bookId = bookId;
    this.bookCopyIbns = bookCopyIbns;
    this.status = status;
    this.price = price;
    this.condition = condition;
  }
}

export class DeleteBookCopyRequest{
  bookId: number;
  bookCopyId: string;

  constructor(bookId: number, bookCopyId: string){
    this.bookId = bookId;
    this.bookCopyId = bookCopyId;
  }
}

export class CreateBookCopyRequest{
  bookId: number;
  iBNSCodes: string[];
  price: number;

  constructor(bookId: number, iBNSCodes: string[], price: number){
    this.bookId = bookId;
    this.iBNSCodes = iBNSCodes;
    this.price = price;
  }
}

export enum BookStatus{
  None = "",
  Available = "Available",
  Borrowed = "Borrowed",
  UnderMaintenance = "Under Maintenance",
  Lost  = "Lost",
}

export enum BookPhysicalCondition{
  None = "",
  New = "New",         
  Good = "Good",
  Fair = "Fair",
  Damaged = "Damaged",
}




export { BookRecord, ListBookRecord, ListBookQuery };