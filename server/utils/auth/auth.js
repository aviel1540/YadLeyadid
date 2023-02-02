const bcrypt = require("bcrypt");
const User = require('../../models/User');

exports.hashPassword = async (value) => {
	const salt = await bcrypt.genSalt();
	value = await bcrypt.hash(value, salt);
	return value;
};

exports.login = async(idTeuda,password) => {
	const user = await User.findOne( {idTeuda});
	if(user) {
		auth = await bcrypt.compare(password, user.password)
		if(auth) {
			return user;
		}
		throw Error('incorrect password !')
	}
	throw Error('No Id found !')
}
