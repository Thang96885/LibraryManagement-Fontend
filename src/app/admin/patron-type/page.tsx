'use client';

import PatronTypeTable from "@/app/components/table/patron-type-table";
import { ListPatronTypeResult } from "@/app/models/patron-type-model";
import { PatronTypeService } from "@/app/services/PatronTypeService";
import { useState } from "react";


export default function PatronType() {
    const patronTypeService = new PatronTypeService();
    const [patronTypes, setPatronTypes] = useState<ListPatronTypeResult>({ listPatronTypeRecords: [], totalNumberOfPatronTypes: 0 });
    return (
        <div>
            <PatronTypeTable setPatronTypes={setPatronTypes} patronTypeService={patronTypeService} listPatronTypeRecords={patronTypes}></PatronTypeTable>
        </div>
    );
}