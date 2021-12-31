
var insert_comment = function(image_id,addForm) {

    //When the user submits the form (clicks the button)
    addForm.addEventListener('submit', function (event) {
        event.preventDefault();

        //This is the backend file inserting in the DB
        const php = "php/insert_comment.php";

        //This is what we send to the server for the PHP file
        const xhr = new XMLHttpRequest();
        let formData = new FormData(addForm);
        formData.append("user_id",window.localStorage.getItem("user_id"));
        formData.append("image_id",image_id);

        //Connect to the PHP
        xhr.open("POST", php, true);
        xhr.onreadystatechange = function () {
            //console.log('readyState: ' + xhr.readyState);
            //console.log('status: ' + xhr.status);
            if (xhr.readyState == 4 && xhr.status == 200) {
                // Everything ok, get the response
                //console.log(xhr.responseText);

                // Update the messages
                select_comments(image_id,addForm.parentNode.parentNode.firstElementChild);
                addForm.firstElementChild.value = "";
                console.log("comment inserted");
            }
        };
        xhr.send(formData);
    });
};
