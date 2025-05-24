import {SettingsNav} from "@/app/(settings)/_components/SettingsNav";
import Link from "next/link";

export default function Page() {
    return (
        <>
            <SettingsNav pageLabel="Data and Privacy"/>
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full .max-w-md">
                <p className="text-gray-600 text-sm mb-6 sm:mb-8">
                    Manage your personal data, privacy settings, and security preferences.
                </p>

                <ul className="space-y-4">
                    {/*<li>*/}
                    {/*    <a href="#"*/}
                    {/*       className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150 group">*/}
                    {/*        <span data-lucide="download"*/}
                    {/*              className="lucide-icon w-5 h-5 text-teal-600 mr-3 group-hover:text-teal-700"></span>*/}
                    {/*        <span className="text-gray-700 group-hover:text-gray-900">Download Your Data</span>*/}
                    {/*    </a>*/}
                    {/*</li>*/}

                    {/*<li>*/}
                    {/*    <a href="#"*/}
                    {/*       className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150 group">*/}
                    {/*        <span data-lucide="file-minus-2"*/}
                    {/*              className="lucide-icon w-5 h-5 text-teal-600 mr-3 group-hover:text-teal-700"></span>*/}
                    {/*        <span className="text-gray-700 group-hover:text-gray-900">Delete Specific Data</span>*/}
                    {/*    </a>*/}
                    {/*</li>*/}

                    <li>
                        <Link href="/change-password"
                              className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150 group">
                            <span
                                className="iconify lucide--lock w-5 h-5 text-teal-600 mr-3 group-hover:text-teal-700"></span>
                            <span className="text-gray-700 group-hover:text-gray-900">Change Password</span>
                        </Link>
                    </li>

                    <li>
                        <a href="#"
                           className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150 group">
                            <span
                                className="iconify lucide--shield-check w-5 h-5 text-teal-600 mr-3 group-hover:text-teal-700"></span>
                            <span
                                className="text-gray-700 group-hover:text-gray-900">Enable Two-Factor Authentication</span>
                        </a>
                    </li>

                    <li>
                        <Link href="/delete-account"
                              className="flex items-center p-3 rounded-lg hover:bg-red-50 transition-colors duration-150 group">
                            <span
                                className="iconify lucide--user-x w-5 h-5 text-red-500 mr-3 group-hover:text-red-600"></span>
                            <span className="text-red-500 group-hover:text-red-600">Delete Account</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    )
}