import { useState, useEffect } from 'react';
import AuthorService from '@/app/services/AuthorService';
import { CreateAuthorCommand, UpdateAuthorRequest, ListAuthorRecord } from '@/app/models/author-model';

export enum AuthorPopupFormType {
    ADD = "Add Author",
    EDIT = "Edit Author"
}

interface AuthorPopupFormProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    type: AuthorPopupFormType;
    editAuthorInfo: ListAuthorRecord;
    authorService: AuthorService;
}

export default function AuthorPopupForm({ open, setOpen, type, editAuthorInfo, authorService }: AuthorPopupFormProps) {
    const [authorName, setAuthorName] = useState('');

    useEffect(() => {
        if (type === AuthorPopupFormType.EDIT) {
            setAuthorName(editAuthorInfo.name);
        }
    }, [editAuthorInfo, type]);

    const handleSubmit = async () => {
        if (type === AuthorPopupFormType.ADD) {
            const result = await authorService.createAuthor(new CreateAuthorCommand(authorName));
            if (result) {
                alert('Author added');
            } else {
                alert('Failed to add author');
            }
        } else {
            const result = await authorService.updateAuthor(new UpdateAuthorRequest(editAuthorInfo.id, authorName));
            if (result) {
                alert('Author updated');
            } else {
                alert('Failed to update author');
            }
        }
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-1/3">
                <h2 className="text-2xl font-bold mb-4">{type}</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Author Name</label>
                        <input
                            type="text"
                            value={authorName}
                            onChange={(e) => setAuthorName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
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