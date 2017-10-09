$(document).ready(function(){
    $( document ).tooltip();

    //get gitcoin modal
    $("a[href='/get']").click(function(e){
      e.preventDefault();
      var url = $(this).attr('href');
      setTimeout(function(){
        $.get(url, function(newHTML){
            console.log('got' + newHTML);
            $(newHTML).appendTo('body').modal();
        });
      },300);
    });

    $(".navbar-toggler").click(function(){
      $(".navbar-collapse").toggleClass('show')
    });

    //get gitcoin modal
    $("body").delegate('.iama','click', function(){
        document.location.href = $(this).find('a').attr('href');
    });

    //pulse animation on click
    $('.pulseClick').click(function(e){
      var ele = $(this);
      ele.addClass("pulseButton");
      var callback = function(){
        ele.removeClass("pulseButton");
      };
      setTimeout(callback,300);
    });

    $('.faq_item h5').click(function(){
      $(this).parents('.col').find('.answer').toggleClass('hidden');
    });

    //mixpanel integration
    var params = {
      page: document.location.pathname,
    }
    mixpanel.track("Pageview", params);

    var tos = [
      'slack',
      'btctalk',
      'reddit',
      'twitter',
      'fb',
      'medium',
      'github',
      'youtube',
      'extension',
      'get',
      'watch',
      'unwatch',
      'save_search',
      'help/repo',
      'help/dev',
      'help/portal',
      'help/faq',
    ]
    for(var i=0;i<tos.length;i++){
      var to = tos[i]
      var callback = function(e){
        var _params = {
          'to': $(this).attr('href'),
        };
        mixpanel.track("Outbound", _params);
      };
      $('body').delegate("a[href='/"+to+"']",'click', callback);
    }
    $('body').delegate("a[href^='https://github.com/']", 'click', function(e){
        var _params = {
          'to_domain': 'github.com',
          'to': $(this).attr('href'),
        };
        mixpanel.track("Outbound", _params);
      });

    $("#mc-embedded-subscribe").click(function(){
        mixpanel.track("Email Subscribe");
    });

});

$(window).scroll(function(){
    var scrollPos = $(document).scrollTop();
    //console.log(scrollPos);
});