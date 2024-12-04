import { ListAuthorRecord, ListAuthorResult } from "@/app/models/author-model";
import { BookRecord, ListBookRecord } from "@/app/models/book-model";
import { SelectOption } from "@/app/models/common-model";
import { ListGenreResult } from "@/app/models/genre-model";
import { ListLocationRecord, ListLocationResult } from "@/app/models/location-model";
import { ListPublicationYearResult } from "@/app/models/publication-model";
import AuthorService from "@/app/services/AuthorService";
import BookService from "@/app/services/BookService";
import { GenreService } from "@/app/services/GenreService";
import { LocationService } from "@/app/services/LocationService";
import { PublicationService } from "@/app/services/PublicationService";
import Link from "next/link";
import { useState, useEffect } from "react";
import Select from "react-tailwindcss-select";
import { Option, Options } from "react-tailwindcss-select/dist/components/type";
import { GenreSelect } from "../select/genre-select";

interface BookTableProps {
    listBookRecord: ListBookRecord;
    bookService: BookService;
    setBooks: (books: ListBookRecord) => void;
}

export default function BookTable({ listBookRecord, bookService, setBooks }: BookTableProps) {

    const [page, setPage] = useState(1);
    const [searchId, setSearchId] = useState(0);
    const [searchBookTitle, setSearchBookTitle] = useState("");
    const [searchAuthorId, setSearchAuthorId] = useState(0);
    const [searchGenreIds, setSearchGenreIds] = useState<Option[]>(null);
    const [filterBookAvailable, setFilterBookAvailable] = useState(false);
    const [locationIdSearch, setLocationIdSearch] = useState(0);
    const [searchPulicationYear, setSearchPublicationYear] = useState(0);

    const [locations, setLocations] = useState<ListLocationResult>(new ListLocationResult([], 0));
    const [authors, setAuthors] = useState<ListAuthorResult>(new ListAuthorResult([], 0));
    const [publicationYears, setPublicationYears] = useState<ListPublicationYearResult>(new ListPublicationYearResult([], 0));


    const locationService = new LocationService();
    const authorService = new AuthorService();
    const publicationYearService = new PublicationService();

    useEffect(() => {
        bookService.getBooks({
            page: page,
            pageSize: 10,
            bookId: searchId,
            authorId: searchAuthorId,
            bookTitle: searchBookTitle,
            locationId: locationIdSearch,
            isAvailable: filterBookAvailable,
            genreIds: searchGenreIds?.map((genre) => Number(genre.value)) || [],
            yearPublicationId: searchPulicationYear
        }).then((data) => {
            setBooks(data);
        });
    }, [page, searchId, searchBookTitle, searchAuthorId, locationIdSearch, filterBookAvailable, searchPulicationYear, searchGenreIds]);

    useEffect(() => {
        locationService.ListLocation({ page: 1, pageSize: 1000, locationId: 0, SearchName: "" }).then((data) => {
            setLocations(data);
        });

        authorService.listAuthors({ page: 1, pageSize: 1000, searchName: ""}).then((data) => {
            setAuthors(data);
        });
        
        publicationYearService.listPublicationYears({ page: 1, pageSize: 1000, searchYear: 0}).then((data) => {
            setPublicationYears(data);
        });
    }, []);

    const handlerDelete = (book: BookRecord) => {
        var alterMessage = "Are you sure you want to delete this book?";
        if(book.NumberOfCopies > 0){
            alterMessage = "This book still has copies. Are you sure you want to delete this book?";
        }
        if (!confirm(alterMessage)) {
            return;
        }

        bookService.deleteBook(book.id).then(() => {
            bookService.getBooks({
                page: page,
                pageSize: 10,
                bookId: searchId,
                authorId: searchAuthorId,
                bookTitle: searchBookTitle,
                locationId: locationIdSearch,
                isAvailable: filterBookAvailable,
                genreIds: searchGenreIds?.map((genre) => Number(genre.value)) || [],
                yearPublicationId: searchPulicationYear
            }).then((data) => {
                setBooks(data);
            });
        });
    }

    const handlerNext = () => {
        if (listBookRecord.totalNumberOfBooks > page * 10)
            setPage(page + 1);
    }

    const handlerPrevious = () => {
        if (page > 1)
            setPage(page - 1);
    }

    const handlerSearch = () => {
        setPage(1);
    }

    return (
        <div className="container mx-auto p-6">
            {/* Search Section */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
                <div className="flex flex-wrap gap-4 items-center">
                    <input
                        onChange={(e) => setSearchId(Number(e.target.value))}
                        className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="number"
                        placeholder="Search by ID"
                    />
                    <input
                        onChange={(e) => setSearchBookTitle(e.target.value)}
                        className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        placeholder="Search by Title"
                    />
                    <select
                        onChange={(e) => setLocationIdSearch(Number(e.target.value))}
                        className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value={0} >Select location</option>
                        {locations.locations.map((location) => (
                            <option key={location.id} value={location.id}>{location.name + " (" + location.numberOfBookLocated + ")"}</option>
                        ))}
                    </select>
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="available"
                            onChange={(e) => setFilterBookAvailable(e.target.checked)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="available" className="text-gray-700">Available only</label>
                    </div>
                </div>
                <div className="flex flex-wrap gap-4 items-center mt-4">
                    <div className="inline-flex flex-1 min-w-[200px] px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <GenreSelect isDisabeld={false} selectGenreId={searchGenreIds} setSelectGenreId={setSearchGenreIds}></GenreSelect>
                    </div>
                    <div className="inline-flex flex-1 min-w-[200px] px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <select
                            
                            onChange={(e) => setSearchAuthorId(Number(e.target.value))}
                            className="inline-flex flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value={0} >Select Author</option>
                            {authors.authors.map((author) => (
                                <option key={author.id} value={author.id}>{author.name + " (" + author.numberOfBooks + ")"}</option>
                            ))}
                        </select>
                    
                    </div>
                    <div className="inline-flex flex-1 min-w-[200px] px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <select
                            
                            onChange={(e) => setSearchPublicationYear(Number(e.target.value))}
                            className="inline-flex flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value={0}>Select publication year</option>
                            {publicationYears.records.map((year) => (
                                <option key={year.id} value={year.id}>{year.year + " (" + year.numberOfBooks + ")"}</option>
                            ))}
                        </select>
                    
                    </div>
                    

                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Publisher</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pages</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Copies</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {listBookRecord?.books?.map((book) => (
                                <tr key={book.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{book.id}</td>
                                    <td className="px-4 py-3 text-sm text-gray-900 max-w-xs truncate">{book.Title}</td>
                                    <td className="px-4 py-3 text-sm text-gray-900 max-w-xs truncate">{book?.Authors?.map((author) => (author.name + ",").toString())}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{book.PublisherName}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{book.PublicationYear.year}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{book.PageCount}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{book.Location.name}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{book.NumberOfCopies}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{book.NumberAvailable}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                                        <Link 
                                            href={`/admin/book/book-detail?id=${book.id}`}
                                            className="inline-flex items-center px-2 py-1 bg-green-600 text-white text-xs font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                        >
                                            View
                                        </Link>
                                        <button
                                            onClick={() => handlerDelete(book)}
                                            className="inline-flex items-center px-2 py-1 bg-red-600 text-white text-xs font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                                Delete
                                            </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination Section */}
            <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-gray-700">
                    Showing <span className="font-medium">{((page - 1) * 10) + 1}</span> to <span className="font-medium">{Math.min(page * 10, listBookRecord?.totalNumberOfBooks || 0)}</span> of{' '}
                    <span className="font-medium">{listBookRecord?.totalNumberOfBooks}</span> results
                </div>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={handlerPrevious}
                        disabled={page <= 1}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    <span className="text-gray-700">Page {page}</span>
                    <button
                        onClick={handlerNext}
                        disabled={!listBookRecord || listBookRecord.totalNumberOfBooks <= page * 10}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}