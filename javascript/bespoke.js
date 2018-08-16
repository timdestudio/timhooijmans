$(document).ready(function(){

	var myElement = document.getElementById('l-images-wrapper');

	var hammertime = new Hammer((myElement));
	hammertime.on('pan', function(ev) {

		console.log(ev);
		
	});
  
});//document ready

var Manager = {};//Manager
