var app = angular.module("medhelp", ["ngRoute", "ngLoadingSpinner", "ngCookies", "ngMaterial", 'angular-loading-bar']);

window.fbAsyncInit = function() {
    FB.init({
      appId      : '298759077133556',
      xfbml      : true,
      version    : 'v2.6'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));