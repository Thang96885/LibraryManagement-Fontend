import { useState, useEffect } from 'react';
import { BookRecord, GetBookResult, UpdateBookRequest } from '@/app/models/book-model';
import BookService from '@/app/services/BookService';
import styles from '@/app/components/form/style.module.css';
import { ListAuthorResult } from '@/app/models/author-model';
import { ListLocationResult } from '@/app/models/location-model';
import { ListPublicationYearResult } from '@/app/models/publication-model';
import AuthorService from '@/app/services/AuthorService';
import { LocationService } from '@/app/services/LocationService';
import { PublicationService } from '@/app/services/PublicationService';
import { AuthorSelect } from '../select/author-select';
import { GenreSelect } from '../select/genre-select';
import BookCopyTable from '../table/book-copy-table';
import RoleGuard from '../auth/RoleGuard';

export enum BookFormType {
    View = "View",
    Add = "Add",
    Edit = "Edit"
}

interface BookFormProps {
    bookId: number;
    type: BookFormType;
    setType: (type: BookFormType) => void;
}

export default function BookForm({ bookId, type, setType }: BookFormProps) {
    const [isDisabled, setDisabled] = useState(true);
    const [book, setBook] = useState<GetBookResult>(null);
    const [authors, setAuthors] = useState<ListAuthorResult>(new ListAuthorResult([], 0));
    const [locations, setLocations] = useState<ListLocationResult>(new ListLocationResult([], 0));
    const [publicationYears, setPublicationYears] = useState<ListPublicationYearResult>(new ListPublicationYearResult([], 0));
    const [dataChanged, setDataChanged] = useState(false);

    const [selectedAuthors, setSelectedAuthors] = useState<Option[]>(null);
    const [selectedGenres, setSelectedGenres] = useState<Option[]>(null);
    const [selectedLocation, setSelectedLocation] = useState(0);
    const [id, setId] = useState(0);
    const [title, setTitle] = useState("");
    const [publicationYearId, setPublicationYearId] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [bookImageUrl, setBookImageUrl] = useState("");
    const [description, setDescription] = useState("");

    const bookService = new BookService();
    const authorService = new AuthorService();
    const locationService = new LocationService();
    const publicationYearService = new PublicationService();

    useEffect(() => {
        if (type !== BookFormType.Add) {
            bookService.getBook(bookId).then((data) => {
                setBook(data);
                console.log(data);

                setSelectedAuthors(data.bookInfo.Authors.map((author) => ({ value: author.id, label: author.name })));
                setSelectedGenres(data.bookInfo.Genres.map((genre) => ({ value: genre.Id, label: genre.Name })));
                setSelectedLocation(data.bookInfo.Location.id);
                setId(data.bookInfo.id);
                setTitle(data.bookInfo.Title);
                setPublicationYearId(data.bookInfo.PublicationYear.id);
                setPageCount(data.bookInfo.PageCount);
                setBookImageUrl(data.bookInfo.ImageUrl);
                setDescription(data.bookInfo.Description);
            }).catch((error) => {
                console.error('Failed to fetch book details:', error);
                alert("Failed to get book");
            });
        }

        authorService.listAuthors({ page: 1, pageSize: 1000, searchName: "" }).then((data) => {
            setAuthors(data);
        });

        locationService.ListLocation({ page: 1, pageSize: 1000, locationId: 0, SearchName: "" }).then((data) => {
            setLocations(data);
        });

        publicationYearService.listPublicationYears({ page: 1, pageSize: 1000, searchYear: 0 }).then((data) => {
            setPublicationYears(data);
        });
    }, [bookId, type]);

    const handlerEdit = () => {
        setDisabled(!isDisabled);
    };
    const handlerSave = async () => {
        if(true){
            const request = new UpdateBookRequest(
                id,
                title,
                "", bookImageUrl, description, publicationYearId,
                pageCount, selectedLocation,
                selectedAuthors.map((author) => author.value),
                selectedGenres.map((genre) => genre.value),
            );
            const response = await bookService.updateBook(request);
            if(response){
                setType(BookFormType.View);
                setDisabled(true);
            } else {
                alert("Failed to update book");
            }
        }
    }

    return (
            <div className={styles.containerForm}>
                <div className={styles.bookImgForm}>
                <p>Book Cover</p>
                <img
                    src={bookImageUrl || "https://th.bing.com/th/id/OIP.kEKWG9WO-kIzLXqm6_khxgHaFS?w=201&h=180&c=7&r=0&o=5&dpr=1.6&pid=1.7"}
                    alt="Book Cover"
                />
                </div>
            <div className={styles.contentForm}>
                <h1>{type === BookFormType.Add ? "Add Book" : type === BookFormType.Edit ? "Edit Book" : "View Book"}</h1>
                <div className={styles.bookFormForm}>
                    <div className={styles.formRowForm}>
                        <div className={styles.infoForm}>
                            <label htmlFor="title">Book Title:</label>
                            <input
                                disabled={isDisabled}
                                type="text"
                                id="title"
                                name="title"
                                placeholder="Enter Book Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={styles.formRowForm}>
                        <div className={styles.infoForm}>
                            <label htmlFor="publication-year">Publication Year:</label>
                            <select
                                disabled={isDisabled}
                                id="publication-year"
                                name="publication-year"
                                value={publicationYearId || ""}
                                onChange={e => setPublicationYearId(Number(e.target.value))}
                            >
                                <option value="">Select Publication Year</option>
                                {publicationYears.records.map((year) => (
                                    <option key={year.id} value={year.id}>{year.year}</option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.infoForm}>
                            <label htmlFor="location">Location:</label>
                            <select
                                disabled={isDisabled}
                                id="location"
                                name="location"
                                value={selectedLocation || ""}
                                onChange={e => setSelectedLocation(Number(e.target.value))}
                            >
                                <option value="">Select Location</option>
                                {locations.locations.map((location) => (
                                    <option key={location.id} value={location.id}>{location.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className={styles.formRowForm}>
                        <div className={styles.infoForm}>
                            <label htmlFor="page-count">Page Count:</label>
                            <input
                                disabled={isDisabled}
                                type="number"
                                id="page-count"
                                name="page-count"
                                placeholder="Enter Page Count"
                                value={pageCount}
                                onChange={(e) => setPageCount(Number(e.target.value))}
                            />
                        </div>
                        <div className={styles.infoForm}>
                            <label htmlFor="number-of-copy">Number of Copies:</label>
                            <input
                                disabled={true}
                                type="number"
                                id="number-of-copy"
                                name="number-of-copy"
                                placeholder="Enter Number of Copies"
                                defaultValue={book?.bookInfo.NumberOfCopies}
                            />
                        </div>
                        <div className={styles.infoForm}>
                            <label htmlFor="number-available">Number Available:</label>
                            <input
                                disabled={true}
                                type="number"
                                id="number-available"
                                name="number-available"
                                placeholder="Enter Number Available"
                                defaultValue={book?.bookInfo.NumberAvailable}
                            />
                        </div>
                    </div>

                    <div className={styles.formRowForm}>
                        <div className={styles.infoForm}>
                            <label htmlFor="author">Author:</label>
                            <AuthorSelect
                                showNumberOfBooks={false}
                                selectAuthorId={selectedAuthors}
                                setSelectAuthorId={setSelectedAuthors}
                                isDisabled={isDisabled}
                            />
                        </div>

                        <div className={styles.infoForm}>
                            <label htmlFor="genre">Genre:</label>
                            <GenreSelect
                                showNumberOfBooks={false}
                                selectGenreId={selectedGenres}
                                setSelectGenreId={setSelectedGenres}
                                isDisabeld={isDisabled}
                            />
                        </div>
                    </div>

                    <div className={styles.formRowForm}>
                        <div className={styles.infoForm}>
                            <label htmlFor="img-url">Image URL:</label>
                            <input
                                disabled={isDisabled}
                                type="text"
                                id="img-url"
                                name="img-url"
                                placeholder="Enter Image URL"
                                value={bookImageUrl}
                                onChange={(e) => setBookImageUrl(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={styles.formRowForm}>
                        <div className={styles.infoForm}>
                            <label htmlFor="description">Description:</label>
                            <textarea
                                disabled={isDisabled}
                                id="description"
                                name="description"
                                placeholder="Enter Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    <RoleGuard allowedRoles={["Admin", "Librarian"]}>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => handlerEdit()}
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                            >
                                {isDisabled ? "Edit" : "Cancel"}
                            </button>
                            <button
                                type="button"
                                onClick={() => handlerSave()}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Save
                            </button>
                        </div>
                    </RoleGuard>
                    
                </div>
            </div>
            </div>
    );
}