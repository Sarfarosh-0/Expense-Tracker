console.log("Expense Tracker Started");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

document
  .getElementById("JSaddIncome")
  .addEventListener("click", addTransaction);

document
  .getElementById("JSaddExpense")
  .addEventListener("click", addTransaction);

function addTransaction(e, forcedType) {
  const isExpense =
    forcedType === "Expense" ||
    (e && e.currentTarget && e.currentTarget.id === "JSaddExpense");
  const prefix = isExpense ? "Exp" : "Inc";

  const date = document.getElementById(`${prefix}Date`).value;
  const description = document.getElementById(`${prefix}Desc`).value;
  const category = document.getElementById(`${prefix}Cat`).value;
  const amount = document.getElementById(`${prefix}Amt`).value;

  if (!date || !amount) {
    alert("Please fill in at least the Date and Amount fields!");
    return;
  }

  transactions.push({
    id: Date.now(),
    date: date,
    description: description || "No description",
    type: isExpense ? "Expense" : "Income",
    category: category,
    amount: amount,
  });

  saveTransactions();
  runCalculations();
  applyActiveSorting();
  closeModal();

  document.getElementById(`${prefix}Date`).value = "";
  document.getElementById(`${prefix}Desc`).value = "";
  document.getElementById(`${prefix}Amt`).value = "";
}

document.getElementById("incomeModal").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTransaction(null, "Income");
  }
});

document.getElementById("expenseModal").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTransaction(null, "Expense");
  }
});

function saveTransactions() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

document
  .getElementById("JSclearAllData")
  .addEventListener("click", deleteAllData);

function deleteAllData() {
  localStorage.clear();
  transactions = [];
  renderAllTransactions();
  clearAllTotals();
  closeModal();
}

document.querySelectorAll(".selectAllTransactions").forEach((button) => {
  button.addEventListener("click", renderAllTransactions);
});

document
  .getElementById("selectAllIncome")
  .addEventListener("click", renderIncome);

document
  .getElementById("selectAllExpense")
  .addEventListener("click", renderExpense);

function renderAllTransactions() {
  const transactionsContainer = document.getElementById("transactionsHistory");
  transactionsContainer.innerHTML = "";

  transactions.forEach((transaction) => {
    renderTransaction(transaction);
  });
}

function renderIncome() {
  const transactionsContainer = document.getElementById("transactionsHistory");
  transactionsContainer.innerHTML = "";

  transactions.forEach((transaction) => {
    if (transaction.type === "Income") {
      renderTransaction(transaction);
    }
  });
}

function renderExpense() {
  const transactionsContainer = document.getElementById("transactionsHistory");
  transactionsContainer.innerHTML = "";

  transactions.forEach((transaction) => {
    if (transaction.type === "Expense") {
      renderTransaction(transaction);
    }
  });
}

function renderTransaction(transaction) {
  const transactionsContainer = document.getElementById("transactionsHistory");

  const transactionUl = document.createElement("ul");

  transactionUl.classList.add(
    "grid",
    "grid-cols-[1.2fr_1fr_1.2fr_30px]",
    "md:grid-cols-[1fr_1.5fr_1fr_1fr_1fr_30px]",
    "items-center",
    "w-full",
    "px-2",
    "hover:bg-slate-100",
    "rounded-lg",
    "border-b",
    "border-gray-200",
  );

  const textResponsiveClasses = [
    "text-xs",
    "sm:text-sm",
    "md:text-base",
    "truncate",
  ];

  const date = document.createElement("li");
  date.classList.add("py-2", ...textResponsiveClasses);
  date.textContent = transaction.date;

  const description = document.createElement("li");
  description.classList.add(
    "py-2",
    "hidden",
    "md:block",
    ...textResponsiveClasses,
  );
  description.textContent = transaction.description;

  const type = document.createElement("li");
  type.textContent = transaction.type;
  type.className =
    transaction.type === "Income" ? "text-green-600" : "text-red-600";
  type.classList.add("font-semibold", ...textResponsiveClasses);

  const category = document.createElement("li");
  category.classList.add(
    "py-2",
    "hidden",
    "md:block",
    ...textResponsiveClasses,
  );
  category.textContent = transaction.category;

  const amount = document.createElement("li");
  amount.textContent = `₹${Number(transaction.amount).toLocaleString("en-IN")}`;
  amount.classList.add("font-semibold", ...textResponsiveClasses);
  if (transaction.type === "Income") {
    amount.classList.add("text-green-600");
  } else {
    amount.classList.add("text-red-600");
  }

  const delImg = document.createElement("img");
  delImg.src = "https://cdn-icons-png.flaticon.com/128/9790/9790368.png";
  delImg.classList.add(
    "w-5",
    "h-5",
    "md:w-6",
    "md:h-6",
    "cursor-pointer",
    "opacity-40",
    "transition-opacity",
    "duration-200",
    "hover:opacity-100",
  );

  const delTransaction = document.createElement("li");
  delTransaction.appendChild(delImg);

  delImg.addEventListener("click", () => deleteTransaction(transaction.id));

  transactionUl.append(
    date,
    description,
    type,
    category,
    amount,
    delTransaction,
  );

  transactionsContainer.appendChild(transactionUl);
}

function deleteTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  saveTransactions();
  applyActiveSorting();
  runCalculations();
}

const sortBy = document.getElementById("sortBy");
if (sortBy) {
  sortBy.addEventListener("change", applyActiveSorting);
}

function sortByDateAsc() {
  transactions.sort((a, b) => new Date(a.date) - new Date(b.date));
}
function sortByDateDesc() {
  transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
}
function sortByAmountAsc() {
  transactions.sort((a, b) => Number(a.amount) - Number(b.amount));
}
function sortByAmountDesc() {
  transactions.sort((a, b) => Number(b.amount) - Number(a.amount));
}


function applyActiveSorting() {
  const sortByElement = document.getElementById("sortBy");
  const currentValue = sortByElement ? sortByElement.value : "Descdate";

  if (currentValue === "Descdate") {
    sortByDateDesc();
  } else if (currentValue === "Ascdate") {
    sortByDateAsc();
  } else if (currentValue === "Descamount") {
    sortByAmountDesc();
  } else if (currentValue === "Ascamount") {
    sortByAmountAsc();
  }
  renderAllTransactions();
}

// Initial Run
applyActiveSorting();
runCalculations();
