var own_likes = function (image_id,bttn) {

	const php = "php/own_likes.php";

	
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

			if (itemRaw[0].likes) {
				bttn.classList.add("liked");
				document.getElementById("myBtn").disabled = true;
			}
			else {
				bttn.classList.Remove("liked");
				document.getElementById("myBtn").disabled = false;
			}
        }
	};
	
	xhr.send(formData);
};
