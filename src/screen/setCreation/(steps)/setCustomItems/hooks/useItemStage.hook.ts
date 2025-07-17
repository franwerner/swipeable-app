import useSetManagerStore from "@/screen/setCreation/store/useSetManagerStore.store"
import SetItem from "@/types/SetItemInteface.type"
import { nanoid } from "nanoid/non-secure"
import { useEffect, useState } from "react"

export type ItemStage = "edit" | "create" | "none"

const emojiRegex = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g


function useSetItem(defaultSetItem: Pick<SetItem, "emoji" | "title"> = { emoji: "", title: "" }) {

    const [item, setItem] = useState(defaultSetItem)

    const onChangeTitle = (value: string) => {
        const emojiMatch = value.match(emojiRegex)
        if (emojiMatch) {
            setItem(prev => ({ ...prev, emoji: emojiMatch[0] }))
        }
        setItem(prev => ({ ...prev, title: value.replace(emojiRegex, "") }))
    }

    const onChangeEmoji = (value: string) => {
        const emojiMatch = value.length == 0 ? value : (value.match(emojiRegex)?.[0])
        if (emojiMatch !== undefined) {
            setItem(prev => ({ ...prev, emoji: emojiMatch }))
        }
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
        console.log(itemInEdit)
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
