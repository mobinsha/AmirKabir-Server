const { dbConnection } = require('../config/dbConnection');
const { SendError } = require('../utils/sendError');

async function addSlide({keyCore, imageUrl, title, description}) {
    const [result] = await dbConnection.query(
        'INSERT INTO `slides`(`keyCore`,`image_url`, `title`, `description`, `created_at`) VALUES (?,?, ?, ?, now())',
        [keyCore, imageUrl, title, description]
    );
    return { id: result.insertId, imageUrl, title, description};
}

async function getAllSlides() {
    const [result] = await dbConnection.query('SELECT * FROM slides ORDER BY created_at DESC');
    return result;
}

async function getSlideByTitle(title) {
    const [result] = await dbConnection.query('SELECT * FROM slides WHERE title = ?', [title]);
    if (result.length === 0) throw new SendError(404, 'اسلایدی با این نام پیدا نشد');
    return result;
}

async function deleteSlide(id) {
    const [result] = await dbConnection.query('DELETE FROM slides WHERE id = ?', [id]);
    if (result.affectedRows === 0) throw new SendError(404, 'اسلایدی با این شناسه پیدا نشد');
    return result;
}

module.exports = {
    addSlide,
    getAllSlides,
    getSlideByTitle,
    deleteSlide
};