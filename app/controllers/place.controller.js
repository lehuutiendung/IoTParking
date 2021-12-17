const Place = require("../models/place.model");
const Base = require("./base.controller");
const AppError = require("../utils/appError");

module.exports = {
    getPlaceAll: Base.getAll(Place),
    getPlaceByID: async (req, res, next) => {
        try {
            const doc = await Place.findById(req.params.id)
            .populate({
                path: 'listArea',
                model: 'Area',
                populate: {
                    path: 'data',
                    model: 'Sensor'
                }
            });
            if(!doc){
                return next( new AppError(404, 'Failed', 'No document found!'), req, res, next);
            }
            //Đếm số vị trí trống trong từng khu vực
            let listCustomArea = [];
            doc.listArea.forEach(element => {
                let countEmpty = 0;
                element.data.forEach(sensor => {
                    if(sensor.state == 0){
                        countEmpty++;
                    }
                });
                let area = {
                    _id: element._id,
                    areaName: element.name,
                    totalEmpty: countEmpty
                }
                listCustomArea.push(area);
            });
            //Dữ liệu trả về
            res.status(200).json({
                status: 'success',
                data: {
                    _id: doc._id,
                    placeName: doc.name,
                    listArea: listCustomArea
                }
            });
        } catch (error) {
            next(error);
        }
    }
}