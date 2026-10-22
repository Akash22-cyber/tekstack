const express = require('express');
const router = express.Router();

// In-memory inventory array
let cars = [];

// GET /read - Retrieve all car records
router.get('/read', (req, res) => {
    res.json(cars);
});

// POST /insert - Add a new car record
router.post('/insert', (req, res) => {
    const { id, name } = req.body;
    const newCar = { id, name };
    cars.push(newCar);
    res.status(201).json({ message: 'Car added successfully', car: newCar });
});

// PUT /update/:id - Update an existing car record by ID
router.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const car = cars.find(c => c.id == id);

    if (!car) {
        return res.status(404).json({ message: 'Car not found' });
    }

    car.name = name;
    res.json({ message: 'Car updated successfully', car });
});

// DELETE /delete/:id - Delete a car record by ID
router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const index = cars.findIndex(c => c.id == id);

    if (index === -1) {
        return res.status(404).json({ message: 'Car not found' });
    }

    const deleted = cars.splice(index, 1);
    res.json({ message: 'Car deleted successfully', car: deleted[0] });
});

module.exports = router;
