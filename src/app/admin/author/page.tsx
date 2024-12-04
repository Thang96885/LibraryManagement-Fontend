'use client';

import { useState, useEffect } from "react";
import AuthorTable from "@/app/components/table/author-table";
import { ListAuthorResult } from "@/app/models/author-model";
import AuthorService from "@/app/services/AuthorService";

export default function AuthorPage() {
    const authorService = new AuthorService();
    const [authors, setAuthors] = useState<ListAuthorResult>({authors: [], totalNumberOfAuthors: 0});

    useEffect(() => {
        authorService.listAuthors({ page: 1, pageSize: 10, searchName: "" }).then((data) => {
            setAuthors(data);
        }).catch((error) => {
            console.error("Failed to fetch authors:", error);
        });
    }, []);

    return (
        <div>
            <AuthorTable authorService={authorService} setAuthors={setAuthors} listAuthorRecords={authors} />
        </div>
    );
}