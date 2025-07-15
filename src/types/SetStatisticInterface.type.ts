import StaticsticType from "./StaticsticType.type"

interface SetStatistic {
    id: number
    avatarUrl: string
    nickname: string
}

export interface SetStatisticsGroup {
    type: StaticsticType
    data: SetStatistic[]
}


export default SetStatistic