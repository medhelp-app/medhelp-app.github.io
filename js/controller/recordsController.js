app.controller('RecordsController', function ($scope, $http, $cookies, $routeParams, $location, $mdDialog) {
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
	});

	$scope.save = function (record) {
		record.patientId = $routeParams.id;
		record.doctorId = $cookies.get('user');

		$http.post(API_URL + 'records/' + record.patientId, record, config).then(function (data) {
			$location.path('/historico/' + record.patientId);
		}, function (error) {
			console.log(error);
		})
	}
});