import { headers } from "next/headers";
import { CreatePatronRequest, ListPatronRequest, ListPatronResult, UpdatePatronRequest } from "../models/patron-model";
import { Base_URL } from "./BaseUrl"
import { METHODS } from "http";


const API_URL = Base_URL + '/api/Patron';


export class PatronService{
    async ListPatron(request: ListPatronRequest): Promise<ListPatronResult>{
        const param = new URLSearchParams(request as any).toString();
        const response = await fetch(`${API_URL}/list-patron?${param}`);
        console.log(response);
        if(response.ok){
            const data = await response.json();
            
            return new ListPatronResult(data.records, data.totalNumberOfPatrons);
        }
        else{
            throw new Error("Failed to get patrons");
        }
    }

    async DeletePatron(id: number): Promise<boolean>{
        var response = await fetch(API_URL + "/delete-patron", {method: "DELETE", headers: {"Content-Type": "application/json"}, body: JSON.stringify({id: id})});
        console.log(response);
        if(response.ok)
            return true;
        else 
            return false;

    }

    async CreatePatron(request: CreatePatronRequest): Promise<boolean>{
        var response = await fetch(API_URL + "/add-patron", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(request)});
        console.log(JSON.stringify(request));
        console.log(response);
        if(response.ok)
            return true;
        else 
            return false;
    }

    async UpdatePatron(request: UpdatePatronRequest): Promise<boolean>{
        console.log(JSON.stringify(request));
        var response = await fetch(API_URL + "/update", {method: "PATCH", headers: {"Content-Type": "application/json"}, body: JSON.stringify(request)});
        
        console.log(response);
        if(response.ok)
            return true;
        else 
            return false;
    }
}

