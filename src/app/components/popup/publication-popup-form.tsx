import { useState, useEffect } from 'react';
import { PublicationService } from '@/app/services/PublicationService';
import { CreatePublicationYearRequest, UpdatePublicationYearRequest, ListPublicationYearRecord } from '@/app/models/publication-model';

export enum PublicationYearPopupFormType {
    ADD = "Add Publication Year",
    EDIT = "Edit Publication Year"
}

interface PublicationPopupFormProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    type: PublicationYearPopupFormType;
    editPublicationYearInfo: ListPublicationYearRecord;
    publicationService: PublicationService;
}

export default function PublicationYearPopupForm({ open, setOpen, type, editPublicationYearInfo, publicationService }: PublicationPopupFormProps) {
    const [year, setYear] = useState(0);

    useEffect(() => {
        if (type === PublicationYearPopupFormType.EDIT) {
            setYear(editPublicationYearInfo.year);
        }
    }, [editPublicationYearInfo, type]);

    const handleSubmit = async () => {
        if (type === PublicationYearPopupFormType.ADD) {
            const result = await publicationService.createPublicationYear(new CreatePublicationYearRequest(year));
            if (result) {
                alert('Publication year added');
            } else {
                alert('Failed to add publication year');
            }
        } else {
            const result = await publicationService.updatePublicationYear(new UpdatePublicationYearRequest(editPublicationYearInfo.id, year));
            if (result) {
                alert('Publication year updated');
            } else {
                alert('Failed to update publication year');
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
                        <label className="block text-gray-700 mb-2">Publication Year</label>
                        <input
                            type="number"
                            value={year}
                            onChange={(e) => setYear(Number(e.target.value))}
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