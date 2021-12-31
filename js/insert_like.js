
var insert_like = function(image_id,addForm) {

  
    addForm.addEventListener('submit', function (event) {
        event.preventDefault();

       
        const php = "php/insert_like.php";

        
        const xhr = new XMLHttpRequest();
        let formData = new FormData(addForm);
        formData.append("user_id",window.localStorage.getItem("user_id"));
        formData.append("image_id",image_id);

       
        xhr.open("POST", php, true);
        xhr.onreadystatechange = function () {
           
            if (xhr.readyState == 4 && xhr.status == 200) {
               
                console.log(xhr.responseText);

                
                console.log("like inserted");
            }
        };
        xhr.send(formData);
    });
};
