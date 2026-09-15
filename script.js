// Function accepts product code as an argument
function validateProductCode(productCode) {

    // Product code format:
    // # + 4 uppercase letters + 3 digits
    let pattern = /^#[A-Z]{4}[0-9]{3}$/;

    if (pattern.test(productCode)) {
        return "Product code verified successfully";
    } else {
        return "Product code is not valid";
    }
}

// Function to get value from HTML and display result
function checkProductCode() {

    let productCode = document.getElementById("productCode").value;

    let message = validateProductCode(productCode);

    document.getElementById("result").innerHTML = message;
}
