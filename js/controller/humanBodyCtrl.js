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
				data.data[i].problems.sort(function(a, b){
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
							$scope.parts.push(data.data[i].part+"-"+data.data[i].subpart+ "-gray");
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

			 if (name == 'head-head') 		selectedName = 'Cabeça';
		else if (name == 'head-face') 	selectedName = 'Face';
		else if (name == 'trunk-abdomen') 	selectedName = 'Abdomen';	 
		else if (name == 'trunk-thorax') 	selectedName = 'Torax';
		else if (name == 'trunk-loin') 	selectedName = 'Quadril';
		else if (name == 'left-arm') 		selectedName = 'Braço-Esquerdo';
		else if (name == 'right-arm') 	selectedName = 'Braço-Direito';
		else if (name == 'left-forearm') 	selectedName = 'Antebraço-Esquerdo';
		else if (name == 'right-forearm') 	selectedName = 'Antebraço-Direito';
		else if (name == 'left-hand') 	selectedName = 'Mão-Esquerda';
		else if (name == 'right-hand') 	selectedName = 'Mão-Direita';
		else if (name == 'left-elbow') 	selectedName = 'Junção-Braço-Esquerdo';
		else if (name == 'right-elbow') 	selectedName = 'Junção-Braço-Direito';
		else if (name == 'right-elbow') 	selectedName = 'Junção-Braço-Direito';
		else if (name == 'right-knee') 	selectedName = 'Joelho-Direito';
		else if (name == 'left-knee') 	selectedName = 'Joelho-Esquerdo';
		else if (name == 'left-leg') 	selectedName = 'Perna-Esquerda';
		else if (name == 'righ-leg') 	selectedName = 'Perna-Direita';
		else if (name == 'righ-leg') 	selectedName = 'Perna-Direita';
		else if (name == 'righ-foot') 	selectedName = 'Pé-Direito';
		else if (name == 'left-foot') 	selectedName = 'Pé-Esquerdo';
		else if (name == 'left-thigh') 	selectedName = 'Coxa-Esquerda';
		else if (name == 'right-thigh') 	selectedName = 'Coxa-Direita';



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
						{ value: 'head-head', name: 'Cabeça' },
						{ value: 'head-face', name: 'Face' },
						{ value: 'trunk-loin', name: 'Quadril' },
						{ value: 'trunk-thorax', name: 'Torax' },
						{ value: 'trunk-abdomen', name: 'Abdomen' },
						{ value: 'left-hand', name: 'Braço-Esquerdo' },
						{ value: 'right-hand', name: 'Braço-Direito' },
						{ value: 'right-elbow', name: 'Junção-Braço-Direito' },
						{ value: 'left-elbow', name: 'Junção-Braço-Esquerdo' },
						{ value: 'left-forearm', name: 'Antebraço-Esquerdo' },
						{ value: 'right-forearm', name: 'Antebraço-Direito' },
						{ value: 'right-arm', name: 'Braço-Direito' },
						{ value: 'left-arm', name: 'Braço-Esquerdo' },
						{ value: 'left-foot', name: 'Pé-Esquerdo' },
						{ value: 'right-foot', name: 'Pé-Direito' },
						{ value: 'right-leg', name: 'Perna-Direita' },
						{ value: 'left-leg', name: 'Perna-Esquerda' },
						{ value: 'left-knee', name: 'Joelho-Esquerdo' },
						{ value: 'right-knee', name: 'Joelho-Direito' },
						{ value: 'right-thigh', name: 'Coxa-Direita' },
						{ value: 'left-thigh', name: 'Coxa-Esquerda' }
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