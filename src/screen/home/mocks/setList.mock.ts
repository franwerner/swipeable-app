import ISet from "@/types/SetInterface.type";

const setListBase: Array<ISet> = [
    {
        id: 1,
        title: "🧢😎🎶",
        subtitle: "Plot Twist Eterno",
        userBy: "Cinefiloco",
        colors: ['#ff7e5f', '#feb47b', '#ffe5b4'],
        likeStatus: true
    },
    {
        id: 2,
        title: "🚀✨🌌",
        subtitle: "Viaje Intergaláctico",
        userBy: "AstroFan",
        colors: ['#6a11cb', '#2575fc', '#3a8dde'],
    },
    {
        id: 3,
        title: "🍕🎮🕹️",
        subtitle: "Noches Gamer",
        userBy: "PixelMaster",
        colors: ['#ff6a00', '#ee0979', '#ffb347'],
    },
    {
        id: 4,
        title: "📚☕📝",
        subtitle: "Tardes de Lectura",
        userBy: "BookLover",
        colors: ['#56ab2f', '#a8e063', '#d4f4a2'],
    },
    {
        id: 5,
        title: "🏖️🌞🌊",
        subtitle: "Vacaciones de Ensueño",
        userBy: "TravelBug",
        colors: ['#614385', '#516395', '#8fa1d0'],
    },
    {
        id: 6,
        title: "🎨🖌️🖼️",
        subtitle: "Arte y Creatividad",
        userBy: "ColorSplash",
        colors: ['#f7971e', '#ffd200', '#fff0b3'],
        likeStatus: true
    },
]

const setList = [...setListBase]
let idCount = setListBase.length
for (const element of setListBase) {
    for (let i = 0; i < 40; i++) {
        setList.push({ ...element, id: ++idCount })
    }
}

export default setList;

