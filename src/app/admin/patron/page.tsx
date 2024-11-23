'use client';
import PatronTable from "@/app/components/table/patron.table";
import { ListPatronResult } from "@/app/models/patron-model";
import { PatronService } from "@/app/services/PatronService";
import { useState } from "react";



export default function Patron() {
    const [patrons, setPatrons] = useState<ListPatronResult>(new ListPatronResult([], 0));
    const patronService = new PatronService();


    return(
        <div>
            <PatronTable patronService={patronService} setPatrons={setPatrons} listPatronRecords={patrons}></PatronTable>
        </div>
    )
}