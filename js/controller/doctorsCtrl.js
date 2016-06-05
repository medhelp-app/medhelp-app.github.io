app.controller("DoctorsCtrl", function($scope, $http, $location, $cookies) {
	var config = {
		headers:  {
			'x-access-token': $cookies.get('token')
		}
	};

	$scope.search = '';

	$scope.find = function () {
		if ($scope.search.length > 0) {
			$http.get(API_URL + 'doctors/find/' + $scope.search, config).then(function (data) {
				$scope.doctors = data.data;
			}, function (error) {
				console.log(error);
			});
		}
	}

	$scope.openDoctor = function (id) {
		$location.path('/medicos/' + id);
	}
});