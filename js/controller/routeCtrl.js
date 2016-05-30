app.controller("RouteCtrl", function($scope, $sessionStorage, $route, $location) {
	$scope.$on('$routeChangeSuccess', function() {
		var path = $location.path();
		
		$scope.nav = false;

		if (!$sessionStorage.login) {
			if (path !== '/' && path.indexOf('cadastro') < 0) {
				$location.path('/');
			}
		}

		if (path === '/' || path.indexOf('cadastro') >= 0) {
			$scope.nav = false;
		} else {
			$scope.nav = true;
		}
	});
});