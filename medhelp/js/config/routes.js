app.config(function($routeProvider, $locationProvider){
	$routeProvider.when("/",{
		templateUrl: "views/home.html",
		controller: "HomeCtrl"
	});

	$routeProvider.when("/signup",{
		templateUrl: "views/signUp.html",
		controller: "SignUpCtrl"
	});

	$routeProvider.when("/erro",{
		templateUrl: "views/erro.html",
		controller: "ErroCtrl"
	});

	$routeProvider.otherwise({redirectTo: "/erro"});

	$locationProvider.html5Mode(true);
	$locationProvider.hashPrefix("!");
});