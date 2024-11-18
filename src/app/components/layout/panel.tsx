"use client";

import Link from "next/link"
import { useState } from "react"
import DropdownButton from "../common/dropdown-button"

export default function Panel() {
    const [bookHide, setBookHide] = useState(true);
    const [genreHide, setGenreHide] = useState(true);

    function toggleBook() {
        setBookHide(!bookHide);
    }

    return (
    <div className="flex flex-col bg-gray-600 w-1/6 fixed h-full">
        <ul>
            <div className="flex">
                <li>
                    <img src="./user.png" height={25} width={25} className="inline-flex mr-5"></img>
                    <Link href={"admin/account"}>Account</Link>
                </li>
            </div>
            <li>
                <button onClick={() => {toggleBook()}}>Book</button>
                {!bookHide && (
                    <ul className="pl-4">
                        <li>
                            <Link href={"admin/book"}>Book</Link>
                        </li>
                        <li>
                            <Link href={"admin/book/add"}>Add book</Link>
                        </li>
                    </ul>
                )}
            </li>
            
            <li>
                <button onClick={() => {setGenreHide(!genreHide)}}>Genre</button>
                    {!genreHide && (
                        <ul className="pl-4">
                            <li>
                                <Link href={"admin/genre"}>Genre</Link>s
                            </li>
                            <li>
                                <Link href={"admin/genre/add"}>Add genre</Link>
                            </li>
                        </ul>
                    )}
            </li>
        </ul>
    </div>
    )
}