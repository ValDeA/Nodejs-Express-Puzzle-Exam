// Get the modal
var modal = document.getElementById('Modal');
 
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0]; 
		
// Image Path Recieve
var imgPath;
var imgSrc = function(psrc) {
	imgPath = psrc;
}
 
// When the user clicks on the button, open the modal 
var imgClick = function() {
	document.getElementById('modalImg').src = imgPath;
	modal.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
	modal.style.display = "none";
}
 
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}