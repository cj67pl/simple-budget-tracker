const EXPENSE_CATEGORIES = [
	"Food",
	"Transport",
	"Bills",
	"Shopping",
	"Entertainment",
	"Savings",
	"Other",
];

const INCOME_CATEGORIES = [
	"Salary",
	"Freelance / Contract",
	"Business Income",
	"Allowance",
	"Investment / Dividends",
	"Bonus",
	"Gift",
	"Other Income",
];


const typeSelect = document.getElementById("transactionType");
const categorySelect = document.getElementById("transactionCategory");

typeSelect.addEventListener("change", () => {
    categorySelect.innerHTML = '<option value="">Select category</option>';
    categorySelect.disabled = false;

    const categories = typeSelect.value === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    })
})



const form = document.getElementById('transactionForm');

const typeInput = document.getElementById("transactionType");
const amountInput = document.getElementById("transactionAmount");
const categoryInput = document.getElementById("transactionCategory");
const descriptionInput = document.getElementById("transactionDescription");


const STORAGE_KEY = "budget_transactions";

let transactions = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

function saveTransactions() {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}


form.addEventListener("submit", function (e) {
	e.preventDefault();

	const transaction = {
		id: Date.now(),
		type: typeInput.value,
		amount: Number(amountInput.value),
		category: categoryInput.value,
		description: descriptionInput.value.trim(),
		date: new Date().toISOString().split("T")[0],
	};

	// console.log(type, amount, category, description);
	if (!transaction.type || !transaction.category || transaction.amount <= 0) {
		alert("Invalid input");
		return;
	}

	console.log(transaction);
    transactions.push(transaction);
    saveTransactions(); 
    renderApp();  
	form.reset();
});




const expenseList = document.getElementById("expenseList");
const incomeList = document.getElementById("incomeList");


function createTransactionCard(tx) {
	const card = document.createElement("div");
	card.className = `transaction-card ${tx.type}-card`;
	card.dataset.id = tx.id;

	card.innerHTML = `
        <p class="transaction-row">
            <span class="item-label">Category:</span>
            <span class="item-value">${tx.category}</span>
        </p>

        <p class="transaction-row">
            <span class="item-label">Amount:</span>
            <span class="item-value">₱${tx.amount.toLocaleString()}</span>
        </p>

        <p class="transaction-row">
            <span class="item-label">Description:</span>
            <span class="item-value">${tx.description || "—"}</span>
        </p>

        <div class="delete-container">
            <button class="delete-btn">Delete</button>
        </div>
    `;

	return card;
}


document.addEventListener("click", function (e) {
	if (!e.target.classList.contains("delete-btn")) return;

	const card = e.target.closest(".transaction-card");
	const id = Number(card.dataset.id);

	transactions = transactions.filter((tx) => tx.id !== id);
	saveTransactions();
	renderApp();
});


const totalIncomeEl = document.getElementById("totalIncome");
const totalExpensesEl = document.getElementById("totalExpenses");
const balanceEl = document.getElementById("balance");


function updateSummary() {
	let totalIncome = 0;
	let totalExpenses = 0;

	transactions.forEach((tx) => {
		if (tx.type === "income") {
			totalIncome += tx.amount;
		} else if (tx.type === "expense") {
			totalExpenses += tx.amount;
		}
	});

	const balance = totalIncome - totalExpenses;

	
	totalIncomeEl.textContent = `₱${totalIncome.toLocaleString()}`;
	totalExpensesEl.textContent = `₱${totalExpenses.toLocaleString()}`;
	balanceEl.textContent = `₱${balance.toLocaleString()}`;
}


function renderTransactions() {
	expenseList.innerHTML = "";
	incomeList.innerHTML = "";

	const selectedMonth = filterMonth.value;

	transactions.forEach((tx) => {
		const txMonth = tx.date.split("-")[1]; 

		// Month filter
		if (selectedMonth !== "all" && txMonth !== selectedMonth) {
			return;
		}

		const card = createTransactionCard(tx);

		if (tx.type === "expense") {
			expenseList.appendChild(card);
		} else if (tx.type === "income") {
			incomeList.appendChild(card);
		}
	});
}




const filterMonth = document.getElementById("filterMonth");

filterMonth.addEventListener("change", renderApp);

const MONTH_NAMES = {
	"01": "January",
	"02": "February",
	"03": "March",
	"04": "April",
	"05": "May",
	"06": "June",
	"07": "July",
	"08": "August",
	"09": "September",
	"10": "October",
	"11": "November",
	"12": "December",
};

function renderMonthFilter() {
	// Always keep "All Months"
	filterMonth.innerHTML = `<option value="all">All Months</option>`;

	// Get unique months from transactions
	const months = new Set();

	transactions.forEach((tx) => {
		const month = tx.date.split("-")[1]; // "01"
		months.add(month);
	});

	// Sort months numerically
	const sortedMonths = Array.from(months).sort();

	sortedMonths.forEach((month) => {
		const option = document.createElement("option");
		option.value = month;
		option.textContent = MONTH_NAMES[month];
		filterMonth.appendChild(option);
	});
}


function renderApp() {
    renderMonthFilter();
	renderTransactions();
	updateSummary();
}

renderApp();
