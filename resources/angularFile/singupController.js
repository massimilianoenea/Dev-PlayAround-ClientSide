var app = angular.module('PlayAround', ['PlayAroundConf']);

    app.config(function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $httpProvider.defaults.withCredentials = true;
    });

    app.controller('registration', function($scope, $http,ipAddress) {

        $scope.try_signup = function(){
            var parameter = {user:{email:$scope.email,password:$scope.password,username:$scope.username},host:ipAddress};
            $http({
                method : "POST",
                url : ipAddress+'/playaround/singup',
                data: parameter,
                withCredentials: true,
                headers: { 'Content-Type': 'application/json' }
            }).then(function mySuccess(response) {
                $scope.message=true;
                $scope.error=response.data;
            }, function myError(response) {
                $scope.message=true;
                $scope.error = response.data;
            });
        };

    });