app.config(function($routeProvider, $locationProvider){
	$routeProvider.when("/",{
		templateUrl: "views/login.html",
		controller: "HomeCtrl"
	});

	$routeProvider.when("/signup",{
		templateUrl: "views/register.html",
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

	$routeProvider.when("/doctor",{
		templateUrl: "views/doctor.html",
		controller: "DoctorCtrl"
	});

	$routeProvider.when("/doctors",{
		templateUrl: "views/doctors_all.html",
		controller: "DoctorsCtrl"
	});

	$routeProvider.when("/searchdoctor",{
		templateUrl: "views/doctors_search.html",
		controller: "DoctorSearchCtrl"
	});

	$routeProvider.when("/editprofile",{
		templateUrl: "views/edit_profile.html",
		controller: "EditProfileCtrl"
	});

	$routeProvider.otherwise({redirectTo: "/erro"});

	$locationProvider.html5Mode(true);
	$locationProvider.hashPrefix("!");
});