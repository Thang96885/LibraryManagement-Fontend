"use client";
import Link from "next/link";
import { useState } from "react";
import { 
  FaUserCog, FaSignOutAlt, FaKey, 
  FaList, FaMapMarkerAlt, FaBookReader,
  FaUsers, FaBook, FaBookOpen,
  FaClipboardList, FaChartBar, FaUser, FaCalendar
} from 'react-icons/fa';
import AuthService from "@/app/services/AuthService";

export default function Panel() {
    const authService = new AuthService();
    const [menuStates, setMenuStates] = useState({
        account: false,
        category: false,
        customerInfo: false,
        circulation: false
    });

    const toggleMenu = (menu: keyof typeof menuStates) => {
        setMenuStates(prev => ({
            ...prev,
            [menu]: !prev[menu]
        }));
    };

    const logoutHandler = () => {
        authService.clearTokensAndRedirect();
    }

    return (
        <div className="flex flex-col bg-gray-800 text-gray-100 w-60 min-h-screen fixed left-0 top-16 shadow-lg">
            <div className="p-4">
                <nav>
                    <ul className="space-y-2">
                        {/* Account Management */}
                        <li>
                            <button onClick={() => toggleMenu('account')} 
                                className="flex items-center w-full p-3 text-gray-300 rounded hover:bg-gray-700 transition-colors">
                                <FaUserCog className="w-5 h-5 mr-3" />
                                <span>Account Management</span>
                                <svg className={`w-4 h-4 ml-auto transform ${menuStates.account ? 'rotate-180' : ''}`}
                                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {menuStates.account && (
                                <ul className="pl-6 mt-2 space-y-2">
                                    <li>
                                        <Link href="/admin/account" className="flex items-center p-2 text-gray-400 rounded hover:bg-gray-700">
                                            <FaUserCog className="w-4 h-4 mr-2" />Account Management
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/auth/change-password" className="flex items-center p-2 text-gray-400 rounded hover:bg-gray-700">
                                            <FaKey className="w-4 h-4 mr-2" />Change Password
                                        </Link>
                                    </li>
                                    <li>
                                        <button onClick={() => {logoutHandler()}} className="flex items-center p-2 text-gray-400 rounded hover:bg-gray-700">
                                            <FaSignOutAlt className="w-4 h-4 mr-2" />Logout
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </li>

                        {/* Category Management */}
                        <li>
                            <button onClick={() => toggleMenu('category')}
                                className="flex items-center w-full p-3 text-gray-300 rounded hover:bg-gray-700 transition-colors">
                                <FaList className="w-5 h-5 mr-3" />
                                <span>Category Management</span>
                                <svg className={`w-4 h-4 ml-auto transform ${menuStates.category ? 'rotate-180' : ''}`}
                                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {menuStates.category && (
                                <ul className="pl-6 mt-2 space-y-2">
                                    <li>
                                        <Link href="/admin/location" className="flex items-center p-2 text-gray-400 rounded hover:bg-gray-700">
                                            <FaMapMarkerAlt className="w-4 h-4 mr-2" />Location
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/admin/genre" className="flex items-center p-2 text-gray-400 rounded hover:bg-gray-700">
                                            <FaList className="w-4 h-4 mr-2" />Genre
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/admin/patron-type" className="flex items-center p-2 text-gray-400 rounded hover:bg-gray-700">
                                            <FaUsers className="w-4 h-4 mr-2" />Patron Type
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/admin/author" className="flex items-center p-2 text-gray-400 rounded hover:bg-gray-700">
                                            <FaUser className="w-4 h-4 mr-2" />Author
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/admin/publication-year" className="flex items-center p-2 text-gray-400 rounded hover:bg-gray-700">
                                            <FaCalendar className="w-4 h-4 mr-2" />Publication Year
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>

                        {/* Customer Information */}
                        <li>
                            <button onClick={() => toggleMenu('customerInfo')}
                                className="flex items-center w-full p-3 text-gray-300 rounded hover:bg-gray-700 transition-colors">
                                <FaUsers className="w-5 h-5 mr-3" />
                                <span>Customer Information</span>
                                <svg className={`w-4 h-4 ml-auto transform ${menuStates.customerInfo ? 'rotate-180' : ''}`}
                                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {menuStates.customerInfo && (
                                <ul className="pl-6 mt-2 space-y-2">
                                    <li>
                                        <Link href="/admin/patron" className="flex items-center p-2 text-gray-400 rounded hover:bg-gray-700">
                                            <FaUsers className="w-4 h-4 mr-2" />Patron
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/admin/book" className="flex items-center p-2 text-gray-400 rounded hover:bg-gray-700">
                                            <FaBook className="w-4 h-4 mr-2" />Book
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/admin/book-copy" className="flex items-center p-2 text-gray-400 rounded hover:bg-gray-700">
                                            <FaBookOpen className="w-4 h-4 mr-2" />Book Copy
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>

                        {/* Circulation Management */}
                        <li>
                            <button onClick={() => toggleMenu('circulation')}
                                className="flex items-center w-full p-3 text-gray-300 rounded hover:bg-gray-700 transition-colors">
                                <FaClipboardList className="w-5 h-5 mr-3" />
                                <span>Circulation Management</span>
                                <svg className={`w-4 h-4 ml-auto transform ${menuStates.circulation ? 'rotate-180' : ''}`}
                                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {menuStates.circulation && (
                                <ul className="pl-6 mt-2 space-y-2">
                                    <li>
                                        <Link href="/admin/borrow" className="flex items-center p-2 text-gray-400 rounded hover:bg-gray-700">
                                            <FaClipboardList className="w-4 h-4 mr-2" />Borrow Records
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/admin/return" className="flex items-center p-2 text-gray-400 rounded hover:bg-gray-700">
                                            <FaClipboardList className="w-4 h-4 mr-2" />Return Records
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/admin/reports" className="flex items-center p-2 text-gray-400 rounded hover:bg-gray-700">
                                            <FaChartBar className="w-4 h-4 mr-2" />Reports & Statistics
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}