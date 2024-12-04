import { useState, useEffect } from "react";
import { ListPublicationYearRecord, ListPublicationYearResult, ListPublicationYearRequest } from "@/app/models/publication-model";
import { PublicationService } from "@/app/services/PublicationService";
//import PublicationYearPopupForm, { PublicationYearPopupFormType } from "../popup/publication-year-popup-form";
import RoleGuard from "../auth/RoleGuard";
import PublicationYearPopupForm, { PublicationYearPopupFormType } from "../popup/publication-popup-form";

interface PublicationYearTableProps {
    listPublicationYearRecords: ListPublicationYearResult;
    publicationService: PublicationService;
    setPublicationYears: (publicationYears: ListPublicationYearResult) => void;
}

export default function PublicationYearTable({ listPublicationYearRecords, publicationService, setPublicationYears }: PublicationYearTableProps) {
    const [page, setPage] = useState(1);
    const [searchYear, setSearchYear] = useState(0);
    const [openForm, setOpenForm] = useState(false);
    const [formType, setFormType] = useState(PublicationYearPopupFormType.ADD);
    const [editPublicationYearInfo, setEditPublicationYearInfo] = useState(new ListPublicationYearRecord(0, 0, 0));

    useEffect(() => {
        publicationService.listPublicationYears({ page: page, pageSize: 10, searchYear: searchYear }).then((data) => {
            setPublicationYears(data);
        }).catch((error) => {
            console.error(error);
            alert("Failed to get publication years");
        })
    }, [page, searchYear, openForm]);

    const handlerEdit = (publicationYear: ListPublicationYearRecord) => {
        setEditPublicationYearInfo(publicationYear);
        setFormType(PublicationYearPopupFormType.EDIT);
        setOpenForm(true);
    }

    const handlerNext = () => {
        if (listPublicationYearRecords.totalNumberOfYears > page * 10)
            setPage(page + 1);
    }

    const handlerPrevious = () => {
        if (page > 1)
            setPage(page - 1);
    }

    const handlerRemove = async (publicationYear: ListPublicationYearRecord) => {
        

        const confirmed = window.confirm("Are you sure you want to delete this publication year?");
        if (confirmed) {
            await publicationService.deletePublicationYear(publicationYear.id).then((result) => {
                publicationService.listPublicationYears({ page: page, pageSize: 10, searchYear: searchYear }).then((data) => {
                    setPublicationYears(data);
                });
                if (result)
                    alert("Publication year deleted successfully");
                else
                    alert("Failed to delete publication year");
            }).catch((error) => {
                console.error("Failed to delete publication year:", error);
                alert("Failed to delete publication year");
            })
        }
    }

    const handlerSearch = () => {
        setPage(1);
    }

    return (
        <div className="table w-full p-2 mt-10">
            <div className="w-full flex justify-center">
                <div className="pt-2 relative m-5 text-gray-600">
                    <input onChange={(e) => setSearchYear(Number(e.target.value))} className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                        type="number" name="searchYear" placeholder="Search year" />
                </div>
                <div className="pt-2 relative m-4 text-gray-600">
                    <button className="bg-blue-500 p-2 rounded text-white hover:shadow-lg text-xl mr-3 font-thin" onClick={handlerSearch}>Search</button>
                </div>
            </div>

            <RoleGuard allowedRoles={["Admin"]}>
                <button
                    onClick={() => {
                        setFormType(PublicationYearPopupFormType.ADD);
                        setOpenForm(true);
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Add Publication Year
                </button>
            </RoleGuard>

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
                                Year
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                </svg>
                            </div>
                        </th>
                        <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                            <div className="flex items-center justify-center">
                                Number of Books
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
                    {listPublicationYearRecords.records.map((publicationYear) => (
                        <tr key={publicationYear.id} className="bg-gray-100 text-center border-b text-sm text-gray-600">
                            <td className="p-2 border-r">{publicationYear.id}</td>
                            <td className="p-2 border-r">{publicationYear.year}</td>
                            <td className="p-2 border-r">{publicationYear.numberOfBooks}</td>
                            <td>
                                <RoleGuard allowedRoles={["Admin"]}>
                                    <button onClick={() => { handlerEdit(new ListPublicationYearRecord(publicationYear.id, publicationYear.year, publicationYear.numberOfBooks)) }} className="bg-blue-500 p-2 m-1 rounded text-white hover:shadow-lg text-xs font-thin">Edit</button>
                                    <button onClick={() => { handlerRemove(publicationYear) }} className="bg-red-500 p-2 m-1 rounded text-white hover:shadow-lg text-xs font-thin" >
                                        Remove
                                    </button>
                                </RoleGuard>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={8}>
                            <div className="flex justify-between items-center px-4 py-3">
                                <div className="text-sm text-slate-500">
                                    Showing <b>{((page - 1) * 10 + 1)} - {page * 10} of {listPublicationYearRecords.totalNumberOfYears}</b>
                                </div>
                                <span className="p-2">{page}</span>
                                <button className="bg-blue-500 p-2 rounded text-white hover:shadow-lg text-xl mr-3 font-thin" onClick={handlerPrevious}>Previous</button>
                                <button className="bg-blue-500 p-2 rounded px-5 text-white hover:shadow-lg text-xl mr-3 font-thin" onClick={handlerNext}>Next</button>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>
            <PublicationYearPopupForm type={formType} open={openForm} setOpen={setOpenForm} publicationService={publicationService} editPublicationYearInfo={editPublicationYearInfo}></PublicationYearPopupForm>
        </div>
    );
}