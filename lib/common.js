var HttpRequest = require("nebulas").HttpRequest;
var Neb = require("nebulas").Neb;
var Account = require("nebulas").Account;
var Transaction = require("nebulas").Transaction;
var Unit = require("nebulas").Unit;
var neb = new Neb();
neb.setRequest(new HttpRequest("https://mainnet.nebulas.io"));

var NebPay = require("nebpay");   
var nebPay = new NebPay();
var dappAddress = "n1xFRwcGY4dmiNeoDM1uEVMBR1QuCbUGqeA";

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
    $('.result').hide();                
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
    if ($("#numwin").val() == "") {
      var rndNum = Math.floor(Math.random() * 34 + 0);
    } else {
      var rndNum = $("#numwin").val();
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
  var numbers = [];
  var dozens = [];
  var columns = [];
  var red_black = [];
  var big_small = [];
  var even_odd = [];
  var final_object = {};
  var final_value = 0;

  // number
    $(".numbers button").each(function(index, value) {       
      if ($(this).hasClass('active')) {        
        var to_push = {
          value: $(this).attr('data-id'),
          betValue: $('.numbers_bet').val(),
        };
        numbers.push(to_push);
      };    
    });

    if (numbers.length == 0) {
    } else {
      $.each(numbers,function(index,value){
        final_object['one'] = numbers;
      })
      var val = parseFloat($('.numbers_bet').val());
      final_value = val + final_value;      
    }  
  // number

  // dozenz
    $(".btns_12s button").each(function(index, value) {       
      if ($(this).hasClass('active')) {        
        var to_push = {
          value: $(this).attr('data-id'),
          betValue: $('.dozens_bet').val(),
        };
        dozens.push(to_push);
      };    
    });

    if (dozens.length == 0) {
    } else {
      $.each(dozens,function(index,value){
        final_object['dozens'] = dozens;
      })      
      var val = parseFloat($('.dozens_bet').val());
      final_value = val + final_value;
    }  
  // dozenz

  // columns 
    $(".rows button").each(function(index, value) {       
      if ($(this).hasClass('active')) {        
        var to_push = {
          value: $(this).attr('data-id'),
          betValue: $('.rows_val').val(),
        };
        columns.push(to_push);
      };    
    });

    if (columns.length == 0) {
    } else {
      $.each(columns,function(index,value){
        final_object['columns'] = columns;        
      })      
      var val = parseFloat($('.rows_val').val());
      final_value = val + final_value;
    }  
  // columns

  // red_black
    $(".red_black button").each(function(index, value) {       
      if ($(this).hasClass('active')) {        
        var to_push = {
          value: $(this).attr('data-id'),
          betValue: $('.red_black_val').val(),
        };
        red_black.push(to_push);
      };    
    });

    if (red_black.length == 0) {
    } else {
      $.each(red_black,function(index,value){
        final_object['color'] = red_black;
        var val = parseFloat($('.red_black_val').val());
        final_value = val + final_value;
      })      
    }  
  // red_black

  // big_small
   $(".big_small button").each(function(index, value) {       
      if ($(this).hasClass('active')) {        
        var to_push = {
          value: $(this).attr('data-id'),
          betValue: $('.big_small_val').val(),
        };
        big_small.push(to_push);
      };    
    });

    if (big_small.length == 0) {
    } else {
      $.each(big_small,function(index,value){
        final_object['moreless'] = big_small;
      })      
      var val = parseFloat($('.big_small_val').val());
      final_value = val + final_value;
    }  
  // big_small

  // even_odd
    $(".even_odd button").each(function(index, value) {       
      if ($(this).hasClass('active')) {        
        var to_push = {
          value: $(this).attr('data-id'),
          betValue: $('.even_odd_val').val(),
        };
        even_odd.push(to_push);
      };    
    });

    if (even_odd.length == 0) {
    } else {
      $.each(even_odd,function(index,value){
        final_object['mod'] = even_odd;
      })      
      var val = parseFloat($('.even_odd_val').val());
      final_value = val + final_value;
    } 
  // even_odd

  var to = dappAddress;
  var value = final_value;
  var callFunction = 'play';      
  var args = [];    
  args.push(final_object);
  var callArgs = JSON.stringify(args);    
  nebPay.call(to, value, callFunction, callArgs, { 
    listener: cbTransaction             
  });  


})

function cbTransaction(resp) {
  
  hash_value = resp.txhash;       
    if (resp.txhash == undefined) {
     } else {
      $('.transaction').trigger('click');
      $('.hash').html('txHash: <p>' + hash_value + '</p>');           
    } 

    var reload_trans = setInterval(function(){
      neb.api.getTransactionReceipt({hash: hash_value}).then(function(receipt) {        
        result_trans = receipt.status;        
      if (result_trans == 1) {
        $('#transaction .status_trans').html('<p style="color: green"> sucess </p>');                                  
        setTimeout(function(){ $('#transaction button').trigger('click') } , 500);                                            

        neb.api.getEventsByHash({hash: hash_value}).then(function(events) {
          console.log('events' + JSON.stringify(events));
          console.log('events typeof ' + typeof(events));                
          var data = events.events[1].data;
          data = JSON.parse(data);          
          var result = data.rand;
          var money = data['topay: '];
          console.log('result ' + result);
          console.log('result typeof ' + typeof(result));
          console.log('money ' + money);
          console.log('money typeof ' + typeof(money));          
          $('#numwin').val(result);
          $('#btnSpin').trigger('click');
          setTimeout(function(){
            $('.result').html('<h1>You win: '+ money +' </h1>');
            $('.result').show();
          },10000)          
        });         
          clearInterval(reload_trans);          
      } else if (result_trans == 2) {
        $('#transaction .status_trans').html('<p style="color: #ff6000"> pending </p>');
      } else {
        $('#transaction .status_trans').html('<p style="color: red"> fail </p>');                        
        setTimeout(function(){ $('#transaction button').trigger('click') } , 1500);          
        clearInterval(reload_trans);                  
      }
    })}, 1000);  
}
