/*!
 * Start Bootstrap - ucb Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

(function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    })

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Fit Text Plugin for Main Header
    $("h1").fitText(
        1.2, {
            minFontSize: '35px',
            maxFontSize: '65px'
        }
    );

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

    $('.modal').on('hidden.bs.modal', function(event){
        setTimeout(function(){
          $('[data-toggle="modal"]').blur();
        });
     });

    if ( ($(window).height() + 100) < $(document).height() ) {
    $('#top-link-block').removeClass('hidden').affix({
        // how far to scroll down before link "slides" into view
        offset: {top:100}
    });
    }

    function getrespmsg (data) {
      if(data["responseText"]){
        var resp = JSON.parse(data["responseText"]);
        if (resp["msg"]) {
          $('#respmsg').html(resp["msg"]);
        } else {
          $('#respmsg').html(data["responseText"]);
        }
        $('#respmsg').html(resp["msg"]);
      } else if (data["msg"]) {
        $('#respmsg').html(data["msg"]);
      } else {
        $('#respmsg').html("Request failed: 500 Internal Server Error");
      }
    }

    function onSignUpError(data) {
      $('#processing1').hide();
      $('#processing2').hide();
      alertclassrmall()
      getrespmsg(data)
      $("#alertdiv").addClass("alert-danger");
      $('#alertbox').show();
      setTimeout(removeCE, 3000)
    }

    function onSignUpFail(data) {
      $('#processing1').hide();
      $('#processing2').hide();
      alertclassrmall()
      getrespmsg(data)
      $("#alertdiv").addClass("alert-warning");
      $('#alertbox').show();
      setTimeout(removeCF, 3000)
    }
    function onSignUpSuccess(data) {
      $('#processing1').hide();
      $('#processing2').hide();
      closeModal()
      alertclassrmall()
      getrespmsg(data)
      $("#alertdiv").addClass("alert-success");
      $('#alertbox').show();
      setTimeout(removeCS, 3000)
    }

    function alertclassrmall() {
      $("#alertdiv").removeClass("alert-success");
      $("#alertdiv").removeClass("alert-danger");
      $("#alertdiv").removeClass("alert-warning");
    }

    function closeModal() {
      $('.modal').modal('hide');
      $('.modal').on('hidden.bs.modal', function(event){
            $('input').val('');
       });
    }

    function removeCS(){
      $("#alertbox").fadeOut("slow", function() {
        $(this).removeClass("alert-success");
      });
    }

    function removeCF(){
      $("#alertbox").fadeOut("slow", function() {
        $(this).removeClass("alert-warning");
      });
    }

    function removeCE(){
      $("#alertbox").fadeOut("slow", function() {
        $(this).removeClass("alert-danger");
      });
    // $("#alertdiv").removeClass( "alert-danger" );
    }
    // $('input[type=number]').on('focus', function (e) {
    //   $(this).on('mousewheel.disableScroll', function (e) {
    //     e.preventDefault();
    //     var scrollTo = (e.originalEvent.wheelDelta*-1) + $(document.documentElement).scrollTop();
    //     $(document.documentElement).scrollTop(scrollTo);
    //   })
    // }).on('blur', function (e) {
    //   $(this).off('mousewheel.disableScroll')
    // });

    $(function() {
        $('form').on('keydown', '.number', function(e){-1!==$.inArray(e.keyCode,[46,8,9,27,13,110,190])||/65|67|86|88/.test(e.keyCode)&&(!0===e.ctrlKey||!0===e.metaKey)||35<=e.keyCode&&40>=e.keyCode||(e.shiftKey||48>e.keyCode||57<e.keyCode)&&(96>e.keyCode||105<e.keyCode)&&e.preventDefault()});
    })


    $( "form:first" ).submit(function( event ) {
        // var check=document.getElementById('form-agree1').checked;
        // if(!check) {
        //   alert('Please accept terms & conditions to continue.');
        //   return false;
        // }
        var full_name=document.getElementById("form-full-name1").value;
        var company_name=document.getElementById("form-company-name1").value;
        // var occupation=document.getElementById("form-occupation1").value;
        // var customer_base=document.getElementById("form-customer-base1").value;
        var occupation="occupation";
        var customer_base="1";
        var emailid=document.getElementById("form-email1").value;
        var contact=document.getElementById("form-contact-number1").value;
        var area=document.getElementById("form-area1").value;
        var city=document.getElementById("form-city1").value;
        var pincode=document.getElementById("form-pincode1").value;
        event.preventDefault();
        $('#processing1').show();
        $.ajax({
            url:"http://{REG_API_IP}:{REG_API_PORT}/api/operator/signup/",
            type: 'post',
            dataType: 'json',
            cache: false,
            timeout: 3000,
            data: {'full_name':full_name,'company_name':company_name,'occupation':occupation,'customer_base':customer_base,'emailid':emailid,'contact':contact,'area':area,'city':city,'pincode':pincode},
            success: onSignUpSuccess,
            error: onSignUpError,
            fail: onSignUpFail,
        });
    });

    $( "form:last" ).submit(function( event ) {
        // var check=true;//document.getElementById('form-agree2').checked;
        // if(!check) {
        //   alert('Please accept terms & conditions to continue.');
        //   return false;
        // }
        var fname=document.getElementById("form-first-name2").value;
        var lname=document.getElementById("form-last-name2").value;
        var emailid=document.getElementById("form-email2").value;
        var contact=document.getElementById("form-contact-number2").value;
        var area=document.getElementById("form-area2").value;
        var city=document.getElementById("form-city2").value;
        var pincode=document.getElementById("form-pincode2").value;
        event.preventDefault();
        $('#processing2').show();
        $.ajax({
            url:"http://{REG_API_IP}:{REG_API_PORT}/api/user/signup/",
            headers: {
                // 'apikey':'0123456789'
            },
            type: 'post',
            dataType: 'json',
            cache: false,
            timeout: 3000,
            data: {'fname':fname,'lname':lname,'emailid':emailid,'contact':contact,'area':area,'city':city,'pincode':pincode},
            success: onSignUpSuccess,
            error: onSignUpError,
            fail: onSignUpFail,
        });
    });

    $(document).ready(function() {
      $(document).on('focus', ':input', function() {
        $(this).attr('autocomplete', 'off');
      });
    });

    // Initialize WOW.js Scrolling Animations
    new WOW().init();

})(jQuery); // End of use strict
