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
        
        console.log(res);
        alert(res.data.message);

        // optional: redirect
        // window.location.href = "dashboard.html";

    } catch(err){
        console.log(err);

        if(err.response){
            alert(err.response.data.message);
        } else {
            alert('Login failed');
        }
    }
}