import { CreateGenreRequest, GenreRecord, UpdateGenreRequest } from '@/app/models/genre-model';
import { useState, useEffect } from 'react';
import { GenreService } from '@/app/services/GenreService';
import { CreatePatronRequest, ListPatronRecord, PatronAddressDto, UpdatePatronRequest } from '@/app/models/patron-model';
import { PatronService } from '@/app/services/PatronService';
import { PatronTypeService } from '@/app/services/PatronTypeService';
import { ListPatronTypeResult } from '@/app/models/patron-type-model';

export enum PatronPopupFormType{
    ADD = "Add Patron",
    EDIT = "Edit Patron"
}

interface PatronPopupFormProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    type: PatronPopupFormType;
    editPatronInfo: ListPatronRecord;
    PatronService: PatronService;
}

export default function PatronPopupForm({ open, setOpen, type, editPatronInfo, PatronService } : PatronPopupFormProps) { {
    const [patronName, setPatronName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [patronTypeId, setPatronTypeId] = useState(1);
    const patronTypeService = new PatronTypeService();

    const [patronTypes, setPatronTypes] = useState<ListPatronTypeResult>(new ListPatronTypeResult([], 0));

    useEffect(() => {
        if(type == PatronPopupFormType.EDIT){
            setPatronName(editPatronInfo.name);
            setEmail(editPatronInfo.email);
            setPhoneNumber(editPatronInfo.phoneNumber);
            setAddress(editPatronInfo.city);
            setPatronTypeId(editPatronInfo.patronTypeId);
        }
    }, [editPatronInfo]);

    useEffect(() => {
        if(open == true)
        {
            patronTypeService.ListPatronType({page: 1, pageSize: 1000, searchId: 0, searchName: ""}).then((data) => {
                setPatronTypes(data);
            }).catch((error) => {
                console.error(error);
                alert("Failed to get patron types");
            })
            
        }
        
    }, [open]);

    const handleSubmit = async () => {
        if(type == PatronPopupFormType.EDIT) {
            const result = await PatronService.UpdatePatron(new UpdatePatronRequest(editPatronInfo.id, patronName, email, phoneNumber, address, patronTypeId));

            if(result) {
                alert('patron updated');
                setOpen(!open);
            }
            else{
                alert('failed to update patron');
            }
            return;
        }
        else{
            const result = await PatronService.CreatePatron(new CreatePatronRequest(patronName, email, phoneNumber, new PatronAddressDto("", address, "", ""), patronTypeId));

            if(result) {
                setOpen(!open);
                alert('patron added');
            }
            else{
                alert('failed to add patron');
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
                        <label className="block text-gray-700 mb-2">Name</label>
                        <input
                            type="text"
                            value={patronName}
                            onChange={(e) => setPatronName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Email address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                            
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Phone number</label>
                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                            maxLength={10}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Address</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div>
                    <label className="block text-gray-700 mb-2">Patron type</label>
                        <select required value={patronTypeId} onChange={(e) => setPatronTypeId(Number(e.target.value))} className="w-full p-2 border border-gray-300 rounded">
                            {patronTypes.listPatronTypeRecords.map((patronType) => {
                                return <option key={patronType.id} value={patronType.id}>{patronType.name}</option>
                            })}
                        </select>
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