'use client';

import AccountTable from "@/app/components/table/account-table";
import { ListAccountResult } from "@/app/models/auth-model";
import AuthService from "@/app/services/AuthService";
import { useState } from "react";



export default function Account() {
    const authService = new AuthService();
    const [accounts, setAccounts] = useState<ListAccountResult>(new ListAccountResult([], 0));

    return (
        <div>
            <AccountTable authService={authService} setAccounts={setAccounts} listAccountRecords={accounts}></AccountTable>
        </div>
    );
}