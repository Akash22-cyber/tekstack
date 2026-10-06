const express = require('express');
const app = express();

// Listen on a port defined by an environment variable (defaults to 3000)
const PORT = process.env.PORT || 3000;

// Middleware usage: Use express.json() to correctly parse incoming JSON data
app.use(express.json());

// In-memory array for the car dealership's inventory (starting with sample data based on screenshots)
let inventory = [
    { name: "Ford Aspire", id: "A101" },
    { name: "Ford Ecosport", id: "A102" },
    { name: "Ford Fiesta", id: "A103" }
];

// GET /read: Retrieve all car records and return the entire inventory
app.get('/read', (req, res) => {
    res.json(inventory);
});

// POST /insert: Add a new car record by accepting a JSON request body and appending it
app.post('/insert', (req, res) => {
    const newCar = {
        name: req.body.name,
        id: req.body.id
    };
    inventory.push(newCar);
    
    // Return the updated inventory as shown in screenshots
    res.json(inventory);
});

// PUT /update/:id: Locate a car by its ID and update its name based on the request body
app.put('/update/:id', (req, res) => {
    const carId = req.params.id;
    const newName = req.body.name;

    inventory = inventory.map(car => {
        if (car.id === carId) {
            return { name: newName, id: car.id };
        }
        return car;
    });

    // Return the updated inventory as shown in screenshots
    res.json(inventory);
});

// DELETE /delete/:id: Find a car by its ID and remove it from the inventory
app.delete('/delete/:id', (req, res) => {
    const carId = req.params.id;

    inventory = inventory.filter(car => car.id !== carId);

    // Return the updated inventory as shown in screenshots
    res.json(inventory);
});

// Server setup and logging
app.listen(PORT, () => {
    console.log(`Server started successfully! Listening on port ${PORT}...`);
});
