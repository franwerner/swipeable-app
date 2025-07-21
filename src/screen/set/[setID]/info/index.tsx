import BackHeader from "@/components/BackHeader.component"
import SetHeart from "@/components/SetHeart.component"
import colorPalette from "@/constant/colorPalette.constant"
import useResetStore from "@/hook/useResetStore.hook"
import CircleDecoration from "@/ui-components/CircleDecoration.ui-component"
import { View } from "react-native"
import SetActionBar from "./components/SetActionBar.component"
import SetCardInfo from "./components/SetCardInfo.component"
import SetInfoItems from "./components/SetInfoItems.component"
import SetInfoItemsForVisitor from "./components/SetInfoItemsForVisitor.component"
import useIsUserSet from "./hooks/useIsUserSet.hook"
import useSetInfoStore from "./store/useSetInfo.store"

const HeartComponent = () => {
    return (
        <CircleDecoration className="relative ">
            <SetHeart
                likeStatus={false}
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

    useResetStore(useSetInfoStore)

    const isUserSet = useIsUserSet()

    return (
        <View className="p-6 flex-1 gap-8">
            <BackHeader
                style={{
                    marginRight: isUserSet ? 60 : 0
                }}
                endComponent={!isUserSet && <HeartComponent />}
            />
            <View className="gap-6 flex-1">
                <SetCardInfo />
                {isUserSet && <SetActionBar />}
                <View className="flex-1">
                    {isUserSet ? <SetInfoItems /> : <SetInfoItemsForVisitor />}
                </View>
            </View>
        </View>
    )
}