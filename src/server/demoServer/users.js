import usersDataDemo from "../../../public/demo/database/users";
import { SignJWT } from "jose";


const demoSecret = "R18ehfEsSZ5skj7DvBg2rOFUugR2D4duW1qJfCgLrtT2jSXj83sbxm";

const getUsers = async () => {
    return usersDataDemo;
};

const getUserById = async (id) => {
    return usersDataDemo.find((user) => user._id = id);
};

const loginUser = async (data) => {
    const user = usersDataDemo.find((user) => data.email == user.email && data.password == user.password);

    const encoder = new TextEncoder();
    const secretKey = encoder.encode(demoSecret);

    const payload = { _id: user._id, isAdmin: user.isAdmin };
    const jwt = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(secretKey);
    return { jwt };
};

export { getUsers, getUserById, loginUser };
