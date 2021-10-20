//////////// Header ////////////
function gnbMenu(depth1, depth2, depth3) {
	var $gnb = $(".gnb"),
    	$gnbDep1 = $(".gnbDep1", $gnb),
      $lnb = $(".lnb"),
    	$lnbDep = $(".lnbDep1", $lnb),
      $lnbDep1 = $(".dep1 .lnbDep2", $lnb),
      $lnbDep2 = $(".dep2 .lnbDep2", $lnb),
      $lnbDep3 = $(".dep3 .lnbDep2", $lnb);
  
  //mobile var
  var $moGnbWrap = $(".moGnbWrap"),
      $moGnb = $(".moGnb", $moGnbWrap),
      $moGnbLi = $(".moGnb > li", $moGnbWrap),
      $moBtnOpen = $(".moBtnOpen"),
      $moBtnClose = $(".moBtnClose"),
      $moGnbBg = $(".moGnbBg");

    //gnb
    $gnb.on('focusin mouseenter',function(){
        $(this).children().find('.gnbDep2').stop().slideDown('300');
        $(this).parent().find(".gnbBg").stop().animate({ "height":"180px" });
    });

    $gnb.on('focusout mouseleave',function(){
        $(this).children('.gnbDep1').find('.gnbDep2').stop().slideUp('0');
        $(this).parent().find(".gnbBg").stop().animate({ "height":"0" });
    });

    // gnb - hover
    $gnbDep1.hover(function(){
        $(this).children('a').addClass("on");
    },function () {
        $(this).children('a').removeClass("on");
        $gnbDep1.eq(depth1-1).find("> a").addClass("on");
    });

    //gnb - on 활성화
    if ($gnbDep1.length > depth1-1) {
          $gnbDep1.eq(depth1-1).find("> a").addClass("on");
          $gnbDep1.eq(depth1-1).find(".gnbDep2 > li").eq(depth2-1).find("> a").addClass("on");
    }

    //lnb
    $lnbDep.find("> a").on('click', function(e) {
        e.preventDefault();
        $(this).parent().find(".lnbDep2").stop().slideToggle();
        $(this).addClass('on');
        $(this).parent().siblings().find(".lnbDep2").css("display", "none");
        $(this).parent().siblings().find("> a").removeClass('on');
    });

    //lnb - on 활성화
    if ($lnbDep.length > depth1-1) {
      $lnbDep1.eq(depth1-1).find("> a").addClass("on");
          $lnbDep2.eq(depth2-1).find("> a").addClass("on");
          $(".dep2").find("> a").addClass("on");
          $lnbDep3.eq(depth3-1).find("li a").addClass("on");
    }

    //lnb - gnb 2,3 메뉴 동일 사용
    $gnbDep1.eq(depth1-1).each(function(){
        $(".dep1 > a").append( $(this).find("> a").html() );
        $(".dep2 > a").append( $(this).find(".gnbDep2 > li").eq(depth2-1).find("> a").html() );

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


    //////////// 전체 햄버거 메뉴 ////////////
    // 메뉴열기
    $moGnbWrap.hide();
    $moBtnOpen.on("click", function(e) {
      e.preventDefault();

      $(this).hide();
      $moGnbWrap.fadeIn(200);
      //$moGnbWrap.find(".scroll").stop().animate({right:0}, 300);
      $moGnbWrap.find(".scroll").addClass("open");
      $moGnbBg.fadeIn();
      $("body").css({'height':$(window).height(), 'overflow':'hidden'});
    });

    // 메뉴닫기
    $moBtnClose.on("click", function(e) {
      e.preventDefault();
      
      $moBtnOpen.show();
      $moGnbWrap.fadeOut(200);
      //$moGnbWrap.find(".scroll").stop().animate({right:-100}, 300);
      $moGnbWrap.find(".scroll").removeClass("open");
      $moGnbBg.hide();
      $("body").css({'height':'auto', 'overflow':'auto'});
    });	

    $moGnbBg.on("click", function(e) {
      e.preventDefault();
      
      $moBtnOpen.show();
      $moGnbWrap.fadeOut(200);
      //$moGnbWrap.find(".scroll").animate({right:0}, 300);
      $moGnbWrap.find(".scroll").removeClass("open");
    });

    // 모바일 - 1,2DEPTH 오픈
    $moGnbLi.children("a").on("click", function(e) {
    //$moGnbLi.find('> a').on('click', function(e) { //2차뎁스만 사용시
      e.preventDefault();
        
        var $depth = $(this).next("ul");
        if($depth.is(":visible")){
            $(this).removeClass("on");
            $depth.slideUp(300);
        } else {
          $moGnbLi.children("a").removeClass("on");
            //$moGnb.find("li > a").removeClass("on");
            $(this).parent().siblings().find("ul").slideUp(300);
            $(this).addClass("on");
            $depth.slideDown(300);
        }
    });

    $(".moGnb .depth1 > li").children("a").on('click', function() {
        var $depth = $(this).next("ul");
        if($depth.is(":visible")){
          $(this).removeClass("on");
            $depth.slideUp(300);
        } else {
          $(".moGnb .depth1 > li").children("a").removeClass("on");
            $(this).parent().siblings().find("ul").slideUp(300);
            $(this).addClass("on");
            $depth.slideDown(300);
        }
    });

    //모바일 - 페이지 인식
    if ($moGnbLi.length > depth1-1) {
        $moGnbLi.eq(depth1-1).find("> a").addClass("on");
        $moGnbLi.eq(depth1-1).find(".depth1 > li").eq(depth2-1).find("> a").addClass("on");
        $moGnbLi.eq(depth1-1).find(".depth1 > li").eq(depth2-1).find(".depth2 > li").eq(depth3-1).find("> a").addClass("on");
    }

    //모바일 - 2depth 오픈
    if ( depth1 >= 0 && depth2 >= 0 ) {
        $moGnbLi.eq(depth1-1).addClass("on").children(".depth1").show().children("li").eq(depth2-1).addClass("on").children(".depth2").show();
    }

}


//////////// swiper 메인비주얼 ////////////
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

