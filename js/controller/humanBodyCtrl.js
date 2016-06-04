app.controller("HumanBodyCtrl", function($scope, $http, $location, $cookies) {
	var config = {
		headers:  {
			'x-access-token': $cookies.get('token')
		}
	};

	$scope.parts = [];
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
		console.log($scope.parts);
		$scope.problems = data.data;
		console.log(data);
	}, function (error) {
		console.log(error);
	});

	$scope.selectedPart = '';
	$scope.selectProblemns = [];

	$scope.part = function (name) {
			 if (name == 'head') $scope.selectedPart = 'Cabeça';
		else if (name == 'rightArm') $scope.selectedPart = 'Braço direito';
		else if (name == 'leftArm') $scope.selectedPart = 'Braço esquerdo';
		else if (name == 'chest') $scope.selectedPart = 'Peito';
		else if (name == 'stomach') $scope.selectedPart = 'Estomago';
		else if (name == 'rightLeg') $scope.selectedPart = 'Perna direita';
		else if (name == 'leftLeg') $scope.selectedPart = 'Perna esquerda';

		for (var i = 0; i < $scope.problems.length; i++) {
			if ($scope.problems[i].part == name) {
				$scope.selectProblemns = $scope.problems[i].problems;
				break;
			}
		}

		console.log($scope.selectProblemns);

		$('#modalHumanBody').openModal();	
	};
});