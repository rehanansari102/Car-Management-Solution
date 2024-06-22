const Car = require('../models/Car');

exports.createCar = async (req, res) => {
    const { categoryId, color, model, make, registrationNo,user } = req.body;
    try {

        let car = new Car({
            categoryId,
            color,
            model,
            make,
            registrationNo,
            userId:user?.id
        });
        await car.save();
        res.status(201).json(car);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
exports.getCarById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const car = await Car.findById(id);
  
      if (!car) {
        return res.status(404).json({ msg: 'Car not found' });
      }
  
      res.json(car);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
exports.getCars = async (req, res) => {
    const {user } = req.body;
    try {
        const cars = await Car.find({ userId: user?.id }).sort({ createdAt: -1 });
        res.json(cars);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updateCar = async (req, res) => {
    const { id } = req.params;
    const { category, color, model, make, registrationNo,user } = req.body;
    console.log(user);
    try {
        let car = await Car.findById(id);
        if (!car) {
            return res.status(404).json({ msg: 'Car not found' });
        }
        car.categoryId = category;
        car.userId  = user?.id
        car.color = color;
        car.model = model;
        car.make = make;
        car.registrationNo = registrationNo;
        await car.save();
        res.json(car);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deleteCar = async (req, res) => {
    const { id } = req.params;

    try {
      const car = await Car.findById(id);
  
      if (!car) {
        return res.status(404).json({ msg: 'Car not found' });
      }
  
      await Car.deleteOne({ _id: id });
  
      res.json({ msg: 'Car removed' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
};