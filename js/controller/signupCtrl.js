app.controller("SignupCtrl", function($scope, $http, $sessionStorage){
	$(".button-collapse").sideNav();
	$scope.errostatus = false;
	$scope.user = {password:"",rePassword:"",name:"",email:""};
	$scope.signup = function(user){
		if(user.password=="" || user.rePassword =="" || user.name=="" || user.email==""){
			$scope.errostatus = true;
			$scope.erro = "Algum campo está vazio";
		}
		else if(user.password != user.rePassword){
			$scope.errostatus = true;
			$scope.erro = "Senhas não correspondem";
		}
		else if(user.email.indexOf("@")<=0){
			$scope.errostatus = true;
			$scope.erro = "Email não válido";
		}
		else if(user.password.length<6){
			$scope.errostatus = true;
			$scope.erro = "Senha tem poucos caracteres";
		}
		else{
			$http({
			    method: "post",
			    url: "http://104.236.112.162/api/users",
			    data: {
			    	name:user.name,
			    	email:user.email,
			    	rePassword: user.rePassword,
			    	password:user.password
			    }
			}).success(function(data){
				$scope.user = {password:"",rePassword:"",name:"",email:""};
				$scope.errostatus = false;
			  	location.href="login";
			}).error(function(data){
				$scope.errostatus = true;
				$scope.erro = data.error;
			});
		}
	}

});