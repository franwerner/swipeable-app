import ISet from "@/types/SetInfoInterface.type";

const setList: ISet[] = [
    {
        setID: 1,
        emojis: ["🎨", "🖌️", "🖼️"],
        name: "Plot Twist Eterno",
        topic: "Narrativa y creatividad",
        visibility: "public",
        userBy: {
            userID: 1,
            avatarUrl: "https://example.com/avatars/1.png",
            nickname: "Pepe Argento",
        },
        colors: ["#ff7e5f", "#feb47b"],
        likeStatus: true,
        items_count: 24,
        description: "Una colección siempre cambiante de giros inesperados.",
    },
    {
        setID: 2,
        emojis: ["🚀", "🪐", "✨"],
        name: "Viaje Intergaláctico",
        topic: "Exploración espacial",
        visibility: "public",
        userBy: {
            userID: 2,
            avatarUrl: "https://example.com/avatars/2.png",
            nickname: "AstroFan",
        },
        colors: ["#6a11cb", "#2575fc"],
        items_count: 18,
        description: "Explora los límites del espacio y la imaginación.",
    },
    {
        setID: 3,
        emojis: ["🎮", "🌙", "🕹️"],
        name: "Noches Gamer",
        topic: "Videojuegos y ocio nocturno",
        visibility: "public",
        userBy: {
            userID: 3,
            avatarUrl: "https://example.com/avatars/3.png",
            nickname: "PixelMaster",
        },
        colors: ["#ff6a00", "#ee0979"],
        items_count: 32,
        description: "Los mejores momentos de juegos nocturnos y victorias épicas.",
    },
    {
        setID: 4,
        emojis: ["📚", "☕", "🛋️"],
        name: "Tardes de Lectura",
        topic: "Lectura y relax",
        visibility: "public",
        userBy: {
            userID: 4,
            avatarUrl: "https://example.com/avatars/4.png",
            nickname: "BookLover",
        },
        colors: ["#56ab2f", "#a8e063"],
        items_count: 12,
        description: "Un rincón acogedor para perderse entre páginas.",
    },
    {
        setID: 5,
        emojis: ["✈️", "🏖️", "🗺️"],
        name: "Vacaciones de Ensueño",
        topic: "Viajes y turismo",
        visibility: "public",
        userBy: {
            userID: 5,
            avatarUrl: "https://example.com/avatars/5.png",
            nickname: "TravelBug",
        },
        colors: ["#614385", "#516395"],
        items_count: 20,
        description: "Colección de destinos y recuerdos inolvidables.",
    },
    {
        setID: 6,
        emojis: ["🖍️", "🎨", "💡"],
        name: "Arte y Creatividad",
        topic: "Inspiración artística",
        visibility: "public",
        userBy: {
            userID: 6,
            avatarUrl: "https://example.com/avatars/6.png",
            nickname: "ColorSplash",
        },
        colors: ["#f7971e", "#ffd200"],
        likeStatus: true,
        items_count: 40,
        description: "Inspiración y técnica para liberar tu lado artístico.",
    },
];


const setListMock = [...setList]
let idCount = setList.length
for (const element of setList) {
    for (let i = 0; i < 40; i++) {
        setListMock.push({ ...element, setID: ++idCount })
    }
}

export default setListMock;

