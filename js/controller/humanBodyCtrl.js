app.controller("HumanBodyCtrl", function($scope, $http, $location, $cookies, $mdDialog, $mdMedia, $routeParams) {
	
	$scope.check ="false";
	var config = {
		headers:  {
			'x-access-token': $cookies.get('token')
		}
	};

	var id = $routeParams.id ? $routeParams.id : $cookies.get('user');
	var edit = $routeParams.id ? true : false;
	$scope.errostatus = false;
	$scope.parts = [];
	$scope.part = "";
	$scope.selectedName ="";
	$scope.partProblem = [];

	function load () {
		$scope.parts = [];

		$http.get(API_URL + 'patients/' + id + '/bodyparts', config).then(function (data) {
			for (var i = 0; i < data.data.length; i++) {
				data.data[i].problems.sort(function(a, b){
					var x = a.severity == "High" ? 0 : (a.severity == "Medium" ? 1 : 2);
					var y = b.severity == "High" ? 0 : (b.severity == "Medium" ? 1 : 2);
					return x - y;
				});
				console.log(data.data[i]);
				for (var j = 0; j < data.data[i].problems.length; j++) {
					if (!data.data[i].problems[j].resolved) {
							console.log(data.data[i].problems[j]);
						if (data.data[i].problems[j].severity == "Medium") {
							$scope.parts.push(data.data[i].part+"-"+data.data[i].subpart+ "-yellow");
						} else if (data.data[i].problems[j].severity == "High") {
							$scope.parts.push(data.data[i].part+"-"+data.data[i].subpart+ "-red");
						} else {
							$scope.parts.push(data.data[i].part+"-"+data.data[i].subpart+ "-gray");
						}
						break;
					}
				};
			};

			$scope.problems = data.data;
		}, function (error) {
			console.log(error);
		});
	}

	load();

	$scope.selectPart = function (name) {

			 if (name == 'head-head') 	$scope.selectedName = 'Cabeça';
		else if (name == 'head-face') 	$scope.selectedName = 'Face';
		else if (name == 'trunk-abdomen') 	$scope.selectedName = 'Abdomen';	 
		else if (name == 'trunk-thorax') 	$scope.selectedName = 'Torax';
		else if (name == 'trunk-loin') 	$scope.selectedName = 'Quadril';
		else if (name == 'leftArm-arm') 	$scope.selectedName = 'Braço-Esquerdo';
		else if (name == 'rightArm-arm') 	$scope.selectedName = 'Braço-Direito';
		else if (name == 'leftArm-forearm') $scope.selectedName = 'Antebraço-Esquerdo';
		else if (name == 'rightArm-forearm') $scope.selectedName = 'Antebraço-Direito';
		else if (name == 'leftArm-hand') $scope.selectedName = 'Mão-Esquerda';
		else if (name == 'rightArm-hand') $scope.selectedName = 'Mão-Direita';
		else if (name == 'leftArm-elbow') $scope.selectedName = 'Junção-Braço-Esquerdo';
		else if (name == 'rightArm-elbow') $scope.selectedName = 'Junção-Braço-Direito';
		else if (name == 'rightLeg-knee') 	$scope.selectedName = 'Joelho-Direito';
		else if (name == 'leftLeg-knee') 	$scope.selectedName = 'Joelho-Esquerdo';
		else if (name == 'leftLeg-leg') 	$scope.selectedName = 'Perna-Esquerda';
		else if (name == 'rightLeg-leg') 	$scope.selectedName = 'Perna-Direita';
		else if (name == 'rightLeg-foot') 	$scope.selectedName = 'Pé-Direito';
		else if (name == 'leftLeg-foot') 	$scope.selectedName = 'Pé-Esquerdo';
		else if (name == 'leftLeg-thigh') 	$scope.selectedName = 'Coxa-Esquerda';
		else if (name == 'rightLeg-thigh') 	$scope.selectedName = 'Coxa-Direita';

		alert($scope.selectedName);
		var partSubpart = name.split("-");

		if($scope.selectedName!=""){
			$scope.part = name;
			for (var i = 0; i < $scope.problems.length; i++) {
			if (($scope.problems[i].part == partSubpart[0]) && ($scope.problems[i].subpart==partSubpart[1])) {
				$scope.partProblem = $scope.problems[i].problems;
				break;
			}
		}
		}
	};

	$scope.showProblems = function(nome,ev){
		var nome = $scope.selectedName;
		var probl = $scope.partProblem;

		if($scope.selectedName!=""){
			$scope.errostatus=false;
			var useFullScreen = $mdMedia('sm');
			$mdDialog.show({
					controller: function ($scope) {
						$scope.name = nome;
						$scope.prob = probl;

						$scope.cancel = function () {
							$mdDialog.cancel();
						};

						$scope.alterar = function(item){

							$http.put(API_URL + 'patients/' + id + '/bodyparts/' + item._id, item , config).then(function (data) {
									console.log(item);
									load();

									$mdDialog.hide();
								}, function (error) {
									console.log(error);
								});
						};

					},
					templateUrl: '../views/dialog_view_human_body.html',
					parent: angular.element(document.body),
					targetEvent: ev,
					clickOutsideToClose:true,
					fullscreen: useFullScreen
				});
		}else{
			$scope.errostatus=true;
		}
	}

	$scope.openAdd = function(ev, item) {
		var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
		var partBody = $scope.part;
		var nome = $scope.selectedName;
		if($scope.selectedName!=""){
			$scope.errostatus=false;
			$mdDialog.show({
					controller: function ($scope) {


						$scope.partBody = partBody;
						$scope.nome = nome;

						var partSubpart = partBody.split("-");
						var part = partSubpart[0];
						var subpart = partSubpart[1];

						$scope.save = function (add) {

							add.part = part;
							add.subpart = subpart;

							if(parseInt(add.level)<=30){
								add.severity = "Low";
							}else if(parseInt(add.level)>30 && parseInt(add.level)<=60){
								add.severity = "Medium";
							}else{
								add.severity ="High";
							}

							console.log(add);
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
			}else{
				$scope.errostatus=true;
			}	
	};	
});