const API = "http://localhost:3001/expense/transaction";
const token = localStorage.getItem("token");

window.onload = () => {
    loadUser();
    loadTransactions();
};

async function loadUser() {
    try {
        const res = await fetch("http://localhost:3001/user/profile", {
            "method": "GET",
            headers: {
                "authorization": token
            }
        });

        const user = await res.json();
        console.log(user);

        if (!user || !user.id) {
            console.log("Invalid user response");
            return;
        }

        if (user.isPremium) {
            document.getElementById("premiumBadge").classList.remove("hidden");
            document.getElementById("buyPremiumBtn").style.display = "none";
        }

    } catch (err) {
        console.log("User load error:", err);
    }
}

async function loadTransactions() {
    try{
        const res = await fetch(API, {
            method: "GET",
            headers: {   
                "authorization": token
            }
        });

        const data = await res.json();
    
        const list = document.getElementById("expenseList");
        list.innerHTML = "";

        data.forEach(t => {
            const li = document.createElement("li");
            li.id = t.id;

            li.innerHTML = `
                ₹${t.amount} - ${t.category} - ${t.description}
                <button onclick="deleteTransaction(${t.id})">Delete</button>
            `;

            list.appendChild(li);
        });

    } catch (err) {
        console.log("Load error:", err);
    }
}

async function addTransaction() {
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;

    if (!amount || !description) {
        return alert("Please fill all fields");
    }

    try {
        await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({ amount, category, description })
        });

        document.getElementById("amount").value = "";
        document.getElementById("description").value = "";

        loadTransactions();

    } catch (err) {
        console.log("Add error:", err);
    }
}

async function deleteTransaction(id) {
    try {
        await fetch(`${API}/${id}`, {
            method: "DELETE",
            headers: {   // ✅ FIXED
                "Authorization": token
            }
        });

        document.getElementById(id)?.remove();

    } catch (err) {
        console.log("Delete error:", err);
    }
}

async function buyPremium() {
    try {
        const token = localStorage.getItem("token");

       // console.log("TOKEN:", token);  🔍 debug

        const res = await fetch("http://localhost:3001/payment/pay", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token   // ✅ MUST match backend
            }
        });

        const text = await res.text(); // 🔥 debug first
        console.log("RESPONSE:", text);

        const data = JSON.parse(text);

        console.log("DATA:", data);

    } catch (err) {
        console.error("Payment error:", err);
    }
}