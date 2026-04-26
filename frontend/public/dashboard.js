/*const expenses = [
  {
    amount: 200,
    category: "Food",
    description: "Lunch",
    createdAt: "2026-04-21T10:30:00Z"
  },
  {
    amount: 500,
    category: "Shopping",
    description: "Clothes",
    createdAt: "2026-04-20T12:00:00Z"
  },
  {
    amount: 100,
    category: "Travel",
    description: "Auto",
    createdAt: "2026-04-19T09:00:00Z"
  },
  {
    amount: 300,
    category: "Food",
    description: "Dinner",
    createdAt: "2026-04-18T20:00:00Z"
  },
  {
    amount: 150,
    category: "Bills",
    description: "Electricity",
    createdAt: "2026-04-17T15:00:00Z"
  },
  {
    amount: 700,
    category: "Shopping",
    description: "Shoes",
    createdAt: "2026-04-16T11:00:00Z"
  }
];
*/

// ================= STATE =================
let currentPage = 1;
const rowsPerPage = 5;

let currentData = [];
let currentFilter = "all";
let currentSort = "latest"; // latest | oldest


let expenses = [];
async function loadExpenses() {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:3001/expense/transaction", {
      headers: {
        "authorization": token // 🔥 important
      }
  });
    const data = await res.json();

    expenses = data;

    render(); // 🔥 triggers UI
  } catch (err) {
    console.error("Error fetching expenses:", err);
  }
}

loadExpenses();

// ================= FILTER FUNCTION =================
function filterExpenses(expenses, type) {
  const today = new Date();

  return expenses.filter(exp => {
    const expDate = new Date(exp.createdAt);

    switch (type) {

      case "daily":
        return (
          expDate.getDate() === today.getDate() &&
          expDate.getMonth() === today.getMonth() &&
          expDate.getFullYear() === today.getFullYear()
        );

      case "weekly":
        const day = today.getDay() || 7;

        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - day + 1);

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        startOfWeek.setHours(0,0,0,0);
        endOfWeek.setHours(23,59,59,999);

        return expDate >= startOfWeek && expDate <= endOfWeek;

      case "monthly":
        return (
          expDate.getMonth() === today.getMonth() &&
          expDate.getFullYear() === today.getFullYear()
        );

      case "all":
      default:
        return true;
    }
  });
}


// ================= CORE LOGIC =================

// 🔹 Get filtered data
function getFilteredData() {
  if (currentFilter === "all") return expenses;
  return filterExpenses(expenses, currentFilter);
}

// 🔹 Sort data
function getSortedData(data) {
  if (currentSort === "latest") {
    return [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else {
    return [...data].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }
}

// 🔹 Main render controller
function render() {
  const filtered = getFilteredData();
  const sorted = getSortedData(filtered);

  currentData = sorted;

  updateTotal(filtered);
  displayPage(currentPage);
}


// ================= TABLE + PAGINATION =================

function displayPage(page) {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;

  const pageData = currentData.slice(start, end);

  if (pageData.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="4">No data available</td></tr>`;
    return;
  }

  pageData.forEach(exp => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${new Date(exp.createdAt).toLocaleString()}</td>
      <td>${exp.description}</td>
      <td>${exp.category}</td>
      <td>₹${exp.amount}</td>
    `;

    tableBody.appendChild(row);
  });

  updatePaginationUI();
}


// ================= TOTAL =================

function calculateTotal(data) {
  return data.reduce((sum, exp) => sum + Number(exp.amount || 0), 0);
}

function updateTotal(data) {
  const total = calculateTotal(data);

  const el = document.getElementById("totalAmount");
  if (el) {
    el.innerText = `Total: ₹${total}`;
  }
}


// ================= PAGINATION =================

function updatePaginationUI() {
  const totalPages = Math.ceil(currentData.length / rowsPerPage) || 1;

  document.getElementById("pageInfo").innerText =
    `Page ${currentPage} of ${totalPages}`;

  document.getElementById("prevBtn").disabled = currentPage === 1;
  document.getElementById("nextBtn").disabled = currentPage === totalPages;
}


// ================= UI HELPERS =================

function setActive(btn) {
  document.querySelectorAll(".buttons button").forEach(b => {
    b.classList.remove("active");
  });
  btn.classList.add("active");
}


// ================= EVENT LISTENERS =================

// 🔹 Filters
document.getElementById("allBtn").addEventListener("click", function (e) {
  currentFilter = "all";
  currentPage = 1;

  setActive(e.currentTarget);
  render();
});

document.getElementById("dailyBtn").addEventListener("click", function (e) {
  currentFilter = "daily";
  currentPage = 1;

  setActive(e.currentTarget);
  render();
});

document.getElementById("weeklyBtn").addEventListener("click", function (e) {
  currentFilter = "weekly";
  currentPage = 1;

  setActive(e.currentTarget);
  render();
});

document.getElementById("monthlyBtn").addEventListener("click", function (e) {
  currentFilter = "monthly";
  currentPage = 1;

  setActive(e.currentTarget);
  render();
});


// 🔹 Pagination
document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayPage(currentPage);
  }
});

document.getElementById("nextBtn").addEventListener("click", () => {
  const totalPages = Math.ceil(currentData.length / rowsPerPage);

  if (currentPage < totalPages) {
    currentPage++;
    displayPage(currentPage);
  }
});


// 🔹 Sorting (optional button)
const sortBtn = document.getElementById("sortBtn");

if (sortBtn) {
  sortBtn.addEventListener("click", function () {
    currentSort = currentSort === "latest" ? "oldest" : "latest";

    this.innerText =
      currentSort === "latest" ? "Sort: Latest" : "Sort: Oldest";

    currentPage = 1;
    render();
  });
}


// ================= INITIAL LOAD =================
render();