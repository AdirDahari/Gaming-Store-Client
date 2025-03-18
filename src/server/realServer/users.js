import axios from "axios";

const getUsers = async () => {
    try {
        const { data } = await axios.get("/users");
        return data;
    } catch (err) {
        throw new Error("getUsers real server request failed", err);
    }
};

const getUserById = async (id) => {
    try {
        const { data } = await axios.get(`users/${id}`);
        return data;
    } catch (err) {
        throw new Error("getUserById real server request failed", err);
    }
};

const createUser = async (data) => {
    try {
        await axios.post("/users", data);
    } catch (err) {
        throw new Error("createUser real server request failed", err);
    }
};

const loginUser = async (data) => {
    try {
        const { data: resData } = await axios.post("/users/login", data);
        return resData;
    } catch (err) {
        throw new Error("loginUser real server request failed", err);
    }
};

const editUser = async (id, data) => {
    try {
        await axios.put(`/users/${id}`, data);
    } catch (err) {
        throw new Error("editUser real server request failed", err);
    }
}

const updateIsAdmin = async (id) => {
    try {
        const { data } = await axios.patch(`/users/${id}`);
        return data;
    } catch (err) {
        throw new Error("updateIsAdmin real server request failed", err);
    }
}

const deleteUser = async (id) => {
    try {
        await axios.delete(`/users/${id}`);
    } catch (err) {
        throw new Error("deleteUser real server request failed", err);
    }
}

export { getUsers, getUserById, createUser, loginUser, editUser, updateIsAdmin, deleteUser };
