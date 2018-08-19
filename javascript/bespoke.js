$(document).ready(function(){
 
	//init manager
	Manager.init();

});//document ready


var Manager = {

	imageClusters:[],
	projectTitles:[],

	init:function(){

		//put the image clusters and titles in arrays
		Manager.imageClusters = $('.images-cluster');
		Manager.projectTitles = $('.project-title-wrapper');

		//log cluster and title count
		console.log('image clusters: ' + Manager.imageClusters.length);
		console.log('project Titles: ' + Manager.projectTitles.length);

		//set project titles to match the cluster positions
		Manager.positionTitles();

		//on horizontal scroll
		$('div#images-wrapper').scroll(function() {

			//position the titles according to the image clusters
			Manager.positionTitles();
		
		});

	},//init end
	positionTitles:function(){

		//for the amount of image clusters
		for(i=0;i<Manager.imageClusters.length;i++){

			//get left offset of current cluster
			var clusterLeft = $(Manager.imageClusters[i]).offset().left;

			//if current cluster has a negative offset
			if(clusterLeft<0){

				var margin = 50;

				//calculate and set ratio
				var ratio = $(Manager.projectTitles[i]).width() / ($(Manager.imageClusters[i]).width() - margin);

				//log ratio
				console.log('ratio: '+ratio);

				//set new left position calculated with ratio
				var newLeft = ratio * (clusterLeft);

			//if current cluster doesn't have a negative offset
			}else{

				//set new left position to cluster position
				var newLeft = clusterLeft;

			}//if statement end

			//adjust the title to the cluster offset
			$(Manager.projectTitles[i]).css('left',newLeft);

			//log the positions
			console.log('cluster ' + i + ' postion: ' + $(Manager.imageClusters[i]).offset().left);
			console.log('title '+i+' postion: ' + $(Manager.projectTitles[i]).offset().left);

		}//for loop end

	}//position titles end

};//Manager
