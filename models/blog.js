const { dbConnection } = require('../config/dbConnection');
const { SendError } = require('../utils/sendError');

async function addBlog({keyCore,title, content, author_id}) {
    const [results] = await dbConnection.query(
        'INSERT INTO `blogs` (`keyCore`, `title`, `content`, `author_id`, `created_at`, `updated_at`)' +
        ' VALUES (?, ?, ?, ?, now(), now())',
        [keyCore, title, content, author_id]
    );
    return { id: results.insertId, title, content, author_id};
}

async function checkBlogExists(userName) {
    const [rows] = await dbConnection.query('SELECT * FROM blogs WHERE title = ?', [userName]);
    return rows.length > 0;
}

async function getAllBlogs() {
    const [result] = await dbConnection.query('SELECT * FROM `blogs` ORDER BY created_at DESC');
    return result;
}

async function getBlogById(id) {
    const [result] = await dbConnection.query('SELECT * FROM `blogs` WHERE id = ?', [id]);
    if (result.length === 0) throw new SendError(404, 'مقاله با این شناسه پیدا نشد');
    return result;
}

async function deleteBlog(id) {
    const [result] = await dbConnection.query('DELETE FROM `blogs` WHERE id = ?', [id]);
    if (result.affectedRows === 0) throw new SendError(404, 'مقاله مورد نظر پیدا نشد.');
    return result;
}

async function findByTitle(title) {
    const [result] = await dbConnection.query('SELECT * FROM `blogs` WHERE title = ?', [title]);
    if (result.length > 0) throw new SendError(400, 'مقاله‌ای با این عنوان قبلاً ثبت شده است.');
    return result;
}

async function updateBlogs(blogId, blogData) {
    const currentDataArray = await getBlogById(blogId);
    if (currentDataArray.length === 0) throw new SendError(404, 'مقاله پیدا نشد');

    const currentData = currentDataArray[0];
    const blogUpdate = {
        title: blogData.title || currentData.title,
        content: blogData.content || currentData.content,
    };

    const [result] = await dbConnection.query(
        'UPDATE `blogs` SET `title`= ?, `content`= ? WHERE id = ?',
        [blogUpdate.title, blogUpdate.content, blogId]
    );

    if (result.changedRows === 0) throw new SendError(400, 'اطلاعات جدیدی وارد نشده است');
    return result;
}

module.exports = {
    addBlog,
    checkBlogExists,
    getAllBlogs,
    getBlogById,
    deleteBlog,
    findByTitle,
    updateBlogs
};