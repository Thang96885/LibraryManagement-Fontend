import { UpdateGenreRequest } from "@/app/models/genre-model";
import { CreatePatronTypeRequest, ListPatronTypeRecord, UpdatePatronTypeRequest } from "@/app/models/patron-type-model";
import { PatronTypeService } from "@/app/services/PatronTypeService";
import { useEffect, useState } from "react";


export enum PatronTypePopupFormType{
    ADD = "Add Patron type",
    EDIT = "Edit Patron type"
}

interface PatronTypePopupFormProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    type: PatronTypePopupFormType;
    patrontypeEdit: ListPatronTypeRecord;
    patronTypeService: PatronTypeService;
}

export default function PatronTypePopupForm({open, setOpen, type, patrontypeEdit, patronTypeService} : PatronTypePopupFormProps) { {
    const [patronTypeName, setPatronTypeName] = useState('');
    const [discountPercent, setDiscountPercent] = useState(0);


    useEffect(() => {
        if(type == PatronTypePopupFormType.EDIT){
            setPatronTypeName(patrontypeEdit.name);
            setDiscountPercent(patrontypeEdit.discountPercent);
        }
        else
        {
            setPatronTypeName('');
            setDiscountPercent(0);
        }
    }, [patrontypeEdit, open]);

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
            console.log(discountPercent);
            const result =  await patronTypeService.UpdatePatronType(new UpdatePatronTypeRequest(patrontypeEdit.id, patronTypeName, discountPercent));

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