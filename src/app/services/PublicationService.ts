import { CreatePublicationYearRequest, ListPublicationYearRequest, ListPublicationYearResult, UpdatePublicationYearRequest } from "../models/publication-model";
import AuthService from "./AuthService";
import { Base_URL } from "./BaseUrl";

const API_URL = Base_URL + "/api/PublicationYear";

export class PublicationService {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    async listPublicationYears(request: ListPublicationYearRequest): Promise<ListPublicationYearResult> {
        const param = new URLSearchParams(request as any).toString();
        const response = await fetch(`${API_URL}/list?${param}`, {
            method: "GET",
            headers: this.authService.getAuthHeaders()
        });
        console.log(response);

        if (response.ok) {
            const data = await response.json();
            return new ListPublicationYearResult(data.records, data.totalNumberOfYears);
        } else {
            throw new Error("Failed to get publication years");
        }
    }

    async createPublicationYear(request: CreatePublicationYearRequest): Promise<boolean> {
        const response = await fetch(`${API_URL}/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...this.authService.getAuthHeaders()
            },
            body: JSON.stringify(request)
        });

        return response.ok;
    }

    async updatePublicationYear(request: UpdatePublicationYearRequest): Promise<boolean> {
        const response = await fetch(`${API_URL}/update`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                ...this.authService.getAuthHeaders()
            },
            body: JSON.stringify(request)
        });

        return response.ok;
    }

    async deletePublicationYear(id: number): Promise<boolean> {
        const response = await fetch(`${API_URL}/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                ...this.authService.getAuthHeaders()
            },
            body: JSON.stringify({ id })
        });

        return response.ok;
    }
}