const Car = require('../models/Car');

exports.createCar = async (req, res) => {
    const { category, color, model, make, registrationNo } = req.body;
    try {
        let car = new Car({
            category,
            color,
            model,
            make,
            registrationNo,
        });
        await car.save();
        res.status(201).json(car);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getCars = async (req, res) => {
    try {
        const cars = await Car.find().populate('category');
        res.json(cars);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updateCar = async (req, res) => {
    const { id } = req.params;
    const { category, color, model, make, registrationNo } = req.body;
    try {
        let car = await Car.findById(id);
        if (!car) {
            return res.status(404).json({ msg: 'Car not found' });
        }
        car.category = category;
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
        let car = await Car.findById(id);
        if (!car) {
            return res.status(404).json({ msg: 'Car not found' });
        }
        await car.remove();
        res.json({ msg: 'Car removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};