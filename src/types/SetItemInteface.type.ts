


export default interface SetItem {
    itemID: number | string
    emoji: string
    title: string
    visibility: "public" | "private"
    source: "AI" | "user"
}
