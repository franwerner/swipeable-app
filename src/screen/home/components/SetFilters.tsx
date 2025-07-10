import AnimatedTap from "@/components/AnimatedTap.component";
import ISetFilter from "@/types/SetFilterInterface.type";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import clsx from "clsx";
import { router, UnknownOutputParams, useLocalSearchParams } from "expo-router";
import { SlidersIcon } from "lucide-react-native";
import { memo, useRef } from "react";
import { Text, View } from "react-native";
import setFilters from "../mocks/setFilters.mocks";

interface FilterOptionsProps extends ISetFilter {
    selectedOptions?: Array<string>,
}

interface SheetBodyProps {
    handleClose: () => void
}

const FilterOptions = memo(({
    options,
    label,
    type,
    selectedOptions = []
}: FilterOptionsProps) => {

    const hasSelectedOption = (option: string) => selectedOptions.includes(option)

    const onPress = (option: string) => {

        const filterRepeated = hasSelectedOption(option) ? selectedOptions.filter(i => i !== option) : [...selectedOptions, option]

        router.setParams({
            [`filter_${type}`]: filterRepeated
        })
    }

    return (
        <View className="gap-5">
            <Text className="text-xl font-medium">{label}</Text>
            <View className="flex-row gap-2 flex-wrap">
                {options.map((option) =>
                    <AnimatedTap
                        key={option}
                        className={clsx(
                            "p-4 rounded-full border border-black/5  ",
                            hasSelectedOption(option) && "bg-primary-100  border-primary-100"
                        )}
                        onPress={() => onPress(option)} >
                        <Text className="text-primary-800 text-sm">{option}</Text>
                    </AnimatedTap>
                )}
            </View>
        </View>
    )
})

const FilterContain = () => {

    const filters = useLocalSearchParams()

    const asFilterArray = (filter: UnknownOutputParams[keyof UnknownOutputParams]) => {
        if (Array.isArray(filter)) return filter
    }

    return (
        <View className="gap-5 mb-5">
            {setFilters.map(i =>
                <FilterOptions
                    key={i.type}
                    {...i}
                    selectedOptions={asFilterArray(filters[`filter_${i.type}`])}
                />)}
        </View>
    )
}


const SheetBody = ({
    handleClose
}: SheetBodyProps) => {

    return (
        <BottomSheetScrollView className="h-full flex  px-5">
            <Text className="text-center text-2xl pt-2 font-bold">Filtrar sets</Text>
            <FilterContain />
            <View className="h-[1px]  bg-black/5 w-full " />
            <View className="gap-5 mb-5 py-5">
                <AnimatedTap
                    onPress={() => {
                        handleClose()
                    }}
                    className="bg-primary-100 py-5  items-center rounded-[50px]">
                    <Text className="text-primary-800 text-xl font-semibold"> Limpiar todos los filtros</Text>
                </AnimatedTap>
                <AnimatedTap
                    onPress={() => {
                        handleClose()
                    }}
                    className="bg-secondary-900 py-5  items-center rounded-[50px]">
                    <Text className="text-white text-xl font-semibold">Aplicar filtros</Text>
                </AnimatedTap>
            </View>
        </BottomSheetScrollView>
    )
}


export default function SetFilters() {

    const bottomSheetModalRef = useRef<BottomSheetModal>(null)

    const handleOpen = () => bottomSheetModalRef.current?.present()
    const handleClose = () => bottomSheetModalRef.current?.close()

    return (
        <>
            <View className="justify-center p-3">
                <AnimatedTap onPress={handleOpen}>
                    <SlidersIcon
                        color={"#514093"}
                        size={28}
                    />
                </AnimatedTap>
            </View>
            <BottomSheetModal
                backdropComponent={(props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />}
                index={0}
                ref={bottomSheetModalRef}>

                <SheetBody handleClose={handleClose} />
            </BottomSheetModal>
        </>
    )
}