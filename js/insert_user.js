 

var insert_user = function() {
    //The form in the HTML
    const addForm = document.getElementById("signupForm");
    const username2 = document.getElementById("username2");
    const password2 = document.getElementById("password2");
    
    

    //Will contain the raw data from the DB
    let itemRaw = [];

    //When the user submits the form (clicks the button)
    addForm.addEventListener('submit', function (event) {
        event.preventDefault();

        
        

        if (username2.value.length > 2 && password2.value.length > 5) {
        //This is the backend file inserting in the DB
        const php = "php/insert_user.php";

        //This is what we send to the server for the PHP file
        const xhr = new XMLHttpRequest();
        let formData = new FormData(addForm);

        //Connect to the PHP
        xhr.open("POST", php, true);
        xhr.onreadystatechange = function () {
            

            console.log('readyState: ' + xhr.readyState);
            console.log('status: ' + xhr.status);
            if (xhr.readyState == 4 && xhr.status == 200) {
                // Everything ok, get the response
                //console.log(xhr.responseText);

                itemRaw = JSON.parse(xhr.responseText);

                console.log("inserted user: "+itemRaw[0].id);

                //Set the local storage
                window.localStorage.setItem('user_id',itemRaw[0].id);
                window.localStorage.setItem('username',itemRaw[0].username);


                //Update the UI
                resetUI();
            }
        };
        xhr.send(formData);


        } else{
        
        const input = document.getElementsByTagName('input');
        
                input[3].style.border = '2px solid red';
                input[4].style.border = '2px solid red';
                const characters = document.getElementsByClassName('characters');
                characters[0].style.color = 'red';
                characters[1].style.color = 'red';

        
        
        }
    });
};
insert_user();