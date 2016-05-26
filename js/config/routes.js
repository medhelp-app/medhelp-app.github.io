app.config(function($routeProvider, $locationProvider, $httpProvider) {
	$routeProvider.when("/",{
		templateUrl: "views/login.html",
		controller: "HomeCtrl"
	});

	$routeProvider.when("/cadastro",{
		templateUrl: "views/register.html",
		controller: "SignupCtrl"
	});

	$routeProvider.when("/entrar",{
		templateUrl: "views/home.html",
		controller: "HomeCtrl"
	});

	$routeProvider.when("/inicio",{
		templateUrl: "views/home.html",
		controller: "PrincipalCtrl"
	});

	$routeProvider.when("/medicos",{
		templateUrl: "views/doctors_all.html",
		controller: "DoctorsCtrl"
	});

	$routeProvider.when("/medicos/procurar",{
		templateUrl: "views/doctors_search.html",
		controller: "DoctorSearchCtrl"
	});

	$routeProvider.when("/medicos/:id",{
		templateUrl: "views/doctor.html",
		controller: "DoctorCtrl"
	});

	$routeProvider.when("/usuario/:id",{
		templateUrl: "views/edit_profile.html",
		controller: "EditProfileCtrl"
	});

	$routeProvider.when("/usuario/editar",{
		templateUrl: "views/edit_profile.html",
		controller: "EditProfileCtrl"
	});

	$routeProvider.otherwise({redirectTo: "/erro"});
	
	/*
	$httpProvider.defaults.headers.common = {};
	$httpProvider.defaults.headers.post = {};
	$httpProvider.defaults.headers.put = {};
	$httpProvider.defaults.headers.patch = {};*/

	//$locationProvider.html5Mode(true);
	//$locationProvider.hashPrefix("!");
});