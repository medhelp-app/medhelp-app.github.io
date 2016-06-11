app.controller('AppointmentPatientController', function ($scope, $http, $cookies, $mdDialog, $location) {
	var config = {
		headers:  {
			'x-access-token': $cookies.get('token')
		}
	};

	function load() {
		$http.get(API_URL + 'patients/' + $cookies.get('user') + '/appointments', config).then(function (data) {
			$scope.appointments = data.data;
		}, function (error) {
			console.log(error);
		});
	}
	load();

	$scope.openUser = function (id) {
		$location.path('/medicos/' + id);
	}
})