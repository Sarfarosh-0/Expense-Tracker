const sidebarToggleBtn = document.getElementById("sidebarToggleBtn");
const sidebar = document.getElementById("sidebar");
const closeSidebarBtn = document.getElementById("closeSidebarBtn");
const mainContent = document.getElementById("mainContent");

sidebarToggleBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  const isHidden = sidebar.classList.contains("-translate-x-full");
  isHidden ? openSidebar() : closeSidebar();
});

function openSidebar() {
  sidebar.classList.remove("-translate-x-full");
  sidebarToggleBtn.classList.add("hidden");

  if (window.innerWidth >= 768) {
    mainContent.classList.add("md:ml-52");
  }
}

function closeSidebar() {
  sidebar.classList.add("-translate-x-full");
  sidebarToggleBtn.classList.remove("hidden");

  if (window.innerWidth >= 768) {
    mainContent.classList.remove("md:ml-52");
  }
}

if (mainContent) {
  mainContent.addEventListener("click", () => {
    if (!sidebar.classList.contains("-translate-x-full")) {
      closeSidebar();
    }
  });
}

closeSidebarBtn.addEventListener("click", closeSidebar);

const overlay = document.getElementById("modalOverlay");
const incomeModal = document.getElementById("incomeModal");
const expenseModal = document.getElementById("expenseModal");
const clearDataModal = document.getElementById("clearDataModal");

const openIncomeDesktopBtn = document.getElementById("addIncomeDesktop");
const openExpenseDesktopBtn = document.getElementById("addExpenseDesktop");

const openIncomeMobileBtn = document.getElementById("addIncomeMobile");
const openExpenseMobileBtn = document.getElementById("addExpenseMobile");

const clearAllData = document.getElementById("clearAllData");

const viewAllTransactions = document.getElementById("viewAllTransactions");

function openModal(modalType) {
  overlay.classList.remove("hidden");

  if (modalType === "income") {
    incomeModal.classList.remove("hidden");
    expenseModal.classList.add("hidden");
    clearDataModal.classList.add("hidden");
  } else if (modalType === "expense") {
    expenseModal.classList.remove("hidden");
    incomeModal.classList.add("hidden");
    clearDataModal.classList.add("hidden");
  } else if (modalType === "clearData") {
    clearDataModal.classList.remove("hidden");
    expenseModal.classList.add("hidden");
    incomeModal.classList.add("hidden");
  }
}

function closeModal() {
  overlay.classList.add("hidden");
  incomeModal.classList.add("hidden");
  expenseModal.classList.add("hidden");
  clearDataModal.classList.add("hidden");
}

openIncomeDesktopBtn.addEventListener("click", () => openModal("income"));
openExpenseDesktopBtn.addEventListener("click", () => openModal("expense"));
openIncomeMobileBtn.addEventListener("click", () => openModal("income"));
openExpenseMobileBtn.addEventListener("click", () => openModal("expense"));
clearAllData.addEventListener("click", () => openModal("clearData"));

document.querySelectorAll(".close-modal-btn").forEach((button) => {
  button.addEventListener("click", closeModal);
});

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    closeModal();
  }
});

const navItems = document.querySelectorAll(".nav-item");

const activeNavClasses = [
  "bg-blue-100",
  "text-blue-600",
  "font-medium",
  "shadow-sm",
];

const inactiveNavClasses = [
  "text-slate-600",
  "hover:bg-slate-200",
  "hover:text-slate-900",
];

navItems.forEach((item) => {
  item.addEventListener("click", function () {
    navItems.forEach((nav) => {
      nav.classList.remove(...activeNavClasses);
      nav.classList.add(...inactiveNavClasses);
    });
    this.classList.remove(...inactiveNavClasses);
    this.classList.add(...activeNavClasses);
  });
});

const modalWrapper = document.getElementById("modalWrapper");
const transactionsSection = document.getElementById("transactions");
const transactionsHistory = document.getElementById("transactionsHistory");
const tableTitle = document.getElementById("tableTitle");
const viewAllBtns = document.querySelectorAll(".viewAllBtn");
const closeModalBtn = document.getElementById("closeModalBtn");

const wrapperModalStyles = ["fixed", "inset-0", "z-[100]", "flex", "items-center", "justify-center", "bg-black/60", "backdrop-blur-sm", "p-4", "opacity-100"];
const sectionInlineStyles = ["mt-3", "p-4", "shadow-lg", "min-h-96"];
const sectionModalStyles = ["flex", "flex-col", "w-full", "max-w-4xl", "max-h-[85vh]", "p-6", "shadow-2xl"];
const historyInlineStyles = ["md:max-h-[320px]", "max-h-[250px]", "overflow-hidden"];
const historyModalStyles = ["flex-grow", "overflow-y-auto"];


viewAllBtns.forEach((btn) => {
  btn.addEventListener("click", openAllTransactions);
});

function openAllTransactions(e) {
  if (e) e.preventDefault();

  modalWrapper.classList.remove("w-full");
  modalWrapper.classList.add(...wrapperModalStyles);

  transactionsSection.classList.remove(...sectionInlineStyles, "h-auto");
  transactionsSection.classList.add(...sectionModalStyles);

  transactionsHistory.classList.remove(...historyInlineStyles);
  transactionsHistory.classList.add(...historyModalStyles);

  tableTitle.textContent = "All Transactions";
  viewAllBtns.forEach(btn => btn.classList.add("hidden"));
  
  closeModalBtn.classList.remove("hidden");
  document.body.classList.add("overflow-hidden");
}

closeModalBtn.addEventListener("click", () => {
  modalWrapper.classList.remove(...wrapperModalStyles);
  modalWrapper.classList.add("w-full");

  transactionsSection.classList.remove(...sectionModalStyles);
  transactionsSection.classList.add(...sectionInlineStyles);

  transactionsHistory.classList.remove(...historyModalStyles);
  transactionsHistory.classList.add(...historyInlineStyles);

  tableTitle.textContent = "Recent Transactions";
  viewAllBtns.forEach(btn => btn.classList.remove("hidden"));
  
  closeModalBtn.classList.add("hidden");
  document.body.classList.remove("overflow-hidden");
});