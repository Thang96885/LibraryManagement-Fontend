

import Link from "next/link";
import { useState, useEffect } from "react";
import { GenreService } from "@/app/services/GenreService";
import { GenreRecord, ListGenreResult } from "@/app/models/genre-model";
import GenrePopupForm, { GenrePopupFormType } from "../popup/genre-popup-form";
import { ListLocationResult, LocationRecord } from "@/app/models/location-model";
import { LocationService } from "@/app/services/LocationService";
import LocaionPopupForm, { LocationPopupFormType } from "../popup/location-popup-form";

interface LocationTableProps {
    listLocationRecords: ListLocationResult;
    locationService: LocationService;
    setLocations: (locations : ListLocationResult) => void;
}

export default function GenreTable({ listLocationRecords, locationService, setLocations }: LocationTableProps) {
    const [page, setPage] = useState(1);
    const [searchId, setSearchId] = useState(0);
    const [searchLocationName, setSearchLocationName] = useState("");
    const [openForm, setOpenForm] = useState(false);
    const [formtype, setFormType] = useState(LocationPopupFormType.ADD);
    const [editLocationInfo, setLocationGenreInfo] = useState(new LocationRecord(0, ""));

    useEffect(() => {
        locationService.ListLocation({page: page, pageSize: 10, locationId: searchId, SearchName: searchLocationName}).then((data) => {
            setLocations(data);
        }).catch((error) => {
            console.error(error);
            alert("Failed to get locations");
        })
    }, [page, searchId, searchLocationName]);

    const handlerEdit = (location: LocationRecord) => {
        setLocationGenreInfo(location);
        setFormType(LocationPopupFormType.EDIT);
        setOpenForm(true);
    }

    const handlerNext = () => {
        if (listLocationRecords.NumberLocations > page * 10)
            setPage(page + 1);
        
    }

    const handlerPrevious = () => {
        if (page > 1)
            setPage(page - 1);
    }

    const handlerRemove = async (id: number) => {
        const confirmed = window.confirm("Are you sure you want to delete this genre?");
        if (confirmed) {
            await locationService.DeleteLocation(id).then((result) => {
                locationService.ListLocation({ page: page, pageSize: 10, locationId: searchId, SearchName: searchLocationName }).then((data) => {
                    setLocations(data);
                });
                if(result == true)
                    alert("Location deleted successfully");
                else
                    alert("Failed to delete location");

            }).catch((error) => {
                console.error("Failed to delete location:", error);
                alert("Failed to delete location");
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
                    
                    <input onChange={(e) => setSearchLocationName(e.target.value)} className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                        type="text" name="searchId" placeholder="Search name" />
        
                </div>

                <div className="pt-2 relative m-4 text-gray-600">
                    <button className="bg-blue-500 p-2 rounded  text-white hover:shadow-lg text-xl mr-3 font-thin">Search</button>

                </div>

            </div>

            <button
                onClick={() => {
                    setFormType(LocationPopupFormType.ADD);
                    setOpenForm(true);
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Add Location
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
                                Number of book
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
                    {listLocationRecords.locations.map((location) => (
                        <tr key={location.id} className="bg-gray-100 text-center border-b text-sm text-gray-600">
                            <td className="p-2 border-r">{location.id}</td>
                            <td className="p-2 border-r">{location.name}</td>
                            <td className="p-2 border-r">{location.numberOfBookLocated}</td>
                            <td>
                                <button onClick={() => {handlerEdit(new LocationRecord(location.id, location.name))}} className="bg-blue-500 p-2 m-1 rounded text-white hover:shadow-lg text-xs font-thin">Edit</button>
                                <button onClick={() => {handlerRemove(location.id)}} className="bg-red-500 p-2 m-1 rounded text-white hover:shadow-lg text-xs font-thin" >
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
                                 Showing <b>{((page - 1) * 10 + 1)} - {page * 10} of {listLocationRecords.NumberLocations}</b> 
                             </div>

                                <span className="p-2">{page}</span>
                                
                                <button className="bg-blue-500 p-2 rounded  text-white hover:shadow-lg text-xl mr-3 font-thin" onClick={handlerPrevious}>Previous</button>
                                <button className="bg-blue-500 p-2 rounded px-5 text-white hover:shadow-lg text-xl mr-3 font-thin" onClick={handlerNext}>Next</button>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>
            
            <LocaionPopupForm type={formtype} open={openForm} setOpen={setOpenForm} locationService={locationService} editLocaionInfo={editLocationInfo}></LocaionPopupForm>
        </div>
    );
}