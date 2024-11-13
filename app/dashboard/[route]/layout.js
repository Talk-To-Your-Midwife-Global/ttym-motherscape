import {NavItem} from "@/app/dashboard/components";
import {PageFadeAnimator} from "@/app/components";

export default async function DashboardLayout({children, params}) {
    const paramName = await params;
    return (
        <section>
            <PageFadeAnimator>
                {children}
                <div className={`h-[100px]`}></div>
            </PageFadeAnimator>

            <nav className={"bg-white w-screen fixed bottom-0 pt-1 h-[80px] flex justify-evenly shadow-lg"}>
                <NavItem text={"me"} active={paramName.route === "me"}>
                    <svg width="19" fill={""} height="25" viewBox="0 0 19 21"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6.63868 19.5282V16.4705C6.63868 15.6899 7.27608 15.0572 8.06234 15.0572H10.9365C11.3141 15.0572 11.6762 15.2061 11.9432 15.4711C12.2102 15.7362 12.3602 16.0957 12.3602 16.4705V19.5282C12.3578 19.8527 12.486 20.1648 12.7163 20.3951C12.9466 20.6254 13.26 20.7549 13.5868 20.7549H15.5477C16.4635 20.7572 17.3427 20.3977 17.9911 19.7557C18.6395 19.1137 19.0039 18.2419 19.0039 17.3327V8.62174C19.0039 7.88734 18.676 7.19072 18.1085 6.71955L11.4379 1.43075C10.2776 0.503444 8.61502 0.533385 7.4893 1.50186L0.970918 6.71955C0.376647 7.17684 0.0214585 7.87552 0.00390625 8.62174V17.3238C0.00390625 19.2187 1.55129 20.7549 3.46008 20.7549H5.3762C6.05513 20.7549 6.6069 20.2111 6.61182 19.5371L6.63868 19.5282Z"
                            fill="currentColor"/>
                    </svg>

                </NavItem>
                <NavItem text={"logs"} active={paramName.route === "logs"}>
                    <svg width="19" height="25" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.968 14.9785H5.74805" stroke="currentColor" strokeWidth="1.5"
                              strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12.968 10.792H5.74805" stroke="currentColor" strokeWidth="1.5"
                              strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8.50305 6.61523H5.74805" stroke="currentColor" strokeWidth="1.5"
                              strokeLinecap="round" strokeLinejoin="round"/>
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M13.1604 1.50488C13.1604 1.50488 5.48344 1.50888 5.47144 1.50888C2.71144 1.52588 1.00244 3.34188 1.00244 6.11188V15.3079C1.00244 18.0919 2.72444 19.9149 5.50844 19.9149C5.50844 19.9149 13.1844 19.9119 13.1974 19.9119C15.9574 19.8949 17.6674 18.0779 17.6674 15.3079V6.11188C17.6674 3.32788 15.9444 1.50488 13.1604 1.50488Z"
                              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                              strokeLinejoin="round"/>
                    </svg>
                </NavItem>

                <NavItem  text={"calendar"} withText={false}>
                    <svg className={"relative bottom-10 .absolute"} width="82" height="76" viewBox="0 0 72 76" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="15.1821" y="2.48926" width="51.6361" height="51.6361" rx="25.8181" fill="#0F969C"
                              fillOpacity="0.03"/>
                        <rect x="15.1821" y="2.48926" width="51.6361" height="51.6361" rx="25.8181" stroke="#0F969C"
                              strokeWidth="3"/>
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M45.4109 19.0762L45.4119 19.8259C48.1665 20.0418 49.9862 21.9188 49.9891 24.7974L50 33.2231C50.0039 36.3616 48.0322 38.2926 44.8718 38.2976L37.1519 38.3076C34.0112 38.3116 32.0148 36.3346 32.0109 33.1872L32 24.8603C31.9961 21.9628 33.7515 20.0907 36.5062 19.8379L36.5052 19.0882C36.5042 18.6484 36.83 18.3176 37.2644 18.3176C37.6989 18.3166 38.0247 18.6464 38.0257 19.0862L38.0267 19.7859L43.8914 19.7779L43.8904 19.0782C43.8894 18.6385 44.2152 18.3086 44.6497 18.3076C45.0742 18.3066 45.4099 18.6365 45.4109 19.0762ZM33.5215 25.1692L48.4696 25.1492V24.7994C48.4272 22.6504 47.349 21.523 45.4138 21.3551L45.4148 22.1247C45.4148 22.5545 45.0801 22.8953 44.6556 22.8953C44.2212 22.8963 43.8943 22.5565 43.8943 22.1267L43.8934 21.3171L38.0286 21.3251L38.0296 22.1337C38.0296 22.5645 37.7048 22.9043 37.2704 22.9043C36.8359 22.9053 36.5091 22.5665 36.5091 22.1357L36.5081 21.3661C34.5829 21.559 33.5175 22.6904 33.5205 24.8583L33.5215 25.1692ZM44.2399 29.7119V29.7229C44.2498 30.1827 44.625 30.5315 45.0801 30.5215C45.5244 30.5105 45.8789 30.1297 45.869 29.6699C45.8483 29.2302 45.4918 28.8713 45.0485 28.8723C44.5944 28.8823 44.2389 29.2521 44.2399 29.7119ZM45.0554 34.1997C44.6013 34.1897 44.235 33.8109 44.234 33.3511C44.2241 32.8913 44.5884 32.5105 45.0426 32.4995H45.0525C45.5165 32.4995 45.8927 32.8783 45.8927 33.3481C45.8937 33.8179 45.5185 34.1987 45.0554 34.1997ZM40.1721 29.7279C40.1919 30.1877 40.568 30.5465 41.0222 30.5265C41.4665 30.5055 41.821 30.1257 41.8012 29.6659C41.7903 29.2162 41.425 28.8663 40.9807 28.8673C40.5266 28.8873 40.1711 29.2681 40.1721 29.7279ZM41.0262 34.1547C40.572 34.1747 40.1968 33.8159 40.1761 33.3561C40.1761 32.8963 40.5305 32.5165 40.9847 32.4955C41.429 32.4945 41.7953 32.8443 41.8052 33.2931C41.8259 33.7539 41.4705 34.1337 41.0262 34.1547ZM36.1043 29.7629C36.1241 30.2227 36.5002 30.5825 36.9544 30.5615C37.3987 30.5415 37.7532 30.1607 37.7324 29.7009C37.7226 29.2511 37.3572 28.9013 36.912 28.9023C36.4578 28.9223 36.1033 29.3031 36.1043 29.7629ZM36.9584 34.1597C36.5042 34.1807 36.129 33.8209 36.1083 33.3611C36.1073 32.9013 36.4627 32.5205 36.9169 32.5005C37.3612 32.4995 37.7275 32.8493 37.7374 33.2991C37.7581 33.7589 37.4037 34.1397 36.9584 34.1597Z"
                              fill="#0F969C"/>
                    </svg>

                </NavItem>

                <NavItem text={"chat"} active={paramName.route === "chat"}>
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M18.6509 9.60645L14.2076 13.2195C13.3681 13.8855 12.187 13.8855 11.3475 13.2195L6.8667 9.60645"
                            stroke="currentColor"  strokeWidth="1.5" strokeLinecap="round"
                            strokeLinejoin="round"/>
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M17.6569 21.7548C20.6983 21.7633 22.748 19.2644 22.748 16.1932V9.3249C22.748 6.25371 20.6983 3.75488 17.6569 3.75488H7.83918C4.79783 3.75488 2.74805 6.25371 2.74805 9.3249V16.1932C2.74805 19.2644 4.79783 21.7633 7.83918 21.7548H17.6569Z"
                              stroke="currentColor"  strokeWidth="1.5" strokeLinecap="round"
                              strokeLinejoin="round"/>
                    </svg>
                </NavItem>

                <NavItem text={"community"} active={paramName.route === "community"}>
                    <svg width="23" height="25" viewBox="0 0 23 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M17.3838 7.65161C18.7788 7.45561 19.8528 6.25961 19.8558 4.81061C19.8558 3.38261 18.8148 2.19861 17.4498 1.97461"
                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                            strokeLinejoin="round"/>
                        <path
                            d="M19.2246 11.0049C20.5756 11.2069 21.5186 11.6799 21.5186 12.6549C21.5186 13.3259 21.0746 13.7619 20.3566 14.0359"
                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                            strokeLinejoin="round"/>
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M11.3828 11.4189C8.16883 11.4189 5.42383 11.9059 5.42383 13.8509C5.42383 15.7949 8.15183 16.2959 11.3828 16.2959C14.5968 16.2959 17.3408 15.8139 17.3408 13.8679C17.3408 11.9219 14.6138 11.4189 11.3828 11.4189Z"
                              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                              strokeLinejoin="round"/>
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M11.383 8.64288C13.492 8.64288 15.202 6.93388 15.202 4.82388C15.202 2.71488 13.492 1.00488 11.383 1.00488C9.27399 1.00488 7.56399 2.71488 7.56399 4.82388C7.55599 6.92588 9.25299 8.63588 11.355 8.64288H11.383Z"
                              stroke="currentColor"  strokeWidth="1.5" strokeLinecap="round"
                              strokeLinejoin="round"/>
                        <path
                            d="M5.38118 7.65161C3.98518 7.45561 2.91218 6.25961 2.90918 4.81061C2.90918 3.38261 3.95018 2.19861 5.31518 1.97461"
                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                            strokeLinejoin="round"/>
                        <path
                            d="M3.54009 11.0049C2.18909 11.2069 1.24609 11.6799 1.24609 12.6549C1.24609 13.3259 1.69009 13.7619 2.40809 14.0359"
                            stroke="currentColor"  strokeWidth="1.5" strokeLinecap="round"
                            strokeLinejoin="round"/>
                    </svg>

                </NavItem>
            </nav>
        </section>
    )
}