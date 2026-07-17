// --- DOM Elements ---
const totalIncome = document.getElementById("totalIncome");
const totalExpense = document.getElementById("totalExpense");
const totalBalance = document.getElementById("totalBalance");

// Global calculation trackers
let calTotalIncome = 0;
let calTotalExpense = 0;
let calTotalBalance = 0;

function formatIndianCurrency(amount) {
  return `₹${amount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function calculateIncome() {
  calTotalIncome = 0;
  transactions.forEach((transaction) => {
    if (transaction.type === "Income") {
      calTotalIncome += parseFloat(transaction.amount) || 0;
    }
  });
  totalIncome.textContent = formatIndianCurrency(calTotalIncome);
}

function calculateExpense() {
  calTotalExpense = 0;
  transactions.forEach((transaction) => {
    if (transaction.type === "Expense") {
      calTotalExpense += parseFloat(transaction.amount) || 0;
    }
  });
  totalExpense.textContent = formatIndianCurrency(calTotalExpense);
}

function calculateBalance() {
  calTotalBalance = calTotalIncome - calTotalExpense;
  totalBalance.textContent = formatIndianCurrency(calTotalBalance);
}

function clearAllTotals() {
  const zeroString = formatIndianCurrency(0);
  totalIncome.textContent = zeroString;
  totalExpense.textContent = zeroString;
  totalBalance.textContent = zeroString;
}

function runCalculations() {
  calculateIncome();
  calculateExpense();
  calculateBalance();
}
