import AnimatedTap from "@/components/AnimatedTap.component";
import { useSetFilter } from "@/screen/home/provider/SetFilter.provider";
import ISetFilter from "@/types/SetFilterInterface.type";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import clsx from "clsx";
import { Funnel, FunnelPlus } from "lucide-react-native";
import { memo, useCallback, useRef, useState } from "react";
import { Text, View } from "react-native";
import setFilters from "../mocks/setFilters.mocks";


interface FilterContainProps extends ISetFilter {
    selectedOptions?: Array<string>,
    handleSelectedOptions: (key: string, option: string) => void
}

interface SheetBodyProps {
    handleClose: () => void
}

const usePendingFilters = () => {
    const { selectedOptions, handleSelectedOptions } = useSetFilter()
    const [pendingOptions, setPendingOptions] = useState(selectedOptions)

    const handleSelectedPendingOptions = useCallback<FilterContainProps["handleSelectedOptions"]>(
        (type, option) => {
            setPendingOptions(prev => {
                const options = prev[type] || []
                const filterRepeatOption =
                    options.includes(option) ?
                        options.filter(i => i !== option) :
                        [...options, option]
                return {
                    ...prev,
                    [type]: filterRepeatOption
                }
            })
        }, [])

    const applyFilters = () => {
        handleSelectedOptions(pendingOptions)
    }
    const clearFilters = () => {
        setPendingOptions({})
        handleSelectedOptions({})
    }

    return {
        pendingOptions,
        handleSelectedPendingOptions,
        applyFilters,
        clearFilters
    }
}


const BackdropSheet = (props: BottomSheetDefaultBackdropProps) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />

const FilterContain = memo(({ options, label, type, handleSelectedOptions, selectedOptions = [] }: FilterContainProps) => {

    const hasSelectedOption = (i: string) => selectedOptions.includes(i)

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

const SheetBody = ({ handleClose }: SheetBodyProps) => {

    const {
        handleSelectedPendingOptions,
        pendingOptions,
        applyFilters,
        clearFilters
    } = usePendingFilters()

    return (
        <BottomSheetScrollView className="h-full flex  px-5">
            <Text className="text-center text-2xl pt-2 font-bold">Filtrar sets</Text>
            <View className="gap-5 mb-5">
                {setFilters.map(i =>
                    <FilterContain
                        key={i.type}
                        handleSelectedOptions={handleSelectedPendingOptions}
                        selectedOptions={pendingOptions[i.type]}
                        {...i}
                    />)}
            </View>
            <View className="h-[1px]  bg-black/5 w-full " />
            <View className="gap-5 py-5">
                <AnimatedTap
                    onPress={() => {
                        clearFilters()
                        handleClose()
                    }}
                    className="bg-primary-100 py-5  items-center rounded-[50px]">
                    <Text className="text-primary-800 text-xl font-semibold"> Limpiar todos los filtros</Text>
                </AnimatedTap>
                <AnimatedTap
                    onPress={() => {
                        applyFilters()
                        handleClose()
                    }}
                    className="bg-secondary-900 py-5  items-center rounded-[50px]">
                    <Text className="text-white text-xl font-semibold">Aplicar filtros</Text>
                </AnimatedTap>
            </View>
        </BottomSheetScrollView>
    )
}

const FilterIcon = () => {

    const { selectedOptions } = useSetFilter()

    const hasFilters = Object.values(selectedOptions).flat().length > 0

    return !hasFilters ?
        <Funnel
            size={28}
            color={"#443976"} /> :
        <FunnelPlus
            size={28}
            color={"#735ccf"} />
}

export default function SetFilters() {

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const handleOpen = () => bottomSheetModalRef.current?.present()
    const handleClose = () => bottomSheetModalRef.current?.close()

    return (
        <>
            <View className="justify-center p-3">
                <AnimatedTap onPress={() => handleOpen()}>
                    <FilterIcon />
                </AnimatedTap>
            </View>
            <BottomSheetModal
                backdropComponent={BackdropSheet}
                index={0}
                ref={bottomSheetModalRef}>

                <SheetBody handleClose={handleClose} />
            </BottomSheetModal>
        </>
    )
}