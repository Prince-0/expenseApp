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
        const totalexp = document.getElementById("totalexpense");
        list.innerHTML = "";

        let total = 0;

        data.forEach(t => {
            total += Number(t.amount);

            const li = document.createElement("li");
            li.id = t.id;

            li.innerHTML = `
                ₹${t.amount} - ${t.category} - ${t.description}
                <button onclick="deleteTransaction(${t.id})">Delete</button>
            `;

            list.appendChild(li);
        });

        totalexp.textContent = `Total expense: Rs. ${total}`;

    } catch (err) {
        console.log("Load error:", err);
    }
}

async function addTransaction() {
    const amount = document.getElementById("amount").value;
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
            body: JSON.stringify({ amount, description })
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
            headers: {   
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
 
        const res = await fetch("http://localhost:3001/payment/pay", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token    
            }
        });

        const text = await res.text(); 
        console.log("RESPONSE:", text);

        const data = JSON.parse(text);

        console.log("DATA:", data);

        const { paymentSessionId } = data;

        window.location.href = `payment.html?sessionId=${paymentSessionId}`;

    } catch (err) {
        console.error("Payment error:", err);
    }
}