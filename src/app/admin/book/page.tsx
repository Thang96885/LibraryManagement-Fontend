"use client"

import BookService from "../../services/BookService";
import { useState } from "react";
import BookTable from "../../components/table/book-table";
import { BookRecord } from "../../models/book-model";
import AuthService from "../../services/AuthService";

export default function Book() {

    const [books, setBooks] = useState<BookRecord[]>([]);
    const bookService = new BookService();

  return (
    <div>
      <BookTable listBookRecord={books} bookService={bookService} setBooks={setBooks}></BookTable>
    </div>
  );
}