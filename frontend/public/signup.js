async function signup(e){
    try{
        e.preventDefault();

        const signupDetails = {
            email : e.target.email.value,
            password : e.target.password.value
        }

        const res = await axios.post(
            'http://localhost:3001/user/signup',
            signupDetails
        );

        alert(res.data.message);
        window.location.href = "login.html";

    }
    catch(err){
        console.log(err);

        if(err.response){
            alert(err.response.data.message);
        } else {
            alert('Signup failed');
        }
    }
}