import Input from "@/components/Input.component"
import useSetCreationStore from "@/store/useSetManagerStore.store"

export default function DescriptionInput() {
    const description = useSetCreationStore((store) => store.setConfig.description)
    const addDescription = useSetCreationStore((store) => store.addDescription)
    const hasValue = description.length > 0
    return (
        <Input
            isActive={hasValue}
            className="!h-[150px] py-2 px-4"
            inputProps={{
                value: description,
                multiline: true,
                textAlignVertical: 'top',
                numberOfLines: 4,
                maxLength: 255,
                onChangeText: addDescription,
                placeholder: "Describe el set",
                className: "h-full"
            }}
        />
    )
}
