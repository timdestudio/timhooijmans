$(document).ready(function(){

	//(re)set layout width
	Manager.setLayoutWidth();

	//on window resize
	$(window).resize(function(){

			//(re)set layout width
			Manager.setLayoutWidth();

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
