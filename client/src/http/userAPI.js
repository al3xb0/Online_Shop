import {$adminHost, $authHost, $host} from "./index";
import jwt_decode from "jwt-decode"

export const registration = async (email, password) => {
    const {data} = await $host.post('api/user/registration', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    localStorage.setItem('role', data.role)
    return jwt_decode(data.token, data.role)
}

export const check = async () => {
    const { data } = await $authHost.get('api/user/auth')
    if (data.message === "The user is not logged in") {
        return data
    } else {
        localStorage.setItem('token', data.token);
        return jwt_decode(data.token);
    }
}

export const fetchUsers = async(page, limit = 9) => {
    const {data} = await $adminHost.get('api/user', {params: {
            page, limit
        }})
    return data
}

export const deleteUser = async (user) => {
    const {data} = await $adminHost.put('api/user/delete/:id', user)
    return data
}

export const editUser = async (user) => {
    const {data} = await $adminHost.put('api/user/edit', user)
    return data
}

export const checkAdmin = async() => {
    const { data } = await $adminHost.get('api/user/admin');
    if (data.message === "The user is not logged in") {
        return data
    } else {
        localStorage.setItem('token', data.token);
        return jwt_decode(data.token);
    }
}