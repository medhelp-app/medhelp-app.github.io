app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

app.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl, token, callback, method, field){
        var fd = new FormData();
        fd.append(field ? field : 'profileImage', file);
        fd.append('type', 'exam');

        if (method == 'post') {
            $http.post(uploadUrl, fd, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined,
                        'x-access-token': token
                    }
                })
                .success(function(){
                    callback(true);
                })
                .error(function(){
                    callback(false);
                });
        } else {
            $http.put(uploadUrl, fd, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined,
                        'x-access-token': token
                    }
                })
                .success(function(){
                    callback(true);
                })
                .error(function(){
                    callback(false);
                });
        }
    }
}]);