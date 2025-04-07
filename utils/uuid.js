const { v4: uuidv4 } = require('uuid')
const { Buffer } = require('buffer')

function generateUUID() {
    const uuid = uuidv4();
    return Buffer.from(uuid.replace(/-/g, ''), 'hex');
}

// function uuidToBinary(uuid) for watch uuid as string

// function binaryToUUID(binary) {
//     return binary.toString('hex').match(/.{8}|.{4}|.{4}|.{4}|.{12}/g).join('-');
// }

module.exports = {
    generateUUID,
};
