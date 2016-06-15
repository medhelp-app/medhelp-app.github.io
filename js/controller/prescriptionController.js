app.controller('PrescriptionController', function ($scope, $http, $cookies, $routeParams, $location, $mdDialog) {
	var config = {
		headers:  {
			'x-access-token': $cookies.get('token')
		}
	};

	$http.get(API_URL + 'patients/' + $cookies.get('user') + '/prescriptions', config).then(function (data) {
		$scope.prescriptions = data.data;
		console.log(data);
	}, function (error) {
		console.log(error);
	});
});