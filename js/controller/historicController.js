app.controller('HistoricController', function ($scope, $http, $cookies, $routeParams, $location, $mdDialog) {
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

	$http.get(API_URL + 'records/patient/' + $routeParams.id, config).then(function (data) {
		$scope.records = data.data;
		console.log(data);
	}, function (error) {
		console.log(error);
	});
});