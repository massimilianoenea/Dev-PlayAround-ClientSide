var app = angular.module('PlayAroundLogin',['PlayAroundConf','ngStorage']);

    app.config(function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $httpProvider.defaults.withCredentials = true;
    });

    app.controller('login',function($scope, $http,ipAddress,codeManager,$sessionStorage){
        $sessionStorage.empty();
        $scope.try_login = function(){
            $scope.message = false;
            var parameter = {email:$scope.email,password:$scope.password};
            $http({
                method : "POST",
                url : ipAddress+'/playaround/login',
                data: parameter,
                withCredentials: true,
                headers: { 'Content-Type': 'application/json' }
            }).then(function mySuccess(response) {
                $http({
                    method: "GET",
                    url: ipAddress + response.data.location,
                    withCredentials: true
                }).then(function mySuccess(response){
                    window.location.href = codeManager[response.data.code];
                },function myError(response){
                    $scope.message = true;
                    $scope.error = "impossibile autenticare, riprova più tardi";
                });
            }, function myError(response) {
                $scope.message = true;
                $scope.error = response.data.message;
            });
        };
    });