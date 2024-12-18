import { useState, useEffect } from "react";
import { ListAuthorRecord, ListAuthorResult, ListAuthorRequest } from "@/app/models/author-model";
import AuthorService from "@/app/services/AuthorService";
import RoleGuard from "../auth/RoleGuard";
import AuthorPopupForm, { AuthorPopupFormType } from "../popup/author-popup-form";



interface AuthorTableProps {
    listAuthorRecords: ListAuthorResult;
    authorService: AuthorService;
    setAuthors: (authors: ListAuthorResult) => void;
}

export default function AuthorTable({ listAuthorRecords, authorService, setAuthors }: AuthorTableProps) {
    const [page, setPage] = useState(1);
    const [searchId, setSearchId] = useState(0);
    const [searchAuthorName, setSearchAuthorName] = useState("");
    const [openForm, setOpenForm] = useState(false);
    const [formType, setFormType] = useState(AuthorPopupFormType.ADD);
    const [editAuthorInfo, setEditAuthorInfo] = useState(new ListAuthorRecord(0, "", 0));

    useEffect(() => {
        authorService.listAuthors({ page: page, pageSize: 10, searchName: searchAuthorName }).then((data) => {
            setAuthors(data);
        }).catch((error) => {
            console.error(error);
            alert("Failed to get authors");
        })
    }, [page, searchId, searchAuthorName, openForm]);

    const handlerEdit = (author: ListAuthorRecord) => {
        setEditAuthorInfo(author);
        setFormType(AuthorPopupFormType.EDIT);
        setOpenForm(true);
    }

    const handlerNext = () => {
        if (listAuthorRecords.totalNumberOfAuthors > page * 10)
            setPage(page + 1);
    }

    const handlerPrevious = () => {
        if (page > 1)
            setPage(page - 1);
    }

    const handlerRemove = async (author: ListAuthorRecord) => {
        if(author.numberOfBooks > 0){
            alert("Author still has books.");
            return;
        }
        const confirmed = window.confirm("Are you sure you want to delete this author?");
        if (confirmed) {
            await authorService.deleteAuthor(author.id).then((result) => {
                authorService.listAuthors({ page: page, pageSize: 10, searchName: searchAuthorName }).then((data) => {
                    setAuthors(data);
                });
            }).catch((error) => {
                console.error("Failed to delete author:", error);
                alert("Failed to delete author");
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
                    <input onChange={(e) => setSearchId(Number(e.target.value))} className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                        type="number" name="searchId" placeholder="Search Id" />
                </div>
                <div className="pt-2 relative m-5 text-gray-600">
                    <input onChange={(e) => setSearchAuthorName(e.target.value)} className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                        type="text" name="searchName" placeholder="Search name" />
                </div>
                <div className="pt-2 relative m-4 text-gray-600">
                    <button className="bg-blue-500 p-2 rounded text-white hover:shadow-lg text-xl mr-3 font-thin" onClick={handlerSearch}>Search</button>
                </div>
            </div>

            <RoleGuard allowedRoles={["Admin"]}>
                <button
                    onClick={() => {
                        setFormType(AuthorPopupFormType.ADD);
                        setOpenForm(true);
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Add Author
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
                                Name
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
                    {listAuthorRecords.authors?.map((author) => (
                        <tr key={author.id} className="bg-gray-100 text-center border-b text-sm text-gray-600">
                            <td className="p-2 border-r">{author.id}</td>
                            <td className="p-2 border-r">{author.name}</td>
                            <td className="p-2 border-r">{author.numberOfBooks}</td>
                            <td>
                                <RoleGuard allowedRoles={["Admin"]}>
                                    <button onClick={() => { handlerEdit(new ListAuthorRecord(author.id, author.name, author.numberOfBooks)) }} className="bg-blue-500 p-2 m-1 rounded text-white hover:shadow-lg text-xs font-thin">Edit</button>
                                    <button onClick={() => { handlerRemove(author) }} className="bg-red-500 p-2 m-1 rounded text-white hover:shadow-lg text-xs font-thin" >
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
                                    Showing <b>{((page - 1) * 10 + 1)} - {page * 10} of {listAuthorRecords.totalNumberOfAuthors}</b>
                                </div>
                                <span className="p-2">{page}</span>
                                <button className="bg-blue-500 p-2 rounded text-white hover:shadow-lg text-xl mr-3 font-thin" onClick={handlerPrevious}>Previous</button>
                                <button className="bg-blue-500 p-2 rounded px-5 text-white hover:shadow-lg text-xl mr-3 font-thin" onClick={handlerNext}>Next</button>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>
            <AuthorPopupForm type={formType} open={openForm} setOpen={setOpenForm} 
                editAuthorInfo={editAuthorInfo} authorService={authorService}
            ></AuthorPopupForm>
        </div>


    );
}