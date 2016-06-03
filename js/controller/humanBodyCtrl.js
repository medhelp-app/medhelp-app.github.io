app.controller("HumanBodyCtrl", function($scope, $http, $location, $cookies) {
	var config = {
		headers:  {
			'x-access-token': $cookies.get('token')
		}
	};

	$http.get(API_URL + 'doctors/find/a', config).then(function (data) {
		$scope.doctors = data.data;
		console.log(data);
	}, function (error) {
		console.log(error);
	});
});