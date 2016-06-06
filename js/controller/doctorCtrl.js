app.controller("DoctorCtrl", function($scope, $http, $cookies, $routeParams, $mdDialog, $mdMedia) {
	var config = {
		headers:  {
			'x-access-token': $cookies.get('token')
		}
	};

	$http.get(API_URL + 'doctors/' + $routeParams.id, config).then(function (data) {
		$scope.doctor = data.data;
		console.log(data);
	}, function (error) {
		console.log(error);
	})

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
			console.log(total);
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
				templateUrl: '../views/dialog_add_opinion.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose: true,
				fullscreen: $mdMedia('md')
			});
	};
});