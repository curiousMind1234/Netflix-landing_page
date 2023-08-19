
const email = document.getElementById("input-text");
const password = document.getElementById("input-password");

const email_error = document.querySelector('.email-text');
const pass_error = document.querySelector('.pass-text');

document.getElementById("input-text").onclick = function() {
    this.value = '';
    this.style.color = 'white';
}
document.getElementById("input-password").onclick = function() {
    this.value = '';
    this.style.color = 'white';
}


email.addEventListener('textInput', emailVerify);
password.addEventListener('textInput', passVerify);


function emailVerify() {
    const emailRegx = /^\S+@\S+\.\S+$/;
    let emailVal = email.value;
    if(!emailVal.match(emailRegx)) {
        email_error.style.display = "block";
        email.focus();
        return false;
       
    } else {
        email_error.style.display = "none"; 
        return true; 
    }
}

function passVerify() {
    const passwordCapRegx = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    let passVal = password.value;
    if(!passVal.match(passwordCapRegx)) {
        pass_error.style.display = "block";
        password.focus();
        return false;
    } else {
        pass_error.style.display = "none";
        return true;        
    }   
}

function showPassword(){
    let toggle = document.querySelector("#togglePassword");
    toggle.addEventListener("click",()=>{
        const type = password.getAttribute("type");
        if(type === "password"){
            password.setAttribute("type", "text");
            toggle.classList.remove("fa-eye")
            toggle.classList.add("fa-eye-slash")
        }
        else{
            password.setAttribute("type", "password");
            toggle.classList.remove("fa-eye-slash");
            toggle.classList.add("fa-eye")
        }

    })
}

showPassword();

function validate(event){
    event.preventDefault();
    let emailVal = email.value;
    let passVal = password.value;
    try{
        if (emailVal === "" ) {
            email_error.style.display = "block";
            email.focus();
            return false;
        }
        if (passVal === "" ){
            pass_error.style.display = "block";
            password.focus();
            return false;
        }
        if(emailVerify && passVerify) {
            window.location = "../Second/netflix_2.html";
            return true;
         }
         return false;
    }
    catch(err){
        console.log(err)
    }   
}