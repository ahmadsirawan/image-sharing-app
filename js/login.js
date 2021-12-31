/* Handler for log in
	Checks with the DB through login.php
	Sets the localstorage values for userId and username
*/


const login = function() {
    //The form in the HTML
    const loginForm = document.getElementById("loginForm");
    const username = document.getElementById("username");
    const password = document.getElementById("password");

    //Will contain the raw data from the DB
    let itemRaw = [];
    

    //When the user submits the form (clicks the button)
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        // username.value.toLowerCase().trim();
        // password.value.toLowerCase().trim();
        
        // if (username.value.length > 3 && password.value.length > 6) {
        //This is the backend file inserting in the DB
        const php = "php/login.php";

        //This is what we send to the server for the PHP file
        const xhr = new XMLHttpRequest();
        let formData = new FormData(loginForm);

        //Connect to the PHP
        xhr.open("POST", php, true);
        xhr.onreadystatechange = function () {
            //console.log('readyState: ' + xhr.readyState);
            //console.log('status: ' + xhr.status);
            if (xhr.readyState == 4 && xhr.status == 200) {
                //Get the user details
                itemRaw = JSON.parse(xhr.responseText);
                //console.log(itemRaw); // print response

                //Set the local storage
                window.localStorage.setItem('user_id',itemRaw[0].id);
                window.localStorage.setItem('username',itemRaw[0].username);



                //Update the UI

                resetUI();
            }
            if (window.localStorage.getItem("user_id") === null) {
                const small = document.getElementsByTagName('small')[1];
                const input = document.getElementsByTagName('input');
                input[0].style.border = '2px solid red';
                input[1].style.border = '2px solid red';
                small.classList.add('error');
                small.innerHTML = 'Incorrect Username or Password';

                // document.getElementById('prompt').innerHTML = e.toString();
                }
        };
        xhr.send(formData);
        
                

    // } else{
        
    //     const small = document.getElementsByTagName('small')[0];
        
    //         small.classList.add('error');
        
        
    // }

    });
};
//Init
login();