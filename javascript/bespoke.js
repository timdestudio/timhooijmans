$(document).ready(function(){

	//initiate all marquee blocks on page
	$('svg.marquee-block').each(function(i,e){initMarqueeBlock(e);});

		//make sure the marquee blocks are doing their thing
		function initMarqueeBlock(e){
			
			//element.
			var paper = Snap("#"+e.id);
			var caption = paper.attr('data-caption');
			var mode = paper.attr('data-mode');

			//set viewBox to initial svg size 
			$(e).attr('viewBox','0 0 '+paper.node.clientWidth+' '+paper.node.clientHeight);

			//get the centers of the SVG element
			var cx = $(paper.node).width()/2;
			var cy = ($(paper.node).height()/2)+(64/2);

			var time = 4000;

			var g = paper.g();
			
			//create the text elements
			var t1 = paper.text(0,0,caption);
			var t2 = paper.text(0,0,caption);
			var t3 = paper.text(0,0,caption);

			//append all the three text elements to the paper
			g.append(t1);
			g.append(t2);
			g.append(t3);

			//rotate the paper
			if(mode!="straight")g.transform('r -45');

			anime();

			function anime(){

				//send the text elements to their starting points
				t1.attr({x:cx,y:cy});
				t2.attr({x:0-cx,y:cy});
				t3.attr({x:0-(3*cx),y:cy});

				//animate the text elements
				t1.animate({x:(3*cx)},time, function(){anime()});
				t2.animate({x:cx},time);
				t3.animate({x:(0-cx)},(time));

			}

		}

	//(re)set layout width
	Manager.setLayoutWidth();

	//main video toggle mute
	Manager.toggleMute();

	//on window resize
	$(window).resize(function(){

			//(re)set layout width
			Manager.setLayoutWidth();

	});

	//init mute button
	$('a#mute').click(function(e){

		e.preventDefault();
		Manager.toggleMute();

	});

	//init fullscreen button
	$('a#fullscreen').click(function(e){

		e.preventDefault();
		Manager.goFullscreen();

	});

  
});//document ready

var Manager = {
	muted:false,
	fullscreen:true,
	navFixed:false,
	navHidden:false,
	scrollTop:0,
	fadeInSpeed:300,
	everythingFaded:0,
	fadeInKey:0,
	scrollTargets:[],
	reverseScrollTargets:[],
	imageArray:[],
	preloaderIncrement:0,
	preloaderCount:0,
	infoRibbon:null,
	toggleMute:function(){

		if($('video#main-video').prop('muted')==true){

			$('video#main-video').prop('muted', false); //mute
			$('a#mute').text('mute');

		}else{

			$('video#main-video').prop('muted', true); //mute
			$('a#mute').text('unmute');
		}

	},
	goFullscreen:function(){

			var video = document.getElementById('main-video');
			if (video.requestFullscreen) {
			   video.requestFullscreen();
			} else if (video.mozRequestFullScreen) {
			   video.mozRequestFullScreen(); // Firefox
			} else if (video.webkitRequestFullscreen) {
			   video.webkitRequestFullscreen(); // Chrome and Safari
			 }
	},
	fixNav:function(){

		$('nav').addClass('fixed');
		Manager.navFixed = true;
		
	},
	unfixNav:function(){

		$('nav').removeClass('fixed');
		Manager.navFixed = false;

	},
	preload:function(){

		console.log('Starting preload.');

		//set image array
		Manager.imageArray = $('#l-body-wrapper section img');
		//set preloader bar increments
		Manager.preloaderIncrement = 100 / parseInt(Manager.imageArray.length);
		//start preloading
		Manager.preloadNextImage();


	},
	preloadNextImage:function(){

		//get the next image from the image array
		var image = Manager.imageArray.get(Manager.preloaderCount);

		//set the attributes for creating the image
		var imageAttributes = {src:$(image).attr('data-src')};

		//create preload node and attacht on load function
		$('<img/>').on('load', function(){ 
		
			//set the src attribute for the img element
			$(Manager.imageArray[Manager.preloaderCount]).attr({src:this.src});

			//up the preloader counter by 1
			Manager.preloaderCount++;

			//log the preloader progress
			console.log(Manager.preloaderCount+" : "+imageAttributes.src)

			$('div#preloader').css({width:(Manager.preloaderCount*Manager.preloaderIncrement)+"vw"});

			if(Manager.preloaderCount==Manager.imageArray.length){

				setTimeout(function(){

					Manager.transitionAndDo('div#preloader',{opacity:0},function(){Manager.init()});

				},1000);
				return;

			}else{

				Manager.preloadNextImage();

			}

			

		}).attr(imageAttributes);


	},
	transitionAndDo:function(selector,cssObject,callback){

		$(selector).css(cssObject).on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",

			function(e){
				//make sure it fires once
			 	$(this).off(e);
				//unbind event listener
				$(this).unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd");
				//execute callback function
				callback();
		});		

	},
	init:function(){


		//get content that has to fade in
		Manager.fadeInArray = $('.fade-in');

		//set the fade in array key to 0
		Manager.fadeInKey = 0;

		//set the fade check integer
		Manager.everythingFaded = Manager.fadeInArray.length;

		console.log(Manager.fadeInArray.length+' elements to fade');

		//start fading in the content
		setTimeout(Manager.fadeInNext,200);

		console.log('starting fade in');

		//scroll to navigation
		//setTimeout(Manager.scrollToNavigation,500);
		
		$('ul#navigation-menu li a').each(function(){

				$(this).click(function(e){

				var href = $(this).attr('href');

				e.preventDefault();

				//if(Manager.everythingFaded==0){

					$('html,body').animate({ scrollTop: 0 },500);

					setTimeout(function(){Manager.transitionAndDo('section',{opacity:0},function(){window.location = href;})},500);

				//}//everything faded check

			});//on click event			

		});//for each menu item

	},//init end
	fadeInNext:function(){

		if(Manager.everythingFaded>0){

			$(Manager.fadeInArray[Manager.fadeInKey]).toggleClass('fade-in');
		 	
		 	Manager.everythingFaded--;
		 	Manager.fadeInKey++;

		 	console.log('Fade countdown: '+Manager.everythingFaded);
			setTimeout(Manager.fadeInNext,Manager.fadeInSpeed);

		}else{

			console.log('Everything has faded.');
			return;

		}
		

	},
	setLayoutWidth:function(){
	//	$('div#l-body-wrapper').css({width:$('body').innerWidth()});
	},
	initMobileMenu:function(){

		Manager.menuOpen = false;

		$('#menu-toggle-button').click(function(e){

			e.preventDefault();

			if(Manager.menuOpen==false){

				console.log('open menu');
				var h = (($(window).height()-$('#roem-ribbon').height())/10)+'rem';
				$('#l-head-wrapper, nav, #nav-placeholder').css({height:h});
				$('nav ul').show();
				$(this).text('Close');
				Manager.menuOpen = true;

			}else{

				console.log('close menu');
				var h = ($('#roem-ribbon').height()/10)+'rem';
				$('#l-head-wrapper, nav, #nav-placeholder').css({height:h});
				$('nav ul').hide();
				$(this).text('Menu');
				Manager.menuOpen = false;
			}
			
		});

	}
	
};//Manager
