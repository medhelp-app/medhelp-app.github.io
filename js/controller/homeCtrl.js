app.controller("HomeCtrl", function($scope, $http, $cookies, $location) {
	if ($cookies.get('login')) 
		$location.path("inicio");

	$scope.user = {
		password: "",
		email: ""
	};

	$scope.errostatus = false;

	$scope.goSignin = function () {
		$location.path('cadastro');
	}

	$scope.forget = function () {
		$location.path('esqueci');
	}


	$scope.faceLogin = function(){

		FB.getLoginStatus(function(response) {
      		if(response.status==='connected'){
      			showFaceUser();
      		}else{

				FB.login(function(response) {
				    if (response.authResponse) {
				     	
				     	showFaceUser();
				    } else {
				      console.log('User cancelled login or did not fully authorize.');
				    }
				},{scope: 'email'});

      		}
    	});

	}

	var showFaceUser = function(){

		FB.api('/me',{fields: 'id,name,email'}, function(response) {
      		
			var jsSha = new jsSHA(response.id);
			var hash = jsSha.getHash("SHA-512", "HEX");

			var emailUser = response.name.replace(" ","").toLowerCase()+"@gmail.com";

			$http({
			    method: "post",
			    url: API_URL + "users/login",
			    data: {
			    	email: emailUser,
			    	password: hash
			    }
			}).success(function(data) {
				$scope.user = { 
					password: "",
					email: ""
				};

				USER_ID = data.user._id;
				TOKEN = data.token;

				$scope.errostatus = false;
				
				$cookies.put('login', true);
				$cookies.put('user', data.user._id);
				$cookies.put('type', data.user.userType);
				$cookies.put('token', data.token);
			  	
			  	//$location.path("inicio");
			  	window.location = '#/inicio';
      			window.location.reload();
			}).error(function(data) {
				registerFace(response,emailUser);
			});
    	});
	}

	var registerFace = function(response,emailUser){

		var jsSha = new jsSHA(response.id);
		var hash = jsSha.getHash("SHA-512", "HEX");
		
		$http({
			    method: "POST",
			    url: API_URL + "users",
			    data: {
					password: hash,
					rePassword: hash,
					name: response.name,
					email: emailUser,
					userType: 0
				}
			}).success(function(data) {
			  	$location.path("/");
			}).error(function(data) {
				$scope.errostatus = true;
				$scope.erro = data.error;
				cosole.log("Deu Merda");
			});
	}

	$scope.login = function(user) {
		if (user.email == "" || user.password == "") {
			$scope.errostatus = true;
			$scope.erro = "O campo e-mail e senha são obrigatórios";
		} else {
			var jsSha = new jsSHA(user.password);
			var hash = jsSha.getHash("SHA-512", "HEX");

			$http({
			    method: "post",
			    url: API_URL + "users/login",
			    data: {
			    	email: user.email,
			    	password: hash
			    }
			}).success(function(data) {
				$scope.user = { 
					password: "",
					email: ""
				};

				USER_ID = data.user._id;
				TOKEN = data.token;

				$scope.errostatus = false;
				
				$cookies.put('login', true);
				$cookies.put('user', data.user._id);
				$cookies.put('type', data.user.userType);
				$cookies.put('token', data.token);
			  	
			  	//$location.path("inicio");
			  	window.location = '#/inicio';
      			window.location.reload();
			}).error(function(data) {
				$scope.errostatus = true;
				$scope.erro = data.error;
				$scope.user.password = "";
			});
		}
	}
});