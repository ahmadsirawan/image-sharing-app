/*
This file handles the image posting mechanism.
 */


//Setup the Dropzone
Dropzone.options.myDropzone = {
    init: function () {
        this.on("complete", function (file) {
            //console.log(file.xhr.responseText); //The name of the file on the server
            this.disable();  //Turn off the Dropzone
            setup_form(file.xhr.responseText);  //Setup the form (see below)
        });
    },
    capture: "camera",
    acceptedFiles: ".jpg,.png,.gif"  //Limit the files to images
};

//Setup the post form
const setup_form = function (file) {
    //The form
    var form = document.createElement("form");
    form.setAttribute("id", "add_image");
    form.setAttribute("method", "post");

    //The image title
    var titleLabel = document.createElement("label");
    titleLabel.innerHTML = "";
    titleLabel.setAttribute("for", "title");
    var titleInput = document.createElement("input");
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("name", "title");
    titleInput.setAttribute("id", "title");
    titleInput.setAttribute("placeholder", "TITLE");
    form.appendChild(titleLabel);
    form.appendChild(titleInput);
    
    titleLabel.style.display = 'none';
    titleInput.style.display = 'none';

    //The image caption
    var captionLabel = document.createElement("label");
    captionLabel.innerHTML = "";
    captionLabel.setAttribute("for", "caption");
    var captionInput = document.createElement("input");
    captionInput.setAttribute("type", "text");
    captionInput.setAttribute("name", "caption");
    captionInput.setAttribute("id", "caption");
    captionInput.setAttribute("placeholder", "CAPTION");
    form.appendChild(captionLabel);
    form.appendChild(captionInput);

    //The image file name
    var srcInput = document.createElement("input");
    srcInput.setAttribute("type", "hidden");
    srcInput.setAttribute("name", "src");
    srcInput.setAttribute("value", file);
    form.appendChild(srcInput);

    //The userId of the poster (logged in)
    var userInput = document.createElement("input");
    userInput.setAttribute("type", "hidden");
    userInput.setAttribute("name", "user_id");
    userInput.setAttribute("value", window.localStorage.getItem("user_id"));
    form.appendChild(userInput);

    //The submit button
    var submitInput = document.createElement("input");
    submitInput.setAttribute("type", "submit");
    submitInput.setAttribute("value", "Post");
    submitInput.setAttribute("id", "Post-image");

    form.appendChild(submitInput);

    //Add it to the window
    document.getElementById("drop").appendChild(form);

    insert_image();
};

//Control the insert_image command
const insert_image = function () {
    //The form in the HTML
    const addForm = document.getElementById("add_image");

    //When the user submits the form (clicks the button)
    addForm.addEventListener('submit', function (event) {
        event.preventDefault();

        //This is the backend file inserting in the DB
        const php = "php/insert_image.php";

        //This is what we send to the server for the PHP file
        const xhr = new XMLHttpRequest();
        let formData = new FormData(addForm);

        //Connect to the PHP
        xhr.open("POST", php, true);
        xhr.onreadystatechange = function () {
            //console.log('readyState: ' + xhr.readyState);
            //console.log('status: ' + xhr.status);
            if (xhr.readyState == 4 && xhr.status == 200) {
                // Everything ok, get the response
                //console.log(xhr.responseText);

                console.log("image added");

                window.location.href = "index.html";
            }
        };
        xhr.send(formData);
    });

};