const {Device, DeviceInfo, Brand, Type} =  require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')
const {badRequest} = require("../error/ApiError");
const {unlinkSync} = require("fs");

class DeviceController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body

            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            await img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const device = await Device.create({name, price, brandId, typeId, img:fileName})

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                )
            }

            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res,next) {
        try {
            let {brandId, typeId, limit, page} = req.query;
            page = page || 1
            limit = limit || 9
            let offset = page * limit - limit
            let devices;
            if (!brandId && !typeId) {
                devices = await Device.findAndCountAll({
                    include: [
                        {model: Brand},
                        {model: Type},
                    ],
                    limit,
                    offset})
            }
            if (brandId && !typeId) {
                devices = await Device.findAndCountAll({
                    where:{brandId},
                    include: [
                        {model: Brand},
                        {model: Type},
                    ],
                    limit,
                    offset
                })}
            if (!brandId && typeId) {
                devices = await Device.findAndCountAll({
                    where:{typeId},
                    include: [
                        {model: Brand},
                        {model: Type},
                    ],
                    limit,
                    offset
                })}
            if (brandId && typeId) {
                devices = await Device.findAndCountAll({
                    where:{typeId, brandId},
                    include: [
                        {model: Brand},
                        {model: Type},
                    ],
                    limit,
                    offset
                })}
            return res.json(devices)
        } catch (e) {
            next(badRequest(e.message));
        }
    }

    async getOne(req, res) {
        const {id} = req.params
        const device =await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            },
        )
        return res.json(device)
    }

    async delete(req, res, next){
        const { id } = req.body;

        try {
            const device = await Device.findOne({where: {id}});

            await device.destroy();

            return res.json({ message: 'Device deleted' });
        } catch (error) {
            return next(badRequest({ error: 'Server error' }));
        }
    }

    async editDevice(req, res, next)
    {
        try {
            let {id, name, price, brandId, typeId, info} = req.body
            const {img} = req.files

            let device
            device = await Device.findOne({where: {id: id}})

            if (img) {
                if (device.img) {
                    unlinkSync(path.resolve(__dirname, '..', 'static', device.img))
                }
                let fileName = uuid.v4() + ".jpg"
                await img.mv(path.resolve(__dirname, '..', 'static', fileName))
                await Device.update({img: fileName}, {where: {id: id}})
            }

            if (info) {
                info = JSON.parse(info)
                await DeviceInfo.destroy({where: {deviceId: device.id}});
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                )
            }
            device.name = name
            device.price = price
            device.brandId = brandId
            device.typeId = typeId
            device.info = info


            await device.save()
            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

}

module.exports = new DeviceController()