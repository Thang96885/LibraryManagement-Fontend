class AccountInfo{
  nameid : string;
  role : string;

  constructor(nameid: string, role: string){
    this.nameid = nameid;
    this.role = role;
  }
}

class AuthResult{
    jwtToken : string;
    refreshToken : string;

    constructor(jwtToken: string, refreshToken: string){
        this.jwtToken = jwtToken;
        this.refreshToken = refreshToken;
    }
}


class LoginRequest {
  userNameOrEmail: string;
  password: string;

  constructor(userNameOrEmail: string, password: string) {
    this.userNameOrEmail = userNameOrEmail;
    this.password = password;
  }
}


export { AuthResult, LoginRequest, AccountInfo };