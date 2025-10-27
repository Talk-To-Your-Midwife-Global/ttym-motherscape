"use client"
import * as React from "react";
import {ProfileImage} from "@/app/_components/ProfileImage";
import {TapWrapper} from "@/app/_components/TapWrapper";


export const SideNav = ({userProfileInfo}) => {
    return (
        <TapWrapper link={"/profile"} customStyles={"bg-white"}>
            <ProfileImage userProfileInfo={userProfileInfo}/>
        </TapWrapper>

    );
};
