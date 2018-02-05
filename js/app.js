
//TODO move alot of this DOM manipulation into on('headerChange')
function checkScroll(){
	$body = $("body");
	if( $(window).scrollTop() > $(".alertBox").outerHeight() ){
		if(!$body.hasClass("pageScrolled")){
			$(".alertBox").removeClass("showAlert");
			$body.addClass("pageScrolled").trigger('headerChange');
			
			//close the menu
			$("header").removeClass("show-nav").find("#menu-header-menu > li")
				.removeClass("activeMenu").siblings().removeClass("activeMenu");

		}
	}else{
		$body.removeClass("pageScrolled").trigger('headerChange');

		//close the menu
		$("header").removeClass("show-nav").find("#menu-header-menu > li")
			.removeClass("activeMenu").siblings().removeClass("activeMenu");
	}
}

$(function() { // event rigging

	$(document).ready(function(){
		$(".owl-carousel").owlCarousel({
			items: 6,
			loop: true,
			center: true,
			autoplay: true,
			autoplayTimeout: 1000,
			responsive:{
				0:{
					items: 4
				},
				600:{
					items: 6
				}
			}
		});
	});

	$(".mobileMenu").on("click", function(){
		$("header").toggleClass("show-nav");
	});

	checkScroll();

	$("body").on('headerChange', function(e){
		
	});

	var resizeTimer;
	$(window).on('resize', function(e) {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function() {
		//debounced resize event
		
		//resizing has "stopped", cleanup menu
		$("header").removeClass("show-nav");
		$("header li.activeMenu").removeClass("activeMenu");
	            
	    checkScroll();
	  }, 1);
	});
	var scrollTimer;
	$(window).on('scroll',  function(e) {
		//debounced scroll event
		checkScroll();
	});

	$(document).click(function(e) {
		if ($(e.target).closest('header').length === 0) {
			//close menu, cleanup
			$("header").removeClass("show-nav");
			$("header li.activeMenu").removeClass("activeMenu");
		}
		if ($(e.target).closest('.alertBox').length === 0) {
			//close alert
			$(".alertBox").removeClass("showAlert");
		}
	});

	/* level-2 menu toggle */
	$("#menu-header-menu>li>a").on('touchstart', function (e) {
	    e.preventDefault();
		var rect = e.target.getBoundingClientRect();
		var xpos = e.targetTouches[0].pageX - rect.left;
		
		if (xpos > ($(this).outerWidth() - 62)) { //62 pixels on right for icon click
	        $(this).parent().toggleClass("activeMenu").siblings().removeClass("activeMenu");
	    }else{
			document.location=$(this).attr("href");
	    }
	});
	$(".sub-menu>li>a").on('click', function(e){
		//collapse the menu
		$("header").removeClass("show-nav").find(".activeMenu").removeClass("activeMenu");
	});

	$(".alertBox").on("click", function(){
		$(this).toggleClass("showAlert");
	});

	//waypoint sticky headers
	var stickys = new Array();

	var stickyHandler = function(direction){
		
		var previousWaypoint = this.waypoint.previous();
		var nextWaypoint = this.waypoint.next();

		$(".sticky-wrapper").removeClass('wp-current wp-next').addClass("wp-previous");
		
		$(this.element).parent(".sticky-wrapper").removeClass('wp-previous').addClass('wp-current');
		
		if(direction=="up"){
			if(previousWaypoint){
				$(previousWaypoint.element).removeClass('wp-previous')//.addClass('wp-previous-upcoming');
			}
		}else{
			if (nextWaypoint) {
			  $(nextWaypoint.element).removeClass('wp-current').addClass('wp-next');
			}
		}
	}

	var $theHeader = $("header").each(function(){
		stickys.push(new Waypoint.Sticky({
			element: $(this),
			handler: stickyHandler
		}))
	});
	var $theModules = $(".module-header").each(function(){
		stickys.push(new Waypoint.Sticky({
			element: $(this),
			offset: ($("header").outerHeight()),
			group: "module-headers",
			handler: stickyHandler
		}))
	})

	//-- end event rigging
});