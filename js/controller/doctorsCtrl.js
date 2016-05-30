app.controller("DoctorsCtrl", function($scope, $http, $location, $sessionStorage) {
	var config = {
		headers:  {
			'x-access-token': $sessionStorage.token
		}
	};

	$http.get(API_URL + 'doctors/find/a', config).then(function (data) {
		$scope.doctors = data.data;
		console.log(data);
	}, function (error) {
		console.log(error);
	});

	$scope.openDoctor = function (id) {
		$location.path('/medicos/' + id);
	}
});