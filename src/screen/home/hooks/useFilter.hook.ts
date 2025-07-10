import ISetFilter from "@/types/SetFilterInterface.type"
import { UnknownOutputParams, useLocalSearchParams, useRouter } from "expo-router"
import { useCallback, useState } from "react"


type SelectedFilters = Record<`filter_${string}`, Array<string> | undefined>

const getFilterKey = (type: string) => `filter_${type}` as const

function getSelectedFilters(
    setFilters: Array<ISetFilter>,
    selectedFilterOptions: UnknownOutputParams
) {
    return setFilters.reduce((acc, current) => {
        const filterParamKey = getFilterKey(current.type)
        const selectedFilterOption = selectedFilterOptions[filterParamKey]
        if (Array.isArray(selectedFilterOption)) {
            acc[filterParamKey] = selectedFilterOption
        }
        return acc
    }, {} as SelectedFilters)
}

export default function useFilter(
    setFilters: Array<ISetFilter>
) {

    const filters = useLocalSearchParams()
    const {
        setParams
    } = useRouter()
    const [pendingOptions, setPendingOptions] = useState(() => getSelectedFilters(setFilters, filters))

    const handlePendingOptions = useCallback((
        type: string,
        option: string
    ) => {
        const filterParamKey = getFilterKey(type)
        setPendingOptions(prev => {
            const options = prev[filterParamKey] || []
            const filterRepeated = options.includes(option) ? options.filter(i => i !== option) : [...options, option]
            return {
                ...prev,
                [filterParamKey]: filterRepeated
            }
        })
    }, [])

    const commitPedingOptions = () => {
        setParams(pendingOptions)
    }

    const clearSelectedOptions = () => {
        const cleared = Object.fromEntries(setFilters.map(key => [getFilterKey(key.type)]))
        setPendingOptions(cleared)
        setParams(cleared)
    }

    const getPedingOption = (type: string) => getFilterKey(type)

    return {
        commitPedingOptions,
        clearSelectedOptions,
        handlePendingOptions,
        pendingOptions,
        getPedingOption
    }
}