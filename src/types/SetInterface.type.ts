import { ColorValue } from "react-native"

interface ISet {
    id: string | number,
    title: string
    subtitle: string
    userBy: string
    colors: Array<ColorValue>
    likeStatus?: boolean
}

export default ISet