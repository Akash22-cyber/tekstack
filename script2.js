function validateProductCode(productCode) {

    // Regular expression:
    // # followed by exactly 4 uppercase letters
    // followed by exactly 3 digits
    let pattern = /^#[A-Z]{4}[0-9]{3}$/;

    // Check whether product code is valid
    if (pattern.test(productCode)) {
        return "Product code verified successfully";
    } else {
        return "Product code is not valid";
    }
}


function checkCode() {

    // Get product code from input
    let productCode = document.getElementById("productCode").value;

    // Pass product code as an argument to the validation function
    let message = validateProductCode(productCode);

    // Display returned message
    document.getElementById("result").innerText = message;
}
