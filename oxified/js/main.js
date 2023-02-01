//variables
const overlay = document.getElementById("overlay");
const PROD = "https://owzosvzog8.execute-api.us-west-2.amazonaws.com/prod";
let postUrl = PROD + "/useraccount";
let authenticationUrl = PROD + "/authentication";
let getUrl = PROD + "/useraccount/123/services/123";
let registerObj = {};
let logObj = {};
let headers = {
    authorization: {
        'x-api-key' : 'your-API-key',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers' : 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Credentials': true
    }
}
window.onload = async function() {
    console.log("DOM has loaded.");
    const response = await fetch(`./pages/home.html`);
    const html = await response.text();
    document.getElementById("main-page").innerHTML = html;
    const navBar = await fetch(`./layout/navbar.html`);
    const htmlNav = await navBar.text();
    document.getElementById("nav-bar").innerHTML = htmlNav;
    getPlaylistData();
}
//call navbar and content
async function loadPage(page) {
    //call container
    const response = await fetch(`./layout/container.html`);
    const html = await response.text();
    document.getElementById("main-page").innerHTML = html;

    //call navbar
    const navBar = await fetch(`./layout/navbar.html`);
    const htmlNavBar = await navBar.text();
    let navB = document.getElementById("tmp-nav-bar");
    navB.classList.add('top-pages');
    navB.innerHTML = htmlNavBar;
    let childNavB = navB.querySelector(".nav-bar ul li");
    childNavB.classList.add('list-style');
    //call every page
    const pageResponse = await fetch(`${page}.html`);
    const htmlPage= await pageResponse.text();
    document.getElementById("tmp-nav-display").innerHTML = htmlPage;
}

async function loadModal(modal) {
    overlay.style.display = 'grid';
    overlay.classList.add('animate-overlay');
    const response = await fetch(`${modal}.html`);
    const html = await response.text();
    document.getElementById("target").innerHTML = html;
}
async function login() {
    overlay.style.display = 'grid';
    overlay.classList.add('animate-overlay');
}
async function btnCancel() {
    removeOverlay();
}
async function removeOverlay() {
    overlay.style.display = 'none';
    overlay.classList.add('animate-overlay-out');
}
//SWEETALERT
let customSwal = function(message,icon) {
    Swal.fire({
        text: message,
        icon: icon,
        confirmButtonColor: 'blue'
    });
}
//OPERATIONS

//get
async function getPlaylistData() {
    axios.get(getUrl,headers).then((res) => {
      console.log(res);
    })
  }
// post

async function btnCont(){
    registerObj.email = document.querySelector('#email').value;
    registerObj.password = document.querySelector('#password').value;
    registerObj.userType = 'customer';
    loadModal("./modal/loading");
    axios.post(postUrl, registerObj,headers)
    .then((res) => {
        if(res.data.userAccount) {
            customSwal("You're registered!","success");
            registerObj = {};
        }
        removeOverlay();
        // window.location.reload();
    })
}

// user authentication
async function btnLogin() {
    logObj.email = document.querySelector('#log-email').value;
    logObj.password = document.querySelector('#log-pass').value;
    loadModal("./modal/loading");
    axios.post(authenticationUrl, logObj, headers)
    .then((res) => {
        if(res.data.errorMessage) {
            customSwal(res.data.errorMessage,"warning");
        } else {
            customSwal("Authentication Complete!","success");
        }
        registerObj = {};
        removeOverlay();
        console.log(res.data.errorMessage);
    })
}

