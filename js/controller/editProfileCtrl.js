app.controller("EditProfileCtrl", function($scope, $http, $sessionStorage, $location) {
	console.log($sessionStorage.user);

	var config = {
		headers: {
			'x-access-token': $sessionStorage.token
		}
	};

	$scope.signup = function (user) {
		$http.put(API_URL + 'patients/' + user._id, user, config).then(function (data) {
			if (data.data.message == 'Token inválido') {
				delete $sessionStorage.login;
				delete $sessionStorage.user;
				$location.path('/');
			}
		}, function (error) {
			console.log(error);
		});
	}
});