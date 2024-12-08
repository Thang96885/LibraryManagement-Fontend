import { BookCopyDto, BookRecord, CreateBookCopyRequest, CreateBookRequest, DeleteBookCopyRequest, GetBookResult, ListBookQuery, ListBookRecord, UpdateBookCopyRequest, UpdateBookRequest } from "../models/book-model";
import { Base_URL } from "./BaseUrl";
import AuthService from "./AuthService";

const API_URL = Base_URL + "/api/Book";

export class ApiError extends Error {
  public status: number;
  public errorData: any;

  constructor(status: number, errorData: any) {
    super('API Error');
    this.name = 'ApiError'; // Set the name property
    this.status = status;
    this.errorData = errorData;
    Object.setPrototypeOf(this, ApiError.prototype); // Fix instanceof
  }
}

class BookService {
  async getBooks(request: ListBookQuery): Promise<ListBookRecord> {
    const filteredRequest = Object.fromEntries(
      Object.entries(request).filter(([_, value]) => {
        if (Array.isArray(value)) {
          return value.length > 0; // Keep the property if the array is not empty
        }
        return value != null; // Keep the property if it is not null or undefined
      })
    );

    delete filteredRequest.genreIds;

    var param = new URLSearchParams(filteredRequest as any).toString();
    var paramStr = param.toString();
    if (request.genreIds && request.genreIds.length > 0) {
      console.log(request.genreIds);
      request.genreIds.forEach((genreId) => {
        paramStr += "&genreIds=" + genreId;
      });
    }

    var response = await fetch(API_URL + "/list" + "?" + paramStr, { method: "GET" });
    console.log(response);
    if (response.ok) {
      var data = await response.json();
      var bookRecords = data.books.map((item: any) => BookRecord.fromJSON(item));

      return new ListBookRecord(data.numberOfBooks, bookRecords);
    } else {
      throw new Error("Failed to get books");
    }
  }

  async updateBook(book: UpdateBookRequest): Promise<boolean> {
    const response = await fetch(API_URL + "/update-bookInfo", {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book)
    });
    console.log(response);
    if (response.ok) {
      return true;
    } else {
      return false;
    }
  }

  async deleteBook(id: number): Promise<void> {
    const response = await fetch(API_URL + "/Delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id })
    });
    if (!response.ok) {
      throw new Error("Failed to delete book");
    }
  }

  async getBook(id: number): Promise<GetBookResult> {
    const response = await fetch(API_URL + "/get/" + id, { method: "GET" });
    console.log(response);
    if (response.ok) {
      var data = await response.json();
      return new GetBookResult(
        BookRecord.fromJSON(data.bookInfo),
        data.bookCopyList.map(
          (item: any) =>
            new BookCopyDto(
              item.ibns,
              item.acquisitionDate,
              item.status,
              item.price,
              item.bookPhysicalCondition
            )
        )
      );
    } else {
      throw new Error("Failed to get book");
    }
  }

  async createBook(book: CreateBookRequest): Promise<boolean> {
    const response = await fetch(API_URL + "/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book)
    });
    console.log(response);
    if (response.ok) {
      return true;
    } else {
      return false;
    }
  }

  async updateBookCopy(request: UpdateBookCopyRequest): Promise<boolean> {
    const response = await fetch(API_URL + "/update-book-copy", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request)
    });

    if (response.ok) {
      return true;
    } else {
      return false;
    }
  }

  async deleteBookCopyRequest(request: DeleteBookCopyRequest): Promise<boolean> {
    const response = await fetch(API_URL + "/delete-book-copy", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request)
    });
    console.log(response);
    if (response.ok) {
      return true;
    } else {
      return false;
    }
  }

  async addBookCopyRequest(request: CreateBookCopyRequest): Promise<boolean> {
    try {
      const response = await fetch(API_URL + "/add-book-copy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request)
      });

      if (!response.ok) {
        if (response.status === 400) {
          const errorData = await response.json();
          throw new ApiError(response.status, errorData);
        }
        throw new Error("Request failed");
      }
      return true;
    }
    catch (error) {
      throw error;
    }
  }
}

export default BookService;