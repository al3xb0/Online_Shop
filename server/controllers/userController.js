const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const {User, Basket, Device, Type} = require('../models/models')
const jwt = require('jsonwebtoken')
const {badRequest} = require("../error/ApiError");

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '2h'})
}

class UserController {
    async registration(req, res, next) {
        const {email, password, role} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Incorrect email or password'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('This email is occupied by another user'))
        }
        const hashPassword = await bcrypt.hash(password,5)
        const user = await User.create({email, role, password: hashPassword})
        const basket = await Basket.create({userId: user.id})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('User not found'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Wrong password'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        const role = user.role
        return res.json({token, role})

    }

    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

    async getAll(req, res) {
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let users
        users = await User.findAndCountAll({
            limit,
            offset
        })
        return res.json(users)
    }


    async delete(req, res, next){
        const { id } = req.body;

        try {
            const user = await User.findOne({where: {id}});

            await user.destroy();

            return res.json({ message: 'User deleted' });
        } catch (error) {
            return next(badRequest({ error: 'Server error' }));
        }
    }

    async editUser(req, res, next)
    {
        try {
            const {id, email, password, role} = req.body
            let users
            const hashPassword = await bcrypt.hash(password,5)
            users = await User.findOne({where: {id: id}})
            users.email = email
            users.password = hashPassword
            users.role = role
            await users.save()
            return res.json(users)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }
}

module.exports = new UserController()