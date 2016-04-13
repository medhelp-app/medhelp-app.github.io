app.controller("HomeCtrl", function($scope, $http, $sessionStorage){
	$(".button-collapse").sideNav();
	$('.slider').slider({full_width: true,indicators: false});
	
	$scope.login = function(user){
		/*$http({
		    method: "post",
		    url: "http://104.236.112.162/api/users",
		    data: {
		    	name:"Andre Lucas1",
		    	email:"andrelucas02	@hotmail.com",
		    	rePassword: "olegario",
		    	password:"olegario"
		    }
		}).success(function(data){
		  	console.log(data);
		}).error(function(data){
			console.log(data);
		});*/
	}

});