app.controller("EditProfileCtrl", function($scope, $http, $sessionStorage, $location) {
	console.log($sessionStorage.user);

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
			'x-access-token': $sessionStorage.token
		}
	};

	var url = '';
	if ($sessionStorage.user.userType == 0) {
		url = API_URL + 'patients/' + $sessionStorage.user._id;
	} else {
		url = API_URL + 'doctors/' + $sessionStorage.user._id;
	}

	$http.get(url, config).then(function (data) {
		data.data.name = $scope.user.name;
		data.data.email = $scope.user.email;

		$scope.user = data.data;
		console.log($scope.user);
	}, function (error) {
		console.log(error);
	})

	$scope.signup = function (user) {
		$http.put(API_URL + 'patients/' + user._id, user, config).then(function (data) {
			if (data.data.message == 'Token inválido') {
				delete $sessionStorage.login;
				delete $sessionStorage.user;
				$location.path('/');
			}
		}, function (error) {
			console.log(error);
		});
	}
});