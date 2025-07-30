import BackHeader from "@/components/BackHeader.component"
import SetHeart from "@/components/SetHeart.component"
import colorPalette from "@/constant/colorPalette.constant"
import useSetManagerStore from "@/store/useSetManagerStore.store"
import CircleDecoration from "@/ui-components/CircleDecoration.ui-component"
import { View } from "react-native"
import SetActionBar from "./components/actionBar"
import SetCardInfo from "./components/SetCardInfo.component"
import SetInfoItems from "./components/SetInfoItems.component"
import SetInfoItemsForVisitor from "./components/SetInfoItemsForVisitor.component"
import useIsUserSet from "./hooks/useIsUserSet.hook"

const HeartComponent = () => {

    const updateSet = useSetManagerStore(store => store.updateSet)
    const likeStatus = !!useSetManagerStore(store => store.setConfig.likeStatus)

    return (
        <CircleDecoration className="relative ">
            <SetHeart
                onChangeStatus={(likeStatus) => {
                    updateSet({ likeStatus })
                }}
                likeStatus={likeStatus}
                hearthProps={{
                    active: {
                        fill: colorPalette.primary[500],
                        stroke: colorPalette.primary[500]
                    },
                    inactive: {
                        stroke: colorPalette.primary[800],
                        strokeWidth: 1.5
                    }
                }}
            />
        </CircleDecoration>
    )
}

export default function SetInfo() {

    const isUserSet = useIsUserSet()

    useSetManagerStore(store => store.items)

    return (
        <View className="p-6 flex-1 gap-6">
            <BackHeader
                style={{
                    marginRight: isUserSet ? 60 : 0
                }}
                endComponent={!isUserSet && <HeartComponent />}
            />
            <View className="gap-6 flex-1">
                <SetCardInfo />
                {isUserSet && <SetActionBar />}
                <View className="flex-1 ">
                    {isUserSet ? <SetInfoItems /> : <SetInfoItemsForVisitor />}
                </View>
            </View>
        </View>
    )
}