app.controller('ArchivesController', function ($scope, $http,  $cookies, $location, $routeParams, fileUpload) {
	$scope.type = $routeParams.type == 'prescricoes' ? 'prescrição' : 'exame';
	$scope.name = $routeParams.type == 'prescricoes' ? 'Prescrições' : 'Exames';

	var config = {
		headers: {
			'x-access-token': $cookies.get('token')
		}
	};

	function load () {
		$http.get(API_URL + 'archives/' + $cookies.get('user'), config).then(function (data) {
			console.log(data);
		}, function (error) {
			console.log(error);
		})
	}
	load();

	$scope.add = function () {
		var uploadUrl = API_URL + 'users/' + $cookies.get('user') + '/image';
		fileUpload.uploadFileToUrl(file, uploadUrl, $cookies.get('token'), function (success) {
			if (success)
				load();
			else
				$scope.errorstatus = 'Erro ao enviar imagem.';
		});
	}
});