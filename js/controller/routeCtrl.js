app.controller("RouteCtrl", function($scope, $route, $location){
	$scope.$on('$routeChangeSuccess', function() {
	    var path = $location.path();
	    $scope.nav = false;
	    if(path === '/') {
	       $scope.nav = false;
	    }
	    else{
	    	$scope.nav=true;
	    }
	});
});