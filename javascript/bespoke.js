$(document).ready(function(){
 
	//init manager
	Manager.init();

});//document ready


var Manager = {

	imageClusters:[],
	projectTitles:[],

	init:function(){

		//put the image clusters and titles DOM references in arrays
		Manager.imageClusters = $('.images-cluster');
		Manager.projectTitles = $('.project-title-wrapper');

		//log cluster and title count
		console.log('image clusters: ' + Manager.imageClusters.length);
		console.log('project Titles: ' + Manager.projectTitles.length);

		Manager.positionTitles();

		//on scroll images wrapper
		$('div#images-wrapper').scroll(function() {

			//position the titles according to the image clusters
			Manager.positionTitles();
		
		});

	},//init end
	positionTitles:function(){

		var vw = window.innerWidth;
		var margin = 50;

		//for loop trough image clusters
		for(i=0;i<Manager.imageClusters.length;i++){

			//get offset of current cluster vertical or horizontal depending on the desktop breakpoint
			if( vw < 1024 ){

				var clusterLeft = $(Manager.imageClusters[i]).offset().left;
				var ratio = $(Manager.projectTitles[i]).width() / ($(Manager.imageClusters[i]).width() - margin);

			}else{

				var clusterLeft = $(Manager.imageClusters[i]).offset().top;
				var ratio = $(Manager.projectTitles[i]).height() / ($(Manager.imageClusters[i]).height() - margin);

			}

			//if current cluster has a negative offset
			if(clusterLeft<0){
	
				//set new left position calculated with ratio
				var newLeft = ratio * (clusterLeft);
	
			//if current cluster doesn't have a negative offset
			}else{
	
				//set new left position to cluster position
				var newLeft = clusterLeft;
	
			}//if statement end
	
			//adjust the title to the cluster offset
			$(Manager.projectTitles[i]).css('left',newLeft);
	
		}//for loop end
	
	}//position titles end
	
};//Manager



/*---------------------------------------

VERSION 1

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



---------------------------------------*/





/*--------------------------------------

VERSION 2

	positionTitles:function(){

		//for loop the amount of image clusters
		for(i=0;i<Manager.imageClusters.length;i++){

			//store left offset of current cluster
			var clusterLeft = $(Manager.imageClusters[i]).offset().left;

			//store width of current cluster and title
			var clusterWidth = $(Manager.imageClusters[i]).width();
			var titleWidth = $(Manager.projectTitles[i]).outerWidth();

			//store viewport width
			var vw = window.innerWidth;

			//calculate and store tail of cluster and title
			var clusterTail = clusterWidth - vw;
			var titleTail = titleWidth - vw;

			//calculate ratio for tail travel
			var tailRatio = titleTail / clusterTail;

			//log tail
			console.log('****** \n tail travel ratio \n ******' + tailRatio);

			//log above info
			console.log('viewport width: ' + vw);
			console.log('cluster width: ' + clusterWidth);
			console.log('title width: ' + titleWidth);
			console.log('cluster tail: ' + clusterTail);
			console.log('title tail: ' + titleTail);

			//calculate "tail" offset between cluster and title
			var tailOffset = clusterWidth - titleWidth;


			//if current cluster has a negative offset
			if(clusterLeft<0){

				var margin = 50;

				//calculate and set ratio
				var ratio = $(Manager.projectTitles[i]).width() / ($(Manager.imageClusters[i]).width() - margin);

				//log ratio
				console.log('ratio: '+ratio);

				//set new left position calculated with ratio
				var newLeft = tailRatio * (clusterLeft);

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

---------------------------------------*/