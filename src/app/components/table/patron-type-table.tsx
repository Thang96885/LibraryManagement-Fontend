

import { ListPatronTypeResult } from "@/app/models/patron-type-model";
import { PatronTypeService } from "@/app/services/PatronTypeService";
import Link from "next/link";
import { useState, useEffect } from "react";
import PatronTypePopupForm, { PatronTypePopupFormType } from "../popup/patron-type-form";


interface LocationTableProps {
    listPatronTypeRecords: ListPatronTypeResult;
    patronTypeService: PatronTypeService;
    setPatronTypes: (patronTypes : ListPatronTypeResult) => void;
}

export default function GenreTable({ listPatronTypeRecords, patronTypeService, setPatronTypes }: LocationTableProps) {
    const [page, setPage] = useState(1);
    const [searchId, setSearchId] = useState(0);
    const [searchPatronTypeName, setSearchPatronTypeName] = useState("");

    const [openForm, setOpenForm] = useState(false);
    const [formtype, setFormType] = useState(PatronTypePopupFormType.ADD);
    const [editPatronTypeId, setEditPatronTypeId] = useState(0);

    useEffect(() => {
        patronTypeService.ListPatronType({page: page, pageSize: 10, searchId: searchId, searchName: searchPatronTypeName}).then((data) => {
            setPatronTypes(data);
        }).catch((error) => {
            console.error(error);
            alert("Failed to get patron types");
        })
    }, [page, searchId, searchPatronTypeName]);

    const handlerEdit = (editId : number) => {
        setEditPatronTypeId(editId);
        setFormType(PatronTypePopupFormType.EDIT);
        setOpenForm(true);
    }

    const handlerNext = () => {
        if (listPatronTypeRecords.totalNumberOfPatronTypes > page * 10)
            setPage(page + 1);
        
    }

    const handlerPrevious = () => {
        if (page > 1)
            setPage(page - 1);
    }

    const handlerRemove = async (id: number) => {
        const confirmed = window.confirm("Are you sure you want to delete this patron type?");
        if (confirmed) {
            await patronTypeService.DeletePatronType(id).then((result) => {
                patronTypeService.ListPatronType({ page: page, pageSize: 10, searchId: searchId, searchName: searchPatronTypeName }).then((data) => {
                    setPatronTypes(data);
                });
                if(result == true)
                    alert("Patron type deleted successfully");
                else
                    alert("Failed to delete patron type");

            }).catch((error) => {
                console.error("Failed to delete patron type:", error);
            });
        }
    }

    const handlerSearch = () => {
        setPage(1);
    }

    return (
        <div className="table w-full p-2 mt-10">
            <div className="w-full flex justify-center">
                <div className="pt-2 relative m-5 text-gray-600">
                    <input onChange={(e) => setSearchId(Number(e.target.value))} className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                        type="number" name="searchId" placeholder="Search Id" />
                    
                    <input onChange={(e) => setSearchPatronTypeName(e.target.value)} className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                        type="text" name="searchId" placeholder="Search name" />
        
                </div>

                <div className="pt-2 relative m-4 text-gray-600">
                    <button className="bg-blue-500 p-2 rounded  text-white hover:shadow-lg text-xl mr-3 font-thin">Search</button>

                </div>

            </div>

            <button
                onClick={() => {
                    setFormType(PatronTypePopupFormType.ADD);
                    setOpenForm(true);
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Add Patron Type
            </button>

            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-50 border-b">
                        <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                            <div className="flex items-center justify-center">
                                ID
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                </svg>
                            </div>
                        </th>
                        <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                            <div className="flex items-center justify-center">
                                Name
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                </svg>
                            </div>
                        </th>
                        <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                            <div className="flex items-center justify-center">
                                Percent Discount
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                </svg>
                            </div>
                        </th>
                        <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                            <div className="flex items-center justify-center">
                                Number of Patrons
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                </svg>
                            </div>
                        </th>
                        <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                            <div className="flex items-center justify-center">
                                Action
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                </svg>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {listPatronTypeRecords.listPatronTypeRecords.map((typeRecord) => (
                        <tr key={typeRecord.id} className="bg-gray-100 text-center border-b text-sm text-gray-600">
                            <td className="p-2 border-r">{typeRecord.id}</td>
                            <td className="p-2 border-r">{typeRecord.name}</td>
                            <td className="p-2 border-r">{typeRecord.discountPercent}</td>
                            <td className="p-2 border-r">{typeRecord.numberOfPatrons}</td>
                            <td>
                                <button onClick={() => {handlerEdit(typeRecord.id)}} className="bg-blue-500 p-2 m-1 rounded text-white hover:shadow-lg text-xs font-thin">Edit</button>
                                <button onClick={() => {handlerRemove(typeRecord.id)}} className="bg-red-500 p-2 m-1 rounded text-white hover:shadow-lg text-xs font-thin" >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={8}>
                            <div className="flex justify-between items-center px-4 py-3">

                            <div className="text-sm text-slate-500">
                                 Showing <b>{((page - 1) * 10 + 1)} - {page * 10} of {listPatronTypeRecords.totalNumberOfPatronTypes }</b> 
                             </div>

                                <span className="p-2">{page}</span>
                                
                                <button className="bg-blue-500 p-2 rounded  text-white hover:shadow-lg text-xl mr-3 font-thin" onClick={handlerPrevious}>Previous</button>
                                <button className="bg-blue-500 p-2 rounded px-5 text-white hover:shadow-lg text-xl mr-3 font-thin" onClick={handlerNext}>Next</button>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>
            <PatronTypePopupForm open={openForm} setOpen={setOpenForm} patronTypeService={patronTypeService} editPatronTypeId={editPatronTypeId} type={formtype}></PatronTypePopupForm>
        </div>
    );
}