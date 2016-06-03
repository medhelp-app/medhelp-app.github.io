app.controller("DoctorCtrl", function($scope, $http, $cookies, $routeParams) {
	var config = {
		headers:  {
			'x-access-token': $cookies.get('token')
		}
	};

	$http.get(API_URL + 'doctors/' + $routeParams.id, config).then(function (data) {
		$scope.doctor = data.data;
		console.log(data);
	}, function (error) {
		console.log(error);
	})
});