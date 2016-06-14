app.config(function($routeProvider, $locationProvider, $httpProvider, $mdThemingProvider) {
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

	$routeProvider.when("/esqueci",{
		templateUrl: "views/foget_email.html",
		controller: "ForgetPasswordController"
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

	$routeProvider.when("/medicos/prescrever/:id",{
		templateUrl: "views/doctor_prescription.html",
		controller: "DoctorPrescriptionController"
	});

	$routeProvider.when("/medicos/:id",{
		templateUrl: "views/doctor.html",
		controller: "DoctorCtrl"
	});

	$routeProvider.when("/consultas",{
		templateUrl: "views/appointment.html",
		controller: "AppointmentController"
	});

	$routeProvider.when("/marcacoes",{
		templateUrl: "views/appointmentPatient.html",
		controller: "AppointmentPatientController"
	});

	$routeProvider.when("/publicacoes",{
		templateUrl: "views/posts.html",
		controller: "PostsController"
	});

	$routeProvider.when("/usuario/editar",{
		templateUrl: "views/edit_profile.html",
		controller: "EditProfileCtrl"
	});

	$routeProvider.when("/usuario/:id",{
		templateUrl: "views/profile.html",
		controller: "PrincipalCtrl"
	});

	$routeProvider.when("/corpo",{
		templateUrl: "views/human_body.html",
		controller: "HumanBodyCtrl"
	});

	$routeProvider.when("/arquivos",{
		templateUrl: "views/archives.html",
		controller: "ArchivesController"
	});

	$routeProvider.otherwise({redirectTo: "/erro"});

	$mdThemingProvider.definePalette('amazingPaletteName', {
	    '50': 'ffebee',
	    '100': 'ffcdd2',
	    '200': 'ef9a9a',
	    '300': 'e57373',
	    '400': 'ef5350',
	    '500': 'ce3234', // red 
	    '600': 'e53935',
	    '700': 'd32f2f',
	    '800': '32689b', // blue
	    '900': 'b71c1c',
	    'A100': 'ff8a80',
	    'A200': 'ff5252',
	    'A400': 'ff1744',
	    'A700': 'd50000',
	    'contrastDefaultColor': 'light',
	    'contrastDarkColors': ['50', '100', '200', '300', '400', 'A100'],
	    'contrastLightColors': undefined    // could also specify this if default was 'dark'
	  });

	$mdThemingProvider.theme('default').primaryPalette('amazingPaletteName').accentPalette('red');

	/*
	$httpProvider.defaults.headers.common = {};
	$httpProvider.defaults.headers.post = {};
	$httpProvider.defaults.headers.put = {};
	$httpProvider.defaults.headers.patch = {};*/

	//$locationProvider.html5Mode(true);
	//$locationProvider.hashPrefix("!");
});