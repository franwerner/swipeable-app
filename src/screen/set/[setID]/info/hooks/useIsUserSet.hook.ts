import useSetManagerStore from "@/store/useSetManagerStore.store";
import useUserStore from "@/store/useUser.store";

export default function useIsUserSet() {
    const loggedID = useUserStore(state => state.user?.userID)
    const setID = useSetManagerStore(state => state.setConfig?.userBy.userID)
    return loggedID === setID
}