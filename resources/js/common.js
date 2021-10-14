//Header 
function gnbMenu(depth1, depth2, depth3) {
	var $gnb = $(".gnb"),
    	$gnbDep1 = $(".gnbDep1", $gnb),
        $lnb = $(".lnb"),
    	$lnbDep = $(".lnbDep1", $lnb),
        $lnbDep1 = $(".dep1 .lnbDep2", $lnb),
        $lnbDep2 = $(".dep2 .lnbDep2", $lnb),
        $lnbDep3 = $(".dep3 .lnbDep2", $lnb);
    
    //gnb
    $gnb.on('focusin mouseenter',function(){
        $(this).children().find('.gnbDep2').stop().slideDown('200');
        $(this).parent().find(".gnbBg").stop().animate({ "height":"180px" });
    });
    
    $gnb.on('focusout mouseleave',function(){
        $(this).children('.gnbDep1').find('.gnbDep2').stop().slideUp('0');
        $(this).parent().find(".gnbBg").stop().animate({ "height":"0" });
    });
    
	if ($gnbDep1.length > depth1) {
        $gnbDep1.eq(depth1).find("> a").addClass("on");
        $gnbDep1.eq(depth1).find(".gnbDep2 > li").eq(depth2).find("> a").addClass("on");
	}
    
    //lnb
    $lnbDep.find("> a").on('click', function(e) {
    	e.preventDefault();
        $(this).parent().find(".lnbDep2").stop().slideToggle();
        $(this).addClass('on');
        $(this).parent().siblings().find(".lnbDep2").css("display", "none");
        $(this).parent().siblings().find("> a").removeClass('on');
    });
    
	if ($lnbDep.length > depth1) {
		$lnbDep1.eq(depth1).find("> a").addClass("on");
        $lnbDep2.eq(depth2).find("> a").addClass("on");
        $(".dep2").find("> a").addClass("on");
        $lnbDep3.eq(depth3).find("li a").addClass("on");
    }    
    
    $gnbDep1.eq(depth1).each(function(){
        $(".dep1 > a").append( $(this).find("> a").html() );
        $(".dep2 > a").append( $(this).find(".gnbDep2 > li").eq(depth2).find("> a").html() );
		
        $lnbDep1.append( $gnb.html() );
        $lnbDep2.append( $(this).find(".gnbDep2").html() );
    });
        
    //lnb location - 스크롤 상단고정
    var $location = $(".location");
    var locationTop = $location.offset();
    
	$(window).scroll(function() {
        var scrollTopY = $(document).scrollTop();
        
        if ( scrollTopY > locationTop.top - 80 ) {
            $location.addClass("fixed").css("margin-top", "80px");
        } else {
            $location.removeClass("fixed").css("margin-top", "0");
        }
	});

}


//swiper 메인비주얼
$(function() {
    var mainslider = new Swiper('.slider-main', {
      speed: 1000,
      autoplay: {
        delay: 7000,
        disableOnInteraction: false,
      },
      effect: "fade",
      allowTouchMove : true,
      slidesPerView: 1,
    //   mousewheel: true,
    //   keyboard: true,
      
    /* loop: true, */
      
      scrollbar: {
        el: ".swiper-scrollbar", 
      },    
      
      on: {
        init: function () {
          $(".swiper-scrollbar .swiper-scrollbar-drag").removeClass("animate");
          $(".swiper-scrollbar .swiper-scrollbar-drag").eq(0).addClass("animate");
        },
        slideChangeTransitionStart: function () {
          $(".swiper-scrollbar .swiper-scrollbar-drag").removeClass("animate");
        },
        slideChangeTransitionEnd: function () {
          $(".swiper-scrollbar .swiper-scrollbar-drag").eq(0).addClass("animate");
        }
        
      },
  
      pagination: {
        el: '.swiper-pagination',      
        type: 'fraction',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
        
    }); 
    
    $(".swiper-scrollbar .swiper-scrollbar-drag").eq(0).addClass("animate");
    
    // swiper Play/Stop
    $('.swiper-play-pause').on("click", function () {
      var $this = $(this);
      if ($this.hasClass('pause')) {
          $this.removeClass('pause').addClass('play').text('Play');
          mainslider.autoplay.start();
          /* mainslider.slideNext(); */
          $(".swiper-scrollbar .swiper-scrollbar-drag").eq(0).addClass("animate");
          
      } else {
          $this.addClass('pause').removeClass('play').text('Pause');
          mainslider.autoplay.stop();
          $(".swiper-scrollbar .swiper-scrollbar-drag").removeClass("animate");
      }
    });  
});
  