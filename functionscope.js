const calculateSalary = (employeeName, basicSalary, allowancePercentage = 10, taxPercentage = 5) => {
    // Using block-scoped variables (const) for calculations
    const grossSalary = basicSalary + (basicSalary * allowancePercentage / 100);
    const netSalary = grossSalary - (grossSalary * taxPercentage / 100);

    // Returning the result as an object
    // Note: Used 'name' as the key to exactly match the Sample Output provided
    return {
        name: employeeName,
        grossSalary: grossSalary,
        netSalary: netSalary
    };
};

// Call the function for "Sachin" with a basic salary of 50,000
const result = calculateSalary("Sachin", 50000);

// Display the returned object in the console
console.log(result);
