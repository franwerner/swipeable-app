import useUserStore from "@/store/useUser.store";
import useSetInfoStore from "../store/useSetInfo.store";

export default function useIsUserSet() {
    const loggedID = useUserStore(state => state.user.id)
    const setID = useSetInfoStore(state => state.setInfo?.userBy.id)
    return loggedID === setID
}