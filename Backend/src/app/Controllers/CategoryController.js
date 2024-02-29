const categos = require("../Models/Category");

class CategoryControllnes {
  async updataCategory(req, res, next) {
    try {
      const newdata = new categos({
        Namecategory: req.body.Namecategory,
      });
      newdata.save();
      res.status(200).json(newdata);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async allCategory(req, res, next) {
    try {
      const newdata = await categos.find();
      res.status(200).json(newdata);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async findCategory(req, res, next) {
    try {
      const nameCate = req.params.name;
      const newdata = await categos.find({ Namecategory: nameCate });
      res.status(200).json(newdata);
      console.log(nameCate);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
module.exports = new CategoryControllnes();
