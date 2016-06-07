app.controller('DoctorPrescriptionController', function ($scope, $http, $cookies, $routeParams, $location) {
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

	$scope.medicineOrigin = {
		name: '',
		amount: 0,
		occurence: '',
		description: '',
		note: ''
	};

	$scope.prescription = {
		problem: '',
		doctorId: $cookies.get('user'),
		medicines: []
	};

	$scope.addMedicine = function () {
		$scope.prescription.medicines.push(angular.copy($scope.medicineOrigin));
	};

	$scope.removeMedicine = function (index) {
		$scope.prescription.medicines.splice(index, 1);
	};

	$scope.save = function () {
		$http.post(API_URL + 'patients/' + $routeParams.id + '/prescriptions', $scope.prescription, config).then(function (success) {
			console.log(success);
			$location.path('/');
		}, function (error) {
			console.log(error);
		})	
	};
});