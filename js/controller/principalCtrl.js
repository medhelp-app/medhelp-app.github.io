app.controller("PrincipalCtrl", function($scope, $http, $sessionStorage, $location){
	//if(!$sessionStorage.login) location.href="/";
	$(".button-collapse").sideNav();

	var config = {
		headers:  {
			'x-access-token': TOKEN
		}
	};

	$http.get(API_URL + 'users/' + USER_ID, config).then(function (data) {
		$scope.user = data.data;
		console.log(data);
	}, function (error) {
		console.log(error);
	});
});