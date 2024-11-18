import { ListLocationRequest, ListLocationResult } from "../models/location-model";
import { Base_URL } from "./BaseUrl";

const API_URL = Base_URL + "/api/Location";

export class LocationService{
    async ListLocation(request: ListLocationRequest) : Promise<ListLocationResult>
    {
        var param = new URLSearchParams(request as any).toString();
        var response = await fetch(API_URL + "/list?" + param, {method: "GET"});

        if(response.ok)
        {
            const data = await response.json();
            return new ListLocationResult(data.locations, data.NumberLocations);
        }
        else
        {
            throw new Error("Failed to get locations");
        }
    }

    async CreateLocation(name: string) : Promise<boolean>
    {
        var response = await fetch(API_URL + "/add", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({name: name})});

        if(response.ok)
            return true;
        
        return false;
    }

    async UpdateLocation(id: number, name: string) : Promise<boolean>
    {
        var response = await fetch(API_URL + "/update", {method: "PATCH", headers: {"Content-Type": "application/json"}, body: JSON.stringify({id: id, updateName: name})});
        console.log(response);
        if(response.ok)
            return true;
        
        return false;
    }

    async DeleteLocation(id: number) : Promise<boolean>
    {
        var response = await fetch(API_URL + "/delete", {method: "DELETE", headers: {"Content-Type": "application/json"}, body: JSON.stringify({id: id})});
        console.log(response);
        if(response.ok)
            return true;
        
        return false;
    }
}