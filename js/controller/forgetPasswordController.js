app.controller('ForgetPasswordController', function ($scope, $http, $cookies, $location) {
	$scope.user = {
		email: ''
	};

	$scope.password = {
		password: '',
		rePassword: ''
	};

	$scope.goSignin = function () {
		$location.path('/');
	};

	var params = $location.search();

	$scope.send = function (user) {
		$http.get(API_URL + 'users/' + user.email + '/password/forgottenPassword').then(function (data) {
			$scope.message = '';
		}, function (error) {
			console.log(error);
		})
	};

	$scope.update = function (password) {
		$http.put(API_URL + 'users/' + params.id + '/password/forgottenPassword', {
			tokenGenerated: params.tokenGenerated,
			password: password.password,
			newPassword: password.rePassword
		}).then(function (data) {
			$scope.message = '';
		}, function (error) {
			console.log(error);
		})
	};
});