const signupBtn = document.querySelector(".signup-btn");
const loginBtn = document.querySelector(".Login-btn");
const username = document.querySelector(".username");
const password = document.querySelector(".password");
const loginSignupContainer = document.querySelector(".login-signup-container");
const mainSection = document.querySelector(".main-section");
const footer = document.querySelector("footer");
const mainHeading = document.querySelector(".main-heading");
const navBtnsDiv = document.querySelector(".nav-btns");
//Above are all necessary DOM nodes that needed to be dynamically changed

let Infopara = document.createElement("p");  //Create a paragraph for showing info above login/signup buttons

function SignupUser() {  //Function for signingup user
    Infopara.style.textAlign = "center";
    Infopara.style.fontWeight = "bolder";
    Infopara.style.fontSize = "1.1rem";
    Infopara.style.marginTop = "3%";  //Style for created paragraph at line 11
    if(username.value === "" || password.value === "") {  //If user has left empty username or password input
        Infopara.innerText = "Please Enter The Details!";
        document.querySelector(".login-signup-btns").before(Infopara);
    }
    else {
        let tempUsers = JSON.parse(localStorage.getItem("users"));  //Get data from localstorage & parse it
        let users = tempUsers ? tempUsers : [];  //Store data in main array else give an empty array if no data from localstorage
        let userAlreadyExists = false;
        for(let i=0 ; i<users.length ; i++) {  //Check each object in array
            if(users[i].username === username.value) {
                userAlreadyExists = true;
                break;
            }
        }
        if(userAlreadyExists) {  //If user already exists
            Infopara.innerText = "Username Already Exists!";
            document.querySelector(".login-signup-btns").before(Infopara);
        }
        else {
            let newUserInfo = {  //Object for new user's info
                username : username.value,
                password : password.value
            }
            users.push(newUserInfo);  //push new user in array containing all the objects of user data
            localStorage.setItem("users",JSON.stringify(users));  //Then set the array in localstorage
            Infopara.innerText = "User Signedup Successfully!";
            document.querySelector(".login-signup-btns").before(Infopara);  //Show information paragraph created at line 11
            loginSignupContainer.style.animation = "animateout 1s ease-in 0.3s";
            loginSignupContainer.addEventListener("animationend", () => {
                loginSignupContainer.style.display = "none";
                footer.style.position = "static";
                mainHeading.innerText = "Welcome to Bookit!";
                mainSection.style.display = "flex";  //Show main after login/signup has vanished
            })
        }
    }
}

function LoginUser() {
    Infopara.style.textAlign = "center";
    Infopara.style.fontWeight = "bolder";
    Infopara.style.fontSize = "1.1rem";
    Infopara.style.marginTop = "3%";
    if(username.value === "" || password.value === "") {  //If user left empty the requried inputs
        Infopara.innerText = "Please Enter The Details!";
        document.querySelector(".login-signup-btns").before(Infopara);
    }
    else {
        let tempUsers = JSON.parse(localStorage.getItem("users"));
        let users = tempUsers ? tempUsers : [];
        let userExists = false;
        for(let i=0 ; i<users.length ; i++) {
            if(users[i].username === username.value && users[i].password === password.value) {
                userExists = true;
                break;
            }
        }  //Line 66 to 72 gets localstorage data and checks for user entered data and verifies it
        if(userExists) {  //If user exists
            Infopara.innerText = "Loggedin Successfully!";
            document.querySelector(".login-signup-btns").before(Infopara);
            loginSignupContainer.style.animation = "animateout 1s ease-in 0.3s";
            loginSignupContainer.addEventListener("animationend", () => {
                loginSignupContainer.style.display = "none";
                footer.style.position = "static";
                mainHeading.innerText = "Welcome to Bookit!";
                mainSection.style.display = "flex";
            })  //If user exists do almost same tasks as when user signsup
        }
        else {  //If user entered incorrect username or password
            Infopara.innerText = "Incorrect Username or Password!";
            document.querySelector(".login-signup-btns").before(Infopara);
        }
    }
}

signupBtn.addEventListener("click" , () => {
    Infopara.remove();  //Make sure info paragraph about user's entry is hided at default
    SignupUser();
})

loginBtn.addEventListener("click", () => {
    Infopara.remove();
    LoginUser();
})
//Line 93 to 101 are event handlers when signup/login button is clicked
