import User from "./UserInterface.type"

interface SetDisplay {
    id: string | number
    emoji: string
    name: string
    userBy: Pick<User, "id" | "nickname">
    colors: Array<string>
    likeStatus?: boolean
}

export default SetDisplay