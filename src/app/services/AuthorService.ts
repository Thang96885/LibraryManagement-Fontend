// src/app/services/AuthorService.ts
import { CreateAuthorCommand, ListAuthorRequest, ListAuthorResult, UpdateAuthorRequest } from "@/app/models/author-model";
import { Base_URL } from './BaseUrl';
import AuthService from './AuthService';

const API_URL = `${Base_URL}/api/author`;

class AuthorService {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    public async createAuthor(command: CreateAuthorCommand): Promise<boolean> {
        const response = await fetch(`${API_URL}/add`, {
            method: "POST",
            headers: this.authService.getAuthHeaders(),
            body: JSON.stringify(command)
        });

        return response.ok;
    }

    public async listAuthors(request: ListAuthorRequest): Promise<ListAuthorResult> {
        const params = new URLSearchParams(request as any).toString();
        const response = await fetch(`${API_URL}/list?${params}`, {
            method: "GET",
            headers: this.authService.getAuthHeaders()
        });
        console.log(response);

        if (response.ok) {
            const data = await response.json();
            return new ListAuthorResult(data.records, data.totalNumberOfAuthors);
        } else {
            throw new Error("Failed to list authors");
        }
    }

    public async updateAuthor(request: UpdateAuthorRequest): Promise<boolean> {
        const response = await fetch(`${API_URL}/update`, {
            method: "PATCH",
            headers: this.authService.getAuthHeaders(),
            body: JSON.stringify(request)
        });

        return response.ok;
    }

    public async deleteAuthor(id: number): Promise<boolean> {
        const response = await fetch(`${API_URL}/delete?Id=` + id, {
            method: "DELETE",
            headers: this.authService.getAuthHeaders()
        });
        console.log(response);

        return response.ok;
    }
}

export default AuthorService;
