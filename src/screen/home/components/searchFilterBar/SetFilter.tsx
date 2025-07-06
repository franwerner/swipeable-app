import AnimatedTap from "@/components/AnimatedTap.component";
import { useSetFilter } from "@/providers/SetFilter.provider";
import ISetFilter from "@/types/SetFilterInterface.type";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import clsx from "clsx";
import { FilterIcon } from "lucide-react-native";
import { useCallback, useRef, useState } from "react";
import { Text, View } from "react-native";
import SetFilters from "../../mocks/SetFilters.mocks";


interface FilterContainProps extends ISetFilter {
    selectedOptions?: Array<string>,
    handleSelectedOptions: (key: string, options: Array<string>) => void
}

interface ActionFilterProps {
    applyFilters: () => void
    clearFilters: () => void
}

interface SheetBodyProps {
    handleClose: () => void
}


const BackdropSheet = (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />

function FilterContain({ options, label, type, handleSelectedOptions, selectedOptions = [] }: FilterContainProps) {

    const hasSelectedOption = (i: string) => selectedOptions.includes(i)

    const onPress = (option: string) => {
        if (hasSelectedOption(option)) {
            handleSelectedOptions(type, selectedOptions.filter(i => i !== option))
        } else {
            handleSelectedOptions(type, [...selectedOptions, option])
        }
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
}

function ActionFilter({ applyFilters, clearFilters }: ActionFilterProps) {
    return (
        <View className="gap-5 py-3 flex-1">
            <View className="h-[1px] bg-black/5 w-full " />
            <AnimatedTap
                onPress={clearFilters}
                className="bg-primary-100 py-6  items-center rounded-[50px]">
                <Text className="text-primary-800 text-xl font-bold"> Limpiar todos los filtros</Text>
            </AnimatedTap>
            <AnimatedTap
                onPress={applyFilters}
                className="bg-secondary-900 py-6  items-center rounded-[50px]">
                <Text className="text-white text-xl font-bold">Aplicar filtros</Text>
            </AnimatedTap>
        </View>
    )
}


function SheetBody({ handleClose }: SheetBodyProps) {
    const { selectedOptions, handleSelectedOptions } = useSetFilter()

    const [pendingOptions, setPendingOptions] = useState(selectedOptions)

    const handleSelectedPendingOptions = useCallback<FilterContainProps["handleSelectedOptions"]>((type, options) => {
        setPendingOptions(prev => {
            return {
                ...prev,
                [type]: options
            }
        })
    }, [])

    const applyFilters = () => {
        handleSelectedOptions(pendingOptions)
        handleClose()
    }
    const clearFilters = () => {
        setPendingOptions({})
        handleSelectedOptions({})
        handleClose()
    }

    return (
        <BottomSheetScrollView className="h-full px-5">
            <Text className="text-center text-2xl pt-2 font-bold">Filtrar sets</Text>
            <View className="gap-5">
                {SetFilters.map(i =>
                    <FilterContain
                        key={i.type}
                        handleSelectedOptions={handleSelectedPendingOptions}
                        selectedOptions={pendingOptions[i.type]}
                        {...i}
                    />)}
            </View>
            <ActionFilter
                applyFilters={applyFilters}
                clearFilters={clearFilters}
            />
        </BottomSheetScrollView>
    )
}

export default function SetFilter() {

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const handleOpen = () => bottomSheetModalRef.current?.present()
    const handleClose = () => bottomSheetModalRef.current?.close()

    return (
        <>
            <View className=" h-full justify-center px-3">
                <AnimatedTap onPress={() => handleOpen()}>
                    <FilterIcon
                        size={28}
                        color={"#443976"} />
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