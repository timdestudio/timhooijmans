$(document).ready(function(){



	
	var clusterWidth = $("svg.project-title:first").width();
	var titleWidth = ($("div.images-cluster:first").width());
	var titleWrapperPadding = parseInt($('div#titles-wrapper').css('padding-left'));


	var scrollRatio = ( clusterWidth / (titleWidth - 50));

	console.log('cluster width: '+clusterWidth);
	console.log('title width: '+titleWidth);
	console.log('scroll ratio: '+scrollRatio);

	$('div#images-wrapper').scroll(function() {

		var titleScroll = '-' + ($(this).scrollLeft() * scrollRatio) + 'px';

		console.log(titleScroll);

		$("svg.project-title:first").css('left',titleScroll);	

	});


});//document ready

var Manager = {};//Manager
