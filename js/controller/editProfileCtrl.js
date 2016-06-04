app.controller("EditProfileCtrl", function($scope, $http, $cookies, $location) {
	$scope.states = [
		{ value: 'AC', name: 'Acre' },
		{ value: 'AL', name: 'Alagoas' },
		{ value: 'AP', name: 'Amapá' },
		{ value: 'AM', name: 'Amazonas' },
		{ value: 'BA', name: 'Bahia' },
		{ value: 'CE', name: 'Ceará' },
		{ value: 'DF', name: 'Distrito Federal' },
		{ value: 'ES', name: 'Espirito Santo' },
		{ value: 'GO', name: 'Goiás' },
		{ value: 'MA', name: 'Maranhão' },
		{ value: 'MS', name: 'Mato Grosso do Sul' },
		{ value: 'MT', name: 'Mato Grosso' },
		{ value: 'MG', name: 'Minas Gerais' },
		{ value: 'PA', name: 'Pará' },
		{ value: 'PB', name: 'Paraíba' },
		{ value: 'PR', name: 'Paraná' },
		{ value: 'PE', name: 'Pernambuco' },
		{ value: 'PI', name: 'Piauí' },
		{ value: 'RJ', name: 'Rio de Janeiro' },
		{ value: 'RN', name: 'Rio Grande do Norte' },
		{ value: 'RS', name: 'Rio Grande do Sul' },
		{ value: 'RO', name: 'Rondônia' },
		{ value: 'RR', name: 'Roraima' },
		{ value: 'SC', name: 'Santa Catarina' },
		{ value: 'SP', name: 'São Paulo' },
		{ value: 'SE', name: 'Sergipe' },
		{ value: 'TO', name: 'Tocantins' }
	];

	var config = {
		headers: {
			'x-access-token': $cookies.get('token')
		}
	};

	$scope.sucess = false;

	var url = '';
	if ($cookies.get('type') == 0)
		url = API_URL + 'patients/' + $cookies.get('user');
	else
		url = API_URL + 'doctors/' + $cookies.get('user');
	
	$http.get(url, config).then(function (data) {
		$scope.user = data.data;
		console.log($scope.user);
	}, function (error) {
		console.log(error);
	})

	$scope.signup = function (user) {
		$http.put(url, user, config).then(function (data) {
			if (data.data.message == 'Token inválido') {
				$sessionStorage.login;
				$sessionStorage.user;
				$location.path('/');
			} else {
				$scope.sucess = true;
			}
		}, function (error) {
			$scope.errorstatus = error.error;
		});
	}
});