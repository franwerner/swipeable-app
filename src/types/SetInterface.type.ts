import { ColorValue } from "react-native"

interface ISet {
    id: string | number,
    icon: string
    name: string
    userBy: string
    colors: Array<ColorValue>
    likeStatus?: boolean
}

export default ISet