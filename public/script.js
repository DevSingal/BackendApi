console.log("logging from script");

let email = document.getElementById("exampleInputEmail1");
let password = document.getElementById("exampleInputPassword1");
let loginBtn = document.getElementById("loginBtn");
let loginForm = document.getElementById("loginForm");

let isAuthenticated;

const submitHandler = async (e)=> {
e.preventDefault();


    let loginData = { email:email.value , password: password.value };
    
    console.log(loginData);
    
    let response = await fetch("https://backendapi-gumu.onrender.com/api/v1/user/login", {
    method: "POST",
    body: JSON.stringify(loginData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  
  const data = await response.json();
  console.log(data);

  if (data.success) {

    isAuthenticated = true;
      window.location.href = "/";
    } else {
      alert(data.message);
    }
}

