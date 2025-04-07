const {sendResponse} = require("../../utils/responseHandler");
const slideModel = require("../../models/slide");
const {generateUUID} = require("../../utils/uuid");


async function uploadSlide(req, res, next) {
    try {
        const newUuid = generateUUID();
        const { title, description } = req.body;

        const result = await slideModel.addSlide({
            keyCore: newUuid,
            imageUrl: `${req.protocol}://${req.get('host')}/uploads/slides/${req.file.filename}`,
            title,
            description
        });
        sendResponse(res, 201, 'اسلاید با موفقیت اضافه شد', result);
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