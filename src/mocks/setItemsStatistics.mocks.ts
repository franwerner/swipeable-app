import SetItemStatistic from "@/types/SetItemStatistic.type";
import setItemsMock from "./itemList.mock";


const avatarUrl = "https://randomuser.me/api/portraits/men/1.jpg"

const generateUsers = (prefix: string, startId: number): Array<{ userID: string; nickname: string; avatarUrl: string }> =>
    Array.from({ length: 10 }, (_, i) => ({
        userID: `${startId + i}`,
        nickname: `${prefix}`,
        avatarUrl,
    }))
const statisticTypes = ["like", "normal", "dislike"] as const
const setItemsStatisticsMock: SetItemStatistic[] = Array.from({ length: setItemsMock.length - 10 }, (_, i) => ({
    itemID: setItemsMock[i].itemID,
    title: setItemsMock[i].title,
    status: statisticTypes.map((type, j) => ({
        type,
        users: generateUsers(`${type} ${i + 1}`, i * 100 + j * 10),
    })),
}))

export default setItemsStatisticsMock