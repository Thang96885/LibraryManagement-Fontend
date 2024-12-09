import { Update } from "next/dist/build/swc/types";
import { CreateBorrowRecordRequest, GetBorrowRecordDto, ListBorrowRecordRequest, ListBorrowRecordResult, UpdateBorrowRecordRequest } from "../models/borrow-record-model";

import { Base_URL } from "./BaseUrl";

const BASE_URL = Base_URL + "/api/BorrowRecord";


export class BorrowRecordService{
    async listBorrowRecord(query: ListBorrowRecordRequest): Promise<ListBorrowRecordResult> {
        const param = new URLSearchParams(query as any).toString();
        const response = await fetch(`${BASE_URL}/list?${param}`);
        console.log(response);
        if(response.ok){
            const data = await response.json();

            return new ListBorrowRecordResult(data.records, data.totalNumberOfRecords);
        }
        else{
            throw new Error(response.statusText);
        }
    }

    async getBorrowRecord(id: number): Promise<GetBorrowRecordDto> {
        const response = await fetch(`${BASE_URL}/get?Id=${id}`);
        console.log(response);

        if(response.ok){
            const data = await response.json();
            

            return new GetBorrowRecordDto(data);
        }
        else{
            throw new Error(response.statusText);
        }
    }

    async createBorrowRecord(request: CreateBorrowRecordRequest)
     : Promise<boolean>{
        const response = await fetch(`${BASE_URL}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });
        console.log(response);

        if(response.ok){
            return true;
        }
        else{
            return false;
        }
     } 

    async updateBorrowRecord(request: UpdateBorrowRecordRequest) 
    : Promise<boolean>{
        const response = await fetch(`${BASE_URL}/update`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });
        console.log(response);

        if(response.ok){
            return true;
        }
        else{
            return false;
        }
    }
}