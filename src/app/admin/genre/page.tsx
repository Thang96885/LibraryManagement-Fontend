'use client';
import React from 'react';
import GenreTable from '@/app/components/table/genre-table';
import { GenreService } from '@/app/services/GenreService';
import { ListGenreResult } from '@/app/models/genre-model';
import { useState } from 'react';

export default function Genre() {
    const [genres, setGenres] = useState<ListGenreResult>({ genres: [], NumberGenres: 0 });
    const genreService = new GenreService();

    return (
        <div className="flex">
                <GenreTable genreService={genreService} listGenreRecords={genres} setGenres={setGenres}></GenreTable>
            
        </div>
    )
}