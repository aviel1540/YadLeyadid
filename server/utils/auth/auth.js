const bcrypt = require('bcrypt');
exports.hashPassword = async(value) => {
    const salt = await bcrypt.genSalt();
    value = await bcrypt.hash(value, salt);
    return value;
}