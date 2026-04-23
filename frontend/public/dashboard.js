const expenses = [
  { amount: 200, category: "Food", description: "Lunch", createdAt: "2026-04-21T10:30:00Z" },
  { amount: 500, category: "Shopping", description: "Clothes", createdAt: "2026-04-20T12:00:00Z" },
  { amount: 100, category: "Travel", description: "Auto", createdAt: "2026-04-15T09:00:00Z" }
];

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

function renderTable(data) {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  if (data.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="4" class="no-data">No data available</td></tr>`;
    return;
  }

  data.forEach(exp => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${new Date(exp.createdAt).toLocaleString()}</td>
      <td>${exp.description}</td>
      <td>${exp.category}</td>
      <td>₹${exp.amount}</td>
    `;

    tableBody.appendChild(row);
  });
}

// CALCULATE TOTAL
function calculateTotal(expenses) {
  return expenses.reduce((sum, exp) => sum + Number(exp.amount || 0), 0);
}

// UPDATE TOTAL UI
function updateTotal(data) {
  const total = calculateTotal(data);
  document.getElementById("totalAmount").innerText = `Total: ₹${total}`;
}

// ACTIVE BUTTON UI
function setActive(btn) {
  document.querySelectorAll("button").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}

// BUTTON EVENTS


document.getElementById("allBtn").addEventListener("click", function (event) {
  console.log(event.currentTarget);
  renderTable(expenses);
  updateTotal(expenses);
  setActive(event.currentTarget);
});

document.getElementById("dailyBtn").addEventListener("click", function (event) {
  const data = filterExpenses(expenses, "daily");
  renderTable(data);
  updateTotal(data);
  setActive(event.currentTarget); // ✅ FIX
});

document.getElementById("weeklyBtn").addEventListener("click", function (event) {
  const data = filterExpenses(expenses, "weekly");
  renderTable(data);
  updateTotal(data);
  setActive(event.currentTarget);
});

document.getElementById("monthlyBtn").addEventListener("click", function (event) {
  const data = filterExpenses(expenses, "monthly");
  renderTable(data);
  updateTotal(data);
  setActive(event.currentTarget);
});

// INITIAL LOAD (ALL DATA)
renderTable(expenses);
updateTotal(expenses);