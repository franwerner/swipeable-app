import colorPalette from "@/constant/colorPalette.constant";
import clsx from "clsx";
import { ReactNode } from "react";
import { TextInput, TextInputProps } from "react-native";
import Container, { ContainerProps } from "./Container.component";

export interface InputProps extends ContainerProps {
    inputProps?: TextInputProps
    endComponent?: ReactNode
    startCompoent?: ReactNode
}

export default function Input({
    inputProps = {},
    endComponent,
    startCompoent,
    ...props
}: InputProps) {
    return (
        <Container
            {...props}>
            {startCompoent}
            <TextInput
                placeholderTextColor={colorPalette.primary[800]}
                {...inputProps}
                className={clsx(
                    "flex-1 text-[16px] font-semibold h-full",
                    inputProps.className
                )}
            />
            {endComponent}
        </Container>
    )
}

