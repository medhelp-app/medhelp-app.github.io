app.controller("DoctorCtrl", function($scope, $http, $cookies, $routeParams, $mdDialog, $mdMedia) {
	var config = {
		headers:  {
			'x-access-token': $cookies.get('token')
		}
	};

	$scope.follow = function (doctor) {
		var f = {
			idPatient: $cookies.get('user'),
			idDoctor: doctor._id,
			date: new Date()
		};

		$http.post(API_URL + 'users/follow', f, config).then(function (data) {
			console.log(data);
		}, function (error) {
			console.log(error);
		})
	}

	$http.get(API_URL + 'doctors/' + $routeParams.id, config).then(function (data) {
		$scope.doctor = data.data;
	}, function (error) {
		console.log(error);
	});

	$http.get(API_URL + 'doctors/' + $routeParams.id + '/healthInsurance', config).then(function (data) {
		$scope.healthInsurance = data.data;
	}, function (error) {
		console.log(error);
	});

	function load () {
		$http.get(API_URL + 'doctors/' + $routeParams.id + '/opinions', config).then(function (data) {
			var stars = [];
			var total = {
				attention: 0,
				installation: 0,
				punctuality: 0,
				general: 0
			};

			for (var i = 0; i < data.data.length; i++) {
				var star = {
					attention: data.data[i].attentionRating,
					installation: data.data[i].installationRating,
					punctuality: data.data[i].punctualityRating,
				};

				var attention = generateStarArray(star.attention);
				var installation = generateStarArray(star.installation);
				var punctuality = generateStarArray(star.punctuality);

				data.data[i].stars = {
					attention: attention,
					installation: installation,
					punctuality: punctuality
				};

				total.attention += star.attention;
				total.installation += star.installation;
				total.punctuality += star.punctuality;
			};

			total.attention /= data.data.length;
			total.installation /= data.data.length;
			total.punctuality /= data.data.length;

			total.general = (total.attention + total.installation + total.punctuality) / 3;

			total.attention = generateStarArray(total.attention);
			total.installation = generateStarArray(total.installation);
			total.punctuality = generateStarArray(total.punctuality);
			total.general = generateStarArray(total.general);

			$scope.total = total;
			$scope.opinions = data.data;
		}, function (error) {
			console.log(error);
		});
	}
	load();

	function generateStarArray (value) {
		var array = [];

		for (var j = 0; j < 5; j++) {
			if (j < parseInt(value)) {
				array.push("star")
			} else {
				if (j == parseInt(value) && value % 1 !== 0) {
					array.push("star_half")
				} else {
					array.push("star_border")
				}
			}
		};

		return array;
	}

	$scope.openOpinion = function (ev) {
		$mdDialog.show({
				controller: function ($scope) {
					$scope.add = {
						punctualityRating: 0,
						attentionRating: 0,
						installationRating: 0,
						generalRating: 0,
						comment: ''
					};

					$scope.save = function () {
						$scope.add.generalRating = ($scope.add.punctualityRating + $scope.add.attentionRating + $scope.add.installationRating) / 3;

						$http.post(API_URL + 'doctors/' + $routeParams.id + '/opinions', $scope.add, config).then(function (data) {
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
				templateUrl: '../views/dialog_add_opinion.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose: true,
				fullscreen: $mdMedia('md')
			});
	};

	$scope.availability = [];
	$http.get(API_URL + 'doctors/' + $routeParams.id + '/availability', config).then(function (data) {
		$scope.availability = data.data;
	}, function (error) {
		console.log(error);
	});

	$scope.appointment = function (ev) {
		var availability = $scope.availability;
		
		$mdDialog.show({
				controller: function ($scope) {
					$scope.add = {
						date: null,
						availabilityId: 0,
						patientId: $cookies.get('user'),
						doctorId: $routeParams.id
					};

					var days = {
						'sunday': 0, 'monday' : 1, 'tuesday': 2, 'wednesday': 3, 
						'thursday': 4, 'friday': 5, 'saturday': 6
					};

					var doctorDays = [];

					for (var i = 0; i < availability.length; i++) {
						doctorDays[days[availability[i].weekday]] = true;
					}

					$scope.minDate = new Date();
					$scope.appointments = function (date) {
						var day = date.getDay();

						var r = false;
						for (var i = 0; i < doctorDays.length; i++) {
							if (doctorDays[i] == day)
								r = true;
						}

    					return r; // day === 1 || day === 2;
					}

					$scope.hours = [];
					$scope.selectDate = function () {
						var d = new Date($scope.add.date);
						var day = d.getDay();

						for (var i = 0; i < availability.length; i++) {
							console.log(day, days[availability[i].weekday], $scope.add.date);
							if (day == days[availability[i].weekday]) 
								$scope.hours.push(availability[i]);
						}
					}

					$scope.availability = availability;

					$scope.save = function () {
						$http.post(API_URL + 'doctors/' + $routeParams.id + '/appointments', $scope.add, config).then(function (data) {
							console.log(data);

							$mdDialog.show(
								$mdDialog.alert()
									.parent(angular.element(document.querySelector('#main')))
									.clickOutsideToClose(true)
									.title('Consulta marcada.')
									.textContent('Consulta marcada com sucesso.')
									.ariaLabel('Consulta marcada')
									.ok('Ok!')
									.targetEvent(ev)
							);

							$mdDialog.hide();
						}, function (error) {
							console.log(error);
						});
					};

					$scope.cancel = function () {
						$mdDialog.cancel();
					};
				},
				templateUrl: '../views/dialog_add_appointment.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose: true
			});
	}
});