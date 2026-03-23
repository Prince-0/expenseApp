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