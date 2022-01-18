const Sensor = require("../models/sensor.model");
const AppError = require("../utils/appError");

/**
 * Lấy tất cả bản ghi
 * @param {*} Model 
 * @returns 
 */
exports.getAll = Model => async (req, res, next) => {
    try {
        // Sắp xếp bản ghi theo thời gian gần nhất
        const doc = await Model.find({}).select('name');
        
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
/**
 * Lấy 1 bản ghi theo id
 * @param {*} Model 
 * @returns 
 */
exports.getOne = Model => async (req, res, next) => {
    try {
        const doc = await Model.findById(req.params.id);
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

/**
 * Cập nhật bản ghi theo id
 * @param {*} Model 
 * @returns 
 */
exports.updateOne = Model => async (req, res, next) => {
    try {
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,                              //return updated doc
            runValidators: true                     //validate before update
        })
        if(!doc){
            return next(new AppError(404, 'Failed', 'No document found!'), req, res, next);
        }

        res.status(200).json({
            status: 'Success',
            data: {
                doc
            }
        })
    } catch (error) {
        next(error);
    }
}
