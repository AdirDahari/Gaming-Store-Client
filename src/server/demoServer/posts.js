import postsDataDemo from "../../../public/demo/database/posts";
import usersDataDemo from "../../../public/demo/database/users";

const getPosts = async () => {
    return postsDataDemo;
}

const getPostsByPlatform = async (platform) => {
    return postsDataDemo.filter((post) => post.platform == platform);
}

const getPostById = async (id) => {
    return postsDataDemo.filter((post) => post._id == id)[0];
}

const getMyPosts = async () => {
    return postsDataDemo;
}

const updateLikePost = async (id) => {
    let data = postsDataDemo.find((post) => post._id == id);
    const index = data.likes.indexOf(usersDataDemo[0]._id);

    if (index < 0) {
        data.likes.push(usersDataDemo[0]._id);
    } else {
        data.likes.splice(index, 1);
    }
    return data;
}

export { getMyPosts, getPostById, getPosts, getPostsByPlatform, updateLikePost }