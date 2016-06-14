app.controller('DoctorPrescriptionController', function ($scope, $http, $cookies, $routeParams, $location, $mdDialog) {
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

	$scope.searchMedicines = function(search) {
		return $http.get(API_URL + 'medicines/search/' + search, config).then(function(result) {
			return result.data;
		})
	}

	$scope.searchDiseases = function(search) {
		return $http.get(API_URL + 'diseases/' + search, config).then(function(result) {
			return result.data;
		})
	}

	$scope.addMedicine = function () {
		$scope.prescription.medicines.push(angular.copy($scope.medicineOrigin));
	};

	$scope.removeMedicine = function (index) {
		$scope.prescription.medicines.splice(index, 1);
	};

	$scope.save = function () {
		for (var i = 0; i < $scope.prescription.medicines.length; i++) {
			$scope.prescription.medicines[i].name = $scope.prescription.medicines[i].name.nome;
		};

		$http.post(API_URL + 'patients/' + $routeParams.id + '/prescriptions', $scope.prescription, config).then(function (success) {
			console.log(success);
			$location.path('/');
			$mdDialog.show(
				$mdDialog.alert()
					.parent(angular.element(document.querySelector('#main')))
					.clickOutsideToClose(true)
					.title('Prescrição adicionada.')
					.textContent('Prescrição adicionada com sucesso.')
					.ariaLabel('Prescrição adicionada')
					.ok('Ok!')
			);
		}, function (error) {
			console.log(error);
		})	
	};
});