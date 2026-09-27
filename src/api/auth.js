import axios from "axios";
import config from "../config";

async function login({email,password}){
    return await axios.post(`${config.apiUrl}/api/auth/login`,{
        email,
        password,
    })
}

async function signup(data){
    return await axios.post(`${config.apiUrl}/api/auth/register`,data)
}

async function forgotPassword({ email }) {
    return await axios.post(`${config.apiUrl}/api/auth/forgot-password`, { email });
}

async function resetPassword({ token, userId, password }) {
    return await axios.post(`${config.apiUrl}/api/auth/reset-password`, { 
        token, 
        userId, 
        password, 
        newPassword: password 
    });
}

export { login, signup, forgotPassword, resetPassword };