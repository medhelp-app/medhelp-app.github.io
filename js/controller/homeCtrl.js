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
      			console.log("Ja Conectado");
      		}else{

				FB.login(function(response) {
				    if (response.authResponse) {
				     	
				     	showFaceUser();
				    } else {
				      console.log('User cancelled login or did not fully authorize.');
				    }
				},{scope: 'email,user_likes'});

      		}
    	});

	}

	var showFaceUser = function(){

		FB.api('/me',{fields: 'id,name,email'}, function(response) {
      		console.log(response);
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