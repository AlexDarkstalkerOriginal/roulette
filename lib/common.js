var HttpRequest = require("nebulas").HttpRequest;
var Neb = require("nebulas").Neb;
var Account = require("nebulas").Account;
var Transaction = require("nebulas").Transaction;
var Unit = require("nebulas").Unit;
var neb = new Neb();
neb.setRequest(new HttpRequest("https://testnet.nebulas.io"));

var NebPay = require("nebpay");   
var nebPay = new NebPay();
var dappAddress = "___";

// онлоад
  window.onload = function(){         
    if(typeof(webExtensionWallet) === "undefined"){     
          $(".noExtension").show();   
          $(".content").hide();          
      }else{          
      }
  };  
// онлоад

// попапы
  $('.popup').magnificPopup({
    type:'inline',
    fixedContentPos: true, 
    mainClass: 'mfp-fade',      
    showCloseBtn: true,
    closeOnBgClick: false
  });   

  $('.transaction').magnificPopup({
    type:'inline',
    fixedContentPos: true, 
    mainClass: 'mfp-fade',      
    showCloseBtn: true,
    closeOnBgClick: false
  });   
// попапы

// document.ready
  $(document).ready(function(){    
    $('.for_numbers').hide();
    $('.for_dogens').hide();
    $('.for_rows').hide();
    $('.for_big_small').hide();
    $('.for_even_odd').hide();
    $('.for_red_black').hide();
    $('.final_bet').hide();    
    // var to = dappAddress;
    // var value = 0;
    // var callFunction = '___';      
    // var args = [];    
    // var callArgs = JSON.stringify(args);    
    // nebPay.simulateCall(to, value, callFunction, callArgs, { 
    //   listener: c              
    // });            
  })    
// document.ready  


// рулетка
  var rotationsTime = 8;
  var wheelSpinTime = 6;
  var ballSpinTime = 5;
  var numorder = [
    0,
    32,
    15,
    19,
    4,
    21,
    2,
    25,
    17,
    34,
    6,
    27,
    13,
    36,
    11,
    30,
    8,
    23,
    10,
    5,
    24,
    16,
    33,
    1,
    20,
    14,
    31,
    9,
    22,
    18,
    29,
    7,
    28,
    12,
    35,
    3,
    26
  ];
  var numred = [
    32,
    19,
    21,
    25,
    34,
    27,
    36,
    30,
    23,
    5,
    16,
    1,
    14,
    9,
    18,
    7,
    12,
    3
  ];
  var numblack = [
    15,
    4,
    2,
    17,
    6,
    13,
    11,
    8,
    10,
    24,
    33,
    20,
    31,
    22,
    29,
    28,
    35,
    26
  ];
  var numgreen = [0];
  var numbg = $(".pieContainer");
  var ballbg = $(".ball");
  var btnSpin = $("#btnSpin");
  var toppart = $("#toppart");
  var pfx = $.keyframe.getVendorPrefix();
  var transform = pfx + "transform";
  var rinner = $("#rcircle");
  var numberLoc = [];
  $.keyframe.debug = true;

  createWheel();
  function createWheel() {
    var temparc = 360 / numorder.length;
    for (var i = 0; i < numorder.length; i++) {
      numberLoc[numorder[i]] = [];
      numberLoc[numorder[i]][0] = i * temparc;
      numberLoc[numorder[i]][1] = i * temparc + temparc;

      newSlice = document.createElement("div");
      $(newSlice).addClass("hold");
      newHold = document.createElement("div");
      $(newHold).addClass("pie");
      newNumber = document.createElement("div");
      $(newNumber).addClass("num");

      newNumber.innerHTML = numorder[i];
      $(newSlice).attr("id", "rSlice" + i);
      $(newSlice).css(
        "transform",
        "rotate(" + numberLoc[numorder[i]][0] + "deg)"
      );

      $(newHold).css("transform", "rotate(9.73deg)");
      $(newHold).css("-webkit-transform", "rotate(9.73deg)");

      if ($.inArray(numorder[i], numgreen) > -1) {
        $(newHold).addClass("greenbg");
      } else if ($.inArray(numorder[i], numred) > -1) {
        $(newHold).addClass("redbg");
      } else if ($.inArray(numorder[i], numblack) > -1) {
        $(newHold).addClass("greybg");
      }

      $(newNumber).appendTo(newSlice);
      $(newHold).appendTo(newSlice);
      $(newSlice).appendTo(rinner);
    }
    //console.log(numberLoc);
  }

  btnSpin.click(function() {
    if ($("input").val() == "") {
      var rndNum = Math.floor(Math.random() * 34 + 0);
    } else {
      var rndNum = $("input").val();
    }

    winningNum = rndNum;
    spinTo(winningNum);
  });

  $("#btnb").click(function() {
    $(".spinner").css("font-size", "+=.3em");
  });
  $("#btns").click(function() {
    $(".spinner").css("font-size", "-=.3em");
  });

  function resetAni() {
    animationPlayState = "animation-play-state";
    playStateRunning = "running";

    $(ballbg)
      .css(pfx + animationPlayState, playStateRunning)
      .css(pfx + "animation", "none");

    $(numbg)
      .css(pfx + animationPlayState, playStateRunning)
      .css(pfx + "animation", "none");
    $(toppart)
      .css(pfx + animationPlayState, playStateRunning)
      .css(pfx + "animation", "none");

    $("#rotate2").html("");
    $("#rotate").html("");
  }

  function spinTo(num) {
    //get location
    var temp = numberLoc[num][0] + 4;

    //randomize
    var rndSpace = Math.floor(Math.random() * 360 + 1);

    resetAni();
    setTimeout(function() {
      bgrotateTo(rndSpace);
      ballrotateTo(rndSpace + temp);
    }, 500);
  }

  function ballrotateTo(deg) {
    var temptime = rotationsTime + 's';
    var dest = -360 * ballSpinTime - (360 - deg);
    $.keyframe.define({
      name: "rotate2",
      from: {
        transform: "rotate(0deg)"
      },
      to: {
        transform: "rotate(" + dest + "deg)"
      }
    });

    $(ballbg).playKeyframe({
      name: "rotate2", // name of the keyframe you want to bind to the selected element
      duration: temptime, // [optional, default: 0, in ms] how long you want it to last in milliseconds
      timingFunction: "ease-in-out", // [optional, default: ease] specifies the speed curve of the animation
      complete: function() {
        finishSpin();
      } //[optional]  Function fired after the animation is complete. If repeat is infinite, the function will be fired every time the animation is restarted.
    });
  }

  function bgrotateTo(deg) {
    var dest = 360 * wheelSpinTime + deg;
    var temptime = (rotationsTime * 1000 - 1000) / 1000 + 's';

    $.keyframe.define({
      name: "rotate",
      from: {
        transform: "rotate(0deg)"
      },
      to: {
        transform: "rotate(" + dest + "deg)"
      }
    });

    $(numbg).playKeyframe({
      name: "rotate", // name of the keyframe you want to bind to the selected element
      duration: temptime, // [optional, default: 0, in ms] how long you want it to last in milliseconds
      timingFunction: "ease-in-out", // [optional, default: ease] specifies the speed curve of the animation
      complete: function() {} //[optional]  Function fired after the animation is complete. If repeat is infinite, the function will be fired every time the animation is restarted.
    });

    $(toppart).playKeyframe({
      name: "rotate", // name of the keyframe you want to bind to the selected element
      duration: temptime, // [optional, default: 0, in ms] how long you want it to last in milliseconds
      timingFunction: "ease-in-out", // [optional, default: ease] specifies the speed curve of the animation
      complete: function() {} //[optional]  Function fired after the animation is complete. If repeat is infinite, the function will be fired every time the animation is restarted.
    });
  }
// рулетка


$('.numbers button').click(function(){    
  if($(this).hasClass('active')){        
    $(this).removeClass('active');

    var i = 0;
    $(".numbers button").each(function(index, value) {       
        if ($(this).hasClass('active')) {
          i++;
        };
    });
    if ( i == 0) {
      $('.for_numbers').hide();      
    };

    return true;
  };  
  $(this).addClass('active');

  var i = 0;
  $(".numbers button").each(function(index, value) {       
      if ($(this).hasClass('active')) {
        i++;
      };
  });
  
  if (i == 1) {
    $('.for_numbers').show();
  }; 
})

$('.btns_12s button').click(function(){  
  if($(this).hasClass('active')){        
    $(this).removeClass('active');

    var i = 0;
    $(".btns_12s button").each(function(index, value) {       
        if ($(this).hasClass('active')) {
          i++;
        };
    });
    if ( i == 0) {
      $('.for_dogens').hide();
    };

    return true;
  };  
  $(this).addClass('active');

  var i = 0;
    $(".btns_12s button").each(function(index, value) {       
        if ($(this).hasClass('active')) {
          i++;
        };
    });
    if ( i == 1) {
      $('.for_dogens').show();
    };
})

$('.rows button').click(function(){  
  if($(this).hasClass('active')){        
    $(this).removeClass('active');

    var i = 0;
    $(".rows button").each(function(index, value) {       
        if ($(this).hasClass('active')) {
          i++;
        };
    });
    if ( i == 0) {
      $('.for_rows').hide();
    };

    return true;
  };  
  $(this).addClass('active');

  var i = 0;
    $(".rows button").each(function(index, value) {       
        if ($(this).hasClass('active')) {
          i++;
        };
    });
    if ( i == 1) {
      $('.for_rows').show();
    };
})

$('.red_black button').click(function(){  
  if($(this).hasClass('active')){        
    $(this).removeClass('active');

    var i = 0;
    $(".red_black button").each(function(index, value) {       
        if ($(this).hasClass('active')) {
          i++;
        };
    });
    if ( i == 0) {
      $('.for_red_black').hide();
    };

    return true;
  };  
  $(this).addClass('active');

    var i = 0;
    $(".red_black button").each(function(index, value) {       
        if ($(this).hasClass('active')) {
          i++;
        };
    });
    if ( i == 1) {
      $('.for_red_black').show();
    };
})

$('.big_small button').click(function(){  
  if($(this).hasClass('active')){        
    $(this).removeClass('active');

    var i = 0;
    $(".big_small button").each(function(index, value) {       
        if ($(this).hasClass('active')) {
          i++;
        };
    });
    if ( i == 0) {
      $('.for_big_small').hide();
    };

    return true;
  };  
  $(this).addClass('active');

   var i = 0;
    $(".big_small button").each(function(index, value) {       
        if ($(this).hasClass('active')) {
          i++;
        };
    });
    if ( i == 1) {
      $('.for_big_small').show();
    };
})

$('.even_odd button').click(function(){  
  if($(this).hasClass('active')){        
    $(this).removeClass('active');

    var i = 0;
    $(".even_odd button").each(function(index, value) {       
        if ($(this).hasClass('active')) {
          i++;
        };
    });
    if ( i == 0) {
      $('.for_even_odd').hide();
    };

    return true;
  };  
  $(this).addClass('active');

  var i = 0;
    $(".even_odd button").each(function(index, value) {       
        if ($(this).hasClass('active')) {
          i++;
        };
    });
    if ( i == 1) {
      $('.for_even_odd').show();
    };
})

$('.table button').click(function(){
  var i = 0;
  $('.table button').each(function(index, value) {       
      if ($(this).hasClass('active')) {
        i++;          
      }
  });

  if (i == 1) {    
    $('.final_bet').show();
  } else if ( i == 0 ){    
    $('.final_bet').hide();
  }
})

$('.final_bet').click(function(){
  
})
// [{"color" : {"value": "red","betValue" : 0.0000000000000001} , "mod": {"value" : "odd","betValue" : 0.0000000000000001}, "moreless": {"value" : "less","betValue" : 0.0000000000000001},"columns" : {"value" : 1,"betValue" : 0.0000000000000001}, "dozens": {"value" : 2,"betValue" : 0.0000000000000001},"one" : [{"value": 1,"betValue" : 0 },{"value": 2,"betValue" : 0 },{"value": 3,"betValue" : 0},{"value": 4,"betValue" : 0 },{"value": 5,"betValue" : 0 },{"value": 6,"betValue" : 0 },{"value":7,"betValue" : 0.0000000000000001 },{"value": 8,"betValue" : 0.0000000000000001}], "two": [{"value1": 1,"value2":2,"betValue" : 0 },{"value1": 3,"value2":4,"betValue" : 0 },{"value1": 5,"value2":6,"betValue" : 0 },{"value1": 7,"value2":8,"betValue" : 0 },{"value1": 9,"value2":10,"betValue" : 0 },{"value1": 11,"value2":12,"betValue" : 0 },{"value1": 13,"value2":14,"betValue" : 0},{"value1": 15,"value2":16,"betValue" : 0.0000000000000001}]}]