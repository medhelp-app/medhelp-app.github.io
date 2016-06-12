app.controller('IndexController', function ($scope, $cookies, $http, $location) {
	var path = $location.path();

	if (path !== '/' && path !== '') {
		if (!$cookies.get('login')) {
			location.href = "/";
		} 

		var config = {
			headers: {
				'x-access-token': $cookies.get('token')
			}
		};

		var url = '';
		if ($cookies.get('type') == 0)
			url = API_URL + 'patients/' + $cookies.get('user');
		else
			url = API_URL + 'doctors/' + $cookies.get('user');

		$http.get(url, config).then(function (data) {
			if (data.data.message == 'Token inválido') {
				$cookies.remove('login');
				$cookies.remove('user');
				$location.path('/');
			} else {
				$scope.user = data.data;
			}
		}, function (error) {
			console.log(error);
		});
	}
});