const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
    const { name } = req.body;
    try {
        let category = new Category({ name });
        await category.save();
        res.status(201).json(category);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getCategories = async (req, res) => {
    try {
        const { user } = req.body;
        const userId =(user.id);
        const categories = await Category.find({"userId" : userId});
        console.log(categories);
        res.json(categories);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        let category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ msg: 'Category not found' });
        }
        category.name = name;
        await category.save();
        res.json(category);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
exports.getCategoryById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const category = await Category.findById(id);
  
      if (!category) {
        return res.status(404).json({ msg: 'Car not found' });
      }
  
      res.json(category);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
exports.deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        let category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ msg: 'Category not found' });
        }
        await category.deleteOne({ _id: id });
        res.json({ msg: 'Category removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};