import { ColorValue } from "react-native"

interface ISet {
    id: string | number,
    emoji: string
    name: string
    userBy: string
    colors: Array<ColorValue>
    likeStatus?: boolean
}

export default ISet