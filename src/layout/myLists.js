const baseUrl = import.meta.env.BASE_URL;

const platforms = [
    {
        name: "Playstation",
        image: `${baseUrl}/assets/img/platforms/Playstation.png`,
        alt: "PlayStation image",
        color: "#191970",
    },
    {
        name: "Xbox",
        image: `${baseUrl}/assets/img/platforms/Xbox.png`,
        alt: "Xbox image",
        color: "#3b8132",
    },
    {
        name: "Pc",
        image: `${baseUrl}/assets/img/platforms/Pc.png`,
        alt: "Pc image",
        color: "#371c4b",
    },
    {
        name: "Nintendo",
        image: `${baseUrl}/assets/img/platforms/nintendo.png`,
        alt: "Pc image",
        color: "#720606",
    },
];

const categories = [
    "Action",
    "Adventure",
    "RPG",
    "Puzzle",
    "Racing",
    "Simulation",
    "Platform",
    "MMO",
    "Sport",
    "Shooter",
    "Strategy",
    "Fighting",
    "FPS",
    "Survival",
    "Other",
];

const productStatus = ["new", "like new", "used"];
const platformNames = ["xbox", "playstation", "pc", "nintendo"];

export { platforms, categories, productStatus, platformNames }