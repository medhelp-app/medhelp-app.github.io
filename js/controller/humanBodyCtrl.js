app.controller("HumanBodyCtrl", function($scope, $http, $location, $cookies, $mdDialog, $mdMedia, $routeParams) {
	var config = {
		headers:  {
			'x-access-token': $cookies.get('token')
		}
	};

	var id = $routeParams.id ? $routeParams.id : $cookies.get('user');
	var edit = $routeParams.id ? true : false;

	$scope.parts = [];
	function load () {
		$scope.parts = [];

		$http.get(API_URL + 'patients/' + id + '/bodyparts', config).then(function (data) {
			for (var i = 0; i < data.data.length; i++) {
				data.data[i].problems.sort(function(a, b) {
					var x = a.severity == "High" ? 2 : (a.severity == "Medium" ? 1 : 0);
					var y = b.severity == "High" ? 2 : (b.severity == "Medium" ? 1 : 0);
					return x - y;
				});

				for (var j = 0; j < data.data[i].problems.length; j++) {
					if (!data.data[i].problems[j].resolved) {
						if (data.data[i].problems[j].severity == "Medium") {
							$scope.parts.push(data.data[i].part + "-yellow");
						} else if (data.data[i].problems[j].severity == "High") {
							$scope.parts.push(data.data[i].part + "-red");
						} else {
							$scope.parts.push(data.data[i].part + "-gray");
						}
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
					$scope.edit = edit;

					$scope.openEdit = function (item) {
						item.part = name;
						$mdDialog.hide(item);
					};

					$scope.cancel = function () {
						$mdDialog.cancel();
					};
				},
				templateUrl: '../views/dialog_view_human_body.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose:true,
				fullscreen: useFullScreen
			}).then(function (item) {
				if (item) {
					$scope.openAdd(null, item);
				}
			});
	};

	$scope.openAdd = function(ev, item) {
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

					if (item)
						item.occurredDate = new Date(item.occurredDate);
					
					var edit = item ? true : false;
					$scope.edit = edit;

					$scope.add = item ? item : {
						part: 'head',
						severity: 'Low',
						problem: '',
						description: '',
						occurredDate: ''
					};

					$scope.save = function () {
						console.log($scope.add);

						if (!edit) {
							$http.post(API_URL + 'patients/' + id + '/bodyparts', $scope.add, config).then(function (data) {
								console.log(data);

								load();

								$mdDialog.hide();
							}, function (error) {
								console.log(error);
							});
						} else {
							$http.put(API_URL + 'patients/' + id + '/bodyparts/' + $scope.add._id, $scope.add, config).then(function (data) {
								console.log(data);

								load();

								$mdDialog.hide();
							}, function (error) {
								console.log(error);
							});
						}

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