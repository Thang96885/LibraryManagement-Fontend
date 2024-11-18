import Link from "next/link"
import { useState } from "react"
import AuthService from "@/app/services/AuthService";
import Image from "next/image";

interface DashboardAfterLoginProps {
    authService: AuthService;
}

export default function DashboardAfterLogin({authService}: DashboardAfterLoginProps) {
    

    const accountInfo = authService.DeCodeJwtToken(authService.GetJwtToken());

    return (
        <div className="bg-gray-600 text-white text-xl w-screen flex fixed">
        <div className="bg-gray-600 text-white text-xl flex w-1/2">
          <Link className="mr-3" href={"/"}>Library management system</Link>
        </div>
        <div className="bg-black  text-white text-xl flex justify-end w-1/2">
          <div className="flex mr-10 backgroud">
          
          <Image className="mr-4" height={35} width={35} src="/account.png" alt=""/>

          <div className="mr-4 flex justify-center self-center">
            <p className="mr-3 font-bold">{accountInfo.nameid.toUpperCase()}</p>
          </div>

          <Image className="mr-4" src="/setting.png" alt="setting" height={35} width={35} />
          
          </div>
        </div>
      </div>
    )
}