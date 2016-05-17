app.config(function($routeProvider, $locationProvider){
	$routeProvider.when("/",{
		templateUrl: "views/home.html",
		controller: "HomeCtrl"
	});

	$routeProvider.when("/signup",{
		templateUrl: "views/signup.html",
		controller: "SignupCtrl"
	});

	$routeProvider.when("/login",{
		templateUrl: "views/home.html",
		controller: "HomeCtrl"
	});

	$routeProvider.when("/home",{
		templateUrl: "views/principal.html",
		controller: "PrincipalCtrl"
	});

	$routeProvider.otherwise({redirectTo: "/erro"});

	$locationProvider.html5Mode(true);
	$locationProvider.hashPrefix("!");
});