// import { BlurView } from "expo-blur"
import { LinearGradient, LinearGradientProps } from "expo-linear-gradient"

interface SetCardGradientProps extends Omit<LinearGradientProps, "colors"> {
    colors: Array<string>
}

export default function SetCardGradient({ colors, children, ...props }: SetCardGradientProps) {
    return (
        <LinearGradient
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            className="flex-1"
            {...props}
            colors={[...colors,] as any}>
            {/* <BlurView
                intensity={100}
                className="flex-1"
            > */}
                {children}
            {/* </BlurView> */}
        </LinearGradient>

    )
}