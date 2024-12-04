import Link from "next/link";



export default function DashBoardBeforeLogin() {
    return (
      <div className="bg-gray-600 text-white text-xl w-screen flex fixed">
        <div className="bg-gray-600 text-white text-xl flex w-1/2">
          <Link className="mr-3" href={"/"}>Library management system</Link>
        </div>
        <div className="bg-gray-600  text-white text-xl flex justify-end w-1/2">
          <div className="flex mr-10 backgroud">
          <Link className="mr-3" href={"/auth/login"}>User login</Link>
            <Link className="mr-3" href={"/auth/register"}>Register</Link>
            
          </div>
        </div>
      </div>
        
    );
}
