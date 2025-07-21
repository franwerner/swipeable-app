import useUserStore from "@/store/useUser.store";
import useSetInfoStore from "../store/useSetInfo.store";

export default function useIsUserSet() {
    const loggedID = useUserStore(state => state.user?.userID)
    const setID = useSetInfoStore(state => state.setData?.userBy.userID)
    return loggedID === setID
}