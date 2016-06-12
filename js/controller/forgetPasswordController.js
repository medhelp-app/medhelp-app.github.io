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

	var params = $location.absUrl().split('?')[1].split('&');
	var urlParams = {};
	for (var i = 0; i < params.length; i++) {
		var p = params[i].split('=');
		urlParams[p[0]] = p[1];
	};

	$scope.send = function (user) {
		$http.get(API_URL + 'users/' + user.email + '/password/forgottenPassword').then(function (data) {
			$scope.message = '';
		}, function (error) {
			console.log(error);
		})
	};

	$scope.update = function (password) {
		$http.put(API_URL + 'users/' + urlParams.id + '/password/forgottenPassword', {
			tokenGenerated: urlParams.tokenGenerated,
			password: password.password,
			newPassword: password.rePassword
		}).then(function (data) {
			$scope.message = '';
		}, function (error) {
			console.log(error);
		})
	};
});