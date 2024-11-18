'use client';

import LocationTable from "@/app/components/table/location-table";
import { ListLocationResult } from "@/app/models/location-model";
import { LocationService } from "@/app/services/LocationService";
import { useState } from "react";



export default function Location() {
    const [locations, setLocations] = useState<ListLocationResult>({ locations: [], NumberLocations: 0 });
    const locationService = new LocationService();
    return (
        <div className="flex">
            <LocationTable setLocations={setLocations} listLocationRecords={locations} locationService={locationService}></LocationTable>
        </div>
    )
}