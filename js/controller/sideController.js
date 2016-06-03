app.controller('SideController', function($scope, $location, $cookies) {
	$scope.redirect = function (path) {
		$location.path(path);
	};

	$scope.logout = function () {
		$cookies.remove('login');
		$cookies.remove('user');
		$location.path('/');
	}
})