angular.module('PlayAround',['PlayAroundConf'])
    .controller('login',function($scope, $http,ipAddress){
        
        delete $http.defaults.headers.common['X-Requested-With'];

        $scope.try_login = function(){
            var parameter = {email:$scope.email,password:$scope.password};
            $http({
                method : "POST",
                url : ipAddress+'/playaround/login',
                data: parameter,
                withCredentials: true,
                headers: { 'Content-Type': 'application/json' }
            }).then(function mySuccess(response) {
                window.location.replace(response.data.location);
            }, function myError(response) {
                $scope.message = true;
                $scope.error = response.data.message;
            });
        };
    });