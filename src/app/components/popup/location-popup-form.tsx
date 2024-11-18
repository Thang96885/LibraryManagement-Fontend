import { CreateGenreRequest, GenreRecord, UpdateGenreRequest } from '@/app/models/genre-model';
import { useState, useEffect } from 'react';
import { GenreService } from '@/app/services/GenreService';
import { LocationRecord } from '@/app/models/location-model';
import { LocationService } from '@/app/services/LocationService';

export enum LocationPopupFormType{
    ADD = "Add Location",
    EDIT = "Edit Location"
}

interface LocationPopupFormProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    type: LocationPopupFormType;
    editLocaionInfo: LocationRecord;
    locationService: LocationService;
}

export default function LocationPopupForm({open, setOpen, type, editLocaionInfo, locationService} : LocationPopupFormProps) { {
    const [locationName, setLocationName] = useState('');

    const handleSubmit = async () => {
        if(type == LocationPopupFormType.ADD) {
            const result = await locationService.CreateLocation(locationName);
            if(result) {
                alert('location added');
            }
            else{
                alert('failed to add location');
            }
        }
        else{
            const result =  await locationService.UpdateLocation(editLocaionInfo.id, locationName);
            if(result) {
                alert('location updated');
            }
            else{
                alert('failed to update location');
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
                        <label className="block text-gray-700 mb-2">Location Name</label>
                        <input
                            type="text"
                            value={locationName}
                            onChange={(e) => setLocationName(e.target.value)}
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