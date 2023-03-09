const MainCategory = require("../models/MainCategory");
const escape = require("escape-html");
const addSlashes = require("../utils/validation");

    exports.addNewMainCategory = async (req, res) => {
        const categoryName = escape(req.body.name);
        try {
            const checkName = addSlashes(categoryName);

            const mainCategoryFound = await MainCategory.findOne({ name: checkName });
            if (mainCategoryFound)
                return res.status(400).json({ message: "הקטגוריה קיימת במערכת" });
            const mainCategory = new MainCategory({
                name: checkName
            });
            await mainCategory.save();
            return res.status(201).json({ message: "הקטגוריה נוספה בהצלחה" });
        } catch (err) {
            console.log(err);
            return res.status(400).json({ message: err });
        }
    },
    exports.deleteMainCategory = async (req, res) => {
        
    },
    exports.getMainCategoryById = async (req, res) => {

    },
    exports.updateMainCategory = async (req, res) => {

    },
    exports.asignSemiCategoryToMainCategory = async (req, res) => {

    },
    exports.getSemiCategoryInMainCategory = async (req, res) => {

    }
