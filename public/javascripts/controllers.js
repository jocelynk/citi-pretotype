var app = angular.module('citi-pretotype', ['ngTouch', 'ngRoute']);

app.config() {
    
}
app.controller('MainCtrl', ['$scope', function($scope) {

}]);

app.controller('AuthCtrl', ['$scope', function($scope) {
    $scope.showAuthenticating = false;
    $scope.showLogin = true;
    $scope.authenticationSuccess = false;

    $scope.authenticate = function() {
        $scope.showAuthenticating = true;
        $scope.showLogin = false;
    };

    $scope.socket = io.connect('http://10.128.0.204:8888');

    $scope.socket.on('connect', function () {
        $scope.socket.on('decision', function (data) {
            console.log(data);
            console.log(data.toUpperCase() == 'YES');
            if(data.toUpperCase() == 'YES') {
                $scope.$apply(function(){
                    $scope.username = !angular.isDefined($scope.username)? 'user' : $scope.username;
                    $scope.showAuthenticating = false;
                    $scope.authenticationFailure = false;
                    $scope.authenticationMsgSuccess = 'Congratulations ' + $scope.username + "! You are now authenticated.";
                    $scope.authenticationSuccess = true;
                });

            }
            else
                $scope.$apply(function() {
                    $scope.authenticationFailure = true;
                });
        })
    });
}]);

app.controller('AdminCtrl', ['$scope', function($scope) {
    $scope.socket = io.connect('http://10.128.0.204:8888');
    $scope.submitDecision = function() {
        $scope.socket.emit('authenticate', $scope.message);
    }
}]);