function validateProductCode() {

    // Get product code from input
    let productCode = document.getElementById("productCode").value;

    // Regular expression:
    // #       -> starts with #
    // [A-Z]{4} -> exactly 4 uppercase letters
    // [0-9]{3} -> exactly 3 digits
    // $       -> end of string
    let pattern = /^#[A-Z]{4}[0-9]{3}$/;

    // Check product code
    if (pattern.test(productCode)) {
        document.getElementById("result").innerText =
            "Product code verified successfully";
    } else {
        document.getElementById("result").innerText =
            "Product code is not valid";
    }
}
