app.controller("PrincipalCtrl", function($scope, $http, $cookies, $location){
	$scope.prescription = function () {
		$location.path('/medicos/prescrever/' + $scope.user._id);
	}	
});