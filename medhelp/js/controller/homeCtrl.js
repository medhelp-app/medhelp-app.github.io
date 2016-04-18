app.controller("HomeCtrl", function($scope, $http, $sessionStorage){
	if($sessionStorage.login) location.href="home";
	$(".button-collapse").sideNav();
	$('.slider').slider({full_width: true,indicators: false});
	$scope.user = {password:"",email:""};
	$scope.errostatus = false;
	$scope.login = function(user){
		if(user.email=="" || user.password==""){
			$scope.errostatus = true;
			$scope.erro = "Algum campo está vazio";
		}
		else{
			$http({
			    method: "post",
			    url: "http://104.236.112.162/api/users/login",
			    data: {
			    	email:user.email,
			    	password: user.password
			    }
			}).success(function(data){
				$scope.errostatus = false;
				$scope.user = {password:"",email:""};
				$sessionStorage.login = true;
				$sessionStorage.id = data.id;
				$sessionStorage.session = data.session;
			  	location.href="home";
			}).error(function(data){
				$scope.errostatus = true;
				$scope.erro = data.error;
				$scope.user.password = "";
			});
		}
	}

});