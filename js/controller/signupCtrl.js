app.controller("SignupCtrl", function ($scope, $http, $sessionStorage, $location, $crypthmac) {
	$(".button-collapse").sideNav();
	$scope.errostatus = false;
	
	$scope.user = {
		password: "",
		rePassword: "", 
		name: "", 
		email: "",
		userType: "0"
	};

	$scope.signup = function(user) {
		if (user.password == "" || user.rePassword == "" || user.name == "" || user.email == "") {
			$scope.errostatus = true;
			$scope.erro = "Algum campo está vazio";
		} else if (user.password != user.rePassword) {
			$scope.errostatus = true;
			$scope.erro = "Senhas não correspondem";
		} else if (user.email.indexOf("@") <= 0) {
			$scope.errostatus = true;
			$scope.erro = "Email não válido";
		} else if (user.password.length < 6) {
			$scope.errostatus = true;
			$scope.erro = "Senha tem poucos caracteres";
		} else {
			$http({
			    method: "POST",
			    url: API_URL + "users",
			    data: {
					password: $crypthmac.encrypt($scope.user.password, ""),
					rePassword: $crypthmac.encrypt($scope.user.rePassword, ""),
					name: $scope.user.name,
					email: $scope.user.email,
					userType: $scope.user.userType
				}
			}).success(function(data) {
				$scope.user = {
					password: "",
					rePassword: "",
					name: "",
					email: "",
					userType: "0"
				};

				$scope.errostatus = false;
			  	$location.path("/");
			}).error(function(data) {
				$scope.errostatus = true;
				$scope.erro = data.error;
			});
		}
	}
});