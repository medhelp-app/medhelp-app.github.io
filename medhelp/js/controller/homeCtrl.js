app.controller("HomeCtrl", function($scope, $http, $sessionStorage){
	$('.slider').slider({full_width: true,indicators: false});
	$(".button-collapse").sideNav();
});