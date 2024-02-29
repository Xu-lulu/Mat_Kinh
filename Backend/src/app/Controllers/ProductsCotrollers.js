const products = require("../Models/Products");

class ProductsControllnes {
  async updataProducts(req, res, next) {
    try {
      const newdata = new products({
        Name: req.body.Name,
        Price: req.body.Price,
        Description: req.body.Description,
        Image: req.body.Image,
        count: req.body.count,
        Category: req.body.Category,
      });
      if (req.file) {
        newdata.Image = req.file.path;
      }
      newdata.save();
      res.status(200).json(newdata);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async allProducts(req, res, next) {
    try {
      const dataproducts = await products.find();
      res.status(200).json(dataproducts);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async dataupdate(req, res, next) {
    try {
      const id = req.params.id;
      const dataproducts = await products.findById(id);
      res.status(200).json(dataproducts);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async delete(req, res, next) {
    try {
      const id = req.params.id;
      const data = await products.findOneAndDelete({ _id: id });
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async update(req, res, next) {
    try {
      const id = req.params.id;
      const updatedData = {
        Name: req.body.Name,
        Price: req.body.Price,
        Description: req.body.Description,
        Image: req.body.Image,
        count: req.body.count,
        Category: req.body.Category,
      };
      if (req.file) {
        updatedData.Image = req.file.path;
      }
      const data = await products.findOneAndUpdate({ _id: id }, updatedData, {
        new: true,
      });
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async findProducts(req, res, next) {
    try {
      const name = req.params.name;
      console.log(name);
      const data = await products.find({ Name: name });
      res.status(200).json(data);
      console.log(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async findCategory(req, res, next) {
    try {
      const nameCate = req.params.name;
      const newdata = await products.find({ Category: nameCate });
      res.status(200).json(newdata);
      console.log(nameCate);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
module.exports = new ProductsControllnes();
