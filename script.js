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
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("age").value = "";
    document.getElementById("height").value = "";
    document.getElementById("weight").value = "";
}

function displayCustomers() {

    let table = `
        <table border="1">
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Height</th>
                <th>Weight</th>
            </tr>
    `;

    // Loop through customer array
    for (let customer of customers) {
        table += `
            <tr>
                <td>${customer.name}</td>
                <td>${customer.email}</td>
                <td>${customer.age}</td>
                <td>${customer.height}</td>
                <td>${customer.weight}</td>
            </tr>
        `;
    }

    table += `</table>`;

    // Display table in webpage
    document.getElementById("customerTable").innerHTML = table;
}
