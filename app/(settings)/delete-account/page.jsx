"use client"
import {SettingsNav} from "@/app/(settings)/_components/SettingsNav";
import {ContainerWrapper} from "@/app/_components/ContainerWrapper";
import {useState} from "react";
import {TriangularWarning} from "@/app/(settings)/_components/icons/TriangularWarning";

export default function Page() {
    const [otherInputToggle, setOtherInputToggle] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleteReason, setDeleteReason] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!confirmDelete) {
            setConfirmDelete(true);
        }
    }

    const handleDelete = () => {
        // call the route
    }

    const handleCancel = () => {
        setConfirmDelete(false);
    }

    const handleChange = (e) => {
        if (e.target.value === "other") {
            setOtherInputToggle(true);
        }
        setDeleteReason(e.target.value);

    }

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
                            <TriangularWarning/>
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
                        <form className="space-y-3" onSubmit={handleSubmit}>
                            <label className="flex items-center p-3 -ml-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                                <input type="radio" name="deleteReason" value="not_useful" onChange={handleChange}
                                       className="h-5 w-5 text-red-500 border-gray-300 focus:ring-red-400 focus:ring-offset-0 focus:ring-2 rounded-full mr-3"/>
                                <span
                                    className="text-gray-700 text-sm sm:text-base">I no longer find the app useful</span>
                            </label>
                            <label className="flex items-center p-3 -ml-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                                <input type="radio" name="deleteReason" value="privacy_concerns" onChange={handleChange}
                                       className="h-5 w-5 text-red-500 border-gray-300 focus:ring-red-400 focus:ring-offset-0 focus:ring-2 rounded-full mr-3"/>
                                <span className="text-gray-700 text-sm sm:text-base">I have privacy concerns</span>
                            </label>
                            <label className="flex items-center p-3 -ml-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                                <input type="radio" name="deleteReason" value="prefer_another_app"
                                       onChange={handleChange}
                                       className="h-5 w-5 text-red-500 border-gray-300 focus:ring-red-400 focus:ring-offset-0 focus:ring-2 rounded-full mr-3"/>
                                <span className="text-gray-700 text-sm sm:text-base">I prefer another app</span>
                            </label>
                            <label className="flex items-center p-3 -ml-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                                <input type="radio" name="deleteReason" value="data_security" onChange={handleChange}
                                       className="h-5 w-5 text-red-500 border-gray-300 focus:ring-red-400 focus:ring-offset-0 focus:ring-2 rounded-full mr-3"/>
                                <span
                                    className="text-gray-700 text-sm sm:text-base">I am concerned about data security</span>
                            </label>
                            <label className="flex items-center p-3 -ml-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                                <input type="radio" name="deleteReason" value="other" onChange={handleChange}
                                       className="h-5 w-5 text-red-500 border-gray-300 focus:ring-red-400 focus:ring-offset-0 focus:ring-2 rounded-full mr-3"/>
                                <span
                                    className="text-gray-700 text-sm sm:text-base">Other</span>
                            </label>

                            {otherInputToggle &&
                                <div className="flex flex-col gap-2">
                                    <input type="text" name="deleteReason"
                                           className="border-2 border-[#999999] text-gray-700 rounded-md p-2 placeholder-text-gray-500"
                                           placeholder="State reason here..."/>
                                </div>
                            }

                            <div className="flex ">
                                <button className="bg-[#D24848] w-full text-white rounded-full p-2 z-10">Delete Account
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </ContainerWrapper>
            {
                confirmDelete &&
                <div
                    className="bg-white rounded-full border-2 shadow-md w-full h-[400px] fixed z-10 top-[30%]  ">
                    <div>
                        <div
                            className="bg-white p-6 sm:p-8 rounded-lg shadow-xl w-full max-w-md transform transition-all">
                            <div className="flex flex-col items-center text-center sm:flex-row sm:text-left">
                                <div
                                    className="mx-auto flex-shrink-0 flex items-center justify-center h-16 w-16 sm:h-12 sm:w-12 rounded-full bg-red-100 sm:mx-0 mb-4 sm:mb-0 sm:mr-4">
                                    <svg className="h-8 w-8 sm:h-6 sm:w-6 text-red-600"
                                         xmlns="http://www.w3.org/2000/svg"
                                         fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"/>
                                    </svg>
                                </div>
                                <h3 className="text-xl sm:text-2xl leading-6 font-semibold text-gray-900"
                                    id="modal-title">
                                    Are you sure?
                                </h3>
                            </div>

                            <div className="mt-4 sm:mt-5 text-center sm:text-left">
                                <div className="text-sm sm:text-base text-gray-600">
                                    <p>
                                        All your menstrual cycle, pregnancy, and health logs will be removed. All chat
                                        history and community posts, all saved preferences and settings, access to your
                                        account will be deleted permanently.
                                    </p>
                                    <p className="mt-3 font-medium text-gray-700">
                                        You will not be able to recover your data after deletion.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 sm:mt-8 sm:flex sm:flex-row-reverse sm:gap-3">
                                <button type="button" onClick={handleDelete}
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none .focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm">
                                    Delete
                                </button>
                                <button type="button"
                                        onClick={handleCancel}
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none .focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </section>
    )
}