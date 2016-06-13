app.controller('AppointmentController', function ($scope, $http, $cookies, $mdDialog, $location) {
	var config = {
		headers:  {
			'x-access-token': $cookies.get('token')
		}
	};

	$scope.availability = {};

	$scope.weekdaysPTBR = {
		sunday: 'Domingo',
		monday: 'Segunda',
		tuesday: 'Terça',
		wednesday: 'Quarta',
		thursday: 'Quinta',
		friday: 'Sexta',
		saturday: 'Sábado'
	};

	function load() {
		$scope.availability = {};
		$http.get(API_URL + 'doctors/' + $cookies.get('user') + '/availability', config).then(function (data) {
			for (var i = 0; i < data.data.length; i++) {
				if (!$scope.availability[data.data[i].weekday]) {
					$scope.availability[data.data[i].weekday] = {
						weekday: data.data[i].weekday,
						availability: []
					};
				}

				$scope.availability[data.data[i].weekday].availability.push(data.data[i]);
			}

			console.log($scope.availability, data.data);
		}, function (error) {
			console.log(error);
		});

		$http.get(API_URL + 'doctors/' + $cookies.get('user') + '/appointments', config).then(function (data) {
			$scope.appointments = data.data;
		}, function (error) {
			console.log(error);
		});
	}
	load();

	function loadHealthInsurance() {
		$http.get(API_URL + 'doctors/' + $cookies.get('user') + '/healthInsurance', config).then(function (data) {
			$scope.healthInsurance = data.data;
		}, function (error) {
			console.log(error);
		});
	}
	loadHealthInsurance();

	$scope.remove = function (item) {
		$http.delete(API_URL + 'doctors/availability/' + item._id, config).then(function (data) {
			console.log(data);
			load();

			$mdDialog.hide();
		}, function (error) {
			console.log(error);
		});
	};

	$scope.add = function (ev) {
		$mdDialog.show({
				controller: function ($scope) {
					$scope.add = {
						weekday: 'monday',
						startHour: '08:00',
						endHour: '12:00',
					};
					
					$scope.save = function () {
						$http.post(API_URL + 'doctors/' + $cookies.get('user') + '/availability', $scope.add, config).then(function (data) {
							console.log(data);
							load();

							$mdDialog.hide();
						}, function (error) {
							console.log(error);
						});
					};

					$scope.cancel = function () {
						$mdDialog.cancel();
					};
				},
				templateUrl: '../views/dialog_add_availability.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose: true
			});
	}

	$scope.addHealthInsurance = function (ev) {
		var confirm = $mdDialog.prompt()
			.title('Adicionar plano de saúde')
			.textContent('Escreva o nome do plano de saúde que você deseja adicionar.')
			.placeholder('Nome do plano')
			.ariaLabel('Nome do plano')
			.targetEvent(ev)
			.ok('Salvar')
			.cancel('Cancelar');

		$mdDialog.show(confirm).then(function(result) {
			$http.post(API_URL + 'doctors/' + $cookies.get('user') + '/healthInsurance', { healthInsurance: result }, config).then(function (data) {
				console.log(data);
				loadHealthInsurance();
			}, function (error) {
				console.log(error);
			});
		}, function() {
			
		});
	}

	$scope.deleteHealthInsurance = function (healthInsurance) {
		$http.delete(API_URL + 'doctors/' + $cookies.get('user') + '/healthInsurance/' + healthInsurance._id, config).then(function (data) {
			console.log(data);
			loadHealthInsurance();
		}, function (error) {
			console.log(error);
		})
	}

	$scope.openUser = function (id) {
		$location.path('/usuario/' + id);
	}
})