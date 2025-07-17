import User from "./UserInterface.type";

export interface ISetBase {
    setID: number
    name: string
    emojis: Array<string>
    colors: Array<string>
}

interface ISet extends ISetBase {
    topic: string
    visibility: "public" | "private"
    userBy: Pick<User, "userID" | "avatarUrl" | "nickname">
    likeStatus?: boolean
    items_count: number
    description: string
}


export default ISet