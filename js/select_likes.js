
var select_likes = function (image_id,likesContainer) {

	
	const php = "php/select_likes.php";

	
	const xhr = new XMLHttpRequest();

	
	let formData = new FormData();
	formData.append("user_id",window.localStorage.getItem("user_id"));
	formData.append("image_id",image_id);

	
	let itemRaw = [];

	
    xhr.open("POST", php, true);
    xhr.onreadystatechange = function() {
      
        if (xhr.readyState == 4 && xhr.status == 200) {
            
            itemRaw = JSON.parse(xhr.responseText);
			console.log(xhr.responseText); 

			likesContainer.innerHTML = itemRaw[0].likes;

			
			       }
	};
	
	xhr.send(formData);

};
