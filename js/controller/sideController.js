app.controller('SideController', function($scope, $location, $cookies, $http) {
	$scope.type = $cookies.get('type');

	var config = {
		headers:  {
			'x-access-token': $cookies.get('token')
		}
	};
	
	$scope.redirect = function (path) {
		$location.path(path);
	};

	$scope.logout = function () {
		$cookies.remove('login');
		$cookies.remove('user');
		$location.path('/');
	};

	$http.get(API_URL + 'patients/' + $cookies.get('user') + '/appointments', config).then(function (data) {
		$scope.doctors = [];
		for (var i = 0; i < data.data.length; i++) {
			var add = true;
			for (var j = 0; j < $scope.doctors.length; j++) {
				if (data.data[i].user._id == $scope.doctors[j]._id) {
					add = false;
					break;
				}
			};

			if (add) {
				$scope.doctors.push({
					_id: data.data[i].user._id,
					name: data.data[i].user.name,
					profileImage: data.data[i].user.profileImage
				})
			}
		};

		console.log($scope.doctors);
	}, function (error) {
		console.log(error);
	});
})