import SetImageBackground from "./components/SetImageBackground.component";
import SetManagerWrapper from "./components/SetManagerWrapper.component";



export default function SetCustomItem() {

    return (
        <SetManagerWrapper>
            <SetImageBackground
                className="h-[100px]"
                source={require("@/assets/images/itemCustom.png")} />
        </SetManagerWrapper>
    )
}