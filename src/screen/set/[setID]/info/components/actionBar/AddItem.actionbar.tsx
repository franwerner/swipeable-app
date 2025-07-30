import useSetManagerStore from "@/store/useSetManagerStore.store"
import { Plus } from "lucide-react-native"
import { nanoid } from "nanoid/non-secure"
import { useState } from "react"
import { View } from "react-native"
import ModalItemHandler from "../ModalItemHandler.component"
import SetAction from "./SetAction.actionbar"

export default function AddItem() {

    const toggleItem = useSetManagerStore(store => store.toggleItem)
    const [isOpen, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    const handleItemChange = (values: { emoji: string; title: string }) => {
        toggleItem({
            itemID: nanoid(),
            source: "user",
            visibility: "public",
            ...values
        })
        handleClose()
    }

    return (
        <View>
            <SetAction
                handler={() => setOpen(true)}
                Icon={Plus}
                label="Añadir"
            />
            {
                isOpen && <ModalItemHandler
                    mode="add"
                    handleClose={handleClose}
                    handleItemChange={handleItemChange}
                />
            }
        </View>
    )
}