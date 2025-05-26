"use client";
import {useState, useTransition} from "react";
import {ContainerWrapper} from "@/app/_components/ContainerWrapper";
import {FormInput} from "@/app/_components/FormInput";
import {ProfileEditButton} from "@/app/(settings)/_components/ProfileEditButton";
import {FormSelect} from "@/app/_components/FormSelect";
import {ProfileSaveButton} from "@/app/(settings)/_components/ProfileSavebutton";

export function ProfileForm({profile}) {
    const options = [
        {label: "English", value: "english"},
    ];

    const [editable, setEditable] = useState(false);
    const [isPending, startTransition] = useTransition();

    const toggleEditable = (e) => {
        e.preventDefault();
        setEditable(!editable);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        startTransition(() => {

        })

    }

    return (
        <section>
            <ContainerWrapper>
                <form className="text-black">
                    <FormInput type="text" label="username" placeholderText="Trudy Akortia" disabled={!editable}/>
                    <FormInput type="date" label="Date of birth" disabled={!editable}/>
                    <FormInput type="email" label="email" placeholderText="eg. johndoe@gmail.com" disabled={!editable}/>
                    <FormInput type="text" label="phone number" placeholderText={profile?.phone_number}
                               disabled={!editable}/>
                    <FormSelect label="language" options={options} disbaled={!editable}/>
                    {
                        editable ? <ProfileSaveButton/> : <ProfileEditButton action={toggleEditable}/>
                    }
                </form>
            </ContainerWrapper>
        </section>
    )
}