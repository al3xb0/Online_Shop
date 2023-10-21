const {Brand} =  require('../models/models')
const {badRequest} = require("../error/ApiError");


class BrandController {
    async create(req, res, next) {
        const {name} = req.body
        const existingBrand = await Brand.findOne({where: {name}})
        if (existingBrand) {
            return next(badRequest('Brand existing'));
        }
        const brand = await Brand.create({name})
        return res.json(brand)
    }

    async getAll(req, res) {
        const brands = await Brand.findAll()
        return res.json(brands)
    }

    async delete(req, res, next){
        const { id } = req.body;

        try {
            const brand = await Brand.findOne({where: {id}});

            await brand.destroy();

            return res.json({ message: 'Brand deleted' });
        } catch (error) {
            return next(badRequest({ error: 'Server error' }));
        }
    }


}

module.exports = new BrandController()