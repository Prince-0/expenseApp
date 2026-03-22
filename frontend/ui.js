const API = "http://localhost:3001/user/transaction";

async function loadTransactions() {
    const res = await fetch(API);
    const data = await res.json();

    const list = document.getElementById("list");
    list.innerHTML = "";

    data.forEach(t => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${t.amount} - ${t.category} - ${t.description}
            <button onclick="deleteTransaction(${t.id})">Delete</button>
        `;
        list.appendChild(li);

    });
}

async function addTransaction() {
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;

    await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ amount, category , description})
    });

    loadTransactions(); 
}

async function deleteTransaction(id) {
    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    loadTransactions();
}

loadTransactions();