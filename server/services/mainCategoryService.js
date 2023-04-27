const SemiCategoryModel = require("../models/SemiCategory");
const MainCategory = require("../models/MainCategory");

exports.findAllMainCategory = async () => await MainCategory.find();

exports.findMainCategoryById = async (mainCategoryId) =>
  await MainCategory.findById(mainCategoryId);

exports.findMainCategoryByName = async (mainCategoryName) =>
  await MainCategory.findOne({ mainCategoryName });

exports.addNewMainCategory = async (request) => {
  const { checkName } = request;
  console.log("1111" + checkName);
  return new MainCategory({
    mainCategoryName: checkName
  });
};
