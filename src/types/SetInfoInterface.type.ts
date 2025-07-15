import SetDisplay from "./SetDisplayInterface.type";
import User from "./UserInterface.type";

type SetInfo = Omit<SetDisplay, "userBy">
    & { userBy: Pick<User, "id" | "avatarUrl" | "nickname"> }
    & { items_count: number, description: string }

export default SetInfo