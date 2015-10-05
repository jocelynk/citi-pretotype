var app = angular.module('citi-pretotype', ['ngTouch', 'ngRoute']);

app.config(['$routeProvider', '$locationProvider',
        function($routeProvider, $locationProvider) {
            $locationProvider.html5Mode(true);
            $routeProvider
                .when("/admin", {
                    templateUrl: "/partials/admin.html",
                    controller: "AdminCtrl" })
                .when("/motion", {
                    templateUrl: "/partials/motion.html",
                    controller: "MotionCtrl" })
                .when("/game", {
                    templateUrl: "/partials/game.html",
                    controller: "GameCtrl" })
                .otherwise({ redirectTo: "/" });
        }
    ]
);

app.factory('UserInfoService', function() {
    var user = {
        name: ''
    };
    return user;
});


app.controller('MainCtrl', ['$scope', function($scope) {

}]);

app.controller('AuthCtrl', ['$scope','$route', function($scope, $route) {
    $scope.showAuthenticating = false;
    $scope.showLogin = true;
    $scope.authenticationSuccess = false;

    $scope.authenticate = function() {
        console.log("authenticating");
        $scope.showAuthenticating = true;
        $scope.showLogin = false;
    };

    $scope.socket = io.connect('http://10.128.15.148:8888');

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
                    if($route.current.templateUrl == '/partials/motion.html') {
                        $scope.authenticationMsgFailure = 'Incorrect motion. Please try again.';
                    } else {
                        $scope.authenticationMsgFailure = 'Incorrect color combination. Please try again.';
                    }
                    $scope.authenticationFailure = true;
                });
        })
    });
}]);

app.controller('AdminCtrl', ['$scope', function($scope) {
    $scope.socket = io.connect('http://192.168.0.51:8888');
    $scope.submitDecision = function() {
        $scope.socket.emit('authenticate', $scope.message);
    }
}]);

app.controller('MotionCtrl', ['$scope', function($scope) {

}]);

app.controller('GameCtrl', ['$scope', function($scope) {
}]);