// Global array to store customer objects
let customers = [];

// Function to add customer
function addCustomer() {

    // Get values from input fields
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let age = document.getElementById("age").value;
    let height = document.getElementById("height").value;
    let weight = document.getElementById("weight").value;

    // Create customer object
    let customer = {
        name: name,
        email: email,
        age: age,
        height: height,
        weight: weight
    };

    // Store object in global array
    customers.push(customer);

    // Display customer details
    displayCustomers();

    // Clear form
    clearForm();
}


// Function to display customers in table
function displayCustomers() {

    let table = document.getElementById("customerTable");

    // Clear previous table data
    table.innerHTML = "";

    // Loop through customer array
    customers.forEach(function(customer) {

        // Create table row
        let row = document.createElement("tr");

        // Name
        let nameCell = document.createElement("td");
        nameCell.innerText = customer.name;

        // Email
        let emailCell = document.createElement("td");
        emailCell.innerText = customer.email;

        // Age
        let ageCell = document.createElement("td");
        ageCell.innerText = customer.age;

        // Height
        let heightCell = document.createElement("td");
        heightCell.innerText = customer.height;

        // Weight
        let weightCell = document.createElement("td");
        weightCell.innerText = customer.weight;

        // Add cells to row
        row.appendChild(nameCell);
        row.appendChild(emailCell);
        row.appendChild(ageCell);
        row.appendChild(heightCell);
        row.appendChild(weightCell);

        // Add row to table
        table.appendChild(row);
    });
}


// Function to clear form
function clearForm() {

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("age").value = "";
    document.getElementById("height").value = "";
    document.getElementById("weight").value = "";
}
