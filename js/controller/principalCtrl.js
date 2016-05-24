app.controller("PrincipalCtrl", function($scope, $http, $sessionStorage, $location){
	//if(!$sessionStorage.login) location.href="/";
	$(".button-collapse").sideNav();

	$scope.user = $sessionStorage.user;
});