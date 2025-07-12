import AnimatedTap from "@/components/AnimatedTap.component";
import clsx from "clsx";
import { useEffect } from "react";
import { PressableProps } from "react-native";
import Animated, { useAnimatedProps, useSharedValue, withTiming } from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path)

interface AnimatedCheckSvgProps {
    isActive?: Boolean
}

const AnimatedCheckSvg = ({ isActive }: AnimatedCheckSvgProps) => {
    const progress = useSharedValue(0)

    useEffect(() => {
        progress.value = withTiming(isActive ? 1 : 0, { duration: 300 });
    }, [isActive])

    const animatedProps = useAnimatedProps(() => {
        const length = 24
        return {
            strokeDashoffset: length - length * progress.value,
        }
    })

    return (
        <Svg
            width={24}
            height={24}
            viewBox="0 0 24 24" fill="none">
            <AnimatedPath
                d="M5 13L9 17L19 7"
                stroke="white"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="24"
                animatedProps={animatedProps}
            />
        </Svg>
    )
}


interface CheckboxProps extends PressableProps, AnimatedCheckSvgProps { }

export default function Checkbox({
    className,
    onPress,
    isActive = false,
    ...props
}: CheckboxProps) {
    return (
        <AnimatedTap
            className={clsx(
                'border rounded-[7px] justify-center items-center border-primary-200 h-[32px] w-[32px]',
                className,
                isActive && 'bg-secondary-900 border-secondary-500'
            )}
            onPress={onPress}
            {...props}
        >
            <AnimatedCheckSvg isActive={isActive} />
        </AnimatedTap>
    );
}