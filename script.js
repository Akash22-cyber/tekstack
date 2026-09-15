function validateCode() {

    // Get product code from input field
    let productCode = document.getElementById("productCode").value;

    // Regular expression:
    // # followed by exactly 4 uppercase letters
    // followed by exactly 3 digits
    let pattern = /^#[A-Z]{4}[0-9]{3}$/;

    // Check product code
    if (pattern.test(productCode)) {
        document.getElementById("result").innerHTML =
            "Product code verified successfully";
    } else {
        document.getElementById("result").innerHTML =
            "Product code is not valid";
    }
}
