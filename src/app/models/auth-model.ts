export class AccountInfo{
  nameid : string;
  role : string;

  constructor(nameid: string, role: string){
    this.nameid = nameid;
    this.role = role;
  }
}

export class AuthResult{
    jwtToken : string;
    refreshToken : string;

    constructor(jwtToken: string, refreshToken: string){
        this.jwtToken = jwtToken;
        this.refreshToken = refreshToken;
    }
}


export class LoginRequest {
  userNameOrEmail: string;
  password: string;

  constructor(userNameOrEmail: string, password: string) {
    this.userNameOrEmail = userNameOrEmail;
    this.password = password;
  }
}


export class ListAccountRecord{
  id: string;
  patronId: string;
  patronName: string;
  accountName: string;
  email: string;

  constructor(id: string, patronId: string, patronName: string, accountName: string, email: string){
    this.id = id;
    this.patronId = patronId;
    this.patronName = patronName;
    this.accountName = accountName;
    this.email = email;
  }
}

export class ListAccountResult{
  accounts: ListAccountRecord[];
  totalNumberOfAccounts: number;

  constructor(accounts: ListAccountRecord[], totalNumberOfAccounts: number){
    this.accounts = accounts;
    this.totalNumberOfAccounts = totalNumberOfAccounts;
  }
}


export class ListAccountRequest{
  page: number;
  pageSize: number;
  searchPatronId: number;
  seachPatronName: string;
  searchEmail: string;
  searchName: string;

  constructor(page: number, pageSize: number, searchPatronId: number, seachPatronName: string, searchEmail: string, searchName: string){
    this.page = page;
    this.pageSize = pageSize;
    this.searchPatronId = searchPatronId;
    this.seachPatronName = seachPatronName;
    this.searchEmail = searchEmail;
    this.searchName = searchName;
  }
}


  export class ResetPasswordRequest{
    accountName: string;

    constructor(accountName: string){
      this.accountName = accountName;
    }
  }
