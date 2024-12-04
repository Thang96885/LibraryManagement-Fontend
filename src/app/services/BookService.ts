import { BookRecord, ListBookQuery, ListBookRecord } from "../models/book-model";
import { ListQuery } from "../models/common-model";
import { Base_URL } from "./BaseUrl";
import AuthService from "./AuthService";

const API_URL = Base_URL + "/api/Book";

class BookService {
  async getBooks(request: ListBookQuery) : Promise<ListBookRecord> {
    
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

  async getBook(id: number): Promise<BookRecord> {
    const response = await fetch(API_URL + "/get/" + id, { method: "GET"
     });
    console.log(response);
    if (response.ok) {
      var data = await response.json();
      return BookRecord.fromJSON(data);
    } else {
      throw new Error("Failed to get book");
    }
  }
}


export default BookService;