import { PageSlideAnimator } from "../components";

export default function OnboardingLayout({children}){
    return (
        <PageSlideAnimator>
            {children}
        </PageSlideAnimator>
    )
}