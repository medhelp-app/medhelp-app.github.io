app.controller('DoctorPrescriptionController', function ($scope, $http, $cookies, $routeParams) {
	var config = {
		headers:  {
			'x-access-token': $cookies.get('token')
		}
	};

	$http.get(API_URL + 'patients/' + $routeParams.id, config).then(function (data) {
		$scope.patient = data.data;
		console.log(data);
	}, function (error) {
		console.log(error);
	})
});