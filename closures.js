function BankAccount(initialBalance) {
    // 2. Declare a variable 'balance' inside the function.
    // Because of closures, this variable remains private.
    let balance = initialBalance;

    // 3. Return an object containing the required methods
    return {
        // 4. Deposit(amount)
        Deposit: function(amount) {
            if (amount > 0) {
                balance += amount;
            }
        },

        // 5. Withdraw(amount)
        Withdraw: function(amount) {
            if (amount <= balance) {
                balance -= amount;
            } else {
                console.log("Insufficient Balance");
            }
        },

        // 6. getBalance()
        getBalance: function() {
            return balance;
        }
    };
}

// 7. Create an account with an initial balance of ₹1000
const myAccount = BankAccount(1000);

// 8. Deposit ₹500 into the account
myAccount.Deposit(500);

// 9. Withdraw ₹200 from the account
myAccount.Withdraw(200);

// 10. Display the final account balance using getBalance()
// This will output exactly 1300 as shown in the Sample Output
console.log(myAccount.getBalance());
