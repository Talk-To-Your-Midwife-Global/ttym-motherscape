export function OnboardHeading({title = null, subTitle = null}) {
    return (
        <header className="px-[20px] pt-5 pb-7 font-medium">
            <h1 className="text-xl text-mainText font-semibold text-center">{title}</h1>
            <p className="text-base text-subText text-center">{subTitle}</p>
        </header>
    )
}