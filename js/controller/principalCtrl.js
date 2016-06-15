app.controller("PrincipalCtrl", function($scope, $http, $cookies, $location, $routeParams, $mdBottomSheet) {
	$scope.options = function () {
		var id = $scope.user._id;
		$mdBottomSheet.show({
			templateUrl: '../views/bottom_sheet_profile.html',
			controller: function ($scope) {

				$scope.prescription = function () {
					$mdBottomSheet.hide();
					$location.path('/medicos/prescrever/' + id);
				}	

				$scope.humanBody = function () {
					$mdBottomSheet.hide();
					$location.path('/corpo/' + id);
				}	

				$scope.records = function () {
					$mdBottomSheet.hide();
					$location.path('/prontuario/' + id);
				}	

				$scope.recordsBack = function () {
					$mdBottomSheet.hide();
					$location.path('/historico/' + id);
				}	
			}
		});
	}

	var config = {
		headers: {
			'x-access-token': $cookies.get('token')
		}
	};

	$scope.type = $cookies.get('type');

	if ($routeParams.id) {
		$http.get(API_URL + 'users/' + $routeParams.id, config).then(function (data) {
			load(data.data.userType);
		}, function (error) {
			console.log(error);
		})

		var url = '';
		
		function load (type) {
			if (type == 0)
				url = API_URL + 'patients/' + $routeParams.id;
			else
				url = API_URL + 'doctors/' + $routeParams.id;

			$http.get(url, config).then(function (data) {
				delete data.data.password;

				$scope.user = data.data;
				console.log($scope.user);
			}, function (error) {
				console.log(error);
			})
		}
	}
});