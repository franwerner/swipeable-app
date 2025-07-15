import SetStatistic, { SetStatisticsGroup } from "@/types/SetStatisticInterface.type";


const avatarUrl = "https://randomuser.me/api/portraits/men/1.jpg"

const generateUsers = (prefix: string, startId: number): SetStatistic[] =>
    Array.from({ length: 20 }, (_, i) => ({
        id: startId + i,
        avatarUrl,
        nickname: `${prefix}  ${i + 1}`,
    }))

const setStatisticsMock: SetStatisticsGroup[] = [
    {
        type: "like",
        data: generateUsers("Like", 1),
    },
    {
        type: "normal",
        data: generateUsers("Normal", 100),
    },
    {
        type: "dislike",
        data: generateUsers("Dislike", 200),
    },
]


export default setStatisticsMock