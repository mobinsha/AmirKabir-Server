const slideModel =  require('../../models/slide')
const { sendResponse } = require('../../utils/responseHandler');

async function getAllSlides (req, res, next){
    try {
        const slides = await slideModel.getAllSlides()
        sendResponse(res, 200, 'Success', slides)
    } catch (err) {
        next(err)
    }
}

async function getSlideByTitle (req, res, next){
    const slideTitle = req.params.title
    try {
        const slide = await slideModel.getSlideByTitle(slideTitle)
        sendResponse(res, 200, 'Success', slide)
    }catch (err){
        next(err)
    }
}

module.exports = {
    getAllSlides,
    getSlideByTitle,
}