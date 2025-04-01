const {sendResponse} = require("../../utils/responseHandler");
const slideModel = require("../../models/slide");

async function uploadSlide(req, res, next) {
    try {
        if (!req.file) {
            return sendResponse(res, 400, 'عکسی بارگزاری نشده است.');
        }
        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/slides/${req.file.filename}`;
        const slideData = {
            imageUrl: imageUrl,
            title: req.body.title,
            description: req.body.description
        }
        const result = await slideModel.addSlide(slideData)
        sendResponse(res, 201, 'اسلاید با موفقیت اضافه شد', result)
    } catch (err) {
        next(err)
    }
}

async function deleteSlide (req, res, next){
    const slideId = req.params.id
    try {
        await slideModel.deleteSlide(slideId)
        sendResponse(res, 200, 'اسلاید مورد نظر با موفیقت حذف شد')
    }catch (err){
        next(err)
    }
}

module.exports = {
    uploadSlide,
    deleteSlide
}