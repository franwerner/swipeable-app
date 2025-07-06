import ISetFilter from "@/types/SetFilterInterface.type";

const SetFilters: Array<ISetFilter> = [
    {
        type: "gender",
        label: "Por genero",
        options: ["Música", "Comida", "Peliculas", "Frases"]
    },
    {
        type: "popularity",
        label: "Popularidad",
        options: ["Tendencias", "Mas votados", "Recien creados"]
    },
    {
        type: "previous_swipes",
        label: "En base a tus swipes anteriores",
        options: ["Filtrar por afinidad con mis gustos"]
    }
]


export default SetFilters