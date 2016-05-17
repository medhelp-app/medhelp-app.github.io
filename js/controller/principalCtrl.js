app.controller("PrincipalCtrl", function($scope, $http, $sessionStorage){
	//if(!$sessionStorage.login) location.href="/";
	$(".button-collapse").sideNav();

	$scope.sair = function(){
		delete $sessionStorage.login;
		delete $sessionStorage.session;
		delete $sessionStorage.id;
		location.href="/";
	}
});