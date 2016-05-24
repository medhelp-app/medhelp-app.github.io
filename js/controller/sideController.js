app.controller('SideController', function ($scope, $location, $sessionStorage) {
	$scope.redirect = function (path) {
		$location.path(path);
	};

	$scope.logout = function () {
		delete $sessionStorage.login;
		delete $sessionStorage.user;
		$location.path('/');
	}
})