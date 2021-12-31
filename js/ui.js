
/* Handler for the general User Interface elements
*/
const nav = document.querySelector('.navbar');
const close = document.querySelector('#post i');
const flex = document.querySelector('.flex');
 const logBtn = document.querySelector('#log-btn');
    const signupBtn = document.querySelector('#signup-btn');
    const loginContainer = document.querySelector('#login');
    const signupContainer = document.querySelector('#signup');
    // const myDropzone = document.querySelector('#myDropzone');
    const drop = document.querySelector('#myDropzone');
    const prev = document.querySelector('#drop');
    const post = document.querySelector('#post');


    // 
    //    if (event.target.id != "#drop.preview") {
    //       drop.style.display = 'none';
    //    }
    // }
    // prev.addEventListener('click', () => {
    //     prev.classList.remove('preview');
    //     });
    
    logBtn.addEventListener('click', () =>  {
        signupContainer.style.display = 'none';
        loginContainer.style.display = 'flex';
       


    });
    signupBtn.addEventListener('click', () =>  {
        loginContainer.style.display = 'none';
        signupContainer.style.display = 'flex';

    });
    // const dzMessage = document.querySelector('#myDropzone span');
    //     dzMessage.innerHTML = '';


const resetUI = function() {
    if (window.localStorage.getItem("user_id")) {
        //We are logged in
        //Hide login and signup forms
        document.getElementById("login").classList.add("hide");
        document.getElementById("signup").classList.add("hide");
        flex.style.display = 'none';
        nav.style.display = 'flex';

        //Show the post section
        document.getElementById("post").classList.remove("hide");

        drop.addEventListener('click', () =>  {
        prev.classList.add('preview');
        close.style.display = 'block';
        });
    close.onclick = function(event) {
       if (prev.classList.contains('preview') === true) {
            
            // prev.classList.remove('preview');
            // close.style.display = 'none';
            window.location.href = "index.html";
            

                } 
        
        };
        
        // myDropzone.innerHTML = `<i class="fas fa-plus-circle"></i>`;

        //Update the greeting with the username
        document.getElementById("greeting").firstElementChild.innerHTML =
            "Hi " + window.localStorage.getItem("username").charAt(0).toUpperCase() + window.localStorage.getItem("username").slice(1) + "!";
            
        let logout = document.createElement("div");
        logout.classList.add("logout");
        logout.innerHTML = `<i class='fas fa-sign-out-alt'></i><span>Logout</span>`;
        logout.addEventListener("click", function () {
        	window.localStorage.removeItem("user_id");
        	window.localStorage.removeItem("username");
        	window.location.href = "index.html";
        })
        document.querySelector(".navbar").appendChild(logout);
    }
    else {
        //We are a guest
        //Show the login and signup forms
        document.getElementById("login").classList.remove("hide");
        document.getElementById("signup").classList.remove("hide");

        //Hide the post section
        document.getElementById("post").classList.add("hide");

        //Reset the greeting to "Welcome Guest"
        // document.getElementById("greeting").firstElementChild.innerHTML = "WELCOME TO COFFEE SHARE";
    }
    
    //Refresh the gallery
    select_images();
};

//Initial call
resetUI();