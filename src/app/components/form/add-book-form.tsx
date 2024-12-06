import { useState, useEffect } from 'react';
import styles from '@/app/components/form/style.module.css';
import { AuthorSelect } from '../select/author-select';
import { GenreSelect } from '../select/genre-select';
import { ListPublicationYearResult } from '@/app/models/publication-model';
import { ListLocationResult } from '@/app/models/location-model';
import { LocationService } from '@/app/services/LocationService';
import { PublicationService } from '@/app/services/PublicationService';
import BookService from '@/app/services/BookService';
import { CreateBookRequest } from '@/app/models/book-model';
import { useRouter } from 'next/navigation';


export default function AddBookForm() {
    const router = useRouter();

    const [isDisabled, setDisabled] = useState(false);
    const [selectedAuthors, setSelectedAuthors] = useState<Option[]>(null);
    const [selectedGenres, setSelectedGenres] = useState<Option[]>(null);
    const [selectedLocation, setSelectedLocation] = useState(0);
    const [id, setId] = useState(0);
    const [title, setTitle] = useState("");
    const [publicationYearId, setPublicationYearId] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [bookImageUrl, setBookImageUrl] = useState("");
    const [description, setDescription] = useState("");

    const [locations, setLocations] = useState<ListLocationResult>(new ListLocationResult([], 0));
    const [publicationYears, setPublicationYears] = useState<ListPublicationYearResult>(new ListPublicationYearResult([], 0));

    const locationService = new LocationService();
    const publicationYearService = new PublicationService();
    const bookService = new BookService();

    
    const [errors, setErrors] = useState({
        selectedAuthors: "",
        selectedGenres: "",
        selectedLocation: "",
        title: "",
        publicationYearId: "",
        pageCount: "",
        bookImageUrl: "",
        description: ""
    });

    useEffect(() => {
        locationService.ListLocation({ page: 1, pageSize: 1000, locationId: 0, SearchName: "" }).then((data) => {
            setLocations(data);
        });

        publicationYearService.listPublicationYears({ page: 1, pageSize: 1000, searchYear: 0 }).then((data) => {
            setPublicationYears(data);
        });
    }, []);
    

    const validate = () => {
        let valid = true;
        let errors = {
            selectedAuthors: "",
            selectedGenres: "",
            selectedLocation: "",
            title: "",
            publicationYearId: "",
            pageCount: "",
            bookImageUrl: "",
            description: ""
        };

        if (selectedAuthors == null || selectedAuthors.length === 0) {
            errors.selectedAuthors = "At least one author is required";
            valid = false;
        }

        if (selectedGenres == null || selectedGenres.length === 0) {
            errors.selectedGenres = "At least one genre is required";
            valid = false;
        }

        if (selectedLocation === 0) {
            errors.selectedLocation = "Location is required";
            valid = false;
        }

        if (!title) {
            errors.title = "Title is required";
            valid = false;
        }

        if (publicationYearId === 0) {
            errors.publicationYearId = "Publication year is required";
            valid = false;
        }

        if (pageCount === 0) {
            errors.pageCount = "Page count is required";
            valid = false;
        }

        if (!bookImageUrl) {
            errors.bookImageUrl = "Image URL is required";
            valid = false;
        }

        if (!description) {
            errors.description = "Description is required";
            valid = false;
        }

        setErrors(errors);
        return valid;
    };

    const handleSubmit = async () => {
        var request = new CreateBookRequest(title, "", bookImageUrl, 
            description, publicationYearId, pageCount, selectedLocation, selectedAuthors.map((item) => item.value), selectedGenres.map((item) => item.value));
        if (validate()) {
            var request = new CreateBookRequest(title, "", bookImageUrl, 
                description, publicationYearId, pageCount, selectedLocation, selectedAuthors.map((item) => item.value), selectedGenres.map((item) => item.value));
            const result = await bookService.createBook(request);
            console.log(JSON.stringify(request));
            if (result) {
                alert("Book added successfully");
                window.location.href = "/admin/book";
            }
            else
            {
                alert("Failed to add book");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.containerForm}>
            <div className={styles.bookImgForm}>
                <p>Book Cover</p>
                <img
                    src={bookImageUrl || "https://i1.sndcdn.com/artworks-zEXddSDiXCzwYPei-eldnCg-t500x500.jpg"}
                    alt="Book Cover"
                />
            </div>
            <div className={styles.contentForm}>
                <h1>Add Book</h1>
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
                            {errors.title && <span className={styles.error}>{errors.title}</span>}
                        </div>
                    </div>

                    <div className={styles.formRowForm}>
                        <div className={styles.infoForm}>
                            <label htmlFor="publication-year">Publication Year:</label>
                            <select
                                disabled={isDisabled}
                                id="publication-year"
                                name="publication-year"
                                value={publicationYearId}
                                onChange={(e) => setPublicationYearId(Number(e.target.value))}
                            >
                                <option value="">Select Publication Year</option>
                                {publicationYears.records.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.year}
                                    </option>
                                ))}
                            </select>
                            {errors.publicationYearId && <span className={styles.error}>{errors.publicationYearId}</span>}
                        </div>
                        <div className={styles.infoForm}>
                            <label htmlFor="location">Location:</label>
                            <select
                                disabled={isDisabled}
                                id="location"
                                name="location"
                                value={selectedLocation}
                                onChange={(e) => setSelectedLocation(Number(e.target.value))}
                            >
                                <option value="">Select Location</option>
                                {locations.locations.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                            {errors.selectedLocation && <span className={styles.error}>{errors.selectedLocation}</span>}
                        </div>
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
                            {errors.pageCount && <span className={styles.error}>{errors.pageCount}</span>}
                        </div>
                    </div>

                    <div className={styles.formRowForm}>
                        <div className={styles.infoForm}>
                            <label htmlFor="author">Author:</label>
                            <AuthorSelect
                                selectAuthorId={selectedAuthors}
                                setSelectAuthorId={setSelectedAuthors}
                                isDisabled={isDisabled}
                            />
                            {errors.selectedAuthors && <span className={styles.error}>{errors.selectedAuthors}</span>}
                        </div>

                        <div className={styles.infoForm}>
                            <label htmlFor="genre">Genre:</label>
                            <GenreSelect
                                selectGenreId={selectedGenres}
                                setSelectGenreId={setSelectedGenres}
                                isDisabeld={isDisabled}
                            />
                            {errors.selectedGenres && <span className={styles.error}>{errors.selectedGenres}</span>}
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
                            {errors.bookImageUrl && <span className={styles.error}>{errors.bookImageUrl}</span>}
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
                            {errors.description && <span className={styles.error}>{errors.description}</span>}
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={() => {handleSubmit()}}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}