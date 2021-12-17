const Area = require("../models/area.model");
const Base = require("./base.controller");
const AppError = require("../utils/appError");

module.exports = {
    getAreaByID: async (req, res, next) => {
        try {
            const doc = await Area.findById(req.params.id).populate('data');
            
            res.status(200).json({
                status: 'success',
                totalData: doc.length,
                data:{
                    doc
                }
            });
        } catch (error) {
            next(error);
        } 
    }
}