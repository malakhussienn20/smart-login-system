var signInEmail=document.querySelector('#signInEmail')
var signInPassword=document.querySelector('#signInPassword')

var signUpemail=document.querySelector('#signUpEmail')
var signUpPassword=document.querySelector('#signUpPassword')
var signUpName=document.querySelector('#signUpName')

var regMsg=document.querySelector('#reg-msg')

var users=[]
if(localStorage.getItem('users') !== null){
    try {
        users = JSON.parse(localStorage.getItem('users'));
        if (!Array.isArray(users)) {
            users = [];
        }
    } catch(e) {
        users = [];
    }
}

//register

function register(){


    function isEmptyReg(){
    if(signUpName.value==''||signUpPassword.value==''||signUpemail.value==''){
        regMsg.innerHTML='All fields are required!'

        return true
    }
    return false
}   
    if (isEmptyReg()) {
        return; 
    }
    
    var newUser={
        email:signUpemail.value,
        name:signUpName.value,
        password:signUpPassword.value
    }
    //check email exist
    for(var i=0;i<users.length;i++){
    if(users[i].email===newUser.email){
        regMsg.innerHTML='Email already exist'
        return
    }
}

    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users));
    regMsg.innerHTML = 'Success';

    //clear inputs
    signUpemail.value = '';
    signUpName.value = '';
    signUpPassword.value = '';
    
}


//login 
function login() {


    function isEmptyLog() {
        if (signInEmail.value === '' || signInPassword.value === '') {
            regMsg.innerHTML = 'All fields are required!';
            return true;
        }
        return false;
    }

    if (isEmptyLog()) {
        return; 
    }

    var email = signInEmail.value;
    var password = signInPassword.value;

    for (var i = 0; i < users.length; i++) {
        if (users[i].email === email) {
            if (users[i].password === password) {
                localStorage.setItem('loggedUser', JSON.stringify(users[i]));
                window.location.href = "home.html"; 
                return; 
            } else {
                regMsg.innerHTML = 'Incorrect password or email';

                return; 
            }
        }
    }
}


function logout() {
        localStorage.removeItem('loggedUser');
        window.location.href = "signin.html";
    }


    var loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

if (loggedUser) {
    document.querySelector('#userName').innerText = "Welcome " + loggedUser.name;
    }

function validateForm(ele) {
    var regex = {
        signUpName: /^[a-zA-Z ]{3,}$/,  
        signUpEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
        signUpPassword: /^.{6,}$/, 
        signInEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
        signInPassword: /^.{6,}$/ 
    }

    if (regex[ele.id].test(ele.value)) {
        ele.classList.remove('is-invalid');
        ele.classList.add('is-valid');
        return true;
    } else {
        ele.classList.remove('is-valid');
        ele.classList.add('is-invalid');
        return false;
    }
}
