import SetDisplay from "@/types/SetDisplayInterface.type";

const setListBase: Array<SetDisplay> = [
    {
        id: 1,
        emoji: "🧢😎🎶",
        name: "Plot Twist Eterno",
        userBy: {
            id: 1,
            nickname: "Pepe argento"
        },
        colors: ['#ff7e5f', '#feb47b'],
        likeStatus: true
    },
    {
        id: 2,
        emoji: "🚀✨🌌",
        name: "Viaje Intergaláctico",
        userBy: {
            id: 2,
            nickname: "AstroFan"
        },
        colors: ['#6a11cb', '#2575fc'],
    },
    {
        id: 3,
        emoji: "🍕🎮🕹️",
        name: "Noches Gamer",
        userBy: {
            id: 3,
            nickname: "PixelMaster"
        },
        colors: ['#ff6a00', '#ee0979'],
    },
    {
        id: 4,
        emoji: "📚☕📝",
        name: "Tardes de Lectura",
        userBy: {
            id: 4,
            nickname: "BookLover"
        },
        colors: ['#56ab2f', '#a8e063'],
    },
    {
        id: 5,
        emoji: "🏖️🌞🌊",
        name: "Vacaciones de Ensueño",
        userBy: {
            id: 5,
            nickname: "TravelBug"
        },
        colors: ['#614385', '#516395'],
    },
    {
        id: 6,
        emoji: "🎨🖌️🖼️",
        name: "Arte y Creatividad",
        userBy: {
            id: 6,
            nickname: "ColorSplash"
        },
        colors: ['#f7971e', '#ffd200'],
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

