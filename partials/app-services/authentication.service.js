(function() {
    'use strict';

    angular
        .module('app')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$cookies', '$rootScope', '$timeout', 'UserService'];

    function AuthenticationService($http, $cookies, $rootScope, $timeout, UserService) {
        var service = {};

        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;

        return service;

        function Login(user, callback) {
            UserService.GetByUsername(user)
                .then(function(response) {
                    console.log('response:::', response)
                    if (response.data.status == 200) {
                        callback(response.data);

                    } else {
                    console.log('response:::', response.data)

                        callback(response.data);
                    }
                });

        }

        function SetCredentials(userdata) {
            var authdata = userdata.token;
            $rootScope.globals = {
                currentUser: {
                    user: userdata.data,
                    authdata: authdata
                }
            };

            // set default auth header for http requests
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + authdata;

            // store user details in globals cookie that keeps user logged in  until they logout)
            $cookies.putObject('globals', $rootScope.globals);
        }

        function ClearCredentials() {
            $rootScope.globals = {};
            $cookies.remove('globals');
            $http.defaults.headers.common.Authorization = 'Bearer ';
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function() {
                return { success: false, message: error };
            };
        }
    }

})();