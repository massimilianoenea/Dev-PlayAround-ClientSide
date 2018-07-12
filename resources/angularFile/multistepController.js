var path="";
var app = angular.module('PlayAround',['ngFileUpload','PlayAroundConf']);

app.config(function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.withCredentials = true;
});

app.controller('multiFormCtrl', function($scope, $http,Upload, $timeout,ipAddress,codeManager) {
    this.$onInit = function (){
        $http({
            method : "POST",
            url : ipAddress+'/playaround/getUtenteLog',
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' }
        }).then(function mySuccess(response) {
            path = ipAddress;
        }, function myError(response) {
            window.location.href = './login.html';
        });
    };

    $scope.uploadFiles = function(file, errFiles) {
        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];
        if (file) {
            file.upload = Upload.upload({
                url: ipAddress+'/playaround/upload_profile',
                method:'POST',
                withCredentials: true,
                file: file
            });
            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }
    };

    $scope.sendComplete = function(){
        console.log(parameter);
        $http({
            method : "POST",
            url : ipAddress+'/Complete_Reg',
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
                window.location.href = codeManager[1];
            });
        }, function myError(response) {
            $scope.error = response.data;
            $http({
                method: "GET",
                url: ipAddress + response.data.location,
                withCredentials: true
            }).then(function mySuccess(response){
                window.location.href = codeManager[response.data.code];
            },function myError(response){
                window.location.href = codeManager[1];
            });
        });
    }
});