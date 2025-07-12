import ISet from "@/types/SetInterface.type";

const setListBase: Array<ISet> = [
    {
        id: 1,
        icon: "🧢😎🎶",
        title: "Plot Twist Eterno",
        userBy: "Cinefiloco",
        colors: ['#ff7e5f', '#feb47b'],
        likeStatus: true
    },
    {
        id: 2,
        icon: "🚀✨🌌",
        title: "Viaje Intergaláctico",
        userBy: "AstroFan",
        colors: ['#6a11cb', '#2575fc'],
    },
    {
        id: 3,
        icon: "🍕🎮🕹️",
        title: "Noches Gamer",
        userBy: "PixelMaster",
        colors: ['#ff6a00', '#ee0979'],
    },
    {
        id: 4,
        icon: "📚☕📝",
        title: "Tardes de Lectura",
        userBy: "BookLover",
        colors: ['#56ab2f', '#a8e063'],
    },
    {
        id: 5,
        icon: "🏖️🌞🌊",
        title: "Vacaciones de Ensueño",
        userBy: "TravelBug",
        colors: ['#614385', '#516395'],
    },
    {
        id: 6,
        icon: "🎨🖌️🖼️",
        title: "Arte y Creatividad",
        userBy: "ColorSplash",
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

