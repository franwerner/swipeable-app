import AnimatedTap from "@/components/AnimatedTap.component";
import Button from "@/components/Button.component";
import colorPalette from "@/constant/colorPalette.constant";
import ISetFilter from "@/types/SetFilterInterface.type";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import clsx from "clsx";
import { SlidersIcon } from "lucide-react-native";
import { memo, useRef } from "react";
import { Text, View } from "react-native";
import useFilter from "../hooks/useFilter.hook";
import setFilters from "../mocks/setFilters.mocks";

interface FilterOptionsProps extends ISetFilter {
    selectedOptions?: Array<string>,
    handleSelectedOptions: (type: string, option: string) => void
}

interface SheetBodyProps {
    handleClose: () => void
}

const FilterOptions = memo(({
    options,
    label,
    type,
    handleSelectedOptions,
    selectedOptions = []
}: FilterOptionsProps) => {

    const hasSelectedOption = (option: string) => selectedOptions.includes(option)

    const onPress = (option: string) => handleSelectedOptions(type, option)

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


const SheetBody = ({
    handleClose
}: SheetBodyProps) => {

    const {
        clearSelectedOptions,
        commitPedingOptions,
        handlePendingOptions,
        pendingOptions,
        getPedingOption
    } = useFilter(setFilters)

    return (
        <BottomSheetScrollView className="h-full flex  px-5">
            <Text className="text-center text-2xl pt-2 font-bold">Filtrar sets</Text>
            <View className="gap-5 mb-5">
                {setFilters.map(i =>
                    <FilterOptions
                        handleSelectedOptions={handlePendingOptions}
                        key={i.type}

                        {...i}
                        selectedOptions={pendingOptions[getPedingOption(i.type)]}
                    />)}
            </View>
            <View className="h-[1px]  bg-black/5 w-full " />
            <View className="gap-5 mb-5 py-5">
                <Button
                    onPress={() => {
                        handleClose()
                        clearSelectedOptions()
                    }}
                    className="!bg-primary-100 !py-5  rounded-[50px]">
                    <Text className="text-primary-800 text-xl font-semibold"> Limpiar todos los filtros</Text>
                </Button>
                <Button
                    onPress={() => {
                        handleClose()
                        commitPedingOptions()
                    }}
                    className=" !py-5  rounded-[50px]">
                    <Text className="text-white text-xl font-semibold">Aplicar filtros</Text>
                </Button>
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
                        color={colorPalette.primary[800]}
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