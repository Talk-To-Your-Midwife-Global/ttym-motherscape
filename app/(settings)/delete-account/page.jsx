"use client"
import {SettingsNav} from "@/app/(settings)/_components/SettingsNav";
import {ContainerWrapper} from "@/app/_components/ContainerWrapper";
import {useState} from "react";
import {FormInput} from "@/app/_components/FormInput";

export default function Page() {
    const [otherInputToggle, setOtherInputToggle] = useState(false);
    return (
        <section>
            <SettingsNav pageLabel="Delete Account"/>
            <ContainerWrapper>
                <div className="w-full max-w-md bg-white rounded-lg">
                    <h1 className="text-md .sm:text-xl font-medium text-gray-700 mb-6 text-left">
                        Permanently delete your account and all associated data. This action cannot be undone.
                    </h1>

                    <div className="mb-8">
                        <div className="flex items-start mb-3">
                            <svg className="w-6 h-6 text-red-500 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg"
                                 fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"/>
                            </svg>
                            <h2 className="text-xl font-semibold text-red-600">Important Notice</h2>
                        </div>
                        <p className="text-red-600 mb-3 text-sm sm:text-base">Deleting your account will:</p>
                        <ol className="list-decimal list-inside text-red-600 space-y-1 text-sm sm:text-base">
                            <li>Remove all your menstrual cycle, pregnancy, and health logs.</li>
                            <li>Erase all chat history and community posts.</li>
                            <li>Delete all saved preferences and settings.</li>
                            <li>Revoke access to your account permanently.</li>
                            <li>You will not be able to recover your data after deletion.</li>
                        </ol>
                    </div>

                    <div>
                        <h3 className="text-base sm:text-lg font-medium text-gray-700 mb-4">Why are you deleting your
                            account?</h3>
                        <form className="space-y-3">
                            <label className="flex items-center p-3 -ml-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                                <input type="radio" name="deleteReason" value="not_useful"
                                       className="h-5 w-5 text-red-500 border-gray-300 focus:ring-red-400 focus:ring-offset-0 focus:ring-2 rounded-full mr-3"/>
                                <span
                                    className="text-gray-700 text-sm sm:text-base">I no longer find the app useful</span>
                            </label>
                            <label className="flex items-center p-3 -ml-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                                <input type="radio" name="deleteReason" value="privacy_concerns"
                                       className="h-5 w-5 text-red-500 border-gray-300 focus:ring-red-400 focus:ring-offset-0 focus:ring-2 rounded-full mr-3"/>
                                <span className="text-gray-700 text-sm sm:text-base">I have privacy concerns</span>
                            </label>
                            <label className="flex items-center p-3 -ml-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                                <input type="radio" name="deleteReason" value="prefer_another_app"
                                       className="h-5 w-5 text-red-500 border-gray-300 focus:ring-red-400 focus:ring-offset-0 focus:ring-2 rounded-full mr-3"/>
                                <span className="text-gray-700 text-sm sm:text-base">I prefer another app</span>
                            </label>
                            <label className="flex items-center p-3 -ml-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                                <input type="radio" name="deleteReason" value="data_security"
                                       className="h-5 w-5 text-red-500 border-gray-300 focus:ring-red-400 focus:ring-offset-0 focus:ring-2 rounded-full mr-3"/>
                                <span
                                    className="text-gray-700 text-sm sm:text-base">I am concerned about data security</span>
                            </label>
                            <label className="flex items-center p-3 -ml-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                                <input type="radio" name="deleteReason" value="other"
                                       className="h-5 w-5 text-red-500 border-gray-300 focus:ring-red-400 focus:ring-offset-0 focus:ring-2 rounded-full mr-3"/>
                                <span
                                    className="text-gray-700 text-sm sm:text-base">Other</span>
                            </label>

                            <div className="flex flex-col gap-2">
                                <input type="text" name="deleteReason"
                                       className="border-2 border-[#999999] rounded-md p-2 placeholder-text-gray-500"/>
                            </div>

                            <div className="flex ">
                                <button className="bg-[#D24848] w-full text-white rounded-full p-2">Delete Account
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </ContainerWrapper>
        </section>
    )
}