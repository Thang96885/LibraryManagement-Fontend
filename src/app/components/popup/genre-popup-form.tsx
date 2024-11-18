import { CreateGenreRequest, GenreRecord, UpdateGenreRequest } from '@/app/models/genre-model';
import { useState, useEffect } from 'react';
import { GenreService } from '@/app/services/GenreService';

export enum GenrePopupFormType{
    ADD = "Add Genre",
    EDIT = "Edit Genre"
}

interface GenrePopupFormProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    type: GenrePopupFormType;
    editGenreInfo: GenreRecord;
    genreService: GenreService;
}

export default function GenrePopupForm({ open, setOpen, type, editGenreInfo, genreService } : GenrePopupFormProps) { {
    const [genreName, setGenreName] = useState('');

    const handleSubmit = async () => {
        if(type == GenrePopupFormType.ADD) {
            const result = await genreService.CreateGenre(new CreateGenreRequest(genreName));
            if(result) {
                alert('genre added');
            }
            else{
                alert('failed to add genre');
            }
        }
        else{
            const result =  await genreService.UpdateGenre(new UpdateGenreRequest(editGenreInfo.Id, genreName));
            if(result) {
                alert('genre updated');
            }
            else{
                alert('failed to update genre');
            }
        }
    };

    const handlerClose = () => {
        setOpen(!open);
    }


    if (open == false) {
        return null;
    }

    


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-1/3">
                <h2 className="text-2xl font-bold mb-4">{type.toString()}</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Genre Name</label>
                        <input
                            type="text"
                            value={genreName}
                            onChange={(e) => setGenreName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => setOpen(!open)}
                            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {handleSubmit();}}
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
        );
    }
}