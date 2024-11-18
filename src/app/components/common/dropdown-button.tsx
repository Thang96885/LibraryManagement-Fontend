import { useState } from 'react';

export default function DropdownButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [extendedMenu, setExtendedMenu] = useState<string | null>(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const toggleExtendedMenu = (menu: string) => {
        setExtendedMenu(extendedMenu === menu ? null : menu);
    };

    return (
        <div className="relative inline-block text-left">
            <button
                id="dropdownDefaultButton"
                onClick={toggleDropdown}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
            >
                Dropdown button
                <svg
                    className="w-2.5 h-2.5 ml-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                    />
                </svg>
            </button>

            {isOpen && (
                <div
                    id="dropdown"
                    className="z-10 absolute right-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"
                >
                    <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownDefaultButton"
                    >
                        <li>
                            <button
                                onClick={() => toggleExtendedMenu('dashboard')}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Dashboard
                            </button>
                            {extendedMenu === 'dashboard' && (
                                <ul className="pl-4">
                                    <li>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Dashboard Item 1
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Dashboard Item 2
                                        </a>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <button
                                onClick={() => toggleExtendedMenu('settings')}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Settings
                            </button>
                            {extendedMenu === 'settings' && (
                                <ul className="pl-4">
                                    <li>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Settings Item 1
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Settings Item 2
                                        </a>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <button
                                onClick={() => toggleExtendedMenu('earnings')}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Earnings
                            </button>
                            {extendedMenu === 'earnings' && (
                                <ul className="pl-4">
                                    <li>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Earnings Item 1
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Earnings Item 2
                                        </a>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Sign out
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}