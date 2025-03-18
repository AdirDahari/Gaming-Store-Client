import axios from "axios";

const getPosts = async () => {
    try {
        const { data } = await axios.get("/posts");
        return data;
    } catch (err) {
        throw new Error("getUsers real server request failed", err);
    }
}

const getPostsByPlatform = async (platform) => {
    try {
        const { data } = await axios.get(`/posts/platform/${platform}`);
        return data;
    } catch (err) {
        throw new Error("getUsers real server request failed", err);
    }
}

const getPostById = async (id) => {
    try {
        const { data } = await axios.get(`/posts/${id}`);
        return data;
    } catch (err) {
        throw new Error("getUsers real server request failed", err);
    }
}

const getMyPosts = async () => {
    try {
        const { data } = await axios.get("/posts/profile/my-posts");
        return data;
    } catch (err) {
        throw new Error("getUsers real server request failed", err);
    }
}

const createPost = async (data) => {
    try {
        const { data: resData } = await axios.post("/posts", data);
        return resData;
    } catch (err) {
        throw new Error("getUsers real server request failed", err);
    }
}

const editPost = async (id, data) => {
    try {
        const { data: resData } = await axios.put(`/posts/${id}`, data);
        return resData;
    } catch (err) {
        throw new Error("getUsers real server request failed", err);
    }
}

const updateLikePost = async (id) => {
    try {
        await axios.patch(`/posts/${id}`);
    } catch (err) {
        throw new Error("getUsers real server request failed", err);
    }
}

const deletePost = async (id) => {
    try {
        await axios.delete(`/posts/${id}`);
    } catch (err) {
        throw new Error("getUsers real server request failed", err);
    }
}

export { createPost, deletePost, editPost, getMyPosts, getPostById, getPosts, getPostsByPlatform, updateLikePost }