'use client';
import PublicationYearTable from "@/app/components/table/publication-year-table";
import { ListPublicationYearResult } from "@/app/models/publication-model";
import { useState } from "react";
import { PublicationService } from "@/app/services/PublicationService";



export default function PublicationYearPage(){
    const publicationService = new PublicationService();
    const [publicationRecords, setPublicationRecords] = useState<ListPublicationYearResult>({records: [], totalNumberOfYears: 0});

    return (
        <div>
            <PublicationYearTable publicationService={publicationService}
             listPublicationYearRecords={publicationRecords} setPublicationYears={setPublicationRecords}></PublicationYearTable>
        </div>
    )
}