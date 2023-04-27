const SemiCategory = require("../models/SemiCategory");
const Product = require("../models/Product");


exports.allSemiCategory = async () => await SemiCategory.find();

exports.findSemiCategoryById = async(semiCategoryId) => await SemiCategory.findById(semiCategoryId);


exports.addSemiCategory = async (request) => {
	const { checkSerialNumber, checkName } = request;

	return new SemiCategory({
		serialNumber: checkSerialNumber,
        name: checkName,
        quantity: 0,
	});
};

exports.findSemiCategoryBySerialNumber = async(serialNumber) => await SemiCategory.findOne({serialNumber});
exports.findSemiCategoryByName = async(name) => await SemiCategory.findOne({name});

exports.updateSemiCategory = async(request) => {
    const {checkId, checkSerialNumber,checkName} = request;
    return await SemiCategory.findByIdAndUpdate(checkId, {
        serialNumber:checkSerialNumber,
        name:checkName
    });
}

exports.deleteSemiCategory = async(semiCategoryId) => await SemiCategory.findByIdAndRemove(semiCategoryId);


