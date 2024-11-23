import { ListPatronRecord, ListPatronRequest, ListPatronResult } from "@/app/models/patron-model";
import { ListPatronTypeRequest, ListPatronTypeResult } from "@/app/models/patron-type-model";
import { PatronService } from "@/app/services/PatronService";
import { useEffect, useState } from "react";
import PatronPopupForm, { PatronPopupFormType } from "../popup/patron-popup-form";





interface PatronTableProps {
    listPatronRecords: ListPatronResult;
    patronService: PatronService;
    setPatrons: (patrons : ListPatronResult) => void;
}

export default function PatronTable({ listPatronRecords, patronService: patronService, setPatrons }: PatronTableProps) {
    const [page, setPage] = useState(1);
    const [searchId, setSearchId] = useState(0);
    const [searchPatronName, setSearchPatronName] = useState("");
    const [searchEmail, setSearchEmail] = useState("");
    const [editPatronInfo, setEditPatronInfo] = useState<ListPatronRecord>(new ListPatronRecord(0, "", "", "", "", "", "", 0, 0, 0, ""));
    const [formType, setFormType] = useState(PatronPopupFormType.ADD);

    const [openForm, setOpenForm] = useState(false);
    
    const [editPatronId, setEditPatronId] = useState(0);

    useEffect(() => {
        patronService.ListPatron(new ListPatronRequest(page, 10, searchId, searchPatronName, searchEmail)).then((data) => {
            setPatrons(data);
        }).catch((error) => {
            console.error(error);
            alert("Failed to get patrons");
        })
    }, [page, searchId, searchPatronName, searchEmail, openForm]);

    const handlerNext = () => {
        if (listPatronRecords.totalNumberOfPatrons > page * 10)
            setPage(page + 1);
        
    }

    const handlerPrevious = () => {
        if (page > 1)
            setPage(page - 1);
    }

    const handlerRemove = (id: number) => {
        var alter = confirm("Are you sure you want to delete this patron?");
        if (alter) {
            patronService.DeletePatron(id).then((data) => {
                if (data) {
                    patronService.ListPatron(new ListPatronRequest(page, 10, searchId, searchPatronName, searchEmail)).then((data) => {
                        setPatrons(data);
                    }).catch((error) => {
                        console.error(error);
                        alert("Failed to get patrons");
                    })
                }
                else{
                    alert("Failed to delete patron");
                }
            }).catch((error) => {
                console.error(error);
                alert("Failed to delete patron");
            })
        }
    }

    const handlerEdit = (record: ListPatronRecord) => {
        setEditPatronInfo(record);
        setFormType(PatronPopupFormType.EDIT);
        setOpenForm(true);
    }

    const handlerAdd = () => {
        setFormType(PatronPopupFormType.ADD);
        setOpenForm(true);
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
                    
                    <input onChange={(e) => setSearchPatronName(e.target.value)} className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                        type="text" name="searchId" placeholder="Search name" />
                    
                    <input onChange={(e) => setSearchEmail(e.target.value)} className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                        type="text" name="searchId" placeholder="Search Email" />
        
                </div>

                <div className="pt-2 relative m-4 text-gray-600">
                    <button className="bg-blue-500 p-2 rounded  text-white hover:shadow-lg text-xl mr-3 font-thin">Search</button>

                </div>

            </div>

            <button
                onClick={() => {
                    handlerAdd();
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Add Patron
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
                                Patron Name
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                </svg>
                            </div>
                        </th>
                        <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                            <div className="flex items-center justify-center">
                                Email
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                </svg>
                            </div>
                        </th>
                        <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                            <div className="flex items-center justify-center">
                                Phone Number
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                </svg>
                            </div>
                        </th>
                        <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                            <div className="flex items-center justify-center">
                                Address
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                </svg>
                            </div>
                        </th>
                        <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                            <div className="flex items-center justify-center">
                                Patron type
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                </svg>
                            </div>
                        </th>
                        <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                            <div className="flex items-center justify-center">
                                Borrow records
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                </svg>
                            </div>
                        </th>
                        <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                            <div className="flex items-center justify-center">
                                Return records
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
                    {listPatronRecords.records.map((patron) => (
                        <tr key={patron.id} className="bg-gray-100 text-center border-b text-sm text-gray-600">
                            <td className="p-2 border-r">{patron.id}</td>
                            <td className="p-2 border-r">{patron.name}</td>
                            <td className="p-2 border-r">{patron.email}</td>
                            
                            <td className="p-2 border-r">{patron.phoneNumber}</td>
                            <td className="p-2 border-r">{patron.street + " " + patron.city}</td>
                            <td className="p-2 border-r">{patron.patronTypeName}</td>
                            <td className="p-2 border-r">{patron.borrowRecordCount}</td>
                            <td className="p-2 border-r">{patron.returnRecordCount}</td>
                            <td>
                                <button onClick={() => {handlerEdit(patron)}} className="bg-blue-500 p-2 m-1 rounded text-white hover:shadow-lg text-xs font-thin">Edit</button>
                                <button onClick={() => {handlerRemove(patron.id)}} className="bg-red-500 p-2 m-1 rounded text-white hover:shadow-lg text-xs font-thin" >
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
                                 Showing <b>{((page - 1) * 10 + 1)} - {page * 10} of {listPatronRecords.totalNumberOfPatrons }</b> 
                             </div>

                                <span className="p-2">{page}</span>
                                
                                <button className="bg-blue-500 p-2 rounded  text-white hover:shadow-lg text-xl mr-3 font-thin" onClick={handlerPrevious}>Previous</button>
                                <button className="bg-blue-500 p-2 rounded px-5 text-white hover:shadow-lg text-xl mr-3 font-thin" onClick={handlerNext}>Next</button>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>
            <PatronPopupForm type={formType} open={openForm} setOpen={setOpenForm} PatronService={patronService} editPatronInfo={editPatronInfo}></PatronPopupForm>
        </div>
    );
}