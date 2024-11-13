import { BookRecord, ListBookQuery, ListBookRecord } from "../models/book-model";
import { ListQuery } from "../models/common-model";
import { Base_URL } from "./BaseUrl";
import AuthService from "./AuthService";

const API_URL = Base_URL + "/api/Book";

class BookService {
  async getBooks(request: ListBookQuery) : Promise<ListBookRecord> {
    var param = new URLSearchParams(request as any).toString();
    var response = await fetch(API_URL + "/list" + "?" + param, { method: "GET" });
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
      console.log(response);
      alert("Failed to delete book");
    }
    alert("Book deleted successfully");
  }
}


export default BookService;