app.controller("DoctorsCtrl", function($scope, $http, $sessionStorage){
	var config = {
		headers:  {
			'x-access-token': TOKEN
		}
	};

	$http.get(API_URL + 'doctors', config).then(function (data) {
		$scope.doctors = data.data;
	}, function (error) {
		console.log(error);
	})
});