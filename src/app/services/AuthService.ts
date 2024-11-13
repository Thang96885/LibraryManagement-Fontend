import { METHODS } from 'http';
import { AuthResult, LoginRequest } from '../models/auth-model';
import { Base_URL } from './BaseUrl';
import { AccountInfo } from '../models/auth-model';

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
}

export default AuthService;