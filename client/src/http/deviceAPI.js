import {$adminHost, $authHost, $host} from "./index";

export const createType = async (type) => {
    const {data} = await $adminHost.post('api/type/create', type)
    return data
}

export const deleteType = async (type) => {
    const {data} = await  $adminHost.put('api/type/delete/:id', type)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}

export const createBrand = async (brand) => {
    const {data} = await $adminHost.post('api/brand/create', brand)
    return data
}

export const deleteBrand = async (brand) => {
    const {data} = await  $adminHost.put('api/brand/delete/:id', brand)
    return data
}

export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand')
    return data
}

export const createDevice = async (device) => {
    const {data} = await $adminHost.post('api/device/create', device)
    return data
}

export const deleteDevice = async (device) => {
    const {data} = await $adminHost.put('api/device/delete/:id', device)
    return data
}

export const fetchDevices = async (typeId, brandId, page, limit = 5) => {
    const {data} = await $host.get('api/device', {params: {
            typeId, brandId, page, limit
        }})
    return data
}

export const fetchOneDevice = async (id) => {
    const {data} = await $host.get('api/device/' + id)
    return data
}

export const editDevice = async (device) => {
    const {data} = await $adminHost.put('api/device/edit', device)
    return data
}

export const addRating = async (body) => {
    const {data} = await $authHost.post('api/rating', body);
    return data;
}

export const checkRating = async (body) => {
    const {data} = await $authHost.post('api/rating/check-rating', body);
    return data;
}
