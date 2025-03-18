import ROUTES from "../router/ROUTES";

const ICON_PATHS = {
    login: "M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1",
    postAdd: "M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    favorite: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    register: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z",
    account: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    manage: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
    logout: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1",
    info: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
};

const createIcon = (type) => ({
    path: ICON_PATHS[type],
    type
});

const MainLink = [
    { to: ROUTES.ABOUT, children: "About us" },
];

const MainAdminLink = [
    { to: ROUTES.ABOUT, children: "About us" },
    { to: ROUTES.MANAGMENT, children: "Management" },
];

const GuestLink = [
    { to: ROUTES.REGISTER, children: "Register", icon: createIcon("register") },
    { to: ROUTES.LOGIN, children: "Login", icon: createIcon("login") },
];

const GuestMobileLink = [
    { to: ROUTES.ABOUT, children: "About us", icon: createIcon("info") },
    { to: ROUTES.LOGIN, children: "Login", icon: createIcon("login") },
    { to: ROUTES.REGISTER, children: "Register", icon: createIcon("register") }
];

const ProfileLink = [
    { to: ROUTES.CREATEPOST, children: "Create post", icon: createIcon("postAdd") },
    { to: ROUTES.FAVOURITES, children: "Favourites", icon: createIcon("favorite") },
];

const ProfileMobileLink = [
    { to: ROUTES.ABOUT, children: "About us", icon: createIcon("info") },
    { to: ROUTES.CREATEPOST, children: "Create post", icon: createIcon("postAdd") },
    { to: ROUTES.FAVOURITES, children: "Favourites", icon: createIcon("favorite") }
];

const ProfileMobileAdminLink = [
    { to: ROUTES.ABOUT, children: "About us", icon: createIcon("info") },
    { to: ROUTES.CREATEPOST, children: "Create post", icon: createIcon("postAdd") },
    { to: ROUTES.FAVOURITES, children: "Favourites", icon: createIcon("favorite") },
    { to: ROUTES.MANAGMENT, children: "Management", icon: createIcon("manage") },
];

const ProfileIconLink = [
    { to: ROUTES.PROFILE, children: "Profile", icon: createIcon("account") },
    { to: ROUTES.HOME, children: "Logout", icon: createIcon("logout") }
];

export {
    MainLink,
    GuestLink,
    ProfileLink,
    ProfileIconLink,
    ProfileMobileLink,
    GuestMobileLink,
    MainAdminLink,
    ProfileMobileAdminLink
};