
var select_single = function (image_id) {

	//This is the backend file connecting to the DB
	const php = "php/select_single.php";
	const php2 = "php/own_likes.php";

	//Handles the server call to the PHP file and the data we get back
	const xhr = new XMLHttpRequest();

	//Prepare form data to select the right image
	let formData = new FormData();
	formData.append("user_id",window.localStorage.getItem("user_id"));
	formData.append("image_id",image_id);

	//Will contain the raw data from the DB
	let itemRaw = [];

	//Connect to the PHP
    xhr.open("POST", php, php2, true);
    xhr.onreadystatechange = function() {
        //This is stuff to tell us what is going on
    	//console.log('readyState: ' + xhr.readyState);
        //console.log('status: ' + xhr.status);
        if (xhr.readyState == 4 && xhr.status == 200) {
            //Everything ok, get the names in JSON
            //console.log(xhr.responseText);
			itemRaw = JSON.parse(xhr.responseText);
			//console.log(itemRaw); // print response

			//Prepare the modal
			let modal = document.createElement("div");
			modal.classList.add("modal");
			modal.id = "modal";

			//Prepare the close button
			let close = document.createElement("div");
			close.innerHTML = "<i class='fas fa-times'></i>"; //Uses FontAwesome library
			close.classList.add("closeBttn");
			close.addEventListener("click", function(e) {
				modal.parentNode.removeChild(modal);
			});

			
			//Prepare the image section
			let imageSECTION = document.createElement('section');

			let imageUsername = document.createElement("h4");
			imageUsername.innerHTML = itemRaw[0].username;

			let imageTitle = document.createElement('p');
			imageTitle.innerHTML = itemRaw[0].title;

			let imageCaption = document.createElement('p');
			imageCaption.innerHTML = itemRaw[0].caption;

			let imageTag = document.createElement('img');
			imageTag.src = "uploads/"+itemRaw[0].src;

			//Drop image elements in the image section
			imageSECTION.appendChild(imageTag);
			imageSECTION.appendChild(imageUsername);
			imageSECTION.appendChild(imageTitle);
			imageTitle.style.display = 'none';
			imageSECTION.appendChild(imageCaption);
			


			//Prepare the messages section
			let commentsSECTION = document.createElement('section');

			//Prepare list of comments
			let commentsContainer = document.createElement("div");

			commentsSECTION.appendChild(commentsContainer);

			//Call the function to get the list of comments >> select_comments.js
			select_comments(image_id,commentsContainer);
			
			//

			/*let likesSECTION = document.createElement('section');

			//Prepare list of comments
			let likesContainer = document.createElement("div");

			likesSECTION.appendChild(likesContainer);

			//Call the function to get the list of comments >> select_comments.js
			select_likes(image_id,likesContainer);*/

			//Prepare the form IF user is logged in
			if (window.localStorage.getItem("user_id")) {

				let formContainer = document.createElement("div");
				formContainer.setAttribute("id","addCommentSection");

				let commentForm = document.createElement('form');
				commentForm.setAttribute("id","commentForm");

				let commentContent = document.createElement("textarea");
				commentContent.setAttribute("name","content");
				commentContent.setAttribute("placeholder","Comment...");
				commentContent.id = "commentContent";


				let commentSubmit = document.createElement("input");
				commentSubmit.setAttribute("type","submit");
				commentSubmit.setAttribute("value","Post");
				commentSubmit.id  = "comment";


				


				commentForm.appendChild(commentContent);

				commentForm.appendChild(commentSubmit);
				formContainer.appendChild(commentForm);
				commentsSECTION.appendChild(formContainer);
				
			

				//call the function to handle the form >> insert_comment.js
				insert_comment(image_id,commentForm);
				let likeForm = document.createElement("form");
			let likeBttn = document.createElement("button");
			
			let o = document.createElement("div");
			var l = document.createTextNode("likes");




			likeForm.setAttribute("name","addLike");
			likeForm.setAttribute("id","addLike");
			likeBttn.setAttribute("type","submit");
			likeBttn.setAttribute("id","myBtn");
			likeForm.appendChild(likeBttn);

			let cup = document.createElement("i");
			cup.setAttribute("class","fas fa-coffee");
			likeBttn.appendChild(cup);

			insert_like(itemRaw[0].id , likeForm);

			var likesContainer = document.createElement("p");
			likesContainer.id = "Div1";
			//likesContainer.setAttribute("id", "Div1");
			select_likes(itemRaw[0].id,likesContainer);
			o.appendChild(l);
			
			likeForm.appendChild(likesContainer);
			likeForm.appendChild(o);
			o.setAttribute("id","o");

			
			own_likes(itemRaw[0].id,likeBttn);

				function myFunction() {
 			 document.getElementById("myBtn").disabled = true;
			}
				
				imageSECTION.appendChild(likeForm);
			

			
			likeBttn.addEventListener("click", function(e)
			{
				select_likes(itemRaw[0].id,likesContainer);
				own_likes(itemRaw[0].id,likeBttn);
				
				
				
				
			});
			likeBttn.addEventListener("click", function(e)
			{
				likeBttn.classList.add("liked");

				setTimeout(myFunction, 300);
				//setTimeout(select_likes(image_id,likesContainer), 2000);

			// setInterval(function() {

				select_likes(itemRaw[0].id,likesContainer);
				select_likes(itemRaw[0].id,likesContainer);
				//own_likes(itemRaw[0].id,likeBttn);
				
				


			// }, 200);

				
				
			});

			
			}

			//Drop the sections (and the close button) in the modal
			modal.appendChild(imageSECTION);
			modal.appendChild(commentsSECTION);
			modal.appendChild(close);


			//Drop the modal in the document
			document.body.appendChild(modal);
			/*$("#myBtn").click(function(){

 			 //select_likes(image_id,likesContainer);


});*/
			/*setInterval(function() {

				select_likes(image_id,likesContainer);


			}, 1000);*/

			
			// own_likes(itemRaw[0].id,likeBttn);

		}
		
	};
	xhr.send(formData);
	


};


