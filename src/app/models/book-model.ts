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


class BookRecord {
    id: number;
    Title: string;
    AuthorName: string;
    PublisherName: string;
    PublicationYear: number;
    PageCount: number;
    NumberOfCopies: number;
    NumberAvailable: number;
    Genres: GenreRecord[];

    constructor(id: number, Title: string, AuthorName: string, PublisherName: string, PublicationYear: number, PageCount: number, NumberOfCopies: number, NumberAvailable: number, Genres: GenreRecord[]){
        this.id = id;
        this.Title = Title;
        this.AuthorName = AuthorName;
        this.PublisherName = PublisherName;
        this.PublicationYear = PublicationYear;
        this.PageCount = PageCount;
        this.NumberOfCopies = NumberOfCopies;
        this.NumberAvailable = NumberAvailable;
        this.Genres = Genres;
    }

    static fromJSON(json: any): BookRecord {
        return new BookRecord(
          json.id,
          json.title,
          json.authorName,
          json.publisherName,
          json.publicationYear,
          json.pageCount,
          json.numberOfCopy,
          json.numberAvailable,
          json.genres.map(GenreRecord.fromJSON)
        );
      }
}

class ListBookQuery {
  page: number;
  pageSize: number;
  bookId: number;
  bookTitle: string;
  authorName: string;

  constructor(page: number, pageSize: number, bookId: number, bookTitle: string, authorName: string){
    this.page = page;
    this.pageSize = pageSize;
    this.bookId = bookId;
    this.bookTitle = bookTitle;
    this.authorName = authorName;
  }
}

export { BookRecord, ListBookRecord, ListBookQuery };