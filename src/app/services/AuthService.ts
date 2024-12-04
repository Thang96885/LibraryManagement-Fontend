import { METHODS } from 'http';
import { AuthResult, ListAccountRequest, ListAccountResult, LoginRequest, ResetPasswordRequest } from '../models/auth-model';
import { Base_URL } from './BaseUrl';
import { AccountInfo } from '../models/auth-model';
import { SearchParamsContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime';
import { jwtDecode } from 'jwt-decode';

const API_URL = Base_URL + "/api/Auth";

class AuthService{
    public GetJwtToken(): string {
        return localStorage.getItem("jwtToken") || "";
    }

    public GetRefreshToken(): string {
        return localStorage.getItem("refreshToken") || "";
    }

    public DeCodeJwtToken(jwtToken: string): AccountInfo
    {
        var base64Url = jwtToken.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        var result = JSON.parse(window.atob(base64));

        return new AccountInfo(result.nameid, result.role);
    }


    public async Login(LoginRequest: LoginRequest): Promise<AuthResult> {
        var response = await fetch(API_URL + "/login", {method: "POST",
             headers: {"Content-Type": "application/json"},
              body: JSON.stringify(LoginRequest)});

        if(response.ok)
        {
            var data = await response.json();
            return new AuthResult(data.jwtToken, data.refreshToken);
        }
        else
        {
            throw new Error("Login failed");
        }
    }

    public async ListAccounts(request: ListAccountRequest) : Promise<ListAccountResult>{
        const param = new URLSearchParams(request as any).toString();
        var response = await fetch(API_URL + "/list-account?" + param, {method: "GET"});

        console.log(response);

        if(response.ok)
        {
            var data = await response.json();
            return new ListAccountResult(data.accounts, data.totalNumberOfAccounts);
        }
        else 
        {
            throw new Error("Failed to get accounts");
        }
    }

    public async ResetPassword(request: ResetPasswordRequest) : Promise<boolean>{
        var response = await fetch(API_URL + "/reset-password", {method: "PATCH",
             headers: {"Content-Type": "application/json"},
              body: JSON.stringify(request)});

        if(response.ok)
        {
            return true;
        }
        else 
        {
            return false;
        }
    }

    public validateTokenAndRedirect(): boolean {
        // Skip validation if we're already on an auth page
        if (typeof window !== 'undefined' && window.location.pathname.includes('/auth/')) {
            return false;
        }

        const token = this.GetJwtToken();
        const refreshToken = this.GetRefreshToken();

        if (!token || !refreshToken) {
            this.clearTokensAndRedirect();
            return false;
        }

        try {
            const decodedToken: any = jwtDecode(token);
            if (decodedToken.exp < Date.now() / 1000) {
                this.clearTokensAndRedirect();
                return false;
            }
            return true;
        } catch {
            this.clearTokensAndRedirect();
            return false;
        }
    }

    public clearTokensAndRedirect() {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('refreshToken');
        if (!window.location.pathname.includes('/auth/')) {
            window.location.href = '/admin/auth/login';
        }
    }

    public getAuthHeaders(): HeadersInit {
        const token = this.GetJwtToken();
        return {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };
    }
}

export default AuthService;