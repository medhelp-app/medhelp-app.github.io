app.controller("HumanBodyCtrl", function($scope, $http, $location, $cookies, $mdDialog, $mdMedia) {
	var config = {
		headers:  {
			'x-access-token': $cookies.get('token')
		}
	};

	$scope.parts = [];
	function load () {
		$http.get(API_URL + 'patients/' + $cookies.get('user') + '/bodyparts', config).then(function (data) {
			for (var i = 0; i < data.data.length; i++) {
				for (var j = 0; j < data.data[i].problems.length; j++) {
					if (data.data[i].problems[j].severity == "Medium") {
						$scope.parts.push(data.data[i].part + "-yellow");
					} else if (data.data[i].problems[j].severity == "High") {
						$scope.parts.push(data.data[i].part + "-red");
					}
				};
			};

			$scope.problems = data.data;
		}, function (error) {
			console.log(error);
		});
	}

	load();

	$scope.part = function (name, ev) {
		var selectedName = '';

			 if (name == 'head') 		selectedName = 'Cabeça';
		else if (name == 'rightArm') 	selectedName = 'Braço direito';
		else if (name == 'leftArm') 	selectedName = 'Braço esquerdo';
		else if (name == 'chest') 		selectedName = 'Peito';
		else if (name == 'stomach') 	selectedName = 'Estomago';
		else if (name == 'rightLeg') 	selectedName = 'Perna direita';
		else if (name == 'leftLeg') 	selectedName = 'Perna esquerda';

		var problems = [];
		for (var i = 0; i < $scope.problems.length; i++) {
			if ($scope.problems[i].part == name) {
				problems = $scope.problems[i].problems;
				break;
			}
		}

		var useFullScreen = $mdMedia('sm');

		$mdDialog.show({
				controller: function ($scope) {
					$scope.name = selectedName;
					$scope.problems = problems;

					$scope.cancel = function () {
						$mdDialog.cancel();
					};
				},
				templateUrl: '../views/dialog_view_human_body.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose:true,
				fullscreen: useFullScreen
			});
	};

	$scope.openAdd = function(ev) {
		var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

		$mdDialog.show({
				controller: function ($scope) {
					$scope.partsList = [
						{ value: 'head', name: 'Cabeça' },
						{ value: 'chest', name: 'Peito' },
						{ value: 'stomach', name: 'Estomago' },
						{ value: 'leftArm', name: 'Braço esquerdo' },
						{ value: 'rightArm', name: 'Braço direito' },
						{ value: 'leftLeg', name: 'Perna esquerda' },
						{ value: 'rightLeg', name: 'Perna direita' }
					];

					$scope.severities = [
						{ value: 'Low', name: 'Baixa' },
						{ value: 'Medium', name: 'Média' },
						{ value: 'High', name: 'Alta' }
					];

					$scope.add = {
						part: 'head',
						severity: 'Low',
						problem: '',
						description: '',
						occurredDate: ''
					};

					$scope.save = function () {
						console.log($scope.add);

						$http.post(API_URL + 'patients/' + $cookies.get('user') + '/bodyparts', $scope.add, config).then(function (data) {
							console.log(data);

							load();

							$mdDialog.hide();
						}, function (error) {
							console.log(error);
						});

						$scope.add = {
							part: 'head',
							severity: 'Low',
							problem: '',
							description: '',
							occurredDate: ''
						};
					};

					$scope.cancel = function () {
						$scope.add = {
							part: 'head',
							severity: 'Low',
							problem: '',
							description: '',
							occurredDate: ''
						};

						$mdDialog.cancel();
					};
				},
				templateUrl: '../views/dialog_add_human_body.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose:true,
				fullscreen: useFullScreen
			});
	};
});