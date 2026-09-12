// Global array to store customer objects
let customers = [];

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

    // Add object to global array
    customers.push(customer);

    // Display customers
    displayCustomers();

    // Clear input fields
    clearForm();
}


function displayCustomers() {

    let table = document.getElementById("customerTable");

    // Clear existing table rows
    table.innerHTML = "";

    // Display every customer
    customers.forEach(function(customer) {

        let row = document.createElement("tr");

        let nameCell = document.createElement("td");
        nameCell.innerText = customer.name;

        let ageCell = document.createElement("td");
        ageCell.innerText = customer.age;

        let heightCell = document.createElement("td");
        heightCell.innerText = customer.height;

        let weightCell = document.createElement("td");
        weightCell.innerText = customer.weight;

        row.appendChild(nameCell);
        row.appendChild(ageCell);
        row.appendChild(heightCell);
        row.appendChild(weightCell);

        table.appendChild(row);
    });
}


function clearForm() {

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("age").value = "";
    document.getElementById("height").value = "";
    document.getElementById("weight").value = "";
}
