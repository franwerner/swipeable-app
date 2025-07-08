
type Param = string | string[] | undefined

export default function normalizeQueryParam(param: Param) {
    if (Array.isArray(param)) return param[0]
    return (param || "")
}