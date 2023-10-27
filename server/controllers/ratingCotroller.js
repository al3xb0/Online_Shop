const {Rating, Device} = require('./../models/models');
const jwt = require('jsonwebtoken');
const {FLOAT} = require("sequelize");

class RatingController {
    async addRating(req, res) {
        try {
            const {rate, deviceId} = req.body;
            const token = req.headers.authorization.split(' ')[1];
            const user = jwt.verify(token, process.env.SECRET_KEY);
            await Rating.create({rate, deviceId, userId: user.id});

            let rating = await Rating.findAndCountAll({
                where: {
                    deviceId
                },
            });

            let allRating = 0;
            let avgRating;
            rating.rows.forEach(item => allRating += item.rate);
            avgRating = Number(allRating) / Number(rating.count);
            console.log(avgRating)

            await Device.update(
                {rating: avgRating},
                {where: {id: deviceId}}
            );

            return res.json("Rating added");
        } catch (e) {
            console.error(e);
        }
    }

    async checkRating(req, res) {
        try {
            const {deviceId} = req.body;
            const token = req.headers.authorization.split(' ')[1];
            const user = jwt.verify(token, process.env.SECRET_KEY);
            const checkRating = await Rating.findOne({where: {deviceId, userId: user.id}});
            const checkDevices =  await Device.findOne({where: {id: deviceId}});
            if (!checkDevices) {
                return res.json({allow: false});
            } else if(checkRating && checkDevices) {
                return res.json({allow: false});
            }
            return res.json({allow: true});
        } catch (e) {
            return res.status(401).json("Something going wrong with rating");
        }
    }
}

module.exports = new RatingController();