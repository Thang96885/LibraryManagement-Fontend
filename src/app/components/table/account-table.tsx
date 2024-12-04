import { ListAccountRequest, ListAccountResult, ResetPasswordRequest } from "@/app/models/auth-model";
import AuthService from "@/app/services/AuthService";
import { Result } from "postcss";
import { useEffect, useState } from "react";


interface AccountTableProps {
    listAccountRecords: ListAccountResult
    authService: AuthService;
    setAccounts: (accounts : ListAccountResult) => void;
}

export default function AccountTable({ listAccountRecords, authService, setAccounts }: AccountTableProps) {
    const [page, setPage] = useState(1);
    const [searchPatronId, setSearchPatronId] = useState(0);
    const [searchPatronName, setSearchPatronName] = useState("");
    const [searchEmail, setSearchEmail] = useState("");
    const [searchAccountName, setSearchAccountName] = useState("");

    useEffect(() => {
        authService.ListAccounts(new ListAccountRequest(page, 10, searchPatronId, searchPatronName, searchEmail, searchAccountName)).then((data) => {
            setAccounts(data);
        }).catch((error) => {
            alert("Failed to get accounts");
        });
    }, [page, searchPatronId, searchPatronName, searchEmail, searchAccountName]);


    const handlerNext = () => {
        if (listAccountRecords.totalNumberOfAccounts > page * 10)
            setPage(page + 1);
        
    }

    const handlerPrevious = () => {
        if (page > 1)
            setPage(page - 1);
    }

    const handlerSearch = () => {
        setPage(1);
    }


    const handlerResetPassword = async (accountName: string) => {
        var result = window.confirm("Are you sure you want to reset password for this account?");
        if(result == false)
            return;

        authService.ResetPassword(new ResetPasswordRequest(accountName)).then((result) => {
            if(result == true)
                alert("Password reset successfully");
            else
                alert("Failed to reset password");
        });

    }


    return (
        <div className="table w-full p-2 mt-10">
            <div className="w-full flex justify-center">
                <div className="pt-2 relative m-5 text-gray-600">
                    <input onChange={(e) => setSearchPatronId(Number(e.target.value))} className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                        type="number" name="searchId" placeholder="Search Id" />
                    
                    <input onChange={(e) => setSearchPatronName(e.target.value)} className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                        type="text" name="searchId" placeholder="Search name" />
                    <input onChange={(e) => setSearchEmail(e.target.value)} className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none" placeholder="Search email"/>
                </div>

                <div className="pt-2 relative m-4 text-gray-600">
                    <button className="bg-blue-500 p-2 rounded  text-white hover:shadow-lg text-xl mr-3 font-thin">Search</button>

                </div>

            </div>

            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-50 border-b">
                        <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                            <div className="flex items-center justify-center">
                                Patron Id
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                </svg>
                            </div>
                        </th>
                        <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                            <div className="flex items-center justify-center">
                                Patron name
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                </svg>
                            </div>
                        </th>
                        <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                            <div className="flex items-center justify-center">
                                Account name
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
                                Action
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                </svg>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {listAccountRecords.accounts.map((account) => (
                        <tr key={account.id} className="bg-gray-100 text-center border-b text-sm text-gray-600">
                            <td className="p-2 border-r">{account.patronId}</td>
                            <td className="p-2 border-r">{account.patronName}</td>
                            <td className="p-2 border-r">{account.accountName}</td>
                            <td className="p-2 border-r">{account.email}</td>
                            <td>
                                <button onClick={() => {handlerResetPassword(account.accountName)}} className="bg-blue-500 p-2 m-1 rounded text-white hover:shadow-lg text-xs font-thin">
                                    Reset password
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
                                 Showing <b>{((page - 1) * 10 + 1)} - {page * 10} of {listAccountRecords.totalNumberOfAccounts}</b> 
                             </div>

                                <span className="p-2">{page}</span>
                                
                                <button className="bg-blue-500 p-2 rounded  text-white hover:shadow-lg text-xl mr-3 font-thin" onClick={handlerPrevious}>Previous</button>
                                <button className="bg-blue-500 p-2 rounded px-5 text-white hover:shadow-lg text-xl mr-3 font-thin" onClick={handlerNext}>Next</button>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}