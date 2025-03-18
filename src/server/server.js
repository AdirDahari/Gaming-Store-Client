import {
    createUser as createUserReal,
    deleteUser as deleteUserReal,
    editUser as editUserReal,
    getUserById as getUserByIdReal,
    getUsers as getUsersReal,
    loginUser as loginUserReal,
    updateIsAdmin as updateIsAdminReal,
} from "./realServer/users";
import {
    createPost as createPostReal,
    deletePost as deletePostReal,
    editPost as editPostReal,
    getMyPosts as getMyPostsReal,
    getPostById as getPostByIdReal,
    getPosts as getPostsReal,
    getPostsByPlatform as getPostsByPlatformReal,
    updateLikePost as updateLikePostReal,
} from "./realServer/posts";
import {
    getUserById as getUserByIdDemo,
    getUsers as getUsersDemo,
    loginUser as loginUserDemo,
} from "./demoServer/users";
import {
    getMyPosts as getMyPostsDemo,
    getPostById as getPostByIdDemo,
    getPosts as getPostsDemo,
    getPostsByPlatform as getPostsByPlatformDemo,
    updateLikePost as updateLikePostDemo,
} from "./demoServer/posts";

const mode = import.meta.env.VITE_MODE;
const isDemoMode = mode === "demo";

const server = {
    users: {
        getUsers: async () => {
            if (isDemoMode) {
                return getUsersDemo();
            } else {
                return await getUsersReal();
            }
        },
        getUserById: async (id) => {
            if (isDemoMode) {
                return getUserByIdDemo(id);
            } else {
                return await getUserByIdReal(id);
            }
        },
        postLoginUser: async (data) => {
            if (isDemoMode) {
                return loginUserDemo(data);
            } else {
                return await loginUserReal(data);
            }
        },
        deleteUser: async (id) => {
            if (isDemoMode) {
                return;
            } else {
                return await deleteUserReal(id);
            }
        },
        putUser: async (id, data) => {
            if (isDemoMode) {
                return;
            } else {
                return await editUserReal(id, data);
            }
        },
        pacthIsAdmin: async (id) => {
            if (isDemoMode) {
                return;
            } else {
                return await updateIsAdminReal(id);
            }
        },
        postCreateUser: async (data) => {
            if (isDemoMode) {
                return;
            } else {
                return await createUserReal(data);
            }
        },
    },
    posts: {
        createPost: async (data) => {
            if (isDemoMode) {
                return;
            } else {
                return await createPostReal(data);
            }
        },
        getPosts: async () => {
            if (isDemoMode) {
                return getPostsDemo();
            } else {
                return await getPostsReal();
            }
        },
        putPost: async (id, data) => {
            if (isDemoMode) {
                return;
            } else {
                return await editPostReal(id, data);
            }
        },
        deletePost: async (id) => {
            if (isDemoMode) {
                return;
            } else {
                return await deletePostReal(id);
            }
        },
        getPostById: async (id) => {
            if (isDemoMode) {
                return getPostByIdDemo(id);
            } else {
                return await getPostByIdReal(id);
            }
        },
        getMyPosts: async () => {
            if (isDemoMode) {
                return getMyPostsDemo();
            } else {
                return await getMyPostsReal();
            }
        },
        patchLikePost: async (id) => {
            if (isDemoMode) {
                return updateLikePostDemo(id);
            } else {
                return await updateLikePostReal(id);
            }
        },
        getPostPlatform: async (platform) => {
            if (isDemoMode) {
                return getPostsByPlatformDemo(platform);
            } else {
                return await getPostsByPlatformReal(platform);
            }
        },
    },
};

export default server;
