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
    const token = localStorage.getItem('token');
    if (token) {
        const { data } = await $authHost.get('api/user/auth');
        localStorage.setItem('token', data.token);
        return jwt_decode(data.token);
    } else {
        throw Error('Not logged in');
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
    const token = localStorage.getItem('token');
    if (token) {
        const { data } = await $adminHost.get('api/user/admin');
        localStorage.setItem('token', data.token);
        return jwt_decode(data.token);
    } else {
        throw Error('Not admin');
    }
}