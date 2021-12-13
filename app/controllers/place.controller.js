const Place = require("../models/place.model");
const Base = require("./base.controller");
const AppError = require("../utils/appError");

module.exports = {
    getPlaceAll: Base.getAll(Place),
    getPlaceByID: async (req, res, next) => {
        try {
            const doc = await Place.findById(req.params.id).populate('listArea');
            if(!doc){
                return next( new AppError(404, 'Failed', 'No document found!'), req, res, next);
            }
    
            res.status(200).json({
                status: 'success',
                data:{
                    doc
                }
            });
        } catch (error) {
            next(error);
        }
    }
}