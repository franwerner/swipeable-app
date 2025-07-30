import StaticsticType from "./StaticsticType.type"
import User from "./UserInterface.type"



export interface SetStatisticsStatus {
    type: StaticsticType
    users: Array<Pick<User, "avatarUrl" | "userID" | "nickname">>
}

interface SetItemStatistic {
    itemID: string | number
    title: string
    status: Array<SetStatisticsStatus>
}

export default SetItemStatistic