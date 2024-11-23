import { CreatePatronTypeRequest, ListPatronTypeRequest, ListPatronTypeResult, UpdatePatronTypeRequest } from "../models/patron-type-model";
import { Base_URL } from "./BaseUrl";

const API_URL = Base_URL + "/api/PatronType";

export class PatronTypeService{
    async ListPatronType(request: ListPatronTypeRequest) : Promise<ListPatronTypeResult>{
        const param = new URLSearchParams(request as any).toString();
        const response = await fetch(API_URL + "/list?" + param, {method: "GET"});
        console.log(response);
        if(response.ok)
        {
            var data = await response.json();
            return new ListPatronTypeResult(data.listPatronTypeRecords, data.totalNumberOfPatronTypes);
        }
        else
        {
            throw new Error("Failed to get patron types");
        }
    }

    async CreatePatronType(request: CreatePatronTypeRequest) : Promise<boolean>{
        const response = await fetch(API_URL + "/add", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(request)});

        if(response.ok)
            return true;
        
        return false;
    }

    async UpdatePatronType(request: UpdatePatronTypeRequest) : Promise<boolean>{
        const response = await fetch(API_URL + "/update", {method: "PATCH", headers: {"Content-Type": "application/json"}, body: JSON.stringify(request)});

        if(response.ok)
            return true;
        
        return false;
    }

    async DeletePatronType(id: number) : Promise<boolean>{
        const response = await fetch(API_URL + "/delete", {method: "DELETE", headers: {"Content-Type": "application/json"}, body: JSON.stringify({id: id})});

        if(response.ok)
            return true;
        return false;
    }
}