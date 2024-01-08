// 헤더 이벤트

// 헤더 메뉴바
let toggle = 0;
$(".menu_bar").on("click", function () {
  if (toggle == 0) {
    $("header").addClass("on");
    $(".menu_bar").addClass("on");
    $(".menu").css({ display: "flex" });
    $(".menu").stop().animate({ right: "0" });
    setTimeout(function () {
      $(".menu li span").stop().animate({ width: "100%" });
    }, 350);
    toggle = 1;
  } else {
    $("header").removeClass("on");
    $(".menu_bar").removeClass("on");
    $(".menu").stop().animate({ right: "-100%" });
    setTimeout(function () {
      $(".menu").css({ display: "none" });
    }, 300);

    $(".menu li span").stop().animate({ width: "0%" });
    toggle = 0;
  }
});

// 헤더 메뉴창
$(".menu li").on("mouseover", function () {
  $(this).addClass("over");
  $(this).children("span").stop().animate({ width: "0" });
});
$(".menu li").on("mouseout", function () {
  $(this).removeClass("over");
  $(this).children("span").stop().animate({ width: "100%" });
});

// 헤더 메뉴창 클릭
$(".menu ul li").on("click", function () {
  menu = $(this).children("a").attr("href");
  menupos = $(menu).offset().top;
  menuscroll(menupos);
});

function menuscroll(menupos) {
  $("html, body").stop().animate({ scrollTop: menupos }, 1000);

  $("header").removeClass("on");
  $(".menu_bar").removeClass("on");
  $(".menu").stop().animate({ right: "-100%" });
  setTimeout(function () {
    $(".menu").css({ display: "none" });
  }, 300);

  $(".menu li span").stop().animate({ width: "0%" });
  toggle = 0;
}

// 비쥬얼 이벤트
$(document).ready(function () {
  $("#visual ul li:first-child").addClass("on1");
  setTimeout(function () {
    $("#visual ul li:first-child").addClass("on2");
  }, 1500);
  setTimeout(function () {
    for (let i = 0; i < $(".slogan").length; i++) {
      setTimeout(function () {
        $(".slogan").eq(i).addClass("on");
      }, i * 1000);
    }
  }, 3800);
});

// 아티스트 이벤트
$(".artist li").on("mouseover", function () {
  $(this).addClass("over");
});
$(".artist li").on("mouseout", function () {
  $(this).removeClass("over");
});

// 앨범 이벤트
let num1 = 0;
let num2 = 0;
let auto = setInterval(next, 5000);

// 다음버튼
function next() {
  // 앨범 배경
  // 앨범 텍스트
  // nav bar
  if (num1 !== $(".new_bg").length - 1) {
    num1++;
  } else {
    num1 = 0;
  }
  $(".new_bg").fadeOut();
  $(".new_bg").eq(num1).fadeIn();
  $(".album_text ul li").css({ display: "none" });
  $(".album_text ul li").eq(num1).css({ display: "block" });
  $(".album_text ul li").removeClass("on");
  setTimeout(function () {
    $(".album_text ul li").eq(num1).addClass("on");
  }, 50);
  $(".nav li").removeClass("on");
  $(".nav li").eq(num1).addClass("on");

  // 앨범 커버
  num2++;
  if (num2 == $(".album_cover ul li").length - 1) {
    $(".album_cover ul")
      .stop()
      .animate({ marginLeft: "-500%" }, function () {
        $(".album_cover ul").css({ marginLeft: "0" });
      });
    num2 = 0;
  } else {
    $(".album_cover ul")
      .stop()
      .animate({ marginLeft: `${-num2 * 100}%` });
  }
}

// 이전버튼
function prev() {
  // 앨범 배경
  // 앨범 텍스트
  // nav bar
  if (num1 !== 0) {
    num1--;
  } else {
    num1 = $(".new_bg").length - 1;
  }
  $(".new_bg").fadeOut();
  $(".new_bg").eq(num1).fadeIn();
  $(".album_text ul li").css({ display: "none" });
  $(".album_text ul li").eq(num1).css({ display: "block" });
  $(".album_text ul li").removeClass("on");
  setTimeout(function () {
    $(".album_text ul li").eq(num1).addClass("on");
  }, 50);
  $(".nav li").removeClass("on");
  $(".nav li").eq(num1).addClass("on");

  // 앨범 커버
  num2--;
  if (num2 < 0) {
    $(".album_cover ul").css({ marginLeft: "-500%" });
    $(".album_cover ul").stop().animate({ marginLeft: "-400%" });
    num2 = $(".album_cover ul li").length - 2;
  } else {
    $(".album_cover ul")
      .stop()
      .animate({ marginLeft: `${-num2 * 100}%` });
  }
}

// 앨범 다음, 이전 버튼
$(".next_bg").on("click", function () {
  clearInterval(auto);
  next();
  auto = setInterval(next, 5000);
});

$(".prev_bg").on("click", function () {
  clearInterval(auto);
  prev();
  auto = setInterval(next, 5000);
});

// 앨범 터치 이벤트
let startX, endX;
let albumSlide = document.querySelector(".con3_inner");

albumSlide.addEventListener("touchstart", function (e) {
  clearInterval(auto);
  startX = e.touches[0].pageX;
});

albumSlide.addEventListener("touchend", function (e) {
  endX = e.changedTouches[0].pageX;

  if (startX < endX && startX !== endX && endX - startX >= 50) {
    prev();
  }
  if (startX > endX && startX !== endX && startX - endX >= 50) {
    next();
  }

  auto = setInterval(next, 5000);
});

// 네비바
$(".nav li").on("click", function () {
  clearInterval(auto);
  let i = $(this).index();
  $(".album_cover ul")
    .stop()
    .animate({ marginLeft: `${-i * 100}%` });
  $(".new_bg").fadeOut();
  $(".new_bg").eq(i).fadeIn();
  $(".album_text ul li").css({ display: "none" });
  $(".album_text ul li").eq(i).css({ display: "block" });
  $(".album_text ul li").removeClass("on");
  setTimeout(function () {
    $(".album_text ul li").eq(i).addClass("on");
  }, 50);
  $(".nav li").removeClass("on");
  $(".nav li").eq(i).addClass("on");
  num1 = i;
  num2 = i;
  auto = setInterval(next, 5000);
});

// 뮤직비디오 이벤트
let movieNum = 0;
let auto2 = setInterval(high, 5000);

// 뮤직비디오 다음버튼
function high() {
  $(".movie ul")
    .stop()
    .animate({ top: "-100%" }, function () {
      $(".movie ul li").first().appendTo(".movie ul");
      $(".movie ul").css({ top: "0" });
    });

  if (movieNum !== $(".movie_text li").length - 1) {
    movieNum++;
  } else {
    movieNum = 0;
  }

  $(".movie_text li").fadeOut();
  $(".movie_text li").eq(movieNum).fadeIn();
}

// 뮤직비디오 이전버튼
function low() {
  $(".movie ul li").last().prependTo(".movie ul");
  $(".movie ul").css({ top: "-100%" });
  $(".movie ul").stop().animate({ top: "0" });

  if (movieNum !== 0) {
    movieNum--;
  } else {
    movieNum = $(".movie_text li").length - 1;
  }

  $(".movie_text li").fadeOut();
  $(".movie_text li").eq(movieNum).fadeIn();
}

$(".con4_next").on("click", function () {
  clearInterval(auto2);
  high();
  auto2 = setInterval(high, 5000);
});

$(".con4_prev").on("click", function () {
  clearInterval(auto2);
  low();
  auto2 = setInterval(high, 5000);
});

// 뮤직비디오 터치 이벤트
let movieSlide = document.querySelector(".movie_wrap");

movieSlide.addEventListener("touchstart", function (e) {
  clearInterval(auto2);
  startX = e.touches[0].pageX;
});

movieSlide.addEventListener("touchend", function (e) {
  endX = e.changedTouches[0].pageX;

  if (startX < endX && startX !== endX && endX - startX >= 50) {
    low();
  }
  if (startX > endX && startX !== endX && startX - endX >= 50) {
    high();
  }

  auto2 = setInterval(high, 5000);
});

// top버튼
$(".top_btn").on("click", function () {
  target = $(this).children("a").attr("href");
  targetpos = $(target).offset().top;
  movescroll(targetpos);
});

function movescroll(targetpos) {
  $("html, body").stop().animate({ scrollTop: targetpos }, 1000);
}

// 스크롤 이벤트
let con1 = document.querySelector("#con1"),
  con2 = document.querySelector("#con2"),
  con3 = document.querySelector("#con3"),
  con4 = document.querySelector("#con4"),
  con5 = document.querySelector("#con5"),
  con6 = document.querySelector("#con6");
let baseLine = 500;

window.addEventListener("scroll", function () {
  // top버튼 스크롤
  if (this.scrollY > 0) {
    $(".top_btn").css({ display: "block" });
  } else {
    $(".top_btn").css({ display: "none" });
  }

  //컨테이너 1번(about 스크롤)
  if (this.scrollY >= con1.offsetTop - baseLine) {
    $(".value").addClass("on");
    for (let i = 0; i < $(".con1_inner h2 i").length; i++) {
      setTimeout(function () {
        $(".con1_inner h2 i").eq(i).addClass("on");
      }, Math.random() * 1000);
    }
    $(".line").addClass("on");
    for (let i = 0; i < $(".value_text p").length; i++) {
      setTimeout(function () {
        $(".value_text p").eq(i).addClass("on");
      }, i * 100);
    }
  }

  // 컨테이너 2번(아티스트 스크롤)
  if (this.scrollY >= con2.offsetTop - baseLine) {
    $(".con2_top").addClass("on");
    setTimeout(function () {
      for (let i = 0; i < $(".artist li").length; i++) {
        setTimeout(function () {
          $(".artist li").eq(i).addClass("on");
        }, Math.random() * 1000);
      }
    }, 500);
  }

  // 컨테이너 4번(뮤직비디오 스크롤)
  if (this.scrollY >= con4.offsetTop - baseLine) {
    $(".con4_inner").addClass("on");
    setTimeout(function () {
      $(".con4_inner").addClass("on1");
      $(".con4_inner").addClass("on2");
    }, 500);
    setTimeout(function () {
      $(".con4_inner").addClass("on3");
      $(".con4_inner").addClass("on4");
    }, 1000);
    setTimeout(function () {
      $(".con4_inner").addClass("on5");
    }, 1500);
  }

  // 컨테이너 5번(오디션 스크롤)
  if (this.scrollY >= con5.offsetTop - baseLine) {
    $(".con5_inner > div:nth-of-type(1)").addClass("on");
    $(".con5_inner > div:nth-of-type(1)").addClass("on1");
    setTimeout(function () {
      $(".con5_inner > div:nth-of-type(1)").addClass("on2");
    }, 500);
    $(".con5_inner >div:nth-of-type(2)").addClass("on");
  }

  // 컨테이너 6번(컨택트 스크롤)
  if (this.scrollY >= con6.offsetTop - baseLine) {
    $(".con6_top").addClass("on");
    $(".map").addClass("on");
    $(".con6_inner > ul li ul").addClass("on");
  }
});
