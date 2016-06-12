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

	$scope.send = function (user) {
		$http.get(API_URL + 'users/' + user.email + '/password/forgottenPassword').then(function (data) {
			$scope.message = '';
		}, function (error) {
			console.log(error);
		})
	};

	$scope.update = function (password) {
		var params = $location.absUrl().split('?')[1].split('&');
		var urlParams = {
			id: params[0].substr(3),
			tokenGenerated: params[1].substr("tokenGenerated=".length)
		}

		console.log(params, urlParams);

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