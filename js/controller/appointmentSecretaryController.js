app.controller('AppointmentSecretaryController', function ($scope, $http, $cookies, $mdDialog, $location) {
	var config = {
		headers:  {
			'x-access-token': $cookies.get('token')
		}
	};

	function load() {
		$http.get(API_URL + 'secretariats/' + $cookies.get('user'), config).then(function (data) {
			$http.get(API_URL + 'secretariats/' + data.data.secretary.doctorId + '/appointments', config).then(function (data) {
				$scope.appointments = data.data;
			}, function (error) {
				console.log(error);
			});
		}, function (error) {
			console.log(error);
		})
	}
	load();

	$scope.accept = function (appointment) {
		$http.get(API_URL + 'secretariats/' + appointment._id + '/appointments/accept', config).then(function (data) {
			load();
		}, function (error) {
			console.log(error);
		})
	}

	$scope.reject = function (appointment) {
		$http.delete(API_URL + 'secretariats/' + appointment._id + '/appointments', config).then(function (data) {
			load();
		}, function (error) {
			console.log(error);
		})
	}

	$scope.openUser = function (id) {
		$location.path('/usuario/' + id);
	}
})