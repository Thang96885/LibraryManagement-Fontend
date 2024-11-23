import { UpdateGenreRequest } from "@/app/models/genre-model";
import { CreatePatronTypeRequest, UpdatePatronTypeRequest } from "@/app/models/patron-type-model";
import { PatronTypeService } from "@/app/services/PatronTypeService";
import { useState } from "react";


export enum PatronTypePopupFormType{
    ADD = "Add Patron type",
    EDIT = "Edit Patron type"
}

interface PatronTypePopupFormProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    type: PatronTypePopupFormType;
    editPatronTypeId: number;
    patronTypeService: PatronTypeService;
}

export default function PatronTypePopupForm({open, setOpen, type, editPatronTypeId, patronTypeService} : PatronTypePopupFormProps) { {
    const [patronTypeName, setPatronTypeName] = useState('');
    const [discountPercent, setDiscountPercent] = useState(0);


    const handleSubmit = async () => {
        if(type == PatronTypePopupFormType.ADD) {
            const result = await patronTypeService.CreatePatronType(new CreatePatronTypeRequest(patronTypeName, discountPercent));
            if(result) {
                alert('patron type added');
            }
            else{
                alert('failed to add patron type');
            }
        }
        else{
            const result =  await patronTypeService.UpdatePatronType(new UpdatePatronTypeRequest(editPatronTypeId, patronTypeName, discountPercent));

            if(result)
                alert('patron type updated');
            else
                alert('failed to update patron type');
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
                        <label className="block text-gray-700 mb-2">Patron Type Name</label>
                        <input
                            type="text"
                            value={patronTypeName}
                            onChange={(e) => setPatronTypeName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Discount Percent</label>
                        <input
                            type="number"
                            value={discountPercent}
                            onChange={(e) => setDiscountPercent(Number(e.target.value))}
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