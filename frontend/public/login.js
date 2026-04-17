window.login = async function(e){
    try{
        e.preventDefault();

        const loginDetails = {
            email: e.target.email.value,
            password: e.target.password.value
        };

        const res = await axios.post(
            'http://localhost:3001/user/login',
            loginDetails
        );
        
        localStorage.setItem("token", res.data.token);

        alert('Login Successful');

        window.location.href = "ui.html";

    } catch(err){
        console.log(err);
        alert('Login failed.');
    }
}

function forgotPassword(){
    document.getElementById('forgotPasswordDiv').style.display = "block";
}

async function submitForgotPassword(){
    try {
        const email = document.getElementById('forgotEmail').value;

        if (!email) {
        alert("Please enter your email");
        return;
        }

        const res = await axios.post("http://localhost:3001/password/forgotpassword", { email });
    
    } catch (err) {
        console.log(err);
        alert("Error sending reset link");
  
    }
    
}