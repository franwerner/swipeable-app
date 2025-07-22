import useUserStore from "@/store/useUser.store";
import useSetStore from "../store/useSet.store";

export default function useIsUserSet() {
    const loggedID = useUserStore(state => state.user?.userID)
    const setID = useSetStore(state => state.setData?.userBy.userID)
    return loggedID === setID
}