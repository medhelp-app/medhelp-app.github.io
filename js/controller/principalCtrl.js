app.controller("PrincipalCtrl", function($scope, $http, $cookies, $location, $routeParams) {
	$scope.prescription = function () {
		$location.path('/medicos/prescrever/' + $scope.user._id);
	}	

	var config = {
		headers: {
			'x-access-token': $cookies.get('token')
		}
	};

	$scope.type = $cookies.get('type');

	if ($routeParams.id) {
		$http.get(API_URL + 'users/' + $routeParams.id, config).then(function (data) {
			load(data.data.userType);
		}, function (error) {
			console.log(error);
		})

		var url = '';
		
		function load (type) {
			if (type == 0)
				url = API_URL + 'patients/' + $routeParams.id;
			else
				url = API_URL + 'doctors/' + $routeParams.id;

			$http.get(url, config).then(function (data) {
				delete data.data.password;

				$scope.user = data.data;
				console.log($scope.user);
			}, function (error) {
				console.log(error);
			})
		}
	}
});