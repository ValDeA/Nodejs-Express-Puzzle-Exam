jQuery(document).ready(function($){
		// select a new item from the 3d navigation
		$('.nav-main').on('click', 'label', function(){
			var selected = $(this);
			selected.parent('li').addClass('nav-selected').siblings('li').removeClass('nav-selected');
			updateSelectedNav('close');
		});
		
		// when select a slide label update navigation
		$('.slide').on('click', 'label', function(){
			var selected = $(tmplb);
			selected.parent('li').addClass('nav-selected').siblings('li').removeClass('nav-selected');
			updateSelectedNav('close');
		});

		$(window).on('resize', function(){
			window.requestAnimationFrame(updateSelectedNav);
		});
		
		// toggle navigation
		$('.nav-trigger').on('click', function(){
			toggle3dBlock(!$('.header').hasClass('nav-is-visible'));
		});
		
		function toggle3dBlock(addOrRemove) {
		if(typeof(addOrRemove)==='undefined') addOrRemove = true;	
		$('.header').toggleClass('nav-is-visible', addOrRemove);
		$('.nav-menu').toggleClass('nav-is-visible', addOrRemove);
		$('main').toggleClass('nav-is-visible', addOrRemove).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			//fix marker position when opening the menu (after a window resize)
			addOrRemove && updateSelectedNav();
		});
		}
		
		// update nav selected
		function updateSelectedNav(type) {
			var selectedItem = $('.nav-selected'),
				selectedItemPosition = selectedItem.index() + 1, 
				leftPosition = selectedItem.offset().left

			if( type == 'close') {
				setTimeout(function () { toggle3dBlock(false); }, 300);
			}
		}

	});