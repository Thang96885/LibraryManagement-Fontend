"use client";
import AuthService from "@/app/services/AuthService";
import DashBoardBeforeLogin from "./dashboard_before_login";
import DashboardAfterLogin from "./dashboard_after_login";
import { useEffect, useState } from "react";

export default function Dashboard() 
{
    const authService = new AuthService();
    const [jwtToken, setJwtToken] = useState("");

    useEffect(() => {
        const jwtToken = authService.GetJwtToken();
        console.log("Token fetched in useEffect:", jwtToken);
        setJwtToken(jwtToken);
    }, [jwtToken, setJwtToken]);

    console.log("jwttoken " + jwtToken);

    if(jwtToken == null || jwtToken == "")
    {
        return (
            <DashBoardBeforeLogin></DashBoardBeforeLogin>
        );
    }

    return (
        <DashboardAfterLogin authService={authService}></DashboardAfterLogin>    
    );
}