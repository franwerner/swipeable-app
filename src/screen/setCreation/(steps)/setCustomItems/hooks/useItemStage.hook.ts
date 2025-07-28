import useSetManagerStore from "@/store/useSetManagerStore.store"
import { nanoid } from "nanoid/non-secure"
import { useEffect, useState } from "react"

export type ItemStage = "edit" | "create" | "none"



function useSetItem() {

    const [item, setItem] = useState({ emoji: "", title: "" })

    const onChangeTitle = (title: string) => {
        setItem(prev => ({ ...prev, title }))
    }

    const onChangeEmoji = (emoji: string) => {
        setItem(prev => ({ ...prev, emoji }))
    }

    return {
        item,
        onChangeEmoji,
        onChangeTitle
    }
}


export default function useItemStage() {

    const addItem = useSetManagerStore(store => store.addItem)
    const updateItem = useSetManagerStore(store => store.updateItem)
    const itemInEdit = useSetManagerStore(store => store.itemInEdit)

    const [stage, setStage] = useState<ItemStage>("none")

    const { item, onChangeEmoji, onChangeTitle } = useSetItem()

    const { emoji, title } = item

    const hasValues = !!(emoji && title)

    useEffect(() => {
        if (itemInEdit) {
            setStage("edit")
            onChangeEmoji(itemInEdit.emoji)
            onChangeTitle(itemInEdit.title)
        } else {
            setStage("none")
            onChangeEmoji("")
            onChangeTitle("")
        }
    }, [itemInEdit])

    const startCreate = () => {
        setStage("create")
    }

    const create = () => {
        if (!hasValues) return
        addItem({
            itemID: nanoid(),
            emoji,
            title,
            visibility: "public",
            source: "user",
        })
        restart()
    }

    const saveEdit = () => {
        if (!itemInEdit || !hasValues) return
        updateItem({
            itemID: itemInEdit.itemID,
            emoji,
            title,
        })
        restart()
    }

    const restart = () => {
        setStage("none")
        onChangeEmoji("")
        onChangeTitle("")
    }


    const action = () => {
        if (stage == "none") startCreate()
        else if (stage === "create") create()
        else if (stage === "edit") saveEdit()
    }


    return {
        action,
        stage,
        hasValues,
        onChangeTitle,
        onChangeEmoji,
        title,
        emoji
    }
}
