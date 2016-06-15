app.controller('ArchivesController', function ($scope, $http,  $cookies, $location, $routeParams, fileUpload) {
	var config = {
		headers: {
			'x-access-token': $cookies.get('token')
		}
	};

	function load () {
		$http.get(API_URL + 'archives/patient/' + $cookies.get('user'), config).then(function (data) {
			$scope.files = data.data;
		}, function (error) {
			console.log(error);
		})
	}
	load();

	$scope.save = function () {
		var file = $scope.myFile;

		var uploadUrl = API_URL + 'archives/' + $cookies.get('user');
		fileUpload.uploadFileToUrl(file, uploadUrl, $cookies.get('token'), function (success) {
			if (success)
				load();
			else
				$scope.errorstatus = 'Erro ao enviar imagem.';
		}, 'post', 'archive');
	}

	$scope.delete = function (file) {
		$http.delete(API_URL + 'archives/' + file._id, config).then(function (data) {
			load();
		}, function (error) {
			console.log(error);
		});
	}
});