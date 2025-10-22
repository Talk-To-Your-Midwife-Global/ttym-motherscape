import useSWR from "swr";
import {PUBLICHOSTNAME} from "@/app/_config/main";
import {fetchUser} from "@/app/_lib/functions";


export function useUserProfileInfo(accessToken) {
    const {
        data,
        isLoading,
        error
    } = useSWR([`${PUBLICHOSTNAME}/user/`, accessToken], ([url, accessToken]) => fetchUser(url, accessToken));

    return {
        userProfileInfo: data,
        isLoading,
        error,
    }
}
