const {Type} =  require('../models/models')
const {badRequest} = require("../error/ApiError");

class TypeController {
    async create(req, res, next) {
        const {name} = req.body
        const existingType = await Type.findOne({where: {name}})
        if (existingType) {
            return next(badRequest('Brand existing'));
        }
        const type = await Type.create({name})
        return res.json(type)
    }

    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }

    async delete(req, res, next){
        const { id } = req.body;

        try {
            const type = await Type.findOne({where: {id}});

            await type.destroy();

            return res.json({ message: 'Type deleted' });
        } catch (error) {
            return next(badRequest({ error: 'Server error' }));
        }
    }

}

module.exports = new TypeController()