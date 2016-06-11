app.controller('PostsController', function ($scope, $http, $cookies, $mdDialog, $location) {
	var config = {
		headers:  {
			'x-access-token': $cookies.get('token')
		}
	};

	$scope.post = {
		idUser: $cookies.get('user'),
		type: $cookies.get('type') == 0 ? 'question' : 'post',
		text: '',
		date: new Date()
	};

	$scope.save = function () {
		$http.post(API_URL + 'publications', $scope.post, config).then(function (data) {
			$scope.post = {
				idUser: $cookies.get('user'),
				type: 'question',
				text: '',
				date: new Date()
			};

			load();
		}, function (error) {
			console.log(error);
		});
	}

	$scope.remover = function (post) {
		$http.delete(API_URL + 'publications/' + post._id, config).then(function (data) {
			load();
		}, function (error) {
			console.log(error);
		});
	}

	function load() {
		$http.get(API_URL + 'publications', config).then(function (data) {
			$scope.posts = data.data;
		}, function (error) {
			console.log(error);
		});
	}
	load();

	$scope.openUser = function (id) {
		if (id.type == 'question')
			$location.path('/usuario/' + id.idUser);
		else
			$location.path('/medicos/' + id.idUser);
	}
})